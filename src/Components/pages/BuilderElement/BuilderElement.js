import React, { useRef, useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import parse from 'html-react-parser'
import sanitize from 'sanitize-html'
import { renderToString } from 'react-dom/server'
import Menu from '../Menu/Menu'
import Drawer from '../Drawer/Drawer'
// import 'rc-drawer/assets/index.css'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { AllHtmlEntities as Entities } from 'html-entities'

import { checkIfCapital, getInheritedPropertyName } from '../utils/basic'
import { setBoxProperties } from './methods/useEffect'
import refineProperties from './methods/refineProperties'
import { modulesPropertyNodes } from '../utils/modulesIndex'
import buildItemsForMenu from '../Menu/methods/buildItemsForMenu'
import BasicForm from '../BasicForm/BasicForm'

const entities = new Entities()
var serialize = require('serialize-javascript')

const _BuilderElement = props => {
    const elementValues =
        props.mD.resourcesObjects[props.currentResource].values[
            props.element.id
        ] || {}

    if (!elementValues) {
        return null
    }
    const { refinedProperties, ownRefinedProperties } = refineProperties(
        { ...props },
        elementValues
    )

    const attributes = setBoxProperties(
        ownRefinedProperties,
        props,
        elementValues
    )

    const currentPath = [...props.element.path, props.element.id]

    let Tag = props.element.tag || 'div'

    /* Tag = Tag.replace(/[^a-zA-Z]/g, '') */

    Tag = Tag.length > 0 ? Tag : 'div'
    const getModulePropertiesNodes = tag => {
        const nodes = {}
        const possibleNodes = modulesPropertyNodes[tag] || []
        for (let el of possibleNodes) {
            const nodeItem = props.structure.find(
                item =>
                    item.forModule === props.element.id &&
                    item.childrenTo === el.id
            )
            let node
            if (nodeItem) {
                node = props.structure
                    .filter(item =>
                        isEqual(item.path, [...nodeItem.path, nodeItem.id])
                    )
                    .map((item, index) => (
                        <BuilderElement
                            key={item.id}
                            structure={props.structure.filter(itemInn =>
                                itemInn.path.includes(item.id)
                            )}
                            element={item}
                            // document={props.document}
                            pluginsPathArray={props.pluginsPathArray}
                            sourcePlugin={props.sourcePlugin}
                            routePlugin={props.routePlugin}
                            parentPluginProps={props.parentPluginProps}
                            childrenForPlugin={props.childrenForPlugin}
                            currentResource={props.currentResource}
                            pageInStructure={props.pageInStructure}
                            mD={props.mD}
                            isLocal={props.isLocal}
                            inEntry={props.inEntry}
                            moduleState={props.moduleState}
                            elementsPath={props.elementsPath + '_' + index}
                        />
                    ))
            }
            if (node) nodes[el.id] = node
        }
        return nodes
    }
    let result = null
    if (props.element.childrenTo) {
        result = null
    } else if (props.element.isChildren) {
        const childrenMainElement = props.childrenForPlugin.find(
            itemInn =>
                itemInn.childrenTo === props.element.id &&
                itemInn.forPlugin === props.sourcePlugin
        )

        if (childrenMainElement) {
            const newStructure = props.childrenForPlugin.filter(itemInn =>
                itemInn.path.includes(childrenMainElement.id)
            )

            result = newStructure
                .filter(itemInn => {
                    if (itemInn.path.length > 0) {
                        if (
                            itemInn.path[itemInn.path.length - 1] ===
                            childrenMainElement.id
                        )
                            return true
                    }
                    return false
                })
                .map(item => (
                    <BuilderElement
                        key={item.id}
                        structure={newStructure}
                        element={item}
                        pluginsPathArray={props.pluginsPathArray}
                        sourcePlugin={childrenMainElement.sourcePlugin}
                        routePlugin={props.routePlugin}
                        currentResource={item.fromResource}
                        parentPluginProps={props.parentPluginProps}
                        childrenForPlugin={props.childrenForPlugin}
                        pageInStructure={props.pageInStructure}
                        mD={props.mD}
                        isLocal={props.isLocal}
                        inEntry={props.inEntry}
                    />
                ))
        }
    } else if (props.element.isElementFromCMSVariable) {
        const inheritedPropertyName = props.element.tag

        let parseText = ''

        if (inheritedPropertyName) {
            if (props.parentPluginProps[inheritedPropertyName]) {
                parseText = props.parentPluginProps[inheritedPropertyName]
            }
        }

        return parse(
            sanitize(parseText, {
                allowedTags: false,
                allowedAttributes: false,
            })
        )
    } else if (checkIfCapital(Tag.charAt(0))) {
        const plugin = props.mD.pluginsStructure.find(
            item => item.name === Tag && !item.hidden
        )
        if (plugin) {
            if (!plugin.hidden) {
                const pluginResource = props.mD.resourcesObjects[plugin.id]

                //Pass children to plugin
                const childrenForPlugin = [
                    ...props.structure
                        .filter(itemInn =>
                            itemInn.path.includes(props.element.id)
                        )
                        .map(itemInn => ({
                            ...itemInn,
                            fromResource: props.currentResource,
                        })),
                    ...(props.childrenForPlugin ? props.childrenForPlugin : []),
                ]

                if (!pluginResource.structure) return
                if (plugin.propagating) {
                    result = Array.isArray(refinedProperties.items)
                        ? refinedProperties.items.map(item =>
                              pluginResource.structure
                                  .filter(itemInn =>
                                      isEqual(itemInn.path, ['element_0'])
                                  )
                                  .map((itemInn, index) => {
                                      if (
                                          props.pluginsPathArray.find(
                                              item => item.plugin === plugin.id
                                          )
                                      ) {
                                          return null
                                      }
                                      return (
                                          <BuilderElement
                                              key={itemInn.id}
                                              structure={
                                                  pluginResource.structure
                                              }
                                              element={itemInn}
                                              sourcePlugin={plugin.id}
                                              routePlugin={
                                                  props.routePlugin ||
                                                  props.element.id
                                              }
                                              pluginsPathArray={[
                                                  ...props.pluginsPathArray,
                                                  {
                                                      id: props.element.id,
                                                      plugin: plugin.id,
                                                  },
                                              ]}
                                              currentResource={plugin.id}
                                              parentPluginProps={{
                                                  refinedProperties,
                                                  ...item,
                                              }}
                                              childrenForPlugin={
                                                  childrenForPlugin
                                              }
                                              pageInStructure={
                                                  props.pageInStructure
                                              }
                                              mD={props.mD}
                                              isLocal={props.isLocal}
                                              inEntry={props.inEntry}
                                              elementsPath={
                                                  props.elementsPath +
                                                  '_' +
                                                  index
                                              }
                                          />
                                      )
                                  })
                          )
                        : null
                } else {
                    result = pluginResource.structure
                        .filter(itemInn => isEqual(itemInn.path, ['element_0']))
                        .map((itemInn, index) => {
                            if (
                                props.pluginsPathArray.find(
                                    item => item.plugin === plugin.id
                                )
                            ) {
                                return null
                            }
                            return (
                                <BuilderElement
                                    key={itemInn.id}
                                    structure={pluginResource.structure}
                                    element={itemInn}
                                    sourcePlugin={plugin.id}
                                    routePlugin={
                                        props.routePlugin || props.element.id
                                    }
                                    pluginsPathArray={[
                                        ...props.pluginsPathArray,
                                        {
                                            id: props.element.id,
                                            plugin: plugin.id,
                                        },
                                    ]}
                                    currentResource={plugin.id}
                                    parentPluginProps={refinedProperties}
                                    childrenForPlugin={childrenForPlugin}
                                    pageInStructure={props.pageInStructure}
                                    mD={props.mD}
                                    isLocal={props.isLocal}
                                    inEntry={props.inEntry}
                                    elementsPath={
                                        props.elementsPath + '_' + index
                                    }
                                />
                            )
                        })
                }
            }
        }
    } else {
        if (Tag === 'websiterMenu') {
            const websiterMenuProps = {
                element: props.element,
                elementValues: elementValues,
                refinedProperties: refinedProperties,
                parentPluginProps: props.parentPluginProps,
                childrenForPlugin: props.childrenForPlugin,
                pageInStructure: props.pageInStructure,
                pagesStructure: props.mD.pagesStructure,
                inEntry: props.inEntry,
                elementsPath: props.elementsPath,
                ...getModulePropertiesNodes(Tag),
            }
            const builtItems = buildItemsForMenu(websiterMenuProps)
            const refinedWebsiterMenuProps = {
                refinedProperties: {
                    triggerSubMenuAction: refinedProperties.trigger,
                    subMenuOpenDelay: refinedProperties.subMenuOpenDelay,
                    subMenuCloseDelay: refinedProperties.subMenuCloseDelay,
                    className: refinedProperties.className,
                    mode: refinedProperties.mode,
                    style: refinedProperties.style,
                    builtinPlacements: refinedProperties.builtinPlacements,
                    overflowedIndicator: refinedProperties.overflowedIndicator,
                    topMenuBlockClasses: refinedProperties.topMenuBlockClasses,
                    topMenuItemClasses: refinedProperties.topMenuItemClasses,
                    topMenuItemActiveClasses:
                        refinedProperties.topMenuItemActiveClasses,
                    popupMenuBlockClasses:
                        refinedProperties.popupMenuBlockClasses,
                    popupMenuItemClasses:
                        refinedProperties.popupMenuItemClasses,
                    popupMenuItemActiveClasses:
                        refinedProperties.popupMenuItemActiveClasses,
                },
                pageInStructure: websiterMenuProps.pageInStructure,
                inEntry: websiterMenuProps.inEntry,
                element: websiterMenuProps.element,
                builtItems,
                elementsPath: props.elementsPath,
            }
            result = (
                <div {...attributes}>
                    <script
                        websiterforprocessing="websiterMenu"
                        websiterpropsforelement={props.elementsPath}
                        dangerouslySetInnerHTML={{
                            __html: ` websiterMenuProps_${
                                props.elementsPath
                            } = ${serialize(refinedWebsiterMenuProps)};`,
                        }}
                    />
                    <Menu
                        {...refinedWebsiterMenuProps}
                        {...getModulePropertiesNodes(Tag)}
                        builtItems={builtItems}
                    />
                </div>
            )
        } else if (Tag === 'websiterBasicForm') {
            return (
                <div>
                    <script
                        websiterforprocessing="websiterBasicForm"
                        websiterpropsforelement={props.elementsPath}
                        dangerouslySetInnerHTML={{
                            __html: ` websiterBasicFormProps_${
                                props.elementsPath
                            } = ${serialize({
                                refinedProperties: refinedProperties,
                                inEntry: props.inEntry,
                                elementsPath: props.elementsPath,
                            })};`,
                        }}
                    />
                    <BasicForm
                        refinedProperties={refinedProperties}
                        {...getModulePropertiesNodes(Tag)}
                        inEntry={props.inEntry}
                        elementsPath={props.elementsPath}
                    />
                </div>
            )
        } else if (Tag === 'websiterDrawer') {
            return (
                <div>
                    <script
                        websiterforprocessing="websiterDrawer"
                        websiterpropsforelement={props.elementsPath}
                        dangerouslySetInnerHTML={{
                            __html: ` websiterDrawerProps_${
                                props.elementsPath
                            } = ${serialize({
                                refinedProperties: refinedProperties,
                                parentPluginProps: props.parentPluginProps,
                                childrenForPlugin: props.childrenForPlugin,
                                pageInStructure: props.pageInStructure,
                                // ...getModulePropertiesNodes(Tag),
                                inEntry: props.inEntry,
                                elementsPath: props.elementsPath,
                            })};`,
                        }}
                    />
                    <Drawer
                        element={props.element}
                        refinedProperties={refinedProperties}
                        parentPluginProps={props.parentPluginProps}
                        childrenForPlugin={props.childrenForPlugin}
                        pageInStructure={props.pageInStructure}
                        {...getModulePropertiesNodes(Tag)}
                        inEntry={props.inEntry}
                        elementsPath={props.elementsPath}
                    />
                </div>
            )
        }
        //  else if (Tag === 'websiterGallery') {
        //     let items = refinedProperties.items || []
        //     if (refinedProperties.originalClass) {
        //         items = items.map(item => ({
        //             ...item,
        //             originalClass: refinedProperties.originalClass,
        //         }))
        //     }
        //     const settings = {
        //         dots: true,
        //         infinite: true,
        //         speed: 500,
        //         slidesToShow: 1,
        //         slidesToScroll: 1,
        //     }
        //     return (
        //         <div>
        //             <Slider
        //                 // element={props.element}
        //                 // elementValues={props.elementValues}
        //                 // document={props.document}
        //                 // parentPluginProps={props.parentPluginProps}
        //                 // childrenForPlugin={props.childrenForPlugin}
        //                 {...settings}
        //                 {...refinedProperties}
        //                 {...getModulePropertiesNodes(Tag)}
        //                 inEntry={props.inEntry}
        //             >
        //                 <div>
        //                     <div
        //                         style={{
        //                             width: '100px',
        //                             height: '100px',
        //                             background: 'red',
        //                         }}
        //                     >
        //                         sdfsdf
        //                     </div>
        //                 </div>
        //                 {props.currentWebsiteObject && props.filesStructure
        //                     ? items.map((item, index) => {
        //                           return (
        //                               <div key={index}>
        //                                   <img src={item.original} />
        //                               </div>
        //                           )
        //                       })
        //                     : null}
        //             </Slider>
        //         </div>
        //     )
        // }
        else if (Tag === 'richEditor') {
            return parse(
                sanitize(elementValues.textContent, {
                    allowedTags: false,
                    allowedAttributes: false,
                })
            )
        } else if (props.element.text) {
            if (elementValues.textContent) {
                result = (
                    <>
                        {elementValues.textContent.replace(
                            /\$[^:;\$\s]*\$/g,
                            match => {
                                const inheritedPropertyName = getInheritedPropertyName(
                                    match
                                )
                                return inheritedPropertyName
                                    ? props.parentPluginProps[
                                          inheritedPropertyName
                                      ] || ''
                                    : ''
                            }
                        )}
                    </>
                )
            }
        } else {
            const innerResult = [
                ...props.structure
                    .filter(item => isEqual(item.path, currentPath))
                    .map((item, index) => (
                        <BuilderElement
                            key={item.id}
                            structure={props.structure}
                            element={item}
                            pluginsPathArray={props.pluginsPathArray}
                            sourcePlugin={props.sourcePlugin}
                            routePlugin={props.routePlugin}
                            currentResource={props.currentResource}
                            parentPluginProps={props.parentPluginProps}
                            childrenForPlugin={props.childrenForPlugin}
                            pageInStructure={props.pageInStructure}
                            mD={props.mD}
                            isLocal={props.isLocal}
                            inEntry={props.inEntry}
                            elementsPath={props.elementsPath + '_' + index}
                        />
                    )),
                ...(props.element.id === 'element_0' && props.renderBodyAndHead
                    ? [
                          props.isLocal ? (
                              <meta
                                  key="sys0"
                                  name="robots"
                                  content="noindex, follow"
                              />
                          ) : null,
                          <base key="sys6" href={props.mD.base} />,
                          <link
                              key="sys1"
                              rel="stylesheet"
                              type="text/css"
                              href="https://websiter.s3.us-east-2.amazonaws.com/systemClasses.css"
                          />,
                          //   <script
                          //       key="sys2"
                          //       dangerouslySetInnerHTML={{
                          //           __html: ` window.__MD__ = ${serialize(
                          //               props.mD
                          //           )};`,
                          //       }}
                          //   />,
                      ]
                    : []),

                ...(props.element.id === 'element_1' &&
                props.renderBodyAndHead &&
                !props.inEntry
                    ? [
                          <script key="sys3" src="/index.js" charSet="utf-8" />,
                          <script
                              key="sys4"
                              src="/vendor.js"
                              charSet="utf-8"
                          />,
                          <a
                              href="http://websiter.dev"
                              key="sys5"
                              style={{
                                  transform: 'rotate(-90deg) !important',
                                  color: '#3f00f9 !important',
                                  position: 'fixed !important',
                                  right: '0px !important',
                                  bottom: '210px !important',
                                  zIndex: '2147483647 !important',
                                  display: 'block !important',
                                  padding: '0px 5px !important',
                                  margin: '0px !important',
                                  borderRadius: '5px !important',
                                  background: 'white !important',
                                  transformOrigin: 'bottom right !important',
                                  cursor: 'pointer  !important',
                                  fontSize: '14px !important',
                                  textDecoration: 'none',
                                  fontFamily: 'arial !important',
                              }}
                          >
                              Created with Websiter.dev
                          </a>,
                      ]
                    : []),
            ]

            // Tag = Tag.replace(/[^a-z0-9]/g, '')
            Tag = Tag.trim()

            if (/^([a-zA-Z][a-zA-Z0-9]*)$/.test(Tag)) {
                if (
                    [
                        'area',
                        'base',
                        'br',
                        'col',
                        'embed',
                        'hr',
                        'img',
                        'input',
                        'keygen',
                        'link',
                        'meta',
                        'param',
                        'source',
                        'track',
                        'wbr',
                    ].includes(Tag)
                ) {
                    result = <Tag {...attributes} />
                } else if (Tag === 'style') {
                    result = (
                        <Tag
                            {...attributes}
                            dangerouslySetInnerHTML={{
                                __html: entities.decode(
                                    renderToString(innerResult)
                                ),
                            }}
                        />
                    )
                } else {
                    result = <Tag {...attributes}>{innerResult}</Tag>
                }
            }
            // }
        }
    }
    return result
}

const BuilderElement = _BuilderElement

export default BuilderElement

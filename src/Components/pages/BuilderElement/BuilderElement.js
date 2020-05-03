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
                    .map(item => (
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
                                  .map(itemInn => {
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
                                          />
                                      )
                                  })
                          )
                        : null
                } else {
                    result = pluginResource.structure
                        .filter(itemInn => isEqual(itemInn.path, ['element_0']))
                        .map(itemInn => {
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
                                />
                            )
                        })
                }
            }
        }
    } else {
        if (Tag === 'websiterMenu') {
            result = (
                <div {...attributes}>
                    <Menu
                        element={props.element}
                        elementValues={elementValues}
                        refinedProperties={refinedProperties}
                        parentPluginProps={props.parentPluginProps}
                        childrenForPlugin={props.childrenForPlugin}
                        pageInStructure={props.pageInStructure}
                        mD={props.mD}
                        {...getModulePropertiesNodes(Tag)}
                    />
                </div>
            )
        } else if (Tag === 'websiterDrawer') {
            return (
                <div>
                    <Drawer
                        element={props.element}
                        refinedProperties={refinedProperties}
                        parentPluginProps={props.parentPluginProps}
                        childrenForPlugin={props.childrenForPlugin}
                        pageInStructure={props.pageInStructure}
                        {...getModulePropertiesNodes(Tag)}
                    />
                </div>
            )
        } else if (Tag === 'websiterGallery') {
            let items = refinedProperties.items || []
            if (refinedProperties.originalClass) {
                items = items.map(item => ({
                    ...item,
                    originalClass: refinedProperties.originalClass,
                }))
            }
            const settings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
            return (
                <div>
                    <Slider
                        // element={props.element}
                        // elementValues={props.elementValues}
                        // document={props.document}
                        // parentPluginProps={props.parentPluginProps}
                        // childrenForPlugin={props.childrenForPlugin}
                        {...settings}
                        {...refinedProperties}
                        {...getModulePropertiesNodes(Tag)}
                    >
                        <div>
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    background: 'red',
                                }}
                            >
                                sdfsdf
                            </div>
                        </div>
                        {props.currentWebsiteObject && props.filesStructure
                            ? items.map((item, index) => {
                                  return (
                                      <div key={index}>
                                          <img src={item.original} />
                                      </div>
                                  )
                              })
                            : null}
                    </Slider>
                </div>
            )
        } else if (Tag === 'richEditor') {
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
                    .map(item => (
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
                          <base href={props.mD.base} />,
                          <link
                              key="sys1"
                              rel="stylesheet"
                              type="text/css"
                              href="https://websiter.s3.us-east-2.amazonaws.com/systemClasses.css"
                          />,
                          <script
                              key="sys2"
                              dangerouslySetInnerHTML={{
                                  __html: ` window.__MD__ = ${serialize(
                                      props.mD
                                  )};`,
                              }}
                          />,
                      ]
                    : []),
                ...(props.element.id === 'element_1' && props.renderBodyAndHead
                    ? [
                          <script key="sys3" src="/index.js" charSet="utf-8" />,
                          <script
                              key="sys4"
                              src="/vendor.js"
                              charSet="utf-8"
                          />,
                          <a style="transform: rotate(-90deg);color: white; position: fixed;right: 0px; bottom: 50px;z-index:2147483647;display:block;padding:5px 10px;border-radius:5px;">
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

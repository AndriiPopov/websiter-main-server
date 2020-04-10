import React, { useRef, useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import parse from 'html-react-parser'
import sanitize from 'sanitize-html'
import Menu from '../Menu/Menu'
import { renderToString } from 'react-dom/server'

import { checkIfCapital, getInheritedPropertyName } from '../utils/basic'
import { setBoxProperties } from './methods/useEffect'
import refineProperties from './methods/refineProperties'
import { AllHtmlEntities as Entities } from 'html-entities'
import { modulesPropertyNodes } from '../utils/modulesIndex'
var serialize = require('serialize-javascript')

const entities = new Entities()

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
                            mD={props.mD}
                            renderBody={props.renderBody}
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
                        renderBody={props.renderBody}
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
        const plugin = props.mD.pluginsStructure.find(item => item.name === Tag)
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
                                              renderBody={props.renderBody}
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
                                    renderBody={props.renderBody}
                                />
                            )
                        })
                }
            }
        }
    } else {
        if (Tag === 'websiterMenu') {
            const attributes = setBoxProperties(
                ownRefinedProperties,
                props,
                elementValues
            )
            result = (
                <div {...attributes}>
                    <Menu
                        element={props.element}
                        elementValues={elementValues}
                        parentPluginProps={props.parentPluginProps}
                        childrenForPlugin={props.childrenForPlugin}
                        pageInStructure={props.pageInStructure}
                        mD={props.mD}
                        renderBody={props.renderBody}
                        {...getModulePropertiesNodes(Tag)}
                    />
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
                result = elementValues.textContent.replace(
                    /\$[^:;\$\s]*\$/g,
                    match => {
                        const inheritedPropertyName = getInheritedPropertyName(
                            match
                        )
                        return inheritedPropertyName
                            ? props.parentPluginProps[inheritedPropertyName] ||
                                  ''
                            : ''
                    }
                )
            }
        } else {
            const innerResult =
                props.element.id === 'element_1' && !props.renderBody
                    ? null
                    : [
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
                                      parentPluginProps={
                                          props.parentPluginProps
                                      }
                                      childrenForPlugin={
                                          props.childrenForPlugin
                                      }
                                      pageInStructure={props.pageInStructure}
                                      mD={props.mD}
                                      renderBody={props.renderBody}
                                  />
                              )),
                          props.element.id === 'element_0' ? (
                              <>
                                  <link
                                      rel="stylesheet"
                                      type="text/css"
                                      href="https://websiter.s3.us-east-2.amazonaws.com/systemClasses.css"
                                  />
                                  <script
                                      dangerouslySetInnerHTML={{
                                          __html: ` window.__MD__ = ${serialize(
                                              props.mD
                                          )};`,
                                      }}
                                  />
                              </>
                          ) : null,
                          props.element.id === 'element_1' ? (
                              <>
                                  <script src="/index.js" charset="utf-8" />
                                  <script src="/vendor.js" charset="utf-8" />
                              </>
                          ) : null,
                      ]

            Tag = Tag.replace(/[^a-z]/g, '')
            Tag = Tag.trim()
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
                const attributes = setBoxProperties(
                    ownRefinedProperties,
                    props,
                    elementValues
                )
                result = <Tag {...attributes} />
            } else {
                const attributes = setBoxProperties(
                    ownRefinedProperties,
                    props,
                    elementValues
                )
                result = <Tag {...attributes}>{innerResult}</Tag>
            }
            // }
        }
    }
    return result
}

const BuilderElement = _BuilderElement

export default BuilderElement

var React = require('react')
// var Layout = require('./layout')
import BuilderElement from './BuilderElement/BuilderElement'
import { refinePropertiesFromCMS } from './BuilderElement/methods/refineProperties'

// Contrived example to show how one might use Flow type annotations

const Index = props => {
    const mD = props.mD

    const currentPageItemInStructure = mD.pagesStructure.find(
        item => item.id === mD.page
    )
    if (mD.structure.length > 0) {
        const bodyElement = mD.structure.filter(
            item => item.path.length === 1
        )[1]
        const bodyProps = bodyElement.properties
        const bodyStyle = bodyElement.style
        if (bodyStyle) bodyProps.style = bodyStyle
        // for (let attr in bodyProps) {
        //     document.body.setAttribute(attr, bodyProps[attr])
        // }

        const htmlElement = mD.structure.filter(
            item => item.path.length === 0
        )[0]
        const htmlProps = htmlElement.properties
        const htmlStyle = htmlElement.style
        if (htmlStyle) htmlProps.style = htmlStyle
        // for (let attr in htmlProps) {
        //     document.documentElement.setAttribute(attr, htmlProps[attr])
        // }

        const refinedProperties = refinePropertiesFromCMS({
            resourcesObjects: mD.resourcesObjects,
            pageTemplateFSBDraft: mD.resourcesObjects[mD.template],
            currentPageFSBDraft: mD.resourcesObjects[mD.page],
            globalSettingsPageDraft:
                mD.resourcesObjects[mD.globalSettingsPageId],
            globalSettingsTemplateDraft:
                mD.resourcesObjects[mD.globalSettingsTemplateId],
        })
        const pageResult = !props.renderBody
            ? mD.structure
                  .filter(itemInn => itemInn.id === 'element_01')
                  .map((itemInn, index) => {
                      const result = (
                          <BuilderElement
                              key={itemInn.id}
                              structure={mD.structure}
                              element={itemInn}
                              resourceDraft={
                                  mD.template
                                      ? mD.resourcesObjects[mD.template]
                                      : {}
                              }
                              currentResource={mD.template}
                              pluginsPathArray={[]}
                              pageInStructure={currentPageItemInStructure}
                              parentPluginProps={refinedProperties}
                              mD={mD}
                              renderBody={props.renderBody}
                          />
                      )
                      return result
                  })
            : [
                  ...mD.structure
                      .filter(
                          itemInn =>
                              itemInn.path.length === 2 &&
                              itemInn.path[1] === 'element_1'
                      )
                      .map((itemInn, index) => {
                          const result = (
                              <BuilderElement
                                  key={itemInn.id}
                                  structure={mD.structure}
                                  element={itemInn}
                                  resourceDraft={
                                      mD.template
                                          ? mD.resourcesObjects[mD.template]
                                          : {}
                                  }
                                  currentResource={mD.template}
                                  pluginsPathArray={[]}
                                  pageInStructure={currentPageItemInStructure}
                                  parentPluginProps={refinedProperties}
                                  mD={mD}
                                  renderBody={props.renderBody}
                              />
                          )
                          return result
                      }),
                  <script src="/index.js" charset="utf-8" />,
                  <script src="/vendor.js" charset="utf-8" />,
              ]
        return pageResult
    } else {
        return null
    }
}
export default Index

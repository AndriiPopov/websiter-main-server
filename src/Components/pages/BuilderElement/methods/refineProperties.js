import { getInheritedPropertyName } from '../../utils/basic'
// import { CloudFrontUrl, bucket } from '../../awsConfig'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { getFileUrl } from '../../../../utils/getFileUrl'

const toRGBAString = rgb =>
    rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` : 'rgba(0,0,0,0)'

export default (props, elementValues) => {
    const result = {}
    for (let attribute in elementValues.properties) {
        const inheritedPropertyName = getInheritedPropertyName(
            elementValues.properties[attribute]
        )
        result[attribute] = inheritedPropertyName
            ? props.parentPluginProps[inheritedPropertyName]
            : elementValues.properties[attribute]
        if (result[attribute])
            result[attribute] = JSON.parse(
                JSON.stringify(result[attribute]).replace(
                    // /\$[^:;\$\s]*\$/g,
                    /\$[A-Za-z0-9_-]*\$/g,
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
            )
        // if (attribute === 'src') {
        //     let url = result[attribute] || ''
        //     const path = url.split('/')
        //     if (path.length > 1) {
        //         if (path[0] === 'websiter') {
        //             path.shift()
        //             let width, height
        //             if (path.length > 1) {
        //                 const sizes = path[path.length - 1]
        //                 const indexW = sizes.indexOf('w')
        //                 const indexH = sizes.indexOf('h')
        //                 if (indexW > -1 && indexH > -1) {
        //                     if (indexW < indexH) {
        //                         width = sizes.substr(indexW + 1, indexH - 1)
        //                         height = sizes.substr(indexH + 1)
        //                     } else {
        //                         height = sizes.substr(indexH + 1, indexW - 1)
        //                         width = sizes.substr(indexW + 1)
        //                     }
        //                 } else {
        //                     if (indexW > -1) width = sizes.substr(indexW + 1)
        //                     if (indexH > -1) height = sizes.substr(indexH + 1)
        //                 }
        //             }

        //             if (isNaN(width)) width = null
        //             else width = parseInt(width)
        //             if (isNaN(height)) height = null
        //             else height = parseInt(height)

        //             if (width || height) {
        //                 path.pop()
        //             }

        //             const imageRequest = JSON.stringify({
        //                 bucket: bucket,
        //                 key: path.join('/'),
        //                 edits: {
        //                     resize: {
        //                         width: width || '',
        //                         height: height || null,
        //                         fit: 'cover',
        //                         background: { r: 0, g: 0, b: 0, alpha: 0 },
        //                     },
        //                     toFormat: 'png',
        //                 },
        //             })

        //             url = `${CloudFrontUrl}/${btoa(imageRequest)}`
        //             result[attribute] = url
        //         }
        //     }
        // }
    }

    return {
        refinedProperties: { ...props.parentPluginProps, ...result },
        ownRefinedProperties: result,
    }
}

export const refinePropertiesFromCMS = mD => {
    const addVariable = (
        mD,
        item,
        currentPageDraft,
        pageTemplateDraft,
        pluginId
    ) => {
        if (!pageTemplateDraft) return
        const resourceVariable = currentPageDraft.values[item.id]
        const templateItemId = item.forPropagatingPlugin
            ? item.forPropagatingPlugin.variable
            : item.id

        const itemValues = pageTemplateDraft.values[templateItemId]
        if (itemValues.CMSVariableSystemName)
            if (itemValues.CMSVariableType === 'menuItems') {
                return {
                    [itemValues.CMSVariableSystemName]: resourceVariable
                        ? resourceVariable.menuItems
                            ? resourceVariable.menuItems.length > 0
                                ? resourceVariable.menuItems
                                : itemValues.defaultMenuItems
                            : itemValues.defaultMenuItems
                        : itemValues.defaultMenuItems,
                }
            } else if (itemValues.CMSVariableType === 'file') {
                return {
                    [itemValues.CMSVariableSystemName]: getFileUrl(
                        mD.filesStructure,
                        resourceVariable
                            ? resourceVariable.fileUrl ||
                                  itemValues.defaultFileUrl
                            : itemValues.defaultFileUrl,
                        false,
                        resourceVariable
                            ? resourceVariable.fileThumbnail ||
                                  itemValues.fileThumbnail
                            : itemValues.fileThumbnail
                    ),
                    // 'http://live.websiter.dev:5000/' +
                    // mD.currentWebsiteObject.domain +
                    // (resourceVariable
                    //     ? resourceVariable.fileUrl ||
                    //       itemValues.defaultFileUrl
                    //     : itemValues.defaultFileUrl),
                }
            } else if (
                itemValues.CMSVariableType === 'colorSelect' ||
                itemValues.CMSVariableType === 'color'
            ) {
                return {
                    [itemValues.CMSVariableSystemName]: toRGBAString(
                        resourceVariable && resourceVariable.color
                            ? resourceVariable.color
                            : itemValues.defaultColor
                    ),
                }
            } else if (
                itemValues.CMSVariableType.indexOf('propagating_') === 0 ||
                itemValues.CMSVariableType === 'array'
            ) {
                const forPluginId =
                    itemValues.CMSVariableType === 'array'
                        ? pluginId
                        : itemValues.CMSVariableType.slice(
                              'propagating_'.length
                          )
                const forPluginDraft = mD.resourcesObjects[forPluginId]

                const propagatingValue = []
                const children = currentPageDraft.structure.filter(el =>
                    isEqual([...item.path, item.id], el.path)
                )
                for (let child of children) {
                    let propagatingItem = {}
                    const innerChildPath = [...child.path, child.id]

                    const childVariables = currentPageDraft.structure
                        .filter(el =>
                            isEqual(
                                el.path.slice(0, innerChildPath.length),
                                innerChildPath
                            )
                        )
                        .filter(el =>
                            el.forPropagatingPlugin
                                ? el.forPropagatingPlugin.pluginId ===
                                  forPluginId
                                : false
                        )

                    for (let el of childVariables) {
                        const value = addVariable(
                            mD,
                            el,
                            currentPageDraft,
                            forPluginDraft,
                            forPluginId
                        )

                        if (value) {
                            propagatingItem = {
                                ...propagatingItem,
                                ...value,
                            }
                        }
                    }
                    propagatingValue.push(propagatingItem)
                }
                return {
                    [itemValues.CMSVariableSystemName]: propagatingValue,
                }
            } else {
                return {
                    [itemValues.CMSVariableSystemName]: resourceVariable
                        ? resourceVariable.value ||
                          itemValues.CMSVariableDefaultValue
                        : itemValues.CMSVariableDefaultValue,
                }
            }
    }
    const refine = (mD, currentPageDraft, pageTemplateDraft, templateId) => {
        let result = {}
        if (pageTemplateDraft && currentPageDraft) {
            for (let item of pageTemplateDraft.structure) {
                if (item.path.length > 0) {
                    if (item.path[0] === 'element_02') {
                        const value = addVariable(
                            mD,
                            {
                                ...item,
                                path: item.path.filter(
                                    id => id !== 'element_02'
                                ),
                            },
                            currentPageDraft,
                            pageTemplateDraft,
                            templateId
                        )
                        if (value) {
                            result = { ...result, ...value }
                        }
                    }
                }
            }
        }
        return result
    }
    const refinedPropertiesPage = refine(
        mD,
        mD.currentPageFSBDraft,
        mD.pageTemplateFSBDraft,
        mD.pageTemplateFSBId
    )
    const refinedPropertiesGlobal = refine(
        mD,
        mD.globalSettingsPageDraft,
        mD.globalSettingsTemplateDraft,
        mD.globalSettingsTemplateId
    )
    return { ...refinedPropertiesGlobal, ...refinedPropertiesPage }
}

// export const refinePropertiesFromCMS = mD => {
//     const addVariable = (item, currentPageDraft, pageTemplateDraft) => {
//         const resourceVariable = currentPageDraft.values[item.id]
//         const templateItemId = item.forPropagatingPlugin
//             ? item.forPropagatingPlugin.variable
//             : item.id

//         const itemValues = pageTemplateDraft.values[templateItemId]
//         if (itemValues.CMSVariableSystemName)
//             if (itemValues.CMSVariableType === 'menuItems') {
//                 return {
//                     [itemValues.CMSVariableSystemName]: resourceVariable
//                         ? resourceVariable.menuItems
//                             ? resourceVariable.menuItems.length > 0
//                                 ? resourceVariable.menuItems
//                                 : itemValues.defaultMenuItems
//                             : itemValues.defaultMenuItems
//                         : itemValues.defaultMenuItems,
//                 }
//             } else if (
//                 itemValues.CMSVariableType.indexOf('propagating_') === 0
//             ) {
//                 const forPluginId = itemValues.CMSVariableType.slice(
//                     'propagating_'.length
//                 )
//                 const forPluginDraft = mD.resourcesObjects[forPluginId]
//                 const propagatingValue = []
//                 const children = currentPageDraft.structure.filter(el =>
//                     isEqual([...item.path, item.id], el.path)
//                 )

//                 for (let child of children) {
//                     let propagatingItem = {}
//                     const childVariables = currentPageDraft.structure
//                         .filter(el =>
//                             isEqual([...child.path, child.id], el.path)
//                         )
//                         .filter(el =>
//                             el.forPropagatingPlugin
//                                 ? el.forPropagatingPlugin.pluginId ===
//                                   forPluginId
//                                 : false
//                         )

//                     for (let el of childVariables) {
//                         const value = addVariable(
//                             el,
//                             currentPageDraft,
//                             forPluginDraft
//                         )

//                         if (value) {
//                             propagatingItem = {
//                                 ...propagatingItem,
//                                 ...value,
//                             }
//                         }
//                     }
//                     propagatingValue.push(propagatingItem)
//                 }
//                 return {
//                     [itemValues.CMSVariableSystemName]: propagatingValue,
//                 }
//             } else {
//                 return {
//                     [itemValues.CMSVariableSystemName]: resourceVariable
//                         ? resourceVariable.value ||
//                           itemValues.CMSVariableDefaultValue
//                         : itemValues.CMSVariableDefaultValue,
//                 }
//             }
//     }
//     const refine = (currentPageDraft, pageTemplateDraft) => {
//         let result = {}
//         if (pageTemplateDraft && currentPageDraft) {
//             for (let item of pageTemplateDraft.structure) {
//                 if (item.path.length > 0) {
//                     if (item.path[0] === 'element_02') {
//                         const value = addVariable(
//                             {
//                                 ...item,
//                                 path: item.path.filter(
//                                     id => id !== 'element_02'
//                                 ),
//                             },
//                             currentPageDraft,
//                             pageTemplateDraft
//                         )
//                         if (value) {
//                             result = { ...result, ...value }
//                         }
//                     }
//                 }
//             }
//         }
//         return result
//     }
//     const refinedPropertiesPage = refine(
//         mD.currentPageFSBDraft,
//         mD.pageTemplateFSBDraft
//     )
//     const refinedPropertiesGlobal = refine(
//         mD.globalSettingsPageDraft,
//         mD.globalSettingsTemplateDraft
//     )
//     return { ...refinedPropertiesGlobal, ...refinedPropertiesPage }
// }

// export const refinePropertiesFromCMS = mD => {
//     const refine = (currentPageDraft, pageTemplateDraft) => {
//         const result = {}
//         if (pageTemplateDraft && currentPageDraft)
//             pageTemplateDraft.structure.forEach(item => {
//                 if (item.path.length > 0) {
//                     if (item.path[0] === 'element_02') {
//                         const resourceVariable =
//                             currentPageDraft.values[item.id]

//                         const itemValues = pageTemplateDraft.values[item.id]
//                         if (itemValues.CMSVariableSystemName)
//                             if (itemValues.CMSVariableType === 'menuItems') {
//                                 result[
//                                     itemValues.CMSVariableSystemName
//                                 ] = resourceVariable
//                                     ? resourceVariable.menuItems
//                                         ? resourceVariable.menuItems.length > 0
//                                             ? resourceVariable.menuItems
//                                             : itemValues.defaultMenuItems
//                                         : itemValues.defaultMenuItems
//                                     : itemValues.defaultMenuItems
//                             } else {
//                                 result[
//                                     itemValues.CMSVariableSystemName
//                                 ] = resourceVariable
//                                     ? resourceVariable.value ||
//                                       itemValues.CMSVariableDefaultValue
//                                     : itemValues.CMSVariableDefaultValue
//                             }
//                     }
//                 }
//             })
//         return result
//     }
//     const refinedPropertiesPage = refine(
//         mD.currentPageDraft,
//         mD.pageTemplateDraft
//     )
//     const refinedPropertiesGlobal = refine(
//         mD.globalSettingsPageDraft,
//         mD.globalSettingsTemplateDraft
//     )
//     return { ...refinedPropertiesGlobal, ...refinedPropertiesPage }
// }

import { getInheritedPropertyName } from '../../utils/basic'

import camelCase from 'camelcase'
import styleToObject from 'style-to-object'

const styleToCamelcase = style => {
    const result = {}
    styleToObject(style, (name, value) => {
        result[camelCase(name)] = value
    })
    return result
}

export const setBoxProperties = (
    ownRefinedProperties,
    props,
    elementValues
) => {
    const result = {}

    if (elementValues.style) {
        const style = elementValues.style.replace(/\$[^:;\$\s]*\$/g, match => {
            const inheritedPropertyName = getInheritedPropertyName(match)
            return inheritedPropertyName
                ? props.parentPluginProps[inheritedPropertyName] || ''
                : ''
        })
        result.style = styleToCamelcase(style)
    }

    for (let attribute in ownRefinedProperties) {
        const attr = attribute.toLowerCase()
        switch (attr) {
            case 'style':
                break
            case '':
                break
            case 'class':
                result.className = ownRefinedProperties.class
                break
            case 'for':
                result.htmlFor = ownRefinedProperties.for
                break
            case 'href':
                if (
                    ownRefinedProperties[attr].indexOf('http://') > -1 ||
                    ownRefinedProperties[attr].indexOf('https://') > -1
                ) {
                    result.href = ownRefinedProperties[attr]
                } else {
                    result.href = props.mD.baseUrl + ownRefinedProperties[attr]
                }
                break
            default:
                result[attr] = ownRefinedProperties[attr]
                break
        }
    }
    return result
}

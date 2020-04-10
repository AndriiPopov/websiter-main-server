import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'

export const findDecedants = (items, id) => {
    return items.filter(item =>
        item.path.some(element => element.toString() === id.toString())
    )
}

export const findDirectChildren = (items, id) => {
    const elements = items.filter(item => item.id === id)
    if (elements.length !== 1) {
        return []
    } else {
        return items.filter(item =>
            isEqual(item.path, [...elements[0].path, id])
        )
    }
}

export const buildItems = (children, path, result) => {
    const doBuildItems = (children, path) => {
        children.forEach(element => {
            result.push({
                ...omit(element, [
                    'children',
                    'resourceDraft',
                    'currentResource',
                    'mode',
                    'pluginsStructure',
                ]),
                path,
            })
            doBuildItems(element.children, [...path, element.id])
        })
    }
    doBuildItems(children, path)
    return result
}

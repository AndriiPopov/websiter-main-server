export const findDescendants = (
    items: Array<Object>,
    id: string
): Array<Object> => {
    return items.filter(item =>
        item.path.some(element => element.toString() === id.toString())
    )
}

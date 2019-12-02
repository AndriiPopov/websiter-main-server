module.exports.findDescendants = (items, id) => {
    return items.filter(item =>
        item.path.some(element => element.toString() === id.toString())
    )
}

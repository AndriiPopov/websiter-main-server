module.exports.findDescendants = (items, id) => {
    try {
        return items.filter(item =>
            item.path.some(element => element.toString() === id.toString())
        )
    } catch (ex) {}
}

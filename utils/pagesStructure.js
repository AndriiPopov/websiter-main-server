module.exports.findDescendants = (items, id) => {
    return items.filter( item => item.path.indexOf(id.toString()) >= 0 );
}
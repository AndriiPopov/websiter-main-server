module.exports = async (req, res, next) => {
    if (
        req.user.websites.some(
            website => website.toString() === req.params.id.toString()
        )
    ) {
        next()
    } else {
        return res
            .status(404)
            .send('The website with the given ID was not found.')
    }
}

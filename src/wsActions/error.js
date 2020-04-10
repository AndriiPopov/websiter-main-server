module.exports.sendError = (ws, text, toLogout) => {
    try {
        ws.send(
            JSON.stringify({
                messageCode: 'error',
                text:
                    text ||
                    'An error occured during this operation. If the error persists, try to refresh the page.',
            })
        )
        if (toLogout) toLogout()
    } catch (ex) {}
}

module.exports.logout = ws => {
    try {
        ws.send(
            JSON.stringify({
                messageCode: 'logout',
            })
        )
        ws.terminate()
    } catch (ex) {}
}

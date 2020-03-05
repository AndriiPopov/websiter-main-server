const {
    addResource,
    updateResource,
    deleteResource,
    publishResource,
    revertResource,
} = require('../wsActions/resources')
const {
    addWebsite,
    deleteWebsite,
    verifyCustomDomain,
    addUserInSharing,
    transferWebsite,
    saveDomainName,
} = require('../wsActions/websites')
const { renameImage, deleteImage, addImage } = require('../wsActions/images')
const { deleteUser, logoutAll } = require('../wsActions/user')
const { pushChanges } = require('../wsActions/pushChanges')
const { heartbeat } = require('../wsActions/heartbeat')
const { auth } = require('../wsActions/auth')
const { requestResource } = require('../wsActions/requestResource')
const { saveUserSettings } = require('../wsActions/saveUserSettings')
const { RateLimiterMemory } = require('rate-limiter-flexible')
const { sendError } = require('../wsActions/error')
const { Server } = require('ws')

const rateLimiter = new RateLimiterMemory({
    points: 50,
    duration: 4,
})

const connectSocket = server => {
    try {
        const wss = new Server({ server })
        setTimeout(() => pushChanges(wss), 4000)

        wss.on('connection', function connection(ws) {
            ws.resources = {}
            ws.isAlive = true
            ws.createdTime = Date.now()

            ws.on('message', async message => {
                try {
                    if (ws.createdTime + 5000 < Date.now())
                        await rateLimiter.consume(ws.user)

                    const data = JSON.parse(message)
                    // console.log(data)
                    switch (data.messageCode) {
                        case 'heartbeat':
                            heartbeat(ws, data)
                            break
                        case 'auth':
                            auth(ws, data)
                            break
                        case 'requestResource':
                            requestResource(data, ws)
                            break
                        case 'addWebsite':
                            addWebsite(data, ws)
                            break
                        case 'deleteWebsite':
                            deleteWebsite(data, ws)
                            break
                        case 'addResource':
                            addResource(data, ws)
                            break
                        case 'updateResource':
                            updateResource(data, ws)
                            break
                        case 'deleteResource':
                            deleteResource(data, ws)
                            break
                        case 'publishResource':
                            publishResource(data, ws)
                            break
                        case 'revertResource':
                            revertResource(data, ws)
                            break
                        case 'saveSettings':
                            saveUserSettings(data, ws)
                            break
                        case 'verifyCustomDomain':
                            verifyCustomDomain(data, ws)
                            break
                        case 'addUserInSharing':
                            addUserInSharing(data, ws)
                            break
                        case 'transferWebsite':
                            transferWebsite(data, ws)
                            break
                        case 'saveDomainName':
                            saveDomainName(data, ws)
                            break
                        case 'deleteUser':
                            deleteUser(ws)
                            break
                        case 'logoutAll':
                            logoutAll(ws, wss)
                            break
                        case 'renameImage':
                            renameImage(data, ws)
                            break
                        case 'deleteImage':
                            deleteImage(data, ws)
                            break
                        case 'addImage':
                            addImage(data, ws)
                            break

                        default:
                            break
                    }
                } catch (rejRes) {
                    sendError(
                        ws,
                        'Your connection with server is overloaded. Please try again later.'
                    )
                }
            })
            ws.on('close', async () => {})
        })

        const interval = setInterval(() => {
            wss.clients.forEach(async ws => {
                if (ws.isAlive === false) {
                    return ws.terminate()
                }
                ws.isAlive = false
                ws.send(
                    JSON.stringify({
                        messageCode: 'heartbeat',
                    })
                )
            })
        }, 30000)
    } catch (ex) {}
}

module.exports = connectSocket

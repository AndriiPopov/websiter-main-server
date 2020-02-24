const { User } = require('../models/user')
const { Website } = require('../models/website')
const { Resource } = require('../models/resource')
const WebSocket = require('ws')
const { sendError } = require('./error')

module.exports.pushChanges = wss => {
    try {
        const pipe = [
            {
                $project: {
                    'fullDocument.__patch__': 1,
                    'fullDocument.__v': 1,
                    'fullDocument._id': 1,
                    documentKey: 1,
                    operationType: 1,
                },
            },
        ]
        Resource.watch(pipe, {
            fullDocument: 'updateLookup',
        }).on('change', data => pushChange(data, 'resource'))
        Website.watch(pipe, { fullDocument: 'updateLookup' }).on(
            'change',
            data => pushChange(data, 'website')
        )
        User.watch(pipe, { fullDocument: 'updateLookup' }).on('change', data =>
            pushChange(data, 'user')
        )

        const pushChange = (data, type) => {
            try {
                if (
                    data.operationType === 'update' ||
                    data.operationType === 'delete'
                ) {
                    wss.clients.forEach(client => {
                        if (!client.tryWebsiter) {
                            if (
                                client.readyState === WebSocket.OPEN &&
                                client.resources
                            ) {
                                if (
                                    client.resources.hasOwnProperty(
                                        data.documentKey._id.toString()
                                    )
                                ) {
                                    console.log('update')
                                    console.log({
                                        messageCode: data.operationType + type,
                                        type,
                                        resourceId: data.documentKey._id,
                                        resource: data.fullDocument,
                                    })
                                    client.send(
                                        JSON.stringify({
                                            messageCode:
                                                data.operationType + type,
                                            type,
                                            resourceId: data.documentKey._id,
                                            resource: data.fullDocument,
                                        })
                                    )
                                    if (data.operationType === 'update') {
                                        client.resources[
                                            data.documentKey._id.toString()
                                        ] = data.fullDocument.__v
                                    } else {
                                        delete client.resources[
                                            data.documentKey._id.toString()
                                        ]
                                    }
                                }
                            }
                        }
                    })
                }
            } catch (ex) {}
        }
    } catch (ex) {}
}

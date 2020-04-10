const { User } = require('../models/user')
const { Website } = require('../models/website')
const { Resource } = require('../models/resource')
const { requestResource } = require('./requestResource')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports.heartbeat = async (ws, data) => {
    try {
        ws.isAlive = true
        if (ws.tryWebsiter) return
        if (data) {
            if (data.versions && ws.resources) {
                for (let item in data.versions) {
                    let { error } = Joi.objectId()
                        .required()
                        .validate(item)
                    if (!error) {
                        let needToRequest
                        if (item in data.versions && item in ws.resources) {
                            if (data.versions[item].__v !== ws.resources[item])
                                needToRequest = true
                        } else if (
                            item in data.versions &&
                            !(item in ws.resources)
                        ) {
                            needToRequest = true
                        }
                        if (needToRequest) {
                            requestResource(
                                {
                                    type: data.versions[item].type,
                                    id: item,
                                },
                                ws
                            )
                            // const resource =
                            //     data.versions[item].type === 'user'
                            //         ? await User.findById(item)
                            //         : data.versions[item].type === 'website'
                            //         ? await Website.findById(item)
                            //         : await Resource.findById(item)
                            // if (resource) {
                            //     ws.send(
                            //         JSON.stringify({
                            //             messageCode:
                            //                 'hardupdate' +
                            //                 data.versions[item].type,
                            //             type: data.versions[item].type,
                            //             resourceId: item,
                            //             resource:
                            //                 data.versions[item].type ===
                            //                 'resource'
                            //                     ? {
                            //                           draft: !resource.draft
                            //                               .structure
                            //                               ? resource.published
                            //                               : resource.draft,
                            //                           present: {},
                            //                           future: [],
                            //                           past: [],
                            //                           published: !resource.draft
                            //                               .structure,
                            //                           __v: resource.__v,
                            //                           _id: resource._id,
                            //                       }
                            //                     : resource,
                            //         })
                            //     )
                            // }
                        }
                    }
                }
            }
        }
    } catch (ex) {}
}

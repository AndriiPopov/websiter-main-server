import winston from 'winston'
import mongoose from 'mongoose'
import config from 'config'

import { Page } from '../models/page'
import { User } from '../models/user'

export default function() {
    const db = config.get('db')
    mongoose.connect(db).then(() => {
        // User.update({}, { currentAction: 0 }, { multi: true }, function(
        //     err,
        //     numberAffected
        // ) {
        //     console.log(numberAffected)
        // })
        winston.info(`Connected to ${db}`)
    })
}

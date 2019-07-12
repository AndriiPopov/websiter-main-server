const Joi = require('joi')

export default () => {
    Joi.objectId = require('joi-objectid')(Joi)
}

const mongoose = require('mongoose')
const { updateIfCurrentPlugin } = require('mongoose-update-if-current')

const resourceSchema = new mongoose.Schema(
    {
        website: {
            type: String,
        },
        draft: { type: mongoose.Schema.Types.Mixed, default: {} },
        published: { type: mongoose.Schema.Types.Mixed, default: {} },
        __patch__: {},
    },
    { minimize: false }
)
resourceSchema.plugin(updateIfCurrentPlugin)

module.exports.Resource = mongoose.model('Resource', resourceSchema)

const { Schema, model } = require('mongoose')// https://mongoosejs.com/docs/schematypes.html
const { businessCollection } = require('../db/dbVars')

const businessSchema = new Schema(
    {
        routeName: {
            type: String,
            unique: true,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: new Date(),
            required: true  
        }
    },
    { 
        collection: businessCollection
    }
)

module.exports = model('Business', businessSchema)
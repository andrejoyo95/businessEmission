const { Schema, model } = require('mongoose')// https://mongoosejs.com/docs/schematypes.html
const { businessSessionCollection } = require('../db/dbVars')

const userSessionSchema = new Schema(
{
    user_id:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
        required: true  
    },
    expire_at: {
        type: Date,
        expires: 72000
    }//el documento se borra en 20 horas
},
{ 
    collection: businessSessionCollection
}
)

module.exports = model('BusinessSession', userSessionSchema)
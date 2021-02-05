const { Schema, model } = require('mongoose');
const { businessUserCollection } = require('../db/dbVars')//const bcrypt = require('bcrypt-nodejs');

const businessUserSchema = new Schema(
    {
    	nickName: {
            type: String,
            required: true,
            unique: true
        },
    	email: {
            type: String,
            required: true,
            unique: true
        },
    	dni: {
            type: String,
            required: true,
            unique: true
        },
    	password: String,
    	business: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: 'employee'
        },
    	date: {
            type: Date,
            default: new Date(),
            required: true  
        }
    },
    { 
        collection: businessUserCollection
    }
);
//businessUserSchema.methods.encryptPassword = (password) => {return bcrypt.hashSync(password, bcrypt.genSaltSync(10));};
//businessUserSchema.methods.comparePassword= function (password) {return bcrypt.compareSync(password, this.password);};

module.exports = model('BusinessUser', businessUserSchema);
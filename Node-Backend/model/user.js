const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let users = new Schema(
    {
        name : {
            type : String
        },
        email : {
            type : String
        },
        role : {
            type : String
        },
        user_status : {
            type : Boolean,
            default : false
        },
        mobile_no : {
            type : String,
        },
        password : {
            type : String,
        },
        address : {
            type : Array
        },
        user_permission : {
            type : Array,
            default : []
        },
        user_verification_token : {
            type : Number
        },
        user_activated_status : {
            type : Boolean,
            default : false
        },
        createdAt : {
            type : Date,
            default : new Date()
        },
        upadatedAt : {
            type : Date,
            default : new Date()
        },
    },
    {
        collection : 'tbl_users'
    }
)

module.exports = mongoose.model('User', users);
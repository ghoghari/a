const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mail_settings = new Schema(
    {
        service : {
            type : String
        },       
        host : {
            type : String
        },
        port : {
            type : String
        },
        secure : {
            type : Boolean
        },
        email : {
            type : String
        },
        password: {
            type : String
        },
        mail_slug: {
            type : String
        },
        createdAt : {
            type : Date,
            default : new Date()
        },
        upadatedAt : {
            type : Date,
            default : new Date()
        }
    },
    {
        collection: 'tbl_mail_settings'
    }
)

module.exports = mongoose.model('MailSetting', mail_settings);

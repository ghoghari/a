const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let operations = new Schema(
    {
        mode_id : {
            type : Number
        },
        module_id : {
            type : Number
        },
        sub_module_name : {
            type : String
        },
        sub_slug : {
            type : String
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
        collection : 'tbl_operation'
    }
)

module.exports = mongoose.model('Operation', operations);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let role_permissions = new Schema(
    {
        id : {
            type : Number
        },
        role_slug : {
            type : String
        },
        module_id : {
            type : Number
        },
        operation_id : {
            type : Number
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
        collection : 'tbl_role_permissions'
    }
)

module.exports = mongoose.model('RolePermission', role_permissions);
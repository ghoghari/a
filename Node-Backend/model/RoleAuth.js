const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const role_auth = Schema(
    {
        role_slug : {
            type : String
        }, 
        sub_module : [{
            module_id : {
                type : Number
            },
            id : {
                type : Number
            }
        }],
        status : {
            type : Boolean
        },
        createdAt: {
            type: Date,
            default : new Date()
        },
        upadatedAt: {
            type: Date,
            default : new Date()
        }
    },
    {
        collection: 'tbl_role_auth'
    }
)

module.exports = mongoose.model('RoleAuth', role_auth);
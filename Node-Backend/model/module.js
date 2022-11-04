const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modules = new Schema(
    {
        module_name : {
            type : String
        },       
        module_slug : {
            type : String
        },
        sub_module : [{
            sub_module_id:{
                type : Number
            },
            sub_module_name : {
                type : String
            },
            sub_slug : {
                type : String
            }
        }],
        status : {
            type : Boolean
        },
        createdAt : {
            type : Date,
            default : new Date()
        },
        upadatedAt : {
            type : Date,
            default : new Date()
        },
        module_id:{
            type : Number
        }
    },
    {
        collection: 'tbl_modules'
    }
)
module.exports = mongoose.model('Module', modules);

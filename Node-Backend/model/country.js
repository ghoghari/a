const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countries = new Schema(
    {
        id : {
            type : Number
        },
        name : {
            type : String
        },
        iso2 : {
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
        collection: 'tbl_countries'
    }
)

module.exports = mongoose.model('Country', countries);

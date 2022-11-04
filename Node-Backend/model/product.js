const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let products = new Schema(
    {
        name : {
            type : String
        },
        description : {
            type : String
        },
        price : {
            type : Number
        },
        stock : {
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
        collection : 'tbl_products'
    }
)

module.exports = mongoose.model('Product', products);
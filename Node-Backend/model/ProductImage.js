const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let product_images = new Schema(
    {
        image_name : {
            type : Array
        },
        productId : {
            type : Schema.Types.ObjectId
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
        collection : 'tbl_product_images'
    }
)

module.exports = mongoose.model('ProductImage', product_images);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settings = new Schema(
    {
        label: {
            type: String
        },
        slug: {
            type: String
        },
        tab: {
            type: Array
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
        collection: 'tbl_settings'
    }
);

module.exports = mongoose.model('Setting', settings);
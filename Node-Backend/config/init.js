let config;

const nodeEnv = process.env.NODE_ENV || "development";

if (nodeEnv != "devlopment") {
    config = require("../config/environments/production");
} else {
    config = require("../config/environments/development");
}
module.exports = config;
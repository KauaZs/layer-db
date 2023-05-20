"use strict";
const { Layer } = require('./constructors/database');
const obj = {
    version: require('../package.json').version
};
module.exports = { Layer, obj };

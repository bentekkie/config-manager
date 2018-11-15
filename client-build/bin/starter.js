#!/usr/bin/env node
'use strict';

require('babel-register')({
    presets: ['env']
});

// Import the rest of our application.
module.exports = require('./www');
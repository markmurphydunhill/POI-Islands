'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const regionSchema = new Schema({
    title: String,
    geo: {
        lat: Number,
        Long: Number
    }


});

module.exports = Mongoose.model('Regions', regionSchema);
'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const islandSchema = Schema({
    name: String,
    coordinates: {
       geo: {
            lat: Number,
            long: Number
        }
    },
    description: String,
    costalZone: String,
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Regions'
    },

});

module.exports = Mongoose.model('Islands', islandSchema);


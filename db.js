'use strict';

require('dotenv').config();

const Mongoose = require('mongoose');

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

db.on('error', function(err) {
    console.log(`database connection error: ${err}`);
});

db.on('disconnected', function() {
    console.log('database disconnected');
});



async function seed() {
    var seeder = require('mais-mongoose-seeder')(Mongoose);
    const data = require('./data.json');
    const Donation = require('./donation');
    const Candidate = require('./candidate.js');
    const Lakes = require('./islands.js');
    const Regions = require('./regions.js');
    const User = require('./user');
    const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
    //console.log(dbData);
}

db.once('open', function() {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
})


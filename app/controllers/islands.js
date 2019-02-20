'use strict';

const User = require('../models/user');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');

const Islands = require('../models/islands');
const Regions = require('../models/regions');

const Donations = {

    createnewisland: {
        handler: async function(request, h) {
            const regions = await Regions.find();
            return h.view('home', { title: 'Add an Island', regions: regions });
        }
    },
    home: {
        handler: async function(request, h) {
            const candidates = await Candidate.find();
            return h.view('home', { title: 'Make a Donation', candidates: candidates });
        }
    },
    islandbyregion: {
        handler: async function(request, h) {
            try {
                //const donations = await Donation.find().populate('donor').populate('candidate');
                const regions = await  Regions.find().populate('pois');
                const islands = await Islands.find();


                //console.log('Mark is Great');
                console.log(regions);
                //console.log(islands[0]._id);
                //console.log(combinedinfo);

                return h.view('report', {
                    title: 'List of Islands by Region',
                    regions: regions
                });

            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },


    report: {
        handler: async function(request, h) {
            try {
                //const donations = await Donation.find().populate('donor').populate('candidate');
                const islands = await  Regions.find().populate('pois');
                const regions = await Islands.find();
                console.log(islands);
                return h.view('report', {
                    title: 'List of Islands',
                    islands: islands,
                    regions: regions
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    addIsland: {
        handler: async function(request, h) {
            try {
                //const id = request.auth.credentials.id;
                //const user = await User.findById(id);
                const data = request.payload;

                const rawRegion = request.payload.region;

                const region = await Regions.findOne({
                    title: rawRegion

                                    });
                console.log(data.lat);
                const newIsland = new Islands({
                    name: data.islandName,
                    description: data.islandDescription,
                   // "coordinates.geo.lat": data.lat,
                    //coordinates.geo.long: data.long,
                    region: region._id

                });
                await newIsland.save();
                return h.redirect('/report');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    donate: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;

                const rawCandidate = request.payload.candidate.split(',');
                const candidate = await Candidate.findOne({
                    lastName: rawCandidate[0],
                    firstName: rawCandidate[1]
                });

                const newDonation = new Donation({
                    amount: data.amount,
                    method: data.method,
                    donor: user._id,
                    candidate: candidate._id
                });
                await newDonation.save();
                return h.redirect('/report');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = Donations;

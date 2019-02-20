'use strict';

const Accounts = require('./app/controllers/accounts');
const Donations = require('./app/controllers/donations');
const Islands = require('./app/controllers/islands');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },

    { method: 'GET', path: '/home', config: Islands.createnewisland },
    { method: 'GET', path: '/report', config: Islands.islandbyregion },
    { method: 'POST', path: '/addIsland', config: Islands.addIsland },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    //{method: 'Get', path: '/islandlist/:id, config: Islands.islandlist'}


    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: {auth:false}
    }
];
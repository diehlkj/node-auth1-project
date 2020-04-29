const db = require('../data/dbConfig.js');

module.exports = {
    findBy,
    insert
}

function findBy(filter) {
    console.log('In loginDB.findBy, heres the param data: ', filter);
    return db('users')
        .where('username', filter.username)
}

function insert(accountData) {
    return db('users')
        .insert(accountData)
}
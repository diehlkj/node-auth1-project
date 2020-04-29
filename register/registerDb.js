const db = require('../data/dbConfig.js');

module.exports = {
    add
}

function add(accountData) {
    return db('users')
        .insert(accountData)
}

// function findById(id) {
//     return db('users')
//         .where(id)
// }

// async function insert(accountData) {
//     const [id] = await db("users").insert(accountData, "id");
  
//     return findById(id);
// }
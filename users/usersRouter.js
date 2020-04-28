const router = require('express').Router();
const Users = require('./usersDb.js');
// get users

// If the user is logged in, respond with an array of all
// the users contained in the database. If the user is not
// logged in repond with the correct status code and the
// message: 'You shall not pass!'.

router.get('/', (req, res) => {
    Users.getUsers()
        .then(userData => {
            res.status(200).json({ userData });
        })
        .catch(err => {
            res.status(500).json({ MESSAGE: 'There was an error processing your request.', err })
        })
});

module.exports = router;
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Register = require('./registerDb.js');
// insert

// Creates a user using the information sent inside the body of the request.
// Hash the password before saving the user to the database.

router.post('/', (req, res) => {

    const accountData = req.body; // { "username": "diehlkj", "password": "somepassword1" }

    const hash = bcrypt.hashSync(accountData.password, 8)

    accountData.password = hash;

    Register.add(accountData)
        .then(userData => {
            res.status(201).json({ message: 'Account Created', userData });
        })
        .catch(err => {
            res.status(500).json({ MESSAGE: 'There was an error processing your request.', err });
            console.log(accountData);
        })
});

module.exports = router;
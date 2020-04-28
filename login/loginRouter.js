const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Login = require('./loginDb.js');
// insert

// Use the credentials sent inside the body to authenticate the user.
// On successful login, create a new session for the user and send back a
// 'Logged in' message and a cookie that contains the user id. If login fails,
// respond with the correct status code and the message: 'You shall not pass!'


router.post('/', (req, res) => {
    let { username, password } = req.body;

    console.log('in login POST');

    Login.findBy({ username })
        .first()
        .then(userData => {
            
            console.log('In Login.findBy... Found userData:', userData);

            if (userData && bcrypt.compareSync(password, userData.password)) {
                req.session.user = username;
                res.status(200).json({ MESSAGE: `Hey ${userData.username}, you've been logged in.`, });
            } else {
                res.status(401).json({ MESSAGE: 'You shall not pass!' });
            }
        })
        .catch(err => {
            console.log('In Login.findBy... Errored Out. Heres the body: ', req.body, ' And the error: ', err);
            res.status(500).json({ MESSAGE: 'There was a problem with your request to log in', err });
        });
});

module.exports = router;
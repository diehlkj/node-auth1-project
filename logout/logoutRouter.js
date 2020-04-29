const router = require('express').Router();

router.delete('/', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ MESSAGE: 'error logging out:', err });
            } else {
                res.json({ MESSAGE: 'logged out' });
            }
        });
    } else {
        res.end();
    }
});

module.exports = router;
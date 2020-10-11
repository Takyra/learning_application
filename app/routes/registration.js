const user = require('../libs/user');

module.exports = (req, res) => {
    if (!req.body) {
        res.status(400);
        res.render('error/400');
    }

    const getResult = response => res.end(JSON.stringify({ response: response }));

    user.set(req.body, getResult);
};
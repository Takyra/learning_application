const user = require('../libs/user');

module.exports = (req, res) => {
    if (!req.body) {
        res.status(400);
        res.render('error/400');
    }

    const getResponse = (access, data) => {
        if (access === 200) {
            req.session.authorized = true;
            req.session.username   = data.login;
    
            res.end(JSON.stringify(data));
        } else if (access === 403) {
            res.end(JSON.stringify(data));
        }
    };

    user.get(req.body, getResponse);
};
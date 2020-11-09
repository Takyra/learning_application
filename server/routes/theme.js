const _lang = require('../lang');

module.exports = (req, res) => {
    if (!req.body) {
        res.status(400);
        res.render('error/400');
    }

    const data   = req.body;
    const result = _lang.set(req, data.lang);

    res.end(JSON.stringify( {ok : result} ));
};
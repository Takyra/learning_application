const _lang  = require('../lang');
const config = require('../config');

exports.get = (req, res) => {
    const session = req.session;

    if (!session.lang) {
        _lang.set(req);
    }

    const param = {
        userName : session.username,
        langList : config.get('lang:list'),
        curLang  : session.lang
    };

    res.render('index', {
        lang : _lang.get(req),
        param
    });
};
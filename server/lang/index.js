const i18n   = require('i18n');
const config = require('../config');

const setLang = (req, lang) => {
    if (!req.session) {
        res.status(400);
        res.render('error/400');
    }

    let newLang = config.get('default:lang');

    if (lang) {
        newLang = lang;
    } else if (!req.session.lang) {
        const browser = req.acceptsLanguages(config.get('lang:list'));

        if (browser) {
            newLang = browser;
        }
    }

    req.session.lang = newLang;

    return true;
};

exports.set = (req, lang) => setLang(req, lang);

exports.get = req => {
    if (!req.session) {
        res.status(400);
        res.render('error/400');
    }

    const lang = req.session.lang;

    if (lang) {
        i18n.setLocale(lang);
    } else {
        setLang(req);
    }

    return i18n.__('localization');
};
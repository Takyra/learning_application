const path         = require('path');
const express      = require('express');
const app          = express();
// const logger       = require('express-logger');
const session      = require('express-session');
const errorHandler = require('express-error-handler');
const server       = require('http').createServer(app);
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const nunjucks     = require('nunjucks');
const i18n         = require('i18n')
const log          = require('./libs/log')(module);
const config       = require('./config');

nunjucks.configure([config.get('nunjucks:template')], {
    autoescape : config.get('nunjucks:autoescape'),
    express    : app
});

app.set('view engine', config.get('nunjucks:format'));

// app.use(logger({ path: path.join(__dirname, 'logs/logfile.txt') }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
    secret : config.get('session:secret'),
    key    : config.get('session:key'),
    cookie : config.get('session:cookie')
}));

app.use('/static', express.static(path.join(__dirname, 'static')));

i18n.configure({
    locales       : config.get('lang:list'),
    defaultLocale : config.get('lang:default'),
    register      : global,
    // cookie        : 'yourcookiename',
    directory     : path.join(__dirname, 'lang')
});

app.use(i18n.init);

require('./routes')(app);

app.use((req, res) => {
    res.status(404);
    res.render('error/404');
});

app.use(errorHandler());

server.listen(config.get('port'), err => {
    if (err) throw err;

    log.info('Server is listening on ' + config.get('port'))
});

// require('./socket')(server);
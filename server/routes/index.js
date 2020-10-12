module.exports = app => {
    app.get('/', require('./frontPage').get);

    app.post('/authorization', require('./authorization'));

    app.post('/registration', require('./registration'));

    app.post('/:lang', require('./lang'));
};
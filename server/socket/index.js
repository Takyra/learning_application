const log   = require('../libs/log')(module);
const langs = require('../lang');

module.exports = server => {
    const socket = require('socket.io')(server);

    socket.set('origins', 'localhost:*');
    socket.set('logger', log)
    
    socket.on('connection', socket => {
        console.log('a user connected');
    
        socket.on('change lang', data => {
            const lang = langs({lang: data.lang});
    
            // socket.emit('change lang', lang);
        });
    });
}
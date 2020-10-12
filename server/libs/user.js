const uidGenerator = require('node-unique-id-generator');
const crypto       = require('crypto');
const dBuilder     = require('./queryBuilder');

const getHash = (password, salt) => crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

const createUser = (response, data, callback) => {
    if (Object.keys(response).length) {
        return callback(403);
    }

    const guid = uidGenerator.generateGUID();
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = getHash(data.password, salt);

    const values = {
        guid     : guid,
        login    : data.login,
        password : hash,
        salt     : salt
    };

    dBuilder(qb => {
        qb.insert('users', values, error => {
            qb.disconnect();

            if (error) throw error;

            return callback(200);
        });
    });
};

const checkAccess = (response, data, callback) => {
    response = response[0];

    const hash = getHash(data.password, response.salt);

    if (response.password === hash) {
        delete response.password;
        callback(200, response);
    } else {
        callback(403);
    }
};

const getUser = (data, callback, next) => {
    dBuilder(qb => {
        qb.select('guid, login, password, salt')
          .where('login', data.login)
          .get('users', (error, response) => {
              qb.disconnect();

              if (error) throw error;

              next(response, data, callback);
          });
    });
};

exports.get = (data, callback) => getUser(data, callback, checkAccess);

exports.set = (data, callback) => getUser(data, callback, createUser);
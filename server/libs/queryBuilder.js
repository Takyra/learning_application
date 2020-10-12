const config       = require('../config');
const queryBuilder = require('node-querybuilder');
const pool         = new queryBuilder(config.get('db'), 'mysql', 'pool');

module.exports = (query) => {
    pool.get_connection(qb => query(qb));
};
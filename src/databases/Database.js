const util = require('util');
const mysql = require('mysql2');

class Database {
    connectionPool;

    constructor({ host, user, password, database }) {
        this.connectionPool = mysql.createPool({
            host,
            user,
            password,
            database,
        }).promise();
    }

    query = (...args) => this.connectionPool.query(...args);
}

module.exports = Database;

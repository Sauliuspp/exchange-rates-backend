const Database = require('./Database');

const database = new Database({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
});

module.exports = database;

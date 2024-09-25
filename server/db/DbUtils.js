const mysql = require('mysql')
const config = require('../config/default')
const Genid = require("../utils/SnowFlake")

const genid = new Genid({ WorkerId: 1 })
const db = mysql.createConnection({
    host: config.database.Host,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
})

const pool = mysql.createPool({
    host: config.database.Host,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
})

db.async = {}

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();  // 释放连接回连接池
                });
            }
        });
    });
};

module.exports = { db, pool, genid, query }
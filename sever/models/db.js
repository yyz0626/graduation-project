var mysql = require('mysql');
let {
    HOST,
    USER,
    PASSWORD,
    DATABASE
} = require('../config/db.config')

let pool = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
})

function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, function (error, results) {
                    connection.release(); //释放连接，放回pool中
                    if (error) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    })
}

module.exports = {
    query: query
}
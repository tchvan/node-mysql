'use strict'

const mysql = require('mysql')
const { Sql } = require('../Sql')
const Util = require('../Utilities')

class Database {

    static connect(db_name) {
        const localConfig = Database.config
        if (db_name) {
            localConfig.database = db_name
        }
        Database.conn = mysql.createConnection(localConfig)
        return Database.conn
    }

    static query(sql, conn) {
        conn = conn || Database.conn
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, result) => {
                if (err) return reject({ ...err, Error: null })
                return resolve(result)
            })
        })
    }

    static disconnect(conn) {
        conn = conn || Database.conn
        return new Promise((resolve, reject) => {
            if (!conn) return resolve("true1") //<<This connection has not been connected before
            conn.end(err => {
                if (err) return reject({ ...err, Error: null })
                return resolve("true2")
            })
        })
    }

    static createDBAll() {
        const db_keys = Util.Name.getAllDbKeys()
        return Promise.all(
            db_keys.map(key => {
                const db_name = Util.Name.getDb(key)
                // console.log("Creating db " + db_name)
                const sql = Sql.DB_CREATE(db_name)
                //<< Since DB is unknown, have to do it manually with blank database name
                Database.conns[key] = mysql.createConnection(Database.config)
                return Database.query(sql, Database.conns[key])
            })
        )
    }

    static connectAll() {
        const db_keys = Util.Name.getAllDbKeys()
        return Promise.all(
            db_keys.map(key => {
                const db_name = Util.Name.getDb(key)
                // const config = { ...Database.config, database: db_name }
                // Database.conns[key] = mysql.createConnection(config)
                Database.conns[key] = Database.connect(db_name)
                return new Promise(resolve => resolve(true))
            })
        )
    }

    static disconnectAll() {
        const result = Promise.all(
            Util.Name.getAllDbKeys().map(key => {
                const conn = Database.conns[key]
                return Database.disconnect(conn)
            })
        )
        // console.log(result)
        return result
    }


}

Database.conns = []
Database.conn = null
Database.config = {
    host: '127.0.0.1',
    user: 'root',
    password: process.env.TRAVIS ? '' : 'mysql'
}

module.exports = Database
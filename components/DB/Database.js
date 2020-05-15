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
            if (!conn) return resolve(true) //<<This connection has not been connected before
            conn.end(err => {
                if (err) return reject({ ...err, Error: null })
                return resolve(true)
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
        return Promise.all(
            Util.Name.getAllDbKeys().map(key => {
                const conn = Database.conns[key]
                return Database.disconnect(conn)
            })
        )
    }

    static async insert(shard_id, unique_name, json, type) {
        // console.log("My conn",this.conn)
        unique_name = unique_name || this.createNewUniqueName(type)
        // const result = this.baseFunction(shard_id, json, type.table, Sql.MD_INSERT, unique_name)
        const db_name = Util.Name.getDb(shard_id)
        const sql = Sql.MD_INSERT(db_name, type.table, json, unique_name)
        const result = await Database.query(sql)

        // const local_id = result.insertId
        // const uuid = new UUID(UUID.get(shard_id, type.id, local_id))
        // console.log("Inserted DB[" + shard_id + "] " + type.slug + " #" + local_id, "UUID [" + uuid.id + "]")
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
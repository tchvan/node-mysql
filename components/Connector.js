'use strict'
const mysql = require('mysql')
const Util = require('./UtilString')
// const EventEmitter = require('events')
// class MyEventEmitter extends EventEmitter {}

// const myEmitter = new MyEventEmitter()
// myEmitter.on('eee', () => {
//     console.log("Good job")
// })

// myEmitter.emit("eee")

class Connector {

    connect(db_name) {
        this._connect.connect((err) => {
            if (err) {
                // console.log(err.code)
                switch (err.code) {
                    case 'ER_BAD_DB_ERROR':
                        console.log("Database [" + db_name + "] not found")
                        break
                    default: throw err
                }
            } else {
                console.log("Database [" + db_name + "] Connected")
            }
        })
    }

    constructor(config, shardId = null) {
        if (config) {
            if (shardId) {
                const db_name = Util.getDbName(shardId)
                config.database = db_name
                this._connect = mysql.createConnection(config)
                this.connect(db_name)
            } else {
                this._connect = mysql.createConnection(config)
            }
        }
        if (!this._connect) console.error("Mysql is not connected")
        return this._connect
    }
}

module.exports = Connector
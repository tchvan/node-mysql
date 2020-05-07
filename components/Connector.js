'use strict'
const mysql = require('mysql')
const Util = require('./UtilString')

class Connector {

    /**
     * 
     * @param {String} db_name 
     */
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

    /**
     *
     * @param {Object} config 
     * @param {Int} shardId 
     */
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
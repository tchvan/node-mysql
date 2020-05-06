'use strict';
const Config = require('../config')
const Sql = require('./Sql')
const BluePrint = require('./BluePrint')
const Connector = require('./Connector')
const Util = require('./UtilString')

class Schema {
    
    /**
    * @param {Connector} connector
    */
    static connect(connector) {
        Schema.conn = connector
        return Schema
    }

    static install(config) {
        const max = Config.MAX_SHARD
        const dbs = [...Array(max).keys()].map(k => Util.getDbName(k))
        dbs.map((db_name) => {
            const conn = new Connector(config)
            Schema.connect(conn)
            const sql = Sql.DB_CREATE(db_name)
            // console.log(sql)
            Schema.conn.query(sql, (err, result)=>{
                if(err) throw err
                console.log(result)
            })
        })
        // console.log(dbs)
    }

    /**
    * @param {BluePrint} blue_print
    */
    static create(table_name) {
        const blue_print = new BluePrint
        const sql = blue_print.toString(table_name, Schema.conn)
        // console.log(sql)
        Schema.conn.query(sql, (err, result) => {
            if (err) throw err
            // if (result) console.log(result)
        })
        return Schema
    }
}

module.exports = Schema
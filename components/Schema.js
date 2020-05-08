'use strict';

const DbInteraction = require('./DbInteraction')
const Config = require('../config')
const Sql = require('./Sql')
const BluePrint = require('./BluePrint')
const Connector = require('./Connector')
const Util = require('./Utilities')

class Schema extends DbInteraction {

    /**
     * 
     * @param {Object} config 
     * @param {String} db_name 
     * @param {Array} models 
     */
    static createModels(config, db_name, models) {
        // console.log("Create Model tables for db " + db_name)
        const conn = new Connector({ ...config, database: db_name })
        const db = this.connect(conn)

        models.map(entity => db.create(entity)) //<< this.create('posts').create('terms').create('users').create('comments')
        return this
    }

    /**
     * 
     * @param {Object} config 
     * @param {String} db_name 
     * @param {Array} links 
     */
    static createRelationships(config, db_name, links) {
        // console.log("Create Relationship tables for db " + db_name)
        const conn = new Connector({ ...config, database: db_name })
        const db = this.connect(conn)

        links.map(entity => db.link(entity[0], entity[1])) //<< this.link('posts', 'terms').link('posts', 'users')
        return this
    }

    /**
     * 
     * @param {Object} config 
     * @param {Array} models 
     * @param {Array} links 
     */
    static install(config, models, links) {
        const max = Config.MAX_SHARD
        const dbs = [...Array(max).keys()].map(k => Util.Name.getDb(k))
        // console.log("DBS", dbs)
        dbs.map((db_name) => {
            const conn = new Connector(config)
            this.connect(conn)
            const sql = Sql.DB_CREATE(db_name)
            // console.log("SQL", sql)
            this.conn.query(sql, (err, result) => {
                if (err) throw err
                // console.log(result)
                this.createModels(config, db_name, models).createRelationships(config, db_name, links)
            })
        })
        // console.log(dbs)
        return this
    }

    /**
     * 
     * @param {String} table_name 
     */
    static create(table_name) {
        const blue_print = new BluePrint
        const sql = blue_print.createEntity(table_name, this.conn)
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            // if (result) console.log(result)
        })
        return this
    }

    /**
     * 
     * @param {String} table0 
     * @param {String} table1 
     * @param {String} entity0 
     * @param {String} entity1 
     */
    static link(table0, table1, entity0, entity1) {
        const blue_print = new BluePrint
        entity0 = entity0 || table0.substr(0, table0.length - 1)
        entity1 = entity1 || table1.substr(0, table1.length - 1)
        const table_name = Util.Name.getLink(entity0, entity1)
        const sql = blue_print.createRelationShip(table_name, entity0, entity1, this.conn)
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            // if (result) console.log(result)
        })
        return this
    }
}

module.exports = Schema
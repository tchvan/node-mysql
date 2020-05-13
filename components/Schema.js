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

        return Promise.all(models.map(entity => db.create(entity))) //<< this.create('posts').create('terms').create('users').create('comments')
        // return this
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

        return Promise.all(links.map(entity => db.link(entity[0], entity[1]))) //<< this.link('posts', 'terms').link('posts', 'users')
        // return this
    }

    /**
     * 
     * @param {Object} config 
     * @param {Array} models 
     * @param {Array} links 
     */
    static async install(config, models, links) {
        const max = Config.MAX_SHARD
        const dbs = [...Array(max).keys()].map(k => Util.Name.getDb(k))
        // console.log("DBS", dbs)
        return Promise.all(dbs.map((db_name) => {
            const conn = new Connector(config)
            this.connect(conn)
            const sql = Sql.DB_CREATE(db_name)
            // console.log("SQL", sql)
            this.conn.query(sql, async (err, result) => {
                if (err) throw err
                // console.log(result)
                await this.createModels(config, db_name, models)
                await this.createRelationships(config, db_name, links)
            }) 
        }))
    }

    static async countDB() {
        const prefix = Config.DB_PREFIX
        const sql = Sql.DB_EXISTS(prefix + "%")
        const result = await this.execute_s(sql)
        // console.log("Count DB", result)
        return result.length
    }

    /**
     * 
     * @param {String} table_name 
     */
    static async create(table_name) {
        const blue_print = new BluePrint
        const sql = blue_print.createEntity(table_name, this.conn)
        return await this.execute_s(sql)
    }

    /**
     * 
     * @param {String} table0 
     * @param {String} table1 
     * @param {String} entity0 
     * @param {String} entity1 
     */
    static async link(table0, table1, entity0, entity1) {
        const blue_print = new BluePrint
        entity0 = entity0 || table0.substr(0, table0.length - 1)
        entity1 = entity1 || table1.substr(0, table1.length - 1)
        const table_name = Util.Name.getLink(entity0, entity1)
        const sql = blue_print.createRelationShip(table_name, entity0, entity1, this.conn)
        return await this.execute_s(sql)
        // this.conn.query(sql, (err, result) => {
        //     if (err) throw err
        //     // if (result) console.log(result)
        // })
        // return this
    }
}

module.exports = Schema
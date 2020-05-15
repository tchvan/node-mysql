'use strict'

const Database = require('./Database')
const { Sql, BluePrint } = require('../Sql')
const Util = require('../Utilities')

class Table {
    static createEntityTable(table_name) {
        const blue_print = new BluePrint()
        const dbs = Util.Name.getAllDbs()

        return Promise.all(
            dbs.map(db_name => {
                const sql = blue_print.createEntity(db_name, table_name)
                return Database.query(sql)
            })
        )
    }

    static createLinkTable(table0, table1, entity0, entity1) {
        const blue_print = new BluePrint()
        const dbs = Util.Name.getAllDbs()
        entity0 = Util.Name.getEntity(entity0, table0)
        entity1 = Util.Name.getEntity(entity1, table1)
        const table_name = Util.Name.getLink(entity0, entity1)

        return Promise.all(
            dbs.map(db_name => {
                const sql = blue_print.createRelationShip(db_name, table_name, entity0, entity1)
                return Database.query(sql)
            })
        )
    } 
}

module.exports = Table
'use strict'

const Database = require('./Database')
const { Sql } = require('../Sql')
const Util = require('../Utilities')

class Query{
    static createNewUniqueName(type) {
        return "new-" + type.slug + "-" + Util.Name.toUniqueId()
    }

    static async insert(shard_id, unique_name, json, type) {
        // console.log("My conn",this.conn)
        // unique_name = unique_name || this.createNewUniqueName(type)
        // const result = this.baseFunction(shard_id, json, type.table, Sql.MD_INSERT, unique_name)
        const db_name = Util.Name.getDb(shard_id)
        const sql = Sql.MD_INSERT(db_name, type.table, json, Util.String.slug(unique_name))
        // console.log(sql)
        const result = await Database.query(sql)

        // const local_id = result.insertId
        // const uuid = new UUID(UUID.get(shard_id, type.id, local_id))
        // console.log("Inserted DB[" + shard_id + "] " + type.slug + " #" + local_id, "UUID [" + uuid.id + "]")
        return result
    }
}

module.exports = Query
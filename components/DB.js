'use strict'
const DbInteraction = require('./DbInteraction')
const Sql = require('./Sql')
const UUID = require('./UUID')
const Util = require('./UtilString')

class DB extends DbInteraction {

    static createNewUniqueName(string_to_hash, type) {
        return "new-" + type.slug + "-" + Util.strToUniqueId(string_to_hash)
    }

    static baseFunction(string_to_hash, json, type_id, tb_name, SqlBuilder, callBack, unique_id) {
        const shard_id = Util.strToShard(string_to_hash)
        const db_name = Util.getDbName(shard_id)

        const sql = SqlBuilder(db_name, tb_name, json, unique_id)
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            if (result) callBack(result, shard_id, type_id)
        })
        return this
    }

    static insert(string_to_hash, unique_name, json, type) {
        const callBack = (result, shard_id, type_id) => {
            const local_id = result.insertId
            console.log("Inserted " + type.slug + " #" + local_id, "UUID [" + UUID.get(shard_id, type_id, local_id) + "]")
        }

        unique_name = unique_name || this.createNewUniqueName(string_to_hash, type)
        this.baseFunction(string_to_hash, json, type.id, type.table, Sql.MD_INSERT, callBack, unique_name)
        return this
    }

    static update(string_to_hash, unique_name, json, type, local_id) {
        const callBack = (result) => {
            const affectedRows = result.affectedRows
            console.log("Updated " + affectedRows + " row(s)")
        }
        this.baseFunction(string_to_hash, unique_name, json, type.id, tb.name, Sql.MD_UPDATE, callBack, local_id)
        return this
    }
}

module.exports = DB
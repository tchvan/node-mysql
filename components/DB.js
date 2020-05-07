'use strict'

const DbInteraction = require('./DbInteraction')
const Sql = require('./Sql')
const UUID = require('./UUID')
const Util = require('./UtilString')

class DB extends DbInteraction {

    static baseFunction(owner_id, json, type_id, tb_name, SqlBuilder, callBack, local_id) {
        const shard_id = Util.ownerIdToShard(owner_id)
        const db_name = Util.getDbName(shard_id)

        const sql = SqlBuilder(db_name, tb_name, json, local_id)
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            if (result) callBack(result, shard_id, type_id)
        })
        return this
    }

    static insert(owner_id, json, type_id, tb_name) {
        const callBack = (result, shard_id, type_id) => {
            const local_id = result.insertId
            console.log("Inserted #" + local_id, "UUID [" + UUID.get(shard_id, type_id, local_id) + "]")
        }
        this.baseFunction(owner_id, json, type_id, tb_name, Sql.MD_INSERT, callBack)
        return this
    }

    static update(owner_id, json, type_id, tb_name, local_id) {
        const callBack = (result) => {
            const affectedRows = result.affectedRows
            console.log("Updated " + affectedRows + " row(s)")
        }
        this.baseFunction(owner_id, json, type_id, tb_name, Sql.MD_UPDATE, callBack, local_id)
        return this
    }
}

module.exports = DB
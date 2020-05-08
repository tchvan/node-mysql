'use strict'
const DbInteraction = require('./DbInteraction')
const Sql = require('./Sql')
const UUID = require('./UUID')
const Util = require('./Utilities')

class DB extends DbInteraction {

    createNewUniqueName(type) {
        return "new-" + type.slug + "-" + Util.Name.toUniqueId(type.slug)
    }

    async baseFunction(shard_id, json, tb_name, SqlBuilder, unique_id) {
        const db_name = Util.Name.getDb(shard_id)
        const sql = SqlBuilder(db_name, tb_name, json, unique_id)
        const result = await this.execute(sql)
        return result
    }

    insert(shard_id, unique_name, json, type) {
        unique_name = unique_name || this.createNewUniqueName(type)
        const result = this.baseFunction(shard_id, json, type.table, Sql.MD_INSERT, unique_name)
        result.then(result => {
            const local_id = result.insertId
            const uuid = new UUID(UUID.get(shard_id, type_id, local_id))
            console.log("Inserted DB[" + shard_id + "] " + type.slug + " #" + local_id, "UUID [" + uuid.id + "]")
        })
        return result
    }

    update(shard_id, unique_name, json, type, local_id) {
        const result = this.baseFunction(shard_id, unique_name, json, tb.name, Sql.MD_UPDATE, local_id)
        result.then(result => {
            const affectedRows = result.affectedRows
            console.log("Updated " + affectedRows + " row(s)")
        })
        return result
    }

    async baseFunctionForLink(shard_id, json, tb_name, SqlBuilder, unique_id) {
        const db_name = Util.Name.getDb(shard_id)
        const sql = SqlBuilder(db_name, tb_name, json, unique_id)
        const result = await this.execute(sql)
        return result
    }

    link(shard_id, source_id, target_id, key, value) {
        const db_name = Util.Name.getDb(shard_id)
        const tb_name = 'meta_post_user'
        const e0 = {}
        const e1 = {}
        const sql = Sql.MD_LINK(db_name, tb_name, e0, e1, key, value)
        // const result = this.baseFunctionForLink(shard_id, value, tb_name, )
        // result.then(result => {
        //     console.log(result)
        // })
        // return result
    }
}

module.exports = DB
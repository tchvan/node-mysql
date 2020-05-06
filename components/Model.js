'use strict'

const Connector = require('./Connector')
const Config = require('../config')
const Sql = require('./Sql')
const Type = require('./Type')
const UUID = require('./UUID')
const Util = require('./UtilString')

class Model {

    /**
    * @param {Connector} connector
    */
    static connect(connector) {
        this.conn = connector
        return Model
    }

    static insert(owner_id, json, type_id) {
        const shard_id = Util.ownerIdToShard(owner_id)
        const db_name = Util.getDbName(shard_id)
        const tb_name = Type.getTbName(type_id)

        // this.connect()

        const sql = Sql.MD_INSERT(db_name, tb_name, json)
        this.conn.query(sql, (err, result) => {
            if (err) throw err
            if (result) {
                const local_id = result.insertId
                console.log("Inserted #" + local_id, "UUID [" + UUID.get(shard_id, type_id, local_id) + "]")
            }
        })
        return Model
    }

    static update(owner_id, json, type) {
        Sql.MD_UPDATE()
        return Model
    }
}

module.exports = Model
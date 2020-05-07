const DbInteraction = require('./DbInteraction')
const Sql = require('./Sql')
const Util = require('./UtilString')
const UUID = require('./UUID')

class Model extends DbInteraction {

    constructor(name, conn, type) {
        super(conn)
        // console.log(name, typeof name)
        if (typeof name === 'bigint') {
            const uuid = new UUID(name)
            this.id = uuid.getLocalId()
            this.shardId = uuid.getShardId()
        } else {
            this.name = name
            this.shardId = Util.strToShard(name)
        }
        this.db_name = Util.getDbName(this.shardId)
        this.type = type
        this.slug = type.slug
    }

    async loadFromDB() {
        let sql = ""
        if (this.name) sql = Sql.MD_SELECT_BY_NAME(this.db_name, this.type.table, this.name)
        else if (this.id) sql = Sql.MD_SELECT_BY_ID(this.db_name, this.type.table, this.id)
        // console.log(sql)

        const result = await this.execute(sql)
        // console.log(result)
        return result
    }

    hasRelation(key, type_id) {

    }

    hasOne(type_id) {

    }
    hasMany(type_id) {

    }

    belongsTo(type) {
        const e0 = { k: this.slug + '_uuid', v: 1, }
        const e1 = { k: type.slug + '_uuid', v: 1, }
        // console.log(this.slug, type.slug)
        const tb_name = Util.getLinkName(this.slug, type.slug)
        const sql = Sql.MD_META(this.db_name, tb_name, e0, e1, "belongsTo")
        return new Promise(resolve => {
            this.conn.query(sql, (err, result) => {
                if (err) throw err
                resolve(result)
            })
        })
        // console.log(sql)
    }
    belongsToMany(type_id) {

    }
    morphMany(type_id) {

    }
    morphToMany(type_id) {

    }

}

module.exports = Model
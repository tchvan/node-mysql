const DbInteraction = require('./DbInteraction')
const Sql = require('./Sql')
const Util = require('./Utilities')
const UUID = require('./UUID')

class Model extends DbInteraction {

    constructor(name, conn, type) {
        super(conn)
        console.log(name, typeof name)
        if (typeof name === 'bigint') {
            this.uuid = new UUID(name)
            // const uuid = new UUID(name)
            // this.id = uuid.localId
            // this.shardId = uuid.shareId
        } else {
            this.name = name
            this.shardId = Util.String.toShard(name)
        }
        this.db_name = Util.Name.getDb(this.shardId)
        this.type = type
        this.slug = type.slug
    }

    checkType() {
        if (this.uuid.typeId !== this.type.id) {
            const content = {
                code: 'type_miss_matched',
                msg: "Type id doesn't match. Request '" + this.type.slug + "' [" + this.type.id + "] but given object of [" + this.uuid.typeId + "]"
            }
            return { result: false, content }
        }
        return { result: true }
    }

    async loadFromDB() {
        if (!this.checkType().result) {
            return new Promise((res, rej) => rej(this.checkType().content))
        }
        let sql = ""
        if (this.name) sql = Sql.MD_SELECT_BY_NAME(this.db_name, this.type.table, this.name)
        else if (this.uuid.localId) sql = Sql.MD_SELECT_BY_ID(this.db_name, this.type.table, this.uuid.localId)
        const result = await this.execute(sql)
        return result
    }

    hasRelation(key, type_id) {

    }

    hasOne(type_id) {

    }
    hasMany(type_id) {

    }

    async belongsTo(type) {
        const e0 = { k: this.slug + '_id', v: this.id, }
        const e1 = { k: type.slug + '_id', v: 1, }
        // console.log(this.slug, type.slug)
        const tb_name = Util.Name.getLink(this.slug, type.slug)
        const sql = Sql.MD_SELECT_META(this.db_name, tb_name, e0, e1, "belongsTo")
        const result = await this.execute(sql)
        return result
    }
    belongsToMany(type_id) {

    }
    morphMany(type_id) {

    }
    morphToMany(type_id) {

    }

    async createRelationShip(insertId, type, key, value) {
        const e0 = { k: this.slug + '_id', v: this.id, }
        const e1 = { k: type.slug + '_id', v: insertId, }
        const tb_name = Util.Name.getLink(this.slug, type.slug)
        const sql = Sql.MD_LINK(this.db_name, tb_name, e0, e1, key, value)
        const result = await this.execute(sql)
        return result
    }

}

module.exports = Model
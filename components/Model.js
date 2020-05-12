const DbInteraction = require('./DbInteraction')
const Sql = require('./Sql')
const Util = require('./Utilities')
const UUID = require('./UUID')

class Model extends DbInteraction {

    constructor(name, conn, type) {
        super(conn)
        // console.log(name, typeof name)
        if (typeof name === 'bigint') {
            this.uuid = new UUID(name)
            this.db_name = Util.Name.getDb(this.uuid.shardId)
        } else {
            this.name = name
            const shardId = Util.String.toShard(name)
            this.db_name = Util.Name.getDb(shardId)
        }
        this.type = type
        this.slug = type.slug
    }

    checkType() {
        if (this.uuid.typeId !== BigInt(this.type.id)) {
            const content = {
                code: 'type_miss_matched',
                msg: "Type id doesn't match. Requesting '" + this.type.slug + "' [" + this.type.id + "] but given object of [" + this.uuid.typeId + "]"
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

    async hasMany(type) {
        const entity = { k: this.slug + '_id', v: this.uuid.localId, }
        const meta_tb_name = Util.Name.getLink(this.slug, type.slug)
        const sql = Sql.META_SELECT_BY_KEY(this.db_name, meta_tb_name, entity, ">-hasMany->")
        const entity_tb_name = type.table
        const list = await this.execute(sql)

        const array = list.map(l => l.post_id).join(",")
        const sub_sql = Sql.MD_SELECT_BY_ID(this.db_name, entity_tb_name, array)
        const result = await this.execute(sub_sql)
        return result.map(obj => ({ ...obj, json: JSON.parse(obj.json) }))
    }

    async belongsTo(type) {
        const entity = { k: this.slug + '_id', v: this.uuid.localId, }
        const meta_tb_name = Util.Name.getLink(type.slug, this.slug)
        const sql = Sql.META_SELECT_BY_KEY(this.db_name, meta_tb_name, entity, ">-hasMany->")
        const entity_tb_name = type.table
        const list = await this.execute(sql)

        const array = list.map(l => l.post_id).join(",")
        const sub_sql = Sql.MD_SELECT_BY_ID(this.db_name, entity_tb_name, array)
        const result = await this.execute(sub_sql)
        return result.map(obj => ({ ...obj, json: JSON.parse(obj.json) }))
    }

    belongsToMany(type_id) {

    }
    morphMany(type_id) {

    }
    morphToMany(type_id) {

    }

    async createRelationShip(insertId, type, key, value) {
        const e0 = { k: this.slug + '_id', v: this.uuid.localId, }
        const e1 = { k: type.slug + '_id', v: insertId, }
        const tb_name = Util.Name.getLink(this.slug, type.slug)
        const sql = Sql.META_CREATE_LINK(this.db_name, tb_name, e0, e1, key, value)
        const result = await this.execute(sql)
        return result
    }

}

module.exports = Model
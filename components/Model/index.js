
const Sql = require('../Sql')
const Util = require('../Utilities')
const UUID = require('../UUID')
const BasicSelect = require('./BasicSelect')

class Model extends BasicSelect {

    constructor(name, conn) {
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
        // this.type = type
        // this.slug = type.slug
    }

    
    

    hasRelation(key, type_id) {

    }

    hasOne(type_id) {

    }

    async hasMany(type) {
        const entity = { k: this.Type.slug + '_id', v: this.uuid.localId, }
        const meta_tb_name = Util.Name.getLink(this.Type.slug, type.slug)
        const sql = Sql.META_SELECT_BY_KEY(this.db_name, meta_tb_name, entity, ">-hasMany->")
        const entity_tb_name = type.table
        const list = await this.execute(sql)

        const array = list.map(l => l.post_id).join(",")
        const sub_sql = Sql.MD_SELECT_BY_ID(this.db_name, entity_tb_name, array)
        const result = await this.execute(sub_sql)
        return result.map(obj => ({ ...obj, json: JSON.parse(obj.json) }))
    }

    async belongsTo(type) {
        const entity = { k: this.Type.slug + '_id', v: this.uuid.localId, }
        const meta_tb_name = Util.Name.getLink(type.slug, this.Type.slug)
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
        const e0 = { k: this.Type.slug + '_id', v: this.uuid.localId, }
        const e1 = { k: type.slug + '_id', v: insertId, }
        const tb_name = Util.Name.getLink(this.Type.slug, type.slug)
        const sql = Sql.META_CREATE_LINK(this.db_name, tb_name, e0, e1, key, value)
        const result = await this.execute(sql)
        return result
    }

}

module.exports = Model
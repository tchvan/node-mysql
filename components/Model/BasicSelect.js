'use strict'

const Sql = require('../Sql')
const Util = require('../Utilities')
const UUID = require('../UUID')

class BasicSelect  {
    static className(){
        return this.toString().split ('(' || /s+/)[0].split (' ' || /s+/)[1]
    }

    static mapParseJson (rows){
        return rows.map(obj => ({ ...obj, json: JSON.parse(obj.json) }))
    }

    // checkType() {
    //     if (this.uuid.typeId !== BigInt(this.type.id)) {
    //         const content = {
    //             code: 'type_miss_matched',
    //             msg: "Type id doesn't match. Requesting '" + this.type.slug + "' [" + this.type.id + "] but given object of [" + this.uuid.typeId + "]"
    //         }
    //         return { result: false, content }
    //     }
    //     return { result: true }
    // }

    static async all(){
        const db_name = Util.Name.getDb(0)
        const tb_name = this.Type.table
        const sql = Sql.MD_SELECT_ALL(db_name, tb_name, '')
        const rows = await this.execute_s(sql)

        return this.mapParseJson(rows)
    }
    
    static async first(){
        const db_name = Util.Name.getDb(0)
        const tb_name = this.Type.table
        const sql = Sql.MD_SELECT_FIRST(db_name, tb_name, '')
        const rows = await this.execute_s(sql)

        return this.mapParseJson(rows)[0]
    }

    static async last(){
        const db_name = Util.Name.getDb(0)
        const tb_name = this.Type.table
        const sql = Sql.MD_SELECT_LAST(db_name, tb_name, '')
        const rows = await this.execute_s(sql)

        return this.mapParseJson(rows)[0]
    }

    static async find(uuid) {
        const db_name = Util.Name.getDb(0)
        const tb_name = this.Type.table
        const uuidO = new UUID(uuid)
        const sql = Sql.MD_SELECT_BY_ID(db_name, tb_name, uuidO.localId)
        const rows = await this.execute_s(sql)

        return this.mapParseJson(rows)[0]
    }

    static async findByName(name){
        const db_name = Util.Name.getDb(0)
        const tb_name = this.Type.table
        const sql = Sql.MD_SELECT_BY_NAME(db_name, tb_name, name)
        const rows = await this.execute_s(sql)

        return this.mapParseJson(rows)[0]
    }

    static async count(){
        const all = await this.all()
        return all.length
    }
}

module.exports = BasicSelect
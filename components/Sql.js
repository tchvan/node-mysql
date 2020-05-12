'use strict'

const Util = require('./Utilities')

class Sql {
    static JSON_COMPACT(json) {
        if (typeof json === "object") {
            let result = {}
            Object.keys(json).forEach(k  => {
                result[k] = Util.String.escStr(json[k])
            })
            json = JSON.stringify(result)
        }
        return "JSON_COMPACT('" + json + "')"
    }

    static DB_CREATE(db_name) {
        return "CREATE DATABASE IF NOT EXISTS " + db_name;
    }
    // const DB_DROP = (db_name)  "DROP DATABASE IF EXISTS " + db_name
    // const DB_EXISTS = (db_name)  "SHOW DATABASES LIKE '" + db_name + "'"
    // const DB_USE = (db_name)  "USE '" + db_name + "'"

    static MD_SELECT_ALL(db_name, tb_name, where) {
        const table = db_name + '.' + tb_name
        const sql = "SELECT * FROM " + table + " WHERE 1=1"
        return sql
    }
   
    static MD_SELECT_FIRST(db_name, tb_name, where) {
        const table = db_name + '.' + tb_name
        const sql = "SELECT * FROM " + table + " WHERE 1=1 LIMIT 1"
        return sql
    }
    
    static MD_SELECT_LAST(db_name, tb_name, where) {
        const table = db_name + '.' + tb_name
        const sql = "SELECT * FROM " + table + " WHERE 1=1 ORDER BY id DESC LIMIT 1 "
        return sql
    }

    static MD_SELECT_BY_ID(db_name, tb_name, id) {
        const table = db_name + '.' + tb_name
        const si = ["SELECT * FROM " + table + " WHERE id IN (" + id + ")"]
        const sql = si.join("\n")
        return sql
    }

    static MD_SELECT_BY_NAME(db_name, tb_name, name) {
        const table = db_name + '.' + tb_name
        const si = ["SELECT * FROM " + table + " WHERE name='" + name + "'"]
        const sql = si.join("\n")
        return sql
    }

    /**
     * 
     * @param {String} db_name 
     * @param {String} tb_name 
     * @param {String} json 
     * @returns {String}
     */
    static MD_INSERT(db_name, tb_name, json, unique_name) {
        const table = db_name + '.' + tb_name
        json = JSON_COMPACT(json)
        const si = [
            "INSERT INTO " + table + "(`name`, `json`) VALUES ('" + Util.String.escStr(unique_name) + "', " + json + ")"
        ]
        const sql = si.join(",\n\t")
        // console.log(sql)

        return sql
    }

    /**
     * 
     * @param {String} db_name 
     * @param {String} tb_name 
     * @param {Int} local_id 
     * @param {String} json 
     * @returns {String}
     */
    static MD_UPDATE(db_name, tb_name, json, local_id) {
        const table = db_name + '.' + tb_name
        json = JSON_COMPACT(json)
        const si = [
            // "START TRANSACTION",
            // "SELECT json FROM " + table + " WHERE id=" + local_id,
            "UPDATE " + table + " SET json=" + json + " WHERE id=" + local_id,
            // "COMMIT",
            ""
        ]
        const sql = si.join(";\n\t")
        console.log(sql)
        return sql
    }


    static META_SELECT_VALUE(db_name, tb_name, e0, e1, key) {
        const table = db_name + '.' + tb_name
        const si = [
            "SELECT * FROM " + table + " WHERE ",
            e0.k + "=" + e0.v + " AND ",
            e1.k + "=" + e1.v + " AND ",
            "`key` LIKE '" + key + "'"
        ]
        const sql = si.join("\n")
        return sql
    }

    static META_SELECT_BY_KEY(db_name, tb_name, entity, key) {
        const table = db_name + '.' + tb_name
        const si = [
            "SELECT * FROM " + table + " WHERE ",
            entity.k + "=" + entity.v + " AND ",
            "`key` LIKE '" + key + "'"
        ]
        const sql = si.join("\n")
        return sql
    }

    static META_CREATE_LINK(db_name, tb_name, e0, e1, key, value) {
        const table = db_name + '.' + tb_name
        const s0 = "INSERT INTO " + table + " (`" + e0.k + "`, `key`, `" + e1.k + "`, `value`) VALUES "
        const si = [
            e0.v,
            "'" + key + "'",
            e1.v,
            value ? "'" + value + "'" : 'null',
        ]
        const sql = s0 + "(\n\t" + si.join(",\n\t") + "\n)"
        return sql
    }
}
module.exports = Sql
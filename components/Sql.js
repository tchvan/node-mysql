'use strict'

const JSON_COMPACT = (json) => {
    if(typeof json === "object"){
        json = JSON.stringify(json)
        // console.log("Convert object to string")
    }
    return "JSON_COMPACT('" + json + "')"
}

const DB_CREATE = (db_name) => "CREATE DATABASE IF NOT EXISTS " + db_name;
// const DB_DROP = (db_name) => "DROP DATABASE IF EXISTS " + db_name
// const DB_EXISTS = (db_name) => "SHOW DATABASES LIKE '" + db_name + "'"
// const DB_USE = (db_name) => "USE '" + db_name + "'"

/**
 * 
 * @param {String} db_name 
 * @param {String} tb_name 
 * @param {String} json 
 * @returns {String}
 */
const MD_INSERT = (db_name, tb_name, json) => {
    const table = db_name + '.' + tb_name
    json = JSON_COMPACT(json)
    const si = [
        "INSERT INTO " + table + "(`json`) VALUES (" + json + ")"
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
const MD_UPDATE = (db_name, tb_name, json, local_id) => {
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
module.exports = {
    DB_CREATE,
    // DB_DROP,
    // DB_EXISTS,
    // DB_USE,

    MD_INSERT,
    MD_UPDATE,
}
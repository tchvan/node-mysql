'use strict'

const DB_CREATE = (db_name) => "CREATE DATABASE IF NOT EXISTS " + db_name;
// const DB_DROP = (db_name) => "DROP DATABASE IF EXISTS " + db_name
// const DB_EXISTS = (db_name) => "SHOW DATABASES LIKE '" + db_name + "'"
// const DB_USE = (db_name) => "USE '" + db_name + "'"

const MD_INSERT = (db_name, tb_name, json) => {
    const table = db_name + '.' + tb_name
    const si = [
        "INSERT INTO " + table + "(`json`) VALUES ('" + json + "')"
    ]
    const sql = si.join(",\n\t")
    // console.log(sql)

    return sql
}

const MD_UPDATE = (db_name, tb_name, local_id, json) => {
    const table = db_name + '.' + tb_name
    const si = [
        "BEGIN",
        "SELECT json FROM " + table + "WHERE id=" + local_id + " FOR UPDATE ",
        "UPDATE " + table + " SET json=`" + json + "` WHERE id=" + local_id,
        "COMMIT"
    ]
    const sql = si.join(",\n\t")
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
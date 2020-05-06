'use strict'

const DB_CREATE = (db_name) => "CREATE DATABASE IF NOT EXISTS " + db_name;
const DB_DROP = (db_name) => "DROP DATABASE IF EXISTS " + db_name
const DB_EXISTS = (db_name) => "SHOW DATABASES LIKE '" + db_name + "'"
const DB_USE = (db_name) => "USE '" + db_name + "'"

const TB_CREATE = (tb_name) => "CREATE TABLE IF NOT EXISTS " + tb_name

module.exports = {
    DB_CREATE,
    DB_DROP,
    DB_EXISTS,
    DB_USE,

    TB_CREATE,
}
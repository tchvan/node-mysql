'use strict'
const Connector = require('./Connector')

class BluePrint {

    /**
     * 
     * @param {String} table_name 
     * @param {Connector} conn 
     */
    createEntity(table_name, conn) {
        // console.log(connector.config)
        const { database } = conn.config
        const s0 = "CREATE TABLE IF NOT EXISTS `" + database + "`.`" + table_name + "` "
        const si = [
            "`id` INT NOT NULL AUTO_INCREMENT",
            "`json` JSON",
            "`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "`modified` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "PRIMARY KEY (`id`)"
        ]
        const sn = "ENGINE = InnoDB;"
        const sql = s0 + "(\n\t" + si.join(",\n\t") + "\n) " + sn
        // console.log(sql)
        return sql
    }


    /**
     * 
     * @param {String} table_name 
     * @param {String} entity0 
     * @param {String} entity1 
     * @param {Connector} conn 
     */
    createRelationShip(table_name, entity0, entity1, conn) {
        const { database } = conn.config
        const e0 = entity0 + "_uuid"
        const e1 = entity1 + "_uuid"

        const s0 = "CREATE TABLE IF NOT EXISTS `" + database + "`.`" + table_name + "`"
        const si = [
            "`" + e0 + "` BIGINT NOT NULL",
            "`" + e1 + "` BIGINT NOT NULL",
            "`key` VARCHAR(255) NOT NULL",
            "`value` LONGTEXT",
            "`modified` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "INDEX(`" + e0 + "`, `" + e1 + "`, `key`)"
        ]
        const sn = "ENGINE = InnoDB;"
        const sql = s0 + "(\n\t" + si.join(",\n\t") + "\n) " + sn
        // console.log(sql)
        return sql
    }
}

module.exports = BluePrint
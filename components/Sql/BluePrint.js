'use strict'
// const Connector = require('./Connector')

class BluePrint {

    /**
     * 
     * @param {String} table_name 
     * @param {Connector} conn 
     */
    createEntity(database, table_name) {
        // console.log(connector.config)
        // const { database } = conn.config
        const s0 = "CREATE TABLE IF NOT EXISTS `" + database + "`.`" + table_name + "` "
        const si = [
            "`id` INT NOT NULL AUTO_INCREMENT",
            "`name` varchar(255) NOT NULL",
            "`json` JSON",
            "`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "`modified` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "PRIMARY KEY (`id`)",
            "UNIQUE `unique_name` (`name`)"
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
    createRelationShip(db_name, table_name, entity0, entity1) {
        const e0 = entity0 + "_id"
        const e1 = entity1 + "_id"

        const s0 = "CREATE TABLE IF NOT EXISTS `" + db_name + "`.`" + table_name + "`"
        const si = [
            "`" + e0 + "` BIGINT NOT NULL",
            "`key` VARCHAR(255) NOT NULL",
            "`" + e1 + "` BIGINT NOT NULL",
            "`value` LONGTEXT",
            "`modified` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "UNIQUE (`" + e0 + "`,`key`, `" + e1 + "`)"
        ]
        const sn = "ENGINE = InnoDB;"
        const sql = s0 + "(\n\t" + si.join(",\n\t") + "\n) " + sn
        // console.log(sql)
        return sql
    }
}

module.exports = BluePrint
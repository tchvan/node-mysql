'use strict'

class BluePrint {
    toString(table_name, connector) {
        // console.log(connector.config)
        const { database } = connector.config
        const s0 = "CREATE TABLE IF NOT EXISTS `" + database + "`.`" + table_name + "` "
        const si = [
            "`id` BIGINT NOT NULL AUTO_INCREMENT",
            "`json` JSON",
            "`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "`modified` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "PRIMARY KEY (`id`)"
        ]
        const sn = "ENGINE = InnoDB;"
        return s0 + "(\n\t" + si.join(",\n\t") + "\n) " + sn
    }
}

module.exports = BluePrint
'use strict'
const Config = require('../config')
const md5 = require('md5')

class UtilString {
    static getDbName(shardId) {
        return Config.DB_PREFIX + ("00000" + shardId).substr(-5)
    }

    static getLinkName(e0, e1){
        return "meta_" + e0 + "_" + e1
    }

    static strToShard(string_to_hash) {
        const hash = md5(string_to_hash)
        const shard_id = parseInt(hash.substr(0, 1), 16)
        return shard_id % Config.MAX_SHARD
    }

    static strToUniqueId(string_to_hash) {
        const hash = md5(string_to_hash)
        const first3 = parseInt(hash.substr(-3), 16) % 1000

        const date = new Date()
        const seconds = date.getTime() / 1000
        const dat3 = Math.round(seconds / 86400) % 1000
        const mid3 = Math.round(seconds) % 1000
        const last3 = date.getMilliseconds()
        return first3 + "-" + dat3 + "-" + mid3 + "-" + last3
    }
}

module.exports = UtilString
'use strict'
const Config = require('../config')

class UtilString { 
    static getDbName(shardId){
        return Config.DB_PREFIX + ("00000" + shardId).substr(-5)
    }
    
    static ownerIdToShard(owner_id) {
        return owner_id % Config.MAX_SHARD
    }
}

module.exports = UtilString
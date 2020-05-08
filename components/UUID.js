'use strict'

const Config = require('../config')

class UUID {
    constructor(id) {
        this.id = BigInt(id)
        // this.shareId = (this.id >> 46n) & 4095n
        this.shareId = (this.id >> 46n) & BigInt(Config.MAX_SHARD - 1)
        this.typeId = (this.id >> 36n) & 0x3FFn
        this.localId = this.id & 0xFFFFFFFFFn
    }

    // // getShardId() { return (this.id >> 46n) & 4095n }
    // getShardId() { return  }
    // getTypeId() { return  }
    // getLocalId() { return  }

    /**
     * 
     * @param {BigInt} shardId 
     * @param {BigInt} typeId 
     * @param {BigInt} localId 
     */
    static get(shardId, typeId, localId) { return (BigInt(shardId) << 46n) | (BigInt(typeId) << 36n) | BigInt(localId) }
    toString() { return "Shard[" + this.shareId + "] - Type[" + this.typeId + "] - Local[" + this.localId + "]" }
}

module.exports = UUID
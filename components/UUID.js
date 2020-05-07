'use strict'

const Config = require('../config')

class UUID {
    constructor(id) { this.id = BigInt(id) }

    // getShardId() { return (this.id >> 46n) & 4095n }
    getShardId() { return (this.id >> 46n) & BigInt(Config.MAX_SHARD - 1) }
    getTypeId() { return (this.id >> 36n) & 0x3FFn }
    getLocalId() { return this.id & 0xFFFFFFFFFn }

    /**
     * 
     * @param {BigInt} shardId 
     * @param {BigInt} typeId 
     * @param {BigInt} localId 
     */
    static get(shardId, typeId, localId) { return (BigInt(shardId) << 46n) | (BigInt(typeId) << 36n) | BigInt(localId) }
    toString() { return "Shard[" + this.getShardId() + "] - Type[" + this.getTypeId() + "] - Local[" + this.getLocalId() + "]" }
}

module.exports = UUID
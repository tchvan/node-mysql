'use strict'

const Config = require('../config')

class UUID {
    constructor(id) {
        this.id = BigInt(id)
        // this.shardId = (this.id >> 46n) & 4095n
        this.shardId = (this.id >> 46n) & BigInt(Config.MAX_SHARD - 1)
        this.typeId = (this.id >> 36n) & 0x3FFn
        this.localId = this.id & 0xFFFFFFFFFn
    }

    /**
     * 
     * @param {BigInt} shardId 
     * @param {BigInt} typeId 
     * @param {BigInt} localId 
     */
    static get(shardId, typeId, localId) { return (BigInt(shardId) << 46n) | (BigInt(typeId) << 36n) | BigInt(localId) }
    toText() {
        return {
            shardId: this.shardId + "",
            typeId: this.typeId + "",
            localId: this.localId + "",
        }
    }
    toString() { return this.id + "" }
}

module.exports = UUID
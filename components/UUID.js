'use strict'

const Config = require('../config')

class UUID {
    constructor(id) {
        this.id = BigInt(id)
        // this.shardId = (this.id >> 46n) & 4095n
        this.shardId = (this.id >> BigInt(46)) & BigInt(Config.MAX_SHARD - 1)
        this.typeId = (this.id >> BigInt(36)) & BigInt(0x3FF)
        this.localId = this.id & BigInt(0xFFFFFFFFF)
    }

    /**
     * 
     * @param {BigInt} shardId 
     * @param {BigInt} typeId 
     * @param {BigInt} localId 
     */
    static get(shardId, typeId, localId) { return (BigInt(shardId) << BigInt(46)) | (BigInt(typeId) << BigInt(36)) | BigInt(localId) }
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
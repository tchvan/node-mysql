'use strict'

const Config = require('../config')

class UUID {
    constructor(id) { this.id = id }

    getShardId() { return (this.id >> 46) & (Config.MAX_SHARD - 1) }
    getTypeId() { return (this.id >> 36) & 0x3f }
    getLocalId() { return this.id & 0xFFFFFFFFF }

    get() { return this.id }
    set(shardId, typeId, localId) { }
    toString() { return "Shard[" + this.getShardId() + "] - Type[" + this.getTypeId() + "] - Local[" + this.getLocalId() + "]" }
}

module.exports = UUID
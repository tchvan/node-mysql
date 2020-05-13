'use strict'

const DbInteraction = require('./DbInteraction')
const DB = require('./DB')
const Faker = require('./Faker')
const Util = require('./Utilities')
const UUID = require('./UUID')

class Factory extends DbInteraction {

    define(type, jsonCreator) {
        const json = jsonCreator(new Faker())
        const { name } = json

        const user_name = json.user_name
        const uuid = json.uuid

        const shard_id = (user_name) ? Util.Name.toShard(user_name) : (new UUID(uuid)).shardId

        const slug = Util.String.slug(name)
        // console.log("Factory conn", this.conn)
        const db = new DB(this.conn)
        const result = db.insert(shard_id, slug, json, type)
        return result
    }

    link(type, uuid, insertId, key, value) {
        const { shardId, localId, typeId } = (new UUID(uuid))
        const db = new DB(this.conn)
        db.link(shardId, localId, insertId, key, value)
        console.log("About to link, DB[" + shardId + "] source:", localId, typeId, " target: ", insertId, type)
    }
}

module.exports = Factory
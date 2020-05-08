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

        const shard_id = (user_name) ? Util.String.toShard(user_name) : (new UUID(uuid)).shareId

        const slug = Util.String.slug(name)
        const db = new DB(this.conn)
        const result = db.insert(shard_id, slug, json, type)
        return result
    }

    link(type, uuid, insertId, key, value) {
        const { shareId, localId, typeId } = (new UUID(uuid))
        const db = new DB(this.conn)
        db.link(shareId, localId, insertId, key, value)
        console.log("About to link, DB[" + shareId + "] source:", localId, typeId, " target: ", insertId, type)
    }
}

module.exports = Factory
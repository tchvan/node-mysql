'use strict'

const { Query } = require('./DB')
const Faker = require('./Faker')
const Util = require('./Utilities')
const UUID = require('./UUID')

class Factory {

    static async define(type, jsonCreator) {
        const json = jsonCreator(new Faker())
        const { name } = json

        const user_name = json.owner_email
        const uuid = json.owner_uuid
        // console.log("Define", user_name, uuid)
        const shard_id = (user_name) ? Util.Name.toShard(user_name) : (new UUID(uuid)).shardId
        const unique_name = (user_name) ? user_name : json.name

        const slug = Util.String.slug(name)
        const result = await Query.insert(shard_id, unique_name, json, type)
        // console.log(result.affectedRows)
        return result
    }

    static link(type, uuid, insertId, key, value) {
        const { shardId, localId, typeId } = (new UUID(uuid))
        const db = new DB(this.conn)
        db.link(shardId, localId, insertId, key, value)
        console.log("About to link, DB[" + shardId + "] source:", localId, typeId, " target: ", insertId, type)
    }
}

module.exports = Factory
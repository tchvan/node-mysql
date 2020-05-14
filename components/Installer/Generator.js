'use strict'

const { Type, User } = require('./Models')
const Factory = require('../Factory')
const { RelationShip } = require('../RelationShip')
const DbInteraction = require('../DbInteraction')

class Generator extends DbInteraction {

    async generateUsers(count=1) { 
        // console.log("Generator conn", this.conn)
        const f = (new Factory(this.conn))
        
        return await f.define(Type.User, (faker) => {
            const email = faker.email()
            return {
                user_name: email,
                name: faker.name(),
                email,
            }
        })
    }

    generatePosts(uuid) {
        const f = (new Factory(this.conn))
        return f.define(Type.Post, (faker) => ({
            uuid: uuid,
            name: faker.sentence() + " " + faker.number(),
            content: faker.paragraph(),
        }))
    }

    createRelationShip(uuid, result) {
        const { insertId } = result
        const u = new User(BigInt(uuid), this.conn)
        u.createRelationShip(insertId, Type.Post, RelationShip.hasMany(), null)
    }
}

module.exports = Generator
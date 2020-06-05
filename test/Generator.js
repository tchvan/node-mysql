'use strict'

const Factory = require('../components/Factory')
const UUID = require('../components/UUID')
const Util = require('../components/Utilities')
const { User, Post, Type, Relationship } = require('./testModel')

class Generator {
    static async createUser(id) {
        // console.log("Id", id)
        const rs = await Factory.define(Type.User, (faker) => {
            const email = faker.email(id)
            return {
                owner_email: email,
                name: faker.name(id),
                email,
            }
        })
        return new Promise(resolve => resolve(rs.affectedRows))
    }

    static async createPost(user_id, post_id) {
        const rs = await Factory.define(Type.Post, (faker) => {
            const email = faker.email(user_id)
            const user_uuid = UUID.get(Util.Name.toShard(email), Type.User.id, user_id) + ""
            return {
                owner_uuid: user_uuid,
                name: faker.sentence() + " " + Util.String.fillZero(user_id) + " " + Util.String.fillZero(post_id),
                content: faker.paragraph(),
            }
        })
        return new Promise(resolve => resolve(rs.affectedRows))
    }

    static async createNPosts(n, uid) {
        const b = Util.Arr.create1toN(n)
        const x = await Promise.all(b.map(pid => Generator.createPost(uid, pid)))
        const postsEachUser = x.reduce((a, c) => a + c)
        return new Promise(resolve => resolve(postsEachUser))
    }
}

module.exports = Generator
const expect = require('chai').expect;
// const Util = require('../components/Utilities')
const Config = require('../config')
// const { Installer, Generator, Models } = require('../components/Installer')
const { User, Post, Type, Relationship } = require('./testModel')

const { Database, Table } = require('../components/DB')

const Generator = require('./Generator')
const Util = require('../components/Utilities')

const testMeta = {
    maxUser: 10,
    maxPostPerUser: 10
}

const sum = (a, c) => a + c

module.exports = () => {
    describe('1. Database interaction', () => {
        it('Should create all ' + Config.MAX_SHARD + ' DBs', async () => {
            const rs = await Database.createDBAll()
            expect(rs.length).to.equal(Config.MAX_SHARD)
        })
        // it('Should disconnect All DBs', async () => {
        //     const dis = await Database.disconnectAll()
        //     console.log(dis)
        // })
        it('Should connect All DBs', async () => {
            await Database.connectAll()
        })
    })
    describe('2. Table creation', () => {
        // this.timeout(0)
        Object.keys(Type).forEach(key => {
            const table = (Type[key].table)
            it('Should create Entity table ' + table, async () => {
                const rs = await Table.createEntityTable(table)
                expect(rs.length).to.equal(Config.MAX_SHARD)
            })
        })
        Relationship.map(pair => {
            // console.log(pair)
            it('Should create Relationship table ' + pair, async () => {
                const rs = await Table.createLinkTable(pair[0], pair[1])
                expect(rs.length).to.equal(Config.MAX_SHARD)
            })
        })

    })
    describe('4. Data creation', () => {
        const a = Util.Arr.create1toN(testMeta.maxUser)
        it('Should insert ' + testMeta.maxUser + " users", async () => {
            const x = await Promise.all(a.map(key => Generator.createUser(key)))
            expect(x.reduce(sum)).to.equals(testMeta.maxUser)
        })

        const totalCreatedPosts = testMeta.maxUser * testMeta.maxPostPerUser
        it('Should insert ' + totalCreatedPosts + " posts (" + testMeta.maxPostPerUser + "/user) by Owner_UUID", async () => {
            const x = await Promise.all(a.map(uid => Generator.createNPosts(testMeta.maxPostPerUser, uid)))
            expect(x.reduce(sum)).to.equals(totalCreatedPosts)
        })
    })
    describe('n. Database close', () => {
        it('Should disconnect All DBs', async () => {
            await Database.disconnectAll()
        })
    })
}
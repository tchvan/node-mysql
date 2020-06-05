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

module.exports = () => {
    describe('1. Database interaction', () => {
        // it('Should create all ' + Config.MAX_SHARD + ' DBs', async () => {
        //     const rs = await Database.createDBAll()
        //     expect(rs.length).to.equal(Config.MAX_SHARD)
        // })
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
        // it('Should insert ' + testMeta.maxUser + " users", async () => {
        //     const x = await Promise.all(a.map(key => Generator.createUser(key)))
        //     const total = x.reduce((a, c) => a + c)
        //     expect(total).to.equals(testMeta.maxUser)
        // })

        it('Should insert ' + testMeta.maxPostPerUser + " posts per User by Owner_UUID", async () => {
            const b = Util.Arr.create1toN(testMeta.maxPostPerUser)
            const totalPosts = await Promise.all(a.map(async (uid) => {
                const x = await Promise.all(b.map(pid => Generator.createPost(uid, pid)))
                const postsEachUser = x.reduce((a, c) => a + c)
                return new Promise(resolve => resolve(postsEachUser))
            }))
            const total = totalPosts.reduce((a, c) => a + c)
            expect(total).to.equals(testMeta.maxUser * testMeta.maxPostPerUser)
        })
    })
    describe('n. Database close', () => {
        it('Should disconnect All DBs', async () => {
            await Database.disconnectAll()
        })
    })
}  
const expect = require('chai').expect;
// const Util = require('../components/Utilities')
const Config = require('../config')
// const { Installer, Generator, Models } = require('../components/Installer')
const { User, Post, Type, Relationship } = require('./testModel')

const { Database, Table } = require('../components/DB')
const Factory = require('../components/Factory')

const testMeta = {
    maxUser: 10,
}

module.exports = () => {
    describe('1. Database interaction', () => {
        it('Should create all DBs', async () => {
            const rs = await Database.createDBAll()
            expect(rs.length).to.equal(Config.MAX_SHARD)
        })
        it('Should disconnect All DBs', async () => {
            await Database.disconnectAll()
        })
        it('Should connect All DBs', async () => {
            await Database.connectAll()
        })
    })
    describe('2. Table creation', () => {
        Object.keys(Type).forEach(table => {
            it('Should create Entity table ' + table, async () => {
                const rs = await Table.createEntityTable(table)
                expect(rs.length).to.equal(Config.MAX_SHARD)
            })
        })
        Relationship.map(pair=>{
            // console.log(pair)
            it('Should create Relationship table ' + pair, async () => {
                const rs = await Table.createLinkTable(pair[0], pair[1])
                expect(rs.length).to.equal(Config.MAX_SHARD)
            })
        })

    })
    // describe('3. Data creation', () => {
    //     it('Should Insert ' + testMeta.maxUser + " users", async () => {
    //         return await Factory.define(Type.User, (faker) => {
    //             const email = faker.email()
    //             return {
    //                 user_name: email,
    //                 name: faker.name(),
    //                 email,
    //             }
    //         })
    //     })
    // })
    describe('n. Database close', () => {
        it('Should disconnect All DBs', async () => {
            await Database.disconnectAll()
        })
    })

} 
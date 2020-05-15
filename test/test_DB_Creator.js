const expect = require('chai').expect;
// const Util = require('../components/Utilities')
const Config = require('../config')
// const Conn = require('../components/Connector')
// const { Installer, Generator, Models } = require('../components/Installer')
// const { User, Post, Type } = Models

const Database = require('../components/Database/Database')

module.exports = () => {
    // const gen = new Generator(conn0)
    // const maxUsers = 10
    // User.connect(conn0)
    // console.log("Generator", gen)
    describe('#Database interaction', () => {
        it('Should create all DBs', async () => {
            const rs = await Database.createDBAll()
            expect(rs.length).to.equal(Config.MAX_SHARD)
        })
        it('Should Dis-connect All DBs', async () => {
            await Database.disconnectAll()
        })
        it('Should Connect All DBs', async () => {
            const rs = await Database.connectAll()
        })
        it('Should Dis-connect All DBs', async () => {
            await Database.disconnectAll()
        })
        // it('Count created db', async () => {
        //     let result = await Installer.countDB()
        //     expect(result).to.equal(Config.MAX_SHARD)
        // })
        // it('Should insert ' + maxUsers + ' new users', async () => {
        //     let result = await gen.generateUsers(maxUsers)
        //     let count = await User.count()
        //     expect(count).to.equal(maxUsers)
        //     // console.log("10 new users", result)
        // })

    })
} 
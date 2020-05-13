const expect = require('chai').expect;
// const Util = require('../components/Utilities')
const Config = require('../config')
const Conn = require('../components/Connector')
const { Installer, Generator, Models } = require('../components/Installer')
const { User, Post, Type } = Models

module.exports = (config) => {
    // const conn0 = new Conn(config)
    // const gen = new Generator(conn0)
    // const maxUsers = 10
    // console.log("Generator", gen)
    describe('#Create New DB', () => {
        it('Create DB and delay', async () => {
            const x = await Installer.createDB(config)
            expect(x.length).to.equals(Config.MAX_SHARD)
        })
        it('Count created db', async () => {
            let result = await Installer.countDB()
            expect(result).to.equal(Config.MAX_SHARD)
        })
        // it('Should insert ' + maxUsers + ' new users', async () => {
        //     let result = await gen.generateUsers(maxUsers)
        //     let count = await User.count()
        //     expect(count).to.equal(maxUsers)
        //     // console.log("10 new users", result)
        // })
    }) 
}
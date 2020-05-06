const expect = require('chai').expect;
const connect = require('../components/connect')
const db = require('../components/database')

module.exports = (config) => {
    const conn = connect(config)
    const db_name = "some_test_db_name_xyz"
    describe('#create database', () => {
        it('should convert single digits', () => {
            var result = db.create(db_name, conn)
            expect(result).to.equal('1');
        });
    })
}
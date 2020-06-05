const expect = require('chai').expect;
const Util = require('../../components/Utilities')
const Config = require('../../config')
const UUID = require('../../components/UUID')

module.exports = () => {
    describe('#Test UUID', () => {
        const num = "241294492511762325"
        const uuid = new UUID(num)
        // console.log(uuid.shardId)
        it('should get correct shareId', () => {
            expect(uuid.shardId + "").to.equal((3429 % Config.MAX_SHARD) + '')
        })
        it('should get correct typeId', () => {
            expect(uuid.typeId + "").to.equal('1')
        })
        it('should get correct localId', () => {
            expect(uuid.localId + "").to.equal('7075733')
        })
        it('should conver correct tripple to UUID', () => {
            expect(UUID.get(3429, 1, 7075733) + "").to.equal(num)
        })
    })
}
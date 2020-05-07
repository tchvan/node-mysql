const Connector = require('./Connector')

class DbInteraction {
    /**
   * @param {Connector} connector
   */
    static connect(connector) {
        this.conn = connector
        return this
    }
}

module.exports = DbInteraction
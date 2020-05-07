const Connector = require('./Connector')

class DbInteraction {
    constructor(conn) {
        this.conn = conn
    }
    /**
   * @param {Connector} connector
   */
    static connect(connector) {
        this.conn = connector
        return this
    }

    execute(sql) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.conn.query(sql, (err, result) => {
                    if (err) throw err
                    resolve(result)
                })
            }, 0);
        })
    }
}

module.exports = DbInteraction
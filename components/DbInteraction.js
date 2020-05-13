const Connector = require('./Connector')

class DbInteraction {
    constructor(conn) { this.conn = conn }

    static connect(connector) {
        this.conn = connector
        return this
    }

    static execute_s(sql) {
        return new Promise((resolve) => {
            // setTimeout(() => {
                this.conn.query(sql, (err, result) => {
                    if (err) {
                        console.error("SQL:\n" + sql)
                        throw err
                    }
                    resolve(result)
                })
            // }, 0);
        })
    }

    execute(sql) {
        return new Promise((resolve) => {
            // setTimeout(() => {
                this.conn.query(sql, (err, result) => {
                    if (err) {
                        console.error("SQL:\n" + sql)
                        throw err
                    }
                    resolve(result)
                })
            // }, 0);
        })
    }
}

module.exports = DbInteraction
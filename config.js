'use strict'
const Config = {
    MAX_SHARD: 2, // Production: 4096
    DB_PREFIX: "tmp_zdb",
    dbconf: {
        host: '127.0.0.1',
        user: 'root',
        password: process.env.TRAVIS ? '' : 'mysql'
    }
}

module.exports = Config
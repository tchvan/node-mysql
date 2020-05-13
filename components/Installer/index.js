'use strict'

const Schema = require('../Schema')

class Installer {
    static async createDB(config) {
        const entities = ['posts', 'users']
        const links = [
            ['users', 'posts'],
        ]
        return await Schema.install(config, entities, links)
    }

    static async countDB() {
        return await Schema.countDB()
    }
}

const Generator = require('./Generator')
const Models = require('./Models')
module.exports = {
    Installer,
    Generator,
    Models,
}
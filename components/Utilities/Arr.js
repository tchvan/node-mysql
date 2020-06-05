'use strict'

class Arr {
    static create1toN(count) {
        return [...Array(count).keys()]
    }
}

module.exports = Arr
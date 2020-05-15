'use strict'

const Str = require('./String')

class DateTime {
    static getCurrentTime() {
        const date = new Date()
        return Str.fillZero(date.getHours(), 2) + ":" + Str.fillZero(date.getMinutes(), 2) + ":" + Str.fillZero(date.getSeconds(), 2)
    }
    static getCurrentDate() {
        const date = new Date()
        return Str.fillZero(date.getFullYear(), 4) + "-" + Str.fillZero(date.getMonth() + 1, 2) + "-" + Str.fillZero(date.getDate(), 2)
    }
    static getCurrentDateTime() {
        return DateTime.getCurrentDate() + "T" + DateTime.getCurrentTime()
    }
}

module.exports = DateTime
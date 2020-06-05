'use strict'

const md5 = require('md5')
const FakerData = require('./data')
const Util = require('../Utilities')

class Faker {
    random(array) {
        const index = Math.round(Math.random() * array.length) % array.length
        // console.log("Random index", index)
        return array[index]
    }

    number(digit = 5) {
        return Util.String.fillZero(Math.round(Math.random() * Math.pow(10, digit)), digit)
    }

    name(id) {
        // console.log("Name", id ? id : "random")
        return (id !== null) ? FakerData.names[id] : this.random(FakerData.names)
    }

    email(id) {
        // console.log("Email", id ? id : "random")
        const dateTime = md5(Util.DateTime.getCurrentDateTime()).substr(0, 10) + "_"
        return dateTime + Util.String.fillZero(id, 4) + "@gmail.com"
        // return (id !== null) ? FakerData.emails[id] : this.random(FakerData.emails)
    }

    sentence() {
        let str = this.random(FakerData.sentences)
        str = str.substr(0, str.length - 1)
        if (Math.random() < 0.3) str = '"' + str + '"'
        return str
    }

    paragraph(count = 10) {
        const a = []
        for (let i = 0; i < count; i++) a.push(this.sentence())
        return a.join(". ") + "."
    }
}

module.exports = Faker
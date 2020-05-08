'use strict'

const FakerData = require('./static/faker')

class Faker {
    // static analyse() {
    //     const sentences = FakerData.sentences
    //     sentences.forEach(s => {
    //         if (s.length < 10) console.log(s)
    //     })
    // }
    random(array) {
        const index = Math.round(Math.random() * array.length) % array.length
        return array[index]
    }

    name() {
        return this.random(FakerData.names)
    }

    email() {
        return this.random(FakerData.emails)
    }

    sentence() {
        let str = this.random(FakerData.sentences)
        str = str.substr(0, str.length - 1)
        if(Math.random() < 0.3) str = '"' + str + '"'
        return str
    }

    paragraph(count = 10) {
        const a = []
        for (let i = 0; i < count; i++) a.push(this.sentence())
        return a.join(". ") + "."
    }
}

module.exports = Faker
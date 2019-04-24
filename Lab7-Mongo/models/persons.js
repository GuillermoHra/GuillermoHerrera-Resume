const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    born: {
        type: String,
        required: true
    },
    timeline: {
        type: String
    },
    alliegance: {
        type: Array
    },
    playedBy: {
        type: String
    },
    titles: {
        type: Array
    }, 
    father: {
        type: String
    },
    mother: {
        type: String
    },
    spouse: {
        type: String
    }
})

module.exports = Person

'use strict'

class Type {
    static getTbName(type_id) {
        switch (type_id) {
            case 1: return 'posts'
            case 2: return 'terms'
            case 3: return 'users'
            default: return 0
        }
    }
}

Type.post = 1
Type.term = 2
Type.user = 3

module.exports = Type
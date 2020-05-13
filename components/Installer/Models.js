const Model = require('../Model')

class Type { }

Type.Post = { id: 1, slug: 'post', table: 'posts' }
Type.Term = { id: 2, slug: 'term', table: 'terms' }
Type.User = { id: 3, slug: 'user', table: 'users' }

class User extends Model {
    posts() {
        return this.hasMany(Type.Post)
    }
}
User.Type = Type.User

class Post extends Model {
    user(){
        return this.belongsTo(Type.User)
    }
}
Post.Type = Type.Post

module.exports = { Type, User, Post }
'use stricy'

const hasOne = 'hasOne'
const hasMany = 'hasMany'
const belongsTo = 'belongsTo'
const belongsToMany = 'belongsToMany'

class RelationShip { }

const leftToRight = (text) => ">-" + text + "->"
const rightToLeft = (text) => "<-" + text + "-<"

RelationShip.hasMany = () => leftToRight(hasMany)
RelationShip.belongsTo = () => rightToLeft(belongsTo)


module.exports = RelationShip
const conn = require('./conn')
const User = require('./User')

const sync = (e) => conn.sync(e)

const seed = () => {
	Promise.all([
		User.create({username:'Jerry', password:'yrrej'}),
		User.create({username:'Anthony', password:'yonhtna'})
	])
}

module.exports={
	sync,
	seed,
	models: { User }
}
const conn = require('./conn')
const Sequelize = conn.Sequelize

const User = conn.define('user', {
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password:{
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = User
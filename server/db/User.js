const conn = require('./conn')
const Sequelize = conn.Sequelize
const bcrypt = require('bcrypt')

const User = conn.define('user', {
		username: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password:{
			type: Sequelize.TEXT,
			allowNull: false
		}
	},
	{
		hooks: {beforeCreate(user,options){
			if(user){
				return bcrypt.genSalt(12)
				.then(salt => bcrypt.hash(user.password,salt))
				.then(hashPw => user.password = hashPw)
				.then(hashPw => this.password = hashPw)
				.catch(error => console.log(`beforeCreate ${error.message}`))
			}
		}}
	}
)

User.isValidPassword = function(passwordEntered){
	return bcrypt.compare(passwordEntered,this.password)
	.then(isCorrectPassword => isCorrectPassword)
	.catch(error => console.log(`validation error ${error.message}`))
}

module.exports = User
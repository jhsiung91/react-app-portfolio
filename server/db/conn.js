const Sequelize = require('sequelize')
const conn = new Sequelize('postgres://localhost/react-feb24',{logging: true, operatorsAliases:false})

module.exports = conn
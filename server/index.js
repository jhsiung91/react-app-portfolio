const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { resolve } = require('path')
const { sync, seed } = require('./db')
//const conn = require('./db/conn')
const { User } = require('./db').models

app.use(express.static(resolve(__dirname, '..', 'public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/users', (req,res,next)=>{
	User.findAll()
	.then(users => res.send(users))
	.catch(next)
})

app.post('/', (req,res,next)=>{
	const {username, password} = req.body
	User.create({username, password})
	.then(()=>res.redirect('/'))
})

app.get('/*', (req,res,next)=>{
	res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))
})

app.use((error, req, res, next)=>{
	if(error){
		console.log(error.message)
	}
})

sync({ force: true })
.then(()=> seed())
.then(()=> app.listen(3000,console.log('im on port 3000')))


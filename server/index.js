const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { resolve } = require('path')
const { sync, seed } = require('./db')
//const conn = require('./db/conn')
const { User } = require('./db').models
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('./api/passport/secret')
const passportConfig = require('./api/passport/passport')
const passport = require('passport')

app.use(express.static(resolve(__dirname, '..', 'public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const signToken = (user) => {
	return jwt.sign({
		sub: user.userId, 
		iat: new Date().getTime(), 
		exp: new Date().setDate(new Date().getDate()+1)}
		,jwtSecret)
}

app.get('/secret', passport.authenticate('local',{session:false}), (req,res,next)=>{
	console.log('success the user has been stored in req.user')
	const token = signToken(req.user)
	res.json({token})
})

app.get('/secretJwt', passport.authenticate('jwt',{session:false}), (req,res,next)=>{
	res.json({secret: 'you made it'})
})

app.get('/api/users', (req,res,next)=>{
	User.findAll()
	.then(users => res.send(users))
	.catch(next)
})

app.post('/', (req,res,next)=>{
	const {username, password} = req.body
	User.create({username, password})
	.then( user => signToken(user))
	.then( token => res.json(token))
	.catch(next)
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


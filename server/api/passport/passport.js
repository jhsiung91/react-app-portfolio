const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../../db').models
const password = require('./secret').jwtSecret

// json webtoken strategy 
passport.use(new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromHeader('autherization'), 
		secretOrKey: password
	},
	(payload,done) => {
		User.findById(payload.sub)
		.then( user=> {
			if(!user) return done(null,false)
			done(null,user)
		})
		.catch(done)
	} 
))

// local strategy
passport.use(new LocalStrategy({
		usernameField: 'email'
	},
	(email, password, done) => {
		User.findOne({where: {email}})
		.then( user=> {
			if(!user) return done(null,false)
			User.isValidatePassword(password)
			.then(correctPw => {
				if(correctPw) done(null,user)
				done(null, false)
			})
			.catch(done)
		})
	}
))



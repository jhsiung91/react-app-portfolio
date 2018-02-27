import React, { Component } from 'react'
import Users from './Users.jsx'
import { Switch, Route } from 'react-router-dom'
import Home from './Home.jsx'

export default class Main extends Component {
	constructor(props){
		super(props);
		this.state={ messages : props.messages.message}
	}

	render(){
		return (
			<main>
				<Switch>
					<Route exact path='/' component={ Home } />
					<Route path='/users' component={ Users } />
				</Switch>
			</main>
		)
	}
}
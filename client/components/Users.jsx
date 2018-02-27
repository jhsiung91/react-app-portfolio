import React, { Component } from 'react'
import axios from 'axios'

export default class Users extends Component {
	constructor(){
		super()
		this.state = {users:[]}
	}

	componentDidMount(){
		axios.get('/api/users')
		.then(users => {
			console.log(users.data)
			this.setState({users: users.data})
		})
	}

	render(){

		return (
			<div>
			Users
				<ul>
					{ 
						this.state.users.map(user => <li key={user.id}>{user.username}</li>) 
					}
				</ul>
			</div>
		)
	}

}
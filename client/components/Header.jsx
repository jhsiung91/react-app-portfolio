import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Header extends Component {
	constructor() {
		super()
		this.state = {
			username:'',
			password:''
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()
		//this.setState({username: this.state.username, password: this.state.password })
		console.log(this.state.username, this.state.password)
		
		axios.post('/', {username: this.state.username, password: this.state.password})
		this.setState({username: '', password: '' })
	}

	render() {
		const {handleSubmit} = this
		return (
			<nav>
				<form onSubmit={handleSubmit}>
					<label htmlFor='username'>username</label>
					<input type='text' autoFocus id='username' name='username' value={this.state.username} onChange={event=>{this.setState({username:event.target.value})}} />
					<br />
					<label htmlFor='password'> password</label>
					<input type='password' id='password' name='password' value={this.state.password} onChange={event=>{this.setState({password:event.target.value})}} />
					<button> submit </button>
				</form>

				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/users'>Users</Link></li>
				</ul>			
			</nav>
		)
	}

}
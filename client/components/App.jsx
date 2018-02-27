import React from 'react'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

const App = () => {
	return (
		<div>
			<Header />
			<Main messages={{message:"sending message zzzz"}} />
			<Footer message={"this is the footer"} />
		</div>
	)
}

export default App
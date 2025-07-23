import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import UpdateCredentials from './UpdateCredentials'
function Home(){



	const [helloUser,setHelloUser] = useState("")

	useEffect(()=>{
		const savedUserName = localStorage.getItem('helloUser');

		savedUserName ? setHelloUser(savedUserName) : setHelloUser("User");
	})
	return(
		<div>
			<h1>Welcome to home</h1>
			<h2>{helloUser}</h2>
			<a href='/update'>
				update credentials
			</a>
		</div>
	)
}


export default Home
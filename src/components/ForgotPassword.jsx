import { useState } from 'react'
import '../styles/ForgotPassword.css'
import axios from 'axios';

function ForgotPassword(){

	const [email,setEmail] = useState();
	const [message,setMessage]= useState("")

	

	axios.defaults.withCredentials = true;
	
	const handleSubmit = function(e){
		e.preventDefault()
		axios.post('/forgot-password',{email}).then(res=>{
			if(res.data.Status==='Success'){
				console.log();
			}	
		})
	}


	return(
		<>
		
			<div className='forgot-password-container'>
				<form onSubmit={handleSubmit} >
					<h1>Forgot Password</h1>
					<label>Email</label>
					<input placeholder="enter your email" onChange={e=>setEmail(e.target.value)} />
					<button type='submit'>Send</button>
				</form>

			</div>
		</>
	)
}

export default ForgotPassword
import { Link } from 'react-router-dom'
import '../styles/signup.css'
import '../styles/login.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
let newUser = ""
function Signup(){

	const [name,setName] = useState("")
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const [showSuccess, setShowSuccess] = useState(false)
	const [showError, setShowError] = useState(false)

	const navigate = useNavigate();

	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape') {
		  const active = document.activeElement;
		  if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
			active.blur();
		  }
		}
	  });
	
	  
	  // Auto-focus textarea on hover
	  document.querySelectorAll('.register-inputs').forEach(input => {
		input.addEventListener('click', () => {
		  input.focus();
		});
	  });
	const handleSubmit = (e)=>{
		e.preventDefault()
	
		
		
		
		console.log('In the handle submit')
		
		console.log(name,email,password)
		axios.post('https://temple-project-server-3oc3.onrender.com/register',{name,email,password}).then((result)=>{
			newUser = name
			if(result.data.status==="success"){
				console.log('POSTED THE DATA SUCCESSFULLY')
				setShowSuccess(true);
				setTimeout(()=>{
					setShowSuccess(false)
					navigate('/login')
				},3000)
			}
			}).catch((err)=>{
				console.log('Error while posting the data into the database '+err.message);
				setShowError(true);
	})

	}
	return(
		
		
		<div>
			{showSuccess  && <GoodRegister/>}
			{showError && <BadRegister/>}
			<div className="container">

					<h1 className='h1'>Register</h1>
					
				<form className='form' onSubmit={handleSubmit} >
					<div className='attr'>
						<label htmlFor="name" className="labels">Name</label>
						<input id='username' type="text" placeholder="abc xyz" autoComplete="off" className='register-inputs' onChange={(e)=>setName(e.target.value)} required></input>
					</div>
					<div className='attr'>
						<label htmlFor="email" className="labels">Email</label>
						<input type="email" placeholder="abc@gmail.com" className='register-inputs' onChange={(e)=>setEmail(e.target.value)} required></input>
					</div>
					<div className='attr'>
						<label htmlFor="password" className="labels">Password</label>
						<input type="password" className='register-inputs' onChange={(e)=>setPassword(e.target.value)} required></input>
					</div>
					<div>
						<button type="submit" className='register' onClick={handleSubmit}>
								REGISTER
						</button>
					</div>
					<div className='attr'>
						<p>Already have an account ?</p>
						<Link to="/login">LOGIN
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export function GoodRegister(){
	return(
		
		<div>
			<div className='good-login' id='goodLogin'>
				
				<h2 className='new-user-name'>{newUser}</h2>
				<p className='message'>You are successfully registered </p>
			</div>
		</div>
	)
}


function BadRegister(){
	return(
		<div >
			
			<div className='bad-register'>
				
			</div>
		</div>
	)
}
export default Signup
import { Link } from 'react-router-dom'
import '../styles/signup.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'
function Login(){
	const [count,setCount] = useState(0);
	// const [name,setName] = useState("")
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	const [showNotEmail,setShowNotEmail] = useState(false)
	//showNotEmail is a state for NO RECORD FOUND FOR THE USER
	//Unregistered email
	
	const navigate = useNavigate();
	const [showSuccess, setShowSuccess] = useState(false)
	const [showError, setShowError] = useState(false)

	const passwordField = document.getElementById('password-field')

	// const showPassword = document.getElementById('show-password')
	const toggleButton = document.getElementById('toggleButton')
	const showHideText = document.getElementById('show-hide-text')

	const handleShowPassword = function(){
			const isPassword = passwordField.type === 'password';
			showHideText.innerText = isPassword ? 'hide 🫣'  : 'show 👁️'
			passwordField.type = isPassword ? 'text' : 'password';
		}
	

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
		console.log(email,password)
		axios.post('http://localhost:3001/login',{email,password}).then(
			result=>{
				if(result.data.status==="success"){
					const helloUser = result.data.username;
					console.log('Received local storage item as '+helloUser)

					localStorage.setItem('helloUser',helloUser);
					console.log('Animation coming')
					setShowSuccess(true)
					setTimeout(()=>{
						setShowSuccess(false)	
						navigate('/home')
					},3000)
					
					console.log('logged in success')
				}
				else if(result.data==='WRONG_PASSWORD'){
					console.log('Animation not loading')
					setShowError(true)
					setTimeout(()=>{
						setShowError(false)
					},3000)
					
					console.log('failed logging...')
					navigate('/login')
				}
				else{
					setShowNotEmail(true)
					setTimeout(()=>{
						setShowNotEmail(false);
					},3000)
				}
	}).catch(err=>'Error signing in '+console.log(err.message))
	
	}
	return(
		
		<div>
			
			{showSuccess  && <GoodLogin/>}
			{showError && <IncorrectPassword/>}
			{showNotEmail && <UserNotExists/>}
			{console.log('Success state '+showSuccess+'\n')}
			{console.log('Error state '+showError+'\n')}
			
			<div className="container">
			<h1 className='h1'>Login</h1>
								
				<form className='form' onSubmit={handleSubmit} >
					<div className='attr'>
						<label htmlFor="email" className="labels">Email</label>
						<input type="email" placeholder="abc@gmail.com" className='register-inputs' onChange={(e)=>setEmail(e.target.value)} required></input>
					</div>
					<div className='attr'>
						<label htmlFor="password" className="labels">Password</label>
						<input type="password" id='password-field' className='register-inputs' onChange={(e)=>setPassword(e.target.value)} required></input>
						

					
					</div>
				    <div className='login'>
						<button type="submit" className='login-button' onClick={handleSubmit}>
											Login
						</button>
					</div>
					<div className='attr'>
						<p>Dont have an account ?</p>
						<Link to="/register" className='link-btn' >signup
						</Link>
					</div>
					<p></p>
					<Link to="/login/forgot-password" className='forgot-password-btn'>Forgot password</Link>
				</form>
			</div>
			<div className='home-btn-div'>
			<Link to="/" className='home-btn' >HOME</Link>
			</div>
		</div>
	)
}


export function IncorrectPassword(){
	return(
		<div>
			<div className='incorrect-dialag' id='incorrect-dialag'>
				<p className='message'>INCORRECT PASSWORD</p>
				
			</div>
		</div>
	)
}

export function GoodLogin(){
	return(
		<div>
			<div className='good-login' id='goodLogin'>
				<p className='message'>You are logged in </p>
			</div>
		</div>
	)
}


export function UserNotExists(){
	return(
		<>
			<div className='user-not-exist'>
					<p className='message'>User Doesn't exist</p>
			</div>
		</>
	)
}
export default Login;
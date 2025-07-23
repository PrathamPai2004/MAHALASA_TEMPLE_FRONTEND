import React from "react"
import axios from "axios"

function UpdateCredentials(){
	const [name,setName] = setName()
	const [email,setEmail] = setEmail()
	const [existingPassword,setExistingPassword] = setExistingPassword()
	// const[confirmPassword,setConfirmPasssword] = setConfirmPasssword()
	let result = document.getElementById('result')
	const handleSubmit = (e)=>{
		e.preventDefault()
	
		console.log('Data receieved are '+email+name+existingPassword)

		axios.post('https://temple-project-server-3oc3.onrender.com/login',{name,email,existingPassword}).then
		(
			confirm=>{
				if(confirm.data==='valid'){
					result.innerText = "Valid"
				}
				else{
					result.innerText = "WRONG AUTHENTICATION"
				}
			}
		).catch((e)=>{
			result.innerText = e.message;
		})
	}
	return(
		<div>
			<h1>Welcome to repair your credentials</h1>
			<div className="container">
				<label>Name : </label>
				<input type="text" onChange={e=>setName(e.target.value)}></input>
				<label>email : </label>
				<input type="email" onChange={e=>setEmail(e.target.value)}></input>
				{/* <label>Current password </label> */}
				<label>Enter the existing password : </label>
				<input type="text"  onChange={e=>setExistingPassword(e.target.value)}></input>
				<button type="submit" >Submit</button>
			</div>
			<h1 id="result"></h1>
		</div>
	)
}


export default UpdateCredentials
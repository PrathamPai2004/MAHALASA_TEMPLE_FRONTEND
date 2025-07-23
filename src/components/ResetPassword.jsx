function ResetPassword(){



	const [password,setPassword] = setPassword()
	return(
	<>
		<h1>
			Reset Password
		</h1>
		<form onSubmit={handleSubmit}>
			<input type="text" onChange={e=>setPassword(e.target.value)}/>ENTER NEW PASSWORD
			<button type="submit"></button>
		</form>
	</>

	)
}
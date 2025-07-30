import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  
 const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);


    try{
      const response = await axios.post('https://mahalasa-temple-backend.onrender.com/admin-login',{username,password});
        if (response.data.message === "success") {
        localStorage.setItem("isLoggedIn", "true");
        navigate(`dashboard/${response.data.username}`);
  }

      // navigate(`dashboard/${response.data.username}`);
    }

    catch(error){
      console.log("Admin login error : "+error.message)
    }
    // Add your login logic here
  };

  return (
    <>
      <h2 style={{textAlign:"center"}}>Admin  Page of Mahalasa</h2>
      <p>Please login your username as "abc" and Passsword "abc" as the site is under Demo</p>
    <div style={{ maxWidth: "1000px",width:"40vw", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username">Username</label><br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  </>
  );
}

export default LoginPage;

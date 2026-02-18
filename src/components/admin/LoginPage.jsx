import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import '../../styles/adminLogin.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dashboard,setDashboard]=useState(false);
  const [message,setMessage] = useState("");
  
 const navigate = useNavigate();
 
 const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    try{
      const res = await axios.post('https://mahalasa-temple-backend.onrender.com/admin-login',{username,password});
      console.log(res.data.message)
      if(res.data.message === "success"){
        localStorage.setItem("isLoggedIn", "true");
        setDashboard(true);
        // navigate(`/admin/dashboard/${res.data.username}`);
      }
      if(res.data.status === 401){
        console.log(res.data.message)
        setMessage("Invalid Password");
      }
      else{
        setMessage("Invalid Credentials");
      }
    }
    catch(error){
      console.log("Admin login error : "+error.message)
      setMessage("An error occurred. Please try again.");
    }
 }
  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   console.log("Username:", username);
  //   console.log("Password:", password);
    

  //   try{
  //     const response = await axios.post('https://mahalasa-temple-backend.onrender.com/admin-login',{username,password});
  //       if (response.data.message === "success") {
  //       localStorage.setItem("isLoggedIn", "true");
  //       navigate(`dashboard/${response.data.username}`);
  // }

  //     // navigate(`dashboard/${response.data.username}`);
  //   }

  //   catch(error){
  //     console.log("Admin login error : "+error.message)
  //   }
  //   // Add your login logic here
  // };

  if(dashboard){
    return <Dashboard/>
  }
  return (
    <>
      <h2 style={{textAlign:"center"}} className="login-title">Admin  Page of Mahalasa</h2>
      <p className="login-subtitle">Please login your username as "admin" and Passsword "admin123" as the site is under Demo</p>
    <div className="login-container">
      
      {message && <p style={{ color: "red", textAlign: "center"}} className="error-message">{message}</p>}
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
        <button type="submit" style={{ width: "100%", padding: "10px" }} className="login-btn">
          Login
        </button>
      </form>
    </div>
  </>
  );
}

export default LoginPage;

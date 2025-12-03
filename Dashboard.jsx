import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import SevaChart from "./SevaChart";
import SevaPieChart from "./SevaPieChart";
import '/src/styles/dashboard.css'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Dashboard(){
	const { username } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
      alert("Access denied. Please login first.");
      navigate("/"); // go back to login
    }
  }, []);
	return(
		<>		
			<div className="dashboard-container">
				<h1>ADMIN DASHBOARD</h1>
				<SevaChart/>
				<SevaPieChart/>
			</div>
		
		</>
	)
}


export default Dashboard;
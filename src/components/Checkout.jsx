import { useEffect, useState } from "react";
import axios from 'axios'
import '../styles/checkout.css'
import { useNavigate } from "react-router-dom";
import Confirm from '../components/Confirm'; // <- Correct import

function Checkout() {
	const navigate = useNavigate();
	const [seva_name, setSevaName] = useState("");
	const [confirmPop, setConfirmPop] = useState(false);
	const [count, setCount] = useState(0);
	const [seva_amount, setSevaAmount] = useState(0);
	const [userName, setUserName] = useState('');
	const totalAmount = seva_amount * count;
	let [phoneNum, setPhoneNum] = useState('');
	localStorage.setItem('totalAmount',totalAmount)
	localStorage.setItem('confirmed_seva_name',seva_name)
	localStorage.setItem('userName',userName)
	localStorage.setItem('qty',count);




	useEffect(() => {
		const savedSevaName = localStorage.getItem('seva_name')
		const savedSevaAmount = localStorage.getItem('seva_amount')

		setSevaName(savedSevaName || "No selection")
		setSevaAmount(savedSevaAmount || 0)
	}, [])

	const checkPhone = () => {
		if(phoneNum.length>12 || phoneNum.length<10){
			// salert("inavlid phone number")
			return true

		}
		else
		return true

	}

	function handleSubmit() {
		// e.preventDefault();
		console.log("Inside client handling submit")
		if (checkPhone()) {
			if (totalAmount > 0) {
				axios.post('https://mahalasa-temple-backend.onrender.com/confirm-seva', { seva_name, totalAmount, userName, phoneNum ,count})
					.then((result) => {
						if (result.data.status === 'success') {
							const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

						const formattedTime = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().slice(-2)} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

							console.log(formattedTime);

							localStorage.setItem('formattedTime',formattedTime)
							console.log('Seva booked: ', result);
							setTimeout(() => {
								navigate('/sevas/download-receipt')
								// navigate('/sevas');
							}, 3000);
						}
					}).catch((err) => {
						console.log('Error occurred in database: ' + err.message);
					})
			} else {
				alert("Please select quantity for booking.");
			}
		} else {
			console.log("phone number is invalid")
			alert("Phone number is invalid.");
		}
	}

	const handleGoBack = () => {
		setConfirmPop(false); // Hide confirm, show Book button
	}

	return (
		<div className="body">
			{confirmPop && 
				<Confirm 
					handleSubmit={handleSubmit}
					goBack={handleGoBack} 
					phoneNum={phoneNum} 
					setPhoneNum={setPhoneNum}
					userName={userName}
					setUserName={setUserName}
				/>
			}

			<h1 className="h" style={{textAlign:"center"}}>YOU HAVE SELECTED</h1>

			<div className="checkout-container" id="checkout-container">
				<h2>Seva name: {seva_name}</h2>
				<h2>Seva amount: {totalAmount}</h2>

				<div className="qty">
					<button type="button" onClick={() => setCount(Math.max(0, count - 1))} className="qty-btn">-</button>
					<p>{count}</p>
					<button type="button" onClick={() => setCount(Math.min(10, count + 1))} className="qty-btn">+</button>
				</div>

				<p className="select-text">Select Quantity [max-10]</p>

				{/* Show BOOK button ONLY when Confirm popup is not shown */}
				{(totalAmount >0 && !confirmPop) && (
					<button type="button" onClick={() => setConfirmPop(true)} id="book-btn">BOOK</button>
				)}
			</div>
		</div>
	)
}

export default Checkout;

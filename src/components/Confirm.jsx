import { useState } from "react"
import '../styles/DormBooking.css'
import ValidOtp from "./OtpSuccess"
import Invoice from "./Invoice"
export function Confirm({ handleSubmit, goBack, phoneNum, setPhoneNum, userName, setUserName }) {



	const [isInvalidOtp,setInvalidOtp] = useState(false)
	const [isOtpVerified, setOtpVerified] = useState(false);
	
	
	function InavlidOtp(){
		return(
			<div className="invalid-otp">
				{console.log('Inavlid OTP pop up renderred')}
				<p>
					Invalid OTP
				</p>
			</div>
		)
	}

	
  	const [otp, setOtp] = useState('');
  	const [status, setStatus] = useState('');
	const [isOTPsent,setOTPsent] = useState(false)
	const [phn,setPhn] = useState('')
	const [recString,setRecString] = useState("MHLS-");
	localStorage.setItem('phn',phn);
	localStorage.setItem('recString',recString);

	// Send OTP to the phone number
	const sendOTP = async () => {
		try {
		  const response = await fetch('https://mahalasa-temple-backend.onrender.com/send-otp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phoneNum})
		  });
		  


		//   console.log(response)
		 const data =  await response.json();
		 const message = data.message
		 const success = data.success
		 setPhn(phoneNum);
		 console.log('Phone number is '+phn);

		 success && setOTPsent(true)
		
		// (success===false) && ( document.getElementById('otp-div').style.visibility = 'hidden')
		  setStatus(data.message);
		} catch (error) {
		  setStatus('Error sending OTP');
		}
		
	  };
	
	  // Verify the entered OTP
	  const verifyOTP = async () => {
		try {
		
		  const response = await fetch('https://mahalasa-temple-backend.onrender.com/verify-otp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ phoneNum, otp })
		  });
		  const randomStr = Math.random().toString(36).substring(2, 7).toLocaleUpperCase();
		  console.log(randomStr);


		  const data = await response.json();
		  console.log(data)
		  setStatus(data.message);
		  console.log("handling the submit...")
		  if(data.success){
			  setRecString(recString+randomStr);
			  setPhn(phoneNum);
			  

			  console.log('SEVA BOOKED SUCCESSFULLY ...OTP PASSED')
			  console.log("Going to execute OTP success pop up")
			  setOtpVerified(!isOtpVerified)
			 
				handleSubmit();
			
		  }
		  else{
			setTimeout(()=>{
				setInvalidOtp(!setInvalidOtp)
			},2000)
			setInvalidOtp(!isInvalidOtp)
			setStatus("Invalid OTP, Please try again")
		  }
		  
		} catch (error) {
			alert('wrong otp..');
		console.log('Wrong otp entered')
		  setStatus('Error verifying OTP');
		}
	  };


	return (
		<>
			{isOtpVerified && <ValidOtp/>}
			<div className="confirm-container" id="confirm-container">
			{/* {isOTPsent && (document.getElementById('otp-div').style.visibility = 'visible')} */}

			{isInvalidOtp && <InavlidOtp/>}
			<label className="confirm-labels">Enter your name:</label>
			<input 
				type="text" 
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
				className="confirm-inputs"
			/>
			<label className="confirm-labels" >Enter your phone number:</label>
			<input 
				type="text" 
				value={phoneNum}
				onChange={(e) => setPhoneNum(e.target.value)}
				className="confirm-inputs"
			/>
			<button onClick={sendOTP} id="confirm-btns">Send OTP</button>
			
			{

			    isOTPsent &&(
				<div id="otp-div">
					<p>Kindly Check whatsapp for the OTP by the business name DCCODER</p>
			<input 
				type="text" 
				placeholder="Enter the OTP here.."
				value={otp}
				onChange={(e) => setOtp(e.target.value)
				}
				id="otp-input"
			/>
			<button onClick={verifyOTP} id="otp-verify-btn" >Verify the OTP</button>
			</div>)
	}
			{/* <p>Confirm the checkout?</p> */}

			{/* //<button onClick={handleSubmit}>Yes</button> */}
			<button onClick={goBack} id="confirm-btns">No</button>
		</div>
		</>
	)
}
export default Confirm

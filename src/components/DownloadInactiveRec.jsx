import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/Sevas.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect } from 'react';
import axios from 'axios';

function DownloadRec(){

	const totalAmount = localStorage.getItem('totalAmount')
	const userName = localStorage.getItem('userName')
	const confirmed_seva_name = localStorage.getItem('confirmed_seva_name')
	// const DateObj = new Date();
	const isoDate = new Date().toISOString().split('T')[0];
	// console.log(isoDate); // e.g., "2025-05-05"
	const date = new Date();
	// const [searchParams] = useParams();
	// const navigate = useNavigate();

	// const token = searchParams.get("token");




	const timeInIndia = new Intl.DateTimeFormat('en-US', {
	timeZone: 'Asia/Kolkata',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hour12: false,
	}).format(date);

	console.log(timeInIndia); // e.g., "18:47:30"


	// useEffect(()=>{
	// 	if(!token){
	// 		alert("Missing token ...Redirecting")
	// 		console.log("Missing token ...")
	// 		navigate("/sevas")

	// 		return;
	// 	}
		
	// 	axios.get("https://temple-project-server-3oc3.onrender.com/download-receipt",{params : {token} }).then(res)


	// })


	const handleDownloadPDF = async () => {
	  const element = await document.getElementById('download-container'); // ID of the content to export
	  if (!element) {
		alert('Content not found!');
		return;
	  }
  
	  const canvas = await html2canvas(element, {
		scale: 2, // Better resolution
		useCORS: true // Allows external images if needed
	  });
  
	  const imgData = canvas.toDataURL('image/png');
	  const pdf = new jsPDF('p', 'mm', 'a4');
  
	  const pageWidth = pdf.internal.pageSize.getWidth();
	  const pageHeight = pdf.internal.pageSize.getHeight();
  
	  const imgProps = {
		width: canvas.width,
		height: canvas.height
	  };
  
	  const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
	  const pdfWidth = imgProps.width * ratio;
	  const pdfHeight = imgProps.height * ratio;
  
	  pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
	  pdf.save(`sevaBooked${isoDate}.pdf`);
	};
  
	

	return(

		<>
			<div className="download-container" id='download-container'>
			<h1 className='download-heading'>Receipt</h1>
			<p>Name : {userName}</p>
			<p>Seva : {confirmed_seva_name}</p>
			<p>Amount : {totalAmount}</p>
			<p>Date Booked : Date : {isoDate+"\n"} Time : {timeInIndia} </p>
			</div>
			<p>Take the following print to the Temple Office and Complete the payment</p>
			<button  onClick={handleDownloadPDF}>Download as PDF</button>
			<div className='download-links'>
			<Link to='/sevas/checkout'>CHECKOUT</Link>
			<Link to='/sevas'>Return to Sevas</Link>
			</div>
		</>
	)
}

export default DownloadRec
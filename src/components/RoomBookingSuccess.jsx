import '../styles/Dormview.css'



function RoomBookingSuccess({roomNum,holderName,dorm}){

	const count_p = document.getElementById('count-p')
	const holder_name = localStorage.getItem('holder_name')
	
	function countDown(){
		let i = 10
		for (let i = 0; i < 10; i++) {
			count_p.innerText = `This page expires in ${i} seconds`
			setTimeout(()=>{
				i=i-1
			},1000)
			
		}
	}
	return(
	<div className="room-booking-success">
		<h1>Room {roomNum} Booked Successfully</h1>
		<p>
			{console.log('Holder name : '+holderName)}
			Holder Name : {holder_name}
		</p>
		<p>
			Dormitory : {dorm}
		</p>
			{countDown}
		<p id='count-p'>
		</p>
		

	</div>
	)
}


export default RoomBookingSuccess
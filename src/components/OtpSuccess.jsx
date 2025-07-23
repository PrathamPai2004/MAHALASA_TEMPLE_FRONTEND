import '../styles/DormBooking.css'
function ValidOtp(){
		return(
			
			<div className="valid-otp" id='valid-otp'>
				{console.log('Inavlid OTP pop up renderred')}
				<div className='top-drawer'></div>
				<div className='text-drawer'>
					<p>
						OTP VERIFIED SUCCESSFULLY
					</p>
				</div>
				
				<div className='bottom-drawer'></div>
				{/* <p className='hold-on-text'>
					...Hold on...
				</p> */}
			</div>
		)
	}
export default ValidOtp;
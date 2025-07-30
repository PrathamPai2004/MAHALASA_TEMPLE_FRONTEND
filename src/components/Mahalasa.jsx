import { useEffect } from 'react';
import '../styles/Mahalasa.css'
import Navbar from './Navbar'

function Mahalasa(){

	useEffect(()=>{
	window.addEventListener('DOMContentLoaded', () => {
  	const heading = document.getElementById("mahalasa-heading");
  	const container = document.querySelector(".mahalasa-container");

  	heading.addEventListener("mouseenter", () => {
    	container.style.background = "aliceblue";
  	});

  heading.addEventListener("mouseleave", () => {
    container.style.background = "black";
  });
	});
},[]);
	return(
		<div className='mahalasa-page'>
			<div className='mahalasa-opening-screen'>
				<div className='left-container'>
					<div className='layer1'></div>
					<div className='layer1'></div>
					<div className='layer1'></div>
					<div className='layer1'></div>
				</div>
				<div className='opening-mahalasa-saunsthan-text'>
					<p>OPENING MAHALASA SAUNTHAN</p>
				</div>
				<div className='right-container'>
					<div className='layer2'>M</div>
					<div className='layer2'></div>
					<div className='layer2'></div>
					<div className='layer2'></div>
				</div>
				
			</div>
			<div className='overlay'></div>
			<div className="mahalasa-container">

{/* 				<div className='mahalasa-video'>
					<video width="640" height="360"  autoPlay muted loop className='mahalasa-video-box'>
						<source src="/assets/mahalasa_temple_cinematic_video_portrait.mp4" type="video/mp4" />
					Your browser does not support the video tag.
					</video>

					{/* <video width="640" height="360"  autoPlay muted loop className='mahalasa-video-box' id='mahalasa-video-box2'>
						<source src="/assets/mahalasa_temple_cinematic_video_portrait.mp4" type="video/mp4" />
					Your browser does not support the video tag.
					</video> */}

{/* 					<video width="640" height="360"  autoPlay muted loop className='mahalasa-video-box'>
						<source src="/assets/mahalasa_temple_cinematic_video_portrait.mp4" type="video/mp4" />
					Your browser does not support the video tag.
					</video>
				</div> */ */}
				<h1 id='mahalasa-heading'>|| MAHALASA SAUNSTHAN MARDOL ||</h1>	
				{/* <h1 id='mahalasa-heading'>|| MAHALASA </h1>
				<h1 id='saunsthan-heading'>SAUNSTHAN</h1>
				<h1 id='kumta-heading'>KUMTA ||</h1> */}

				
			</div>
			<Navbar/>
			{/* <div className='mahalasa-main'>
			<p>This is content below the hero section. Scroll to see sticky navbar.</p>
			</div> */}
		</div>
	)
}

export default Mahalasa

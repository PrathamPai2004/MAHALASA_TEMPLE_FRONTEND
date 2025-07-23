import { useEffect, useRef } from 'react';
import '../styles/contacts.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Contacts() {
  const cardRefs = useRef([]);

  const personNames = ["Pratham Pai","Veena Kamat", "Vinayak Pai", "Arya Saokar", "Kartik Shukla", "Madhav Kamat"
	,"Preetam Bhat", "K A Bhat"
  ]
  const designations = ["Developer","Chairman","Temple Coordinator","Seva Admin","Discipline Head","Database adminstrator","Priest","Manager"]


  const imageUrl = ["/assets/indian_priest.jpg",
	"/assets/aayi_montage_cropped.jpg",
	"/assets/semi_traditional_female.jpg",
	"/assets/arya_child_cropped.jpg",
	"/assets/indian_priest.jpg",
	"/assets/kurta_female.jpg",
	"/assets/indian_priest.jpg",
	"/assets/side_indian_male_portrait.jpg"
	]
  useEffect(() => {
    const cards = cardRefs.current;

    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) /10;
        const rotateY = (x - centerX) /10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const handleMouseLeave = () => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
	<>
	<div className='reveal-container'>
		<div className='upper-box'>
			<h1 className='meet-the'>MEET THE </h1>
		</div>
		<div className='lower-box'>
			<h1 className='crew'>SAUNSTHAN COMMITTEE</h1>
		</div>
	</div>
	
	<p className='hover-notice-text'>Hover on to reveal the Saunthan Committee</p>
	    <div className="contact-container">
      {[0, 1, 2, 3,4,5,6,7].map((_, index) => (
        <div
          key={index}
          className="person"
          ref={(el) => (cardRefs.current[index] = el)}
        >
			<h3 className='person-text'>{personNames[index]}</h3>
			<p className='designation-text'>{designations[index]}</p>
			 <img
            src={imageUrl[index]}
            alt="image rendered"
            className="person-img"
          />
		</div>
      ))}
    </div>
   <Link className='contact-go-back-link' to='/'>Go back</Link>
	</>

  );
}

export default Contacts;

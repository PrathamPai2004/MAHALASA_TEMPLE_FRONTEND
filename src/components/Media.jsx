import React, { useEffect, useRef, useState } from 'react';
import '../styles/media.css';

function Media() {
  const observerRef = useRef(null);
  const dayRefs = useRef([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.day-card').forEach(card => {
      observerRef.current.observe(card);
    });
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const longDescriptions = [
    "Maha Shivaratri is celebrated with great devotion to honor Lord Shiva. Devotees observe night-long vigils, chant mantras, and perform abhishekam with milk, honey, and sacred water. Temples remain open all night, offering a spiritually charged environment filled with prayers and meditation to seek blessings and inner peace from the divine force of transformation.",
    "Rama Navami marks the birth of Lord Rama, the embodiment of dharma. Devotees gather in temples to recite Ramayana verses, participate in processions, and offer prayers. Many observe fasts and engage in bhajans throughout the day, reflecting on Lord Rama’s virtuous life and teachings that guide righteousness and moral integrity in everyday living.",
    "Krishna Janmashtami celebrates the birth of Lord Krishna, known for his divine playfulness and wisdom. Temples are adorned with lights and flowers, while devotees perform midnight aartis and enact Krishna’s life episodes. Fasting, singing bhajans, and breaking the Dahi Handi symbolize joy, devotion, and the spirit of selfless love taught by Krishna’s life.",
    "Navaratri is a vibrant nine-night festival dedicated to the worship of Goddess Durga in her various forms. Each day celebrates a different avatar, accompanied by devotional songs, dances like Garba and Dandiya, and cultural events. Devotees fast, perform rituals, and gather for spiritual upliftment, seeking the divine feminine energy to overcome negativity and attain strength.",
    "Hanuman Jayanti honors the birth of Lord Hanuman, symbolizing strength, devotion, and courage. Devotees chant Hanuman Chalisa, offer sweets, and participate in temple processions. The day is considered auspicious for gaining strength and warding off evil. Temples conduct special pujas and discourses on Hanuman’s service to Lord Rama and his unwavering bhakti.",
    "Vaikunta Ekadashi is one of the most sacred days in Vaishnavism, believed to open the heavenly gates of Vaikunta. Devotees observe fasts, attend early morning darshan, and pass through the Vaikunta Dwaram in temples. It is a day for spiritual reflection, chanting Vishnu’s names, and seeking liberation from the cycle of birth and death.",
    "Kartika Deepam is celebrated by lighting countless oil lamps in and around temples, symbolizing the triumph of light over darkness. Dedicated primarily to Lord Shiva and Lord Murugan, this festival is known for its spectacular hilltop beacons. Devotees bathe in holy rivers, observe fasts, and light lamps in their homes and temples as acts of devotion.",
    "Radhashtami commemorates the appearance of Goddess Radha, the divine consort of Lord Krishna. Temples conduct special pujas, kirtans, and spiritual discourses on Radha's pure love and devotion. Devotees observe fasts and offer sweets and flowers, remembering Radha as the embodiment of selfless love and devotion in the bhakti tradition."
  ];

  const culturalFestHeadings = [
    "Maha Shivaratri",
    "Rama Navami",
    "Krishna Janmashtami",
    "Navaratri",
    "Hanuman Jayanti",
    "Vaikunta Ekadashi",
    "Kartika Deepam",
    "Radhashtami"
  ];

  const overlayImages = [
    ["/images/bird.jpeg", "/images/bird2.jpeg"],
    ["/images/bird.jpeg", "/images/bird2.jpeg"],
    ["/images/bird.jpeg", "/images/bird2.jpeg"],
    ["/images/bird.jpeg", "/images/bird2.jpeg"],
    ["/images/bird.jpeg", "/images/bird2.jpeg"],
    ["/images/bird.jpeg", "/images/bird2.jpeg"],
    ["/images/bird.jpeg", "/images/bird2.jpeg"],
    ["/images/bird.jpeg", "/images/bird2.jpeg"]
  ];

  // Example gallery images for each fest (replace with your actual images)
  const galleryImages = [
    Array.from({length: 20}, (_, i) => `/images/shivaratri${i+1}.jpg`),
    Array.from({length: 20}, (_, i) => `/images/ramnavami${i+1}.jpg`),
    Array.from({length: 20}, (_, i) => `/images/janmashtami${i+1}.jpg`),
    Array.from({length: 20}, (_, i) => `/images/navaratri${i+1}.jpg`),
    Array.from({length: 20}, (_, i) => `/images/hanuman${i+1}.jpg`),
    Array.from({length: 20}, (_, i) => `/images/vaikunta${i+1}.jpg`),
    Array.from({length: 20}, (_, i) => `/images/kartika${i+1}.jpg`),
    Array.from({length: 20}, (_, i) => `/images/radhashtami${i+1}.jpg`)
  ];

  const handleDayClick = (idx) => {
    if (dayRefs.current[idx]) {
      dayRefs.current[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const [overlayIndexes, setOverlayIndexes] = useState(Array(8).fill(0));
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedFest, setSelectedFest] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setOverlayIndexes(prev => prev.map((idx, i) => (idx + 1) % 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`media-bg-wrapper${galleryOpen ? ' gallery-open' : ''}`}>
      <div className="mahalasa-bg-text">
        {Array.from({length: 40}).map((_, i) => (
          <React.Fragment key={i}>
            <span>जय महालसा&nbsp;</span>
            <span>जय महालसा&nbsp;</span>
          </React.Fragment>
        ))}
      </div>
      <div className="media-container">
        <h1 className='media-heading'>MAHALASA - MEDIA</h1>
        <div className="scroller">
          <ul className="tag-list">
            {[...Array(8)].map((_, idx) => (
              <li key={idx} onClick={() => handleDayClick(idx)} style={{ cursor: 'pointer' }}>{culturalFestHeadings[idx]}</li>
            ))}
          </ul>
        </div>
        <div className="days-container">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              id='days-container'
              className={`day-card ${index % 2 === 0 ? 'right' : 'left'}`}
              ref={el => dayRefs.current[index] = el}
            >
              <div className="day-content" id='day-content'>
                <h2>{culturalFestHeadings[index].toLocaleUpperCase()}</h2>
                <p>{longDescriptions[index]}</p>
              </div>
              <div className="day-overlay">
                <h1>{culturalFestHeadings[index]}</h1>
                <div
                  className="rotating-bg"
                  style={{ backgroundImage: `url('${overlayImages[index][overlayIndexes[index]]}')` }}
                ></div>
                <button
                  className="more-details-btn"
                  onClick={() => { setGalleryOpen(true); setSelectedFest(index); }}
                >
                  View {culturalFestHeadings[index]} photos
                </button>
              </div>
            </div>
          ))}
        </div>
        {galleryOpen && selectedFest !== null && (
          <div className="gallery-modal">
            <button className="close-gallery" onClick={() => setGalleryOpen(false)}>Close</button>
            <div className="gallery-photos">
              {galleryImages[selectedFest].map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Media;

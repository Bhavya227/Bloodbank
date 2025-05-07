import { useState, useEffect } from 'react';

const HeroImage = () => {
  // Sample blood donation images - you can replace these URLs with your own images
  const imageUrls = [
    'https://www.shutterstock.com/image-photo/blood-donation-transfusion-concept-donor-600nw-1451339212.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9VgaO7DZ2mPrHZ9HS4MsrL7UI4nQQDllG3Q&s',
    'https://thumbs.dreamstime.com/b/blood-donation-volunteer-donor-banner-background-donating-campaign-concept-healthy-elements-transfusion-bottle-214091301.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Optional: Add image rotation for a slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <img
        src={imageUrls[currentImageIndex]}
        alt="Blood Donation"
        className="w-full h-full object-cover transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-transparent flex flex-col justify-center p-8">
        <h2 className="text-white text-4xl font-bold mb-4">Donate Blood, Save Lives</h2>
        <p className="text-white text-xl max-w-md">Your donation can make a difference in Gujarat's healthcare system.</p>
      </div>
    </div>
  );
};

export default HeroImage; 
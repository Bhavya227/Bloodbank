import { useState } from 'react';

const ImageGallery = () => {
  // Sample gallery images - replace these with your own images
  const galleryImages = [
    {
      id: 1,
      src: 'https://thumbs.dreamstime.com/b/blood-donation-volunteer-donor-making-transfusion-hospital-world-day-male-character-sitting-armchair-doctor-nurse-woman-taking-288446667.jpg',
      alt: 'Blood Donation Camp',
      caption: 'Blood Donation Camp in Ahmedabad'
    },
    {
      id: 2,
      src: 'https://t3.ftcdn.net/jpg/03/27/38/60/360_F_327386020_ntrM6FWOUgmoOVL9daBVNGizG9QLOFfZ.jpg',
      alt: 'Volunteers',
      caption: 'Our dedicated volunteers at Rajkot Blood Bank'
    },
    {
      id: 3,
      src: 'https://t4.ftcdn.net/jpg/02/68/70/57/360_F_268705782_x4DAm9Nd7IF1a2AsvTObP67gBnlwk3Qv.jpg',
      alt: 'Awareness Campaign',
      caption: 'Blood Donation Awareness Program in Vadodara'
    },
    {
      id: 4,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQ8F45PEQyfajbgLEXh0GQnMctKQnz9QDDQ&s',
      alt: 'Mobile Blood Collection',
      caption: 'Our mobile blood collection van in Surat'
    },
    {
      id: 5,
      src: 'https://www.shutterstock.com/image-photo/hands-people-diverse-blood-donation-600nw-1873488445.jpg',
      alt: 'Community Effort',
      caption: 'Community blood donation initiative in Bhavnagar'
    },
    {
      id: 6,
      src: 'https://png.pngtree.com/background/20230614/original/pngtree-blood-donation-charity-and-volunteers-with-a-red-heart-on-their-picture-image_3639530.jpg',
      alt: 'Donation Awareness',
      caption: 'Blood donation awareness campaign at local colleges'
    }
  ];

  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Blood Donation Events</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div 
            key={image.id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => openLightbox(image)}
          >
            <div className="relative h-64">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white font-medium text-sm">{image.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div className="max-w-4xl max-h-screen">
            <img 
              src={lightboxImage.src} 
              alt={lightboxImage.alt}
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-lg">{lightboxImage.caption}</p>
            <button 
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeLightbox}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery; 
import { Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-primary">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            About Gujarat Blood Bank
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Connecting donors and receivers across Gujarat to ensure blood is available for those in need.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <img 
                src="/mission.jpg" 
                alt="Our Mission"
                className="rounded-lg shadow-lg w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.imgur.com/K9Nph0f.jpg";
                }}
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                Our mission is to bridge the gap between blood donors and patients in need across Gujarat. 
                We strive to maintain an adequate supply of all blood types and ensure their timely 
                availability during medical emergencies.
              </p>
              <p className="text-gray-600 mb-6">
                Gujarat Blood Bank was established in 2010 with a vision to create a robust blood donation 
                ecosystem in Gujarat. Since then, we've successfully facilitated thousands of donations, 
                saving countless lives across the state.
              </p>
              <Link to="/register" className="btn-primary inline-block">
                Join Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Benefits of Blood Donation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">For Donors</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free health check-up during donation
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Reduced risk of heart diseases
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Stimulates blood cell production
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Burns calories
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Satisfaction of saving lives
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">For Hospitals</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Quick access to verified blood supply
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Network of ready donors
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Digital inventory management
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Emergency alerts for rare blood types
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Easier coordination for surgeries
                </li>
              </ul>
            </div>

            <div className="card">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">For Gujarat</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Enhanced healthcare infrastructure
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Reduced mortality during emergencies
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Promotion of voluntary donations
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Community health awareness
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Support during natural disasters
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Gallery
          </h2>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Take a look at our blood donation camps and events organized across Gujarat. 
            These images showcase our community's commitment to saving lives.
          </p>
          
          <ImageGallery />
        </div>
      </section>

      {/* Gujarat Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Serving Across Gujarat</h2>
              <p className="text-gray-600 mb-6">
                Our network spans the entire state of Gujarat, with collection centers and partnerships 
                with major hospitals in key cities including Ahmedabad, Surat, Vadodara, Rajkot, and more.
              </p>
              <p className="text-gray-600 mb-6">
                We're proud to support Gujarat's healthcare system with a steady supply of safe, 
                screened blood components. Our central database ensures that the right blood type 
                reaches the right patient at the right time.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Our Locations:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Ahmedabad
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Surat
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Vadodara
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Rajkot
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Gandhinagar
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Bhavnagar
                  </li>
                </ul>
              </div>
              <Link to="/contact" className="btn-primary inline-block">
                Find Nearest Center
              </Link>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white p-4 rounded-lg shadow-md relative">
                <img 
                  src="/gujarat-map.png" 
                  alt="Gujarat Map" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://i.imgur.com/2Qftcta.png";
                  }}
                />
                {/* Blood Bank Location Markers */}
                <div className="absolute" style={{ top: '40%', left: '33%' }}>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="absolute text-xs font-bold bg-white px-1 rounded shadow-sm" style={{ top: '-18px', left: '5px' }}>Ahmedabad</span>
                </div>
                <div className="absolute" style={{ top: '65%', left: '25%' }}>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="absolute text-xs font-bold bg-white px-1 rounded shadow-sm" style={{ top: '-18px', left: '5px' }}>Surat</span>
                </div>
                <div className="absolute" style={{ top: '45%', left: '55%' }}>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="absolute text-xs font-bold bg-white px-1 rounded shadow-sm" style={{ top: '-18px', left: '5px' }}>Vadodara</span>
                </div>
                <div className="absolute" style={{ top: '45%', left: '5%' }}>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="absolute text-xs font-bold bg-white px-1 rounded shadow-sm" style={{ top: '-18px', left: '5px' }}>Rajkot</span>
                </div>
                <div className="absolute" style={{ bottom: '30%', left: '10%' }}>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="absolute text-xs font-bold bg-white px-1 rounded shadow-sm" style={{ top: '-18px', left: '5px' }}>Bhavnagar</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 italic text-center">
                Blood bank locations are approximate and for illustration purposes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our mission to ensure that everyone in Gujarat has access to life-saving blood when they need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-primary hover:bg-red-50 font-medium py-3 px-8 rounded-md transition-colors text-lg"
            >
              Become a Donor
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium py-3 px-8 rounded-md transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 
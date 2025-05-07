import { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const gujaratCities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 
    'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'All Cities'
  ];

  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const query = selectedCity && selectedCity !== 'All Cities' ? `?city=${selectedCity}` : '';
        const res = await axios.get(`/api/hospitals${query}`);
        setBloodBanks(res.data);
      } catch (err) {
        console.error('Error fetching blood banks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodBanks();
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real application, you would send this data to your backend
    console.log('Form data submitted:', formData);
    
    // Clear form and show success message
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    
    setFormSubmitted(true);
    
    // Reset form submitted status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-primary">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            Find blood banks near you or reach out to us with your questions.
          </p>
        </div>
      </div>

      {/* Blood Banks Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Blood Banks in Gujarat
          </h2>

          <div className="max-w-md mx-auto mb-8">
            <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by City
            </label>
            <select
              id="city-filter"
              value={selectedCity}
              onChange={handleCityChange}
              className="input-field w-full"
            >
              <option value="">All Cities</option>
              {gujaratCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bloodBanks.length > 0 ? (
                bloodBanks.map((bank) => (
                  <div key={bank._id} className="card">
                    <h3 className="text-xl font-semibold mb-2">{bank.name}</h3>
                    <p className="text-gray-500 mb-4">{bank.isHospital ? 'Hospital' : 'Blood Bank'}</p>
                    
                    <div className="mb-4">
                      <p className="text-gray-600 flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{bank.address}, {bank.city}</span>
                      </p>
                      <p className="text-gray-600 flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{bank.phone}</span>
                      </p>
                      {bank.email && (
                        <p className="text-gray-600 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{bank.email}</span>
                        </p>
                      )}
                    </div>

                    <a 
                      href={`https://www.google.com/maps?q=${bank.name}+${bank.address}+${bank.city}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary font-medium hover:text-primary-dark flex items-center"
                    >
                      <span>View on Map</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-600 text-lg">No blood banks found for the selected criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Get in Touch
            </h2>

            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                Thank you for your message! We will get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleFormChange}
                      className={`input-field ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className={`input-field ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className={`input-field ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleFormChange}
                      className={`input-field ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.message && <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>}
                  </div>
                </div>

                <div>
                  <button type="submit" className="btn-primary px-6 py-3">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Main Office
          </h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96">
              <iframe
                title="Gujarat Blood Bank Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.45747694071!2d72.43717348402657!3d23.02045828697652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848ab8a5be87%3A0x74346a183e94f0a!2sRed%20Cross%20Blood%20Bank!5e0!3m2!1sen!2sin!4v1615444330124!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Gujarat Blood Bank Headquarters</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Civil Hospital Campus, Asarwa, Ahmedabad, Gujarat 380016</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 79-26577621</span>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@gujaratbloodbank.org</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 
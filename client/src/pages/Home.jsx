import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroImage from '../components/HeroImage';

const Home = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonations: 0,
    inventory: []
  });
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        try {
          const [statsRes, requestsRes] = await Promise.all([
            axios.get('/api/donors/stats'),
            axios.get('/api/requests/urgent')
          ]);
          
          setStats(statsRes.data);
          setUrgentRequests(requestsRes.data);
        } catch (err) {
          console.warn('Backend unavailable, using mock data');
          // Mock data for demo purposes
          setStats({
            totalDonors: 350,
            totalDonations: 782,
            inventory: [
              { bloodGroup: 'A+', quantity: 42 },
              { bloodGroup: 'A-', quantity: 18 },
              { bloodGroup: 'B+', quantity: 35 },
              { bloodGroup: 'B-', quantity: 12 },
              { bloodGroup: 'AB+', quantity: 8 },
              { bloodGroup: 'AB-', quantity: 5 },
              { bloodGroup: 'O+', quantity: 55 },
              { bloodGroup: 'O-', quantity: 22 }
            ]
          });
          
          setUrgentRequests([
            { 
              _id: '1', 
              bloodGroup: 'O-', 
              quantity: 3, 
              hospital: 'Civil Hospital, Ahmedabad',
              city: 'Ahmedabad',
              createdAt: new Date() 
            },
            { 
              _id: '2', 
              bloodGroup: 'A+', 
              quantity: 2, 
              hospital: 'Sterling Hospital, Surat',
              city: 'Surat',
              createdAt: new Date() 
            },
            { 
              _id: '3', 
              bloodGroup: 'B+', 
              quantity: 1, 
              hospital: 'GMERS Medical College, Gandhinagar',
              city: 'Gandhinagar',
              createdAt: new Date() 
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Color mapping for blood groups
  const getInventoryColor = (quantity) => {
    if (quantity > 30) return 'bg-green-100 text-green-800';
    if (quantity > 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <HeroImage />
            </div>
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Donate Blood, Save Lives
              </h1>
              <p className="text-xl mb-8 text-gray-600">
                Join Gujarat's largest blood donation network. Your contribution can make a difference in someone's life.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="btn-primary text-center px-8 py-3 text-lg">
                  Register as Donor
                </Link>
                <Link to="/request" className="bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium py-3 px-8 rounded-md transition-colors text-lg text-center">
                  Request Blood
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Inventory Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-center">Blood Availability</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {stats.inventory.map((item) => (
                  <div key={item.bloodGroup} className="card text-center">
                    <div className={`inline-block px-4 py-2 rounded-full text-lg font-bold mb-2 ${getInventoryColor(item.quantity)}`}>
                      {item.bloodGroup}
                    </div>
                    <p className="text-3xl font-bold text-gray-700">{item.quantity}</p>
                    <p className="text-gray-500">Units Available</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="card">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Total Donors</h3>
                      <p className="text-3xl font-bold text-primary">{stats.totalDonors}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Join our community of lifesavers who have pledged to donate blood regularly.
                  </p>
                </div>

                <div className="card">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Total Donations</h3>
                      <p className="text-3xl font-bold text-primary">{stats.totalDonations}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Lives saved through the generous donations of our blood donors.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Urgent Requests */}
      {urgentRequests.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="section-title text-center">Urgent Blood Requests</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {urgentRequests.slice(0, 3).map((request) => (
                <div key={request._id} className="card border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold mb-2">
                        Urgent: {request.bloodGroup}
                      </span>
                      <h3 className="text-lg font-semibold">{request.hospital}</h3>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600">
                      <span className="font-semibold">Quantity:</span> {request.quantity} units
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">City:</span> {request.city}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link 
                      to="/login" 
                      className="btn-outline block text-center w-full"
                    >
                      Respond to Request
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {urgentRequests.length > 3 && (
              <div className="text-center mt-8">
                <Link 
                  to="/login" 
                  className="btn-outline inline-block"
                >
                  View All Requests
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Donate Blood */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="section-title text-center">Why Donate Blood?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Lives</h3>
              <p className="text-gray-600">
                One donation can save up to three lives. Your blood donation can be the difference between life and death.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Benefits</h3>
              <p className="text-gray-600">
                Donating blood reduces risk of heart disease and cancer. It also helps in maintaining good health.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-gray-600">
                By donating blood, you're supporting your community and helping maintain a stable blood supply for Gujarat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our mission to ensure that everyone in Gujarat has access to life-saving blood when they need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-white text-primary hover:bg-red-50 font-medium py-3 px-8 rounded-md transition-colors text-lg">
              Become a Donor
            </Link>
            <Link to="/about" className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium py-3 px-8 rounded-md transition-colors text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 
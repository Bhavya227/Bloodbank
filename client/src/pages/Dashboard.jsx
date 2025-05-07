import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import UserPhotos from '../components/UserPhotos';

const Dashboard = () => {
  const { user, token, hasRole } = useAuth();
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalDonations: 0,
    inventory: []
  });
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        try {
          // Fetch stats
          const statsRes = await axios.get('/api/donors/stats');
          setStats(statsRes.data);

          // Fetch user-specific data
          if (hasRole('donor')) {
            const donationsRes = await axios.get('/api/donors/donations', config);
            setDonations(donationsRes.data);
          } 
          
          if (hasRole('hospital')) {
            const requestsRes = await axios.get('/api/requests/me', config);
            setRequests(requestsRes.data);
          }

          if (hasRole('admin')) {
            const [donorsRes, requestsRes] = await Promise.all([
              axios.get('/api/users/donors', config),
              axios.get('/api/requests', config)
            ]);
            setDonations(donorsRes.data);
            setRequests(requestsRes.data);
          }
        } catch (error) {
          console.warn('Backend unavailable, using mock data');
          // Mock data for demo
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
          
          if (hasRole('donor')) {
            setDonations([
              { 
                _id: '1', 
                bloodGroup: 'O+', 
                quantity: 1, 
                location: 'Red Cross Blood Bank, Ahmedabad', 
                status: 'approved',
                donationDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
              },
              { 
                _id: '2', 
                bloodGroup: 'O+', 
                quantity: 1, 
                location: 'Civil Hospital, Ahmedabad', 
                status: 'pending',
                donationDate: new Date() 
              }
            ]);
          }
          
          if (hasRole('hospital')) {
            setRequests([
              { 
                _id: '1', 
                bloodGroup: 'A+', 
                quantity: 2, 
                urgency: 'normal',
                status: 'fulfilled',
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago 
              },
              { 
                _id: '2', 
                bloodGroup: 'O-', 
                quantity: 1, 
                urgency: 'urgent',
                status: 'pending',
                createdAt: new Date() 
              }
            ]);
          }
          
          if (hasRole('admin')) {
            setDonations([
              { 
                _id: '1', 
                bloodGroup: 'B+', 
                quantity: 1, 
                donor: 'Raj Patel',
                location: 'Red Cross Blood Bank, Surat', 
                status: 'approved',
                donationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
              },
              { 
                _id: '2', 
                bloodGroup: 'O+', 
                quantity: 1, 
                donor: 'Anjali Shah',
                location: 'Civil Hospital, Vadodara', 
                status: 'approved',
                donationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago 
              }
            ]);
            
            setRequests([
              { 
                _id: '1', 
                bloodGroup: 'AB-', 
                quantity: 1, 
                hospital: 'Sterling Hospital',
                urgency: 'critical',
                status: 'pending',
                createdAt: new Date() 
              },
              { 
                _id: '2', 
                bloodGroup: 'O+', 
                quantity: 3, 
                hospital: 'Civil Hospital',
                urgency: 'urgent',
                status: 'pending',
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
              }
            ]);
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, hasRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
              <p className="text-gray-600 mt-1">
                {hasRole('donor') && 'Donor Dashboard'}
                {hasRole('hospital') && 'Hospital Dashboard'}
                {hasRole('admin') && 'Admin Dashboard'}
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              {hasRole('donor') && (
                <Link to="/profile" className="btn-primary">
                  Update Profile
                </Link>
              )}
              {hasRole('hospital') && (
                <Link to="/request" className="btn-primary">
                  Request Blood
                </Link>
              )}
              {hasRole('admin') && (
                <Link to="/admin" className="btn-primary">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Donors</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalDonors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Donations</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalDonations}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Blood Units Available</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.inventory.reduce((total, item) => total + item.quantity, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  {hasRole('donor') ? 'Your Donations' : 'Active Requests'}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {hasRole('donor') ? donations.length : requests.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Inventory */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Blood Inventory</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.inventory.map((item) => {
              // Determine color based on quantity
              let bgColor = 'bg-green-100 text-green-800';
              if (item.quantity < 10) {
                bgColor = 'bg-red-100 text-red-800';
              } else if (item.quantity < 30) {
                bgColor = 'bg-yellow-100 text-yellow-800';
              }

              return (
                <div key={item.bloodGroup} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${bgColor}`}>
                    {item.bloodGroup}
                  </div>
                  <p className="text-2xl font-bold text-gray-700">{item.quantity}</p>
                  <p className="text-gray-500 text-sm">Units</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donor Section */}
        {hasRole('donor') && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Donation History</h2>
              
              {donations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Group
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donations.map((donation) => (
                        <tr key={donation._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(donation.donationDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {donation.bloodGroup}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.quantity} units
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${donation.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                donation.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}>
                              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600">You haven't made any donations yet.</p>
                  <Link to="/profile" className="mt-4 btn-primary inline-block">
                    Schedule a Donation
                  </Link>
                </div>
              )}
            </div>
            
            {/* User Photos Section */}
            <UserPhotos />
          </>
        )}

        {/* Hospital Section */}
        {hasRole('hospital') && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Your Blood Requests</h2>
              <Link to="/request" className="btn-primary">
                New Request
              </Link>
            </div>
            
            {requests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Urgency
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                      <tr key={request._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {request.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.quantity} units
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${request.urgency === 'critical' ? 'bg-red-100 text-red-800' : 
                              request.urgency === 'urgent' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-green-100 text-green-800'}`}>
                            {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${request.status === 'fulfilled' ? 'bg-green-100 text-green-800' : 
                              request.status === 'canceled' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-600">You haven't made any blood requests yet.</p>
                <Link to="/request" className="mt-4 btn-primary inline-block">
                  Request Blood
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Admin Section */}
        {hasRole('admin') && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Blood Requests</h2>
              
              {requests.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hospital
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Group
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Urgency
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests.slice(0, 5).map((request) => (
                        <tr key={request._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.hospital}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {request.bloodGroup}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.quantity} units
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${request.urgency === 'critical' ? 'bg-red-100 text-red-800' : 
                                request.urgency === 'urgent' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-green-100 text-green-800'}`}>
                              {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${request.status === 'fulfilled' ? 'bg-green-100 text-green-800' : 
                                request.status === 'canceled' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {requests.length > 5 && (
                    <div className="mt-4 text-right">
                      <Link to="/admin" className="text-primary font-medium hover:text-primary-dark">
                        View All Requests →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600">No blood requests yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
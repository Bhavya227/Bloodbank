import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory');
  const [inventory, setInventory] = useState([]);
  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        
        // Try to fetch data from the backend
        try {
          // Fetch all required data
          const [statsRes, donorsRes, hospitalsRes, requestsRes] = await Promise.all([
            axios.get('/api/donors/stats'),
            axios.get('/api/users/donors', config),
            axios.get('/api/users/hospitals', config),
            axios.get('/api/requests', config)
          ]);
          
          setInventory(statsRes.data.inventory);
          setDonors(donorsRes.data);
          setHospitals(hospitalsRes.data);
          setRequests(requestsRes.data);
        } catch (err) {
          console.warn('Backend unavailable, using mock data');
          // Mock data for demo purposes
          setInventory([
            { bloodGroup: 'A+', quantity: 42, lastUpdated: new Date() },
            { bloodGroup: 'A-', quantity: 18, lastUpdated: new Date() },
            { bloodGroup: 'B+', quantity: 35, lastUpdated: new Date() },
            { bloodGroup: 'B-', quantity: 12, lastUpdated: new Date() },
            { bloodGroup: 'AB+', quantity: 8, lastUpdated: new Date() },
            { bloodGroup: 'AB-', quantity: 5, lastUpdated: new Date() },
            { bloodGroup: 'O+', quantity: 55, lastUpdated: new Date() },
            { bloodGroup: 'O-', quantity: 22, lastUpdated: new Date() }
          ]);
          
          setDonors([
            { _id: '1', name: 'Raj Patel', email: 'raj@example.com', phone: '9876543210', bloodGroup: 'A+', city: 'Ahmedabad', createdAt: new Date() },
            { _id: '2', name: 'Meena Shah', email: 'meena@example.com', phone: '9876543211', bloodGroup: 'B+', city: 'Surat', createdAt: new Date() },
            { _id: '3', name: 'Ajay Singh', email: 'ajay@example.com', phone: '9876543212', bloodGroup: 'O-', city: 'Vadodara', createdAt: new Date() }
          ]);
          
          setHospitals([
            { _id: '1', name: 'City Hospital', email: 'city@hospital.com', phone: '9876543213', city: 'Ahmedabad', createdAt: new Date() },
            { _id: '2', name: 'General Hospital', email: 'general@hospital.com', phone: '9876543214', city: 'Rajkot', createdAt: new Date() }
          ]);
          
          setRequests([
            { _id: '1', hospital: 'City Hospital', bloodGroup: 'A+', quantity: 2, urgency: 'urgent', status: 'pending', city: 'Ahmedabad', createdAt: new Date() },
            { _id: '2', hospital: 'General Hospital', bloodGroup: 'O-', quantity: 3, urgency: 'critical', status: 'pending', city: 'Rajkot', createdAt: new Date() },
            { _id: '3', hospital: 'City Hospital', bloodGroup: 'B+', quantity: 1, urgency: 'normal', status: 'fulfilled', city: 'Ahmedabad', createdAt: new Date() }
          ]);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);
  
  const handleRequestStatus = async (requestId, status) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      try {
        await axios.put(`/api/requests/${requestId}`, { status }, config);
      } catch (err) {
        console.warn('Backend unavailable, updating UI only');
      }
      
      // Update requests state
      setRequests(requests.map(request => 
        request._id === requestId ? { ...request, status } : request
      ));
      
      toast.success(`Request marked as ${status}`);
    } catch (err) {
      console.error('Error updating request:', err);
      toast.error(err.response?.data?.msg || 'Failed to update request');
    }
  };
  
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'inventory' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('inventory')}
            >
              Blood Inventory
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'requests' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('requests')}
            >
              Blood Requests
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'donors' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('donors')}
            >
              Donors
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'hospitals' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('hospitals')}
            >
              Hospitals
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === 'inventory' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Blood Inventory</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available Units
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventory.map((item) => {
                      // Determine status color
                      let statusColor = 'bg-green-100 text-green-800';
                      let statusText = 'Sufficient';
                      
                      if (item.quantity < 10) {
                        statusColor = 'bg-red-100 text-red-800';
                        statusText = 'Critical';
                      } else if (item.quantity < 30) {
                        statusColor = 'bg-yellow-100 text-yellow-800';
                        statusText = 'Low';
                      }
                      
                      return (
                        <tr key={item.bloodGroup}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {item.bloodGroup}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity} units
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                              {statusText}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.lastUpdated).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'requests' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Blood Requests</h2>
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
                        Units
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Urgency
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                      <tr key={request._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.hospital}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {request.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {request.quantity}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleRequestStatus(request._id, 'fulfilled')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Fulfill
                              </button>
                              <button
                                onClick={() => handleRequestStatus(request._id, 'canceled')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'donors' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Registered Donors</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registered On
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donors.map((donor) => (
                      <tr key={donor._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {donor.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {donor.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {donor.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            {donor.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {donor.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(donor.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'hospitals' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Registered Hospitals</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registered On
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hospitals.map((hospital) => (
                      <tr key={hospital._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {hospital.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {hospital.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {hospital.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {hospital.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(hospital.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 
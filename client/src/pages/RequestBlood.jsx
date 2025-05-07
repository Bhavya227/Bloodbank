import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const RequestBlood = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    bloodGroup: '',
    quantity: 1,
    urgency: 'normal',
    city: '',
    hospital: '',
    patientName: '',
    contactNumber: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const gujaratCities = [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 
    'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad', 
    'Mehsana', 'Bharuch', 'Navsari', 'Other'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood group is required';
    }
    
    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1 unit';
    }
    
    if (!formData.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.hospital) {
      newErrors.hospital = 'Hospital name is required';
    }
    
    if (!formData.patientName) {
      newErrors.patientName = 'Patient name is required';
    }
    
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      const res = await axios.post('/api/requests', formData, config);
      
      toast.success('Blood request submitted successfully');
      
      if (res.data.status === 'fulfilled') {
        toast.success('Your request has been fulfilled!');
      } else {
        toast.info('Your request has been queued. We will notify you when blood is available.');
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Request error:', err);
      const errorMsg = err.response?.data?.msg || 'Something went wrong with your request';
      toast.error(errorMsg);
      
      if (err.response?.data?.errors) {
        const errorObj = {};
        err.response.data.errors.forEach(error => {
          errorObj[error.param] = error.msg;
        });
        setErrors(errorObj);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Request Blood</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                    Blood Group Required*
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className={`input-field mt-1 ${errors.bloodGroup ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                  {errors.bloodGroup && <p className="mt-1 text-sm text-red-600">{errors.bloodGroup}</p>}
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity (Units)*
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`input-field mt-1 ${errors.quantity ? 'border-red-500' : ''}`}
                  />
                  {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
                  Urgency Level*
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="input-field mt-1"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City*
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`input-field mt-1 ${errors.city ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select City</option>
                    {gujaratCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
                
                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">
                    Hospital Name*
                  </label>
                  <input
                    id="hospital"
                    name="hospital"
                    type="text"
                    value={formData.hospital}
                    onChange={handleChange}
                    className={`input-field mt-1 ${errors.hospital ? 'border-red-500' : ''}`}
                  />
                  {errors.hospital && <p className="mt-1 text-sm text-red-600">{errors.hospital}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                    Patient Name*
                  </label>
                  <input
                    id="patientName"
                    name="patientName"
                    type="text"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={`input-field mt-1 ${errors.patientName ? 'border-red-500' : ''}`}
                  />
                  {errors.patientName && <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>}
                </div>
                
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                    Contact Number*
                  </label>
                  <input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={`input-field mt-1 ${errors.contactNumber ? 'border-red-500' : ''}`}
                  />
                  {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-field mt-1"
                  placeholder="Any additional details about the request..."
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary w-full py-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Submitting Request...' : 'Submit Blood Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBlood; 
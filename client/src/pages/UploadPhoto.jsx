import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const UploadPhoto = () => {
  const { user, token } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [photoType, setPhotoType] = useState('profile'); // 'profile' or 'idProof'
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('type', photoType);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };

      // Mock API call - replace with actual endpoint
      // const response = await axios.post('/api/users/upload-photo', formData, config);
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
      
      toast.success(`${photoType === 'profile' ? 'Profile photo' : 'ID proof'} uploaded successfully`);
      
      // Clear form
      setSelectedFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Photo</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setPhotoType('profile')}
                  className={`px-4 py-2 rounded-md ${
                    photoType === 'profile'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  Profile Photo
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoType('idProof')}
                  className={`px-4 py-2 rounded-md ${
                    photoType === 'idProof'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  ID Proof
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {photoType === 'profile' ? 'Upload Profile Photo' : 'Upload ID Proof'}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {preview ? (
                      <div>
                        <img
                          src={preview}
                          alt="Preview"
                          className="mx-auto h-64 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreview(null);
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-800 focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <button
                  type="submit"
                  disabled={loading || !selectedFile}
                  className={`btn-primary py-2 px-6 ${
                    loading || !selectedFile ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Uploading...' : 'Upload Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto; 
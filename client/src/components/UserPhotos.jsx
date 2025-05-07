import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserPhotos = () => {
  const { user } = useAuth();
  const [photos, setPhotos] = useState({
    profile: null,
    idProof: null
  });

  // Mock data - in a real app, this would come from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (user) {
        setPhotos({
          profile: user.photoUrl || null,
          idProof: user.idProofUrl || null
        });
      }
    }, 500);
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Your Photos</h3>
        <Link
          to="/upload-photo"
          className="text-sm btn-outline"
        >
          Upload Photos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-medium mb-2">Profile Photo</h4>
          <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
            {photos.profile ? (
              <img
                src={photos.profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <Link
              to="/upload-photo"
              className="text-sm text-primary hover:text-red-700"
            >
              {photos.profile ? 'Update Photo' : 'Add Photo'}
            </Link>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-medium mb-2">ID Proof</h4>
          <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
            {photos.idProof ? (
              <img
                src={photos.idProof}
                alt="ID Proof"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <Link
              to="/upload-photo"
              className="text-sm text-primary hover:text-red-700"
            >
              {photos.idProof ? 'Update ID Proof' : 'Add ID Proof'}
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 text-gray-600 text-sm">
        <p>
          <strong>Note:</strong> Your profile photo may be visible to blood banks and other users.
          ID proof is only used for verification purposes and is kept private.
        </p>
      </div>
    </div>
  );
};

export default UserPhotos; 
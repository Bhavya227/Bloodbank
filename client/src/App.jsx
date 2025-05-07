import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Pages
import Dashboard from './pages/Dashboard';
import DonorProfile from './pages/DonorProfile';
import RequestBlood from './pages/RequestBlood';
import AdminPanel from './pages/AdminPanel';
import UploadPhoto from './pages/UploadPhoto';
import NotFound from './pages/NotFound';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <DonorProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/upload-photo" 
            element={
              <ProtectedRoute>
                <UploadPhoto />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/request" 
            element={
              <ProtectedRoute roles={['hospital']}>
                <RequestBlood />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <div className="text-primary text-2xl font-bold mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-semibold">Gujarat Blood Bank</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Connecting donors and recipients across Gujarat to ensure blood is available for those in need.
            </p>
            <div className="flex space-x-4">
              <a href="#!" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 4.9c-.8.4-1.6.6-2.5.8.9-.5 1.6-1.4 1.9-2.4-.8.5-1.8.9-2.7 1.1-.8-.9-1.9-1.4-3.1-1.4-2.4 0-4.3 1.9-4.3 4.3 0 .3 0 .7.1 1-3.6-.2-6.8-1.9-8.9-4.5-.4.7-.6 1.4-.6 2.3 0 1.5.8 2.8 1.9 3.6-.7 0-1.4-.2-1.9-.5v.1c0 2.1 1.5 3.8 3.4 4.2-.4.1-.7.2-1.1.2-.3 0-.5 0-.8-.1.5 1.7 2.1 2.9 4 3-1.5 1.2-3.3 1.9-5.3 1.9-.3 0-.7 0-1-.1 1.9 1.2 4.2 1.9 6.6 1.9 7.9 0 12.3-6.5 12.3-12.3v-.6c.8-.7 1.6-1.4 2.1-2.3z"/>
                </svg>
              </a>
              <a href="#!" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.5.2 1.9.3.5.2.8.4 1.1.7.3.3.5.6.7 1.1.1.4.3.9.3 1.9.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.5-.3 1.9-.2.5-.4.8-.7 1.1-.3.3-.6.5-1.1.7-.4.1-.9.3-1.9.3-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.5-.2-1.9-.3-.5-.2-.8-.4-1.1-.7-.3-.3-.5-.6-.7-1.1-.1-.4-.3-.9-.3-1.9-.1-1.1-.1-1.4-.1-4.1s0-3 .1-4.1c0-1 .2-1.5.3-1.9.2-.5.4-.8.7-1.1.3-.3.6-.5 1.1-.7.4-.1.9-.3 1.9-.3C9 2 9.3 2 12 2zm0 1.8c-2.6 0-2.9 0-4 .1-.9 0-1.4.2-1.8.3-.4.2-.7.3-.9.6-.3.2-.5.5-.6.9-.1.4-.2.9-.3 1.8 0 1.1-.1 1.4-.1 4 0 2.6 0 2.9.1 4 0 .9.2 1.4.3 1.8.2.4.3.7.6.9.2.3.5.5.9.6.4.1.9.3 1.8.3 1.1 0 1.4.1 4 .1 2.6 0 2.9 0 4-.1.9 0 1.4-.2 1.8-.3.4-.2.7-.3.9-.6.3-.2.5-.5.6-.9.1-.4.2-.9.3-1.8 0-1.1.1-1.4.1-4 0-2.6 0-2.9-.1-4 0-.9-.2-1.4-.3-1.8-.2-.4-.3-.7-.6-.9-.2-.3-.5-.5-.9-.6-.4-.1-.9-.3-1.8-.3-1.1 0-1.4-.1-4-.1zm0 3.1c2.8 0 5.1 2.3 5.1 5.1S14.8 17.1 12 17.1 6.9 14.8 6.9 12s2.3-5.1 5.1-5.1zm0 8.4c1.8 0 3.3-1.5 3.3-3.3S13.8 8.7 12 8.7 8.7 10.2 8.7 12s1.5 3.3 3.3 3.3zm6.5-8.5c0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1.5-1.1 1.1-1.1 1.1.5 1.1 1.1z"/>
                </svg>
              </a>
              <a href="#!" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.7 6c-.8-1-2.7-1.9-4.5-2-1.8-.1-7.5-.1-9.4 0-1.8.1-3.7 1-4.5 2C3.5 7 3 9.7 3 12s.5 5 1.3 6c.8 1 2.7 1.9 4.5 2 1.9.1 7.6.1 9.4 0 1.8-.1 3.7-1 4.5-2 .8-1 1.3-3.7 1.3-6s-.5-5-1.3-6zM10 15V9l5.2 3-5.2 3z"/>
                </svg>
              </a>
              <a href="#!" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.5 3h-15C3.7 3 3 3.7 3 4.5v15c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-15c0-.8-.7-1.5-1.5-1.5zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zM18 17h-2.5v-4c0-.9-.3-1.5-1.4-1.5-1.3 0-1.6.9-1.6 1.5v4h-2.5v-7h2.5v1s.8-1.4 2.7-1.4c1.7 0 2.8 1 2.8 3.1v4.4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Blood Groups */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Blood Groups</h2>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">A+</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">A-</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">B+</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">B-</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">AB+</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">AB-</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">O+</Link>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">O-</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <div className="space-y-3">
              <p className="text-gray-400 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Civil Hospital Campus, Ahmedabad, Gujarat 380016</span>
              </p>
              <p className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@gujaratbloodbank.org</span>
              </p>
              <p className="text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 79-26577621</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row md:justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Gujarat Blood Bank. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
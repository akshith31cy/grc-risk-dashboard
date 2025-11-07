import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { RiskRegister } from './pages/RiskRegister';
import { Shield, LayoutDashboard, FileText, Bell, User, Sparkles } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen relative">
        {/* Colorful animated background blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Vibrant Navigation Header */}
        <nav className="glass sticky top-0 z-50 border-b-4 border-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo with Rainbow Animation */}
              <div className="flex items-center space-x-4">
                <div className="relative float">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur-xl opacity-75 pulse-color"></div>
                  <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-3 rounded-2xl shadow-2xl">
                    <Shield className="text-white" size={36} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-black gradient-text flex items-center gap-2">
                    GRC Risk Platform
                    <Sparkles size={20} className="text-yellow-500 animate-pulse" />
                  </h1>
                  <p className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Enterprise Security Dashboard
                  </p>
                </div>
              </div>

              {/* Colorful Navigation Links */}
              <div className="flex space-x-3">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl shadow-purple-500/50 scale-105'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:scale-105'
                    }`
                  }
                >
                  <LayoutDashboard size={20} className="mr-2" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/risks"
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-2xl shadow-purple-500/50 scale-105'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 hover:scale-105'
                    }`
                  }
                >
                  <FileText size={20} className="mr-2" />
                  Risk Register
                </NavLink>
              </div>

              {/* User Actions with Colors */}
              <div className="flex items-center space-x-4">
                <button className="relative p-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 rounded-2xl transition-all hover:scale-110">
                  <Bell size={22} />
                  <span className="absolute top-2 right-2 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-ping"></span>
                  <span className="absolute top-2 right-2 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                  <div className="bg-white p-1.5 rounded-full">
                    <User size={18} className="text-purple-600" />
                  </div>
                  <span className="text-sm font-bold text-white">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/risks" element={<RiskRegister />} />
          </Routes>
        </main>

        {/* Colorful Footer */}
        <footer className="glass border-t-4 border-gradient-to-r from-purple-500 via-pink-500 to-blue-500 mt-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                © 2024 GRC Risk Visibility Dashboard - Premium Edition
              </p>
              <div className="flex space-x-6 text-sm font-semibold">
                <a href="#" className="text-purple-600 hover:text-pink-600 transition-colors">Documentation</a>
                <a href="#" className="text-purple-600 hover:text-pink-600 transition-colors">Support</a>
                <a href="#" className="text-purple-600 hover:text-pink-600 transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
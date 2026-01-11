'use client';

import { useState, useEffect } from 'react';
import { Lock, User, Key, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

// ⚠️ SECURITY NOTE: Since this is client-side only, 
// a tech-savvy user could technically bypass this by editing LocalStorage.
// For a personal admin panel, this is usually fine.

const ADMIN_CREDENTIALS = {
  username: 'ironz_admin',
  password: 'ironz1235'
};

export default function SetupLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check login status on page load
  useEffect(() => {
    const authStatus = localStorage.getItem('ironz_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Handle Logout (Pass this function to children if you want a logout button in your header)
  const handleLogout = () => {
    localStorage.removeItem('ironz_admin_auth');
    setIsAuthenticated(false);
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
      </div>
    );
  }

  // 2. Not Authenticated - Show Login Screen
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  // 3. Authenticated - Show the actual pages (children)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Optional: You can add a global Admin Header here if you want */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all text-xs font-bold"
          title="Logout"
        >
          Logout
        </button>
      </div>
      
      {children}
    </div>
  );
}

// --- Internal Login Component ---
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsChecking(true);

    // Simulate a small network delay for better UX
    setTimeout(() => {
      if (
        username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password
      ) {
        localStorage.setItem('ironz_admin_auth', 'true');
        onLogin();
      } else {
        setError('Identifiants incorrects');
        setIsChecking(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-4">
      <div className="w-full max-w-md">
        
        {/* Logo / Header Area */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 shadow-xl mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Ironz Admin</h1>
          <p className="text-gray-500 mt-2">Veuillez vous connecter pour accéder au setup</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-yellow-100 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium animate-pulse">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Username Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Nom d'utilisateur</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                      placeholder="Entrez votre identifiant"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Mot de passe</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isChecking}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    Accéder au Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Zone Sécurisée</span>
          </div>
        </div>
      </div>
    </div>
  );
}
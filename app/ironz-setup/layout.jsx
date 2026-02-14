'use client';

import { useState, useEffect } from 'react';
import { Lock, User, Key, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Replace with your actual logo path
const LOGO_PATH = '/images/logo-ironz.png'; // Ensure this file exists in public/images/
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

  const handleLogout = () => {
    localStorage.removeItem('ironz_admin_auth');
    setIsAuthenticated(false);
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-4">
        <div className="w-16 h-16 relative animate-pulse">
           {/* If you have a logo, use it here, else use a placeholder icon */}
           <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.5)]">
             <Lock className="w-8 h-8 text-black" />
           </div>
        </div>
        <p className="text-yellow-500 font-bold tracking-widest text-sm animate-pulse">SECURING CONNECTION...</p>
      </div>
    );
  }

  // 2. Not Authenticated - Show Login Screen
  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  // 3. Authenticated - Show children
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="fixed bottom-6 right-6 z-[100]">
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-2 bg-black text-white px-4 py-3 rounded-full shadow-2xl hover:bg-red-600 transition-all duration-300 font-bold text-sm border border-gray-800"
        >
          <Lock className="w-4 h-4 group-hover:hidden" />
          <ArrowRight className="w-4 h-4 hidden group-hover:block" />
          <span>Déconnexion</span>
        </button>
      </div>
      {children}
    </div>
  );
}

// --- Internal Login Component with Enhanced Design ---
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsChecking(true);

    setTimeout(() => {
      if (
        username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password
      ) {
        localStorage.setItem('ironz_admin_auth', 'true');
        onLogin();
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
        setIsChecking(false);
        setPassword('');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      
      {/* LEFT SIDE - BRANDING / IMAGE */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600 rounded-full blur-[150px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 text-center p-12">
          {/* Logo Placeholder */}
          <div className="w-32 h-32 mx-auto bg-black rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(234,179,8,0.3)] transform rotate-3 hover:rotate-0 transition-all duration-500">
             {/* Replace with <Image src={LOGO_PATH} ... /> */}
           <img src="/logo.png" />
          </div>
          
          <h1 className="text-6xl font-black text-white tracking-tighter mb-4">
            IRONZ <span className="text-yellow-500">ADMIN</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Plateforme de gestion centralisée. Contrôlez votre  en un seul endroit.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-50/50">
        <div className="w-full max-w-md animate-fadeIn">
          
          {/* Mobile Header (Only visible on small screens) */}
          <div className="lg:hidden text-center mb-8">
             <h1 className="text-4xl font-black text-black tracking-tighter">
              IRONZ <span className="text-yellow-500">ADMIN</span>
            </h1>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-black"></div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Bienvenue</h2>
              <p className="text-gray-500 text-sm mt-1">Connectez-vous pour accéder au tableau de bord.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 animate-shake">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Identifiant</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all duration-200 font-medium"
                    placeholder="ironz_admin"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-gray-900 uppercase tracking-wide">Mot de passe</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all duration-200 font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isChecking}
                className="w-full flex items-center justify-center gap-3 py-4 px-4 mt-6 border border-transparent rounded-xl shadow-lg shadow-yellow-500/20 text-sm font-black uppercase tracking-wider text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-[0.98]"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    Connexion
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
               <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                 <ShieldCheck className="w-4 h-4 text-green-600" />
                 <span className="text-xs font-semibold text-green-700">Connexion chiffrée SSL</span>
               </div>
            </div>
          </div>
          
          <p className="text-center mt-8 text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Ironz Fitness. Tous droits réservés.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
}
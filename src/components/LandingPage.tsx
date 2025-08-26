import React from 'react';
import { SignUpButton } from '@clerk/clerk-react';
import { Shield, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Stegnoguard</h1>
                <p className="text-sm text-gray-600">Crypto & Security Utilities</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Stegnoguard
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Your ultimate toolkit for cryptography, steganography, and security utilities
          </p>
          
          <SignUpButton mode="modal">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform flex items-center space-x-2 mx-auto text-lg">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

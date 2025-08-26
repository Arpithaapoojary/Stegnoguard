import React from 'react';
import { SignUpButton } from '@clerk/clerk-react';
import { Shield, Lock, Image, Code, Search, Mail, ArrowRight, Star, Users, Zap } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Stegnoguard</h1>
                <p className="text-sm text-gray-600">Crypto & Security Utilities</p>
              </div>
            </div>
            {/* <div className="flex items-center space-x-4">
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignUpButton>
            </div> */}
          </div>
        </div>
      </header>
      <section>
        <div className="flex items-center space-x-4 mr-2">
              <SignUpButton mode="modal">
                <button className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignUpButton>
            </div>
      </section>
      <section>
        <div>
            <h2 className=''>Chatgpt is here </h2>
        </div>
      </section>
      

    </div>
  );
};

export default LandingPage;

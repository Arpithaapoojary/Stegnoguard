import { useState } from 'react';
import { Shield, Lock, Image, Code, Search, Mail, User, Settings } from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import CryptoTools from './CryptoTools';
import NetworkTools from './NetworkTools';
import SteganographyTools from './SteganographyTools';
import WebTools from './WebTools';
import IPDNSLookupTools from './IPDNSLookupTools';
import EmailValidatorTools from './EmailValidatorTools';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<'crypto' | 'network' | 'steganography' | 'web' | 'ipdns' | 'email'>('crypto');
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Stegnoguard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.firstName || 'User'}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.primaryEmailAddress?.emailAddress}</span>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('crypto')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'crypto'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Crypto Tools</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('steganography')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'steganography'
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Image className="w-4 h-4" />
                <span>Steganography</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('web')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'web'
                  ? 'border-orange-500 text-orange-600 bg-orange-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Web Tools</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('ipdns')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'ipdns'
                  ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Network Tools</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('email')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'email'
                  ? 'border-pink-500 text-pink-600 bg-pink-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Validator</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-8">
        {activeTab === 'crypto' && <CryptoTools />}
        {activeTab === 'network' && <NetworkTools />}
        {activeTab === 'steganography' && <SteganographyTools />}
        {activeTab === 'web' && <WebTools />}
        {activeTab === 'ipdns' && <IPDNSLookupTools />}
        {activeTab === 'email' && <EmailValidatorTools />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left text-sm text-gray-600 mb-4 md:mb-0">
              <p>Stegnoguard - Professional Security Tools</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <a href="#" className="hover:text-gray-900 transition-colors">Help</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
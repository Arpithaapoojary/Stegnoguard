import { useState } from 'react';
import { Shield, Lock, Image, Code, Search, Mail } from 'lucide-react';
import CryptoTools from './CryptoTools';
import NetworkTools from './NetworkTools';
import SteganographyTools from './SteganographyTools';
import WebTools from './WebTools';
import IPDNSLookupTools from './IPDNSLookupTools';
import EmailValidatorTools from './EmailValidatorTools';

const tabs = [
  { id: 'crypto',        label: 'Crypto Tools',   icon: Lock   },
  { id: 'steganography', label: 'Steganography',  icon: Image  },
  { id: 'web',           label: 'Web Tools',      icon: Code   },
  { id: 'ipdns',         label: 'Network Tools',  icon: Search },
  { id: 'email',         label: 'Email Validator', icon: Mail   },
] as const;

type TabId = typeof tabs[number]['id'];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabId>('crypto');
  const [contentKey, setContentKey] = useState(0);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    setContentKey(k => k + 1);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#111', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #eee',
        position: 'sticky', top: 0, zIndex: 50,
        animation: 'fadeInDown 0.5s ease both',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px',
              background: '#111', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'scaleIn 0.4s ease both',
              transition: 'transform 0.2s', cursor: 'default',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.1) rotate(-4deg)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; }}
            >
              <Shield style={{ width: '20px', height: '20px', color: '#fff' }} />
            </div>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111', letterSpacing: '-0.03em' }}>
              Stegnoguard
            </span>
          </div>
          <span style={{
            background: '#f5f5f5', border: '1px solid #e5e5e5', borderRadius: '20px',
            padding: '4px 12px', fontSize: '0.7rem', color: '#888', fontWeight: 500,
            animation: 'fadeIn 0.6s ease 0.3s both',
          }}>v1.0</span>
        </div>
      </header>

      {/* Nav */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #eee', animation: 'fadeInDown 0.5s ease 0.08s both' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '2px' }}>
            {tabs.map(({ id, label, icon: Icon }, i) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => handleTabChange(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '12px 16px', fontSize: '0.8rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#111' : '#999',
                    background: 'transparent', border: 'none',
                    borderBottom: isActive ? '2px solid #111' : '2px solid transparent',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'color 0.2s, border-color 0.2s',
                    animation: `slideRight 0.35s ease ${i * 0.05}s both`,
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#444'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#999'; }}
                >
                  <Icon style={{ width: '14px', height: '14px' }} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main key={contentKey} style={{
        maxWidth: '1200px', width: '100%', margin: '0 auto',
        padding: '32px 24px 64px', animation: 'fadeInUp 0.35s ease both', flex: 1,
      }}>
        {activeTab === 'crypto'        && <CryptoTools />}
        {activeTab === 'network'       && <NetworkTools />}
        {activeTab === 'steganography' && <SteganographyTools />}
        {activeTab === 'web'           && <WebTools />}
        {activeTab === 'ipdns'         && <IPDNSLookupTools />}
        {activeTab === 'email'         && <EmailValidatorTools />}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #eee', animation: 'fadeIn 0.5s ease 0.4s both' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', color: '#bbb' }}>© 2025 Stegnoguard</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Help', 'Docs'].map(l => (
              <a key={l} href="#" style={{ fontSize: '0.72rem', color: '#bbb', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#111'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#bbb'}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
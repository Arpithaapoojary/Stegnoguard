import React, { ReactNode } from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  children: ReactNode;
}

const ToolCard = ({ title, description, icon, children }: ToolCardProps) => {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = '#ccc';
        el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = '#e8e8e8';
        el.style.boxShadow = 'none';
      }}
    >
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid #f0f0f0',
        background: '#fafafa',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '30px', height: '30px',
          background: '#111', borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111', margin: 0 }}>{title}</h3>
          <p style={{ fontSize: '0.7rem', color: '#999', margin: 0, marginTop: '1px' }}>{description}</p>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default ToolCard;
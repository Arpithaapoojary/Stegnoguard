import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      style={{
        padding: '3px 8px',
        background: copied ? '#111' : '#fff',
        color: copied ? '#fff' : '#888',
        border: `1px solid ${copied ? '#111' : '#ddd'}`,
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '4px',
        fontSize: '0.68rem', fontWeight: 500,
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#999'; (e.currentTarget as HTMLButtonElement).style.color = '#444'; }}}
      onMouseLeave={e => { if (!copied) { (e.currentTarget as HTMLButtonElement).style.borderColor = '#ddd'; (e.currentTarget as HTMLButtonElement).style.color = '#888'; }}}
    >
      {copied ? <><Check style={{ width: '11px', height: '11px' }} /> Copied</> : <><Copy style={{ width: '11px', height: '11px' }} /> Copy</>}
    </button>
  );
};

export default CopyButton;
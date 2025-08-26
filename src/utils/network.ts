// Network utilities for educational purposes

export const validateIP = (ip: string) => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.').map(Number);
    let type = 'Public';
    
    // Check for private ranges
    if (
      (parts[0] === 10) ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) ||
      (parts[0] === 127)
    ) {
      type = 'Private/Local';
    }
    
    return {
      isValid: true,
      version: 4,
      type: type
    };
  } else if (ipv6Regex.test(ip)) {
    return {
      isValid: true,
      version: 6,
      type: ip.startsWith('::1') || ip.startsWith('fe80') ? 'Private/Local' : 'Public'
    };
  }
  
  return {
    isValid: false,
    version: null,
    type: null
  };
};

export const formatURL = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch {
    return url;
  }
};

export const generateQRCode = (text: string): string => {
  // Simple QR code representation using ASCII art for demonstration
  const size = 15;
  const pattern = [];
  
  // Generate a simple pattern based on text hash
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) & 0xffffffff;
  }
  
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const value = (hash + i * size + j) % 2;
      row.push(value === 0 ? '█' : '░');
    }
    pattern.push(row.join(''));
  }
  
  return `<pre style="line-height: 1; font-size: 8px; font-family: monospace;">${pattern.join('\n')}</pre>`;
};

export const simulateDNSLookup = (domain: string) => {
  // Simulate DNS records for educational purposes
  const records = [];
  
  // Generate some fake but realistic-looking records
  const baseIP = '192.168.1.';
  const ipSuffix = Math.floor(Math.random() * 254) + 1;
  
  records.push({ type: 'A', value: baseIP + ipSuffix });
  
  if (domain.includes('www')) {
    records.push({ type: 'CNAME', value: domain.replace('www.', '') });
  }
  
  records.push({ type: 'MX', value: 'mail.' + domain });
  records.push({ type: 'NS', value: 'ns1.' + domain });
  records.push({ type: 'NS', value: 'ns2.' + domain });
  
  return {
    domain,
    records,
    timestamp: new Date().toISOString()
  };
};

export const parseUserAgent = (userAgent: string) => {
  // Simple user agent parsing for educational purposes
  let browser = 'Unknown';
  let version = 'Unknown';
  let os = 'Unknown';
  let device = 'Desktop';
  
  // Browser detection
  if (userAgent.includes('Chrome')) {
    browser = 'Chrome';
    const match = userAgent.match(/Chrome\/([0-9.]+)/);
    if (match) version = match[1];
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
    const match = userAgent.match(/Firefox\/([0-9.]+)/);
    if (match) version = match[1];
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
    const match = userAgent.match(/Version\/([0-9.]+)/);
    if (match) version = match[1];
  } else if (userAgent.includes('Edge')) {
    browser = 'Edge';
    const match = userAgent.match(/Edge\/([0-9.]+)/);
    if (match) version = match[1];
  }
  
  // OS detection
  if (userAgent.includes('Windows')) {
    os = 'Windows';
    if (userAgent.includes('Windows NT 10.0')) os = 'Windows 10/11';
    else if (userAgent.includes('Windows NT 6.3')) os = 'Windows 8.1';
    else if (userAgent.includes('Windows NT 6.1')) os = 'Windows 7';
  } else if (userAgent.includes('Macintosh')) {
    os = 'macOS';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
    device = 'Mobile';
  } else if (userAgent.includes('iPhone')) {
    os = 'iOS';
    device = 'Mobile';
  } else if (userAgent.includes('iPad')) {
    os = 'iPadOS';
    device = 'Tablet';
  }
  
  // Device type
  if (userAgent.includes('Mobile') && !userAgent.includes('iPad')) {
    device = 'Mobile';
  } else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) {
    device = 'Tablet';
  }
  
  return { browser, version, os, device };
};
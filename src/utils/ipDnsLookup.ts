// IP DNS Lookup utilities for real-world network analysis

export interface IPInfo {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  org?: string;
  timezone?: string;
  loc?: string;
  postal?: string;
  asn?: string;
  isp?: string;
  type?: 'IPv4' | 'IPv6';
  isPrivate?: boolean;
  isValid: boolean;
  error?: string;
}

export interface DNSRecord {
  type: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'TXT' | 'SOA' | 'PTR';
  name: string;
  value: string;
  ttl?: number;
  priority?: number;
}

export interface DNSLookupResult {
  domain: string;
  records: DNSRecord[];
  timestamp: string;
  success: boolean;
  error?: string;
}

// Validate IP address format
export const validateIPAddress = (ip: string): { isValid: boolean; type?: 'IPv4' | 'IPv6'; isPrivate?: boolean } => {
  // IPv4 regex
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  // IPv6 regex (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
  
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.').map(Number);
    
    // Check for private IP ranges
    const isPrivate = (
      parts[0] === 10 ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) ||
      parts[0] === 127 ||
      parts[0] === 169 && parts[1] === 254
    );
    
    return { isValid: true, type: 'IPv4', isPrivate };
  }
  
  if (ipv6Regex.test(ip)) {
    const isPrivate = ip.startsWith('::1') || ip.startsWith('fe80') || ip.startsWith('fc00') || ip.startsWith('fd00');
    return { isValid: true, type: 'IPv6', isPrivate };
  }
  
  return { isValid: false };
};

// Get IP informatio
export const getIPInfo = async (ip: string): Promise<IPInfo> => {
  const validation = validateIPAddress(ip);
  
  if (!validation.isValid) {
    return {
      ip,
      isValid: false,
      error: 'Invalid IP address format'
    };
  }

  // For private IPs, 
  if (validation.isPrivate) {
    return {
      ip,
      hostname: `private-${ip.replace(/[.:]/g, '-')}`,
      city: 'Private Network',
      region: 'Local',
      country: 'Private',
      org: 'Private Network',
      isp: 'Local Network',
      type: validation.type,
      isPrivate: true,
      isValid: true
    };
  }
  
  // Try multiple APIs 
  const apis = [
    {
      name: 'ipapi.co',
      url: `https://ipapi.co/${ip}/json/`,
      parser: (data: any) => ({
        ip: data.ip,
        hostname: data.hostname || undefined,
        city: data.city || 'Unknown',
        region: data.region || data.region_code || 'Unknown',
        country: data.country_name || data.country || 'Unknown',
        org: data.org || data.organisation || 'Unknown',
        timezone: data.timezone,
        loc: data.latitude && data.longitude ? `${data.latitude},${data.longitude}` : undefined,
        postal: data.postal,
        asn: data.asn,
        isp: data.org || data.isp || 'Unknown',
        type: validation.type,
        isPrivate: validation.isPrivate,
        isValid: true
      })
    },
    {
      name: 'ip-api.com',
      url: `http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`,
      parser: (data: any) => {
        if (data.status === 'fail') {
          throw new Error(data.message || 'API Error');
        }
        return {
          ip: data.query,
          city: data.city || 'Unknown',
          region: data.regionName || data.region || 'Unknown',
          country: data.country || 'Unknown',
          org: data.org || 'Unknown',
          timezone: data.timezone,
          loc: data.lat && data.lon ? `${data.lat},${data.lon}` : undefined,
          postal: data.zip,
          asn: data.as,
          isp: data.isp || 'Unknown',
          type: validation.type,
          isPrivate: validation.isPrivate,
          isValid: true
        };
      }
    },
    {
      name: 'ipinfo.io',
      url: `https://ipinfo.io/${ip}/json`,
      parser: (data: any) => {
        if (data.bogon) {
          throw new Error('Bogon IP address');
        }
        return {
          ip: data.ip,
          hostname: data.hostname,
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country: data.country || 'Unknown',
          org: data.org || 'Unknown',
          timezone: data.timezone,
          loc: data.loc,
          postal: data.postal,
          isp: data.org || 'Unknown',
          type: validation.type,
          isPrivate: validation.isPrivate,
          isValid: true
        };
      }
    }
  ];

  for (const api of apis) {
    try {
      console.log(`Trying ${api.name} for IP ${ip}...`);
      const response = await fetch(api.url);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.error || (data.status && data.status === 'fail')) {
          throw new Error(data.reason || data.message || 'API Error');
        }
        
        const result = api.parser(data);
        console.log(`Success with ${api.name}`);
        return result;
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn(`${api.name} failed:`, error);
      continue; // Try next API
    }
  }
  
  // If all APIs fail, return basic validation info
  console.warn('All IP APIs failed, returning basic validation info');
  return {
    ip,
    city: 'Unknown',
    region: 'Unknown',
    country: 'Unknown',
    org: 'Unknown',
    isp: 'Unknown',
    type: validation.type,
    isPrivate: validation.isPrivate,
    isValid: true,
    error: 'Unable to fetch detailed IP information'
  };
};

// Batch IP lookup
export const batchIPLookup = async (ips: string[]): Promise<IPInfo[]> => {
  const results = await Promise.allSettled(
    ips.map(ip => getIPInfo(ip))
  );
  
  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        ip: ips[index],
        isValid: false,
        error: 'Lookup failed'
      };
    }
  });
};

// Perform DNS lookup using multiple free DNS APIs
export const performDNSLookup = async (domain: string): Promise<DNSLookupResult> => {
  const cleanDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  
  if (!isValidDomain(cleanDomain)) {
    return {
      domain: cleanDomain,
      records: [],
      timestamp: new Date().toISOString(),
      success: false,
      error: 'Invalid domain format'
    };
  }
  
  // Try multiple DNS APIs
  const dnsApis = [
    {
      name: 'Google DNS-over-HTTPS',
      url: `https://dns.google/resolve?name=${cleanDomain}&type=ANY`,
      parser: (data: any) => {
        if (!data.Answer) {
          throw new Error('No DNS records found');
        }
        
        const records: DNSRecord[] = data.Answer.map((record: any) => ({
          type: getRecordTypeName(record.type),
          name: record.name.endsWith('.') ? record.name.slice(0, -1) : record.name,
          value: record.data,
          ttl: record.TTL
        }));
        
        return records;
      }
    },
    {
      name: 'Cloudflare DNS-over-HTTPS',
      url: `https://cloudflare-dns.com/dns-query?name=${cleanDomain}&type=ANY`,
      headers: { 'Accept': 'application/dns-json' },
      parser: (data: any) => {
        if (!data.Answer) {
          throw new Error('No DNS records found');
        }
        
        const records: DNSRecord[] = data.Answer.map((record: any) => ({
          type: getRecordTypeName(record.type),
          name: record.name.endsWith('.') ? record.name.slice(0, -1) : record.name,
          value: record.data,
          ttl: record.TTL
        }));
        
        return records;
      }
    }
  ];

  for (const api of dnsApis) {
    try {
      console.log(`Trying ${api.name} for domain ${cleanDomain}...`);
      const response = await fetch(api.url, {
        headers: api.headers || {}
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.Status === 3) { // NXDOMAIN
          throw new Error('Domain not found');
        }
        
        if (data.Status !== 0) { // Not NOERROR
          throw new Error(`DNS query failed with status ${data.Status}`);
        }
        
        const records = api.parser(data);
        console.log(`Success with ${api.name}`);
        
        return {
          domain: cleanDomain,
          records,
          timestamp: new Date().toISOString(),
          success: true
        };
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.warn(`${api.name} failed:`, error);
      continue; // Try next API
    }
  }
  
  // If all APIs fail, try a simple A record lookup using a basic API
  try {
    console.log('Trying basic A record lookup...');
    const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.Answer && data.Answer.length > 0) {
        const records: DNSRecord[] = data.Answer.map((record: any) => ({
          type: 'A',
          name: cleanDomain,
          value: record.data,
          ttl: record.TTL
        }));
        
        return {
          domain: cleanDomain,
          records,
          timestamp: new Date().toISOString(),
          success: true
        };
      }
    }
  } catch (error) {
    console.warn('Basic A record lookup failed:', error);
  }
  
  
  return {
    domain: cleanDomain,
    records: [],
    timestamp: new Date().toISOString(),
    success: false,
    error: 'All DNS lookup methods failed. Domain may not exist or DNS servers are unreachable.'
  };
};


export const performReverseDNSLookup = async (ip: string): Promise<DNSLookupResult> => {
  const validation = validateIPAddress(ip);
  
  if (!validation.isValid) {
    return {
      domain: ip,
      records: [],
      timestamp: new Date().toISOString(),
      success: false,
      error: 'Invalid IP address'
    };
  }
  
  try {
    
    let reverseDomain: string;
    
    if (validation.type === 'IPv4') {
      const parts = ip.split('.').reverse();
      reverseDomain = `${parts.join('.')}.in-addr.arpa`;
    } else {
      // IPv6 reverse DNS is more complex, skip for now
      throw new Error('IPv6 reverse DNS not implemented');
    }
    
    const response = await fetch(`https://dns.google/resolve?name=${reverseDomain}&type=PTR`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.Answer && data.Answer.length > 0) {
        const records: DNSRecord[] = data.Answer.map((record: any) => ({
          type: 'PTR',
          name: ip,
          value: record.data.endsWith('.') ? record.data.slice(0, -1) : record.data,
          ttl: record.TTL
        }));
        
        return {
          domain: ip,
          records,
          timestamp: new Date().toISOString(),
          success: true
        };
      } else if (data.Status === 3) {
        // NXDOMAIN - no reverse DNS record
        return {
          domain: ip,
          records: [],
          timestamp: new Date().toISOString(),
          success: false,
          error: 'No reverse DNS record found for this IP address'
        };
      }
    }
  } catch (error) {
    console.warn('Reverse DNS lookup failed:', error);
  }
  
  return {
    domain: ip,
    records: [],
    timestamp: new Date().toISOString(),
    success: false,
    error: 'Reverse DNS lookup failed or no PTR record exists'
  };
};

// Get current user's public IP using multiple free APIs
export const getCurrentUserIP = async (): Promise<string> => {
  const ipApis = [
    'https://api.ipify.org?format=json',
    'https://ipapi.co/ip/',
    'https://ip4.seeip.org/json',
    'https://api.my-ip.io/ip.json'
  ];

  for (const apiUrl of ipApis) {
    try {
      console.log(`Trying to get public IP from ${apiUrl}...`);
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        let ip: string;
        
        // Different APIs return IP in different formats
        if (data.ip) {
          ip = data.ip;
        } else if (typeof data === 'string') {
          ip = data;
        } else if (data.address) {
          ip = data.address;
        } else {
          continue;
        }
        
        // Validate the returned IP
        const validation = validateIPAddress(ip);
        if (validation.isValid && !validation.isPrivate) {
          console.log(`Got public IP: ${ip}`);
          return ip;
        }
      }
    } catch (error) {
      console.warn(`Failed to get IP from ${apiUrl}:`, error);
      continue;
    }
  }
  
  try {
    const response = await fetch('https://ipapi.co/ip/');
    if (response.ok) {
      const ip = (await response.text()).trim();
      const validation = validateIPAddress(ip);
      if (validation.isValid) {
        return ip;
      }
    }
  } catch (error) {
    console.warn('Text-based IP API failed:', error);
  }
  
  throw new Error('Unable to determine public IP address');
};

const isValidDomain = (domain: string): boolean => {
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  return domainRegex.test(domain) && domain.length <= 253;
};

const getRecordTypeName = (type: number): DNSRecord['type'] => {
  const types: { [key: number]: DNSRecord['type'] } = {
    1: 'A',
    28: 'AAAA',
    5: 'CNAME',
    15: 'MX',
    2: 'NS',
    16: 'TXT',
    6: 'SOA',
    12: 'PTR'
  };
  return types[type] || 'A';
};

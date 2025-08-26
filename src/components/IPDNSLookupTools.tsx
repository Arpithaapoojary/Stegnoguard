import { useState } from 'react';
import { Search, Globe, MapPin, Clock, Shield, Server, Eye, Loader2 } from 'lucide-react';
import { 
  getIPInfo, 
  performDNSLookup, 
  performReverseDNSLookup, 
  getCurrentUserIP,
  batchIPLookup,
  IPInfo, 
  DNSLookupResult 
} from '../utils/ipDnsLookup';
import ToolCard from './ToolCard';
import CopyButton from './CopyButton';

const IPDNSLookupTools = () => {
  const [ipInput, setIpInput] = useState('');
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [ipLoading, setIpLoading] = useState(false);

  const [domainInput, setDomainInput] = useState('');
  const [dnsResult, setDnsResult] = useState<DNSLookupResult | null>(null);
  const [dnsLoading, setDnsLoading] = useState(false);

  const [reverseIpInput, setReverseIpInput] = useState('');
  const [reverseDnsResult, setReverseDnsResult] = useState<DNSLookupResult | null>(null);
  const [reverseLoading, setReverseLoading] = useState(false);

  const [currentIP, setCurrentIP] = useState('');
  const [currentIPInfo, setCurrentIPInfo] = useState<IPInfo | null>(null);
  const [currentIPLoading, setCurrentIPLoading] = useState(false);

  const [batchIPs, setBatchIPs] = useState('');
  const [batchResults, setBatchResults] = useState<IPInfo[]>([]);
  const [batchLoading, setBatchLoading] = useState(false);

  const handleIPLookup = async () => {
    if (!ipInput.trim()) return;
    
    setIpLoading(true);
    try {
      const result = await getIPInfo(ipInput.trim());
      setIpInfo(result);
    } catch (error) {
      setIpInfo({
        ip: ipInput,
        isValid: false,
        error: 'Lookup failed'
      });
    } finally {
      setIpLoading(false);
    }
  };

  const handleDNSLookup = async () => {
    if (!domainInput.trim()) return;
    
    setDnsLoading(true);
    try {
      const result = await performDNSLookup(domainInput.trim());
      setDnsResult(result);
    } catch (error) {
      setDnsResult({
        domain: domainInput,
        records: [],
        timestamp: new Date().toISOString(),
        success: false,
        error: 'DNS lookup failed'
      });
    } finally {
      setDnsLoading(false);
    }
  };

  const handleReverseDNSLookup = async () => {
    if (!reverseIpInput.trim()) return;
    
    setReverseLoading(true);
    try {
      const result = await performReverseDNSLookup(reverseIpInput.trim());
      setReverseDnsResult(result);
    } catch (error) {
      setReverseDnsResult({
        domain: reverseIpInput,
        records: [],
        timestamp: new Date().toISOString(),
        success: false,
        error: 'Reverse DNS lookup failed'
      });
    } finally {
      setReverseLoading(false);
    }
  };

  const handleGetCurrentIP = async () => {
    setCurrentIPLoading(true);
    try {
      const ip = await getCurrentUserIP();
      setCurrentIP(ip);
      const info = await getIPInfo(ip);
      setCurrentIPInfo(info);
    } catch (error) {
      console.error('Failed to get current IP:', error);
      setCurrentIPInfo({
        ip: 'Unknown',
        isValid: false,
        error: error instanceof Error ? error.message : 'Failed to get current IP'
      });
    } finally {
      setCurrentIPLoading(false);
    }
  };

  const handleBatchLookup = async () => {
    if (!batchIPs.trim()) return;
    
    setBatchLoading(true);
    try {
      const ips = batchIPs.split('\n').map(ip => ip.trim()).filter(ip => ip);
      const results = await batchIPLookup(ips);
      setBatchResults(results);
    } catch (error) {
      setBatchResults([]);
    } finally {
      setBatchLoading(false);
    }
  };

  const formatRecordType = (type: string): string => {
    const descriptions: { [key: string]: string } = {
      'A': 'IPv4 Address',
      'AAAA': 'IPv6 Address',
      'CNAME': 'Canonical Name',
      'MX': 'Mail Exchange',
      'NS': 'Name Server',
      'TXT': 'Text Record',
      'SOA': 'Start of Authority',
      'PTR': 'Pointer Record'
    };
    return descriptions[type] || type;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">IP & DNS Lookup Tools</h2>
        <p className="text-gray-600">Comprehensive network analysis and DNS resolution tools</p>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> These tools use free public APIs. Some APIs may have rate limits or CORS restrictions. 
            For production use, consider implementing server-side lookups.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IP Information Lookup */}
        <ToolCard 
          title="IP Information Lookup" 
          description="Get detailed information about any IP address"
          icon={<Globe className="w-5 h-5" />}
          color="blue"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IP Address
              </label>
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="e.g., 8.8.8.8 or 2001:4860:4860::8888"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleIPLookup()}
              />
            </div>
            <button
              onClick={handleIPLookup}
              disabled={ipLoading || !ipInput.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {ipLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Lookup IP Info
            </button>
            
            {ipInfo && (
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">IP Information</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    ipInfo.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {ipInfo.isValid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
                
                {ipInfo.isValid && (
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">IP:</span>
                      <span className="font-mono flex items-center">
                        {ipInfo.ip}
                        <CopyButton text={ipInfo.ip} />
                      </span>
                    </div>
                    {ipInfo.type && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>{ipInfo.type} {ipInfo.isPrivate && '(Private)'}</span>
                      </div>
                    )}
                    {ipInfo.hostname && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hostname:</span>
                        <span className="font-mono">{ipInfo.hostname}</span>
                      </div>
                    )}
                    {ipInfo.city && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          Location:
                        </span>
                        <span>{ipInfo.city}, {ipInfo.region}, {ipInfo.country}</span>
                      </div>
                    )}
                    {ipInfo.org && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Organization:</span>
                        <span>{ipInfo.org}</span>
                      </div>
                    )}
                    {ipInfo.isp && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">ISP:</span>
                        <span>{ipInfo.isp}</span>
                      </div>
                    )}
                    {ipInfo.timezone && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Timezone:
                        </span>
                        <span>{ipInfo.timezone}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {!ipInfo.isValid && ipInfo.error && (
                  <div className="text-red-600 text-sm">{ipInfo.error}</div>
                )}
              </div>
            )}
          </div>
        </ToolCard>

        {/* DNS Lookup */}
        <ToolCard 
          title="DNS Lookup" 
          description="Resolve domain names to IP addresses and DNS records"
          icon={<Server className="w-5 h-5" />}
          color="green"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domain Name
              </label>
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="e.g., google.com or github.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyPress={(e) => e.key === 'Enter' && handleDNSLookup()}
              />
            </div>
            <button
              onClick={handleDNSLookup}
              disabled={dnsLoading || !domainInput.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {dnsLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              DNS Lookup
            </button>
            
            {dnsResult && (
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">DNS Records</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    dnsResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {dnsResult.success ? 'Success' : 'Failed'}
                  </span>
                </div>
                
                {dnsResult.success && dnsResult.records.length > 0 && (
                  <div className="space-y-2">
                    {dnsResult.records.map((record, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                {record.type}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatRecordType(record.type)}
                              </span>
                            </div>
                            <div className="text-sm font-mono text-gray-900 flex items-center">
                              {record.value}
                              <CopyButton text={record.value} />
                            </div>
                            {record.ttl && (
                              <div className="text-xs text-gray-500 mt-1">
                                TTL: {record.ttl}s
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!dnsResult.success && dnsResult.error && (
                  <div className="text-red-600 text-sm">{dnsResult.error}</div>
                )}
                
                <div className="text-xs text-gray-500">
                  Looked up at: {new Date(dnsResult.timestamp).toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Reverse DNS Lookup */}
        <ToolCard 
          title="Reverse DNS Lookup" 
          description="Find domain names associated with IP addresses"
          icon={<Eye className="w-5 h-5" />}
          color="purple"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IP Address
              </label>
              <input
                type="text"
                value={reverseIpInput}
                onChange={(e) => setReverseIpInput(e.target.value)}
                placeholder="e.g., 8.8.8.8"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && handleReverseDNSLookup()}
              />
            </div>
            <button
              onClick={handleReverseDNSLookup}
              disabled={reverseLoading || !reverseIpInput.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {reverseLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Reverse Lookup
            </button>
            
            {reverseDnsResult && (
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Reverse DNS Result</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    reverseDnsResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {reverseDnsResult.success ? 'Found' : 'Not Found'}
                  </span>
                </div>
                
                {reverseDnsResult.success && reverseDnsResult.records.length > 0 && (
                  <div className="space-y-2">
                    {reverseDnsResult.records.map((record, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="text-sm">
                          <span className="text-gray-600">Hostname: </span>
                          <span className="font-mono flex items-center">
                            {record.value}
                            <CopyButton text={record.value} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!reverseDnsResult.success && reverseDnsResult.error && (
                  <div className="text-red-600 text-sm">{reverseDnsResult.error}</div>
                )}
              </div>
            )}
          </div>
        </ToolCard>

        {/* Current IP Lookup */}
        <ToolCard 
          title="My IP Information" 
          description="Get information about your current public IP address"
          icon={<Shield className="w-5 h-5" />}
          color="orange"
        >
          <div className="space-y-4">
            <button
              onClick={handleGetCurrentIP}
              disabled={currentIPLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {currentIPLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Globe className="w-4 h-4 mr-2" />
              )}
              Get My IP Info
            </button>
            
            {currentIP && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 mb-2">Your Public IP</h4>
                <div className="text-lg font-mono text-blue-600 flex items-center">
                  {currentIP}
                  <CopyButton text={currentIP} />
                </div>
              </div>
            )}
            
            {currentIPInfo && currentIPInfo.isValid && (
              <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                {currentIPInfo.city && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span>{currentIPInfo.city}, {currentIPInfo.country}</span>
                  </div>
                )}
                {currentIPInfo.isp && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">ISP:</span>
                    <span>{currentIPInfo.isp}</span>
                  </div>
                )}
                {currentIPInfo.timezone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timezone:</span>
                    <span>{currentIPInfo.timezone}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </ToolCard>
      </div>

      {/* Batch IP Lookup */}
      <ToolCard 
        title="Batch IP Lookup" 
        description="Look up multiple IP addresses at once"
        icon={<Server className="w-5 h-5" />}
        color="blue"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Addresses (one per line)
            </label>
            <textarea
              value={batchIPs}
              onChange={(e) => setBatchIPs(e.target.value)}
              placeholder="8.8.8.8&#10;1.1.1.1&#10;208.67.222.222"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
          <button
            onClick={handleBatchLookup}
            disabled={batchLoading || !batchIPs.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            {batchLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            Batch Lookup
          </button>
          
          {batchResults.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-md space-y-3">
              <h4 className="font-medium text-gray-900">Batch Results</h4>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {batchResults.map((result, index) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-sm">{result.ip}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            result.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {result.isValid ? 'Valid' : 'Invalid'}
                          </span>
                        </div>
                        {result.isValid && result.city && (
                          <div className="text-sm text-gray-600">
                            {result.city}, {result.country} • {result.isp}
                          </div>
                        )}
                        {!result.isValid && result.error && (
                          <div className="text-sm text-red-600">{result.error}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ToolCard>
    </div>
  );
};

export default IPDNSLookupTools;

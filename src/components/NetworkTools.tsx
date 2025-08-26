import React, { useState } from 'react';
import { Globe, Link, QrCode, Search, Wifi } from 'lucide-react';
import { validateIP, formatURL, generateQRCode, simulateDNSLookup, parseUserAgent } from '../utils/network';
import ToolCard from './ToolCard';
import CopyButton from './CopyButton';

const NetworkTools = () => {
  const [ipInput, setIpInput] = useState('');
  const [ipInfo, setIpInfo] = useState<any>(null);

  const [urlInput, setUrlInput] = useState('');
  const [urlOutput, setUrlOutput] = useState('');
  const [urlMode, setUrlMode] = useState<'encode' | 'decode'>('encode');

  const [qrInput, setQrInput] = useState('');
  const [qrCode, setQrCode] = useState('');

  const [dnsInput, setDnsInput] = useState('');
  const [dnsResult, setDnsResult] = useState<any>(null);

  const [userAgent, setUserAgent] = useState(navigator.userAgent);
  const [parsedUA, setParsedUA] = useState<any>(null);

  const handleIPLookup = () => {
    if (!ipInput.trim()) return;
    const info = validateIP(ipInput);
    setIpInfo(info);
  };

  const handleURLProcess = () => {
    if (!urlInput.trim()) return;
    try {
      const result = urlMode === 'encode' 
        ? encodeURIComponent(urlInput)
        : decodeURIComponent(urlInput);
      setUrlOutput(result);
    } catch (error) {
      setUrlOutput('Error: Invalid URL format');
    }
  };

  const handleQRGenerate = () => {
    if (!qrInput.trim()) return;
    const qr = generateQRCode(qrInput);
    setQrCode(qr);
  };

  const handleDNSLookup = () => {
    if (!dnsInput.trim()) return;
    const result = simulateDNSLookup(dnsInput);
    setDnsResult(result);
  };

  const handleParseUserAgent = () => {
    const parsed = parseUserAgent(userAgent);
    setParsedUA(parsed);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Network Tools</h2>
        <p className="text-gray-600">Essential utilities for network analysis and web development</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IP Address Lookup */}
        <ToolCard 
          title="IP Address Validator" 
          description="Validate and get information about IP addresses"
          icon={<Globe className="w-5 h-5" />}
          color="green"
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
                placeholder="e.g., 192.168.1.1 or 2001:db8::1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleIPLookup}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Validate IP
            </button>
            {ipInfo && (
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Valid:</span>
                  <span className={ipInfo.isValid ? 'text-green-600' : 'text-red-600'}>
                    {ipInfo.isValid ? 'Yes' : 'No'}
                  </span>
                </div>
                {ipInfo.isValid && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium">Version:</span>
                      <span>IPv{ipInfo.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Type:</span>
                      <span>{ipInfo.type}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </ToolCard>

        {/* URL Encoder/Decoder */}
        <ToolCard 
          title="URL Encoder/Decoder" 
          description="Encode or decode URL components"
          icon={<Link className="w-5 h-5" />}
          color="green"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="encode"
                    checked={urlMode === 'encode'}
                    onChange={(e) => setUrlMode(e.target.value as 'encode')}
                    className="mr-2"
                  />
                  Encode
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="decode"
                    checked={urlMode === 'decode'}
                    onChange={(e) => setUrlMode(e.target.value as 'decode')}
                    className="mr-2"
                  />
                  Decode
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input
              </label>
              <textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder={urlMode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>
            <button
              onClick={handleURLProcess}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {urlMode === 'encode' ? 'Encode URL' : 'Decode URL'}
            </button>
            {urlOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Output
                  </label>
                  <CopyButton text={urlOutput} />
                </div>
                <code className="text-sm text-gray-800 break-all">{urlOutput}</code>
              </div>
            )}
          </div>
        </ToolCard>

        {/* QR Code Generator */}
        <ToolCard 
          title="QR Code Generator" 
          description="Generate QR codes for text or URLs"
          icon={<QrCode className="w-5 h-5" />}
          color="green"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text or URL
              </label>
              <textarea
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                placeholder="Enter text or URL to generate QR code..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>
            <button
              onClick={handleQRGenerate}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Generate QR Code
            </button>
            {qrCode && (
              <div className="bg-gray-50 p-4 rounded-md text-center">
                <div className="mb-3">
                  <label className="text-sm font-medium text-gray-700">QR Code</label>
                </div>
                <div 
                  className="inline-block p-4 bg-white rounded border"
                  dangerouslySetInnerHTML={{ __html: qrCode }}
                />
                <p className="text-xs text-gray-500 mt-2">
                  QR code generated for: {qrInput.substring(0, 50)}{qrInput.length > 50 ? '...' : ''}
                </p>
              </div>
            )}
          </div>
        </ToolCard>

        {/* DNS Lookup Simulator */}
        <ToolCard 
          title="DNS Lookup Simulator" 
          description="Simulate DNS lookups for educational purposes"
          icon={<Search className="w-5 h-5" />}
          color="green"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domain Name
              </label>
              <input
                type="text"
                value={dnsInput}
                onChange={(e) => setDnsInput(e.target.value)}
                placeholder="e.g., example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button
              onClick={handleDNSLookup}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Simulate DNS Lookup
            </button>
            {dnsResult && (
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="font-medium text-gray-700">DNS Records (Simulated):</div>
                {dnsResult.records.map((record: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-mono">{record.type}:</span>
                    <span className="font-mono">{record.value}</span>
                  </div>
                ))}
                <div className="text-xs text-gray-500 mt-2">
                  Note: This is a simulation for educational purposes
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* User Agent Parser */}
        <ToolCard 
          title="User Agent Parser" 
          description="Parse and analyze user agent strings"
          icon={<Wifi className="w-5 h-5" />}
          color="green"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Agent String
              </label>
              <textarea
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                placeholder="Enter user agent string..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>
            <button
              onClick={handleParseUserAgent}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Parse User Agent
            </button>
            {parsedUA && (
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="font-medium text-gray-700">Parsed Information:</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Browser:</span>
                    <span>{parsedUA.browser}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Version:</span>
                    <span>{parsedUA.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">OS:</span>
                    <span>{parsedUA.os}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Device:</span>
                    <span>{parsedUA.device}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ToolCard>
      </div>
    </div>
  );
};

export default NetworkTools;
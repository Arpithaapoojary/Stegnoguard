// Test script for IP and DNS lookup functionality
// This file can be used to test the APIs manually

import { 
  getIPInfo, 
  performDNSLookup, 
  performReverseDNSLookup, 
  getCurrentUserIP,
  validateIPAddress 
} from './utils/ipDnsLookup';

// Test IP validation
export const testIPValidation = () => {
  console.log('=== Testing IP Validation ===');
  
  const testIPs = [
    '8.8.8.8',           // Valid public IPv4
    '192.168.1.1',       // Valid private IPv4
    '2001:4860:4860::8888', // Valid public IPv6
    '::1',               // Valid private IPv6
    '256.1.1.1',         // Invalid IPv4
    'invalid-ip',        // Invalid format
    '127.0.0.1',         // Localhost
  ];
  
  testIPs.forEach(ip => {
    const result = validateIPAddress(ip);
    console.log(`${ip}: ${JSON.stringify(result)}`);
  });
};

// Test IP information lookup
export const testIPLookup = async () => {
  console.log('\n=== Testing IP Information Lookup ===');
  
  const testIPs = ['8.8.8.8', '1.1.1.1', '208.67.222.222'];
  
  for (const ip of testIPs) {
    try {
      console.log(`\nLooking up ${ip}...`);
      const result = await getIPInfo(ip);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`Failed to lookup ${ip}:`, error);
    }
  }
};

// Test DNS lookup
export const testDNSLookup = async () => {
  console.log('\n=== Testing DNS Lookup ===');
  
  const testDomains = ['google.com', 'github.com', 'stackoverflow.com', 'nonexistent-domain-12345.com'];
  
  for (const domain of testDomains) {
    try {
      console.log(`\nDNS lookup for ${domain}...`);
      const result = await performDNSLookup(domain);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`Failed DNS lookup for ${domain}:`, error);
    }
  }
};

// Test reverse DNS lookup
export const testReverseDNSLookup = async () => {
  console.log('\n=== Testing Reverse DNS Lookup ===');
  
  const testIPs = ['8.8.8.8', '1.1.1.1'];
  
  for (const ip of testIPs) {
    try {
      console.log(`\nReverse DNS lookup for ${ip}...`);
      const result = await performReverseDNSLookup(ip);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`Failed reverse DNS lookup for ${ip}:`, error);
    }
  }
};

// Test getting current public IP
export const testCurrentIP = async () => {
  console.log('\n=== Testing Current IP Lookup ===');
  
  try {
    const ip = await getCurrentUserIP();
    console.log(`Current public IP: ${ip}`);
    
    // Get detailed info about current IP
    const info = await getIPInfo(ip);
    console.log('Current IP info:', JSON.stringify(info, null, 2));
  } catch (error) {
    console.error('Failed to get current IP:', error);
  }
};

// Run all tests
export const runAllTests = async () => {
  console.log('🧪 Starting IP & DNS Lookup Tests...\n');
  
  testIPValidation();
  await testIPLookup();
  await testDNSLookup();
  await testReverseDNSLookup();
  await testCurrentIP();
  
  console.log('\n✅ All tests completed!');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).ipDnsTests = {
    testIPValidation,
    testIPLookup,
    testDNSLookup,
    testReverseDNSLookup,
    testCurrentIP,
    runAllTests
  };
  
  console.log('IP & DNS test functions available as window.ipDnsTests');
  console.log('Run window.ipDnsTests.runAllTests() to test all functionality');
}

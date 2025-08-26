// Test script for Email Validation functionality
// This file can be used to test the email validation APIs manually

import { 
  validateEmailWithAPI, 
  validateEmailFormat,
  extractDomain,
  isDisposableEmail,
  isRoleBasedEmail,
  getEmailSuggestion,
  extractEmailsFromText,
  getEmailProviderInfo,
  isMajorEmailProvider
} from './utils/emailValidation';

// Test basic email format validation
export const testEmailFormat = () => {
  console.log('=== Testing Email Format Validation ===');
  
  const testEmails = [
    'valid@example.com',           // Valid
    'user.name@example.com',       // Valid with dot
    'user+tag@example.com',        // Valid with plus
    'user@subdomain.example.com',  // Valid subdomain
    'invalid.email',               // Invalid - no @
    'invalid@',                    // Invalid - no domain
    '@invalid.com',                // Invalid - no local part
    'user@invalid',                // Invalid - no TLD
    'user..name@example.com',      // Invalid - double dots
    'user@.example.com',           // Invalid - dot at start of domain
  ];
  
  testEmails.forEach(email => {
    const isValid = validateEmailFormat(email);
    console.log(`${email}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
  });
};

// Test domain extraction
export const testDomainExtraction = () => {
  console.log('\n=== Testing Domain Extraction ===');
  
  const testEmails = [
    'user@gmail.com',
    'admin@company.co.uk',
    'support@subdomain.example.com',
    'invalid-email'
  ];
  
  testEmails.forEach(email => {
    const domain = extractDomain(email);
    console.log(`${email} → ${domain || 'No domain'}`);
  });
};

// Test disposable email detection
export const testDisposableDetection = () => {
  console.log('\n=== Testing Disposable Email Detection ===');
  
  const testEmails = [
    'user@gmail.com',              // Not disposable
    'test@10minutemail.com',       // Disposable
    'user@guerrillamail.com',      // Disposable
    'admin@company.com',           // Not disposable
    'temp@mailinator.com',         // Disposable
  ];
  
  testEmails.forEach(email => {
    const isDisposable = isDisposableEmail(email);
    console.log(`${email}: ${isDisposable ? '🗑️ Disposable' : '✅ Regular'}`);
  });
};

// Test role-based email detection
export const testRoleBasedDetection = () => {
  console.log('\n=== Testing Role-Based Email Detection ===');
  
  const testEmails = [
    'john.doe@company.com',        // Not role-based
    'admin@company.com',           // Role-based
    'support@company.com',         // Role-based
    'noreply@company.com',         // Role-based
    'sales@company.com',           // Role-based
    'user123@gmail.com',           // Not role-based
  ];
  
  testEmails.forEach(email => {
    const isRole = isRoleBasedEmail(email);
    console.log(`${email}: ${isRole ? '👔 Role-based' : '👤 Personal'}`);
  });
};

// Test email suggestions
export const testEmailSuggestions = () => {
  console.log('\n=== Testing Email Suggestions ===');
  
  const testEmails = [
    'user@gmai.com',               // Should suggest gmail.com
    'user@gmial.com',              // Should suggest gmail.com
    'user@yahoo.co',               // Should suggest yahoo.com
    'user@hotmial.com',            // Should suggest hotmail.com
    'user@outlok.com',             // Should suggest outlook.com
    'user@gmail.com',              // No suggestion needed
  ];
  
  testEmails.forEach(email => {
    const suggestion = getEmailSuggestion(email);
    console.log(`${email}: ${suggestion ? `💡 Suggest: ${suggestion}` : '✅ No suggestion needed'}`);
  });
};

// Test email extraction from text
export const testEmailExtraction = () => {
  console.log('\n=== Testing Email Extraction ===');
  
  const testTexts = [
    'Contact us at support@company.com or sales@company.com',
    'My email is john.doe@gmail.com and my colleague is jane@example.org',
    'Send reports to: admin@system.com, backup@system.com, monitor@system.com',
    'No emails in this text',
    'Email: user@domain.com, Phone: +1234567890, Website: https://example.com'
  ];
  
  testTexts.forEach((text, index) => {
    const emails = extractEmailsFromText(text);
    console.log(`Text ${index + 1}: ${emails.length} emails found`);
    emails.forEach(email => console.log(`  - ${email}`));
  });
};

// Test email provider detection
export const testProviderDetection = () => {
  console.log('\n=== Testing Email Provider Detection ===');
  
  const testEmails = [
    'user@gmail.com',
    'user@yahoo.com',
    'user@hotmail.com',
    'user@outlook.com',
    'user@protonmail.com',
    'user@company.com',
    'user@university.edu'
  ];
  
  testEmails.forEach(email => {
    const provider = getEmailProviderInfo(email);
    const isMajor = isMajorEmailProvider(extractDomain(email));
    console.log(`${email}: ${provider.name} (${provider.type}) ${isMajor ? '🌟 Major' : '🏢 Custom'}`);
  });
};

// Test full email validation with API
export const testEmailValidation = async () => {
  console.log('\n=== Testing Full Email Validation ===');
  
  const testEmails = [
    'test@gmail.com',              // Valid major provider
    'admin@nonexistent-domain-12345.com', // Invalid domain
    'user@10minutemail.com',       // Disposable
    'support@github.com',          // Valid but role-based
    'user@gmai.com',               // Typo in domain
  ];
  
  for (const email of testEmails) {
    try {
      console.log(`\nValidating ${email}...`);
      const result = await validateEmailWithAPI(email);
      
      console.log(`  Valid: ${result.isValid ? '✅' : '❌'}`);
      console.log(`  Domain: ${result.domain}`);
      console.log(`  Disposable: ${result.isDisposable ? '🗑️ Yes' : '✅ No'}`);
      console.log(`  Role Account: ${result.isRoleAccount ? '👔 Yes' : '👤 No'}`);
      
      if (result.isDeliverable !== undefined) {
        console.log(`  Deliverable: ${result.isDeliverable ? '✅' : '❌'}`);
      }
      
      if (result.confidence) {
        console.log(`  Confidence: ${result.confidence}%`);
      }
      
      if (result.suggestion) {
        console.log(`  Suggestion: 💡 ${result.suggestion}`);
      }
      
      if (result.mxRecords && result.mxRecords.length > 0) {
        console.log(`  MX Records: ${result.mxRecords.join(', ')}`);
      }
      
      if (result.reason || result.error) {
        console.log(`  Reason: ${result.reason || result.error}`);
      }
      
    } catch (error) {
      console.error(`Failed to validate ${email}:`, error);
    }
  }
};

// Run all tests
export const runAllEmailTests = async () => {
  console.log('📧 Starting Email Validation Tests...\n');
  
  testEmailFormat();
  testDomainExtraction();
  testDisposableDetection();
  testRoleBasedDetection();
  testEmailSuggestions();
  testEmailExtraction();
  testProviderDetection();
  await testEmailValidation();
  
  console.log('\n✅ All email validation tests completed!');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).emailTests = {
    testEmailFormat,
    testDomainExtraction,
    testDisposableDetection,
    testRoleBasedDetection,
    testEmailSuggestions,
    testEmailExtraction,
    testProviderDetection,
    testEmailValidation,
    runAllEmailTests
  };
  
  console.log('Email validation test functions available as window.emailTests');
  console.log('Run window.emailTests.runAllEmailTests() to test all functionality');
}

import { useState } from 'react';
import { Mail, Check, X, AlertTriangle, Shield, Upload, Download, Loader2, Search, AlertCircle, Clock } from 'lucide-react';
import { 
  validateEmailWithAPI, 
  validateEmailList,
  extractEmailsFromText,
  getEmailProviderInfo,
  isMajorEmailProvider,
  checkEmailBreaches,
  EmailValidationResult,
  BreachCheckResult 
} from '../utils/emailValidation';
import ToolCard from './ToolCard';
import CopyButton from './CopyButton';

const EmailValidatorTools = () => {
  const [singleEmail, setSingleEmail] = useState('');
  const [singleResult, setSingleResult] = useState<EmailValidationResult | null>(null);
  const [singleLoading, setSingleLoading] = useState(false);
  const [breachCheckResult, setBreachCheckResult] = useState<BreachCheckResult | null>(null);
  const [isCheckingBreaches, setIsCheckingBreaches] = useState(false);

  const [bulkEmails, setBulkEmails] = useState('');
  const [bulkResults, setBulkResults] = useState<EmailValidationResult[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const [extractText, setExtractText] = useState('');
  const [extractedEmails, setExtractedEmails] = useState<string[]>([]);
  const [extractResults, setExtractResults] = useState<EmailValidationResult[]>([]);
  const [extractLoading, setExtractLoading] = useState(false);

  const handleSingleValidation = async () => {
    if (!singleEmail.trim()) return;
    
    setSingleLoading(true);
    setBreachCheckResult(null);
    try {
      const result = await validateEmailWithAPI(singleEmail.trim());
      setSingleResult(result);
      
      // If email validation is successful, check for breaches
      if (result.isValid) {
        setIsCheckingBreaches(true);
        try {
          const breachResult = await checkEmailBreaches(singleEmail.trim());
          setBreachCheckResult(breachResult);
        } catch (breachError) {
          console.error('Breach check failed:', breachError);
        } finally {
          setIsCheckingBreaches(false);
        }
      }
    } catch (error) {
      setSingleResult({
        email: singleEmail,
        isValid: false,
        error: error instanceof Error ? error.message : 'Validation failed',
        timestamp: new Date().toISOString()
      });
    } finally {
      setSingleLoading(false);
    }
  };

  const handleBulkValidation = async () => {
    if (!bulkEmails.trim()) return;
    
    setBulkLoading(true);
    try {
      const results = await validateEmailList(bulkEmails);
      setBulkResults(results);
    } catch (error) {
      setBulkResults([]);
    } finally {
      setBulkLoading(false);
    }
  };

  const handleExtractEmails = () => {
    if (!extractText.trim()) return;
    
    const emails = extractEmailsFromText(extractText);
    setExtractedEmails(emails);
  };

  const handleValidateExtracted = async () => {
    if (extractedEmails.length === 0) return;
    
    setExtractLoading(true);
    try {
      const results = await validateEmailList(extractedEmails.join('\n'));
      setExtractResults(results);
    } catch (error) {
      setExtractResults([]);
    } finally {
      setExtractLoading(false);
    }
  };

  const getValidationIcon = (result: EmailValidationResult) => {
    if (result.isValid) {
      return <Check className="w-4 h-4 text-green-600" />;
    } else {
      return <X className="w-4 h-4 text-red-600" />;
    }
  };

  const getValidationColor = (result: EmailValidationResult) => {
    if (result.isValid) {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  const exportResults = (results: EmailValidationResult[]) => {
    const csv = [
      'Email,Valid,Deliverable,Disposable,Role Account,Confidence,Reason,Domain,Provider',
      ...results.map(r => {
        const provider = r.domain ? getEmailProviderInfo(r.email) : { name: 'Unknown', type: 'unknown' };
        return [
          r.email,
          r.isValid,
          r.isDeliverable || '',
          r.isDisposable || '',
          r.isRoleAccount || '',
          r.confidence || '',
          r.reason || r.error || '',
          r.domain || '',
          provider.name
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-validation-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Validator Tools</h2>
        <p className="text-gray-600">Validate email addresses, check deliverability, and detect disposable emails</p>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Uses multiple validation methods including DNS MX record checks and API validation. 
            Some APIs may have rate limits for free usage.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Email Validation */}
        <ToolCard 
          title="Single Email Validation" 
          description="Validate individual email addresses with detailed analysis"
          icon={<Mail className="w-5 h-5" />}
          color="blue"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={singleEmail}
                onChange={(e) => setSingleEmail(e.target.value)}
                placeholder="e.g., user@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSingleValidation()}
              />
            </div>
            <button
              onClick={handleSingleValidation}
              disabled={singleLoading || !singleEmail.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {singleLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Validate Email
            </button>
            
            {singleResult && (
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Validation Result</h4>
                  <div className="flex items-center space-x-2">
                    {getValidationIcon(singleResult)}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getValidationColor(singleResult)}`}>
                      {singleResult.isValid ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-mono flex items-center">
                      {singleResult.email}
                      <CopyButton text={singleResult.email} />
                    </span>
                  </div>
                  
                  {singleResult.domain && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domain:</span>
                      <span>{singleResult.domain}</span>
                    </div>
                  )}
                  
                  {singleResult.domain && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider:</span>
                      <span className="flex items-center">
                        {getEmailProviderInfo(singleResult.email).name}
                        {isMajorEmailProvider(singleResult.domain) && (
                          <Shield className="w-3 h-3 ml-1 text-green-600" />
                        )}
                      </span>
                    </div>
                  )}
                  
                  {singleResult.isDeliverable !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deliverable:</span>
                      <span className={singleResult.isDeliverable ? 'text-green-600' : 'text-red-600'}>
                        {singleResult.isDeliverable ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                  
                  {singleResult.isDisposable !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disposable:</span>
                      <span className={singleResult.isDisposable ? 'text-red-600' : 'text-green-600'}>
                        {singleResult.isDisposable ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                  
                  {singleResult.isRoleAccount !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Role Account:</span>
                      <span className={singleResult.isRoleAccount ? 'text-orange-600' : 'text-green-600'}>
                        {singleResult.isRoleAccount ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                  
                  {singleResult.confidence !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence:</span>
                      <span>{singleResult.confidence}%</span>
                    </div>
                  )}
                  
                  {singleResult.mxRecords && singleResult.mxRecords.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-gray-600">MX Records:</span>
                      <div className="bg-white p-2 rounded border text-xs font-mono">
                        {singleResult.mxRecords.map((mx, index) => (
                          <div key={index}>{mx}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {singleResult.suggestion && (
                    <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                      <div className="flex items-center space-x-1 text-yellow-800">
                        <AlertTriangle className="w-3 h-3" />
                        <span className="text-xs font-medium">Did you mean:</span>
                      </div>
                      <div className="font-mono text-sm text-yellow-900 flex items-center">
                        {singleResult.suggestion}
                        <CopyButton text={singleResult.suggestion} />
                      </div>
                    </div>
                  )}
                  
                  {(singleResult.reason || singleResult.error) && (
                    <div className="text-red-600 text-xs">
                      {singleResult.reason || singleResult.error}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Breach Check Status */}
            {isCheckingBreaches && (
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-blue-800 font-medium">Checking for data breaches...</span>
                </div>
              </div>
            )}

            {/* Breach Check Results */}
            {breachCheckResult && (
              <div className={`p-4 rounded-md ${
                breachCheckResult.isBreached 
                  ? 'bg-red-50 border border-red-200' 
                  : 'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Check
                  </h4>
                  <div className="flex items-center space-x-2">
                    {breachCheckResult.isBreached ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      breachCheckResult.isBreached 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {breachCheckResult.isBreached ? 'Breached' : 'Safe'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Level:</span>
                    <span className={`font-medium ${
                      breachCheckResult.riskLevel === 'high' ? 'text-red-600' :
                      breachCheckResult.riskLevel === 'medium' ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {breachCheckResult.riskLevel.charAt(0).toUpperCase() + breachCheckResult.riskLevel.slice(1)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Breaches:</span>
                    <span className="font-medium">{breachCheckResult.breachCount}</span>
                  </div>

                  {breachCheckResult.breaches && breachCheckResult.breaches.length > 0 && (
                    <div className="mt-3">
                      <span className="text-gray-600 text-sm font-medium">Known Breaches:</span>
                      <div className="mt-2 space-y-2">
                        {breachCheckResult.breaches.slice(0, 3).map((breach, index) => (
                          <div key={index} className="bg-white p-2 rounded border">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-900">{breach.name}</div>
                                <div className="text-xs text-gray-600 flex items-center mt-1">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {new Date(breach.breachDate).toLocaleDateString()}
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs ${
                                breach.pwnCount > 1000000 ? 'bg-red-100 text-red-800' :
                                breach.pwnCount > 100000 ? 'bg-orange-100 text-orange-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {breach.pwnCount > 1000000 ? 'High' : breach.pwnCount > 100000 ? 'Medium' : 'Low'}
                              </span>
                            </div>
                            {breach.dataClasses && breach.dataClasses.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs text-gray-600">Compromised data:</div>
                                <div className="text-xs text-gray-800 mt-1">
                                  {breach.dataClasses.slice(0, 4).join(', ')}
                                  {breach.dataClasses.length > 4 && ` +${breach.dataClasses.length - 4} more`}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {breachCheckResult.breaches.length > 3 && (
                          <div className="text-xs text-gray-600 text-center">
                            +{breachCheckResult.breaches.length - 3} more breaches found
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {breachCheckResult.isBreached && (
                    <div className="mt-3 p-3 bg-red-100 rounded border border-red-200">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div className="text-red-800 text-xs">
                          <div className="font-medium mb-1">Security Recommendation:</div>
                          <div>This email address has been found in {breachCheckResult.breachCount} data breach{breachCheckResult.breachCount > 1 ? 'es' : ''}. 
                          Consider changing passwords for accounts associated with this email and enable two-factor authentication where possible.</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Bulk Email Validation */}
        <ToolCard 
          title="Bulk Email Validation" 
          description="Validate multiple email addresses at once"
          icon={<Upload className="w-5 h-5" />}
          color="green"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Addresses (one per line)
              </label>
              <textarea
                value={bulkEmails}
                onChange={(e) => setBulkEmails(e.target.value)}
                placeholder="user1@example.com&#10;user2@example.com&#10;user3@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={6}
              />
              <div className="text-xs text-gray-500 mt-1">
                {bulkEmails.split('\n').filter(line => line.trim() && line.includes('@')).length} emails detected
              </div>
            </div>
            <button
              onClick={handleBulkValidation}
              disabled={bulkLoading || !bulkEmails.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {bulkLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Validate All
            </button>
            
            {bulkResults.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">Bulk Results</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {bulkResults.filter(r => r.isValid).length}/{bulkResults.length} valid
                    </span>
                    <button
                      onClick={() => exportResults(bulkResults)}
                      className="text-green-600 hover:text-green-700 p-1"
                      title="Export as CSV"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {bulkResults.map((result, index) => (
                    <div key={index} className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {getValidationIcon(result)}
                            <span className="font-mono text-sm truncate">{result.email}</span>
                            <CopyButton text={result.email} />
                          </div>
                          <div className="flex items-center space-x-2 text-xs">
                            <span className={`px-2 py-1 rounded font-medium ${getValidationColor(result)}`}>
                              {result.isValid ? 'Valid' : 'Invalid'}
                            </span>
                            {result.isDisposable && (
                              <span className="px-2 py-1 rounded bg-red-100 text-red-800 font-medium">
                                Disposable
                              </span>
                            )}
                            {result.isRoleAccount && (
                              <span className="px-2 py-1 rounded bg-orange-100 text-orange-800 font-medium">
                                Role
                              </span>
                            )}
                            {result.confidence && (
                              <span className="text-gray-500">
                                {result.confidence}%
                              </span>
                            )}
                          </div>
                          {(result.reason || result.error) && (
                            <div className="text-xs text-red-600 mt-1">
                              {result.reason || result.error}
                            </div>
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

        {/* Email Extractor */}
        <div className="lg:col-span-2">
          <ToolCard 
            title="Email Extractor & Validator" 
            description="Extract email addresses from text and validate them"
            icon={<Search className="w-5 h-5" />}
            color="purple"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Text Content
                </label>
                <textarea
                  value={extractText}
                  onChange={(e) => setExtractText(e.target.value)}
                  placeholder="Paste any text containing email addresses here... Emails will be automatically extracted."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleExtractEmails}
                  disabled={!extractText.trim()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Extract Emails
                </button>
                
                {extractedEmails.length > 0 && (
                  <button
                    onClick={handleValidateExtracted}
                    disabled={extractLoading}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
                  >
                    {extractLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Validate Extracted
                  </button>
                )}
              </div>
              
              {extractedEmails.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Extracted Emails ({extractedEmails.length})
                  </h4>
                  <div className="bg-white p-3 rounded border max-h-32 overflow-y-auto">
                    <div className="text-sm font-mono space-y-1">
                      {extractedEmails.map((email, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{email}</span>
                          <CopyButton text={email} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {extractResults.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-900">Validation Results</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {extractResults.filter(r => r.isValid).length}/{extractResults.length} valid
                      </span>
                      <button
                        onClick={() => exportResults(extractResults)}
                        className="text-purple-600 hover:text-purple-700 p-1"
                        title="Export as CSV"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {extractResults.map((result, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="flex items-center space-x-2 mb-1">
                          {getValidationIcon(result)}
                          <span className="font-mono text-sm truncate">{result.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                          <span className={`px-2 py-1 rounded font-medium ${getValidationColor(result)}`}>
                            {result.isValid ? 'Valid' : 'Invalid'}
                          </span>
                          {result.isDisposable && (
                            <span className="px-1 py-0.5 rounded bg-red-100 text-red-800 text-xs">
                              Disposable
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ToolCard>
        </div>
      </div>
    </div>
  );
};

export default EmailValidatorTools;

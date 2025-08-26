import React, { useState } from 'react';
import { Hash, Key, Lock, Eye, Copy, RefreshCw } from 'lucide-react';
import { generateHash, encodeBase64, decodeBase64, generatePassword, encryptText, decryptText } from '../utils/crypto';
import ToolCard from './ToolCard';
import CopyButton from './CopyButton';

const CryptoTools = () => {
  const [hashInput, setHashInput] = useState('');
  const [hashType, setHashType] = useState<'md5' | 'sha1' | 'sha256'>('sha256');
  const [hashOutput, setHashOutput] = useState('');

  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');

  const [passwordLength, setPasswordLength] = useState(16);
  const [passwordOptions, setPasswordOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });
  const [generatedPassword, setGeneratedPassword] = useState('');

  const [encryptInput, setEncryptInput] = useState('');
  const [encryptKey, setEncryptKey] = useState('');
  const [encryptOutput, setEncryptOutput] = useState('');
  const [encryptMode, setEncryptMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleHashGenerate = async () => {
    if (!hashInput.trim()) return;
    const result = await generateHash(hashInput, hashType);
    setHashOutput(result);
  };

  const handleBase64Process = () => {
    if (!base64Input.trim()) return;
    try {
      const result = base64Mode === 'encode' 
        ? encodeBase64(base64Input)
        : decodeBase64(base64Input);
      setBase64Output(result);
    } catch (error) {
      setBase64Output('Error: Invalid input for decoding');
    }
  };

  const handlePasswordGenerate = () => {
    const password = generatePassword(passwordLength, passwordOptions);
    setGeneratedPassword(password);
  };

  const handleEncryption = () => {
    if (!encryptInput.trim() || !encryptKey.trim()) return;
    try {
      const result = encryptMode === 'encrypt'
        ? encryptText(encryptInput, encryptKey)
        : decryptText(encryptInput, encryptKey);
      setEncryptOutput(result);
    } catch (error) {
      setEncryptOutput('Error: Invalid input or key');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cryptography Tools</h2>
        <p className="text-gray-600">Essential tools for hashing, encoding, and encryption</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hash Generator */}
        <ToolCard 
          title="Hash Generator" 
          description="Generate MD5, SHA-1, or SHA-256 hashes"
          icon={<Hash className="w-5 h-5" />}
          color="blue"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hash Type
              </label>
              <select
                value={hashType}
                onChange={(e) => setHashType(e.target.value as 'md5' | 'sha1' | 'sha256')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="md5">MD5</option>
                <option value="sha1">SHA-1</option>
                <option value="sha256">SHA-256</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                placeholder="Enter text to hash..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <button
              onClick={handleHashGenerate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Generate Hash
            </button>
            {hashOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    {hashType.toUpperCase()} Hash
                  </label>
                  <CopyButton text={hashOutput} />
                </div>
                <code className="text-sm text-gray-800 break-all">{hashOutput}</code>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Base64 Encoder/Decoder */}
        <ToolCard 
          title="Base64 Encoder/Decoder" 
          description="Encode or decode Base64 strings"
          icon={<Key className="w-5 h-5" />}
          color="blue"
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
                    checked={base64Mode === 'encode'}
                    onChange={(e) => setBase64Mode(e.target.value as 'encode')}
                    className="mr-2"
                  />
                  Encode
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="decode"
                    checked={base64Mode === 'decode'}
                    onChange={(e) => setBase64Mode(e.target.value as 'decode')}
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
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                placeholder={base64Mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <button
              onClick={handleBase64Process}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {base64Mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
            {base64Output && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Output
                  </label>
                  <CopyButton text={base64Output} />
                </div>
                <code className="text-sm text-gray-800 break-all">{base64Output}</code>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Password Generator */}
        <ToolCard 
          title="Password Generator" 
          description="Generate secure passwords with custom options"
          icon={<Lock className="w-5 h-5" />}
          color="blue"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length: {passwordLength}
              </label>
              <input
                type="range"
                min="4"
                max="64"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={passwordOptions.uppercase}
                  onChange={(e) => setPasswordOptions({...passwordOptions, uppercase: e.target.checked})}
                  className="mr-2"
                />
                Uppercase
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={passwordOptions.lowercase}
                  onChange={(e) => setPasswordOptions({...passwordOptions, lowercase: e.target.checked})}
                  className="mr-2"
                />
                Lowercase
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={passwordOptions.numbers}
                  onChange={(e) => setPasswordOptions({...passwordOptions, numbers: e.target.checked})}
                  className="mr-2"
                />
                Numbers
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={passwordOptions.symbols}
                  onChange={(e) => setPasswordOptions({...passwordOptions, symbols: e.target.checked})}
                  className="mr-2"
                />
                Symbols
              </label>
            </div>
            <button
              onClick={handlePasswordGenerate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Generate Password</span>
            </button>
            {generatedPassword && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Generated Password
                  </label>
                  <CopyButton text={generatedPassword} />
                </div>
                <code className="text-sm text-gray-800 break-all font-mono">{generatedPassword}</code>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Text Encryption/Decryption */}
        <ToolCard 
          title="Text Encryption" 
          description="Simple text encryption using AES algorithm"
          icon={<Eye className="w-5 h-5" />}
          color="blue"
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
                    value="encrypt"
                    checked={encryptMode === 'encrypt'}
                    onChange={(e) => setEncryptMode(e.target.value as 'encrypt')}
                    className="mr-2"
                  />
                  Encrypt
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="decrypt"
                    checked={encryptMode === 'decrypt'}
                    onChange={(e) => setEncryptMode(e.target.value as 'decrypt')}
                    className="mr-2"
                  />
                  Decrypt
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <input
                type="text"
                value={encryptKey}
                onChange={(e) => setEncryptKey(e.target.value)}
                placeholder="Enter encryption key..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                value={encryptInput}
                onChange={(e) => setEncryptInput(e.target.value)}
                placeholder={encryptMode === 'encrypt' ? 'Enter text to encrypt...' : 'Enter encrypted text...'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <button
              onClick={handleEncryption}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {encryptMode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
            </button>
            {encryptOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Output
                  </label>
                  <CopyButton text={encryptOutput} />
                </div>
                <code className="text-sm text-gray-800 break-all">{encryptOutput}</code>
              </div>
            )}
          </div>
        </ToolCard>
      </div>
    </div>
  );
};

export default CryptoTools;
// Crypto utilities for educational purposes

export const generateHash = async (input: string, type: 'md5' | 'sha1' | 'sha256'): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  let algorithm: string;
  switch (type) {
    case 'md5':
      // MD5 is not available in Web Crypto API, using a simple alternative
      return await simpleMD5(input);
    case 'sha1':
      algorithm = 'SHA-1';
      break;
    case 'sha256':
      algorithm = 'SHA-256';
      break;
    default:
      algorithm = 'SHA-256';
  }
  
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Simple MD5 implementation for educational purposes
const simpleMD5 = async (input: string): Promise<string> => {
  // This is a simplified hash for demonstration
  // In production, use a proper MD5 library
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
};

export const encodeBase64 = (input: string): string => {
  return btoa(unescape(encodeURIComponent(input)));
};

export const decodeBase64 = (input: string): string => {
  return decodeURIComponent(escape(atob(input)));
};

export const generatePassword = (
  length: number, 
  options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }
): string => {
  let charset = '';
  if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) charset += '0123456789';
  if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';
  
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
};

// Simple text encryption using Caesar cipher for educational purposes
export const encryptText = (text: string, key: string): string => {
  const shift = key.length % 26;
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    }
    return char;
  }).join('');
};

export const decryptText = (text: string, key: string): string => {
  const shift = key.length % 26;
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base - shift + 26) % 26) + base);
    }
    return char;
  }).join('');
};
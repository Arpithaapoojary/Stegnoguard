// Web development utilities

export const formatJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

export const minifyJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

export const formatHTML = (htmlString: string): string => {
  // Simple HTML formatter
  let formatted = htmlString;
  let indent = 0;
  const indentSize = 2;
  
  // Remove extra whitespace
  formatted = formatted.replace(/>\s+</g, '><');
  
  // Add line breaks and indentation
  formatted = formatted.replace(/(<\/?[^>]+>)/g, (match) => {
    const isClosingTag = match.startsWith('</');
    const isSelfClosing = match.endsWith('/>') || 
      ['<br>', '<hr>', '<img', '<input', '<meta', '<link'].some(tag => match.startsWith(tag));
    
    if (isClosingTag) {
      indent -= indentSize;
    }
    
    const indentStr = ' '.repeat(Math.max(0, indent));
    
    if (!isClosingTag && !isSelfClosing) {
      indent += indentSize;
    }
    
    return '\n' + indentStr + match;
  });
  
  return formatted.trim();
};

export const minifyHTML = (htmlString: string): string => {
  return htmlString
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
};

export const formatCSS = (cssString: string): string => {
  let formatted = cssString;
  
  // Add line breaks after braces and semicolons
  formatted = formatted.replace(/\{/g, ' {\n  ');
  formatted = formatted.replace(/\}/g, '\n}\n');
  formatted = formatted.replace(/;/g, ';\n  ');
  formatted = formatted.replace(/,/g, ',\n');
  
  // Clean up extra whitespace
  formatted = formatted.replace(/\s+/g, ' ');
  formatted = formatted.replace(/\n\s*\n/g, '\n');
  
  return formatted.trim();
};

export const minifyCSS = (cssString: string): string => {
  return cssString
    .replace(/\s+/g, ' ')
    .replace(/;\s*}/g, '}')
    .replace(/\s*{\s*/g, '{')
    .replace(/;\s*/g, ';')
    .replace(/,\s*/g, ',')
    .trim();
};

export const generateLoremIpsum = (count: number, type: 'paragraphs' | 'sentences' | 'words'): string => {
  const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const getRandomWords = (num: number): string[] => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(words[Math.floor(Math.random() * words.length)]);
    }
    return result;
  };

  const generateSentence = (): string => {
    const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words
    const sentenceWords = getRandomWords(wordCount);
    sentenceWords[0] = sentenceWords[0].charAt(0).toUpperCase() + sentenceWords[0].slice(1);
    return sentenceWords.join(' ') + '.';
  };

  const generateParagraph = (): string => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  switch (type) {
    case 'words':
      return getRandomWords(count).join(' ');
    case 'sentences':
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      return sentences.join(' ');
    case 'paragraphs':
    default:
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      return paragraphs.join('\n\n');
  }
};

export const convertColor = (color: string) => {
  // Convert hex to RGB and HSL
  const hex = color.startsWith('#') ? color : '#' + color;
  
  // Parse hex
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Convert to HSL
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const diff = max - min;
  
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / diff + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / diff + 4) / 6;
        break;
    }
  }
  
  return {
    hex: hex.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  };
};

export const generateGradient = (color1: string, color2: string, direction: string): string => {
  return `background: linear-gradient(${direction}, ${color1}, ${color2});`;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  if (!isValid) {
    return {
      isValid: false,
      error: 'Invalid email format'
    };
  }
  
  const [username, domain] = email.split('@');
  
  return {
    isValid: true,
    username,
    domain,
    error: null
  };
};

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  const minutes = Math.floor(words / wordsPerMinute);
  const seconds = Math.round((words % wordsPerMinute) / wordsPerMinute * 60);
  
  return {
    words,
    characters,
    charactersNoSpaces,
    minutes,
    seconds,
    totalSeconds: minutes * 60 + seconds
  };
};
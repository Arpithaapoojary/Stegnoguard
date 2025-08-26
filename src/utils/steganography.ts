// Steganography utilities for educational purposes

export const hideTextInImage = async (imageFile: File, text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Convert text to binary
        const binaryText = text.split('').map(char => 
          char.charCodeAt(0).toString(2).padStart(8, '0')
        ).join('') + '1111111111111110'; // End marker
        
        let binaryIndex = 0;
        
        // Hide text in LSB of red channel
        for (let i = 0; i < data.length && binaryIndex < binaryText.length; i += 4) {
          if (binaryIndex < binaryText.length) {
            // Modify LSB of red channel
            data[i] = (data[i] & 0xFE) | parseInt(binaryText[binaryIndex]);
            binaryIndex++;
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(imageFile);
  });
};

export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let binaryText = '';
        const endMarker = '1111111111111110';
        
        // Extract LSB from red channel
        for (let i = 0; i < data.length; i += 4) {
          binaryText += (data[i] & 1).toString();
          
          // Check for end marker
          if (binaryText.length >= endMarker.length && 
              binaryText.slice(-endMarker.length) === endMarker) {
            break;
          }
        }
        
        // Remove end marker
        binaryText = binaryText.slice(0, -endMarker.length);
        
        // Convert binary to text
        let text = '';
        for (let i = 0; i < binaryText.length; i += 8) {
          const byte = binaryText.slice(i, i + 8);
          if (byte.length === 8) {
            const charCode = parseInt(byte, 2);
            if (charCode === 0) break; // Null terminator
            text += String.fromCharCode(charCode);
          }
        }
        
        resolve(text || 'No hidden text found');
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(imageFile);
  });
};

export const generateSteganographyPattern = (text: string): string => {
  // Convert text to binary pattern for educational visualization
  return text.split('').map(char => {
    const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
    return `${char}: ${binary}`;
  }).join('\n');
};

// Educational helper to show how LSB works
export const demonstrateLSB = (pixelValue: number, bit: number): { original: string, modified: string, change: string } => {
  const original = pixelValue.toString(2).padStart(8, '0');
  const modified = ((pixelValue & 0xFE) | bit).toString(2).padStart(8, '0');
  const change = Math.abs(pixelValue - ((pixelValue & 0xFE) | bit));
  
  return {
    original: `${pixelValue} (${original})`,
    modified: `${(pixelValue & 0xFE) | bit} (${modified})`,
    change: `Change: ±${change}`
  };
};
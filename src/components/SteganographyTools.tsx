import React, { useState, useRef } from 'react';
import { Image, Eye, EyeOff, Upload, Download, AlertCircle } from 'lucide-react';
import { hideTextInImage, extractTextFromImage, generateSteganographyPattern } from '../utils/steganography';
import ToolCard from './ToolCard';
import CopyButton from './CopyButton';

const SteganographyTools = () => {
  const [hideText, setHideText] = useState('');
  const [hideImage, setHideImage] = useState<File | null>(null);
  const [hideImagePreview, setHideImagePreview] = useState<string>('');
  const [hiddenImageResult, setHiddenImageResult] = useState<string>('');

  const [extractImage, setExtractImage] = useState<File | null>(null);
  const [extractImagePreview, setExtractImagePreview] = useState<string>('');
  const [extractedText, setExtractedText] = useState('');

  const [patternText, setPatternText] = useState('');
  const [patternResult, setPatternResult] = useState('');

  const hideFileInputRef = useRef<HTMLInputElement>(null);
  const extractFileInputRef = useRef<HTMLInputElement>(null);

  const handleHideImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setHideImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setHideImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtractImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setExtractImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setExtractImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHideText = async () => {
    if (!hideText.trim() || !hideImage) {
      return;
    }

    try {
      const result = await hideTextInImage(hideImage, hideText);
      setHiddenImageResult(result);
    } catch (error) {
      console.error('Error hiding text:', error);
    }
  };

  const handleExtractText = async () => {
    if (!extractImage) {
      return;
    }

    try {
      const result = await extractTextFromImage(extractImage);
      setExtractedText(result);
    } catch (error) {
      console.error('Error extracting text:', error);
      setExtractedText('No hidden text found or error occurred');
    }
  };

  const handleGeneratePattern = () => {
    if (!patternText.trim()) return;
    const pattern = generateSteganographyPattern(patternText);
    setPatternResult(pattern);
  };

  const downloadImage = () => {
    if (!hiddenImageResult) return;
    
    const link = document.createElement('a');
    link.download = 'steganography-result.png';
    link.href = hiddenImageResult;
    link.click();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Steganography Tools</h2>
        <p className="text-gray-600">Hide and extract secret messages in images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hide Text in Image */}
        <ToolCard 
          title="Hide Text in Image" 
          description="Embed secret text messages within image files"
          icon={<EyeOff className="w-5 h-5" />}
          color="purple"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Message
              </label>
              <textarea
                value={hideText}
                onChange={(e) => setHideText(e.target.value)}
                placeholder="Enter the text you want to hide..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <input
                type="file"
                ref={hideFileInputRef}
                onChange={handleHideImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => hideFileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-purple-400 transition-colors"
              >
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600">Click to select image</span>
              </button>
            </div>

            {hideImagePreview && (
              <div className="text-center">
                <img 
                  src={hideImagePreview} 
                  alt="Cover" 
                  className="max-w-full h-32 object-contain mx-auto rounded border"
                />
              </div>
            )}

            <button
              onClick={handleHideText}
              disabled={!hideText.trim() || !hideImage}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Hide Text in Image
            </button>

            {hiddenImageResult && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Result Image
                  </label>
                  <button
                    onClick={downloadImage}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
                <img 
                  src={hiddenImageResult} 
                  alt="Result" 
                  className="max-w-full h-32 object-contain mx-auto rounded border"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Image with hidden text (visually identical to original)
                </p>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Extract Text from Image */}
        <ToolCard 
          title="Extract Hidden Text" 
          description="Reveal secret messages hidden in images"
          icon={<Eye className="w-5 h-5" />}
          color="purple"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image with Hidden Text
              </label>
              <input
                type="file"
                ref={extractFileInputRef}
                onChange={handleExtractImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => extractFileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-purple-400 transition-colors"
              >
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-600">Click to select image</span>
              </button>
            </div>

            {extractImagePreview && (
              <div className="text-center">
                <img 
                  src={extractImagePreview} 
                  alt="Extract from" 
                  className="max-w-full h-32 object-contain mx-auto rounded border"
                />
              </div>
            )}

            <button
              onClick={handleExtractText}
              disabled={!extractImage}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Extract Hidden Text
            </button>

            {extractedText && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Extracted Message
                  </label>
                  {extractedText !== 'No hidden text found or error occurred' && (
                    <CopyButton text={extractedText} />
                  )}
                </div>
                <div className="text-sm text-gray-800 break-words">
                  {extractedText === 'No hidden text found or error occurred' ? (
                    <div className="flex items-center space-x-2 text-amber-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>{extractedText}</span>
                    </div>
                  ) : (
                    <code className="whitespace-pre-wrap">{extractedText}</code>
                  )}
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Text Pattern Generator */}
        <ToolCard 
          title="Steganography Pattern" 
          description="Generate visual patterns from text for educational purposes"
          icon={<Image className="w-5 h-5" />}
          color="purple"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                value={patternText}
                onChange={(e) => setPatternText(e.target.value)}
                placeholder="Enter text to convert to pattern..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>

            <button
              onClick={handleGeneratePattern}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Generate Pattern
            </button>

            {patternResult && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Binary Pattern
                  </label>
                  <CopyButton text={patternResult} />
                </div>
                <div 
                  className="text-xs font-mono break-all leading-tight"
                  style={{ wordBreak: 'break-all' }}
                >
                  {patternResult}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Each character converted to 8-bit binary representation
                </p>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Educational Info */}
        <ToolCard 
          title="How Steganography Works" 
          description="Learn about the science behind hiding data"
          icon={<AlertCircle className="w-5 h-5" />}
          color="purple"
        >
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">LSB (Least Significant Bit) Method:</h4>
              <p>
                The most common technique modifies the least significant bits of pixel values. 
                Since these changes are minimal, they're invisible to the human eye.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Process:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Convert text to binary</li>
                <li>Replace LSBs of image pixels</li>
                <li>Save modified image</li>
                <li>Extract by reading LSBs</li>
              </ol>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Applications:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Digital watermarking</li>
                <li>Copyright protection</li>
                <li>Secure communication</li>
                <li>Data integrity verification</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-3 rounded border border-amber-200">
              <p className="text-amber-800 text-xs">
                <strong>Note:</strong> This implementation is for educational purposes. 
                Real steganography tools use more sophisticated algorithms.
              </p>
            </div>
          </div>
        </ToolCard>
      </div>
    </div>
  );
};

export default SteganographyTools;
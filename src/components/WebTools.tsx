import React, { useState } from 'react';
import { Code, Palette, FileText, Zap, Globe, Monitor } from 'lucide-react';
import { 
  formatJSON, 
  minifyJSON, 
  formatHTML, 
  minifyHTML, 
  formatCSS, 
  minifyCSS,
  generateLoremIpsum,
  convertColor,
  generateGradient,
  validateEmail,
  generateUUID,
  calculateReadingTime
} from '../utils/web';
import ToolCard from './ToolCard';
import CopyButton from './CopyButton';

const WebTools = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonMode, setJsonMode] = useState<'format' | 'minify'>('format');

  const [htmlInput, setHtmlInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [htmlMode, setHtmlMode] = useState<'format' | 'minify'>('format');

  const [cssInput, setCssInput] = useState('');
  const [cssOutput, setCssOutput] = useState('');
  const [cssMode, setCssMode] = useState<'format' | 'minify'>('format');

  const [loremCount, setLoremCount] = useState(3);
  const [loremType, setLoremType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [loremOutput, setLoremOutput] = useState('');

  const [colorInput, setColorInput] = useState('#ff5733');
  const [colorOutput, setColorOutput] = useState<any>(null);

  const [gradientColor1, setGradientColor1] = useState('#ff5733');
  const [gradientColor2, setGradientColor2] = useState('#33c3ff');
  const [gradientDirection, setGradientDirection] = useState('to right');
  const [gradientOutput, setGradientOutput] = useState('');

  const [emailInput, setEmailInput] = useState('');
  const [emailValidation, setEmailValidation] = useState<any>(null);

  const [uuidOutput, setUuidOutput] = useState('');

  const [readingText, setReadingText] = useState('');
  const [readingTime, setReadingTime] = useState<any>(null);

  const handleJsonProcess = () => {
    if (!jsonInput.trim()) return;
    try {
      const result = jsonMode === 'format' ? formatJSON(jsonInput) : minifyJSON(jsonInput);
      setJsonOutput(result);
    } catch (error) {
      setJsonOutput('Error: Invalid JSON format');
    }
  };

  const handleHtmlProcess = () => {
    if (!htmlInput.trim()) return;
    const result = htmlMode === 'format' ? formatHTML(htmlInput) : minifyHTML(htmlInput);
    setHtmlOutput(result);
  };

  const handleCssProcess = () => {
    if (!cssInput.trim()) return;
    const result = cssMode === 'format' ? formatCSS(cssInput) : minifyCSS(cssInput);
    setCssOutput(result);
  };

  const handleLoremGenerate = () => {
    const result = generateLoremIpsum(loremCount, loremType);
    setLoremOutput(result);
  };

  const handleColorConvert = () => {
    const result = convertColor(colorInput);
    setColorOutput(result);
  };

  const handleGradientGenerate = () => {
    const result = generateGradient(gradientColor1, gradientColor2, gradientDirection);
    setGradientOutput(result);
  };

  const handleEmailValidate = () => {
    if (!emailInput.trim()) return;
    const result = validateEmail(emailInput);
    setEmailValidation(result);
  };

  const handleUuidGenerate = () => {
    const result = generateUUID();
    setUuidOutput(result);
  };

  const handleReadingTimeCalculate = () => {
    if (!readingText.trim()) return;
    const result = calculateReadingTime(readingText);
    setReadingTime(result);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Web Development Tools</h2>
        <p className="text-gray-600">Essential utilities for web developers and designers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* JSON Formatter */}
        <ToolCard 
          title="JSON Formatter" 
          description="Format and minify JSON data"
          icon={<Code className="w-5 h-5" />}
          color="orange"
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
                    value="format"
                    checked={jsonMode === 'format'}
                    onChange={(e) => setJsonMode(e.target.value as 'format')}
                    className="mr-2"
                  />
                  Format
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="minify"
                    checked={jsonMode === 'minify'}
                    onChange={(e) => setJsonMode(e.target.value as 'minify')}
                    className="mr-2"
                  />
                  Minify
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JSON Input
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"name": "John", "age": 30}'
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                rows={4}
              />
            </div>
            <button
              onClick={handleJsonProcess}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {jsonMode === 'format' ? 'Format JSON' : 'Minify JSON'}
            </button>
            {jsonOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Output
                  </label>
                  <CopyButton text={jsonOutput} />
                </div>
                <pre className="text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
                  {jsonOutput}
                </pre>
              </div>
            )}
          </div>
        </ToolCard>

        {/* HTML Formatter */}
        <ToolCard 
          title="HTML Formatter" 
          description="Format and minify HTML code"
          icon={<FileText className="w-5 h-5" />}
          color="orange"
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
                    value="format"
                    checked={htmlMode === 'format'}
                    onChange={(e) => setHtmlMode(e.target.value as 'format')}
                    className="mr-2"
                  />
                  Format
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="minify"
                    checked={htmlMode === 'minify'}
                    onChange={(e) => setHtmlMode(e.target.value as 'minify')}
                    className="mr-2"
                  />
                  Minify
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTML Input
              </label>
              <textarea
                value={htmlInput}
                onChange={(e) => setHtmlInput(e.target.value)}
                placeholder='<div><p>Hello World</p></div>'
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                rows={4}
              />
            </div>
            <button
              onClick={handleHtmlProcess}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {htmlMode === 'format' ? 'Format HTML' : 'Minify HTML'}
            </button>
            {htmlOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Output
                  </label>
                  <CopyButton text={htmlOutput} />
                </div>
                <pre className="text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
                  {htmlOutput}
                </pre>
              </div>
            )}
          </div>
        </ToolCard>

        {/* CSS Formatter */}
        <ToolCard 
          title="CSS Formatter" 
          description="Format and minify CSS code"
          icon={<Palette className="w-5 h-5" />}
          color="orange"
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
                    value="format"
                    checked={cssMode === 'format'}
                    onChange={(e) => setCssMode(e.target.value as 'format')}
                    className="mr-2"
                  />
                  Format
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="minify"
                    checked={cssMode === 'minify'}
                    onChange={(e) => setCssMode(e.target.value as 'minify')}
                    className="mr-2"
                  />
                  Minify
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CSS Input
              </label>
              <textarea
                value={cssInput}
                onChange={(e) => setCssInput(e.target.value)}
                placeholder='.class{color:red;margin:10px;}'
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                rows={4}
              />
            </div>
            <button
              onClick={handleCssProcess}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {cssMode === 'format' ? 'Format CSS' : 'Minify CSS'}
            </button>
            {cssOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Output
                  </label>
                  <CopyButton text={cssOutput} />
                </div>
                <pre className="text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
                  {cssOutput}
                </pre>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Lorem Ipsum Generator */}
        <ToolCard 
          title="Lorem Ipsum Generator" 
          description="Generate placeholder text for designs"
          icon={<FileText className="w-5 h-5" />}
          color="orange"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Count: {loremCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={loremCount}
                  onChange={(e) => setLoremCount(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={loremType}
                  onChange={(e) => setLoremType(e.target.value as 'paragraphs' | 'sentences' | 'words')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="paragraphs">Paragraphs</option>
                  <option value="sentences">Sentences</option>
                  <option value="words">Words</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleLoremGenerate}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Generate Lorem Ipsum
            </button>
            {loremOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Generated Text
                  </label>
                  <CopyButton text={loremOutput} />
                </div>
                <div className="text-sm text-gray-800 max-h-40 overflow-y-auto">
                  {loremOutput}
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Color Converter */}
        <ToolCard 
          title="Color Converter" 
          description="Convert colors between different formats"
          icon={<Palette className="w-5 h-5" />}
          color="orange"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Input
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  placeholder="#ff5733"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <button
              onClick={handleColorConvert}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Convert Color
            </button>
            {colorOutput && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">HEX:</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded">{colorOutput.hex}</code>
                      <CopyButton text={colorOutput.hex} />
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">RGB:</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded">{colorOutput.rgb}</code>
                      <CopyButton text={colorOutput.rgb} />
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">HSL:</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded">{colorOutput.hsl}</code>
                      <CopyButton text={colorOutput.hsl} />
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Preview:</span>
                    <div 
                      className="w-full h-8 rounded border"
                      style={{ backgroundColor: colorOutput.hex }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Gradient Generator */}
        <ToolCard 
          title="CSS Gradient Generator" 
          description="Create beautiful CSS gradients"
          icon={<Zap className="w-5 h-5" />}
          color="orange"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color 1
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={gradientColor1}
                    onChange={(e) => setGradientColor1(e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={gradientColor1}
                    onChange={(e) => setGradientColor1(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color 2
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={gradientColor2}
                    onChange={(e) => setGradientColor2(e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={gradientColor2}
                    onChange={(e) => setGradientColor2(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Direction
              </label>
              <select
                value={gradientDirection}
                onChange={(e) => setGradientDirection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="to right">To Right</option>
                <option value="to left">To Left</option>
                <option value="to bottom">To Bottom</option>
                <option value="to top">To Top</option>
                <option value="to bottom right">To Bottom Right</option>
                <option value="to bottom left">To Bottom Left</option>
                <option value="45deg">45 Degrees</option>
                <option value="90deg">90 Degrees</option>
              </select>
            </div>
            <button
              onClick={handleGradientGenerate}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Generate Gradient
            </button>
            {gradientOutput && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    CSS Code
                  </label>
                  <CopyButton text={gradientOutput} />
                </div>
                <code className="text-xs bg-white p-2 rounded block overflow-x-auto">
                  {gradientOutput}
                </code>
                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Preview
                  </label>
                  <div 
                    className="w-full h-16 rounded border"
                    style={{ background: gradientOutput.replace('background: ', '') }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Email Validator */}
        <ToolCard 
          title="Email Validator" 
          description="Validate email addresses and check format"
          icon={<Globe className="w-5 h-5" />}
          color="orange"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="example@domain.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={handleEmailValidate}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Validate Email
            </button>
            {emailValidation && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Valid:</span>
                    <span className={emailValidation.isValid ? 'text-green-600' : 'text-red-600'}>
                      {emailValidation.isValid ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {emailValidation.isValid && (
                    <>
                      <div className="flex justify-between">
                        <span className="font-medium">Domain:</span>
                        <span>{emailValidation.domain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Username:</span>
                        <span>{emailValidation.username}</span>
                      </div>
                    </>
                  )}
                  {!emailValidation.isValid && (
                    <div className="text-red-600 text-xs">
                      {emailValidation.error}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </ToolCard>

        {/* UUID Generator */}
        <ToolCard 
          title="UUID Generator" 
          description="Generate unique identifiers"
          icon={<Zap className="w-5 h-5" />}
          color="orange"
        >
          <div className="space-y-4">
            <button
              onClick={handleUuidGenerate}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Generate UUID
            </button>
            {uuidOutput && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Generated UUID
                  </label>
                  <CopyButton text={uuidOutput} />
                </div>
                <code className="text-sm text-gray-800 break-all font-mono">
                  {uuidOutput}
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  UUID v4 (Random) - Universally Unique Identifier
                </p>
              </div>
            )}
          </div>
        </ToolCard>

        {/* Reading Time Calculator */}
        <ToolCard 
          title="Reading Time Calculator" 
          description="Calculate estimated reading time for text"
          icon={<Monitor className="w-5 h-5" />}
          color="orange"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                value={readingText}
                onChange={(e) => setReadingText(e.target.value)}
                placeholder="Paste your article or text content here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={5}
              />
            </div>
            <button
              onClick={handleReadingTimeCalculate}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Calculate Reading Time
            </button>
            {readingTime && (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Reading Time:</span>
                    <span className="text-orange-600 font-semibold">
                      {readingTime.minutes} min {readingTime.seconds} sec
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Word Count:</span>
                    <span>{readingTime.words}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Characters:</span>
                    <span>{readingTime.characters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Reading Speed:</span>
                    <span>200 WPM</span>
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

export default WebTools;
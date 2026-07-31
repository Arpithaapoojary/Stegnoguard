# 🛡️ Stegnoguard

**Professional Crypto & Security Toolkit** — A modern web application for cryptography, steganography, and network security utilities.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss)

---

## ✨ Features

### 🔐 Crypto Tools
- **Hash Generator** — Generate MD5, SHA-1, and SHA-256 hashes
- **Base64 Encoder/Decoder** — Encode and decode Base64 strings
- **Password Generator** — Generate secure passwords with custom options (length, uppercase, lowercase, numbers, symbols)
- **Text Encryption** — Encrypt and decrypt text using cipher algorithms

### 🖼️ Steganography
- **Hide Text in Image** — Embed secret messages inside images using LSB (Least Significant Bit) technique
- **Extract Hidden Text** — Reveal hidden messages from steganographic images
- **Pattern Generator** — Generate binary steganography patterns for educational purposes

### 🌐 Web Tools
- **JSON Formatter/Minifier** — Format and minify JSON data
- **HTML Formatter/Minifier** — Format and minify HTML code
- **CSS Formatter/Minifier** — Format and minify CSS stylesheets
- **Lorem Ipsum Generator** — Generate placeholder text (words, sentences, paragraphs)
- **Color Converter** — Convert between HEX, RGB, and HSL color formats
- **UUID Generator** — Generate unique UUIDs
- **Reading Time Calculator** — Calculate reading time for text content

### 🔍 Network Tools
- **IP Address Validator** — Validate IPv4/IPv6 addresses and detect private/public type
- **URL Encoder/Decoder** — Encode and decode URL components
- **QR Code Generator** — Generate ASCII QR codes
- **DNS Lookup Simulator** — Simulate DNS lookups for educational purposes
- **User Agent Parser** — Parse and analyze browser user agent strings

### 🗺️ IP/DNS Lookup
- **IP Geolocation** — Get detailed information about any IP address (city, region, country, ISP)
- **DNS Lookup** — Real DNS lookups using Google and Cloudflare DNS-over-HTTPS
- **Reverse DNS** — Perform reverse DNS lookups
- **Batch IP Lookup** — Look up multiple IP addresses at once
- **Your Public IP** — Detect and display your current public IP

### 📧 Email Validator
- **Email Validation** — Comprehensive email format and domain validation
- **Disposable Email Detection** — Detect temporary/disposable email addresses
- **MX Record Check** — Verify mail server records
- **Breach Detection** — Check if an email has been involved in data breaches

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Arpithaapoojary/Stegnoguard.git

# Navigate to the project
cd Stegnoguard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and go to **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |
| **Web Crypto API** | SHA-1, SHA-256 hashing |

---

## 📁 Project Structure

```
Stegnoguard/
├── public/
│   └── stegnoguard.svg        # Favicon
├── src/
│   ├── components/
│   │   ├── CopyButton.tsx      # Reusable copy-to-clipboard button
│   │   ├── CryptoTools.tsx     # Crypto tools tab
│   │   ├── EmailValidatorTools.tsx
│   │   ├── IPDNSLookupTools.tsx
│   │   ├── LandingPage.tsx     # Landing page
│   │   ├── NetworkTools.tsx
│   │   ├── SteganographyTools.tsx
│   │   ├── ToolCard.tsx        # Reusable card component
│   │   ├── WebTools.tsx
│   │   └── userDashboard.tsx   # Main dashboard
│   ├── utils/
│   │   ├── crypto.ts           # Crypto utility functions
│   │   ├── emailValidation.ts  # Email validation logic
│   │   ├── ipDnsLookup.ts      # IP/DNS lookup APIs
│   │   ├── network.ts          # Network utility functions
│   │   ├── steganography.ts    # Steganography algorithms
│   │   └── web.ts              # Web utility functions
│   ├── App.tsx                 # Root app with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📸 Screenshots

The application features a clean, professional **white & black** design with smooth animations:

- ⬜ Clean white background
- ⬛ Black text and buttons
- 🎯 Animated tab navigation
- 🃏 Card hover effects
- ✨ Smooth page transitions

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👤 Author

**Arpitha Poojary**

- GitHub: [@Arpithaapoojary](https://github.com/Arpithaapoojary)

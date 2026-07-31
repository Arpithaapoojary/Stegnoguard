<div align="center">

# 🛡️ Stegnoguard

**Enterprise-Grade Client-Side Cryptography, Steganography & Security Suite**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)

*Stegnoguard is a high-performance, privacy-focused security toolkit designed for developers, security professionals, and enthusiasts. All core cryptographic and steganographic processing occurs 100% locally in the browser.*

[Explore Features](#-features) • [Installation](#-quick-start) • [Architecture](#-architecture) • [Security](#-security--privacy)

---

</div>

##  Overview

**Stegnoguard** consolidates cryptographic operations, image-based steganography, network diagnostics, and developer utilities into a single, cohesive dashboard. Built with a minimalist black-and-white aesthetic and fluid micro-animations, it delivers an intuitive user experience without compromising speed or computational privacy.

---

##  Core Features

###  Cryptographic Tools
* **Cryptographic Hashing:** Generate deterministic SHA-1, SHA-256, and MD5 digests using native Web Crypto APIs.
* **AES Encryption:** Perform text encryption and decryption using custom secret keys.
* **Base64 Encoding Engine:** Encode/decode binary and text content with UTF-8 support.
* **Passcode Generator:** Configurable entropy password generator with customizable character sets.

###  Image Steganography
* **LSB Steganography:** Embed hidden text payload directly into image pixels using Least Significant Bit insertion.
* **Payload Extraction:** Extract concealed text messages from modified cover images.
* **Visual Binary Pattern Generator:** Generate educational bit-level binary matrices from input strings.

###  Developer & Web Utilities
* **Data Formatters:** Format and minify JSON, HTML, and CSS documents.
* **Color Space Converter:** Convert color values between HEX, RGB, and HSL spaces.
* **Identifier & Text Tools:** Generate RFC4122 v4 UUIDs, calculate reading time metrics, and produce customizable Lorem Ipsum copy.

###  Network & Infrastructure Tools
* **IP Address Validator:** Analyze IPv4/IPv6 syntax and classify addresses (Public vs. Private/Local ranges).
* **DNS Query Engine:** Query live DNS records (A, AAAA, CNAME, MX, NS, TXT) via Google and Cloudflare DNS-over-HTTPS APIs.
* **User Agent Parser:** Parse user-agent headers to extract browser engine, version, OS, and device categories.
* **QR Code Synthesizer:** Generate printable QR patterns directly within the browser interface.

### Email Verification & Threat Analysis
* **Syntax & Domain Validation:** Inspect syntax integrity and verify domain structure.
* **Disposable Provider Detection:** Identify temporary and burner email address providers.
* **Breach Intelligence:** Check address exposure status against known public breach indexes.

---

## Quick Start

### Prerequisites
* **Node.js** v18.0.0 or higher
* **npm** v9.0.0 or higher

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Arpithaapoojary/Stegnoguard.git
   cd Stegnoguard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Launch Development Server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:5173` in your browser.

4. **Production Build**
   ```bash
   npm run build
   npm run preview
   ```

---

##  Architecture & Technology Stack

```
Stegnoguard/
├── src/
│   ├── components/       # Component hierarchy (Dashboard, ToolCard, CopyButton)
│   ├── utils/            # Pure JavaScript/TypeScript computational engines
│   │   ├── crypto.ts          # Hashing & AES cipher modules
│   │   ├── steganography.ts   # LSB pixel manipulation algorithms
│   │   ├── network.ts         # IP, URL, and UserAgent parser utilities
│   │   ├── ipDnsLookup.ts     # DNS-over-HTTPS & GeoIP API handlers
│   │   ├── emailValidation.ts # Email syntax & breach detection logic
│   │   └── web.ts             # Formatters, converters & generators
│   ├── App.tsx           # Router and top-level layout controller
│   ├── main.tsx          # Application entrypoint
│   └── index.css         # Global design system & keyframe animation specs
├── public/               # Static assets & SVG icons
└── package.json          # Dependencies & npm scripts
```

---

##  Security & Privacy

* **Zero Data Transmission:** Cryptographic and steganographic processing executes entirely inside client-side JavaScript memory. Sensitive payloads are never transmitted to external servers.
* **API Transparency:** Network queries (DNS lookups, IP geolocation) rely strictly on secure HTTPS endpoints (Google DoH, Cloudflare DoH, ipapi).

---

##  License

This project is distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

Developed with focus on privacy and precision by **[Arpitha Poojary](https://github.com/Arpithaapoojary)**

</div>

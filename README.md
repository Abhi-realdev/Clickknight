# ClickKnight - URL Safety Checker

ClickKnight is an educational web application designed to help Grade 11-12 students at SPS International School learn about online safety by analyzing URLs for potential security threats. The application provides detailed explanations of why URLs might be safe, suspicious, or dangerous, building cybersecurity awareness among students.

## Features

- **Smart URL Analysis**: Lexical pattern analysis, domain age checking, and security database cross-referencing
- **Educational Explanations**: Every result comes with detailed reasoning to help students learn
- **Real-time Feedback**: Interactive reporting system to improve detection accuracy
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Rate Limited & Secure**: CORS protection, input sanitization, and rate limiting (20 req/min)
- **Fallback Security Checks**: Works with or without external API keys

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **shadcn/ui** components
- **Framer Motion** for animations
- **TanStack Query** for API state management

### Backend
- **FastAPI** with Python 3.11+
- **SQLite** database with in-memory storage
- **Comprehensive URL Analysis Engine**
- **Rate limiting** with slowapi
- **CORS protection**
- **Input sanitization** to prevent SSRF attacks

## Quick Start

### Prerequisites
- **Node.js 18+**
- **Python 3.11+**
- **npm** or **yarn**

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd clickknight
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys (optional)
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5000`

### API Keys (Optional)

The application works without API keys using heuristic analysis. For enhanced security checking, you can add:

```env
# Google Safe Browsing API (optional)
GOOGLE_SAFE_BROWSING_API_KEY=your_api_key_here

# PhishTank API (optional)  
PHISHTANK_API_KEY=your_api_key_here

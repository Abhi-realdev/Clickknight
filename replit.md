# ClickKnight - URL Safety Checker

## Overview

ClickKnight is an educational web application designed for Grade 11-12 students at SPS International School to learn about online safety by analyzing URLs for potential security threats. The application provides real-time URL analysis with educational explanations to help students understand cybersecurity concepts while identifying phishing, malware, and suspicious websites.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18 with TypeScript**: Single-page application using modern React patterns with full type safety
- **Vite Build System**: Fast development server and optimized production builds
- **UI Framework**: shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS for utility-first responsive design with custom CSS variables for theming
- **State Management**: TanStack Query for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Node.js/Express Server**: RESTful API server with TypeScript support
- **In-Memory Storage**: Custom storage implementation using Map structures for development/demo purposes
- **URL Analysis Engine**: Multi-layered security analysis combining lexical pattern matching, domain age checking, and security database lookups
- **Rate Limiting**: IP-based rate limiting (20 requests per minute) to prevent abuse
- **Security Features**: CORS protection, input sanitization, and SSRF attack prevention

### Database Design
- **Schema Definition**: Drizzle ORM with PostgreSQL schema for production deployment
- **Data Models**: 
  - URL scans with verdict, confidence scores, and detailed analysis reasons
  - User feedback reports for improving detection accuracy
- **Development Storage**: In-memory storage for local development and testing

### API Architecture
- **POST /api/check**: URL analysis endpoint with comprehensive security checks
- **GET /api/check/{scan_id}**: Retrieve specific scan results
- **POST /api/report**: User feedback collection for machine learning improvement
- **Rate Limiting**: Configurable per-IP request limits with time windows

### Security Analysis Pipeline
- **URL Normalization**: Standardizes URLs and removes tracking parameters
- **Lexical Analysis**: Pattern-based detection of suspicious URL characteristics (length, symbols, IP addresses, suspicious TLDs)
- **Domain Age Verification**: WHOIS-based domain registration date checking
- **Blacklist Integration**: Google Safe Browsing and PhishTank API integration with fallback heuristics
- **Confidence Scoring**: Weighted scoring system providing 0-100 confidence ratings
- **Educational Feedback**: Detailed reasoning for each security decision to enhance learning

## External Dependencies

### Required Services
- **Neon Database**: PostgreSQL database service for production data persistence
- **Drizzle ORM**: Type-safe database toolkit for schema management and queries

### Optional Security APIs
- **Google Safe Browsing API**: Real-time malicious URL detection service
- **PhishTank API**: Community-driven phishing URL database

### Development Dependencies
- **Vite**: Frontend build tool and development server
- **esbuild**: Fast JavaScript/TypeScript bundler for backend
- **TypeScript**: Static type checking across frontend and backend
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

### UI Component Libraries
- **shadcn/ui**: Pre-built component library with customizable design system
- **Lucide React**: Icon library for consistent visual elements
- **Class Variance Authority**: Type-safe component variant management

### Deployment Configuration
- **Docker Support**: Containerization ready for production deployment
- **Environment Variables**: Configurable API keys and database connections
- **Build Pipeline**: Optimized production builds with static asset generation
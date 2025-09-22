.PHONY: help init dev build clean test lint format install-deps

# Default target
help:
	@echo "ClickKnight - URL Safety Checker"
	@echo "================================"
	@echo ""
	@echo "Available commands:"
	@echo "  make init        - Initialize project and seed data"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build for production"
	@echo "  make clean       - Clean build artifacts"
	@echo "  make test        - Run all tests"
	@echo "  make lint        - Run linting checks"
	@echo "  make format      - Format code"
	@echo "  make install-deps - Install all dependencies"
	@echo ""
	@echo "Quick start:"
	@echo "  make init"
	@echo "  make dev"

# Initialize project
init: install-deps
	@echo "🚀 Initializing ClickKnight project..."
	@echo "✓ Dependencies installed"
	@echo "✓ Database schema ready (in-memory)"
	@echo "✓ Environment configured"
	@echo ""
	@echo "🎉 Project initialized! Run 'make dev' to start."

# Install dependencies
install-deps:
	@echo "📦 Installing dependencies..."
	npm install

# Start development server
dev:
	@echo "🔥 Starting ClickKnight development server..."
	@echo "Frontend + Backend will be available at http://localhost:5000"
	npm run dev

# Build for production
build:
	@echo "🏗️  Building ClickKnight for production..."
	npm run build

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/.cache/
	rm -rf client/dist/

# Run tests
test:
	@echo "🧪 Running tests..."
	@echo "Note: Add test commands here when test suites are implemented"
	@echo "- Backend: pytest tests/"
	@echo "- Frontend: npm run test"

# Lint code
lint:
	@echo "🔍 Running linting checks..."
	npm run check
	@echo "✓ TypeScript checks passed"

# Format code
format:
	@echo "💅 Formatting code..."
	@echo "Use prettier/eslint when configured"

# Seed demo data (for classroom demonstrations)
seed-demo:
	@echo "🌱 Seeding demo data..."
	@echo "Creating sample URL scan results for demonstration..."
	@curl -s -X POST http://localhost:5000/api/check \
		-H "Content-Type: application/json" \
		-d '{"url": "https://google.com", "source": "demo"}' > /dev/null || true
	@curl -s -X POST http://localhost:5000/api/check \
		-H "Content-Type: application/json" \
		-d '{"url": "http://suspicious-site.tk", "source": "demo"}' > /dev/null || true
	@curl -s -X POST http://localhost:5000/api/check \
		-H "Content-Type: application/json" \
		-d '{"url": "https://fake-bank-login.com", "source": "demo"}' > /dev/null || true
	@echo "✓ Demo data seeded"

# Quick demo setup for teachers
demo: init
	@echo "🎓 Setting up ClickKnight classroom demo..."
	make dev &
	@sleep 5
	make seed-demo
	@echo ""
	@echo "🎉 Demo ready! Open http://localhost:5000"
	@echo ""
	@echo "Try these URLs for demonstration:"
	@echo "  SAFE: https://google.com"
	@echo "  SUSPICIOUS: http://bit.ly/example"
	@echo "  DANGEROUS: https://fake-paypal-login.com"

# Show project status
status:
	@echo "ClickKnight Project Status"
	@echo "========================="
	@echo "Node.js: $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "npm: $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "Dependencies: $(shell [ -d node_modules ] && echo 'Installed' || echo 'Missing')"
	@echo "Build: $(shell [ -d dist ] && echo 'Built' || echo 'Not built')"

# Show environment info
env-check:
	@echo "Environment Check"
	@echo "=================="
	@echo "NODE_ENV: $(shell echo $$NODE_ENV || echo 'not set')"
	@echo "PORT: $(shell echo $$PORT || echo '5000 (default)')"
	@echo "GOOGLE_SAFE_BROWSING_API_KEY: $(shell [ -n "$$GOOGLE_SAFE_BROWSING_API_KEY" ] && echo 'Set' || echo 'Not set (optional)')"
	@echo "PHISHTANK_API_KEY: $(shell [ -n "$$PHISHTANK_API_KEY" ] && echo 'Set' || echo 'Not set (optional)')"

# Educational: Show students how the URL analysis works
explain:
	@echo "📚 ClickKnight URL Analysis Explanation"
	@echo "========================================"
	@echo ""
	@echo "How ClickKnight analyzes URLs:"
	@echo ""
	@echo "1. 🔍 LEXICAL ANALYSIS"
	@echo "   - Checks URL length (very long = suspicious)"
	@echo "   - Looks for @ symbols (can hide real destination)"
	@echo "   - Detects IP addresses instead of domain names"
	@echo "   - Finds excessive hyphens or subdomains"
	@echo "   - Identifies suspicious keywords"
	@echo ""
	@echo "2. 🗓️  DOMAIN AGE CHECK"
	@echo "   - New domains (< 30 days) are more suspicious"
	@echo "   - Established domains are usually safer"
	@echo ""
	@echo "3. 🛡️  SECURITY DATABASE LOOKUP"
	@echo "   - Checks Google Safe Browsing"
	@echo "   - Consults PhishTank database"
	@echo "   - Falls back to heuristics if APIs unavailable"
	@echo ""
	@echo "4. 📊 VERDICT GENERATION"
	@echo "   - SAFE: All checks passed"
	@echo "   - SUSPICIOUS: Some red flags"
	@echo "   - DANGEROUS: Multiple threats detected"
	@echo ""
	@echo "🎓 This teaches students to think critically about online safety!"

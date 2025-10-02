# ESQs Platform Mobile - LAW MATRIX v2.0 Integration

## 🏛️ Legal AI Platform with Claude LM Project Instructions

This is a comprehensive legal research and document management platform built with Next.js, featuring full integration with **LAW MATRIX v2.0** project instructions for focused legal work.

## 🎯 Core Features

### Legal AI Integration
- **LAW MATRIX v2.0** compliance and instruction integration
- Claude AI legal research and writing assistant
- Artifact-based case management system
- Utah law focus (CUC, URCP, Bluebook)

### Platform Components
- **Practice Panther Integration** - Client and case management
- **F: Drive Access** - Document and file management
- **AI Chat Interface** - Legal research and drafting
- **Interactive Calendar** - Scheduling and deadlines
- **Document Creation** - Automated legal document generation
- **Voice Control** - Hands-free operation

## 🚀 Getting Started

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or use the automated batch file
START-BOTH-FRONTEND-BACKEND.bat
```

### Local Development
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Deployment
Deploy to Render.com with 4 microservices:
1. **esqs-backend** (Port 10000) - Main application
2. **esqs-legal-research** (Port 10001) - Legal research API
3. **esqs-ai-bridge** (Port 10002) - AI integration bridge
4. **esqs-synthia** (Port 10003) - Synthia analysis engine

## ⚖️ LAW MATRIX v2.0 Compliance

### Essential Personnel
- **John William Adams III, Esq. (JWA3)** - Bar #19429 - $390/hour
- **Travis R. Christiansen (TRC)** - Bar #8504 - $450/hour - Managing Partner
- **Josephine Miller (JM)** - Lead Legal Assistant
- **Jordan Gubler (JG)** - Legal Assistant
- **Emily Wilson (EW)** - Legal Assistant
- **Jessica Byergo (JB)** - Customer Service Specialist

### Legal Acronyms Integrated
- **CUC** - Current Utah Code
- **URCP/CP** - Utah Rules of Civil Procedure
- **AOC** - Appearance of Counsel
- **OSC** - Order to Show Cause
- **TRO** - Temporary Restraining Order
- And 11 additional legal acronyms

### Compliance Requirements
- ✅ Artifact-based case management
- ✅ No phantom law or fake information
- ✅ Focused research only on case at hand
- ✅ Numbered paragraphs (no bullets)
- ✅ Brief, direct legal writing
- ✅ Time tracking and billing integration
- ✅ Utah law specialization

## 📋 Project Structure

```
ESQs-Platform-MOBILE-ONLINE/
├── CLAUDE-LM-PROJECT-INSTRUCTIONS.md  # Complete LM v2.0 instructions
├── lm-project-instructions.js          # JavaScript integration
├── DEPLOYMENT-READY.md                 # Render deployment guide
├── FULL-SETUP-GUIDE.md                # Complete setup instructions
├── START-BOTH-FRONTEND-BACKEND.bat    # Quick start script
├── src/                                # Next.js application
├── backend-server.js                   # Main backend server
├── utils/                              # Document generation utilities
└── templates/                          # Legal document templates
```

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start Next.js dev server
npm start           # Start backend server
npm run build       # Build for production
npm run lint        # Run ESLint

# Testing
node test-backend.js    # Test backend API
node button-test.html   # Test frontend buttons
```

## 🌐 Live Deployment

### Render.com Deployment
1. Connect GitHub repository: `BCLS-ESQs/esqs-platform-mobile`
2. Select branch: `master`
3. Render auto-detects `render.yaml`
4. Deploy 4 microservices automatically

### Live URLs (after deployment)
- **Main App**: https://esqs-backend.onrender.com
- **Legal Research**: https://esqs-legal-research.onrender.com
- **AI Bridge**: https://esqs-ai-bridge.onrender.com
- **Synthia Engine**: https://esqs-synthia.onrender.com

## 📖 Documentation

- [LAW MATRIX v2.0 Instructions](./CLAUDE-LM-PROJECT-INSTRUCTIONS.md)
- [Full Setup Guide](./FULL-SETUP-GUIDE.md)
- [Deployment Guide](./DEPLOYMENT-READY.md)
- [Button Testing Guide](./BUTTON-TESTING-GUIDE.md)

## 🔒 Compliance & Security

- **Strict adherence** to LAW MATRIX v2.0 instructions
- **No deviations tolerated** from legal research protocols
- **Artifact-based** case management within Claude AI system
- **Utah law specialization** with current code integration
- **Billing integration** with attorney rates and time tracking

---

**Built with LAW MATRIX v2.0 for focused legal research and document creation.**

## Original Next.js Information

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js)
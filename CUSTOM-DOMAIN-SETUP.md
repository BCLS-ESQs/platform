#  ESQs.com Custom Domain Setup Guide

## Your Current Render Deployment:
- Main App: https://esqs-backend-5sot.onrender.com
- AI Bridge: https://esqs-ai-bridge-5sot.onrender.com  
- Synthia Engine: https://esqs-synthia-5sot.onrender.com

##  Custom Domain Configuration:

### Step 1: Domain Setup in Render
1. Go to your **esqs-backend-5sot** service in Render dashboard
2. Click **Settings**  **Custom Domains**
3. Add custom domain: **ESQs.com**
4. Add subdomain: **www.ESQs.com**

### Step 2: DNS Configuration (at your domain registrar)
Add these DNS records for ESQs.com:

**A Record:**
- Name: @ (root domain)
- Value: [Render will provide IP address]

**CNAME Record:**
- Name: www
- Value: esqs-backend-5sot.onrender.com

### Step 3: SSL Certificate
- Render will automatically provision SSL certificate
- Your site will be accessible at: https://ESQs.com

### Step 4: Subdomain Structure (Optional)
- **ESQs.com** - Main AI legal platform
- **api.ESQs.com** - AI Bridge service
- **synthia.ESQs.com** - Synthia engine
- **research.ESQs.com** - Legal research API

##  Result:
Your "ESQs powered by Law Matrix v4.5" platform will be live at:
**https://ESQs.com**

Professional, clean, and perfect for client access!

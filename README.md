# Statbrio Website — Setup Guide

## Quick Start

```bash
# 1. Unzip the project
unzip statbrio-website.zip
cd statbrio

# 2. Install dependencies
npm install

# 3. Start dev server
npm start
# → Opens at http://localhost:3000
```

---

## ⚡ EmailJS Setup (Contact Form)

### Step 1: Create account at https://emailjs.com

### Step 2: Add Gmail Service
Dashboard → Email Services → Add New Service → Connect connect.statbrio@gmail.com → Copy Service ID

### Step 3: Create Email Template
Dashboard → Email Templates → Create New Template

Template body:
```
From: {{from_name}} ({{from_email}})
Company: {{company}}
Service: {{service}}
Budget: {{budget}}
Message: {{message}}
```
Copy Template ID.

### Step 4: Get Public Key
Dashboard → Account → General → Public Key

### Step 5: Add to code
Open src/pages/Contact.js and set:
```js
const EMAILJS_SERVICE_ID = 'service_xxxxxxx';
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxx';
```

---

## Project Structure

```
statbrio/src/
├── App.js                  ← Router, theme context, page transitions
├── index.css               ← All CSS variables, dark/light mode, global styles
├── components/
│   ├── Navbar.js           ← Glassmorphism nav, mobile menu, theme toggle
│   ├── Footer.js           ← Footer with links and WhatsApp CTA
│   ├── AnimatedSection.js  ← Reusable scroll-reveal animation wrapper
│   └── ScrollToTop.js      ← Auto scroll on route change
├── hooks/
│   └── useInView.js        ← IntersectionObserver for scroll animations
└── pages/
    ├── Home.js             ← Neural canvas hero, bento grid, Stario spotlight, stats
    ├── About.js            ← Founder profile, mission/vision, timeline
    ├── Services.js         ← Sticky tab interface, 4 categories, feature cards
    ├── Stario.js           ← Product page, live chat simulation, use cases
    ├── Internships.js      ← Domain accordion, application form
    └── Contact.js          ← EmailJS contact form, FAQ accordion
```

---

## Customization

- **Colors**: Edit `--accent` and `--accent-electric` in `src/index.css`
- **Founder info**: Edit the founder section in `src/pages/About.js`
- **Social links**: Replace `href="#"` in About.js with real LinkedIn/GitHub URLs
- **WhatsApp**: Replace `919080435866` with your number in Footer.js
- **Phone numbers**: Update in Footer.js and Contact.js

---

## Deployment

### Vercel (free, recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drop the build/ folder at netlify.com/drop
```

---

## Tech Stack
- React 18 + React Router v6
- Framer Motion (all animations)
- EmailJS (contact form, no backend needed)
- Lucide React (icons)
- Fonts: Syne + DM Sans + JetBrains Mono (Google Fonts)

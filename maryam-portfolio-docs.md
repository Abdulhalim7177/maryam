# Maryam Abdullahi Ibrahim — Portfolio Site Documentation

**Project:** Personal Portfolio Website  
**Client:** Maryam Abdullahi Ibrahim  
**Role:** Virtual Assistant | Admin | Operations Coordinator  
**Prepared by:** Developer  
**Date:** April 2026  
**File:** `maryam-portfolio.html`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design System](#2-design-system)
3. [Site Structure & Sections](#3-site-structure--sections)
4. [Content Inventory](#4-content-inventory)
5. [Features & Interactions](#5-features--interactions)
6. [Technologies Used](#6-technologies-used)
7. [File Structure](#7-file-structure)
8. [Placeholder Items to Replace](#8-placeholder-items-to-replace)
9. [Customisation Guide](#9-customisation-guide)
10. [Launch Checklist](#10-launch-checklist)

---

## 1. Project Overview

### Purpose
A single-page portfolio website for Maryam Abdullahi Ibrahim, designed to serve two equal goals:
- **Attract freelance clients** — showcase her services, systems, and proof of work
- **Impress employers** — demonstrate structured thinking, real results, and professional documentation

### Source Documents
All content was extracted and adapted from three client-provided documents:

| Document | Content Used |
|---|---|
| `Client_Relations_&_Operations_SOP_Manual.pdf` | Bio, services, onboarding 7-step process, daily workflow, challenges & solutions, communication templates |
| `Email_Management_&_Communication_System.pdf` | Email categorisation system, email response templates, tools list |
| `Weekly_Operations_Report.pdf` | Key metrics (28 clients, 10 onboarded, 18 follow-ups, 12 sessions), challenges, actions taken |

### Design Brief
- **Primary style:** Glassmorphic
- **Secondary style:** Minimalist layout
- **Accent:** Subtle scroll animations
- **Goal tone:** Premium, trustworthy, professional, modern

---

## 2. Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--navy` | `#0a0a1a` | Page background |
| `--deep` | `#0f0f2e` | Secondary background |
| `--violet` | `#1a1040` | Tertiary background |
| `--purple` | `#4f46a8` | Primary CTA buttons, accents |
| `--lavender` | `#7c6fd4` | Hover states |
| `--lilac` | `#b8a9f0` | Italic headlines, tags, numbers, links |
| `--cream` | `#f5f0ff` | Reserved for light-mode future use |
| `--white` | `#ffffff` | Primary text |
| `--gold` | `#c9a84c` | Reserved accent |
| `--text-dim` | `rgba(255,255,255,0.55)` | Muted body text, labels |
| `--text-mid` | `rgba(255,255,255,0.75)` | Secondary body text |
| `--glass-bg` | `rgba(255,255,255,0.06)` | Glass card fill |
| `--glass-border` | `rgba(255,255,255,0.12)` | Glass card border |
| `--glass-hover` | `rgba(255,255,255,0.10)` | Glass card hover fill |

### Typography

| Token | Font | Source |
|---|---|---|
| `--font-display` | Cormorant Garamond | Google Fonts |
| `--font-body` | DM Sans | Google Fonts |

**Type scale:**
- Hero headline: `clamp(3rem, 5vw, 5.5rem)` — Cormorant Garamond 300
- Section titles: `clamp(2.2rem, 4vw, 3.5rem)` — Cormorant Garamond 300
- Service card headings: `1.3rem` — Cormorant Garamond 400
- Body text: `1rem` — DM Sans 300
- Small labels/tags: `0.68–0.72rem` — DM Sans 400, letter-spacing 0.15–0.22em, uppercase
- Caption/meta text: `0.75–0.85rem` — DM Sans 300

### Glassmorphic Card Style
All cards use this pattern:
```css
background: rgba(255,255,255,0.06);
backdrop-filter: blur(20px);
border: 0.5px solid rgba(255,255,255,0.12);
border-radius: 20px;
```
On hover:
```css
background: rgba(255,255,255,0.10);
border-color: rgba(255,255,255,0.20);
transform: translateY(-4px);
```

### Background System
Three layered elements create depth:
1. **Animated orbs** — three large blurred radial gradient circles (purple, violet, blue) that slowly drift using a CSS `@keyframes drift` animation
2. **Gradient orb colors:** `#4f46a8` (top-left), `#7c3fc8` (right), `#1a6ea8` (bottom-left)
3. **Noise grain overlay** — a fixed SVG `feTurbulence` noise texture at low opacity (0.4) adds subtle texture depth across the entire page

### Buttons

**Primary button** (`.btn-primary`):
- Background: `var(--purple)` → hover: `var(--lavender)`
- Border-radius: `50px`
- Hover: `translateY(-2px)` + `box-shadow: 0 8px 30px rgba(79,70,168,0.4)`

**Ghost button** (`.btn-ghost`):
- Background: transparent
- Border: `0.5px solid var(--glass-border)` → hover: `var(--lilac)`
- Hover: fills with `var(--glass-hover)`

---

## 3. Site Structure & Sections

The site is a **single HTML file** with six sections navigable via a fixed top nav.

```
nav (fixed)
 └── Logo + 5 nav links

#hero        — Full-screen opening
#about       — Bio + statistics
#services    — 6 service cards
#work        — 4 proof-of-work cards
#tools       — 8 tool cards
#contact     — Contact info + message form

footer
```

### Navigation
- **Position:** Fixed top, full width
- **Background:** `rgba(10,10,26,0.6)` with `backdrop-filter: blur(20px)`
- **Logo:** "Maryam *Ibrahim*" — italic surname in lilac (Cormorant Garamond)
- **Links:** About, Services, Work, Tools, Contact
- **Active state:** JS scroll listener highlights the current section's nav link
- **Mobile:** Nav links hidden below 900px (hamburger menu not yet implemented — see launch checklist)

---

### Section 1 — Hero (`#hero`)

**Layout:** Two-column grid (text left, visual right). Stacks to single column on mobile.

**Left column content:**
- Eyebrow label: "Virtual Assistant & Operations Coordinator"
- Headline: "Your operations, *handled.*"
- Subheadline: Brief positioning statement
- Two CTAs: "View My Work ↓" (primary) and "Let's Work Together" (ghost)

**Right column content:**
- Photo frame card (380×480px, 24px border-radius)
- **Currently shows initials placeholder** — replace with actual headshot
- Two floating stat badges with animated count-up numbers:
  - Bottom-left: 28 clients managed
  - Top-right: 18 follow-ups completed
- Badges use CSS `@keyframes floatup` animation (gentle vertical drift, 4s infinite alternate)

---

### Section 2 — About (`#about`)

**Layout:** Two-column grid (stats left, bio right). Stacks on mobile.

**Left column:**
- Section tag + headline: "Structured. Consistent. *Client-first.*"
- 4 stat cards in a 2×2 grid with animated count-up numbers:
  - 28 — Total clients managed
  - 10 — New clients onboarded (one week)
  - 18 — Follow-ups completed
  - 12 — Sessions scheduled

**Right column — bio text (3 paragraphs):**
1. Introduction as Maryam Abdullahi Ibrahim, VA / Admin / Operations Coordinator
2. Context: XM Trading Academy, Kano; real operational systems built and documented
3. Philosophy: great operations are invisible — clients feel cared for, things run on time

---

### Section 3 — Services (`#services`)

**Layout:** 3-column grid of 6 cards. Collapses to 2-col on tablet, 1-col on mobile.

Each card has: icon, service name (Cormorant Garamond), description paragraph, hover lift + top-border shimmer animation.

| # | Icon | Service | Key detail |
|---|---|---|---|
| 1 | 🤝 | Client Onboarding | 7-step process, welcome messages, tracker entry |
| 2 | 📨 | Inbox & Email Management | Priority triage, templates, complaint handling |
| 3 | 📅 | Scheduling & Coordination | Calendar management, reminders, trainer coordination |
| 4 | 📊 | Client Tracking Systems | Google Sheets, daily updates, status tracking |
| 5 | 📋 | Operational Reporting | Weekly reports with metrics, challenges, recommendations |
| 6 | 💬 | Community Management | WhatsApp/Telegram admin, group rules, moderation |

**Service card hover effect:**
```css
.service-card:hover { background: var(--glass-hover); transform: translateY(-6px); }
.service-card:hover::before { opacity: 1; } /* top shimmer line */
```

---

### Section 4 — Proof of Work (`#work`)

**Layout:** 2-column grid with two full-width ("wide") cards.

#### Card 1 (wide) — Weekly Operations Report
- Source: `Weekly_Operations_Report.pdf`
- Shows 4 animated metric counters: 28 / 10 / 18 / 12
- Week: February 2–7, 2026, XM Trading Academy

#### Card 2 — Email Management System
- Source: `Email_Management_&_Communication_System.pdf`
- Shows a realistic email client preview (macOS-style dots, subject line, body)
- Template displayed: Client Inquiry Response ("Hello Amir, Thank you for reaching out…")

#### Card 3 — Client Onboarding SOP
- Source: `Client_Relations_&_Operations_SOP_Manual.pdf`
- Shows the full 7-step onboarding process as a styled numbered list
- Steps styled with large dim Cormorant numbers (01–07) + step text

#### Card 4 (wide) — Challenges & Solutions Table
- Source: both SOP manual and weekly report
- Full-width table with two columns: Challenge (warm red tint) / Solution (warm green tint)
- 4 rows covering: response delays, disorganised data, missed follow-ups, missed sessions

---

### Section 5 — Tools (`#tools`)

**Layout:** 4-column grid of 8 tool cards. Collapses to 2-col on mobile.

Each card: icon, tool name, category label. Hover: lift + border highlight.

| Tool | Category |
|---|---|
| Google Sheets | Client Tracking |
| Google Calendar | Scheduling |
| Gmail / Outlook | Email Management |
| WhatsApp | Client Communication |
| Telegram | Community Management |
| Microsoft Excel | Reporting & Data |
| Zoom / Google Meet | Virtual Sessions |
| SOP Documentation | Process Writing |

---

### Section 6 — Contact (`#contact`)

**Layout:** Two-column grid (text + links left, form right). Stacks on mobile.

**Left column:**
- Section tag + headline: "Ready to work *together?*"
- Positioning paragraph
- 4 contact link cards (email, WhatsApp, Telegram, location)
- **All contact details are currently placeholders** — see Section 8

**Right column — message form:**
- Fields: Name, Email or WhatsApp, Service dropdown (7 options), Message textarea
- Submit button with JS confirmation state (turns green, shows "Message sent ✓" for 3s)
- **Note:** Form is currently front-end only — no backend connected. See launch checklist.

---

### Footer
- Simple centered line: "© 2026 Maryam Abdullahi Ibrahim · Virtual Assistant & Operations Coordinator · Kano, Nigeria"

---

## 4. Content Inventory

### Text Content (all sourced from documents)

| Location | Content | Source |
|---|---|---|
| Hero headline | "Your operations, handled." | Synthesised |
| Hero sub | "I help businesses and entrepreneurs run smoothly…" | Synthesised from SOP intro |
| About bio ¶1 | Name, role, experience | SOP Manual — Introduction |
| About bio ¶2 | XM Trading Academy context | SOP Manual |
| About bio ¶3 | Philosophy paragraph | Synthesised from SOP Objectives |
| Services (all 6) | Names + descriptions | SOP Manual §2, §3, §6 + Email doc |
| Onboarding steps | Steps 1–7 | SOP Manual §4 |
| Email template | Inquiry response | Email doc §4 |
| Challenges table | 4 rows | SOP Manual §8 + Weekly Report §4–5 |
| Tools list | All 8 tools | SOP Manual §5 + Email doc §5 |
| Contact copy | Positioning paragraph | Synthesised |

### Numbers Featured

| Number | Meaning | Source |
|---|---|---|
| 28 | Total clients managed | Weekly Report §2 |
| 10 | New clients onboarded | Weekly Report §2 |
| 18 | Follow-ups completed | Weekly Report §2 |
| 12 | Sessions scheduled | Weekly Report §2 |

---

## 5. Features & Interactions

### Scroll Reveal Animation
- **Class:** `.reveal` — initial state: `opacity: 0; transform: translateY(28px)`
- **Trigger:** `IntersectionObserver` with `threshold: 0.1`, `rootMargin: -40px`
- **On visible:** adds `.visible` class → `opacity: 1; transform: translateY(0)` (0.7s ease)
- **Stagger delays:** `.reveal-delay-1` through `.reveal-delay-5` (0.1s increments)
- **Hero exception:** Hero elements trigger via `setTimeout` on page load (200ms base + 120ms stagger)

### Count-Up Animation
- **Class:** `.count-up` with `data-target="N"` attribute
- **Trigger:** Separate `IntersectionObserver` at `threshold: 0.5`
- **Duration:** 1200ms, 60fps (`setInterval` at 16ms)
- **Hero counts:** Triggered via `setTimeout` at 800ms on load
- **Locations:** Hero badges, About stat cards, Work section metrics

### Active Navigation Highlighting
- `scroll` event listener checks `window.scrollY` against each section's `offsetTop - 120`
- Matching nav link gets `color: var(--white)`; others revert to default

### Contact Form Confirmation
- `handleSend()` function on button click
- Changes button text to "Message sent ✓", background to green tint, disables for 3 seconds
- Resets automatically — no actual form submission (front-end only)

### CSS Animations
| Name | Element | Effect |
|---|---|---|
| `drift` | `.orb-1/2/3` | Slow translate + scale, 18s infinite alternate |
| `floatup` | `.float-badge` | Vertical float ±10px, 4s infinite alternate |

### Hover States
- All `.glass` cards: `translateY(-4px)` + lighter background + brighter border
- `.service-card`: `translateY(-6px)` + top shimmer line reveal
- `.tool-card`: `translateY(-4px)` + border highlight
- `.contact-link`: background lightens + border turns lilac + text brightens
- `.btn-primary`: `translateY(-2px)` + purple glow shadow
- `.btn-ghost`: border turns lilac + text brightens + glass fill

---

## 6. Technologies Used

| Technology | Version/Source | Purpose |
|---|---|---|
| HTML5 | — | Structure |
| CSS3 | — | All styling, animations, glassmorphism |
| Vanilla JavaScript | — | Scroll reveal, count-up, nav highlight, form |
| Google Fonts | CDN | Cormorant Garamond + DM Sans |
| IntersectionObserver API | Native browser | Scroll-triggered animations |
| CSS backdrop-filter | Native browser | Glass blur effect |
| SVG feTurbulence | Inline data URI | Noise grain texture |

**No external JS libraries or frameworks. No build tools required.**  
Open `maryam-portfolio.html` directly in any modern browser.

### Browser Support
| Browser | Support |
|---|---|
| Chrome 88+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 88+ | ✅ Full |
| IE 11 | ❌ Not supported |

---

## 7. File Structure

Currently a **single self-contained file:**

```
maryam-portfolio.html       ← entire site (HTML + CSS + JS inline)
```

### Recommended structure for production:

```
maryam-portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── maryam-headshot.jpg     ← to be provided
│       ├── maryam-work-1.jpg       ← optional
│       └── og-image.jpg            ← social share preview
└── README.md
```

---

## 8. Placeholder Items to Replace

These items are currently placeholder or dummy values and **must be updated** before launch:

| Location | Current value | Replace with |
|---|---|---|
| Hero + About photo | Initials placeholder div | Actual headshot `<img src="assets/images/maryam-headshot.jpg">` |
| Contact email link | `maryam@example.com` | Her real email address |
| WhatsApp link | `https://wa.me/234XXXXXXXXX` | Real WhatsApp number, e.g. `https://wa.me/2348012345678` |
| Telegram handle | `@maryamibrahim` | Her real Telegram username |
| Contact form action | Front-end only (no submit) | Connect to Formspree, EmailJS, or custom backend |
| Nav logo font load | Google Fonts CDN | Self-host fonts for production performance |
| `<title>` tag | Already correct | Verify spelling |
| Meta description | Not yet added | Add `<meta name="description" content="...">` |
| OG tags | Not yet added | Add Open Graph tags for social sharing |

---

## 9. Customisation Guide

### Changing the color accent
The entire palette is driven by CSS variables at the top of `<style>`. To change the primary accent from purple/lilac to, say, teal/cyan:

```css
--purple: #0e7490;      /* teal-600 */
--lavender: #22d3ee;    /* cyan-400 */
--lilac: #67e8f9;       /* cyan-300 */
```

### Adding a real photo
Replace the `.photo-placeholder` div in the hero section:
```html
<!-- Remove this: -->
<div class="photo-placeholder">
  <span class="photo-initials">M·A</span>
  <span class="photo-hint">Photo coming soon</span>
</div>

<!-- Add this: -->
<img src="assets/images/maryam-headshot.jpg"
     alt="Maryam Abdullahi Ibrahim"
     style="width:100%;height:100%;object-fit:cover;border-radius:24px;">
```

### Connecting the contact form
Using [Formspree](https://formspree.io) (free tier available):
1. Create account at formspree.io
2. Create a new form, get your endpoint (e.g. `https://formspree.io/f/xabcdefg`)
3. Replace the `handleSend()` button with a real form submit:
```javascript
async function handleSend() {
  const btn = document.querySelector('.btn-send');
  const data = {
    name: document.querySelector('input[placeholder*="Ahmed"]').value,
    contact: document.querySelector('input[placeholder*="how should"]').value,
    service: document.querySelector('select').value,
    message: document.querySelector('textarea').value,
  };
  btn.textContent = 'Sending…';
  btn.disabled = true;
  try {
    await fetch('https://formspree.io/f/YOUR_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    btn.textContent = 'Message sent ✓';
    btn.style.background = 'rgba(30,180,100,0.4)';
  } catch {
    btn.textContent = 'Error — try again';
    btn.disabled = false;
  }
}
```

### Adding a mobile hamburger menu
Currently nav links are hidden on mobile (`display: none` below 900px). To add a hamburger:
1. Add a `<button class="nav-hamburger">` inside `<nav>`
2. Toggle a `.nav-open` class on `<nav>`
3. In CSS, show `.nav-links` as a dropdown when `.nav-open` is active

### Adding more services
Duplicate any `.service-card` div inside `.services-grid` and update the icon, name, and description. The grid auto-adjusts.

### Updating metric numbers
Find all elements with `data-target="N"` and change the number:
```html
<span class="count-up" data-target="28">0</span>
<!-- Change 28 to your new number -->
```

---

## 10. Launch Checklist

### Content
- [ ] Replace hero photo placeholder with real headshot
- [ ] Update email address in contact section
- [ ] Update WhatsApp number (full international format: `+234XXXXXXXXXX`)
- [ ] Update Telegram handle
- [ ] Review and approve all bio text
- [ ] Confirm all service descriptions are accurate

### Technical
- [ ] Add `<meta name="description">` tag
- [ ] Add Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Add favicon (`<link rel="icon" href="favicon.ico">`)
- [ ] Connect contact form to backend (Formspree recommended)
- [ ] Test on mobile (iPhone Safari + Android Chrome)
- [ ] Test on tablet
- [ ] Verify all scroll animations fire correctly
- [ ] Verify count-up numbers animate on scroll

### Hosting options
| Platform | Cost | Notes |
|---|---|---|
| GitHub Pages | Free | Ideal for static HTML; easy to update |
| Netlify | Free tier | Drag-and-drop deploy; free form handling |
| Vercel | Free tier | Fast global CDN |
| Hostinger | ~$3/mo | Good for Nigerian hosting with custom domain |

### Domain suggestions
- `maryamibrahim.com`
- `maryamva.com`
- `maryam-ibrahim.com`
- `maryamoperations.com`

### Performance (optional improvements)
- [ ] Self-host Google Fonts to eliminate render-blocking request
- [ ] Add `loading="lazy"` to headshot `<img>` once added
- [ ] Minify HTML/CSS/JS for production using an online minifier
- [ ] Add `prefers-reduced-motion` media query to disable animations for accessibility

---

## Appendix — Communication Templates (from SOP)

These are already embedded in the site's email preview card but documented here for reference.

### Welcome message (virtual classes)
> Good day [Name], We're excited to officially welcome you to the online learning program at XM Trading Academy. Your classes will be held via Zoom or Google Meet. The tutors will communicate the schedule and fix the time for each session…

### Follow-up message
> Hello [Name], Just checking in to see if you are having any difficulty, or need any assistance. Please feel free to reach out anytime.

### Reminder message
> Hello [Name], This is a reminder for your scheduled session today at [time]. We look forward to having you.

### Client inquiry email response
> Subject: Re: Inquiry  
> Hello [Name], Thank you for reaching out. I would be happy to assist you. Please let me know your availability so we can schedule a session at your convenience. Best regards, Maryam

### Complaint handling email
> Subject: Apology and Assistance  
> Hello [Name], I sincerely apologize for the inconvenience caused. Your concern is important to us, and we are working to resolve it as quickly as possible. Thank you for your patience. Best regards, Maryam

---

*Documentation prepared alongside the portfolio prototype — April 2026.*

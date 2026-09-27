# DataPilot Frontend

The web frontend for **DataPilot**, an AI-powered data analysis tool that works through natural language. Users upload spreadsheets and datasets, ask questions in plain English, and DataPilot turns the data into meaningful insights.

Built with React, Vite and Material UI.

## Current scope

The frontend currently has a single landing page made of these sections:

| Section | Component | Description |
| --- | --- | --- |
| Hero | `HeroSection.jsx` | Headline, tagline and short product description |
| Login | `LoginCard.jsx` | DataPilot logo with an email and password login form |
| Demo | `DemoSection.jsx` | "See DataPilot in action" with an autoplaying product video |
| Footer | `FooterSection.jsx` | Product name and copyright line |

> **Note:** The login form is UI only for now. On submit it logs the email and password to the browser console. It is not connected to a backend yet.

## Tech stack

- [React 19](https://react.dev)
- [Vite 8](https://vite.dev)
- [Material UI 9](https://mui.com/material-ui/) with Emotion
- ESLint

## Getting started

### Prerequisites

- Node.js 24.21.0 LTS
- npm

### Install and run

```bash
cd frontend
npm install
npm run dev
```

The dev server prints its local URL, which is http://localhost:5173 by default.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
frontend/
├── public/
│   ├── datapilot.png            # Favicon / public image
│   └── videos/
│       └── LandingPageVideo.webm   # Demo video used on the landing page
├── src/
│   ├── assets/
│   │   └── DataPilotLogo.png    # Logo shown in the login card
│   ├── components/
│   │   ├── common/
│   │   │   └── FormInput.jsx    # Shared text input
│   │   └── landing/
│   │       ├── HeroSection.jsx
│   │       ├── LoginCard.jsx
│   │       ├── DemoSection.jsx
│   │       └── FooterSection.jsx
│   ├── pages/
│   │   └── LandingPage.jsx      # Puts the landing sections together
│   ├── theme/
│   │   └── theme.js             # MUI theme: colours, typography, component styles
│   ├── App.jsx
│   ├── main.jsx                 # App entry, wraps App in the MUI ThemeProvider
│   └── index.css
├── index.html
├── vite.config.js
└── eslint.config.js
```

## Theme

All styling goes through the MUI theme in `src/theme/theme.js`. Use theme values (for example `primary.main` or `text.secondary`) rather than hard-coded colours.

| Token | Value | Use |
| --- | --- | --- |
| `primary.main` | `#006FE6` | Main brand blue, buttons |
| `secondary.main` | `#00B8C8` | Teal accent |
| `background.default` | `#F0F8FF` | Page background |
| `background.paper` | `#FFFFFF` | Cards |
| `text.primary` | `#0B1930` | Main text |
| `text.secondary` | `#5B6678` | Supporting text |
| `divider` | `#E2EAF2` | Borders and dividers |

The hero headline uses a blue-to-teal gradient (`#006FE6` → `#00B8C8`). Typography uses **Inter**, falling back to Roboto, Helvetica and Arial.

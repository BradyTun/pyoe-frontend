# Pyoe - Smart Insurance for Burmese Farmers

A high-tech digital bridge for Burmese farmers that stabilizes income through AI climate monitoring and automated "Smart Insurance" payouts during weather disasters.

## Features

- **Dashboard**: Climate risk gauge, live farm status, quick actions
- **Smart Insurance Portal**: Live monitoring with automated payout phases
- **Knowledge Academy**: Crop recommendations and AI diagnosis interface
- **Market Connection**: Directory of verified buyers with emergency sell options

## Design System

- **Typography**: Sora font (Google Fonts)
- **Colors**:
  - Primary: #059669 (Emerald 600)
  - Surface: #F0FDF4 (Green 50)
  - Accents: #166534 (Green 800), #FACC15 (Warning Yellow)
- **UI Style**: Glassmorphism with rounded-2xl corners and soft shadows
- **Language**: Supports Burmese (Unicode) with English fallback

## Tech Stack

- React 19 (Functional Components)
- Tailwind CSS
- Lucide React (Icons)
- Vite

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx
│   ├── InsuranceHub.jsx
│   ├── KnowledgeAcademy.jsx
│   └── MarketConnection.jsx
├── mockData.js
├── App.jsx
└── main.jsx
```

## Mock Data

The app uses mock data from `src/mockData.js` including:
- Translations (English & Burmese)
- Weather thresholds
- Insurance statuses
- Farm data
- Crop recommendations
- Verified buyers

## UX Considerations

- Optimized for smartphone use in bright sunlight
- High contrast for outdoor readability
- Mobile-first responsive design
- Trust indicators backed by professional partners

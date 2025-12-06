
# Virginia Beach Concierge (React + Vite + Tailwind)

A responsive starter for Netlify + GitHub + GoDaddy.

## Quick Start
```bash
npm install
npm run dev
```

## Build & Deploy
- Push to GitHub
- Connect repo in Netlify
- Netlify uses `netlify.toml` (build: `npm run build`, publish: `dist`, Node 20)
- Set your GoDaddy DNS to Netlify (CNAME/ALIAS as guided by Netlify dashboard)

## Forms (Netlify)
- Newsletter form (`newsletter`) and Review form (`review`) are preconfigured using `data-netlify="true"`
- Submissions will appear in Netlify Forms after first deploy

## Customize
- Edit attractions in `src/data/attractions.js`
- Replace map placeholder in `src/components/MapStub.jsx` with a Google Maps embed or JS API
- Add APIs (Eventbrite, Yelp, Google Places) as needed

## Accessibility
- Keyboard focus states, semantic headings, color contrast-aware palette

# Fumo Plush Commissions

A one-page commission website for custom fumo plushies built with Next.js 16 and Tailwind CSS 4.

## Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **UI**: React 19, Tailwind CSS 4, Plus Jakarta Sans (Google Fonts)
- **Language**: TypeScript
- **Package Manager**: npm

## Running the App

The app runs via the "Start application" workflow (`npm run dev`).
Dev server binds to port 5000 on `0.0.0.0` for Replit compatibility.

## Project Structure

```
app/
  components/
    Header.tsx          — Sticky nav with smooth-scroll links
    HomeSection.tsx     — Crossfade image slideshow (2/3 viewport height)
    AboutSection.tsx    — Description of fumo plushies and the service
    GallerySection.tsx  — Slide-transition carousel of past commissions
    OrderSection.tsx    — Commission request form (email, description, file upload)
    ContactSection.tsx  — Discord and email contact cards
  lib/
    getImages.ts        — Server-side utility: reads image folders via fs
  globals.css           — Global styles, color variables, font
  layout.tsx            — Root layout with metadata and font loading
  page.tsx              — Assembles all sections; reads image folders server-side

public/
  images/
    homepage/           — Drop images here to add home slideshow slides
    past-works/         — Drop images here to add gallery items
```

## Adding Images

No code changes needed — just drop files into the right folder and restart the server:

- **Home slideshow** → `public/images/homepage/`
- **Gallery** → `public/images/past-works/`

Images are sorted alphabetically, so naming controls display order.

## Customizing Text

Each component has easy-to-edit constants at the top of the file:

- `Header.tsx` → `SITE_NAME`
- `ContactSection.tsx` → `DISCORD_USERNAME`, `EMAIL`
- `page.tsx` → `DEFAULT_CAPTION` (shown on all home slideshow slides)

## Color Palette

| Variable | Hex | Usage |
|---|---|---|
| Sage | `#D8E2DC` | About section background |
| White | `#FFFFFF` | Main background, gallery |
| Light Pink | `#FFCAD4` | Order section background |
| Medium Pink | `#F4ACB7` | Accents, dividers, nav border |
| Mauve | `#9D8189` | Text, header, contact background |

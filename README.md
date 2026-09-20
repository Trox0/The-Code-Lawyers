# The Code Lawyers | Engineering Precision & AI Integrity

The Code Lawyers provide disciplined software engineering and responsible AI deployment. We focus on correctness, explainability, and robust guardrails for enterprise systems.

## Features

- **Modern & Responsive Design**: Built with Next.js and Tailwind CSS for a sleek, premium look.
- **Interactive Elements**: Dynamic particles, scrolling animations, and 3D-like effects.
- **Mobile Optimized**: Fully responsive layout that looks great on all devices.
- **Performance Focused**: Optimized for speed and SEO.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: Framer Motion / Custom Canvas

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open your browser**:
    Navigate to [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

The GitHub `main` branch deploys automatically to [thecodelawyers.com](https://thecodelawyers.com) through the existing Vercel project.

## Lamp interactive experience

The homepage introduces Lamp: a Three.js particle portrait with the sculpted loc hairstyle, cursor/touch tracking, a particle pulse, and a native scroll sequence that zooms and brightens before blending into the AI/automation section. Nine local tool masks surround it in two responsive arcs: n8n, ChatGPT, Claude, Gemini, Zapier, Make, LangChain, OpenClaw, and Hermes.

- `components/hero-section.tsx` manages first-frame readiness, the estimated loading indicator, motion preferences, retries, and scroll choreography.
- `lib/lamp-scene.js` owns the WebGL resources; every mount can be aborted and disposed. `lib/lamp-assets.js` retries transient asset failures three times.
- `components/lamp-approach.tsx` provides an interactive particle system and keyboard-accessible service tabs.
- `app/lamp.css` contains the responsive composition. Native scrolling keeps touch and sticky positioning consistent.
- `public/lamp/` contains the local mesh, texture, tool masks, source records, and licenses. Attribution is linked in the footer at `/lamp/credits.html`.

The loader appears on each full navigation and covers the page until the complete scene has rendered. The progress display is an estimate, stays below 100, and slows near completion. A branded static fallback is available if graphics cannot initialize after retries or the overall 90-second deadline. JavaScript-disabled visitors can still read the page. Reduced motion and the pause button are supported; the contact form delivery configuration is unchanged.

### Verify before deploying

```bash
npm ci
npm run build
npx playwright install chromium
npm run start -- --port 3100
# In another terminal:
npm run test:lamp
```

The browser checks cover viewport widths from 320 to 1920 pixels, desktop zoom/brightness, pointer/touch controls, transparent navigation, keyboard service tabs, loading/retry/fallback behavior, reduced motion, and retained business/legal routes. Screenshots are written to ignored `test-results/`. Set `TEST_URL` to validate another running instance.

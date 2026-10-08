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

The homepage introduces Lamp: a Three.js reference-derived particle portrait with swept-back hair, subtle cursor-tracking eyes, a closed rounded cranium with rear hair and depth lighting, cursor/touch portrait turns including shoulder movement, a particle pulse, and a native scroll sequence that zooms and brightens before blending into the AI/automation section. Nine local tool masks surround it in two responsive arcs: n8n, ChatGPT, Claude, Gemini, Zapier, Make, LangChain, OpenClaw, and Hermes.

- `components/hero-section.tsx` manages first-frame readiness, the estimated loading indicator, motion preferences, retries, and scroll choreography.
- `lib/lamp-scene.js` owns the WebGL resources; every mount can be aborted and disposed. `lib/lamp-assets.js` retries transient asset failures three times.
- `lib/lamp-anatomy.js` fits one continuous forehead, cheek, jaw, chin and neck surface to the reference. The chin remains rounded, the exposed neck is shortened below the facial landmarks, and neck depth recedes gradually into the shoulders.
- `lib/lamp-reference.js` preserves the reference's facial proportions and original eye appearance. The portrait turns as one rigid sculpture, with the shoulders moving freely with it. The portrait supports the existing limited turns, not arbitrary 360-degree viewing of a recovered model.
- `components/lamp-approach.tsx` provides an interactive particle system and keyboard-accessible service tabs.
- `app/lamp.css` contains the responsive composition. Native scrolling keeps touch and sticky positioning consistent.
- `public/lamp/` contains the local mesh, texture, tool masks, source records, and licenses. Attribution is linked in the footer at `/lamp/credits.html`.

The loader appears on each full navigation and covers the page until the complete scene has rendered. The progress display is an estimate, stays below 100, and slows near completion. A branded static fallback is available if graphics cannot initialize after retries or the overall 90-second deadline. JavaScript-disabled visitors can still read the page. Reduced motion and the pause button are supported.

### Contact form

The contact form uses the existing EmailJS service and template. Optional build-time environment variables `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` override those public identifiers. Rebuild after changing them. No private key belongs in a `NEXT_PUBLIC_` variable.

The request includes `from_name`, `from_email`, `name`, `email`, `reply_to`, `message`, `subject`, `title`, `to_name`, and `to_email`. `to_email` is always `team@thecodelawyers.com`. In EmailJS template `template_buyrg5o`, set **To Email** to `team@thecodelawyers.com` or `{{to_email}}`, and Reply-To to `{{reply_to}}` or `{{email}}`. Confirm that the service is connected and domain restrictions and quota permit the deployed site. Inline results persist; failed requests preserve the draft and offer an email link. Browser tests intercept EmailJS requests and verify the client flow without sending email; they do not establish inbox delivery or account configuration.

### Verify before deploying

```bash
npm ci
npm run build
npx playwright install chromium
npm run start -- --port 3100
# In another terminal:
npm test
```

The checks cover continuous jaw/neck depth, original reference appearance, six fully settled extreme portrait turns, viewport widths from 320 to 1920 pixels, desktop zoom/brightness, pointer/touch controls, transparent navigation, keyboard service tabs, loading/retry/fallback behavior, reduced motion, retained business/legal routes, and contact form recipient/failure/retry/success. An isolated WebGL test verifies independent eye tracking, moving shoulders, full side profiles and rear occlusion. Screenshots are written to ignored `test-results/`. Set `TEST_URL` to validate another running instance.

# Global Scholars Hub design system

## Design direction

Premium, calm, and trustworthy international SaaS. Use depth and glass only where it improves hierarchy. Avoid noisy gradients, decorative motion competing with content, and low-contrast translucent text.

## Color tokens

```css
--color-ink-950: #07152f;
--color-ink-900: #0b1f42;
--color-ink-700: #334463;
--color-ink-500: #66758f;
--color-surface-0: #ffffff;
--color-surface-50: #f8fafc;
--color-surface-100: #eef2f7;
--color-primary-600: #2563eb;
--color-primary-500: #3b82f6;
--color-cyan-500: #00cfd0;
--color-purple-600: #7c3aed;
--color-success-600: #059669;
--color-warning-600: #d97706;
--color-danger-600: #dc2626;
--color-dark-950: #050816;
```

Text and controls must meet WCAG AA contrast. Color is never the only signal for status, funding, role, or validation.

## Typography

- Display/headings: `Syne`, 600–800, tight tracking for short headlines.
- Body/UI: `DM Sans`, 400–700, 1.5–1.75 line-height for reading.
- Metadata: `DM Mono`, 400–500, used sparingly for labels and timestamps.
- Paragraph measure: 60–75 characters on large screens.
- Minimum body size: 16px on mobile; never use placeholder text as the only label.

## Spacing and shape

Use a 4px base scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

- Page max width: 1200px.
- Desktop gutters: 32–48px.
- Mobile gutters: 16–20px.
- Control height: minimum 44px touch target.
- Card radius: 12px; featured surfaces: 16–20px.
- Hairline border: `--color-surface-100` in light mode and a visible ink-blue border in dark mode.

## Components

- Primary button: navy/blue fill, white label, 150–250ms elevation transition.
- Secondary button: transparent surface with visible border.
- Destructive action: danger color plus text; never color-only.
- Inputs: persistent label, clear focus ring, inline error and recovery copy.
- Cards: use stable hover borders/shadows; never shift layout on hover.
- Tables: dense desktop layout, card/list transformation on mobile.
- Toasts: status icon plus text, live region, dismiss button.

## Motion

- Micro-interactions: 150–250ms.
- Section reveal: 400–650ms, opacity/transform only.
- Hero ambient motion: slow, low-contrast, and disabled under reduced motion.
- Never hijack scrolling or animate essential content indefinitely.
- Use lazy boundaries for heavy animation, charts, editors, and media.

## Responsive breakpoints

`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1440px`.

Validate at 320, 375, 414, 768, 1024, and 1440px. No page may require horizontal scrolling.

## Icon and asset rules

Use one SVG icon family with consistent stroke weight. Meaningful images require descriptive alt text; decorative artwork uses empty alt text. Prefer AVIF/WebP, responsive `srcset`, explicit dimensions, and lazy loading below the fold.

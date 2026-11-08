# CNC Law Firm — Demo web

Demo for **CNC Law Firm, LLC** (Lcda. Cynthia Morales Nieves), San Juan · Guaynabo, Puerto Rico.
Contracts · Notary · Civil Legal Services.

Stack: React + TypeScript + Vite + Framer Motion + Lenis + CSS. **Bilingual: English (default) / Spanish**, with a toggle in the nav. All text lives in `src/content.ts`.

```bash
npm install
npm run dev
npm run build
```

## U.S. legal-website standards included

- Attorney-advertising notice and disclaimer in the footer: no attorney-client relationship, prior results do not guarantee a similar outcome.
- Legal disclaimer, privacy policy and accessibility statement (WCAG 2.1 AA), as modals.
- Contact form with a required consent checkbox and a "no confidential information" warning.
- Phone with click-to-call in the nav, the hero, the floating button and the footer.
- Accessibility: skip link, visible focus, alt text, keyboard support, `prefers-reduced-motion`.
- SEO: description, canonical, Open Graph, and `LegalService` structured data (JSON-LD).
- A section for U.S. mainland clients and an explanation of how Puerto Rico notaries differ.

## To confirm with the client

- Bar or notary admission details, if she wants to show them (e.g. RUA number).
- Facebook URL (`facebook.com/cnclawfirm` is assumed).
- Office address and hours; the site currently says "by appointment".
- The form opens the visitor's email app. Connect a real form service before production.
- Review the Spanish/English copy and the "Legal insights" texts, which are based on her posts.
- Photos are taken from screenshots. Higher-resolution originals would improve quality.
- Testimonials are not included, by design: fabricated reviews are not allowed in attorney advertising.

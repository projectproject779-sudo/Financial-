# Numora

Numora is a production-ready global financial calculator website. It includes:

- loan and mortgage calculators
- compound interest, savings goal, and investment return calculators
- eight major currencies
- dedicated SEO landing pages and educational money guides
- responsive, accessible interactions
- dynamic sitemap, robots policy, social metadata, privacy policy, and terms
- Cloudflare Workers Free deployment configuration
- consent-gated Google Analytics and AdSense integration

## Local development

```bash
npm install
npm run dev
npm run build
```

## Verification

```bash
npm run lint
npm test
npm run cf:dry-run
```

## Cloudflare deployment

The Cloudflare-specific build command embeds the approved public AdSense publisher and ad-unit IDs. A normal `npm run build` keeps advertising disabled, which prevents accidental activation on a hosting plan that does not permit commercial use.

```bash
npm run cf:deploy
```

The production Worker sets a regional advertising eligibility cookie. AdSense remains disabled for the EEA, United Kingdom, and Switzerland until a Google-certified consent management platform is configured.

## Monetization

Google AdSense is integrated through a labelled responsive placement on calculator and guide pages. The verification meta tag and `ads.txt` route use the configured publisher ID. Ad scripts load only after optional consent and only in permitted regions. The site still has to be added to AdSense and approved by Google before ads can serve.

Revenue depends on search rankings, content quality, audience trust, geography, and partner agreements; it is never guaranteed by the code alone.

# Food for Hustlers — replacement website

A responsive, static replacement built after inspecting the live Food for Hustlers site. The final hero direction follows the supplied bicycle-site reference: near-black surroundings, centered typography, restrained navigation, and dramatic product photography.

## Run locally

No dependency installation or build is required. With Node.js installed:

```sh
npm run dev
```

Open http://127.0.0.1:4174. If that port is already in use, run `node server.mjs 4175` instead.

Alternatively, with Python installed:

```sh
python -m http.server 4174 --bind 127.0.0.1
```

Serve this directory over HTTP for the intended experience. Production upload consists of `index.html`, `styles.css`, `refinements.css`, `app.js`, and `assets/`. The server and documentation are development materials.

## Working behavior

- Responsive navigation, including an accessible phone menu.
- Four food-system tabs with keyboard navigation.
- Content filters and four readable field-note dialogs.
- Free-guide dialog leading to the existing official email signup.
- $249 Strategy Call leading to the verified existing Jotform intake.
- Real contact email and YouTube playlist links.
- Expandable FAQs and privacy information.
- Newsletter form design below the FAQ heading, with email validation and a clear unconnected preview state. Connection is deferred by the owner; no subscription data is sent or stored.
- Local fonts and optimized WebP images; no CDN or package dependency at runtime.

## Business integrations

The free ebook is delivered through the existing Systeme.io-powered Food for Hustlers signup. This preview links to that existing flow; it does not collect or pretend to store email addresses. The consultation button opens the existing intake form. It does not invent a payment checkout, calendar, or booking confirmation. Training and Premier inquiries use the real contact email. No external forms were submitted during testing.

No website has been deployed, and the live domain has not been changed.

See [SITE-AUDIT.md](SITE-AUDIT.md) for source findings and launch considerations, [VALIDATION.md](VALIDATION.md) for checks, and [ASSET-CREDITS.md](ASSET-CREDITS.md) for image and font provenance.

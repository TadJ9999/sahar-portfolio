# Sahar Adnan — portfolio

A one-page data analyst portfolio. Light, quiet, and readable: a short pitch,
how a dataset moves through her work, outcomes with a number attached,
experience, skills, and contact.

Built with Vite and plain HTML/CSS/JS. No framework, no tracking.

## Edit the content

Everything on the page comes from **`src/data.js`**: name, headline, the
four-stage method, projects, experience, skills, certifications, education,
languages, and contact links. Edit that file; the layout takes care of itself.

- A project with `draft: true` is not shown. Flip it to `false` when it is ready.
- A project with a `stat` shows one headline number; leave it out for a card without one.
- A job with an empty `bullets` list shows only its title and dates.
- Set `profile.github` and `profile.resumeUrl` when you have them; the links
  appear automatically.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # static site in dist/
npm run preview  # serve dist/ locally
```

## Publish on GitHub Pages (your own account)

1. Make sure this repo lives in your account and is named
   `<your-username>.github.io` (Settings → General → Repository name).
   That name is what makes it your user site at `https://<your-username>.github.io`.
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the
   site and publishes it. First deploy takes a minute or two.

The repo can stay private only on a paid GitHub plan; on the free plan, make
it public before enabling Pages.

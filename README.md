# Angular Portfolio

Personal portfolio and CV web app built with Angular 17 (standalone components), SCSS, and SSR/prerender support.

## Tech Stack

- Angular 17
- TypeScript
- SCSS
- Karma + Jasmine (unit tests)
- GitHub Actions (CI/CD)

## Project Structure

- src/app/pages/home: Portfolio landing sections
- src/app/pages/cv: ATS-friendly CV page
- src/app/shared/components: Reusable UI sections
- src/app/core/services: Theme, print, and CV data services
- src/assets/data/cv.json: Portfolio and CV data source

## Prerequisites

- Node.js 20.x recommended
- npm 10.x recommended

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm start
```

App runs at http://localhost:4200/.

## Build (Production)

```bash
npm run build
```

Build output is generated in dist/angular-portfolio/browser.

## Run Unit Tests

```bash
npm test
```

CI test command:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## CI/CD Workflow

Workflow file: .github/workflows/angular-build-deploy.yml

Current pipeline:

1. Trigger on push to main
2. Install dependencies with npm ci
3. Run unit tests in headless mode
4. Build production bundle with base href /angular-portfolio/
5. Deploy dist/angular-portfolio/browser to prod branch

## Troubleshooting

- If local tests fail with "Cannot find the binary ... chrome.exe", install Google Chrome or set CHROME_BIN to a valid Chrome/Chromium binary path.
- If deployment does not update Pages, verify repository Pages settings and target branch (prod).

## AI Agent Prompt (Build Instructions)

Use this prompt with any coding AI agent when you want it to handle build validation and deployment workflow updates safely.

```text
You are working on an Angular 17 portfolio project.

Goals:
1) Verify the app builds in production mode.
2) Verify unit tests pass in CI mode.
3) Update the GitHub Actions workflow only if needed.
4) Keep changes minimal and do not modify unrelated files.

Repository details:
- Build output path: dist/angular-portfolio/browser
- Production build command: npx ng build --configuration=production --base-href=/angular-portfolio/
- CI test command: npm test -- --watch=false --browsers=ChromeHeadless
- Workflow file: .github/workflows/angular-build-deploy.yml
- Deploy branch: prod

Required steps:
1) Run npm ci.
2) Run CI tests.
3) Run production build.
4) If tests fail due to missing Angular providers in specs, add only the required testing providers.
5) If workflow paths are wrong, fix only those paths.
6) Summarize exactly what changed and why.

Constraints:
- Do not introduce broad refactors.
- Preserve existing project structure.
- Prefer secure defaults in GitHub Actions.
- Do not remove test execution from CI.
```

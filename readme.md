# BNAP Marketing Site

## Toolbox

- [Eleventy](https://11ty.dev)
- [Tailwind](https://tailwindcss.com)

## Development

```
git pull
npm install
npm run dev:cleanSlate
npm run dev
```

By default `npm run dev` will just pull in the 5 days around today's date.
`npm run dev:cleanSlate` brings _all_ the content from the CMS and caches it for 11ty to
use. You should only need to do this once.

You may need to wipe the cached API responses, and the generated static site.
`npm run wipe` will take care of that for you.

## Deployment

11ty builds a static website to the `build` directory, so the static site should be served
from there.

Merging to `staging` will deploy automagically to staging, and to `main` will deploy to
production.

## Content Refresh

To ensure that content is up-to date a nightly cron should be set to run
`npm run production` which will ensure that the latest content devotions are pulled in.

When there is a design change to the devotions template or the content source changes, all
the devotion pages can be rebuilt:

```
npm run content:all
```

Or, in stages when the system resources can't handle a full build in one go:

```
START_DAY=1 END_DAY=40 ELEVENTY=production npx @11ty/eleventy
START_DAY=41 END_DAY=80 ELEVENTY=production npx @11ty/eleventy
...
```

Then upload to the cloud bucket:

```
gcloud storage cp --recursive ./build/ar gs://bnap-website
gcloud storage cp --recursive ./build/de gs://bnap-website
gcloud storage cp --recursive ./build/en gs://bnap-website
...
```

## CMS

Netlify CMS can be run locally with `npm run cms`, and is accessed from
[localhost:8080/admin](http://localhost:8080/admin)`.

⚠️ When running locally the CMS _must_ be accessed via localhost rather that via an local
IP address.

Authentication happens through Netlify Identity, this means that the CMS only works in
production when [deployed to Netlify](https://bioy-marketing.netlify.app/).

## Translations

The site is localised with different paths for each language (`/en`, `/ar`, etc)

## Adding new translations

1. `src/admin/config.yml` - add the new locale code under `i18n/locales`.
2. `src/_data/globals` - add the new locale under `languages`.
3. `src/assets/js/baseViewModel.js` - add the new locale under `supportedLanguages`.

There are two types of translated content:

### Site

Text or image urls that can be used on more than one page are configured in the Settings
section of the CMS and referenced in the templates as follows:

```
<button>{{ site.title }}</button>
```

### Page data

Page data is referenced in the templates as follows:

```
{{ lang.intro }}
```

## SVG clipping

Images often appear in circles, or cut circles. To implement this we use SVG clipping in
the CSS. If this is a new technique to you, enjoy
[Sara Soueidan's Clipping in CSS and SVG article](https://www.sarasoueidan.com/blog/css-svg-clipping/).

To get this working responsively you need to use the
[clipPathUnits attribute](https://www.sarasoueidan.com/blog/css-svg-clipping/#clippathunits)
and convert the points from absolute units, to percentage units. Use this tool:
[https://yoksel.github.io/relative-clip-path/].

## Tech Debt

- Eleventy 3.0 for ESM support
- Replace Laravel Mix
- Tweak the content refresh cron to build a content subpath

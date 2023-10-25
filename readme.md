# BiOY Marketing Site

## Toolbox

- [Eleventy](https://11ty.dev)
- [Tailwind](https://tailwindcss.com)

On build 11ty will pull and cache the API response from the BiOY API into the `.cache`
directory.

## Development

```
git pull
npm install
npm run dev:cleanSlate
npm run dev
```

By default `npm run dev` will just pull in the 5 days around today's date.
`npm run dev:cleanSlate` brings _all_ the content and caches it for 11ty to use. You
should only need to do this once.

You may need to wipe the cached API responses, and the generated static site.
`npm run wipe` will take care of that for you.

## Deployment

11ty builds to the `build` directory, so nginx/apache should be set to serve from there.

```
git pull
npm install
npm run production
```

Merging to `staging` will deploy automagically to staging, and to `main` will deploy to
production.

### Production

To ensure that content is up-to date on the server a nightly cron should be set to run
`npm run production` which will ensure that the latest content devotions are pulled in.

When changing design, to ensure that that devotion pages are updated
`npm run production:cleanSlate` should be run.

### Build content for a specific day range

```
START_DAY=1 END_DAY=20 ELEVENTY=production npx @11ty/eleventy
```

## CMS

Netlify CMS can be run locally with `npm run cms`, and is accessed from
[localhost:8080/admin](http://localhost:8080/admin)`.

⚠️ When running locally the CMS _must_ be accessed via localhost rather that via an local
IP address.

Authentication happens through Netlify Identity, this means that the CMS only works in
production when [deployed to Netlify](https://bioy-marketing.netlify.app/).

## Translations

The site is localised with different paths for each language (`/en`, `/ar`, etc). On the
production server an nginx rule exists to sniff the users' browser language and then
redirects accordingly. If there are no obvious languages, then the user is invited to pick
(see `src/index.njk`).

## Adding new translations

1. `src/admin/config.yml` - add the new locale code under `i18n/locales`.
2. `src/_data/globals` - add the new locale under `languages`.
3. When ready for deployment, add the new translation to the nginx record.

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

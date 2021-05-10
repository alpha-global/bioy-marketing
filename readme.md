# BiOY Marketing Site
## Toolbox

- [Eleventy](https://11ty.dev)
- [Tailwind](https://tailwindcss.com)

On build 11ty will pull and cache the API response from the BiOY API into the `.cache` directory.

## Development

```
git pull
npm install
npm run setup
npm run dev
```

By default `npm run dev` will just pull in the 5 days around today's date. `npm run setup` brings _all_ the content and caches it for 11ty to use. You should only need to do this once.

You may need to wipe the cached API responses, and the generated static site. `npm run wipe` will take care of that for you.

## Deployment

11ty builds to the `build` directory, so nginx/apache should be set to serve from there.

```
git pull
npm install
npm run production
```

Merging to staging will deploy automagically to staging.


## Translations

There are two tipes of translated content:
### Site

Text or image urls that can be used on more than one page are configured in the Settings section of the CMS and referenced in the templates as follows:

```
<button>{{ site.title }}</button>
```

### Page data

Page data is referenced in the templates as follows:

```
{{ lang.intro }}
```


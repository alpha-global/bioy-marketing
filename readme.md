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
### Labels

Short micro-copy text used for labels can be maintained in the _data/labels/ folder and these are translated outside of the cms. In a template this can be referenced as follows:

```
<button>{{ label.home.cta }}</button>
```

### Blocks

The cms multi-lingual functions has limitations that force us to write translations to a fixed folder structure in the _data folder. This results in a less-than ideal navigation experience for the content editors when they have two sets of page names displaying on the index page.

Blocks are referenced in the templates as follows:

```
{{ block.home.intro }}
```


# BiOY Marketing Site
## Toolbox

- [Eleventy](https://11ty.dev)
- [Tailwind](https://tailwindcss.com)

On build 11ty will pull and cache the API response from the BiOY API into the `.cache` directory.

## Development

```
git pull
npm install
npm run dev
```

You may need to wipe the cached API responses, and the generated static site. `npm run wipe` will take care of that for you.

## Deployment

11ty builds to the `build` directory, so nginx/apache should be set to serve from there.

```
git pull
npm install
npm run production
```

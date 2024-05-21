# elevareci.ca

`Elevare™️ Career Institute Main Marketing Site`

## Tools used

- `parceljs`
- `node.js`
- `bootstrap`

## Hosting

This site is designed to be generated as a "static" site, therefore, any basic webserver can host it.
However, it is currently hooked up to Cloudflare pages, so whenever changes are pushed to this repo, they get pushed to Cloudflare.
Cloudflare runs the `npm run build` command and then deploys the contents of the `./dist` folder to their network.

## How to update

1. Clone this repo
1. cd into the repo folder
1. Install the NPM packages

```bash
npm install
```

Note: Ignore the notice regarding Sharp. The issue only applies to servers running the library. We only use it to resize our photos during the generation process, therefore the library can't be exploited.

1. Once install, run the start script.

```bash
npm run start
```

1. The site will then be accessible at [http://localhost:1234]

The pages are generated using templates using the `posthtml-extend` plugin.

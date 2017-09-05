PiZilla
=======
[![Build Status](https://travis-ci.org/nkprince007/PiZilla.svg?branch=master)](https://travis-ci.org/nkprince007/PiZilla)

Setting up for production:
--------------------------

- Install all **npm modules** with

```bash
npm install
```

- Build the react application with

```bash
npm run build:react
```

- Change your port configuration for `80` if you like so in `config.js`

- Start the **node** server with

```bash
npm start
```

>Note: Wiring up a *systemd service* is a better option.

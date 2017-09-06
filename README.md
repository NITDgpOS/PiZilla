PiZilla
=======
[![Build Status](https://travis-ci.org/NIT-dgp/PiZilla.svg?branch=master)](https://travis-ci.org/NIT-dgp/PiZilla)
[![Docker Automated buil](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/nkprince007/pizilla/)

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

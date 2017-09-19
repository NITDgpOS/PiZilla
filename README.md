# PiZilla

[![Build Status](https://travis-ci.org/NIT-dgp/PiZilla.svg?branch=master)](https://travis-ci.org/NIT-dgp/PiZilla)
[![Docker Automated buil](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/nitdgpos/pizilla/)

### Made with ❤️ and 🍕 by [NITDgpOS][nitdgpos]

## How we code it 💻

This application is built entirely using **[Express][express]** and
**[ReactJS][react]**. Transpiled using **[Babel][babel]** with
**[Webpack3][webpack]** and Hot Module Reloading.
For a full list of dependencies, refer [here](/package.json).

The codebase holds [EcmaScript 2016][es7] syntax along with extensions for
[transform-runtime][tr], [transform-class-properties][tcp]
and [transform-object-rest-spread][tors] operators.

## Coding guidelines 🙌🏻

We use **[eslint:recommended][eslint]** superimposed by a few good and easy
changes, especially for ReactJS. Check our eslint configuration
[here](/.eslintrc). 🔧

## Setting up 🛠 the environment

Assuming you've **[node][node]** installed on your system, install all the
package dependencies with `npm install` or `yarn` (if you use **[yarn][yarn]**).

Run the development server with `npm run dev` or `yarn dev`. Don't worry, we
support live reloading web pages, ❤️ to webpack team.

That's it! Happy hacking...

## Wish to help us?

Please check our contribution guide [here](/CONTRIBUTING.md).

## Setting up for production 🛳

Install all **npm dependencies** with `npm install` or `yarn`.

Build the react application with `npm run build:react` or `yarn build:react`.

Configure your backend server accordingly at
[server/config.js](/server/config.js).

Available options:
```javascript
const config = {
    deadline: 24, // hours beyond which a file is deleted
    deleteSchedule: '00 00 */2 * * *', // runs the check once every two hours
    port: 80, // configure your server port number
    root: path.dirname(__dirname), // the root directory of application
    uploads: 'uploads' // the location where uploads are to be saved
};
```

Start the **Express** server with `npm start` or `yarn start`.

> Note: Make sure you have write access to the **uploads** folder. 👍🏻

## Creating docker image for pizilla

Generate the automated image 🐳 via `docker build -t pizilla .`

Then run it via `docker run -p 80:8000 pizilla`

[nitdgpos]: https://github.com/NIT-dgp
[express]: https://expressjs.com
[react]: https://facebook.github.io/react
[babel]: https://babeljs.io
[webpack]: https://webpack.js.org/concepts/
[es7]: https://www.ecma-international.org/ecma-262/7.0/
[tr]: https://babeljs.io/docs/plugins/transform-runtime/
[tcp]: https://babeljs.io/docs/plugins/transform-class-properties/
[tors]: https://babeljs.io/docs/plugins/transform-object-rest-spread/
[eslint]: https://eslint.org/docs/rules/
[node]: https://npmjs.org
[yarn]: https://yarnpkg.com

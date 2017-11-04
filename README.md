![PiZilla](/.github/assets/PiZilla-text.png)

***

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ace237dc86644d0abee76f7b8511c365)](https://www.codacy.com/app/nkprince007/PiZilla?utm_source=github.com&utm_medium=referral&utm_content=NIT-dgp/PiZilla&utm_campaign=badger)
[![Build Status](https://travis-ci.org/NITDgpOS/PiZilla.svg?branch=master)](https://travis-ci.org/NITDgpOS/PiZilla)
[![Docker Automated buil](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](https://hub.docker.com/r/nitdgpos/pizilla/)

***

# How we code it 💻

**PiZilla** is built entirely using **[Express][express]** and
**[ReactJS][react]**. Transpiled using **[Babel][babel]** with
**[Webpack3][webpack]** and Hot Module Reloading.
For a full list of dependencies, refer [here](/package.json).

The codebase holds [EcmaScript 2016][es7] syntax along with extensions for
[transform-runtime][tr], [transform-class-properties][tcp]
and [transform-object-rest-spread][tors] operators.

# Configuring PiZilla 🛠

- Install all dependencies with `npm install` or `yarn` (if you use
  **[yarn][yarn]**).
- To run the server for development on localhost, use `npm run dev` or `yarn dev`.
  (includes support for live reload)
- Build the react application with `npm run build` or `yarn build`.
- Configure your backend server accordingly at [server/config.js](/server/config.js).

```javascript
const config = {
    deadline: 24, // hours beyond which a file is deleted
    deleteSchedule: '00 00 */2 * * *', // runs the check once every two hours
    port: 80, // configure your server port number
    root: path.dirname(__dirname), // the root directory of application
    uploads: 'uploads' // the location where uploads are to be saved
};
```

- Start the **Express** server with `npm start` or `yarn start`.

> Note: Make sure you have write access to the **uploads** folder. 👍🏻

***

# Throughput Graph

[![Throughput Graph](https://graphs.waffle.io/NIT-dgp/PiZilla/throughput.svg)](https://waffle.io/NIT-dgp/PiZilla/metrics/throughput)

# 🌍 Important Links

- [Contribution Guidelines](/.github/CONTRIBUTING.md)
- [Code of Conduct](/.github/CODE_OF_CONDUCT.md)
- [eslint configuration](/.eslintrc)

[nitdgpos]: https://github.com/NIT-dgp
[express]: https://expressjs.com
[react]: https://facebook.github.io/react
[babel]: https://babeljs.io
[webpack]: https://webpack.js.org/concepts/
[es7]: https://www.ecma-international.org/ecma-262/7.0/
[tr]: https://babeljs.io/docs/plugins/transform-runtime/
[tcp]: https://babeljs.io/docs/plugins/transform-class-properties/
[tors]: https://babeljs.io/docs/plugins/transform-object-rest-spread/
[node]: https://npmjs.org
[yarn]: https://yarnpkg.com

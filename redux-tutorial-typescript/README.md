Redux + React + TypeScript
==========================

The demo application is the result of following the tutorials on 'React+Redux' on [YouTube] by [LearnCode.academy].
The original code (in JavaScript, see [GitHub]) was then ported to TypeScript. The code was furthermore expended by:

* introducing [Lenses] in the reducers
* adding async-await constructs in the actions
* expanding the Webpack configuration for development and production, including
    * minify/uglify the produced JavaScript on production deployment
    * separating the CSS in a separate (minified) file on production deployment
    * packaging related assets (images, etc.) with the production deployment
* adding a Maven wrapper for integration with projects that are deployed in such ecosystem (inspired by [phillipgreenii])

[YouTube]: https://www.youtube.com/playlist?list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt
[LearnCode.academy]: https://www.youtube.com/channel/UCVTlvUkGslCV_h-nSAId8Sw
[GitHub]: https://github.com/learncodeacademy/react-js-tutorials
[Lenses]: https://github.com/gcanti/monocle-ts
[phillipgreenii]: https://gist.github.com/phillipgreenii/7c954e3c3911e5c32bd0


Installation
------------

To install this code, please make sure that `npm` and `webpack` are installed. Then run `npm install` to download all
dependencies. Finally execute one or more of the following commands:

    npm start           # starts the development server; go to http://localhost:8080 in your browser to see the result
    npm run build       # packages everything into a minified set of files; see the ./build folder for the result
    mvn clean install   # packages everything into a *.war file for further deployment

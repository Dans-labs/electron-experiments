react-redux-template
====================

Template project for creating a web application with React and Redux


BUILDING FROM SOURCE
--------------------

**Prerequisites:**

* NodeJS 8.9.4 or higher
* NPM 5.6.0 or higher

**Download the project:**

    git clone https://github.com/Dans-labs/electron-experiments.git
    cd react-redux-template
    [using NPM] npm install

**Running dev server:**

* `npm start`
* go to [http://localhost:3000] in your favorite browser

**Building for production:**

* using NPM
    * `npm run build`
    * the output can be found in `./target/build`

[http://localhost:3000]: http://localhost:3000


USAGE
-----

To use this project, copy it to the desired directory. Then, remove the `node_modules` and `package-lock.json` from this
copy and install the project.

    # starting from 'electron-experiments' root
    cp -rf react-redux-template <path/to/your/project>
    rm -rf node_modules package-lock.json
    npm install
    npm start

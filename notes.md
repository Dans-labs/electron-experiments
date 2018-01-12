Used tutorials
==============
* https://www.youtube.com/watch?v=mr9Mtm_TRpw
* https://www.youtube.com/watch?v=kN1Czs0m1SU

Set up Electron App
===================
* (assumption: npm is already installed)
* `npm init` and work through the Q&A
  * for `entrypoint` use `main.js`
* `npm install -g electron`
* `npm install --save electron`
* in `package.json` replace `script.test` with `"start": "electron ."` (with this you can start the application while developing with `npm start` rather than `electron .`)
* create the `main.js` and `index.html` (or however you wanna call this html file) files

Styling
=======
* http://materializecss.com/
* https://bootswatch.com

Toggle between production and development
=========================================
* in `main.js` we set the developer tools and reload functionality only if the environment is not in production, see the `Add developer tools item if not in production` comment
* in `main.js` we can set the environment variable, see the `SET ENV` comment

Install/release the application
===============================
* see https://www.christianengvall.se/electron-packager-tutorial/
* npm install electron-packager --save-dev
* add scripts from the blog to `package.json` and modify for Windows `--version-string.ProductName` to your own product name and for Linux `--icon=assets/icons/png/icon.png`
* download/point to the correct icons
  * I used http://www.iconarchive.com/show/real-vista-business-icons-by-iconshock/shopping-cart-icon.html
* (to create the Windows release on Mac, you need to `brew cask install xquartz` and `brew install wine` first!)
* run the package scripts:
  * Windows: `npm run package-win`
  * Mac: `npm run package-mac`
  * Linux: `npm run package-linux`

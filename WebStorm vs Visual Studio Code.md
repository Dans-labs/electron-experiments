WebStorm vs Visual Studio Code
==============================

**Reviews**

* https://rationaldev.com/webstorm-vs-visual-studio-code/
* https://blog.goyello.com/2016/06/30/visual-studio-code-vs-webstorm/
* http://www.jjinux.com/2017/12/my-thoughts-on-vs-code-vs-webstorm.html

**Comparison**

WebStorm | VS Code
---------|--------
IDE | Editor with some IDE features (although [[jjinux](http://www.jjinux.com/2017/12/my-thoughts-on-vs-code-vs-webstorm.html)] calls it an IDE)
Payed | Free
Features we're already familiar with from IntelliJ IDEA; they share the same underlying platform | Has nothing to do with Visual Studio! It's made by the same company, but while Visual Studio is mainly focused on the Microsoft Windows ecosystem, VS Code can deploy in many environments and is based on web technology
Plugins; same/shared plugins with other Jetbrains products | Extensions, similar to Webstorm
Heavier and therefore a little slower (not really applicable for the machines we use) | Based on Electron/HTML/JavaScript and therefore faster
Configuration via a GUI, equivalent to IntelliJ IDEA | Configuration by editting a JSON file
Source control equal to IntelliJ IDEA | Only basic Git integration; it is advised to use GitHub Desktop or Sourcetree instead
Autocomplete with auto-import (immediately add the correct import statement when using autocompletion) | Autocompletion works, but it does not add the import statement by itself; you have to do that manually
Optimize imports and show unused imports in grey/as warning | No import optimization and doesn't show unused imports
Refactoring done like in other Jetbrains products (that's what an IDE is supposed to do) | Almost no refactorings available (renaming a class is still an open issue)
Doing multiple searches across your whole project in different tabs (as in IntelliJ) | Only one global search at a time
I haven't done any debugging, but they seem fairly similar in that regard according to the reviews (breakpoints, watch variables, etc.) |
I haven't done any testing, but according to the reviews, WebStorm has more built in features for that |
Better support for live templates. `"abc".log` transforms into `console.log("abc")`; `ul.foo.bar` transforms into `<ul className="foo bar"></ul>` | Has some support for live templates. It can do the latter one as well, but it can't do the former.
Formatting is done by both tools. Settings for formatter editted using GUI with the usual possibilities to import/export | Settings for formatter by editting JSON file(s)
Integrated NPM support | NPM support via a plugin, but couldn't get it to work immediately
Recommended for the medium/larger sized projects | Good for small/medium sized projects

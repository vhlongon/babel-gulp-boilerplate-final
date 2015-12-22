First run:
npm install

Then:
gulp ('development' is the default task)

Everything is transpiled from es2015 to es5 with babel and bundled using browserify, the entry point is app/js/app.js.
You can use, for instance,  import/export declarations and require modules in different files.

Cssnext (postCSS plugin) has also been included so you can start using future futures and it will provide fallbacks.

# Apps/C Usage

This document describes how to build JavaScript components using the Apps/C [Grunt](http://gruntjs.com/) builder. It compiles CoffeeScript, JavaScript and Eco into CommonJS/1.1 Modules providing AMD/CommonJS/window external interface.

Example `Gruntfile`:

```coffeescript
module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON("package.json")

        apps_c:
            commonjs:
                src: [ 'src/**/*.{coffee,js,eco}' ]
                dest: 'build/app.js'
                options:
                    main: 'src/index.js'
                    name: 'MyApp'

    grunt.loadNpmTasks('grunt-apps-c')

    grunt.registerTask('default', [ 'apps_c' ])
```

You can now include the `build/app.js` file and, depending on your surrounding environment, you will be able to load it using RequireJS/AMD, CommonJS or straight from `window` under the `MyApp` key.

## Config

The `options.main` property specifies which file will be considered the "main" one for your package. Somehow, the external world needs to know what to get when they call `require(package_name)`. If you do not specify this property the following actions are taken:

1. We try make use of the property `main` as specified in your app's

   `package.json` file. Failing that, we...

2. Try to find the `index.[js|coffee]` file that is closest to the root of your sources.

The `options.name` overrides the name of the package in `package.json`. It specified the name of the exported package as in: `require(name)`. One can pass in an array of names, as alternatives, as well.

### Eco Templates

Are precompiled so when you require them, you need to only pass a `context` to them to get a string back.

## CommonJS/1.1 Modules

The following template wraps your modules:

```javascript
// filename
require.register('package/path.js', function(exports, require, module) {
  // ...
});
```


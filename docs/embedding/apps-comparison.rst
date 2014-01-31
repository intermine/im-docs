.. index:: embedding, javascript embedding, apps, widgets

Apps/* Comparison
=================

We have developed a variety of builders that can be used to make the development and deployment of your JavaScript_ components easier.

Follow the guide below to decide which approach is the best for your situation. If in doubt use `Apps/C`.

Apps/A
------

url
    https://github.com/intermine/apps-a-middleware

examples
    https://github.com/intermine/intermine-apps-a

languages
    JavaScript_, CSS_, Stylus_, CoffeeScript_, LiveScript_, TypeScript_, Eco_, Hogan_

what
    Middleware for loading apps, resolving vendor dependencies at runtime and sandboxing CSS_ styles.

when
    You are loading a lot of apps on a page and they are likely going to depend on the same vendor library dependencies. These are resolved at runtime, in the browser, and thus you can save on requests by sharing the same libraries over and over. You want to automatically prefix your CSS_ styles so that your app does not clash with the rest of the apps/styles on the page. You want to provide an example config that people are to use with your app, but want to give developers the ability to override. You want to create a repository of apps and have a delivery mechanism ready (`git` is supported).

issues
    Dynamic resolving of libraries at runtime is nice but it takes one app to crash them all. You could also encounter a situation where one app needs say jQuery `1.9` and another jQuery `2.0`, try solving that one.

alternatives
    Use `Apps/C` together with pommejs_ to load apps in an iframe so it has no chance of colliding with the other resources on the page.

Apps/B
------

url
    https://github.com/intermine/apps-b-builder

examples
    NA

languages
    JavaScript_, CSS_

what
    Builder for ComponentIo_ based packages.

when
    Use it when you want as small a build as possible relying on packages in the ComponentIo_ ecosystem. As all vendor dependencies take the CommonJS_ approach to loading files, you will unlikely going to encounter difficulty running your app besides other apps on the page.

issues
    One has to develop in JavaScript_, CSS_ and cannot use languages such as CoffeeScript_ if your app is to be available through the ComponentIo_ ecosystem.

alternatives
    Use `Apps/C` and use the `grunt-component-io` task to make use of libraries available through the ComponentIo_ ecosystem.

Apps/C
------

url
    https://github.com/intermine/grunt-apps-c

examples
    https://github.com/intermine/intermine-apps-c

languages
    JavaScript_, CoffeeScript_, Stylus_, Eco_, Mustache_, JSON_ *and more*

what
    A Grunt_ based builder. Allowing to run arbitrary tasks and make use of Bower_ ecosystem for vendor dependencies.

when
    You want to use the *de-facto* standard in building & bundling JavaScript_ applications; this gives you access to big ecosystems of libraries to choose from.

issues
    You need to prefix your CSS_ styles yourself (use `grunt-rework`) and your bundled packages can clash if you are depdending on libraries that export themselves globally (on `window` object). To alleviate these issues you can load your app using the pommejs_ library. Since none of your builds share resources (unless you make a mega-build), your apps can get bulky.


.. _ComponentIo: http://component.io/
.. _CommonJS: http://addyosmani.com/writing-modular-js/
.. _pommejs: https://github.com/radekstepan/pomme.js
.. _Bower: bower.io
.. _Grunt: gruntjs.com
.. _CoffeeScript: http://coffeescript.org/
.. _JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
.. _LiveScript: http://livescript.net/
.. _CSS: http://www.htmldog.com/guides/css/beginner/
.. _Stylus: http://learnboost.github.io/stylus/
.. _TypeScript: http://www.typescriptlang.org/
.. _Hogan: http://twitter.github.io/hogan.js/
.. _Eco: https://github.com/sstephenson/eco
.. _Mustache: http://canjs.com/docs/can.Mustache.html
.. _JSON: http://www.json.org/
publication-search
==================

.. note::

    You can view the source files for this project in the `intermine/intermine-apps-c <https://github.com/intermine/intermine-apps-c/tree/master/publication-search>`_ repo.

This document will guide you through the process of writing a JavaScript client side app (running completely in a browser) using Bower_ and Grunt_ tools. This app will connect to an InterMine_ instance to run a query. The objective will be to fetch a list of publications for each *bio entity* found that is like our query.

The libraries we will be using:

#. Bower_ to fetch vendor dependencies such as JavaScript, CSS or Fonts.
#. canJS_ is a framework for client-side development handling routing, events etc.
#. CoffeeScript_ a language that compiles down to JavaScript and makes writing an app easier.
#. Foundation_ is a CSS framework of reusable UI components.
#. Grunt_ to build/transpile our source files.
#. jQuery_ is a DOM manipulation library (and more).
#. Mustache_ is a multi-platform templating language allowing us to embed dynamic objects in HTML.
#. Node_ JavaScript desktop software platform.
#. Stylus_ allows us to be more expressive and dynamic with CSS.
#. Lodash_ is a utility toolbelt making actions such as iterating over items easier.

Initialize Project
------------------

The first step will be to setup our directory structure.

.. code-block

    ├──build/
    │  ├──css/
    │  └──js/
    ├──example/
    │  └──index.html
    ├──src/
    │  ├──components/
    │  ├──models/
    │  ├──modules/
    │  ├──styles/
    │  └──templates/
    ├──bower.json
    └──package.json

build/
    Will be the directory where our final app package will live. We will develop in languages like Stylus or CoffeeScript and need a way to package all these resources into one whole... directory. This is where all these files will live.

bower_components/
    This directory will be automatically created and will contain libraries we have requested through the Bower system.

example/
    Contains an example of our app in use.

src/
    Source files that our code will consist of.

bower.json
    Will contain a listing of libraries we want to download using Bower.

package.json
    Lists libraries we will need to compile and build our app.

Node.js platform
~~~~~~~~~~~~~~~~

Since our application is targeting JavaScript in the browser, it is pretty useful if we use JavaScript on our computer (desktop) too. Enter Node_ which allows us to execute JavaScript on our computers instead of just our browsers.

You can fetch `binaries <http://nodejs.org/download/>`_ from the homepage or use your (hopefully Linux) `packman <https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager>`_.

Once Node is installed, edit the ``package.json`` file like so:

.. code-block:: json

    {
        "name": "publication-search",
        "version": "0.0.0",
        "devDependencies": {
            "bower": "~1.2.7",
            "grunt": "~0.4.1",
            
            "grunt-apps-c": "0.1.14",
            "grunt-contrib-concat": "~0.3.0",
            "grunt-contrib-stylus": "~0.9.0",

            "grunt-contrib-uglify": "~0.2.5",
            "grunt-contrib-cssmin": "~0.6.2"
        }
    }

This file tells Node which libraries will be used to build our app. These are not client-side libraries, but server-side if you will.

The top bit of the ``devDependencies`` lists a bunch of Grunt and Bower related libraries.

In order to install all of these, execute the following:

.. code-block:: bash

    $ npm install -d

Bower vendor dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~

Now we want to fetch libraries that our app, when running, will depend on.

Edit the ``bower.json`` file like so:

.. code-block:: json

    {
        "name": "publication-search",
        "version": "0.0.0",
        "dependencies": {
            "jquery": "2.0.3",
            "lodash": "2.4.1",
            "canjs": "2.0.4",
            "foundation": "5.0.2",
            "imjs": "3.2.1"
        }
    }

The file has a bunch of key-value pairs.

name
    Name of our application in the Bower ecosystem, required.

version
    Version number in the Bower ecosystem, required.

dependencies
    Lists the actual libraries and their versions to fetch. You can populate this list by executing ``$ bower install jquery --save`` for example. That will download the latest version of the ``jquery`` component into the ``bower_components/`` directory. You can `search <http://sindresorhus.com/bower-components/>`_ for available components using ``$ bower search jquery``. To actually trigger a search, execute ``$ bower install``. The different libraries will be introduced as we code along.

Grunt building
~~~~~~~~~~~~~~

Grunt is used to munge files together and execute commands on them. Create a file called ``Gruntfile.coffee``:

.. code-block:: coffee-script

    module.exports = (grunt) ->
        grunt.initConfig
            pkg: grunt.file.readJSON("package.json")
            
            apps_c:
                commonjs:
                    src: [ 'src/**/*.{coffee,mustache}' ]
                    dest: 'build/js/ps.js'
                    options:
                        main: 'src/app.coffee'
                        name: 'ps'

            stylus:
                compile:
                    src: [ 'src/styles/app.styl' ]
                    dest: 'build/css/ps.css'

            concat:            
                scripts:
                    src: [
                        # Vendor dependencies.
                        'vendor/jquery/jquery.js'
                        'vendor/lodash/dist/lodash.js'
                        'vendor/canjs/can.jquery.js'
                        'vendor/canjs/can.map.setter.js'
                        'vendor/imjs/js/im.js'
                        # Our app.
                        'build/js/ps.js'
                    ]
                    dest: 'build/js/ps.bundle.js'
                    options:
                        separator: ';' # for minification purposes

                styles:
                    src: [
                        'vendor/foundation/css/normalize.css'
                        'vendor/foundation/css/foundation.css'
                        # Our app.
                        'build/css/ps.css'
                    ]
                    dest: 'build/css/ps.bundle.css'

            uglify:
                scripts:
                    files:
                        'build/js/ps.min.js': 'build/js/ps.js'
                        'build/js/ps.bundle.min.js': 'build/js/ps.bundle.js'

            cssmin:
                combine:
                    files:
                        'build/css/ps.bundle.min.css': 'build/css/ps.bundle.css'
                        'build/css/ps.min.css': 'build/css/ps.css'

        grunt.loadNpmTasks('grunt-apps-c')
        grunt.loadNpmTasks('grunt-contrib-stylus')
        grunt.loadNpmTasks('grunt-contrib-concat')
        grunt.loadNpmTasks('grunt-contrib-uglify')
        grunt.loadNpmTasks('grunt-contrib-cssmin')

        grunt.registerTask('default', [
            'apps_c'
            'stylus'
            'concat'
        ])

        grunt.registerTask('minify', [
            'uglify'
            'cssmin'
        ])

This file is written in CoffeeScript_ and lists the tasks to run when we want to build our app. From the top:

apps_c
    This directive says that we want to take any CoffeeScript_ and Mustache_ files we find in ``src/`` and make them into one JavaScript package.

stylus
    Take a Stylus_ file and turn it into CSS.

concat
    Take our vendor files (installed using Bower_) and, together with our app, make them into a bundle. If someone else wants to use our app they need our app and its deps too, so this one file will do it for them. Do the same to CSS too.

uglify
    Minify our built JavaScript files. This makes them small, but unreadable so not great for debugging.

cssmin
    The same as ``uglify`` but for CSS

Then we have two calls to ``grunt.registerTask`` which bundle a bunch of tasks together. For example running ``$ grunt minify`` will run the ``uglify`` and ``cssmin`` tasks.

While developing it is quite useful to watch the source files and re-run the build task:

.. code-block:: bash

    $ watch --color grunt

This will run the default Grunt task every 2s.

Source files
------------

Example page
~~~~~~~~~~~~

One needs an access point where our app will get loaded with particular configuration. This is where the ``example/index.html`` comes in:

.. code-block:: html

    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Publication Search</title>
        
        <link href="build/css/ps.bundle.css" media="all" rel="stylesheet" type="text/css" />
        <script src="build/js/ps.bundle.js"></script>
    </head>
    <body>
        <div id="app"></div>
        <script>
            // Once scripts have loaded.
            $(function() {
                // ...show the app.
                require('ps')({
                    'el':   '#app',
                    'mine': 'http://www.mousemine.org/mousemine'
                });
            });
        </script>
    </body>
    </html>

This file does not do anything else other then load our built CSS and JS files and starts our app once the page loads. In our example we are pointing to a ``build`` directory relative to the ``example`` directory. So let's make a symbolic link to the actual ``build``:

.. code-block:: bash

    $ ln -s ../build build/

Such links get preserved when version controlling using Git_. We are linking to our bundled builds that contain vendor dependencies too.

Then we are waiting for the page to load and call our (future) app with some config.

The name ``ps`` is being configured in the ``Gruntfile.coffee`` file in the ``apps-c`` task.

As for the config:

el
    Selector where our app should be displayed.

mine
    Points to an InterMine_.

The ``require`` call on relates to CommonJS_. It is one way of loading JavaScript modules. It avoids having to expose all of our functions and objects on the global (``window``) object and implements a way of relating between different files.

App index
~~~~~~~~~

We have asked to load an app in our ``example/index.html`` page, now we are going to write the backing code.

The ``apps-c`` task (in ``Gruntfile.coffee``) contains the following two options:

name
    How do we call our app for CommonJS_ ``require`` call.

main
    Contains a path (an index) that will be called when we actually call the ``require`` function.

We have specified that our app index lives in ``src/app.coffee`` so let's create this file:

.. code-block:: coffee-script

    render  = require './modules/render'
    query   = require './modules/query'
    imjs    = require './modules/imjs'
    state   = require './modules/state'

    layout  = require './templates/layout'

    components = [
        'alert'
        'search'
        'table'
    ]

    module.exports = (opts) ->
        # Load the components.
        ( require "./components/#{name}" for name in components )

        # Setup the UI.
        $(opts.el).html render layout

        # Do we have mine set?
        return state.attr { 'type': 'warning', 'text': 'Mine is not set' } unless opts.mine

        # Setup the client.
        imjs.attr { 'client': new intermine.Service 'root': opts.mine }
        
        # Manually change the query to init the search?
        query(q) if q = opts.symbol

Each module (file) in our app needs to export some functionality. When we call ``require`` we will be getting this functionality.

We are going to be using canJS_ which consists of objects that can be *observed*. What this means is that when their values change, others listening to this changes will be notified. When we want to `change <http://canjs.com/docs/can.Map.prototype.attr.html>`_ their value we call ``attr`` function on them. One such example is on *line 7* where we change the value of ``index``, ``type`` and ``client`` as passed in by the user from ``example/index.html``.


























.. _Bower: http://bower.io/
.. _Grunt: http://gruntjs.com/
.. _CoffeeScript: http://coffeescript.org/
.. _Mustache: http://mustache.github.io/
.. _canJS: http://canjs.com/
.. _Lodash: http://lodash.com/
.. _jQuery: http://jquery.com/
.. _Foundation: http://foundation.zurb.com/
.. _Stylus: http://learnboost.github.io/stylus/
.. _Node: http://en.wikipedia.org/wiki/Nodejs
.. _GitHub: https://github.com/
.. _Git: http://git-scm.com/
.. _CommonJS: http://addyosmani.com/writing-modular-js/
.. _canMap: http://canjs.com/docs/can.Map.html
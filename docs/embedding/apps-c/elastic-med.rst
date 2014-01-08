elastic-med
===========

This document will guide you through the process of writing a JavaScript client side app (running completely in a browser) using Bower_ and Grunt_ tools. The app will connect to an ElasticSearch_ (ES) instance to do *search*. ES wraps Apache Lucene and serves as a repository of indexed documents that one can search agains. If you prefer a short gist head over to :doc:`usage` instead.

The app will have the following functionality:

#. Work with *cancer* related publications from PubMed.
#. Ask user for an input text and get back a list of publications.
#. Click on any of the results to see a detailed view.
#. From the document detail search for publications *like* this one.
#. Autocomple and provide suggestions for user's input.

Among the important libraries we will be using:

#. Bower_ to fetch vendor dependencies such as JavaScript, CSS or Fonts.
#. canJS_ is a framework for client-side development handling routing, events etc.
#. CoffeeScript_ a language that compiles down to JavaScript and makes writing an app easier.
#. D3_ is used to manipulate documents based on data.
#. ElasticSearch_ a search server with a RESTful web service peddling JSON documents.
#. Foundation_ is a CSS framework of reusable UI components.
#. Grunt_ to build/transpile our source files.
#. jQuery_ is a DOM manipulation library (and more).
#. Moment_ is a date library for parsing, manipulating and formatting dates.
#. Mustache_ is a multi-platform templating language allowing us to embed dynamic objects in HTML.
#. Node_ JavaScript desktop software platform.
#. Stylus_ allows us to be more expressive and dynamic with CSS.
#. Underscore_ is a utility toolbelt making actions such as iterating over items easier.

Initialize Project
------------------

The first step will be to setup our directory structure.

.. code-block

    ├──build/
    │  ├──css/
    │  ├──fonts/
    │  ├──img/
    │  └──js/
    ├──data/
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

data/
    Is a directory where we can keep data files that we will load to ES later.

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
        "name": "elastic-med",
        "version": "0.0.0",
        "devDependencies": {
            "bower": "~1.2.7",
            "grunt": "~0.4.1",
            
            "grunt-apps-c": "0.1.10",
            "grunt-contrib-concat": "~0.3.0",
            "grunt-contrib-stylus": "~0.9.0",
            "grunt-contrib-copy": "0.4.1",

            "grunt-contrib-uglify": "~0.2.5",
            "grunt-contrib-cssmin": "~0.6.2",

            "elasticsearch": "1.0.1",
            "coffee-script": "1.6.3",
            "async": "0.2.9",
            "lodash": "2.4.1"
        }
    }

This file tells Node which libraries will be used to build our app. These are not client-side libraries, but server-side if you will.

The top bit of the ``devDependencies`` lists a bunch of Grunt and Bower related libraries, the bottom one some libraries used to load ES with data.

In order to install all of these, execute the following:

.. code-block:: bash

    $ npm install -d

Bower vendor dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~

Now we want to fetch libraries that our app, when running, will depend on.

Edit the ``bower.json`` file like so:

.. code-block:: json

    {
        "name": "elastic-med",
        "version": "0.0.0",
        "dependencies": {
            "jquery": "2.0.3",
            "lodash": "2.4.1",
            "canjs": "2.0.4",
            "elasticsearch": "http://cdn.intermine.org/js/elasticsearch.js/1.0.2/elasticsearch.jquery.js",
            "moment": "2.4.0",
            "d3": "3.3.13",
            "colorbrewer": "1.0.0",
            "hint.css": "1.3.1",
            "foundation": "5.0.2",
            "font-awesome": "4.0.3",
            "simple-lru": "~0.0.2"
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
                    dest: 'build/js/em.js'
                    options:
                        main: 'src/app.coffee'
                        name: 'em'

            stylus:
                compile:
                    src: [ 'src/styles/app.styl' ]
                    dest: 'build/css/em.css'

            concat:            
                scripts:
                    src: [
                        # Vendor dependencies.
                        'vendor/jquery/jquery.js'
                        'vendor/lodash/dist/lodash.js'
                        'vendor/canjs/can.jquery-2.js'
                        'vendor/canjs/can.map.setter.js'
                        'vendor/elasticsearch/index.js'
                        'vendor/moment/moment.js'
                        'vendor/colorbrewer/colorbrewer.js'
                        'vendor/d3/d3.js'
                        'vendor/simple-lru/index.js'
                        # Our app.
                        'build/js/em.js'
                    ]
                    dest: 'build/js/em.bundle.js'
                    options:
                        separator: ';' # for minification purposes

                styles:
                    src: [
                        'vendor/foundation/css/normalize.css'
                        'vendor/foundation/css/foundation.css'
                        'vendor/hint.css/hint.css'
                        'vendor/font-awesome/css/font-awesome.css'
                        'src/styles/fonts.css'
                        'build/css/em.css'
                    ]
                    dest: 'build/css/em.bundle.css'

            copy:
                fonts:
                    src: [ 'vendor/font-awesome/fonts/*' ]
                    dest: 'build/fonts/'
                    expand: yes
                    flatten: yes

            uglify:
                scripts:
                    files:
                        'build/js/em.min.js': 'build/js/em.js'
                        'build/js/em.bundle.min.js': 'build/js/em.bundle.js'

            cssmin:
                combine:
                    files:
                        'build/css/em.bundle.min.css': 'build/css/em.bundle.css'
                        'build/css/em.min.css': 'build/css/em.css'

        grunt.loadNpmTasks('grunt-apps-c')
        grunt.loadNpmTasks('grunt-contrib-stylus')
        grunt.loadNpmTasks('grunt-contrib-concat')
        grunt.loadNpmTasks('grunt-contrib-copy')
        grunt.loadNpmTasks('grunt-contrib-uglify')
        grunt.loadNpmTasks('grunt-contrib-cssmin')

        grunt.registerTask('default', [
            'apps_c'
            'stylus'
            'concat'
            'copy'
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

copy
    A task that copies fonts from FontAwesome_ into our build directory.

uglify
    Minify our built JavaScript files. This makes them small, but unreadable so not great for debugging.

cssmin
    The same as ``uglify`` but for CSS

At the bottom of the file we see two calls to ``grunt.registerTask`` which bundle a bunch of tasks together. For example running ``$ grunt minify`` will run the ``uglify`` and ``cssmin`` tasks.

While developing it is quite useful to watch the source files and re-run the build task:

.. code-block:: bash

    $ watch --color grunt

This will run the default Grunt task every 2s.

.. _Bower: http://bower.io/
.. _Grunt: http://gruntjs.com/
.. _ElasticSearch: http://www.elasticsearch.org/
.. _CoffeeScript: http://coffeescript.org/
.. _Mustache: http://mustache.github.io/
.. _canJS: http://canjs.com/
.. _Underscore: http://underscorejs.org/
.. _jQuery: http://jquery.com/
.. _Moment: http://momentjs.com/
.. _D3: http://d3js.org/
.. _Foundation: http://foundation.zurb.com/
.. _Stylus: http://learnboost.github.io/stylus/
.. _Node: http://en.wikipedia.org/wiki/Nodejs
.. _FontAwesome: http://fontawesome.io/
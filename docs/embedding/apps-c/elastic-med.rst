elastic-med
===========

.. note::

    You can view the source files for this project in the `intermine/intermine-apps-c <https://github.com/intermine/intermine-apps-c/tree/master/elastic-med>`_ repo.

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

.. warning::

    Some of the code block examples on this page feature line numbers. Please view the page in a widescreen mode.

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
   :linenos:

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

The top bit of the ``devDependencies`` lists a bunch of Grunt and Bower related libraries, the bottom one (*line 17 onward*) some libraries used to load ES with data.

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
   :linenos:

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
                        'bower_components/jquery/jquery.js'
                        'bower_components/lodash/dist/lodash.js'
                        'bower_components/canjs/can.jquery-2.js'
                        'bower_components/canjs/can.map.setter.js'
                        'bower_components/elasticsearch/index.js'
                        'bower_components/moment/moment.js'
                        'bower_components/colorbrewer/colorbrewer.js'
                        'bower_components/d3/d3.js'
                        'bower_components/simple-lru/index.js'
                        # Our app.
                        'build/js/em.js'
                    ]
                    dest: 'build/js/em.bundle.js'
                    options:
                        separator: ';' # for minification purposes

                styles:
                    src: [
                        'bower_components/foundation/css/normalize.css'
                        'bower_components/foundation/css/foundation.css'
                        'bower_components/hint.css/hint.css'
                        'bower_components/font-awesome/css/font-awesome.css'
                        'src/styles/fonts.css'
                        'build/css/em.css'
                    ]
                    dest: 'build/css/em.bundle.css'

            copy:
                fonts:
                    src: [ 'bower_components/font-awesome/fonts/*' ]
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

*Lines 76 and 83* have two calls to ``grunt.registerTask`` which bundle a bunch of tasks together. For example running ``$ grunt minify`` will run the ``uglify`` and ``cssmin`` tasks.

While developing it is quite useful to watch the source files and re-run the build task:

.. code-block:: bash

    $ watch --color grunt

This will run the default Grunt task every 2s.

ElasticSearch
-------------

Start ElasticSearch
~~~~~~~~~~~~~~~~~~~

ES will hold our index of publications. `Fetch <http://www.elasticsearch.org/download/>`_ it and then unpack it somewhere.

To start it:

.. code-block:: bash

    $ ./bin/elasticsearch

Check that it is up by visiting port ``9200``. If you see a JSON message, it is up.

Load example publications
~~~~~~~~~~~~~~~~~~~~~~~~~

To index some documents, use whichever `client <http://www.elasticsearch.org/guide/>`_. I was using the JavaScript one and if you check the ``data/`` dir in ``elastic-med`` on GitHub_ you will be able to see one way that documents can be indexed. In that example:

.. code-block:: bash

    $ ./node_modules/.bin/coffee ./data/index.coffee

That will index (after a few seconds) 1000 cancer publications found in ``cancer.json``.

The ``convert.coffee`` file was used to convert source XML to JSON.

Check that documents got indexed by visiting the document URL in the browser:

.. code-block

    http://127.0.0.1:9200/publications/publication/438

You should get back a JSON document back provided you are using index ``publications``, type ``publication`` and you have a document under the id ``438``.

Source files
------------

Example page
~~~~~~~~~~~~

One needs an access point where our app will get loaded with particular configuration. This is where the ``example/index.html`` comes in:

.. code-block:: html
   :linenos:

    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>ElasticMed</title>
        
        <link href="build/css/em.bundle.css" media="all" rel="stylesheet" type="text/css" />
        <script src="build/js/em.bundle.js"></script>
    </head>
    <body>
        <div id="app"></div>
        <script>
            // Once scripts have loaded.
            $(function() {
                // ...show the app.
                require('em')({
                    'el': '#app',
                    'service': 'http://newvegas:9200',
                    'index':   'publications',
                    'type':    'publication',
                    'query':   'breast size exercise cancer'
                });
            });
        </script>
    </body>
    </html>

This file does not do anything else other then load our built CSS and JS files (*lines 7 and 9*) and starts our app. In our example we are pointing to a ``build`` directory relative to the ``example`` directory. So let's make a symbolic link to the actual ``build``:

.. code-block:: bash

    $ ln -s ../build build/

Such links get preserved when version controlling using Git_. We are linking to our bundled builds that contain vendor dependencies too.

Then we are waiting for the page to load and call our (future) app with some config.

The name ``em`` is being configured in the ``Gruntfile.coffee`` file in the ``apps-c`` task.

As for the config:

el
    Selector where our app should be displayed.

service
    Points to the ES_ endpoint. By default it starts on port ``9200``.

index
    Refers to the ES_ index we are using.

type
    Refers to the type of ES_ documents we are storing in our index.

query
    Is a default query we will want to show when our app loads.

The ``require`` call on *line 17* relates to CommonJS_. It is one way of loading JavaScript modules. It avoids having to expose all of our functions and objects on the global (``window``) object and implements a way of relating between different files.

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
   :linenos:

    module.exports = (opts) ->
        # Explode ejs options.
        { service, index, type } = opts
        
        # Init the ejs client.
        ejs.attr { index, type, 'client': new $.es.Client({ 'hosts': service }) }

        # Start routing.
        new Routing opts.el
        do can.route.ready

        # Have we launched on the index?
        if can.route.current('')
            # Manually change the query to init the search.
            query.attr 'current', opts.query or '' # '' is the default...

Each module (file) in our app needs to export some functionality. When we call ``require`` we will be getting this functionality.

We are going to be using canJS_ which consists of objects that can be *observed*. What this means is that when their values change, others listening to this changes will be notified. When we want to `change <http://canjs.com/docs/can.Map.prototype.attr.html>`_ their value we call ``attr`` function on them. One such example is on *line 7* where we change the value of ``index``, ``type`` and ``client`` as passed in by the user from ``example/index.html``.

$.es.Client
    Refers to ElasticSearch_ client in JavaScript which we have installed using Bower_ and munged in a bundle using Grunt_ as specified in ``Gruntfile.coffee``.

Routing()
    Is a call to a future canControl_ component which will setup our routing. We need a way of change between an index page that does search and a detail page that shows a detail...

can.route.ready
    Actually tells canJS_ to start listening to changes in the browser address.

On *line 14* we see an example of checking whether we are looking at the index page when the app loads. If so we are changing a ``current`` attribute on a (futute) canMap_ component which will correspond to the query, meaning user query input. Our ``example/index.html`` page contains an example query to use in this case.

Router
~~~~~~

Now we need to write the actual router component. It will be a type of canControl_ and lives in the ``src/app.coffee`` file too. Since we do not want/need to export this functionality, it will be placed above the current ``module.exports`` call:

.. code-block:: coffee-script
   :linenos:

    # Router switching between pages.
    Routing = can.Control

        init: ->
            # Load the components.
            ( require "./components/#{name}" for name in components )

            # Setup the UI.
            layout = require './templates/layout'
            @element.html render layout, helpers

        # Index.
        route: ->
            template = require './templates/page/index'
            @render(template, {}, 'ElasticMed')

        # Document detail.
        'doc/:oid route': ({ oid }) ->
            fin = (doc) =>
                template = require './templates/page/detail'
                title = title.value if _.isObject title = doc.attr('title')
                @render template, doc, "#{title} - ElasticMed"

            # Find the document.
            doc = null
            # Is it in results?
            if (docs = results.attr('docs')).length
                docs.each (obj) ->
                    # Found already?
                    return if doc
                    # Match on oid.
                    doc = obj if obj.attr('oid') is oid

            # Found in results cache.
            return fin(doc) if doc
            
            # Get the document from the index.
            ejs.get oid, (err, doc) ->
                # Trouble? Not found etc.
                return state.error err if err
                fin(doc)
        
        # Render a page. Update the page title.
        render: (template, ctx, title) ->
            @element.find('.content')
            .html(render(template, ctx))
            # Update title.
            document.title = title

init
    We are loading some components that we are using in this app into the memory and then rendering our app layout. This layout will setup the structure for our whole app.

route
    Is a function that will be called when we are on the index page of the app. It renders the index page template.

doc/:oid route
    Matches when we are looking at a detail of a document/publication. So if someone manually types in the address ``#!doc/438`` or it changes as a result of user interaction, this function gets called. We are either retrieving the document from a results cache or we are explicitely calling for a document from ElasticSearch_. Consider that when we search for documents, we get their content too so we do not need to fetch them again when looking at their *detail*. In contrast, someone could type in a random document address and we need to be ready for that. In either case we are calling the ``fin`` function on *line 20* to render the results.

render
    Serves as a helper we have created that injects a template into the DOM and updates the page title.

Pages templates
~~~~~~~~~~~~~~~

When discussing the router we were talking about different page templates. Let us define them now.

In ``src/templates/page/index.mustache``:

::

    <p>ElasticSearch through a collection of cancer related publications from PubMed. Use <kbd>Tab</kbd> to autocomplete or <kbd>Enter</kbd> to search.</p>
    <div class="page index">
        <app-search></app-search>
        <app-state></app-state>
        <app-results></app-results>
    </div>

This is the index template with three custom tags corresponding to different components:

app-search
    the search form

app-state
    notification messages/titles

app-results
    the results when our search is successful

Now for the template that gets rendered on a detail page, in ``src/templates/page/detail.mustache``:

::

    <div class="page detail">
        <app-state></app-state>
        <div class="document detail">
            <app-document link-to-detail="false" show-keywords="true"></app-document>
        </div>
        <app-more></app-more>
    <div>

We see that ``app-state`` is present, it will tell us when a doc is not found.

app-document
    Is the view of one document. We are passing extra parameters (options) into the context saying we don't want to link to the detail page (we are on detail page) but we want to show keywords (which will not be shown on the index results set).

app-more
    is a results set similar to ``app-results`` which corresponds to a component that will automatically search for and display documents that are similar like *this one*.

Application search template
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This template will be rendered for the ``app-search`` component defined on the index page. In ``src/templates/search.mustache``:

.. code-block:: mustache
   :linenos:

    <div class="row collapse">
        <div class="large-10 columns search">
            <div class="faux"></div>
            <input class="text" type="text" maxlength="100" placeholder="Query..." value="{{ query.current }}" autofocus>
            {{ #if suggestions.list.length }}
            <ul class="f-dropdown suggestions" style="left:{{ suggestions.px }}px">
            {{ #suggestions.list }}
                <li {{ #active }}class="active"{{ /active }}>
                    <a>{{ text }}</a>
                </li>
            {{ /suggestions.list }}
            </ul>
            {{ /if }}
        </div>
        <div class="large-2 columns">
            <a class="button secondary postfix">
                <span class="fa fa-search"></span> Search
            </a>
        </div>
    </div>
    {{ #if query.history.length }}
    <div class="row collapse">
        <h4>History</h4>
        <ul class="breadcrumbs">
        {{ #query.history }}
            <li><a>{{ . }}</a></li>
        {{ /query.history }}
    </div>
    {{ /if }}



.. _Bower: http://bower.io/
.. _Grunt: http://gruntjs.com/
.. _ElasticSearch: http://www.elasticsearch.org/
.. _ES: http://www.elasticsearch.org/
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
.. _GitHub: https://github.com/
.. _Git: http://git-scm.com/
.. _CommonJS: http://addyosmani.com/writing-modular-js/
.. _canControl: http://canjs.com/guides/Controls.html
.. _canMap: http://canjs.com/docs/can.Map.html
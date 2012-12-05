.. index:: embedding, javascript embedding, widgets, report widgets, report widgets service

Report Widgets
==============

.. versionadded:: 1.1

.. warning::
    
    Client side development is the best thing since sliced bread but for a novice the following *will* be overwhelming at first. We are learning too.

Report Widgets are a type of embeddable component that offers an unparalleled **flexibility** when it comes to the tools that InterMine offers. They are provided as a way for developers to create interactive *widgets* to their end users. Such widgets can then be embedded on virtually any page, be it within a mine or outside of it.

.. seealso:: `Report widgets demo <http://ukraine.sysbiol.cam.ac.uk/intermine-report-widgets-service/>`_.

.. figure::  img/example.png
   :align:   center

   Publications for zen gene coming from FlyMine.

This document describes the steps needed to create an example publications widget that lists publications related to a particular gene.

The steps outlined:

#. Install dependencies for the widget precompiler.
#. Develop widget consisting of **behavior** classes, **styles** and **templates**
#. Provide config for the widget
#. Run it

Install dependencies
--------------------

Node.js
~~~~~~~

The system that precompiles widgets is based on the `Node <http://nodejs.org/download/>`_ platform which means one can write applications in JavaScript that run on top of Google's V8 engine. Head over to the homepage or visit this `Joyent guide <https://github.com/joyent/node/wiki/Installation>`_ to install the platform. Remember that installing by building will execute built in tests that can take a couple of minutes to run on slower machines.

Make sure that you have the platform's installer `npm <https://npmjs.org/>`_ installed. It is used to download packages that you can then reference in your Node apps.

Note on CoffeeScript
^^^^^^^^^^^^^^^^^^^^

Although JavaScript is the main language of the Node platform we will be using `CoffeeScript <http://coffeescript.org/>`_ which is a little language that compiles to JavaScript. The reason is that the code is more readable and one can use *nice* syntax when, for example, working with arrays.

Reference precompiler
~~~~~~~~~~~~~~~~~~~~~

Now head over to the `GitHub repo <https://github.com/radekstepan/intermine-report-widgets>`_ of a reference client/precompiler. This tool will allow you to quickly iterate over your code and test it in the browser immediately.

Typical steps (refer to the repo's docs) will look as follows:

.. code-block:: bash

    $ git clone git@github.com:radekstepan/intermine-report-widgets.git
    $ cd intermine-report-widgets/
    $ npm install -d
    $ npm start

Now you should have a running instance of a service providing widgets. Head over to `http://127.0.0.1:1119 <http://127.0.0.1:1119>`_ to confirm that it is indeed the case.

Develop a widget
----------------

Create a new folder (no spaces and special characters in the name) in the ``widgets/`` folder of the precompiler.

Presenter
~~~~~~~~~

The next step is writing a presenter which is a component that knows how to get data for itself and then render them in a particular way, thus it encapsulates the behavior of the widget.

The file needs to be called ``presenter.coffee`` and be placed in a directory with the name of the widget. The file needs to contain a ``class Widget`` with the following signature:

.. code-block:: coffeescript

    class Widget

        # Have access to config and templates compiled in.
        constructor: (config, templates) ->

        # Render accepts a target to draw results into.
        render: (target) ->

The constructor is passed two variables, ``config`` and ``templates`` which are objects that have references to config from a mine and templates that we will write in the next step.

The ``render`` function is passed a target variable which is the element where we will want to place the widget's output.

It is up to you what you do in between. The reference implementation of the precompile containes different widgets that you can inspect and see how they work. Many of them use a client side framework called `Backbone <http://documentcloud.github.com/backbone/>`_ to efficiently manipulate data and display them. It is up to you which framework you use, if any. In the last step, config, we will learn how to setup the widget to download these libraries for us when needed.

Templates
~~~~~~~~~

Templates represent pieces of reusable HTML that can be filled with data from a widget. We create one by creating a file ending with ``.eco`` in the widget's directory. The language of choice here is `eco <https://github.com/sstephenson/eco>`__. It allows us to use CoffeeScript syntax inside HTML. You can think of JavaServerPages as being a Java equivalent.

Inside the widget, templates are precompiled into a function form so that if you want to pass a bunch of variables into a template and make it into HTML do as follows:

.. code-block:: coffeescript

    templates['myTemplateName']
        'foo': 'This is some text'

Styles
~~~~~~

Styles or CascadingStyleSheets inside widgets have the advantage of applying only to the widget itself and not any other content on the page. So for example the following:

.. code-block:: css

    h4 { color:red; }

Will make all Header4 elements in the widget red, not any other Header4 elements on the page. Thus you can reasonably safely embed the widget on any page you want. Although, be aware of the fact that many pre-existing styles on the page may not play as nice and may color/change your widget if its rules are too generic and broad.

Top create a style create a new file ``style.css`` in the directory where the widget resides and write some style rules.

Stylus
^^^^^^

You do not have to stick to plain old CSS and can use the  `Stylus <http://learnboost.github.com/stylus/>`_ language instead. It is a CSS preprocessor just like CoffeeScript is a JavaScript preprocessor. And just like it it makes CSS better by adding variables, nested rules, calculations etc. At least one example widget should contain a Stylus style.

To create a Stylus stylesheet instead of a CSS one, simply create the file ``style.styl`` instead of ``style.css`` and write your rules there.

Config
------

Now that we have coded our widget, we need to configure it. This is done in the ``config.json`` file of the reference implementation service.

One wants to add a new key value pair into the ``widgets`` value with the key referring to the name of the widget/name of the folder where the widget resides. So if our widget is called ``emo-widget``, our config file will look like this:

.. code-block:: javascript

    {
        "service": {
            "port": 1119
        },
        "widgets": {
            "emo-widget": {}
        }
    }

Inside the widget config add the following key value pairs:

* **author** referring to the author of the widget
* **title** is a snappy oneliner representing the widget
* **description** is less snappy than the above
* **version** allows one to keep track of versions of a widget

These are useful as when we inspect a widget we can see what its intention is, when it was made etc.

Then there are two directives that define libraries (JavaScript/CSS) to load for the widget and one to define what values will be passed on/embedded in the widget.

Dependencies
~~~~~~~~~~~~

To define library dependencies of a widget, use the ``dependencies`` key pointing to a list. You can even specify if we need to first wait to fetch a library before fetching another (synchronous loading). In the following example, we fetch 3 libraries. The first two are JavaScript files where the second (and subsequent) one waits for the first one to finish loading. The last library asks for a CSS file. Bear in mind that all files are included on the page without any prefixes. So you need to deal with a potential that two libraries will not work well together and styles are clashing.

.. code-block:: javascript

    "dependencies": [
        {
            "name": "jQuery",
            "path": "http://somwhere/jquery.js",
            "type": "js",
            "wait": true
        },
        {
            "name": "_",
            "path": "http://somewhere/underscore.js",
            "type": "js"
        },
        {
            "path": "http://somewhere/style.css",
            "type": "css"
        }
    ]

Config
~~~~~~

Then we have a dictionary under the ``config`` key. You can use it to pass specific config to a widget. The idea is that you write your widget to be quite generic and then use the config to make it specific. The dictionary accepts key value pairs that are up to you to choose, the only exception is the ``pathQueries`` key that points to a dictionary of mine's PathQueries. Use JSON syntax to write such queries, not XML.

In the following example we specify the mine's address and a partial PathQuery to run.

.. code-block:: javascript

    "config": {
        "mine": "http://yeastmine-test.yeastgenome.org:8080/yeastmine-dev/",
        "pathQueries": {
            "expressionScores": {
                "select": [
                    "TYPE.expressionScores.score"
                ]
            }
        }
    }

Run it
------

To run the widgets, you need to include InterMine's API loader that is used for loading widgets. The easiest way to get it is by including the following JavaScript file on a page:

.. code-block:: html

    <script src="http://cdn.intermine.org/api"></script>

Now we say that we want to load report widgets passing in a callback function. In this callback we specify that we want a new ReportWidgets instance pointing to a service serving them.

.. code-block:: javascript

    intermine.load('reportWidgets', function() {
        var widgets = new intermine.reportWidgets('http://127.0.0.1:1119');
    });

In this callback still we say which widget we want passing in extra config that should be merged with service config. This way we can pass in say a symbol of a specific gene we have on a 'page'.

.. code-block:: javascript

    widgets.load('spell-histogram', '#spell', { 'type': 'Gene', 'symbol': 'S000001863' });

Workflow
--------

.. figure::  img/widgets.png
   :align:   center

   A workflow of how list and report widgets are processed client and server side.

blue
    represents a common workflow to load widget loaders be it for report or list analysis widgets.
purple
    represents a flow of List Widget Loader asking the mine for JSON results for a specific type of a widget.
green
    represents a flow of Report Widget Loader asking for a JS of a specific widget.

Requirements
------------

Service
~~~~~~~

#. Compile **templates** into their JS form and make them accessible within the context of the widget only.
#. Make *CSS* available only in the context of the widget, perhaps by prefixing each declaration with a dynamic ``widget id`` using `prefix-css-node <https://github.com/radekstepan/prefix-css-node>`_ or `css-prefix <https://github.com/substack/css-prefix>`_.
#. Respond to the client with a list of **resources** that need to be loaded beforing rendering the widget.
#. Each widget consists of:

    #. One `CoffeeScript <http://coffeescript.org/>`_ **presenter** containing the logic getting data from the **model** using `imjs <https://github.com/alexkalderimis/imjs>`_.
    #. A number of `eco <https://github.com/sstephenson/eco/>`__ **templates** precompiled.
    #. One **CSS** file specifically for the widget.
    #. Any extra **config** dynamically populated for the widget to consume. This could be the mine the Widget is to take data from or extra flags that specialize an otherwise generic Widget.
    #. Optional number of requirements (CSS, JS), loaded from the `CDN <https://github.com/intermine/CDN>`_.
#. All of the previous are configured by the user and the service validates that all widgets are executable.
#. **Data** requests are done from within the widget to speed up their initial loading.
#. Files are served as UTF-8.
#. Provide nice URL for fetching the widgets so it is easier to debug them in Network view, ``/widget/24517/publications-displayer``.
#. Provide info messages on each step of the compilation process so we can determine where problems lie. These then be returned as `message` to the user when requesting widgets as HTTP 500 JSON errors.

Optional
^^^^^^^^

* Cache resources by, for example, not packaging resources on the fly but doing so on service startup. Then, say the latest modification date. Add ``ETag`` and return ``304`` not modified then.
* Allow the use of `LESS <http://lesscss.org/>`_ instead of CSS.
* Allow the use of other templating languages.
* Check for the presence of ``Displayer.prototype.render`` and ``Displayer.prototype.initialize`` in the compiled **presenter**.
* Validate that callbacks are valid JavaScript identifiers. Should not be needed as we will use API loader and generate these automagically.
* Provide a signature in the generated output describing the title, author etc for the widget in question.
* Each block in the compiled result have a comment header so it is easier to find where things lie when debugging.
* Provide connection to `imjs <https://github.com/alexkalderimis/imjs>`_ by default.

Issues
^^^^^^

* If we want to split presenter across multiple CoffeScript files, how to maintain their order in the resulting JS version? Go alphabetically?

Client
~~~~~~

1. Make use of `intermine-api-loader <https://github.com/radekstepan/intermine-api-loader>`_ to efficiently load resources and libs only when needed.
2. Generate **callbacks** that are unique for the page taking into account other clients that could exist on the page. As the service URL is unique per client, make use of that.
3. Dump error messages from the server into the target element where widget was supposed to have been.
4. Cache all of the widgets listing as we need to be resolving widget dependencies first.
5. Provide a wrapping ``<article>`` element with a predictable ``im-report-widget`` class so we can use it in our CSS.

Optional
^^^^^^^^

* Provide a callback where all widgets can dump error messages.



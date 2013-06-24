.. index:: embedding, javascript embedding, apps, widgets, report widgets, report widgets service

Apps/A
======

.. versionadded:: 1.2.3

This document describes how to develop and host your own Apps.

Middleware
----------

`Apps/A Middleware <https://github.com/intermine/apps-a-middleware>`_ is a glue that makes serving Apps possible. It depends on `Node.js <http://nodejs.org/>`_ so make sure it is installed. Afterwards either checkout or download & unzip the repo then install its dependencies and run the example:

.. code-block:: bash

    $ wget https://github.com/intermine/apps-a-middleware/archive/master.zip
    $ unzip master.zip
    $ cd apps-a-middleware-master/
    $ npm install
    $ PORT=1234 node example/index.js

Visiting 127.0.0.1:1234 should now show a bunch of Apps on a page. They are coming from `InterMine Apps/A Sources <https://github.com/intermine/intermine-apps-a>`_. The next section will describe how to develop a custom app like one of those on the page.

Developing an App
=================

The middleware accepts one or more paths to a directory with Apps. Above, we have seen an example of loading such a directory. Let us have a look at one of the Apps, a ``publications-displayer``.

The middleware knows of and can load this App because we have created a folder that has a name that can be used in a URL. If we were to add spaces, for example, that would be a big no no.

Next we have a configuration stashed away in a ``config.json`` file. This file will have a header with some properties like author, tile, description etc. The more interesting point is the ``dependencies`` section. :doc:`/embedding/api-loader` describes how this section works. It is here that you define what kind of CSS and JS dependencies your App has. These will be automatically resolved before loading the App on a page.

Next up is the body of the App in a ``presenter.[js|ts|ls|coffee]`` file. The extensions allure to the fact that you can use the following languages to write your App in:

1. plain vanilla JavaScript
2. `TypeScript <http://www.typescriptlang.org/>`_; including having type definitions in a separate file like ``lib.d.ts``
3. `LiveScript <http://livescript.net/>`_
4. `CoffeeScript <http://coffeescript.org/>`_

This file will have all the logic needed to "do something". It needs to fulfill the following interface:

.. code-block:: javascript

    var App;
    
    App = (function() {
        
        function App(config, templates) {}
        
        App.prototype.render = function(target) {};
        
        return App;

    })();

Or the same in TypeScript:

.. code-block:: javascript

    class App {
    
        constructor(
            public config: Object,
            public templates: Object
        ) {
    
        }
    
        render(target: string): void {
    
        }
    
    }

Or the same in CoffeeScript:

.. code-block:: coffeescript

    class App

        constructor: (config, templates) ->

        render: (target) ->

The constructor takes two parameters:

config
    This is an amalgamated config that the user and the middleware have provided.
templates
    This will be an Object containing template functions for you to run. More on them later.

The render function takes just one parameter:

target
    A string that tell you where to render/display your content to.

Next up are templates. They are the place where you put your HTML that will be rendered. For these we use the templating language `eco <https://github.com/sstephenson/eco>`_ which allows you to sprinkle CoffeeScript logic throughout a template.

You create a template by saving it as ``*.eco``. You can then call the template from within (your render function) like so:

.. code-block:: coffeescript

    class App

        constructor: (config, @templates) ->

        render: (target) ->
            $(target).html @templates[template_name] { 'some': 'data', 'right': [ 'here' ] }

Finally we might want to style our app. Usually a main style will be defined by a CSS framework required in the config file, but there is always place for that special something. To define a custom style *guaranteed* to be applicable to your App only, save a CSS or `Stylus <http://learnboost.github.io/stylus/>`_ file as ``style.[css|styl]``.

To run it all refer to the ``example/index.js`` and ``example/public/index.html`` files in the middleware repo.

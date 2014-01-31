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
-----------------

The middleware accepts one or more paths to a directory with Apps. Above, we have seen an example of loading such a directory. Let us have a look at one of the Apps, a ``publications-displayer``.

The middleware knows of and can load this App because we have created a folder that has a name that can be used in a URL. If we were to add spaces, for example, that would be a big no no.

Next we have a configuration stashed away in a ``config.js`` file. This file ``exports`` config in a JSON-like syntax. It will have a header with some properties like author, tile, description etc. The more interesting point is the ``dependencies`` section. :doc:`/embedding/api-loader` describes how this section works. It is here that you define what kind of CSS and JS dependencies your App has. These will be automatically resolved before loading the App on a page.

You can fill the file's ``config`` section to show whoever embeds your App what sort of configuration they should be providing. The idea is as follows:

1. The App's config should cover dependencies and show example config with comments.
2. The middleware should provide mine specific settings, like pathQueries to run.
3. The client instantiating the App should provide "page"-specific settings like which specific Gene we want to show visualization for etc.

Next up is the body of the App in a ``presenter.[js|ts|ls|coffee]`` file. The extensions allure to the fact that you can use the following languages to write your App in:

1. plain vanilla JavaScript
2. `TypeScript <http://www.typescriptlang.org/>`_; including having type definitions in a separate file like ``lib.d.ts`` and targeting `ECMAScript 5 <http://kangax.github.io/es5-compat-table/>`_
3. `LiveScript <http://livescript.net/>`_
4. `CoffeeScript <http://coffeescript.org/>`_

This file will have all the logic needed to "do something". It needs to fulfill the following interface:

.. code-block:: javascript
    
    exports.App = (function() {
        
        function App(config, templates) {}
        
        App.prototype.render = function(target) {};
        
        return App;

    })();

Or the same in TypeScript:

.. code-block:: javascript

    export class App {
    
        constructor(config: Object, templates: Object) {
    
        }
    
        render(target: string): void {
    
        }
    
    }

Or the same in CoffeeScript:

.. code-block:: coffeescript

    class exports.App

        constructor: (config, templates) ->

        render: (target) ->

Or the same in LiveScript:

.. code-block:: livescript

    class exports.App
    
        (config, templates) ->
        
        render: (target) ->

The constructor takes two parameters:

config
    This is an amalgamated config that the user and the middleware have provided.
templates
    This will be an Object containing a map from template name to an object. More on them later.

The render function takes just one parameter:

target
    A string that tell you where to render/display your content to.

Next up are templates. They are the place where you put your HTML that will be rendered. You have a choice between two templating languages:

1. `eco <https://github.com/sstephenson/eco>`_ which allows you to use CoffeScript logic inside the template. To use this language save the file as ``*.eco``. An eco template wraps all the logic needed to execute it, as an example:

.. code-block:: coffeescript

    class exports.App

        constructor: (config, @templates) ->

        render: (target) ->
            $(target).html @templates[template_name_with_extension] { 'some': 'data', 'right': [ 'here' ] }

2. `Hogan.js <http://twitter.github.io/hogan.js/>`_ is an implementation of the language `mustache <http://mustache.github.io/mustache.5.html>`_. To use this variant, save your file as ``*.hogan``. You still need to include a reference to the Hogan library in your App and then initialize and use them as follows:

.. code-block:: coffeescript

    class exports.App

        constructor: (config, @templates) ->

        render: (target) ->
            $(target).html (new Hogan.Template(@templates['template.hogan'])).render { 'some': 'data', 'right': [ 'here' ] }

Finally we might want to style our app. Usually a main style will be defined by a CSS framework required in the config file, but there is always place for that special something. To define a custom style *guaranteed* to be applicable to your App only, save a CSS or `Stylus <http://learnboost.github.io/stylus/>`_ file as ``style.[css|styl]``.

To run it all refer to the ``example/index.js`` and ``example/public/index.html`` files in the middleware repo.

Q & A
-----

How do I change which file will export my root ``App``?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Extend your ``config.js`` with the following key, value pair:

.. code-block:: javascript

    module.exports = {
        "appRoot": "app/index" // points to say index.js in "app" folder
    }

How can I use modules across folders?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the `CommonJS Modules/1.1 <http://addyosmani.com/writing-modular-js/>`_ require pattern, for example as follows (in TypeScript):

.. code-block:: javascript

    import models = module("models");
    
    var pete = new models.Person('pete');

And in ``models.ts``:

.. code-block:: javascript

    export class Person {
        constructor(name: string) { }
    }

.. seealso:: Take a look at the ``choose-list`` app in the ``intermine-apps-a`` repo. It shows an example of how different modules can be required.

I am using ``require.js`` and the app just blew up
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Each app gets its own internal implementation of require to load its and only its modules. If you have something on ``window.require`` it will not get overwritten but it will also not be used by us. Your apps see our version of require, not any other higher up. This is so that multiple apps can live peacefully on a page without deviating from the require spec and having our own prefixes and app silos.

In the future, we will also want to get the compiled app once into the browser and then require it multiple times on a page if need be. Using vanilla module loader would then not work as we would not be getting new instances of modules per app instance.

Suggestions are welcome.

A source file I am using is not compiling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check the `head of the following file <https://github.com/intermine/apps-a-middleware/blob/master/builder/rules.coffee#L5-L14>`_ to see the regex rules that the builder uses when going through your app sources.

For example:

.. code-block:: coffeescript

    rules = [
        [ /^((presenter|app)(\.coffee))|(\/(.*)\.coffee)/g, 'module', 'coffeescript' ]
        [ /^((presenter|app)(\.js))|(\/(.*)\.js)/g, 'module', 'generic' ]
        [ /^((presenter|app)(\.ls))|(\/(.*)\.ls)/g, 'module', 'livescript' ]
        [ /^((presenter|app)(\.ts))|(\/([^\.]*)\.ts)/g, 'module', 'typescript' ] # skip `.d.ts`
        [ /^(.*)\.css/g, 'style', 'generic' ]
        [ /^(.*)\.styl/g, 'style', 'stylus' ]
        [ /^(.*)\.eco/g, 'template', 'eco' ]
        [ /^(.*)\.hogan/g, 'template', 'hogan' ]
    ]

Would like to add another rule/filetype? Define its rule and add a new handler in ``apps-a-middleware/builder/types``.

Why do you keep talking about a middleware
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Well, the service you are using extends any existing service you are offering to your users. It would not make much sense to fire up a new service instance per "a thing" that you want to offer to your users. By using a middleware concept, you create one Node.js service on one port and it offers various functionalities as specified by its middlewares.

Why the name Apps/A?
~~~~~~~~~~~~~~~~~~~~

You can just call it "apps", but as a developer you need some form of a namespace to go on, so we use the Latin alphabet for suffixes. In the future/different version will be called Apps/B and so on.

Which language should I use for the app?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Down to your preference:

JavaScript
    Oldie but goldie. There is no compilation step involved so what you see is what you get.
CoffeeScript
    Sports a pythonesque syntax and makes common operations for you (far) easier. Your code is less verbose. The source you see gets compiled to JavaScript so if you run into problems you are still debugging JS.
TypeScript
    You get the added benefit of types if you want to use them. This is beneficial especially if you have an editor with "IntelliSense" like `WebStorm <https://www.jetbrains.com/webstorm/>`_. Ultimately this is where a lot of JavaScript is headed with classes and modules. You write more code but you can also define interfaces for what you expect to be provided to you. If you work with multiple different people this might be beneficial as they might be alerted when they break something.

Why is the config in JavaScript if my App can be in *Script?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is so they can see what the example config looks like. Someone embedding your App does not need your implementation language, but they can/should know vanilla JavaScript.
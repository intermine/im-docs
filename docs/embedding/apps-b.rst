.. index:: embedding, javascript embedding, apps, widgets

Apps/B
======

.. versionadded:: 1.2.3

This document describes how to build JavaScript components using the Apps/B Component.io builder.

Quick Start
-----------

Globally install the npm package:

.. code-block:: bash

    $ sudo npm install apps-b-builder -g

Then specify the input and output path to build a component:

.. code-block:: bash

    # relative to current working directory
    $ apps-b ./src/ ./build/

Create a component
------------------

A component consists of one ``component.json`` config file and one or more source file. Script source files use the `CommonJS <http://wiki.commonjs.org/wiki/Modules/1.1>`_ Modules/1.1 implementation so you use ``require`` and ``module.exports`` to link between modules & components. This is a standard in the Node.js community.

Component config file
~~~~~~~~~~~~~~~~~~~~~

To write a component config file in JSON refer to the `standard <https://github.com/component/component/wiki/Spec>`_. For custom types that ``apps-b`` handles enlist these source files in the ``apps-b`` section. This way our component can be installed by the default installer yet our builder know where to look for custom source files.

Remember, only source files (not JS or CSS) go to the ``apps-b`` section.

.. code-block:: javascript

    {
        "name": "app",
        // Which file do we require as the main file.
        "main": "app.js",
        "version": "1.0.0",
        // Other components.
        "dependencies": {
            "visionmedia/superagent": "*",
            "necolas/normalize.css": "*",
            "component/marked": "*"
        },
        // Copy these JS files when installing the component.
        "scripts": [
            "build/build.js"
        ],
        // Copy these CSS files when installing the component.
        "styles": [
            "styles/fonts.css"
        ],
        // Custom sources for our builder.
        "apps-b": [
            "app.coffee",
            "template.eco",
            "styles/app.styl"
        ]
    }

Supported types
~~~~~~~~~~~~~~~

Have a look into the ``test/fixtures`` directory for examples of supported filetypes:

#. `CoffeeScript <http://coffeescript.org/>`_; compile-to-JS language
#. CSS
#. `Eco <https://github.com/sstephenson/eco>`_; a templating language
#. JavaScript
#. `Literate CoffeeScript <http://coffeescript.org/#literate>`_; mix `Markdown <http://daringfireball.net/projects/markdown/>`_ and CS syntax
#. `Stylus <http://learnboost.github.io/stylus/>`_; a CSS preprocessor including `nib <http://visionmedia.github.io/nib/>`_ CSS3 extensions
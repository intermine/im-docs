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

To write a component config file in JSON refer to the `standard <https://github.com/component/component/wiki/Spec>`_.

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
        "scripts": [
            "app.coffee",
            "template.eco"
        ],
        "styles": [
            "styles/fonts.css",
            "styles/app.styl"
        ]
    }

Supported types
~~~~~~~~~~~~~~~

Have a look into the ``test/fixtures`` directory for examples of supported filetypes:

#. `CoffeeScript <http://coffeescript.org/>`_; compile-to-JS language, goes into the ``scripts`` section
#. CSS, goes into the ``styles`` section
#. `Eco <https://github.com/sstephenson/eco>`_; a templating language, goes into the ``scripts`` section
#. JavaScript, goes into the ``scripts`` section
#. `Literate CoffeeScript <http://coffeescript.org/#literate>`_; mix `Markdown <http://daringfireball.net/projects/markdown/>`_ and CS syntax, goes into the ``scripts`` section
#. `Stylus <http://learnboost.github.io/stylus/>`_; a CSS preprocessor including `nib <http://visionmedia.github.io/nib/>`_ CSS3 extensions, goes into the ``styles`` section

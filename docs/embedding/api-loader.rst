InterMine JavaScript API Loader
===============================

.. note::

    See the `GitHub repo <https://github.com/radekstepan/intermine-api-loader>`_ for source code. For a live example refer to `FlyMine list widgets on Tinkerbin <http://tinkerbin.com/Xb3SZhOK>`_.

Purpose
-------

#. To simplify delivery of InterMine's JavaScript clients.
#. JS Api provides a common namespace `intermine` for all our JavaScript.
#. Can/will be utilized as a loader of dependencies such as jQuery, underscore etc. whenever needed.
#. As JavaScript is namespaced, we can determine which of our libraries are already loaded.

How to use
----------

In an embedding context, the only dependency would be the jsapi, hosted remotely. We provide a callback and wait for the API to load the Widgets library.

.. code-block:: html

    <script src="http://cdn.intermine.org/api"></script>

.. code-block:: javascript

    intermine.load('widgets', function() {
        var widgets = new intermine.widgets('http://flymine.org/service');
    });

In a mine context we want to serve resources locally. As we include jQuery locally this is recognized by jsapi and no internet connection is required.

.. code-block:: html

    // include jQuery locally
    <script src="js/jquery.js"></script>

    // point to API, requirement for all InterMine client side JavaScript
    <script src="js/intermine.api.js"></script>
    // include Widgets library locally, is immediately available on the `intermine` namespace
    <script src="js/intermine.widgets.js"></script>

.. code-block:: javascript

    var widgets = new intermine.widgets('http://flymine.org/service');

Asking for a specific version of a library to be loaded.

.. code-block:: html

    <script src="http://cdn.intermine.org/api"></script>

.. code-block:: javascript

    intermine.load('widgets', '0.9.1', function() {
        var widgets = new intermine.widgets('http://flymine.org/service');
    });

Within a JavaScript library, load resources as asynchronously as possible.

.. code-block:: javascript

    var resources = [
        {
            name: "jQuery",
            path: "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.2/jquery.min.js",
            type: "js",
            wait: true
        }
    ];
    intermine.load(resources, function() {
        // ...
    });
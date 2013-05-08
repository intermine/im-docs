.. index:: embedding, javascript embedding, widgets, report widgets, report widgets service

Report Widgets
==============

.. versionadded:: 1.1

.. note::
    
    Client side development is the best thing since sliced bread but for a novice the following *will* be overwhelming at first. We are learning too.

Report Widgets are a type of embeddable component that offers an unparalleled **flexibility** when it comes to the tools that InterMine offers. They are provided as a way for developers to create interactive *widgets* to their end users. Such widgets can then be embedded on virtually any page, be it within a mine or outside of it.

.. seealso:: `Report widgets demo <http://intermine-report-widgets-service.labs.intermine.org/>`_.

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

Now head over to the `GitHub repo <https://github.com/intermine/intermine-report-widgets>`_ of a reference client/precompiler. This tool will allow you to quickly iterate over your code and test it in the browser immediately.

Typical steps (**refer to the repo's docs**) will look as follows:

.. code-block:: bash

    $ git clone git@github.com:intermine/intermine-report-widgets.git
    $ cd intermine-report-widgets/
    $ npm install
    $ PORT=5200 ./node_modules/.bin/cake start

Now you should have a running instance of a service providing widgets. Head over to `http://127.0.0.1:5200 <http://127.0.0.1:5200>`_ to confirm that it is indeed the case.

Develop a widget
----------------

Create a new folder (no spaces and special characters in the name) in the ``widgets/`` folder of the precompiler.

Presenter
~~~~~~~~~

The next step is writing a presenter which is a component that knows how to get data for itself and then render them in a particular way, thus it encapsulates the behavior of the widget.

The file needs to be called ``presenter.coffee`` for a CoffeeScript file (other options are ``presenter.js``/``presenter.ls`` for a JavaScript/LiveScript file respectively) and be placed in a directory with the name of the widget. The file needs to contain a ``class Widget`` with the following signature:

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

.. note::
    
    Make sure you have jQuery loaded before asking for ``reportWidgets``. (Will change in the future).

Now we say that we want to load report widgets passing in a callback function. In this callback we specify that we want a new ReportWidgets instance pointing to a service serving them.

.. code-block:: javascript

    intermine.load('reportWidgets', function() {
        var widgets = new intermine.reportWidgets('http://127.0.0.1:1119');
    });

In this callback still we say which widget we want passing in extra config that should be merged with service config. This way we can pass in say a symbol of a specific gene we have on a 'page'.

.. code-block:: javascript

    widgets.load('spell-histogram', '#spell', { 'type': 'Gene', 'symbol': 'S000001863' });

Run it from InterMine
---------------------

.. note::
    
    Read this section if you would like InterMine to act as a service for Report Widgets instead of having a Node.js reference implementation running separately.

To have InterMine act as a service we will need to:

#. Write XML config
#. Copy over the prepackaged widget (created & tested above) into our InterMine

The following steps will assume that we want to embed the example ``publications-displayer`` Report Widget that is provided in the GitHub repo.

Write XML config
~~~~~~~~~~~~~~~~

Just like with :doc:`list-widgets/index`, we will configure the widget in ``webconfig-model.xml``. Add to or create a section ``<reportwidgets>`` inside the ``<webconfig>`` tags. Then add something like the following:

.. code-block:: xml

    <reportwidget
      id="publications-displayer"
      author="Radek"
      title="Publications for Gene"
      description="Shows a list of publications for a specific gene"
      version="0.2.0"
    >
      <dependency name="A" path="http://A.js" type="js" />
      <dependency name="B" path="http://B.js" type="js" wait="true" />
      <dependency path="http://C.css" type="css" />
      <keyValue key="mine" value="http://beta.flymine.org/beta" />
      <query name="pubsForGene" model="genomic" view="Gene.publications.title">
        <join path="Gene.publications.authors" style="OUTER" />
      </query>
    </reportwidget>

Now what just happened here?

id
    represents a unique widget id, it needs to match the filename of the widget that we will use
</dependency>
    these items match the syntax described above, just in XML. So we provide a ``name`` of a resource (to check if it exists on the page or not) a ``path`` and a ``type``. Optionally we can provide a boolean ``wait`` to say if some resources need to be loaded ahead of others.
</keyValue>
     a key-value pair in a beautiful XML syntax. This is a config that is your mine specific
</query>
     this is your standard PathQuery with an attribute ``name`` so we can tell which is which inside the widget.

.. warning::

    The PathQuery provided above needs to be a valid one for your particular mine. While the reference implementation does not check for validity, the Java version does. So you cannot, for example, make a PathQuery valid for mine B from mine A that does not have the same data model.

Copy prepackaged widget
~~~~~~~~~~~~~~~~~~~~~~~

Now that we have written the config, we need to provide the actual widget source. Copy over the ``.js`` file from the ``/build`` directory into ``intermine/webapp/main/resources/webapp/js/widgets``. Take care to name the file the same as you have called it (attr. ``id``) in the config above.

Re-release the webapp.

Now you are ready to embed the widget on a page of your choosing according to the steps outlined in `Run it`_. The root for the Java service will be something like: ``http://[YOUR_MINE]/service``.

Run it inside InterMine
-----------------------

.. note::
    
    Read this section if you have either a Node.js or Java service and want to embed a widget inside a mine's Report page.

To embed a Report Widget in a mine's Report page we will create a wrapping :doc:`/webapp/report-page/report-displayers` whose only job will be to call the service in question.

Start by editing your ``web.properties`` file (:doc:`/webapp/properties/web-properties`) adding a requirement to load :doc:`api-loader` on pages:

.. code-block:: properties

    head.js.all.API = CDN/api

Now let us add a config for a :doc:`/webapp/report-page/report-displayers` in ``webconfig-model.xml`` section ``</reportdisplayers>``:

.. code-block:: xml

    <reportdisplayer javaClass="org.intermine.bio.web.displayer.ReportWidgetDisplayer"
                     jspName="model/reportWidgetDisplayer.jsp"
                     replacesFields=""
                     placement="summary"
                     types="Gene"/>

Now we can create the Java backend for the Displayer under ``bio/webapp/src/org/intermine/bio/web/displayer/ReportWidgetDisplayer.java``:

.. code-block:: java

    package org.intermine.bio.web.displayer;

    import javax.servlet.http.HttpServletRequest;

    import org.intermine.api.InterMineAPI;
    import org.intermine.web.displayer.ReportDisplayer;
    import org.intermine.web.logic.config.ReportDisplayerConfig;
    import org.intermine.web.logic.results.ReportObject;

    public class ReportWidgetDisplayer extends ReportDisplayer
    {

        public ReportWidgetDisplayer(ReportDisplayerConfig config, InterMineAPI im) {
            super(config, im);
        }

        @Override
        public void display(HttpServletRequest request, ReportObject reportObject) { }
    }

Now that we have the less than exiting backend, let us write the front end wrapper. Save the following under ``bio/webapp/resources/webapp/model/reportWidgetDisplayer.jsp``:

.. code-block:: jsp

    <%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
    <%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
    <%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles" %>
    <%@ taglib tagdir="/WEB-INF/tags" prefix="im" %>
    <%@ taglib uri="http://jakarta.apache.org/taglibs/string-1.1" prefix="str" %>

    <!-- reportWidgetDisplayer.jsp -->
    <div id="report-widget-displayer-example" class="foundation"></div>
    <script>
    intermine.load('report-widgets', function(err) {
        var widgets = new intermine.reportWidgets('http://localhost:8080/mine/service');
        widgets.load('publications-displayer', '#report-widget-displayer-example', { 'symbol': 'zen' });
    });
    </script>
    <!-- /reportWidgetDisplayer.jsp -->

If we re-release the webapp, we should have a displayer in the summary section of a Gene report page pointing to a ``publications-displayer`` for *zen*.

It is left up to the reader to:

#. Determine where they are going to serve the widgets from. In the script above, we have a hardcoded link to http://localhost:8080/mine which is not very robust.
#. In your widget, you will want to pass an ``id`` of an object from Java backend to the JSP and subsequently to JavaScript. In our example, we get *zen* data regardless of which report page we have visited!
#. Take care of CSS dependencies. *Big* libraries like `Bootstrap <http://twitter.github.io/bootstrap>`_ or `Foundation <http://foundation.zurb.com>`_ will override any and all styles on the whole page. Either do not use them or use them with a prefix. We provide a nifty library for that at http://github.com/radekstepan/prefix-css-node.
#. Make sure that JavaScript libraries on a page do not collide. If we specify that a widget relies on library X and we have no way of checking whether is was already loaded and it was, loading it again may have unpredictable consequences.

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

1. Make use of `intermine-api-loader <https://github.com/intermine/intermine-api-loader>`_ to efficiently load resources and libs only when needed.
2. Generate **callbacks** that are unique for the page taking into account other clients that could exist on the page. As the service URL is unique per client, make use of that.
3. Dump error messages from the server into the target element where widget was supposed to have been.
4. Cache all of the widgets listing as we need to be resolving widget dependencies first.
5. Provide a wrapping ``<article>`` element with a predictable ``im-report-widget`` class so we can use it in our CSS.

Optional
^^^^^^^^

* Provide a callback where all widgets can dump error messages.



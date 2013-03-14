Layout
======

.. note:: This text describes how to customize the look & feel of the whole app.

Parts
-----

Logo
~~~~

The logo is independent from any themes and is located here ``MINE_NAME/webapp/resources/webapp/model/images webapp/resources/webapp/model/images/logo.png``. The recommended size is 45px x 43px.

Menu Tabs
~~~~~~~~~

The tabs are set in InterMine's internationalisation file: ``intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties``.

Each page has a name and a tab, for example:

.. code-block:: properties

    mymine.tab = mymine

In addition to InterMine's file, each mine has its own internationalisation file: `MINE_NAME/webapp/resources/model.properties`. Properties set in this file overwrite the ones set in ``intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties``. Below is an example of how to add tabs to your mine. Replace "api" with the name of your new tab.

First, add your tab to `intermine/webapp/main/resources/webapp/headMenu.jsp`

.. code-block:: guess

      <li id="api"  <c:if test="${tab == 'api'}">class="activelink"</c:if>>
        <a href="/${WEB_PROPERTIES['webapp.path']}/api.do">
          <fmt:message key="menu.api"/>
        </a>
      </li>

Then add the text for that tab to your `MINE_NAME/webapp/resources/model.properties` file:

.. code-block:: properties

    # HEADER
    menu.api = API 

You'll need to configure our web framework (Struts) to properly load your JSP page:

.. code-block:: xml

    # in MINE_NAME/webapp/resources/struts-config-model.xml
    <action path="/api" forward="api.page"/>

    # in MINE_NAME/webapp/resources/tiles-defs-model.xml
    <definition name="api.page" extends="layout.template">
        <put name="body" value="api.tile"/>
        <put name="pageName" value="api"/>
    </definition>

    <definition name="api.tile" path="/api.jsp"/>

Finally, add your JSP file to the `MINE_NAME/webapp/resources/webapp` directory and re-release your webapp.

Keyword search box
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This search box queries the search index created in the postprocess ``create-search-index``. To change which placeholder identifiers will appear in the box, edit the `quickSearch.identifiers` property in :doc:`/webapp/properties/intermine-properties`.

.. seealso:: :doc:`/webapp/keyword-search/index` for details on how to configure the search index.

Footer 
~~~~~~

``feedback.destination``
    in :doc:`/webapp/properties/intermine-properties` changes the recipient email address for contact form
 ``funding``
    in :doc:`/webapp/properties/model-properties` changes the "funded by" text

Favicon
~~~~~~~

Favicon (icon seen next to the url of the webapp in the browser url bar) can be set by adding the following line:

.. code-block:: html

    <link rel="shortcut icon" type="image/x-icon" href="model/images/favicon.ico">

Into the ``webapp/resources/webapp/layout.jsp`` file and its ``</head>`` section. The favicon itself should be located in ``<your_mine>/webapp/resources/webapp/model/images/favicon.ico``.

If you want to generate a favicon from an image, use this `Dynamic Drive <http://tools.dynamicdrive.com/favicon/>`_ tool.

Other properties
~~~~~~~~~~~~~~~~~

``project.sitePrefix``
    in :doc:`/webapp/properties/intermine-properties` configures the link
``project.title``
    in :doc:`/webapp/properties/intermine-properties` configures the name of the mine
``project.releaseVersion``
    in :doc:`/webapp/properties/intermine-properties` configures the version of the mine
``project.subTitle``
    in :doc:`/webapp/properties/intermine-properties` configures the subtitle showing in the header
``header.links``
    in :doc:`/webapp/properties/web-properties` configures the links in upper right corner

Changing look and feel, the theme
---------------------------------

InterMine provides a set of default themes but you can also create your own. All themes are defined in ``intermine/webapp/main/resources/webapp/themes/*``. Explore the folder to see the themes available.

To switch a theme edit :doc:`/webapp/properties/web-properties`:

.. code-block:: properties
    
    # web.properties
    theme = purple

You need to change this property to the name of the theme you want to use (the directory name), then re-release the webapp. Be sure to run ``ant-clean`` to ensure that all of the old files are deleted:

.. code-block:: bash

    # in <your_mine>/webapp/resources/webapp
    $ ant clean
    $ ant default remove-webapp release-webapp

Developing your own theme
~~~~~~~~~~~~~~~~~~~~~~~~~

With CSS knowledge and open source image software such as `Gimp <http://www.gimp.org>`_ or `Inkscape <http://www.inkscape.org>`_ you can develop your own theme. Each theme directory contains a ``theme.css`` file, which is broken down in annotated sections, and image files. The image files are required for displaying menus, headers and backgrounds and can be modified with image software to match your colour scheme. Create a new directory under ``intermine/webapp/main/resources/webapp/themes/``, copy the contents of another theme directory into it and start editing.

.. index:: themes, layout, look & feel, footer, header, favicon, tabs, logo
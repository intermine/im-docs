.. index:: report page, report displayers

Report Displayers
=================

.. seealso:: :doc:`report-displayers-examples`.

Report displayers allow custom display of particular data types on report pages (only), typically to replace default tables with more appropriate presentation of data. Widgets:

#. Use a simple framework to add a JSP for display and optionally Java code to run queries, hold caches, etc.
#. Are assigned to the **summary** section at the top of the page or a particular **data category**
#. Can **replace fields** from the report page to override default display of attributes or collections
#. Are configured in the ``webconfig-model.xml`` file in your Mine

This page describes how to configure your Mine to include widgets for common data types and how to create your own custom widget.

Configuring displayers
----------------------

Configuration is placed in a ``<reportdisplayers>`` section of ``webconfig-model.xml``:

.. code-block:: xml

    <reportdisplayers>
        <reportdisplayer javaClass="org.intermine.bio.web.displayer.GeneOntologyDisplayer"
            jspName="model/geneOntologyDisplayer.jsp"
            replacesFields="goAnnotation,ontologyAnnotations"
            placement="Function"
            types="Gene"/>
    </reportdisplayers>

``javaClass``
    an optional Java class to run before display, typically this performs database queries or creates data structures used by the JSP. The class should extend ``ReportDisplayer`` and implement a ``display()`` method.
``jspName``
    the JSP file used to display output
``replacesFields``
    a comma separated list of fields that should not appear on the report page when the displayer is used
``showImmediately``
    set to ``true`` to display the displayer immediately as the page loads, without waiting (``false`` by default)
``placement``
    the section on the report page the displayer should appear in, can be 'summary' or a valid data category name.
``types``
    a comma separated list of class names for this displayer can be used
``parameters``
    this is a JSON string used to pass arbitrary parameters to particular displayers, you can make use of this for detailed configuration of any displayers you write. For example, the ``trunk/bio/webapp/src/org/intermine/bio/web/displayer/HomologueDisplayer.java`` is passed a list of data sets to displayer homologues from: ``parameters="{'dataSets': ['TreeFam data set', 'KEGG orthologues data set']}"``.

Useful displayers
-----------------

There are several displayers for common data types that may be useful in many Mines. To enable these just copy the configuration from FlyMine's ``trunk/flymine/webapp/resources/webapp/WEB-INF/webconfig-model.xml``.

For examples of the common displayers and configuration details please see ReportDisplayerGallery.

Creating a new Displayer
------------------------

If you've loaded some new data into your Mine or have some great ideas about presenting data from the common data loaders you can create a new displayer.  Here are brief instructions, take a look at the many examples for more details.

#. Create a Java class [1]_ in ``<mine>/webapp/src/org/intermine/web/displayers`` that inherits from ``org.intermine.web.displayer.ReportDisplayer``.
#. Implement ``public void display(HttpServletRequest request, ReportObject reportObject)`` to perform any queries or processing required and put results on the request.
#. Create a JSP file in ``<mine>/webapp/resources/webapp/model`` to display the results.
#. Add configuration to ``<mine>/webapp/resources/webapp/WEB-INF/webconfig-model.xml`` to set up the ``javaClass`` and ``jspName`` created above and set the ``types`` for which the displayer should appear and the *summary* or a data category (aspect) as the ``placement`` for the displayer. Optionally set any fields in the report page that should be hidden when this displayer is used.
 
Troubleshooting
~~~~~~~~~~~~~~~

As we use AJAX to load the displayers to speed up the initial load of a Report page, JavaScript calls to when a document is ready are executed immediately as the page has finished loading already. Specifically when using GoogleCharts API, one needs to amend the initial loading code with a callback like for example so:

.. code-block:: javascript

    google.load("visualization", "1", {"packages": ["corechart"], "callback": drawFlyAtlasChart});

.. [1] ReportDisplayer makes available a variable called ``im`` which is the ``InterMineAPI`` which provides access to config and query execution classes.

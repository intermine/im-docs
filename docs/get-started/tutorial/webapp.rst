Tutorial - Configure your InterMine webapp
================================================

This tutorial aims to cover the basics of configuring an InterMine webapp.

Overview
----------------------

In general, customisation of InterMine is accomplished by updating the appropriate configuration file and redeploying the webapp. A few features are updated via tagging as well. See :doc:`/webapp/index` for the full documentation on the webapp.  

.. note::

	You should have completed the previous tutorial and have successfully deployed the webapp.

This tutorial is intended to give a general idea of what you can customise in InterMine and how to do it. We're going to go through each section of the webapp and give step by step instructions on how to update your webapp. This is a detailed tutorial and should take you a few hours to complete. However it is not comprehensive. Where topics aren't covered, there are links provided for more information. If you have a question that you don't see answered, try searching the documentation or taking a look at the index. Intermine has an active developer's mailing list as well.


General Layout
---------------------

Each web page in InterMine has a header and footer. The header contains everything at the top of the page, including 
the navigation tabs and the keyword search. The footer contains the contact form and InterMine logo.

.. image:: ../../imgs/header-footer.png

Header
~~~~~~~

Logo
^^^^^

First, let's update the logo of your site. The logo should be 45x43 and named `logo.png`, for example:

.. image:: ../../imgs/logo.png

1. Copy your image into this directory: `MINE_NAME/webapp/resources/webapp/model/images`
2. Make sure Tomcat is running
3. Deploy your webapp with this command:

.. code-block:: bash

	ant default remove-webapp release-webapp

4. Refresh your browser

You should see your new logo in the top left corner of your webapp. If you don't, try clearing your browser's cache.

ant targets
^^^^^^^^^^^^^^^^^^^^^^

If your changes are still not being reflected in your webapp, add the `clean` target:

.. code-block:: bash

	ant clean; ant default remove-webapp release-webapp

This removes all temporary directories so you are certain your new files are being used. The `clean-all` target removes
temporary directories from all dependencies as well.

See :doc:`/system-requirements/software/ant/` for a list of ant targets.

Subtitle
^^^^^^^^^^^^^^^^^^^^^^

Next to the name of your mine in the header is a phrase we call the "subtitle". In the tutorial webapp you created earlier, this value is

An example of InterMine.bio with data from <i>Plasmodium falciparum</i>

That value is set in :doc:`/webapp/properties/intermine-properties` with the property `project.subTitle`. This is the same properties file you updated in the previous tutorial. See :doc:`/webapp/properties/intermine-properties` for the full list of properties this file controls.

Update this property and redeploy your webapp using the commands given above. Once you have successfully released your webapp, you should see your new subtitle.


Show all properties
^^^^^^^^^^^^^^^^^^^^^^

You can see the value of this and all properties set in your mine:

1. Log in as the superuser
2. Change the last part of the URL in your browser to be `showProperties.do`, e.g. http://localhost:8080/test/showProperties.do

This is  list of all properties in all configuration files that are used in your webapp. Search for `project.subTitle` and you should see your new value.



Keyword Search 
^^^^^^^^^^^^^^^^^^^^^^

InterMine's keyword search is a powerful Lucene-based search created at build-time. When the first search is executed, the index is retrieved from the database, written to temp files and loaded into memory. This can take up to a minute. Our release scripts include a command to run this search so that the index is ready.


The search box contains example identifiers to help your users know which types of search terms to use. To update the default value, set the `quicksearch.example.identifiers` property in the :doc:`/webapp/properties/web-properties` file. Redeploy your webapp to see your changes.

.. warning::

	The index covers the entire database so can be quite large. FlyMine's index is ~2G, so make certain you have plenty of room.



See :doc:`/webapp/keyword-search/index` for details on how to configure the keyword search index and results.


Footer
~~~~~~~~~~~~~~

The footer is positioned at the bottom of every page in the InterMine webapp. It contains the contact link and the funding message.

To update the funding message, change the `funding` property in :doc:`/webapp/properties/web-properties`. Redeploy your webapp to see your changes.

.. note::

	Your webapp may freeze or become sluggish after redeploying your webapp several times. If this happens restart Tomcat. If Tomcat runs out of memory, you may have to kill the process as it will fail to shut down correctly. Upgrading to Tomcat 7 seems to solve this problem.


properties files
^^^^^^^^^^^^^^^^^^^^^^

There are four main text files you are going to be updating the most:

:doc:`/webapp/properties/intermine-properties ~/.intermine/<MINE_NAME>.properties`
  database and webapp names and locations. includes passwords and shouldn't be in source control.

:doc:`/webapp/properties/web-properties web.properties`
  webapp behaviour, e.g. link outs, tabs on home page

:doc:`/webapp/properties/model-properties model.properties`
  text displayed on webapp, e.g. error messages

:doc:`/webapp/properties/webconfig-model webconfig-model.xml`
  webapp functionality, e.g. custom export types, widgets, data display

See :doc:`/webapp/layout/index` for more details on how to update the header, footer and colour scheme of your InterMine webapp. Next we'll customise your home page.



Home page
----------------------


Most everything on the home page is customisable. You can edit the text and set which RSS news feed to use. 

Boxes
~~~~~~~

You can customise the text in the three boxes that appear on the top of the home page. Let's edit the example given in the middle box marked `Analyse`.

Notice the text box already has an example, `e.g. X, Y, Z`. This is the default example and it's set by `begin.listBox.example` in an InterMine properties file, global.web.properties.

Add this property to your mine's web.properties files and redeploy your webapp to see your changes.

InterMine, bio and mine /webapp
""""""""""""""""""""""""""""""""""""""""""

In Intermine there are 3 webapp projects: InterMine, bio and mine. You shouldn't ever have to change the files in InterMine and bio, you'll only ever update your mine's files. When the webapp is compiled, the build system starts with the InterMine webapp project, then merges bio into that. Finally your mine's webapp is added. The files and properties set in bio override any in the InterMine project. Your mine's files and properties override any in bio or InterMine.

Therefore when you set `begin.listBox.example` in your properties file, it overrode the same property set in the InterMine properties file. This will be true of any property.






Use your own
~~~~~~~~~~~~~~~~~~~

The text and settings are configurable, but you may want a different layout for your home page. 


1. Copy `begin.jsp` from `intermine/webapp` into your own webapp directory: `MINE_NAME/webapp/resources/webapp/model`.
2. Edit your begin.jsp 
3. Redeploy your webapp to show your change

We saw in the previous section that properties override InterMine properties. The same holds true for JSP pages.

Note: Changes made to the home page, or whichever page you updated, will not be reflected in your custom copy.


See :doc:`/webapp/homepage/index` for more details on how to update





JBrowse
=======================================

InterMine 1.3.1 supports the JBrowse REST web-service specification (see `configuring JBrowse`_) which means that you can run a JBrowse installation
directly off the InterMine web-services. 

This documentation has been tested with JBrowse-1.11.5.

NOTE: If you already have a JBrowse installation working and just want to embed it in your report pages then see: `Embedding JBrowse`_.


Build Your InterMine Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add this to the `<post-processing>` section of your project XML file and then build your database:

.. code-block:: xml

  <post-process name="populate-child-features"/>


See :doc:`/database/database-building/post-processing/index` for details.

Install JBrowse
~~~~~~~~~~~~~~~~~~~~

You will need an installation of JBrowse for this task. Instructions on doing this can be found at `installing JBrowse`_.

Add JBrowse to InterMine
~~~~~~~~~~~~~~~~~~~~~~~~~~

Add JBrowse to your report pages by adding this entry to your `webconfig-model.xml </webapp/properties/webconfig-model/index>`_ file:

.. code-block:: xml

    <reportdisplayer javaClass="org.intermine.bio.web.displayer.JBrowseDisplayer"
                     jspName="model/jbrowseDisplayer.jsp"
                     replacesFields=""
                     placement="Genomics"
                     types="SequenceFeature"/>

See :doc:`/webapp/report-page/report-displayers-examples/` for more information.

Add the location of your JBrowse installation to your `web.properties` file, for example:

.. code-block:: properties

  jbrowse.install.url = http://jbrowse.intermine.org


Point JBrowse at your InterMine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add your new mine-based dataset to your configuration file. For example to add *D. melanogaster* data from FlyMine_ as a JBrowse dataset, the following configuration in `jbrowse_conf.json` would suffice:

.. code-block:: json
   
  { 
    "datasets": {
       "FlyMine-7227": {
        "url": "?data=http://www.flymine.org/query/service/jbrowse/config/7227",
        "name": "FlyMine"
      },
      ...
    }
  }


Once in place, you can visit your JBrowse `index.html` and see the data from FlyMine_.

.. _configuring JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide
.. _installing JBrowse: http://jbrowse.org/code/latest-release/docs/tutorial/
.. _FlyMine: http://www.flymine.org
.. _Embedding JBrowse: http://intermine.readthedocs.org/en/latest/webapp/third-party-tools/jbrowse

.. index:: JBrowse, GBrowse, das

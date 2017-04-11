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

Add the location of your JBrowse installation to your `web.properties` or mine properties file, for example:

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

Configuring InterMine's JBrowse integration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, all InterMine classes that inherit from the SequenceFeature model class will have tracks.

However, this can be inappropriate since some of those classes may not have data.

You can make entries in `web.properties` to configure which tracks appear.  For instance, if you just want Gene, CDS, UTR and Promoter tracks then in `<mine>/webapp/resources/web.properties` configure

.. code-block:: guess

  org.intermine.webservice.server.jbrowse.genomic.track.Gene.class=Gene
  org.intermine.webservice.server.jbrowse.genomic.track.CDS.class=CDS
  org.intermine.webservice.server.jbrowse.genomic.track.UTR.class=UTR
  org.intermine.webservice.server.jbrowse.genomic.track.Promoter.class=Promoter

Here, track names are the first component of the key after org.intermine.webservice.server.jbrowse.genomic.track (e.g. Gene on the first line).  These track names are used to group related properties and are not used in JBrowse display.  The rest of the key name (here always class) specifies the InterMine class to be used for this track.

JBrowse parameters can also be set for individual tracks within InterMine.  For instance, in `web.properties`, if one wanted to give all 4 of the tracks defined above different colours then one would set

.. code-block:: guess

  org.intermine.webservice.server.jbrowse.genomic.track.Gene.style.color=red
  org.intermine.webservice.server.jbrowse.genomic.track.CDS.style.color=yellow
  org.intermine.webservice.server.jbrowse.genomic.track.UTR.style.color=green
  org.intermine.webservice.server.jbrowse.genomic.track.Promoter.style.color=blue

For the full list of properties, please see the canvas section of the `JBrowse Configuration Guide <http://gmod.org/wiki/JBrowse_Configuration_Guide>`_.

.. _configuring JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide
.. _installing JBrowse: http://jbrowse.org/code/latest-release/docs/tutorial/
.. _FlyMine: http://www.flymine.org
.. _Embedding JBrowse: http://intermine.readthedocs.org/en/latest/webapp/third-party-tools/jbrowse

.. index:: JBrowse, GBrowse, das

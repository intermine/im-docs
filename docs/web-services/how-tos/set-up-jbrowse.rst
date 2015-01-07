How Do I Set Up JBrowse to Work With InterMine?
-----------------------------------------------

InterMine 1.3.1 supports the JBrowse REST web-service specification (see `configuring JBrowse`_) which means that you can run a JBrowse installation
directly off the InterMine web-services. You do not need to do anything special to enable this, but you should ensure that you run the `populate-child-features` `post-process </database/database-building/post-processing/index>`_ task to make sure that the Gene models are correctly structured.

This documentation has been tested with JBrowse-1.11.3.

NOTE: If you already have a JBrowse installation working and just want to embed it in your report pages then see: `Embedding JBrowse`_.

Download JBrowse
.................

You will need an installation of JBrowse for this task. Instructions on doing this can be found at `installing JBrowse`_.

This can be done by fetching and extracting the latest release from jbrowse.org, e.g.:

.. code-block:: bash

    wget -O JBrowse-1.11.5.zip 'http://jbrowse.org/wordpress/wp-content/plugins/download-monitor/download.php?id=98'
    unzip JBrowse-1.11.5.zip

InterMine 1.3.2: Point at an InterMine
........................................

If your target InterMine is at 1.3.2 or later (API version >= 17), then
you can simply get the configuration files generated for you by the mine itself.

All you need to do is add your new mine-based dataset to your configuration file. For
example to add *D. melanogaster* data from FlyMine_ as a JBrowse dataset, the
following configuration in `jbrowse_conf.json` would suffice:

.. include:: /web-services/how-tos/jbrowse_conf.json
   :code: json

InterMine 1.3.1: Add Configuration Files
.........................................

You need to add two configuration files to the default JBrowse installation
to start consuming data from the web-services. These are `JBROWSE/data/trackList.json`
and `JBROWSE/data/seq/refSeqs.json`. You may need to create the directory structure
for these files first:

.. code-block:: bash

    cd JBrowse-1.11.3
    mkdir -p data/seq

If you wanted to have several data-sources, you would want separate directories, so:

.. code-block:: bash

    mkdir -p data/flymine/seq

The first file, `data/trackList.json`, defines the tracks you wish to display. For example
to display the genes and inter-genic regions, and a reference track with the DNA for
*D. melanogaster* from FlyMine_, enabling search for features by name and using 
density histograms when zoomed out, the following track list could be used:

.. include:: /web-services/how-tos/trackList.json 
   :code: javascript

The second file, the `refSeqs.json` is a list of the reference sequences you wish to display
in your JBrowse. This can be automatically derived from the webservice itself. The following
Python script will print out a suitable `refSeqs.json` for *D. melanogaster* from FlyMine_:

.. include:: /web-services/how-tos/create-ref-seqs.py
   :code: python
   :start-line: 4

You can use this file, or one like it, as:

.. code-block:: bash

    python create-ref-seqs.py > data/seq/refSeqs.json

This will look something like:

.. include:: /web-services/how-tos/refSeqs.json
   :code: javascript

Once in place, you can visit your JBrowse `index.html` and see the data from FlyMine_.

.. _configuring JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide
.. _installing JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide#Making_a_New_JBrowse
.. _FlyMine: http://www.flymine.org
.. _Embedding JBrowse: http://intermine.readthedocs.org/en/latest/webapp/third-party-tools/jbrowse

.. index:: JBrowse, GBrowse, das

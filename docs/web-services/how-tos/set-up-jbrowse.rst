How Do I Set Up JBrowse to Work With InterMine?
-----------------------------------------------

InterMine 1.3.1 supports the JBrowse REST web-service specification
(see `configuring JBrowse`_) which means that you can run a JBrowse installation
directly off the InterMine web-services. You do not need to do anything
special to enable this, but you should ensure that you run the
`populate_child_features` post-process task to make sure that the
Gene models are correctly structured.

This documentation has been tested with JBrowse-1.11.3.

Download JBrowse
.................

You will need an installation of JBrowse for this task. Instructions on doing
this can be found at `installing JBrowse`_.

This can be done by fetching and extracting the latest release:

.. code-block:: bash

    wget -O JBrowse-1.11.3.zip 'http://jbrowse.org/wordpress/wp-content/plugins/download-monitor/download.php?id=93'
    unzip JBrowse-1.11.3.zip

Add Configuration Files
.......................

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

.. include:: trackList.json 
   :code: javascript

The second file, the `refSeqs.json` is a list of the reference sequences you wish to display
in your JBrowse. This can be automatically derived from the webservice itself. The following
Python script will print out a suitable `refSeqs.json` for *D. melanogaster* from FlyMine_:

.. include:: create-ref-seqs.py
   :code: python
   :start-line: 4

You can use this file, or one like it, as:

.. code-block:: bash

    python create-ref-seqs.py > data/seq/refSeqs.json

This will look something like:

.. include:: refSeqs.json
   :code: javascript

Once in place, you can visit your JBrowse `index.html` and see the data from FlyMine_.

.. _configuring JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide
.. _installing JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide#Making_a_New_JBrowse
.. _FlyMine: http://www.flymine.org

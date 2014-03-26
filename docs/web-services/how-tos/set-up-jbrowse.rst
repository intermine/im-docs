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

The first file, the `trackList.json`, defines the tracks you wish to display. For example
to display the genes and inter-genic regions, and a reference track with the DNA for
*D. melanogaster* from FlyMine_ the following track list could be used:

.. code-block:: javascript
    {
        "tracks": [
            {
                "label":      "my_gene_track",
                "key":        "Genes",
                "type":       "JBrowse/View/Track/CanvasFeatures",
                "storeClass": "JBrowse/Store/SeqFeature/REST",
                "baseUrl":    "http://www.flymine.org/query/service/jbrowse/7227",
                "query": {
                    "type": "Gene" 
                }
            },
                {
                "label":      "my_intergenic_track",
                "key":        "Intergenic Regions",
                "type":       "JBrowse/View/Track/CanvasFeatures",
                "storeClass": "JBrowse/Store/SeqFeature/REST",
                "baseUrl":    "http://www.flymine.org/query/service/jbrowse/7227",
                "query": {
                    "type": "IntergenicRegion" 
                }
            },
            {
                "label":      "my_sequence_track",
                "key":        "DNA",
                "type":       "JBrowse/View/Track/Sequence",
                "storeClass": "JBrowse/Store/SeqFeature/REST",
                "baseUrl":    "http://www.flymine.org/query/service/jbrowse/7227",
                "query": {
                    "reference": true
                }
            }
        ]
    }

The second file, the `refSeqs.json` is a list of the reference sequences you wish to display
in your JBrowse. This can be automatically derived from the webservice itself. The following
Python script will print out a suitable `refSeqs.json` for *D. melanogaster* from FlyMine_:

.. code-block:: python
    import json
    import intermine.webservice

    sq = intermine.webservice.Service("http://www.flymine.org/query")
    refs = sq.model.Chromosome.where("length", ">", 0).where("organism.taxonId", "=", "7227")

    print json.dumps([{"name": r.primaryIdentifier, "start": 0, "end": r.length} for r in refs])

This will look something like:

.. code-block:: javascript
    [
        {"start": 0, "end": 23011544, "name": "2L"},
        {"start": 0, "end": 24543557, "name": "3L"},
        {"start": 0, "end": 27905053, "name": "3R"},
        {"start": 0, "end": 22422827, "name": "X"},
        {"start": 0, "end": 21146708, "name": "2R"},
        {"start": 0, "end": 204112, "name": "XHet"},
        {"start": 0, "end": 3288761, "name": "2RHet"},
        {"start": 0, "end": 10049037, "name": "U"},
        {"start": 0, "end": 1351857, "name": "4"}, 
        {"start": 0, "end": 19517, "name": "dmel_mitochondrion_genome"},
        {"start": 0, "end": 2517507, "name": "3RHet"},
        {"start": 0, "end": 368872, "name": "2LHet"},
        {"start": 0, "end": 2555491, "name": "3LHet"}, 
        {"start": 0, "end": 347038, "name": "YHet"},
        {"start": 0, "end": 29004656, "name": "Uextra"}
    ]

Once in place, you can visit your JBrowse `index.html` and see the data from FlyMine_.

.. _configuring JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide
.. _installing JBrowse: http://gmod.org/wiki/JBrowse_Configuration_Guide#Making_a_New_JBrowse
.. _FlyMine: http://www.flymine.org

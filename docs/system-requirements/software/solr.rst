Solr
===========

InterMine uses Solr for its keyword search. Now the first search is instant, you can inspect the search index directly (via http://localhost:8983/solr/) and there's a facet web service (via `/service/facet-list` and `/service/facets?q=gene`). Certain bugs, e.g. searching for the gene "OR", are also now fixed.

See below for how to install and configure Solr search for your InterMine

Configure the InterMine instance
------------------------------------

Configure the search end point

.. code-block:: properties

    # keyword_search.properties 
    # replace "flymine" with your mine's name
    index.solrurl = http://localhost:8983/solr/flymine-search
    index.batch.size = 1000

Configure the autocomplete

.. code-block:: properties

    # objectstoresummary.config.properties
    # replace "flymine" with your mine's name
    autocomplete.solrurl = http://localhost:8983/solr/flymine-autocomplete

Configure XML library

.. code-block:: properties

    # your mine's gradle.properties
    systemProp.javax.xml.stream.XMLOutputFactory = com.sun.xml.internal.stream.XMLOutputFactoryImpl

Otherwise the com.ctc.wstx.stax.WstxOutputFactory class is loaded. See `#1889 <https://github.com/intermine/intermine/issues/1889>`_ for details.

Install SOLR
-----------------

Download `Solr binary package <http://archive.apache.org/dist/lucene/solr/7.2.1/>`_ and extract it to any place you like. Inside `/solr-7.2.1` directory start the server with this command:

.. code-block:: bash
    
    # Starts the server instance on port 8983
    solr-7.2.1 $ ./bin/solr start

Initialising Search Indexes
----------------------------------

.. note::

    Be sure your $GRADLE_OPTS parameter is set correctly so you have enough memory and disk space for the search index.

To create a Intermine collection for search process, run this command inside the solr directory. 

.. code-block:: bash

    # Initialises the search index
    # replace "flymine-search" with whatever you configured above in the properties file
    solr-7.2.1 $ ./bin/solr create -c flymine-search

To create a Intermine collection for autocomplete process, run this command inside the solr directory. 

.. code-block:: bash

    # Initaliases the autocomplete index
    # replace "flymine-autocomplete" with whatever you configured above in the properties file
    solr-7.2.1 $ ./bin/solr create -c flymine-autocomplete

Create Search Indexes
-----------------------------

To populate your search index, you'll need to add postprocesses to your mine's project XML file: `create-search-index` and `create-autocomplete-index`.

See :doc:`/database/database-building/project-xml` and :doc:`/database/database-building/post-processing/index` for details.

Configuring Search Results
--------------------------------

See :doc:`/webapp/keyword-search/index` for details on how to configure the search results.

.. index:: Solr, Lucene, search index, autocomplete

---
title: Solr
---

InterMine uses Solr for its keyword search. Now the first search is instant, you can inspect the search index directly \(via [http://localhost:8983/solr/](http://localhost:8983/solr/)\) and there's a facet web service \(via `/service/facet-list` and `/service/facets?q=gene`\). Certain bugs, e.g. searching for the gene "OR", are also now fixed.

See below for how to install and configure Solr search for your InterMine

## Configure the InterMine instance

Configure the search end point

```text
# keyword_search.properties 
# replace "flymine" with your mine's name
index.solrurl = http://localhost:8983/solr/flymine-search
index.batch.size = 1000
```

Configure the autocomplete

```text
# objectstoresummary.config.properties
# replace "flymine" with your mine's name
autocomplete.solrurl = http://localhost:8983/solr/flymine-autocomplete
```

Configure XML library

```text
# your mine's gradle.properties
systemProp.javax.xml.stream.XMLOutputFactory = com.sun.xml.internal.stream.XMLOutputFactoryImpl
```

Otherwise the com.ctc.wstx.stax.WstxOutputFactory class is loaded. See [\#1889](https://github.com/intermine/intermine/issues/1889) for details.

## Install SOLR

Download [Solr binary package](http://archive.apache.org/dist/lucene/solr/7.2.1/) and extract it to any place you like. Inside `/solr-7.2.1` directory, start the server with this command:

```bash
# Starts the server instance on port 8983
solr-7.2.1 $ ./bin/solr start
```

## Initialising Search Indexes

**Note**
Be sure your $GRADLE\_OPTS parameter is set correctly, so you have enough memory and disk space for the search index.

To create a Intermine collection for search process, run this command inside the solr directory.

```bash
# Initialises the search index
# replace "flymine-search" with whatever you configured above in the properties file
solr-7.2.1 $ ./bin/solr create -c flymine-search
```

To create a Intermine collection for autocomplete process, run this command inside the solr directory.

```bash
# Initaliases the autocomplete index
# replace "flymine-autocomplete" with whatever you configured above in the properties file
solr-7.2.1 $ ./bin/solr create -c flymine-autocomplete
```

## Create Search Indexes

To populate your search index, you'll need to add these postprocesses to your mine's project XML file: `create-search-index` and `create-autocomplete-index`.

See [Project XML](../../database/database-building/project-xml.md) and [Post processing](../../database/database-building/post-processing/index.md) for details.

## Configuring Search Results

See [Keyword Search](../../webapp/keyword-search/index.md) for details on how to configure the search results.

## Production search

You can easily copy your index from your dev to your production server. You can copy the entire `/solr` directory then do `./bin/solr start`. You can also [dump / restore the index](https://lucene.apache.org/solr/guide/6_6/making-and-restoring-backups.html). Be sure to copy the `managed-schema` file over as well the first time. Don't forget to restart Solr after making changes.


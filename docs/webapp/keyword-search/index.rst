Keyword Search
================================

Indexing the database runs as a post-process step which creates the index in a directory. The index is then zipped and stored in the database, when you deploy a webapp pointing at the database it will extract the index again. For FlyMine indexing takes less than an hour, including a large proportion of the database.

By default the index will include the text fields of all objects in the database. Each object in the database becomes a document in the index with text attributes attached. You can configure classes to ignore, such as locations and scores that don't provide text information. You can also add related information to an object, for example you can configure that the synonyms, pathways and GO terms should be included in the Gene's entry. 

fields in the results
   determined by WebConfigModel

type
   class of object

score
   determined by the Lucene search, from 0 to 1

lists
   Users can make lists from search results but only if all results are of the same type.

To view entire the entire index:  Navigate to search results page without search parameter, eg http://www.flymine.org/query/keywordSearchResults.do

Config file
------------------------

The config file is located at `MINE_NAME/dbmodel/resources/keyword_search.properties`

* index.temp.directory

   * directory for search index

* index.references.<CLASS_NAME>

   * eg. index.references.Gene
   * index these objects' references in addition to the normal indexing
   * eg. if Gene.pathways is indexed so that when users search for pathways, the associated genes are also returned as search results

* index.ignore

   * do not index these classes

* index.ignore.fields 

   * do not index these fields
   * eg `index.ignore.fields = SNP.type SNP.alleles`

* facets

   * Will appear as filters on the left panel in the search results
   * choose `single` for references, `multi` for collections
   * Note: you must index any references used as facets. (see: above at '''index.references''').

* index.boost.<CLASS_NAME>

   * weight this class heavier than other objects

* search.debug

   * debug setting off, used only for testing

Search Results
----------------------

The fields displayed in the keyword search results are determined by the WebConfigModel file.

* If the fields are ClassKeys:

   * links in blue
   * shown at the top

* If the fields are not ClassKeys:

   * NOT linked, black text
   * shown below the links

Search Index
--------------------

You can rebuild the search index by running this command in in your mine:

.. code-block:: bash

   ~/git/flymine $ ./gradlew postprocess -Pprocess=create-search-index

You need to re-release your webapp.  Take a look in the intermine.log file when it's done to see which tables and fields were indexed.

.. code-block:: properties

   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Indexing - Special References:
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - - interface org.intermine.model.bio.Gene = [pathways, proteins.proteinDomains, goAnnotation.ontologyTerm]
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - - interface org.intermine.model.bio.OntologyTerm = [synonyms]
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - - interface org.intermine.model.bio.Protein = [proteinDomains]
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - - interface org.intermine.model.bio.BioEntity = [synonyms, organism, crossReferences]
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Indexing - Facets:
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - - field = Category, name = Category, type = SINGLE
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - - field = organism.shortName, name = Organism, type = SINGLE
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Indexing with and without attribute prefixes:
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Search - Debug mode: true
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Indexing - Temp Dir: /tmp/keywordSearch
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Starting fetcher thread...
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Preparing indexer...
   2013-02-04 09:26:35 INFO  org.intermine.web.search.KeywordSearch     - Creating search index tmp dir: /tmp/keywordSearch

You can view the index to see what's actually in it. 

1. Prevent the code from deleting the index once it's finished. You can do this by commenting out this line: https://github.com/intermine/intermine/blob/dev/intermine/web/main/src/org/intermine/web/search/KeywordSearch.java#L1906 (be sure to put this back!)
2. Use luke: http://www.getopt.org/luke or similar to view the records in the index.

Lucene
----------

Our search uses Lucene's `whitespace analyser <http://lucene.apache.org/core/3_1_0/api/all/org/apache/lucene/analysis/WhitespaceAnalyzer.html>`_, which only uses whitespace to mark word boundaries. 

.. index:: keyword search, quick search, search

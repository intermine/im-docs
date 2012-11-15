Keyword Search
================================

= Keyword Search =


Indexing the database runs as a post-process step which creates the index in a directory. The index is then zipped and stored in the database, when you deploy a webapp pointing at the database it will extract the index again. For FlyMine indexing takes less than an hour, including a large proportion of the database.

By default the index will include the text fields of all objects in the database. Each object in the database becomes a document in the index with text attributes attached. You can configure classes to ignore, such as locations and scores that don't provide text information. You can also add related information to an object, for example you can configure that the synonyms, pathways and GO terms should be included in the Gene's entry. 

=== Config file ===

The config file is located at MINE/dbmodel/resources/keyword_search.properties, here is an example:  [source:/trunk/bio/tutorial/malariamine/dbmodel/resources/keyword_search.properties keyword_search.properties].

 * index.temp.directory
   * directory for search index
 * index.references.<CLASS_NAME>
   * eg. index.references.Gene
   * index these objects' references in addition to the normal indexing
   *eg. if Gene.pathways is indexed so that when users search for pathways, the associated genes are also returned as search results
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

=== Search Results ===

The fields displayed in the keyword search results are determined by the WebConfigModel file.

 * If the fields are ClassKeys:
   * links in blue
   * shown at the top
 * If the fields are not ClassKeys:
   * NOT linked, black text
   * shown below the links

=== Search Index ===

You can rebuild the search index by running this command in <MINE>/postprocess:
{{{
>ant -Daction=create-search-index
}}}
You need to re-release your webapp.  Take a look in the intermine.log file when it's done to see which tables and fields were indexed.

----

The faceted search system was implemented by Nils Kölling, a summer intern with InterMine.  See the [http://www.flymine.org/download/talks/keyword_search_talk.pdf talk he gave] for more technical details.


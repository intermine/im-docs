# Keyword Search

InterMine uses Solr for its keyword search index.

By default the index will include the text fields of all objects in the database. Each object in the database becomes a document in the index with text attributes attached. You can configure classes to ignore, such as locations and scores that don't provide text information. You can also add related information to an object, for example, you can configure that the synonyms, pathways and GO terms should be included in the Gene's entry.

**fields in the results**

determined by WebConfigModel

**type**

class of object

**score**

determined by the Lucene search, from 0 to 1

**lists**

Users can make lists from search results but only if all results are of the same type.

To inspect the index directly: [http://localhost:8983/solr/](http://localhost:8983/solr/)

## Config file

The config file is located at `MINE_NAME/dbmodel/resources/keyword_search.properties`

* index.temp.directory

  > * directory for search index

* index.references.&lt;CLASS\_NAME&gt;

  > * eg. index.references.Gene
  > * index these objects' references in addition to the normal indexing
  > * eg. if Gene.pathways is indexed so that when users search for pathways, the associated genes are also returned as search results

* index.ignore

  > * do not index these classes

* index.ignore.fields

  > * do not index these fields
  > * eg `index.ignore.fields = SNP.type SNP.alleles`

* facets

  > * Will appear as filters on the left panel in the search results
  > * choose `single` for references, `multi` for collections
  > * Note: you must index any references used as facets. \(see above at '''index.references'''\).

* index.boost.&lt;CLASS\_NAME&gt;

  > * weight this class heavier than other objects

* search.debug

  > * debug setting off, used only for testing

* index.optimize

  > * Boolean, defaults to false.
  > * If set to `true`, reorganises the index so chunks are placed together in storage, which might improve the search time. \(Similar to defragmentation of a hard disk\). Requires an empty space in the storage as large as the index, and takes additional time.

## Search Results

The fields displayed in the keyword search results are determined by the WebConfigModel file.

* If the fields are ClassKeys:

  > * links in blue
  > * shown at the top

* If the fields are not ClassKeys:

  > * NOT linked, black text
  > * shown below the links

## Search Index

You can rebuild the search index by running this command in your mine:

```bash
~/git/flymine $ ./gradlew postprocess -Pprocess=create-search-index
```

You would need to re-release your webapp.

To inspect the index directly: [http://localhost:8983/solr/](http://localhost:8983/solr/)

## Solr

See [Solr](../../system-requirements/software/solr.md) for details on how to install Solr.

## Solr Partial String Match Configuration

In its default configuration, Solr will not match partial search terms. For example a gene named _REVOLUTA_ will be returned in the search results for search term "REVOLUTA" but not for search term "REV." In order to have Solr return partial string matches, you must edit its configuration on the Solr server. To do this:

1. ADD the following to /var/solr/data/\[mine\]-search/conf/managed-schema. \(This example implements it for hits against Gene.primaryIdentifier and Gene.secondaryIdentifier.\)

```markup
<fieldType name="text_ngram" class="solr.TextField" positionIncrementGap="100">
  <analyzer type="index">
    <tokenizer class="solr.WhitespaceTokenizerFactory"/>
    <filter class="solr.NGramFilterFactory" minGramSize="1" maxGramSize="50"/>
    <filter class="solr.LowerCaseFilterFactory"/>
  </analyzer>
  <analyzer type="query">
    <tokenizer class="solr.WhitespaceTokenizerFactory"/>
    <filter class="solr.LowerCaseFilterFactory"/>
  </analyzer>
</fieldType>
<field name="gene_primaryidentifier" type="text_ngram" indexed="true" stored="true"/>
<field name="gene_secondaryidentifier" type="text_ngram" indexed="true" stored="true"/>
```

2. REMOVE the gene\_primaryidentifier and gene\_secondaryidentifier field definitions from the earlier part of the file. They look like this:

```markup
<field name="gene_primaryidentifier" type="analyzed_string" multiValued="true" indexed="true" required="false" stored="false"/>
<field name="gene_secondaryidentifier" type="analyzed_string" multiValued="true" indexed="true" required="false" stored="false"/>
```

OR, simply UPDATE the existing records, replacing the parameters with: type="text\_ngram" indexed="true" stored="true".

3. RESTART Solr to load the new config, e.g. under System V: :

```text
$ systemctl restart solr
```

4. REBUILD the search index using the Solr-related postprocesses:

```text
./gradlew postprocess -Pprocess=create-search-index
```

Your keyword search will now return results on partial matches for the attributes that you configured in Solr \(Gene.primaryIdentifier and Gene.secondaryIdentifier in this example\).

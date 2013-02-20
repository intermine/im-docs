PubMed
================================

Data from pubmed. entire file is downloaded, only taxon IDs set in project.xml will be loaded. if nothing configured, processes all entries. 

Types of data loaded
--------------------

genes, publications

How to download the data files
-------------------------------------

- ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/gene2pubmed.gz
- ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/gene_info.gz

Unzip both files, save `gene2pubmed` under a directory named `pubmed`, e.g. DATA_DIR/pubmed. It's suggested to save `gene_info` in a different directory, e.g. DATA_DIR/ncbi-gene, but you can always save both in pubmed directory, see how to config below. 

How to load the data into your mine
--------------------------------------

After code refactory and optimization, the current PubMed coverter will make use of id resolver to parse gene information (see how to setup :doc:`/database/data-sources/id-resolvers`), whereafter the `infoFile` property was removed from the config. 

If `gene2pubmed` is the only file in DATA_DIR/pubmed directory, you can remove `src.data.dir.includes` property, but do keep it if you place `gene2pubmed` and `gene_info` in pubmed dir at the same time.
  
project XML example

.. code-block:: xml

    <source name="pubmed-gene" type="pubmed-gene">
      <property name="src.data.dir" location="DATA_DIR/pubmed/" />
      <property name="pubmed.organisms" value="7227"/>
      <property name="src.data.dir.includes" value="gene2pubmed"/>
    </source>

project XML example for InterMine 1.1 and older

.. code-block:: xml

    <source name="pubmed-gene" type="pubmed-gene">
      <property name="src.data.dir" location="DATA/pubmed/" />
      <property name="pubmed.organisms" value="7227"/>
      <property name="src.data.dir.includes" value="gene2pubmed"/>
      <property name="infoFile" location="DATA_DIR/ncbi-gene/gene_info"/>
    </source>



.. index:: PubMed

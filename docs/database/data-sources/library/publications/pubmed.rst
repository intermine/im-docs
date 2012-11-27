PubMed
================================

Data from pubmed. entire file is downloaded, only taxon IDs set in project.xml will be loaded. if nothing configured, processes all entries. 

Types of data loaded
--------------------

genes, publications

How to download the data files
-------------------------------------

ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/gene_info.gz

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="pubmed-gene" type="pubmed-gene">
      <property name="src.data.dir" location="/data/pubmed/" />
      <property name="pubmed.organisms" value="7227"/>
      <property name="src.data.dir.includes" value="gene2pubmed"/>
    </source>


.. index:: PubMed

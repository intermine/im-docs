SNP
================================

Load SNP data from a downloaded mysql database

Types of data loaded
--------------------

SNPs, chromosomes

How to download the data 
---------------------------

Genetic and protein interaction data from BioGRID  

How to load the data into your mine
--------------------------------------

.. code-block:: xml

    <source name="ensembl-snp-db-human" type="ensembl-snp-db" dump="true">
      <property name="source.db.name" value="ensembl.9606.variation" />
      <property name="organism" value="9606" />
      <property name="sources" value="dbSNP" />
    </source>

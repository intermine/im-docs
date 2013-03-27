Ensembl SNP
================================

Load SNP data from a downloaded mysql database

Types of data loaded
--------------------

SNPs, chromosomes

How to download the data 
---------------------------

First you will need the data from Ensembl, which are available via MySQL databases.  Download the Ensembl MySQL database and create the database locally:

  ftp://ftp.ensembl.org/pub/current_mysql 


Update <MINE_NAME>.properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the location of the downloaded Ensembl MySQL databases to your mine properties file, for example:

.. code-block:: properties

  # variation database
  db.ensembl.9606.variation.datasource.serverName=SERVER_NAME
  db.ensembl.9606.variation.datasource.databaseName=homo_sapiens_variation_59_37d
  db.ensembl.9606.variation.datasource.species=homo_sapiens
  db.ensembl.9606.variation.datasource.user=DB_USER
  db.ensembl.9606.variation.datasource.password=DB_PASSWORD

These properties are used by the Perl script. 

How to load the data into your mine
--------------------------------------

.. code-block:: xml

    <source name="ensembl-snp-db-human" type="ensembl-snp-db" dump="true">
      <property name="source.db.name" value="ensembl.9606.variation" />
      <property name="organism" value="9606" />
      <property name="sources" value="Ensembl" />
    </source>

.. index:: SNPs

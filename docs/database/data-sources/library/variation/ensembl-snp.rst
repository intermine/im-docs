Ensembl SNP
================================

Load SNP data from a downloaded mysql database

Types of data loaded
--------------------

SNPs

How to download the data 
---------------------------

First you will need the data from Ensembl, which are available via MySQL databases.  Download the Ensembl MySQL database and create the database locally:

  ftp://ftp.ensembl.org/pub/current_mysql

for example:
download homo_sapiens_variation_70_37 to a local directory, and load it to your MySQL database

.. code-block:: bash

  # create a new db in MySQL
  $ mysql -u DB_USER -p
  mysql> create database homo_sapiens_variation_70;

  # load data into db
  $ mysql -u DB_USER -p homo_sapiens_core_70 < homo_sapiens_variation_70_37.sql
  $ mysqlimport -u DB_USER -p homo_sapiens_variation_70 -L *.txt -v

  # precompute tables
  $ mysql -u DB_USER -p
  mysql> use homo_sapiens_variation_70;

  mysql> CREATE TABLE mM_snp_tmp_no_order_chr_all SELECT vf.variation_feature_id, vf.variation_name, vf.variation_id, vf.allele_string, sr.name AS seq_region_name, vf.map_weight, vf.seq_region_start, vf.seq_region_end, vf.seq_region_strand, s.name AS source_name, vf.validation_status, vf.consequence_types AS variation_feature_consequence_types, tv.cdna_start,tv.consequence_types AS transcript_variation_consequence_types,tv.pep_allele_string,tv.feature_stable_id, tv.sift_prediction, tv.sift_score, tv.polyphen_prediction, tv.polyphen_score FROM seq_region sr, source s, variation_feature vf  LEFT JOIN (transcript_variation tv) ON (vf.variation_feature_id = tv.variation_feature_id AND tv.consequence_types NOT IN ('5KB_downstream_variant', '5KB_upstream_variant','500B_downstream_variant','2KB_upstream_variant')) WHERE vf.seq_region_id = sr.seq_region_id AND vf.source_id = s.source_id;

  mysql> CREATE TABLE mM_snp_tmp_ordered_chr_all select * FROM mM_snp_tmp_no_order_chr_all ORDER BY seq_region_name, variation_id;

How to load the data into your mine
---------------------------

Update <MINE_NAME>.properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the location of the downloaded Ensembl MySQL databases to your mine properties file, for example:

.. code-block:: properties

  # variation database
  db.ensembl.9606.variation.datasource.serverName=SERVER_NAME
  db.ensembl.9606.variation.datasource.databaseName=homo_sapiens_variation_70
  db.ensembl.9606.variation.datasource.species=homo_sapiens
  db.ensembl.9606.variation.datasource.user=DB_USER
  db.ensembl.9606.variation.datasource.password=DB_PASSWORD

These properties are used by the Perl script. 

Add Ensembl snp to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code-block:: xml

    <source name="ensembl-snp-db" type="ensembl-snp-db" dump="true">
      <property name="source.db.name" value="ensembl.9606.variation" />
      <property name="organism" value="9606" />
      <property name="sources" value="Ensembl" />
    </source>


Run InterMine build
~~~~~~~~~~~~~~~~~~~~~~~~~~

Run a build.  The entry in `project.xml` will instruct the build process to load the XML files you created in the previous step into the database.  For example, run this command in `MINE_NAME/integrate`:
      
.. code-block:: bash

  $ ant -v -Dsource=ensembl-snp-db 

.. index:: SNPs

Ensembl SNP
================================

Load SNP data from a downloaded data file.

Types of data loaded
--------------------

SNPs

How to download the data 
---------------------------

First you will need the variation data from Ensembl, which are available via MySQL databases.  Download the Ensembl file from their FTP site:

  ftp://ftp.ensembl.org
  
Example:

  ftp://ftp.ensembl.org/pub/release-79/variation/vcf/homo_sapiens/Homo_sapiens_incl_consequences.vcf.gz

Download and unzip the file. 

How to load the data into your mine
------------------------------------------------------

Add Ensembl snp to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code-block:: xml

  <source name="ensembl-snp" type="ensembl-snp">
    <property name="src.data.dir" location="/data/variation/ensembl/current" />
    <property name="ensembl-snp.includes" value="Homo_sapiens_incl_consequences.gvf" />
  </source>

Run InterMine build
~~~~~~~~~~~~~~~~~~~~~~~~~~

Run a build.  The entry in `project.xml` will instruct the build process to load the GVF file you downloaded in the previous step into the database.  For example, run this command in `MINE_NAME/integrate`:
      
.. code-block:: bash

  $ ant -v -Dsource=ensembl-snp

.. index:: SNPs, variation, GVF

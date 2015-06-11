VCF files
================================

Load SNP data from a VCF file

Types of data loaded
--------------------

SNPs

How to download the data 
---------------------------

First you will need a *.vcf file, e.g. 

  ftp://ftp.ensembl.org/pub/release-79/variation/vcf/homo_sapiens/

How to load the data into your mine
------------------------------------------------------

Add vcf to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code-block:: xml

    <source name="my-data-source" type="vcf">
      <property name="src.data.dir" location="/data/variation/current" />
      <property name="vcf.includes" value="*.vcf" />
      <property name="vcf.taxonId" value="9606" />
      <property name="vcf.dataSetTitle" value="Ensembl SNP data set" />
      <property name="vcf.dataSourceName" value="Ensembl" />
    </source>


Run InterMine build
~~~~~~~~~~~~~~~~~~~~~~~~~~

Run a build.  The entry in `project.xml` will instruct the build process to load the XML files you created in the previous step into the database.  For example, run this command in `MINE_NAME/integrate`:
      
.. code-block:: bash

  $ ant -v -Dsource=my-data-source

.. index:: SNPs, vcf, .vcf, variant file format, insertions, deletions, SNVs

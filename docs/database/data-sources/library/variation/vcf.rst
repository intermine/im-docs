VCF files
================================

Load SNP data from a VCF file

Types of data loaded
--------------------

SNPs

How to download the data 
---------------------------

First you will need a VCF file, here is an example:

  ftp://ftp.ensembl.org/pub/release-79/variation/vcf/homo_sapiens/

How to load the data into your mine
------------------------------------------------------

Add vcf to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. code-block:: xml

    <source name="my-data-source" type="vcf">
      <property name="src.data.dir" location="/data/variation/current" />
      <property name="vcf.includes" value="*.vcf" />
      <property name="vcf.vcfTaxonId" value="9606" />
      <property name="vcf.vcfDataSetTitle" value="Ensembl SNP data set" />
      <property name="vcf.vcfDataSourceName" value="Ensembl" />
    </source>


.. index:: SNPs, vcf, .vcf, variant file format, insertions, deletions, SNVs

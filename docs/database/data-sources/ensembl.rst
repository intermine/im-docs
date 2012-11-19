Ensembl
========

This page describes how to load Ensembl data into your InterMine-bio database.

Core
-----

Get the Ensembl database (Optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

First you will need the data from Ensembl, which are available via MySQL databases.  Ensembl has a publicly available [http://www.ensembl.org/info/data/mysql.html MySQL database] you can use.  If you think you are going to be retrieving a lot of data from Ensembl or reliability is very important, it will likely be in your best interest to have a local database.  

The following are instructions on how to load a local copy of an Ensembl database.  You must have MySQL installed and correctly configured.

Download the Ensembl MySQL database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    * ftp://ftp.ensembl.org/pub/current_mysql/
    * Or you can use our Perl script
      * We use [source:trunk/bio/scripts/get_ensembl_mysql get_ensembl_mysql] to download and unzip data
      * To use this script, you need to install the appropriate Perl modules.  See InterMinePerl.
      * The script requires three parameters - download_directory organism_name which_database eg:
        {{{
# in bio/scripts
./get_ensembl_mysql /MY_DATA_DIR/ensembl homo_sapiens core
}}}


Create the database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {{{
# in mysql
create database homo_sapiens_core_59_37d;
}}}

Load the database structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    {{{
mysql -h HOST -u USERNAME -p homo_sapiens_core_59_37d < /MY_DATA_DIR/ensembl/homo_sapiens/homo_sapiens_core_59_37d/homo_sapiens_core_59_37d.sql
}}}

Load the data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run this command in the same directory as the data you just downloaded:
    {{{
mysqlimport -h HOST -u USERNAME -p homo_sapiens_core_59_37d -L *.txt
}}}

See also: [http://dev.mysql.com/doc/refman/5.0/en/load-data.html MySQL]

Install Perl modules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine's Ensembl converter uses Ensembl's Perl API.  Follow Ensembl's instructions for how to install the necessary Perl modules:

 * http://www.ensembl.org/info/docs/api/api_installation.html

You will also need to install InterMine's Perl modules.  Follow these instructions:

 * InterMinePerl

Update <MINE_NAME>.properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You'll need one entry for every organism.  The perl script run in Step 4.1 uses these entries to ascertain the location of the databases.  For example:
{{{
# core database
db.ensembl.9606.core.datasource.serverName=SERVER_NAME
db.ensembl.9606.core.datasource.databaseName=homo_sapiens_core_59_37d
db.ensembl.9606.core.datasource.species=homo_sapiens
db.ensembl.9606.core.datasource.user=DB_USER
db.ensembl.9606.core.datasource.password=DB_PASSWORD

# variation database
db.ensembl.9606.variation.datasource.serverName=SERVER_NAME
db.ensembl.9606.variation.datasource.databaseName=homo_sapiens_variation_59_37d
db.ensembl.9606.variation.datasource.species=homo_sapiens
db.ensembl.9606.variation.datasource.user=DB_USER
db.ensembl.9606.variation.datasource.password=DB_PASSWORD
}}}

Add Ensembl to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is located in the [source:trunk/bio/tutorial/malariamine/project.xml project.xml] file, and it should look something like:
{{{    
    <source name="ensembl" type="ensembl"> 
     <property name="src.data.dir" location="/MY_DATA_DIR/ensembl"/> 
    </source> 
}}}

When you run a database build, every XML file in this directory will be loaded into the database.  Currently FlyMine loads Ensembl data for ''Anopheles gambiae''.  See FlyMine's [source:trunk/flymine/project.xml project.xml]

Generate XML file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    * Run this command in {{{/bio/scripts}}}
      {{{
./ensemblAPI.pl MINE_NAME TAXONID /MY_DATA_DIR/ensembl
}}}
      for example:
      {{{
./ensemblAPI.pl flymine 7165 /data/ensembl/current
}}}

Load XML file into database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    * [wiki:RunningABuild Run a build].  The entry in the project.xml will instruct the build process to load the XML files you created in Step 1 into the database.  For example, run this command in {{{MINE_NAME/integrate}}}:
      {{{
ant -v -Dsource=ensembl 
}}}


Compara
-----------------

 1. Download data from !BioMart
    1. [http://www.biomart.org/biomart/martview]
    1. select database for primary organism 
       * eg. `Ensembl Genes`
    1. select dataset for primary organism 
       * eg. `Drosophila melanogaster features (BDGP5.25)`
    1. select FILTERS
       1. click on "FILTERS" on the left panel in !BioMart
          1. this will populate the main panel with filter options
       1. select `MULTI SPECIES COMPARISONS`
       1. check the checkbox next to `Homolog filters`
       1. select the organism of interest in the dropdown
          * eg. `Orthologous Caenorhabditis elegans Genes`
          * make sure that next to the dropdown, `Only` is checked
    1. select ATTRIBUTES
       1. check the `Homologs` radio button at the top of the center panel
       1. uncheck the `Ensembl Transcript ID` option, `Ensembl Gene ID` is now the only output
       1. click on `ORTHOLOGS (Max select 3 orthologs):` to open that section of the form
       1. select on the Gene ID for the organism of interest
          * eg. Drosophila Ensembl Gene ID 
    1. Run query
       1. select the `[Results]` button at the top of the page
       1. create `TSV` file
       1. check box next to `Unique results only`
    1. when prompted, save file as `TAXONID1_TAXONID2`
 1. Add entry to project XML file:
    {{{
    <source name="ensembl-compara" type="ensembl-compara">
      <property name="src.data.dir" location="/DATA/ensembl/compara"/>
      <property name="ensemblcompara.organisms" value="7227"/>
      <property name="ensemblcompara.homologues" value="6239"/>
    </source>
}}}
 1. Run build

Data file 
~~~~~~~~~~~~~~

Tab-delimited files should be named <TAXON ID>_<TAXON ID>, eg. 9606_10090 for a file with human genes and mouse orthologues.

===============  ==================
Gene ID          Homologue ID
===============  ==================
ENSG00000253023  ENSMUSG00000088328
ENSG00000238364  ENSMUSG00000088728
===============  ==================

Download script
~~~~~~~~~~~~~~~~~

When you have created your query, you can export the Perl script or XML so you can run the query automatically next time, eg:
{{{
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Query>
<Query  virtualSchemaName = "default" formatter = "TSV" header = "0" uniqueRows = "0" count = "" datasetConfigVersion = "0.6" >
      
  <Dataset name = "hsapiens_gene_ensembl" interface = "default" >
    <Filter name = "with_dmelanogaster_homolog" excluded = "0"/>
    <Attribute name = "ensembl_gene_id" />
    <Attribute name = "drosophila_ensembl_gene" />
  </Dataset>
</Query>
}}}

Ensembl
========

This page describes how to load Ensembl data into your InterMine-bio database.


Generate Items XML file
--------------------


Ensembl Data
~~~~~~~~~~~~~


First you will need the data from Ensembl, which are available via MySQL databases.  Download the Ensembl MySQL database and create the database locally:

  ftp://ftp.ensembl.org/pub/current_mysql 


Update <MINE_NAME>.properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the location of the downloaded Ensembl MySQL databases to your mine properties file, for example:

.. code-block:: properties

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

These properties are used by the Perl script.

Install Perl modules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ensembl
^^^^^^^^^^

InterMine's Ensembl converter uses Ensembl's Perl API.  Follow Ensembl's instructions for how to install the necessary Perl modules:

  http://www.ensembl.org/info/docs/api/api_installation.html

InterMine
^^^^^^^^^^

You will also need to install InterMine's Perl modules, see :doc:`/system-requirements/software/perl`


Run Script to Generate Items XML
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run this command in `/bio/scripts`

.. code-block:: bash

  $ ./ensembl.pl MINE_NAME TAXONID DATA_DESTINATION

for example:
      
.. code-block:: bash

  $ ./ensembl.pl flymine 7165 /data/ensembl/current

Load XML file into InterMind database
--------------------------------------------------


Add Ensembl to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is located in the project.xml file, and it should look something like:

.. code-block:: xml

    <source name="ensembl" type="ensembl"> 
     <property name="src.data.dir" location="/MY_DATA_DIR/ensembl"/> 
    </source> 

When you run a database build, every XML file in the directory specificed will be processed and loaded into the database. 


Run InterMine build
~~~~~~~~~~~~~~~~~~~~~~~~~~

Run a build.  The entry in `project.xml` will instruct the build process to load the XML files you created in the previous step into the database.  For example, run this command in `MINE_NAME/integrate`:
      
.. code-block:: bash

  $ ant -v -Dsource=ensembl 

.. index:: Ensembl

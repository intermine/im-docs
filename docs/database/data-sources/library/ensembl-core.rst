Ensembl Core
=============

This page describes how to load Ensembl core data into your InterMine-bio database.


Generate Items XML file
----------------------------------------


Ensembl Data
~~~~~~~~~~~~~


First you will need the data from Ensembl, which are available via MySQL databases.  Download the Ensembl MySQL database and create the database locally:

  ftp://ftp.ensembl.org/pub/current_mysql 

for example:
download homo_sapiens_core_70_37 to a local directory, unzip all gz files, and load it to your MySQL database

.. code-block:: bash

  # create a new db in MySQL
  $ mysql -u DB_USER -p
  mysql> create database homo_sapiens_core_70;

  # load data into db
  $ mysql -u DB_USER -p homo_sapiens_core_70 < homo_sapiens_core_70_37.sql
  $ mysqlimport -u DB_USER -p homo_sapiens_core_70 -L *.txt -v


Update <MINE_NAME>.properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the location of the downloaded Ensembl MySQL databases to your mine properties file, for example:

.. code-block:: properties

  # core database
  db.ensembl.9606.core.datasource.serverName=SERVER_NAME
  # port: uncomment the next line if use different prot other than 3306
  # db.ensembl.9606.core.datasource.port=PORT_NUMBER
  db.ensembl.9606.core.datasource.databaseName=homo_sapiens_core_70
  db.ensembl.9606.core.datasource.species=homo_sapiens
  db.ensembl.9606.core.datasource.user=DB_USER
  db.ensembl.9606.core.datasource.password=DB_PASSWORD

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

  $ ./ensembl.pl [Realse Version] MINE_NAME TAXONID DATA_DESTINATION

for example:
      
.. code-block:: bash

  $ ./ensembl.pl flymine 7165 /data/ensembl/current

Load XML file into InterMind database
--------------------------------------------------


Add Ensembl core to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is located in the project.xml file, and it should look something like:

.. code-block:: xml

    <source name="ensembl" type="ensembl-core"> 
     <property name="src.data.dir" location="/MY_DATA_DIR/ensembl"/> 
    </source> 

When you run a database build, every XML file in the directory specificed will be processed and loaded into the database. 


Run InterMine build
~~~~~~~~~~~~~~~~~~~~~~~~~~

Run a build.  The entry in `project.xml` will instruct the build process to load the XML files you created in the previous step into the database.  For example, run this command in `MINE_NAME/integrate`:
      
.. code-block:: bash

  $ ant -v -Dsource=ensembl 

.. index:: Ensembl

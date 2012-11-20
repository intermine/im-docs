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

ftp://ftp.ensembl.org/pub/current_mysql Or you can use our Perl script

* We use `get_ensembl_mysql` to download and unzip data
* To use this script, you need to install the appropriate Perl modules.  
* The script requires three parameters - `download_directory` `organism_name` `which_database` eg:

.. code-block:: bash

  # in bio/scripts
  $ ./get_ensembl_mysql /MY_DATA_DIR/ensembl homo_sapiens core

Create the database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

  # in mysql
  $ create database homo_sapiens_core_59_37d;

Load the database structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

  $ mysql -h HOST -u USERNAME -p homo_sapiens_core_59_37d < /MY_DATA_DIR/ensembl/homo_sapiens/homo_sapiens_core_59_37d/homo_sapiens_core_59_37d.sql

Load the data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run this command in the same directory as the data you just downloaded:

.. code-block:: bash

  $ mysqlimport -h HOST -u USERNAME -p homo_sapiens_core_59_37d -L *.txt


Install Perl modules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine's Ensembl converter uses Ensembl's Perl API.  Follow Ensembl's instructions for how to install the necessary Perl modules:

http://www.ensembl.org/info/docs/api/api_installation.html

You will also need to install InterMine's Perl modules.  


Update <MINE_NAME>.properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You'll need one entry for every organism.  The perl script run in Step 4.1 uses these entries to ascertain the location of the databases.  For example:

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


Add Ensembl to the list of datasources to be integrated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is located in the [source:trunk/bio/tutorial/malariamine/project.xml project.xml] file, and it should look something like:

.. code-block:: xml

    <source name="ensembl" type="ensembl"> 
     <property name="src.data.dir" location="/MY_DATA_DIR/ensembl"/> 
    </source> 

When you run a database build, every XML file in this directory will be loaded into the database.  Currently FlyMine loads Ensembl data for ''Anopheles gambiae''.  See FlyMine's [source:trunk/flymine/project.xml project.xml]

Generate XML file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run this command in `/bio/scripts`

.. code-block:: bash

  ./ensemblAPI.pl MINE_NAME TAXONID /MY_DATA_DIR/ensembl

for example:
      
.. code-block:: bash

  ./ensemblAPI.pl flymine 7165 /data/ensembl/current


Load XML file into database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Run a build.  The entry in `project.xml` will instruct the build process to load the XML files you created in Step 1 into the database.  For example, run this command in `MINE_NAME/integrate`:
      
.. code-block:: bash

  ant -v -Dsource=ensembl 


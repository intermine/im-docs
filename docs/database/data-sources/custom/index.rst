Writing Your Own Data Source
================================

The aim of this tutorial is to create a new source, specifically to import data from an InterMine data format XML file.  This is achieved in two parts; the first creates the files to describe the new source while the second configures an individual mine to use these files.  The XML file containing the data could be created in any language. InterMine includes Java and Perl APIs to assist.

Thanks to Anthony Smith from the MRC Dunn Human Nutrition Unit for providing this tutorial.

Create source files
-----------------------

Run make_source script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This script creates the basic skeleton for a source.   It should be run in the top level directory of an InterMine checkout, like this:

.. code-block:: bash

  $ ./bio/scripts/make_source <source-name> <source-type>


Possible source types
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run `make_source` with no arguments to get a full list of source types.

custom-file
""""""""""""""

This a source that reads from a file in a custom format.  A custom FileConverter will be needed.  The `make_source` script will
create a skeleton `FileConverter` in `bio/sources/<source-name>/main/src/org/intermine/bio/dataconversion`.  Edit this code to process the particular file you need to load, using the :doc:`/database/data-sources/apis/java-items-api` Java Items API to create and store items to the database.

intermine-items-xml-file
""""""""""""""""""""""""""""

This type of source can read a in InterMine XML format and store the results in a mine.  It should be configured like this in the `project.xml` file for the mine:

.. code-block:: xml

    <source name="my-new-source-name" type="">
      <property name="src.data.file" location="/some/directory/objects_in_intermine_format.xml"/>
    </source>

The InterMine Perl Items API can be used to generate these XML files.  Or you can create XML from any language.  This source type doesn't generate any stub Java code.

intermine-items-large-xml-file
""""""""""""""""""""""""""""""""""""""""""

This source works as above but writes the XML to an intermediate Items database to avoid reading the whole file into memory at once.  This is the best choice for large XML files, where large is several hundred megabytes (although this depends on the amount of RAM specified in your `ANT_OPTS` environment variable).  

db
""""""""""""""""""""""""""""

This source reads directly from a relational database, it will generate a skeleton `DBConverter` in `bio/sources/<source-name>/main/src/org/intermine/bio/dataconversion`.  To connect to the database you need to add properties in xxxmine.properties with the prefix `db.sourcename`.  This is tested for PostgreSQL and MySQL.

Common properties:

.. code-block:: xml

  db.sourcename.datasource.dataSourceName=db.sourcename
  db.sourcename.datasource.maxConnections=10
  db.sourcename.datasource.serverName=SERVER_NAME
  db.sourcename.datasource.databaseName=DB_NAME
  db.sourcename.datasource.user=USER_NAME
  db.sourcename.datasource.password=USER_PASSWORD

Add these for PostgreSQL:

.. code-block:: xml

  db.sourcename.datasource.class=org.postgresql.jdbc3.Jdbc3PoolingDataSource
  db.sourcename.driver=org.postgresql.Driver
  db.sourcename.platform=PostgreSQL

Add these for MySQL:

.. code-block:: xml

  db.sourcename.datasource.class=com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource
  db.sourcename.driver=com.mysql.jdbc.Driver
  db.sourcename.platform=MySQL

.. toctree::
    :maxdepth: 1

    oracle

It is good practice to put the properties that won't change in `MINE_NAME/default.intermine.integrate.properties` and those that may change (`serverName`, `databaseName`, `user`, `password`) in `~/.intermine/MINE_NAME.properties`.

The db value has to match the '''source.db.name''' in your project XML entry, for example:

.. code-block:: xml

    # project XML
    <source name="chado-db-flybase-dmel" type="chado-db">
      <property name="source.db.name" value="flybase"/>
      ...
    </source>

.. code-block:: properties

  # flymine.properties

  db.flybase.datasource.class=org.postgresql.ds.PGPoolingDataSource
  db.flybase.datasource.dataSourceName=db.flybase
  db.flybase.datasource.serverName=LOCALHOST
  db.flybase.datasource.databaseName=FB2011_01
  db.flybase.datasource.user=USERNAME
  db.flybase.datasource.password=SECRET
  db.flybase.datasource.maxConnections=10
  db.flybase.driver=org.postgresql.Driver
  db.flybase.platform=PostgreSQL

gff
""""""""""""""""""""""""""""

Create a gff source to load genome annotation in GFF3 format.  This creates an empty `GFF3RecordHandler` in `bio/sources/<source-name>/main/src/org/intermine/bio/dataconversion`.  The source will work without any changes but you can edit the `GFF3RecordHandler` to read specific attributes from the last column of the GFF3 file.  See the InterMine tutorial for more information on integrating GFF3.

obo
""""""""""""""""""""""""""""

Create a obo source to load ontology in BO format.

Additions file 
~~~~~~~~~~~~~~~~~~~~~~~~~~

Update the file in the source folder called `new-source_additions.xml`.  This file details any extensions needed to the data model to store data from this source, everything else is automatically generated from the model description so this is all we need to do to add to the model.  The file is in the same format as a complete Model description.

To add to an existing class the contents should be similar to the example code below. The class name is a class already in the model, the attribute name is the name of the new field to be added and the type describes the type of data to be stored. In the example the `Protein` class will be extended to include a new attribute called `extraData` which will hold data as a string.   

.. code-block:: xml

  <?xml version="1.0"?>
  <classes>
    <class name="Protein>" is-interface="true">
      <attribute name="extraData" type="java.lang.String"/>   
    </class>
  </classes>

To create a new class the `new-source_additions.xml` file should include contents similar to the example below:

.. code-block:: xml

  <?xml version="1.0"?>
  <classes>
    <class name="NewFeature" extends="SequenceFeature" is-interface="true">
      <attribute name="identifier" type="java.lang.String"/>  
      <attribute name="confidence" type="java.lang.Double"/>
    </class>
  </classes>

The extends clause is optional and is used to inherit (include all the attributes of) an existing class, in this case we extend `SequenceFeature`, an InterMine class that represents any genome feature.  `is-interface` should always be set to true.  The attribute lines as before define the names and types of data to be stored.  A new class will be created with the name `NewFeature` that extends `SequenceFeature`. 

To cross reference this with another class, similar XML should be used as the example below:

.. code-block:: xml

  <class name="NewFeature" extends="SequenceFeature" is-interface="true">
    <reference name="protein" referenced-type="Protein" reverse-reference="features"/>
  </class>

In the example above the we create a link from NewFeature to the Protein class via the reference named protein. To complete the link a reverse reference may be added to Protein to point back at the NewFeature, this is optional - the reference could be one-way.  Here we define a collection called features, this means that for every NewFeature that references a Protein, that protein will include it in its features collection.  Note that as this is a collection a Protein can link to multiple NewFeatures but NewFeature.protein is a reference so each can only link to one Protein.  

The reverse entry needs to be added to Protein (still in the same file):

.. code-block:: xml

  <class name="Protein" is-interface="true">
    <collection name="features"  referenced-type="NewFeature" reverse-reference="protein"/>
  </class>

The final additions XML should look like:

.. code-block:: xml

  <?xml version="1.0"?>
  <classes>
    <class name="Protein>" is-interface="true">
      <attribute name="extraData" type="java.lang.String"/> 
      <collection name="features"  referenced-type="NewFeature" reverse-reference="protein"/>  
    </class>
    <class name="NewFeature" extends="SequenceFeature" is-interface="true">
      <attribute name="identifier" type="java.lang.String"/>  
      <attribute name="confidence" type="java.lang.Double"/>
      <reference name="protein" referenced-type="Protein" reverse-reference="features"/>
    </class>
  </classes>

.. note::

  If all the data you wish to load is already modelled in InterMine then you don't need an additions file.


Keys
~~~~~~~~~~~~~~~~~~~~~~~~~~

Within the `resources` directory is a file called `new-source_keys.properties`.  Here we can define primary keys that will be used to integrate data from this source with any exiting objects in the database.  We want to integrate proteins by their (UniProt) primaryAccession attribute so we define that this source should use the key:

.. code-block:: properties

  Protein=key_primaryacc

Note that we don't expect any other data sources to provide interesting features so we don't need to integrate them - no key is defined.  The possible keys are defined in `dbmodel/resources/genomic_keyDefs.properties`, new keys can be added if necessary.  

Including your source in a Mine
----------------------------------------------

Project XML
~~~~~~~~~~~~~~~~~~~~~~~~~~

In the `project.xml` file, in the root of your mine directory (e.g. /malariamine), the following entries should be added and altered accordingly:

.. code-block:: xml

  <source name="new-source-name" type="new-source">
    <property name="src.data.file" location="my_data_dir/example.xml"/>
  </source>

If you have more that one file you can set this up to point at a '''directory''':

.. code-block:: xml

  <source name="new-source-name" type="new-source">
    <property name="src.data.dir" location="my_data_dir/source_files/"/>
  </source>

The first line defines the name you wish to give to the of the source and the type - the name of the directory in 'bio/sources'.  The second line defines the location and name of the data file.

The data file should have the same format as the XML below:

.. code-block:: xml

  <items>
     <item id="0_1" class="" implements="http://www.intermine.org/model/bio#NewFeature>
        <attribute name="identifier" value="feature2" />
        <attribute name="confidence" value="0.8" />
        <reference name="protein" ref_id="0_3" /> 
    </item>
    <item id="0_2" class="" implements="http://www.intermine.org/model/bio#NewFeature>
        <attribute name="identifier" value="feature2" />
        <attribute name="confidence" value="0.37" />
        <reference name="protein" ref_id="0_3" /> 
    </item>
    <item id="0_3" class="" implements="http://www.intermine.org/model/bio#Protein">
        <attribute name="primaryAccession" value="Q8I5D2" />
        <attribute name="extraData" value="proteinInfo"/>
        <collection name="features">
         <reference ref_id="0_1" />
         <reference ref_id="0_2" />
        </collection>
    </item>
  </items>

An example of a perl script to create InterMine data XML can be found at: `bio/scripts/intermine_items_example.pl`

If you are using data from a database:

.. code-block:: xml

    <source name="new-source-name" type="new-source">
      <property name="source.db.name" value="db.NAME"/>
      ...
    </source>


The value of `source.db.name` must match the value set in the MINE_NAME.properties file.

Run build-db
~~~~~~~~~~~~~~~~~~~~~~~~~~

Create the database as usual. The source should now be included when building the mine.

.. note::

  Unless the 'clean' is run (which deletes the build directory) in `MINE_NAME/dbmodel` any changes will append to the current model structure and any unwanted classes/attributes will remain.

.. index:: writing a custom data source, custom data source

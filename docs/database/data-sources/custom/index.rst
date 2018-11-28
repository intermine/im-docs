Writing your own data source
================================

The aim of this tutorial is to create a new data source to parse your data file and load the data into your InterMine database.

There are three parts to creating a new source:

1. Create a directory for your data sources, e.g. `flymine-bio-sources`  
2. Write a data parser (not required for OBO or GFF sources)
3. Configure the mine to use this source (make an entry in your `project.xml`)

To get started, create a directory to put all of your data sources in. You only need to that once. Then follow the instructions below and run the script to create your data source. If necessary, use the APIs provided to write code to parse your data file and load into the InterMine database. Finally, add your new data source to your project XML file. 

1. Create bio-sources directory
----------------------------------

You only need to do this once, but you need a directory to hold all of your mine's data sources. 

* Place next to your mine, e.g. ~/git/flymine and ~/git/flymine-bio-sources
* Keep in source control. Please. We use Git.

2. Run make_source script
--------------------------

Checkout the intermine scripts repository that contains the `make_source` script.

.. code-block:: bash
  
  # check out the repository that has the scripts we need
  ~/git $ git clone https://github.com/intermine/intermine-scripts.git

The `make_source` script creates the basic skeleton for a source. It should be run in your mine's data sources directory, like this:

.. code-block:: bash

  # run the script in the directory you created for your mine data sources
  ~/git/flymine-bio-sources $ ~/git/intermine-scripts/make_source $SOURCE_NAME $SOURCE_TYPE

SOURCE_NAME
  The name of your source, e.g. uniprot-fasta or biogrid. The script expects a lowercase word without any special characters. Dashes are fine.

SOURCE_TYPE
  The type of your source. One of six options, see below.

Which source type do I need? It depends! 

=============================== ============================================================================
Source type                     When to use?
=============================== ============================================================================
db                              To load data directly from another database
gff                             for GFF files
obo                             for Ontology files
custom-file                     If you have a data file and want to parse using Java
intermine-items-xml-file        If you have a data file and want to parse using a language other than Java
intermine-items-large-xml-file  Same as above but the file is very very large
=============================== ============================================================================

The script also creates a gradle project if one does not exist.

3. Add your source to your project XML file
----------------------------------------------------

You need to add your data source to the project XML file for it to be run during the database build process. Above are example project XML snippets to show you how to add each source type. Note that different parser types have different expected parameters.

See :doc:`/database/database-building/project-xml/` for details.

Versions
~~~~~~~~~~~

The "version" provided for each source has to match the version of the JAR you create. The version is set in your `bio/sources/build.gradle` file. If you do not provide a version, the default InterMine version will be used -- which won't likely match your local version.

See :doc:`/database/data-sources/versions` for details.


Possible source types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

  Run `make_source` with no arguments to get a full list of source types.

custom-file
^^^^^^^^^^^^^^^^^

This a source that reads from a file in a custom format. A custom Java FileConverter will be needed. The `make_source` script will create a skeleton `FileConverter` in `<source-name>/src/main/java/org/intermine/bio/dataconversion`. Edit this code to process the particular file you need to load, using the :doc:`/database/data-sources/apis/java-items-api` to create and store items to the database.

The `project.xml` configuration is as below:

.. code-block:: xml

    <!-- add to your mine's project XML file -->
    <source name="my-new-source-name" type="my-new-source-name" version="1.2.3">
      <property name="src.data.dir" location="/some/data/directory"/>
      <!-- optionally specify includes or excludes -->
      <property name="src.data.dir.includes" value="*.xml"/>
    </source>

See :doc:`/database/data-sources/versions` for details on how to version your data parser.

Additional Properties in Project XML
""""""""""""""""""""""""""""""""""""""""""

Any properties you define in a source entry in your mine's project.xml will be available in that source's converter or post-processing class, providing that there is a setter with an appropriate name.

This applies to any class that inherits from:

* org.intermine.dataconversion.DataConverter
* org.intermine.dataconversion.DBConverter
* org.intermine.dataconversion.DirectoryConverter
* org.intermine.dataconversion.FileConverter
* org.intermine.postprocess.PostProcessor

For instance, if you have this entry:

.. code-block:: xml

    <!-- in project XML -->
    <source name="my-new-source-name" type="my-new-source-name" version="2.3.4">
      <property name="bar.info" value="baz"/>
      <property name="bazMoreInfo" value="hello-world"/>
    </source>

Then those values will be available (provided you create the setters correctly):

.. code-block:: java

  // In a class that extends org.intermine.postprocess.PostProcessor, for example
  public void setBarInfo(String info) {
    // given the example project XML values above, "info" has the value of "baz"
    this.info = info;
  }
  public void setBazMoreInfo(String moreInfo) {
    // given the example project XML values above, "moreInfo" has the value of "hello-world"
    this.moreInfo = moreInfo;
  }

intermine-items-xml-file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This type of source can read a file in InterMine Items XML format and store the data in a mine.  The `project.xml` configuration is as below:

.. code-block:: xml

    # add your source to your project XML file
    <source name="my-new-source-name" type="my-new-source-name" version="1.2.3">
      <property name="src.data.file" location="/some/directory/objects_in_intermine_format.xml"/>
    </source>

See `this page <../apis/index.html>`_ for more information on the Items XML format and links to APIs that can generate it. This source type doesn't generate any stub Java code.

intermine-items-large-xml-file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This source works as above but writes the XML to an intermediate items database to avoid reading the whole file into memory at once. This is the best choice for large XML files where large is several hundred megabytes (although this depends on the amount of RAM specified in your `GRADLE_OPTS` environment variable).  

db
^^^^^^^^^^^^^^^^^

This source reads directly from a relational database, it will generate a skeleton `DBConverter` in `<source-name>/src/main/java/org/intermine/bio/dataconversion`. To connect to the database you need to add properties in xxxmine.properties with the prefix `db.sourcename`. This is tested for PostgreSQL and MySQL.

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

  db.sourcename.datasource.class=com.zaxxer.hikari.HikariDataSource
  db.sourcename.datasource.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
  db.sourcename.driver=org.postgresql.Driver
  db.sourcename.platform=PostgreSQL

Add these for MySQL:

.. code-block:: xml

  db.sourcename.datasource.class=com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource
  db.sourcename.driver=com.mysql.jdbc.Driver
  db.sourcename.platform=MySQL

The db value has to match the '''source.db.name''' in your project XML entry, for example:

.. code-block:: xml

    # project XML
    <source name="chado-db-flybase-dmel" type="chado-db" version="1.2.3">
      <property name="source.db.name" value="flybase"/>
      ...
    </source>

.. code-block:: properties

  # flymine.properties

  db.flybase.datasource.class=com.zaxxer.hikari.HikariDataSource
  db.flybase.datasource.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
  db.flybase.datasource.dataSourceName=db.flybase
  db.flybase.datasource.serverName=LOCALHOST
  db.flybase.datasource.databaseName=FB2011_01
  db.flybase.datasource.user=USERNAME
  db.flybase.datasource.password=SECRET
  db.flybase.datasource.maxConnections=10
  db.flybase.driver=org.postgresql.Driver
  db.flybase.platform=PostgreSQL

gff
^^^^^^^^^^^^^^^^^

Create a gff source to load genome annotation in GFF3 format. This creates an empty `GFF3RecordHandler` in `<source-name>/src/main/java/org/intermine/bio/dataconversion`. The source will work without any changes but you can edit the `GFF3RecordHandler` to read specific attributes from the last column of the GFF3 file. See the InterMine tutorial and :doc:`/database/data-sources/library/gff/` for more information on integrating GFF3.

obo
^^^^^^^^^^^^^^^^^

Create a obo source to load ontology in OBO format.

.. code-block:: xml

    # an example OBO entry
    <source name="go" type="go">
      <property name="src.data.file" location="/data/go/go.obo" version="1.2.3"/>
    </source>

4. Update the Additions file 
----------------------------------

Update the file in the source folder called `new-source_additions.xml`. This file details any extensions needed to the data model to store data from this source, everything else is automatically generated from the model description so this is all we need to do to add to the model. The file is in the same format as a complete Model description.

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

The extends clause is optional and is used to inherit (include all the attributes of) an existing class, in this case we extend `SequenceFeature`, an InterMine class that represents any genome feature. `is-interface` should always be set to true. The attribute lines as before define the names and types of data to be stored. A new class will be created with the name `NewFeature` that extends `SequenceFeature`. 

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

If all the data you wish to load is already modelled in InterMine then you don't need an additions file. See :doc:`/data-model/model/` for details.

Global Additions File
~~~~~~~~~~~~~~~~~~~~~~~~~

If you don't want to create an additions file for each of your mine's data sources, you can also create a "global" additions file. See the "Global Additions File" section of :doc:`/database/database-building/model-merging/` for details on how to set this parameter.

5. Update Keys file
-----------------------

Within the `src/main/resources` directory is a file called `new-source_keys.properties`. Here we can define primary keys that will be used to integrate data from this source with any exiting objects in the database. We want to integrate genes by their primaryIdentifier attribute so we define that this source should use the key:

.. code-block:: properties

  Gene.key_primaryidentifier=primaryIdentifier

See :doc:`/database/database-building/model-merging/`


6. Run a build and load your data!
----------------------------------------------

Once you've updated the config files, and written your parser (if necessary), create the database as usual. The source should now be included when building the mine.

.. code-block:: bash

  ./gradlew builddb

.. note::

  Unless the 'clean' is run (which deletes the build directory) in `MINE_NAME/dbmodel` any changes will append to the current model structure and any unwanted classes/attributes will remain.

.. index:: writing a custom data source, custom data source

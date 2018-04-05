Tutorial
========

Following the steps on this page you will set up an example InterMine.  You will:

 * Load some real data sets for Malaria (''P. falciparum'')
 * Learn about post-processing after data is loaded
 * Deploy a webapp to query the data

Getting Started
----------------------

We use `git <http://git-scm.com>`_ to manage and distribute source code and `Gradle <http://gradle.org>`_ as build system.
Download dependencies from  :doc:`/system-requirements/index`.
Clone biotestmine project from https://github.com/intermine/biotestmine.

BioTest Mine
----------------------

Change into the directory you checked out the BiotestMine source code to and look at the sub-directories:

.. code-block:: bash

  $ cd biotestmine
  $ ls

We will look at each of the sub-directories in much more detail later, they are:

``dbmodel``
  contains information about the data model to be used and ant targets relating to the data model and database creation.
``webapp`` 
  basic configuration and commands for building and deploying the web application
``data``
  contains a tar file with data to load

In addition there are two gradle files, used by the InterMine build system, which we won't need to edit (`build.gradle` and `settings.gradle`) and a `project.xml` file.

Project.xml
~~~~~~~~~~~~~~~~~~

The `project.xml` allows you to configure which data to load into your Mine. The file has two sections: sources and post-processing.

<sources>
^^^^^^^^^^

The `<source>` elements list and configure the data sources to be loaded, each one has a `type` that corresponds to the name of the bio-source artifact (jar) which includes parsers to retrieve data and information on how it will be integrated.  The `name` can be anything and can be the same as `type`, using a more specific name allows you to define specific integration keys (more on this later).  

`<source>` elements can have several properties: `src.data.dir`, `src.data.file` and `src.data.includes` are all used to define locations of files that the source should load.  Other properties are used as parameters to specific parsers.


<post-processing>
^^^^^^^^^^^^^^^^^^^^

Specific operations can be performed on the Mine once data is loaded, these are listed here as `<post-process>` elements.  We will look at these in more detail later.


Data to load
~~~~~~~~~~~~~~~

The biotestmine checkout includes a tar file with data to load into BiotestMine. These are real, complete data sets for ''P. falciparum'' (but very old!). We will load genome annotation from PlasmoDB, protein data from UniProt and GO annotation also from PlasmoDB.

Copy this to some local directory (your home directory is fine for this workshop) and extract the archive:

.. code-block:: bash

  $ cd
  $ cp git/biotestmine/data/malaria-data.tar.gz .
  $ tar -zxvf malaria-data.tar.gz

In your `biotestmine` directory edit `project.xml` to point each source at the extracted data, just replace `/data` with `/home/username` (or on a mac `/Users/username`). Do use the absolute path.

.. code-block:: bash

  $ cd ~/git/biotestmine
  $ sed -i 's/\/data/\/home\/username/g' project.xml

For example, the `uniprot-malaria` source:

.. code-block:: xml

  <sources>
    <source name="uniprot-malaria" type="uniprot">
      <property name="uniprot.organisms" value="36329"/>
      <property name="src.data.dir" location="/home/username/malaria/uniprot/"/>
    </source>
    ...

.. note::

    All file locations must be absolute not relative paths.

The `project.xml` file is now ready to use.

Properties file
~~~~~~~~~~~~~~~~~

Configuration of local databases and tomcat deployment is kept in a `MINE_NAME.properties` file in a `.intermine` directory under your home directory.  We need to set up a `biotestmine.properties` file.  

If you don't already have a `.intermine` directory in your home directory, create one now:

.. code-block:: bash

  $ cd
  $ mkdir .intermine

There is a partially completed properties file for BiotestMine already.   Copy it into your `.intermine` directory:

.. code-block:: bash

  $ cd
  $ cp git/biotestmine/dbmodel/resources/biotestmine.properties .intermine/

Update this properties file with your postgres server location, username and password information for the two databases you just created.  The rest of the information is needed for the webapp and will be updated in Step 13.

For the moment you need to change `PSQL_USER` and `PSQL_PWD` in the `db.production` and `db.common-tgt-items` properties.

.. code-block:: properties

  # Access to the postgres database to build into and access from the webapp                              
  db.production.datasource.serverName=localhost
  # port: uncomment the next line if use different prot other than 3306
  # db.production.datasource.port=PORT_NUMBER
  db.production.datasource.databaseName=malariamine
  db.production.datasource.user=PSQL_USER
  db.production.datasource.password=PSQL_PWD

If you don't have a password for your postgres account you can leave `password` blank.

Create databases
~~~~~~~~~~~~~~~~~

Finally, we need to create `biotestmine` and `items-biotestmine` postgres databases as specified in the `biotestmine.properties` file:

.. code-block:: bash

  $ createdb biotestmine
  $ createdb items-biotestmine

New postgres databases default to `UTF-8` as the character encoding.  This will work with InterMine but performance is better with `SQL_ASCII`.  

The Data Model
----------------------

Now we're ready to set up a database schema and load some data into our MalariaMine, first some information on how data models are defined in InterMine.

Defining the model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 * InterMine uses an object-oriented data model, classes in the model and relationships between them are defined in an XML file.  Depending on which data types you include you will need different classes and fields in the model, so the model is generated from a core model XML file and any number of `additions` files.  These additions files can define extra classes to be added to the model and define extra fields for additional classes.

  * Elements of the model are represented by Java classes and references between them.
  * These Java classes map automatically to tables in the database schema.
  * The object model is defined as an XML file, that defines `classes`, their `attributes` and `references` between classes.
  * The Java classes and database schema are automatically generated from an XML file.

 * You can easily adapt InterMine to include your own data by creating new additions files, we'll see how to do this later.

The core data model, defined in core.xml file, is released in the bio-core artifact downloaded as biotestmine dependency.
You can view the contents of the core model here ...

Note the fields defined for `Protein`:

.. code-block:: xml

  <class name="Protein" extends="BioEntity" is-interface="true">
    <attribute name="md5checksum" type="java.lang.String"/>
    <attribute name="primaryAccession" type="java.lang.String"/>
    <attribute name="length" type="java.lang.Integer"/>
    <attribute name="molecularWeight" type="java.lang.Integer"/>
    <reference name="sequence" referenced-type="Sequence"/>
    <collection name="genes" referenced-type="Gene" reverse-reference="proteins"/>
  </class>

Protein is a subclass of `BioEntity`, defined by `extends="BioEntity"`.  The `Protein` class will therefore also inherit all fields of `BioEntity`.

.. code-block:: xml

    <class name="BioEntity" is-interface="true">
      <attribute name="primaryIdentifier" type="java.lang.String"/>
      <attribute name="secondaryIdentifier" type="java.lang.String"/>
    ...

The model is generated from a core model XML file and any number of additions files defined in the `dbmodel/build.gradle` file, in the mineDBModelConfig.

.. code-block:: bash

  mineDBModelConfig {
    modelName = "genomic"
    extraModelsStart = "so_additions.xml genomic_additions.xml"
    extraModelsEnd = ""
  }

The first file merged into the core model is the `so_additions.xml` file.  This XML file is generated in the `dbmodel/build/` directory from terms listed in the so_terms file, as configured in the `dbmodel/build.gradle` file, in dbModelConfig.

.. code-block:: bash

  dbModelConfig {
    soTermListFilePath = "dbmodel/resources/so_terms"
    soAdditionFilePath = "dbmodel/build/so_additions.xml"
  }

The build system creates classes corresponding to the Sequence Ontology terms.
The model is then combined with any extra classes and fields defined in the sources to integrate, those listed as `<source>` elements in `project.xml`.  Look at an example 'additions' file for the  `UniProt source <https://github.com/intermine/intermine/blob/dev/bio/sources/uniprot/uniprot_additions.xml>`_  

This defines extra fields for the `Protein` class which will be added to those from the core model.  

* Other model components can be included by specifying in the `dbmodel/build.gradle` file, for example we include `genomic_additions.xml`  
* The `reverse-reference` elements in definitions of some references and collections, this defines in the model that two references/collections are opposing ends of the same relationship.  The value should be set to the name of the reference/collection in the `referenced-type`.  

Creating a database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now run the gradle task to merge all the model components, generate Java classes and create the database schema, in `biotestmine` run:

.. code-block:: bash

  # in biotestmine
  $ ./gradlew buildDB

The clean task is necessary when you have run the task before, it removes the `build` directory and any previously generated model.  

This task has done several things:

1. Merged the core model with other model additions and created a new XML file:

.. code-block:: bash

   $ less biotestmine/dbmodel/build/resources/main/genomic_model.xml 

Look for the `Protein` class, you can see it combines fields from the core model and the UniProt additions file.

2. The `so_additions.xml` file has also been created using the sequence ontology terms in `so_term`:

.. code-block:: bash

  $ less biotestmine/dbmodel/build/so_additions.xml 

Each term from `so_term` was added to the model, according to the sequence ontology.

3. Generated and compiled a Java class for each of the `<class>` elements in the file.  For example `Protein.java`:

.. code-block:: bash

   $ less biotestmine/dbmodel/build/gen/org/intermine/model/bio/Protein.java

Each of the fields has appropriate getters and setters generated for it, note that these are `interfaces` and are turned into actual classes dynamically at runtime - this is how the model copes with multiple inheritance.

4. Automatically created database tables in the postgres database specified in `biotestmine.properties` as `db.production` - in our case `malariamine`.  Log into this database and list the tables and the columns in the protein table:

.. code-block:: bash

    $ psql biotestmine
    biotestmine=#  \d
    biotestmine=#  \d protein


The different elements of the model XML file are handled as follows:

`attributes` 
  there is one column for each attribute of `Protein` - e.g. `primaryIdentifer` and `length`.

`references` 
  references to other classes are foreign keys to another table - e.g. `Protein` has a reference called `organism` to the `Organism` class so in the database the `protein` table has a column `organismid` which would contain an id that appears in the `organism` table.

`collections` 
  indirection tables are created for many-to-many collections - e.g. `Protein` has a collection of `Gene` objects so an indirection table called `genesproteins` is created. 

This has also created necessary indexes on the tables:

.. code-block:: bash

    biotestmine=#  \d genesproteins

.. warning::

  Running `buildDB` will destroy any existing data loaded in the biotestmine database and re-create all the tables.


The model XML file is stored in the database once created, this and some other configuration files are held in the `intermine_metadata` table which has `key` and `value` columns:
 
.. code-block:: bash

   biotestmine=# select key from intermine_metadata;

Loading Data
----------------------

For this tutorial we will run several data integration and post-processing steps manually.  This is a good way to learn how the system works and to test individual stages.  For running actual builds there is a `project_build` script that will run all steps specified in `project.xml` automatically.  We will cover this later.

Loading data from a source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Loading of data is done by running `integrate`.  You can specify one or more sources to load or choose to load all sources listed in the `project.xml` file.  When you specify sources by name the order that they appear in `project.xml` doesn't matter.  Now load data from the uniprot-malaria source:

.. code-block:: bash

  $ cd biotestmine
  $ ./gradlew integrate -Psource=uniprot-malaria --stacktrace --no-daemon

The `--stacktrace` option will display complete stack traces if there is a problem.
 
This will take a couple of minutes to complete, the command runs the following steps:

1. Checks that a source with name `uniprot-malaria` exists in `project.xml`
2. Reads the UniProt XML files at the location specified by `src.data.dir`
3. Calls the parser included in the `uniprot` source with the list of files, this reads the original XML and creates `Items` which are metadata representations of the objects that will be loaded into the malariamine database.  These items are stored in an intermediate `items` database (more about `Items` later).
4. Reads from the `items` database, converts items to objects and loads them into the malariamine database.

This should complete after a couple of minutes, if you see an error message then see :doc:`/support/troubleshooting-tips`.  
 
If an error occurred during loading and you need to try again you need to re-initialise the database again by running `buildDB`.
A useful command to initialise the database and load a source from the integrate directory is:

.. code-block:: bash

  $ (./gradlew clean buildDB) && ./gradlew integrate -Psource=uniprot-malaria --stacktrace --no-daemon

Now that the data has loaded, log into the database and view the contents of the protein table:

.. code-block:: bash

  $ psql biotestmine
  biotestmine#  select count(*) from protein;

And see the first few rows of data:
 
.. code-block:: bash

 biotestmine#  select * from protein limit 5;

Object relational mapping
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
InterMine works with objects, objects are loaded into the production system and queries return lists of objects.  These objects are persisted to a relational database.  Internal InterMine code (the ObjectStore) handles the storage and retrieval of objects from the database automatically.  By using an object model InterMine queries benefit from inheritance, for example the `Gene` and `Exon` classes are both subclasses of `SequenceFeature`.  When querying for SequenceFeatures (representing any genome feature) both Genes and Exons will be returned automatically.  

We can see how see how inheritance is represented in the database:

* One table is created for each class in the data model.
* Where one class inherits from another, entries are written to both tables.  For example:

 .. code-block:: bash

   biotestmine#  select * from gene limit 5;
 
 The same rows appear in the `sequencefeature` table:
 
.. code-block:: bash

  biotestmine#  select * from sequencefeature limit 5;

All classes in the object model inherit from `InterMineObject`.  Querying the `intermineobject` table in the database is a useful way to find the total number of objects in a Mine:

.. code-block:: bash

  biotestmine#  select count(*) from intermineobject;

All tables include an `id` column for unique ids and a `class` column with the actual class of that object.  Querying the `class` column of `intermineobject` you can find the 
counts of different objects in a Mine:

.. code-block:: bash

  biotestmine#  select class, count(*) from intermineobject group by class;

A technical detail: for speed when retrieving objects and to deal with inheritance correctly (e.g. to ensure a `Gene` object with all of its fields is returned even if the query was on the `SequenceFeature` class) a serialised copy of each object is stored in the `intermineobject` table.  When queries are run by the ObjectStore they actually return the ids of objects - these objects are may already be in a cache, if not the are retrieved from the `intermineobject` table.

Loading Genome Data from GFF3 and FASTA
--------------------------------------------

We will load genome annotation data for *P. falciparum* from PlasmoDB

* genes, mRNAs, exons and their chromosome locations - in GFF3 format:
* chromosome sequences - in FASTA format

Data integration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note that genes from the gff3 file will have the same `primaryIdentifier` as those already loaded from UniProt.  These will  merge in the database such that there is only one copy of each gene with information from both data sources. We will load the genome data then look at how data integration in InterMine works.

First, look at the information currently loaded for gene "PFL1385c" from UniProt:

.. code-block:: sql

  biotestmine=#  select * from gene where primaryIdentifier = 'PFL1385c';

GFF3 files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GFF3 is a standard format use to represent genome features and their locations.  It is flexible and expressive and defined by a clear standard - https://github.com/The-Sequence-Ontology/Specifications/blob/master/gff3.md.  An example of the file will load can be used to explain the format, each line represents one feature and has nine tab-delimited columns:

.. code-block:: properties

  MAL1    ApiDB   gene    183057  184457  .       -       .       ID=gene.46311;description=hypothetical%20protein;Name=PFA0210c
  MAL1    ApiDB   mRNA    183057  184457  .       +       .       ID=mRNA.46312;Parent=gene.46311
  MAL1    ApiDB   exon    183057  184457  .       -       0       ID=exon.46313;Parent=mRNA.46312



col 1: "seqid"
  an identifier for a 'landmark' on which the current feature is locatated, in this case 'MAL1', a ''P. falciparum'' chromosome.

col 2: "source"
  the database or algorithm that provided the feature

col 3: "type"
  a valid SO term defining the feature type - here `gene` or `mRNA`

col 4 & 5: "start" and "end"
  coordinates of the feature on the landmark in col 1

col 6: "score"
  an optional score, used if the feature has been generated by an algorithm

col 7: "strand"
  '+' or '-' to indicate the strand the feature is on

col 8: "phase" 
  for `CDS` features to show where the feature begins with reference to the reading frame

col 9: "attributes" 
  custom attributes to describe the feature, these are name/value pairs separated by ';'.  Some attributes have predefined meanings, relevant here:
  
* `ID` - identifier of feature, unique in scope of the GFF3 file
* `Name` - a display name for the feature
* `Parent` - the `ID` of another feature in the file that is a parent of this one.  In our example the `gene` is a `Parent` of the `mRNA`.

A dot means there is no value provided for the column.

The files we are loading are from PlasmoDB and contain `gene`, `exon` and `mRNA` features, there is one file per chromosome.  Look at an example:

.. code-block:: bash

  $ less /data/malaria/genome/gff/MAL1.gff3

The GFF3 source
~~~~~~~~~~~~~~~~~

InterMine includes a parser to load valid GFF3 files.  The creation of features, sequence features (usually chromosomes), locations and standard attributes is taken care of automatically.  
 
Many elements can be configured by properties in `project.xml`, to deal with any specific attributes or perform custom operations on each feature you can  write a handler in Java which will get called when reading each line of GFF.

Other `gff3` properties can be configured in the `project.xml` The properties set for `malaria-gff` are:

gff3.seqClsName = Chromosome
  the ids in the first column represent `Chromosome` objects, e.g. MAL1
   
gff3.taxonId = 36329
  taxon id of malaria

gff3.dataSourceName = PlasmoDB
  the data source for features and their identifiers, this is used for the DataSet (evidence) and synonyms.

gff3.seqDataSourceName = PlasmoDB
  the source of the seqids (chromosomes) is sometimes different to the features described

gff3.dataSetTitle = PlasmoDB P. falciparum genome
  a DataSet object is created as evidence for the features, it is linked to a DataSource (PlasmoDB)

In some cases specific code is required to deal with attributes in the gff file and any special cases.  A specific `source` can be created to contain the code to do this and any additions to the data model necessary.  For malaria gff we need a handler to switch which fields from the file are set as `primaryIdentifier` and `symbol`/`secondaryIdentifier` in the features created.  This is to match the identifiers from UniProt, it is quite a common issue when integrating from multiple data sources.

From the example above, by default: `ID=gene.46311;description=hypothetical%20protein;Name=PFA0210c` would make `Gene.primaryIdentifier` be `gene.46311` and `Gene.symbol` be `PFA0210c`.  We need `PFA0210c` to be the `primaryIdentifier`.

The `malaria-gff` source is held `in the main InterMine repository<https://github.com/intermine/intermine/blob/3328168aa750f1175d9e7c6bb2a516455cfc9bd1/bio/sources/example-sources/malaria-gff/project.properties>`_ (included as a biotestmine project dependency).  Look at the `malaria-gff.properties` file - there are two properties of interest:

.. code-block:: properties

  # set the source type to be gff
  have.file.gff=true

  # specify a Java class to be called on each row of the gff file to cope with attributes
  gff3.handlerClassName = org.intermine.bio.dataconversion.MalariaGFF3RecordHandler

Look at the `MalariaGFF3RecordHandler` `class in InterMine<https://github.com/intermine/intermine/blob/3ae2631dbe244a029baf9d369510bd87e49ac927/bio/sources/example-sources/malaria-gff/main/src/org/intermine/bio/dataconversion/MalariaGFF3RecordHandler.java>`_: .  This code changes which fields the `ID` and `Name` attributes from the GFF file have been assigned to.


Loading GFF3 data
~~~~~~~~~~~~~~~~~

Now load the `malaria-gff` source by running this command in `biotestmine`:

.. code-block:: bash

  $ ./gradlew -Psource=malaria-gff --stacktrace --no-daemon

This will take a few minutes to run.  Note that this time we don't run `buildDB` as we are loading this data into the same database as UniProt.  As before you can run a query to see how many objects of each class are loaded:

.. code-block:: bash

  $ psql biotestmine
  biotestmine#  select class, count(*) from intermineobject group by class;

FASTA files
~~~~~~~~~~~~~~~~~

FASTA is a minimal format for representing sequence data.  Files comprise a header with some identifier information preceded by '>' and a sequence.  At present the InterMine FASTA parser loads just the first entry in header after `>` and assigns it to be an attribute of the feature created.  Here we will load one FASTA file for each malaria chromosome.  Look at an example of the files we will load:

.. code-block:: bash

  $ less /data/malaria/genome/fasta/MAL1.fasta

The type of feature created is defined by a property in `project.xml`, the attribute set defaults to `primaryIdentifier` but can be changed with the `fasta.classAttribute` property.  The following properties are defined in `project.xml` for `malaria-chromosome-fasta`:

`fasta.className = org.intermine.model.bio.Chromosome`
  the type of feature that each sequence is for

`fasta.dataSourceName = PlasmoDB`
  the source of identifiers to be created

`fasta.dataSetTitle = PlasmoDB chromosome sequence`
  a DataSet object is created as evidence

`fasta.taxonId = 36329`
  the organism id for malaria
  
`fasta.includes = MAL*.fasta`

This will create features of the class `Chromosome` with `primaryIdentifier` set and the `Chromosome.sequence` reference set to a `Sequence` object.  Also created are a `DataSet` and `DataSource` as evidence.

Loading FASTA data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now load the `malaria-chromosome-fasta` source by running this command in `malariamine/integrate`:

.. code-block:: bash

  $ ./gradlew -Psource=malaria-chromosome-fasta --stacktrace --no-daemon

This has integrated the chromosome objects with those already in the database.  In the next step we will look at how this data integration works.

Data Integration
----------------------

Data integration in MalariaMine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The sources `uniprot-malaria` and `malaria-gff` have both loaded information about the same genes.  Before loading genome data we ran a query to look at the information UniProt provided about the gene "PFL1385c":

::

  biotestmine=# select id, primaryidentifier, secondaryidentifier, symbol, length , chromosomeid, chromosomelocationid, organismid from gene where primaryIdentifier = 'PFL1385c';
      id    | primaryidentifier | secondaryidentifier | symbol | length | chromosomeid | chromosomelocationid | organismid 
  ----------+-------------------+---------------------+--------+--------+--------------+----------------------+------------
  83000626 | PFL1385c          |                     | ABRA   |        |              |                      |   83000003
  (1 row)

Which showed that UniProt provided `primaryIdentifier` and `symbol` attributes and set the `organism` reference.  The `id` was set automatically by the ObjectStore and will be different each time you build your Mine.

Running the same query after `malaria-gff` is added shows that more fields have been filled in for same gene and that it has kept the same id:

::

  biotestmine=# select id, primaryidentifier, secondaryidentifier, symbol, length , chromosomeid, chromosomelocationid, organismid from gene where primaryIdentifier = 'PFL1385c';
      id    | primaryidentifier | secondaryidentifier | symbol | length | chromosomeid | chromosomelocationid | organismid 
  ----------+-------------------+---------------------+--------+--------+--------------+----------------------+------------
  83000626 | PFL1385c          | gene.33449          | ABRA   |   2232 |     84017653 |             84018828 |   83000003
  (1 row)

This means that when the second source was loaded the integration code was able to identify that an equivalent gene already existed and merged the values for each source, the equivalence was based on `primaryIdentifier` as this was the field that the two sources had in common.

Note that `malaria-gff` does not include a value for `symbol` but it did not write over the `symbol` provided by UniProt, actual values always take precedence over null values (unless configured otherwise).


Now look at the organism table:

::

  biotestmine=# select * from organism;
  genus | taxonid | species | abbreviation |    id    | shortname | name |               class                
  -------+---------+---------+--------------+----------+-----------+------+------------------------------------
        |   36329 |         |              | 83000003 |           |      | org.intermine.model.genomic.Organism
  (1 row)

Three sources have been loaded so far that all included the organism with `taxonId` 36329, and more importantly they included objects that reference the organism.  There is still only one row in the organism table so the data from three sources has merged, in this case `taxonId` was the field used to define equivalence.

How data integration works
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Data integration works by defining keys for each class of object to describe fields that can be used to define equivalence for objects of that class.  For the examples above:

* `primaryIdentifier` was used as a key for `Gene`
* `taxonId` was used as a key for `Organism`

For each `Gene` object loaded by `malaria-gff` a query was performed in the `malariamine` database to find any existing `Gene` objects with the same `primaryIdentifier`.  If any were found fields from both objects were merged and the resulting object stored.

Many performance optimisation steps are applied to this process.  We don't actually run a query for each object loaded, requests are batched and queries can be avoided completely if the system can work out no integration will be needed.

We may also load data from some other source that provides information about genes but doesn't use the identifier scheme we have chosen for `primaryIdentifier` (in our example `PFL1385c`).  Instead it only knows about the `symbol` (`ABRA`), in that case we would want that source to use the `symbol` to define equivalence for `Gene`.

Important points:

* A `primary key` defines a field or fields of a class that can be used to search for equivalent objects
* Multiple primary keys can be defined for a class, sources can use different keys for a class if they provide different identifiers
* One source can use multiple primary keys for a class if the objects of that class don't consistently have the same identifier type
* `null` - if a source has no value for a field that is defined as a primary key then the key is not used and the data is loaded without being integrated.

Primary keys in MalariaMine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The keys used by each source are set in the main directory of the corresponding `bio/sources/` directory.

For `uniprot-malaria`:

.. code-block:: bash

  $ less bio/sources/uniprot/src/main/resourcesuniprot_keys.properties

And `malaria-gff`:

.. code-block:: bash

  $ less bio/sources/example-sources/malaria-gff/resources/malaria-gff_keys.properties

The key on `Gene.primaryIdentifier` is defined in both sources, that means that the same final result would have been achieved regardless of the order in the two sources were loaded.  

These `_keys.properties` files define keys in the format:

.. code-block:: properties

  Class.name_of_key = field1, field2

The `name_of_key` can be any string but you must use different names if defining more than one key for the same class, for example in `uniprot_keys.properties` there are two different keys defined for `Gene`:

.. code-block:: properties

  Gene.key_primaryidentifier = primaryIdentifier
  Gene.key_secondaryidentifier = secondaryIdentifier

It is better to use common names for identical keys between sources as this will help avoid duplicating database indexes.

Each key should list one or more fields that can be a combination of `attributes` of the class specified or `references` to other classes, in this cases there should usually be a key defined for the referenced class as well.

It is still possible to use a legacy method of configuring keys, where keys are defined centrally in `dbmodel/resources/genomic_keyDefs.properties` and referenced in source `_keys.properties` files.


The `tracker` table 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A special `tracker` table is created in the target database by the data integration system.  This tracks which sources have loaded data for each field of each object.  The data is used along with priorities configuration when merging objects but is also useful to view where objects have come from.

* Look at the columns in the tracker table, `objectid` references an object from some other table
* Query tracker information for the objects in the examples above:

.. code-block:: sql

 select distinct sourcename from tracker, gene where objectid = id and primaryidentifier = 'PFL1385c';
 
 select objectid, sourcename, fieldname, version from tracker, gene where objectid = id and primaryidentifier = 'PFL1385c';
 
 select distinct sourcename from tracker, organism where objectid = id;


Updating Organism and Publication Information
------------------------------------------------------------------

Organisms and publications in InterMine are loaded by their taxon id and PubMed id respectively.  The `entrez-organism` and `update-publications` sources can be run at the end of the build to examine the ids loaded, fetch details via the NCBI Entrez web service and add those details to the Mine.

Fetching organism details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You will have noticed that in previous sources and in `project.xml` we have referred to organisms by their NCBI Taxonomy id.  These are numerical ids assigned to each species and strain.  We use these for convenience in integrating data, the taxon id is a good unique identifier for organisms whereas names can come in many different formats: for example in fly data sources we see: ''Drosophila melanogaster'', ''D. melanogaster'', Dmel, DM, etc.

Looking at the `organism` table in the database you will see that the only column filled in is `taxonid`:

.. code-block:: bash

  $ psql biotestmine
  biotestmine#  select * from organism;

From the `integrate` directory run the `entrez-organism` source:

.. code-block:: bash

  $ ./gradlew -Psource=entrez-organim --stacktrace --no-daemon

This should only take a few seconds.  This source does the following:

* runs a query in the production database for all of the taxon ids
* creates an NCBI Entrez web service request to fetch details of those organisms
* converts the data returned from Entrez into a temporary Items XML file
* loads the Items XML file into the production database

Now run the same query in the production database, you should see details for ''P. falciparum'' added:

.. code-block:: psql

  $ psql biotestmine
  biotestmine#  select * from organism;

.. note::

  As this source depends on organism data previously loaded it should be one of the last sources run and should appear at the end of `<sources>` in `project.xml`.

Fetching publication details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Publications are even more likely to be cited in different formats and are prone to errors in their description.  We will often load data referring to the same publication from multiple sources and need to ensure those publications are integrated correctly.  Hence we load only the PubMed id and fetch the details from the NCBI Entrez web service as above.

Several InterMine sources load publications:

.. code-block:: psql

  biotestmine#  select count(*) from publication;
  biotestmine#  select * from publication limit 5;

Now run the `update-publications` source to fill in the details:

.. code-block:: bash

  $ ./gradlew -Psource=update-publications --stacktrace --no-daemon

As there are often large numbers of publications they are retrieved in batches from the web service.

Now details will have been added to the `publication` table:

.. code-block:: psql

  biotestmine#  select * from publication where title is not null limit 5;

Sometimes, especially with very large numbers of publications, this source will fail to fetch details correctly.  Usually running it again will work correctly.

Occasionally erroneous PubMed ids are included from some sources and their details will not be updated, there is no good way to deal with this situation.

.. note::

  As this source depends on publication data previously loaded it should be one of the last sources run and should appear at the end of `<sources>` in `project.xml`.

Post Processing
--------------------------------------------

Post-processing steps are run after all data is loaded, they are specified as `<post-process>` elements in `project.xml`.  

Some of these can only be run after data from multiple sources are loaded.  For example, for the Malaria genome information we load features and their locations on chromosomes from `malaria-gff` but the sequences of chromosomes from `malaria-chromosome-fasta`.  These are loaded independently and the `Chromosome` objects from each are integrated, neither of these on their own could set the sequence of each `Exon`.  However, now they are both loaded the `transfer-sequences` post-process can calculate and set the sequences for all features located on a `Chromosome` for which the sequence is known.

Some post-process steps are used to homogenize data from different sources or fill in shortcuts in the data model to improve usability - e.g. `create-references`.

Finally, there are post-process operations that create summary information to be used by the web application: `summarise-objectstore`, `create-search-index` and `create-autocomplete-indexes`.

MalariaMine Post Processing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following `<post-process>` targets are included in the MalariaMine `project.xml`. 
The post-processes are run as a single stage of the build process. (see step 11.2 below for how to run the post-processing steps).

Run queries listed here before and after running the post-processing to see examples of what each step does. 

`create-references`
^^^^^^^^^^^^^^^^^^^^^^^

This fills in some shortcut references in the data model to make querying easier.  For example, `Gene` has a collection of `transcripts` and `Transcript` has a collection of `exons`.  `create-references` will follow these collections and create a `gene` reference in `Exon` and the corresponding `exons` collection in `Gene`.

.. code-block:: sql

  biotestmine#  select * from exon limit 5;

The empty `geneid` column will be filled in representing the reference to gene.

`transfer-sequences` 
^^^^^^^^^^^^^^^^^^^^^^^

The sequence for chromosomes is loaded by `malaria-chromosome-fasta` but no sequence is set for the features located on them.  This step reads the locations of features, calculates and stores their sequence and sets the `sequenceid` column.  The `sequenceid` column for this exon is empty:

.. code-block:: sql

  biotestmine# select * from exon where primaryidentifier = 'exon.32017';

After running `transfer-sequences` the `sequenceid` column is filled in.

`do-sources` 
^^^^^^^^^^^^^^^^^^^^^^^

Each source can also provide code to execute post-process steps if required.  This command loops through all of the sources and checks whether there are any post-processing steps configured.  There aren't any for the sources we are using for MalariaMine but you should always include the `do-sources` element.

`summarise-objectstore`, `create-search-index` & `create-autocomplete-index` 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

These generate summary data and indexes used by the web application, see WebappConfig.

Run the post-procesing
~~~~~~~~~~~~~~~~~~~~~~~~~

To run all the post-processing steps:

.. code-block:: bash

  $ ./gradlew postProcess --no-daemon

This will take a few minutes.  When complete you can re-run the queries above to see what has been added.

Post-processing steps can also be run individually:

.. code-block:: bash

  $ ./gradlew postProcess -Pprocess=update-publications --no-daemon

Building a Mine
----------------------

So far we have created databases, integrated data and run post-processing with individual `ant` targets.  InterMine includes a perl program called `project_build` that reads the `project.xml` definition and runs all of the steps in sequence.  It also has the option of dumping the production database during the build and recovering from these dumps in case of problems.

Build complete MalariaMine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Build MalariaMine now using the `project_build` script, we will need a completed MalariaMine for the webapp.

Run the `project_build` script from your `malariamine` directory:

.. code-block:: bash

  $ ../bio/scripts/project_build -b -v localhost ~/malariamine-dump

This will take ~15-30mins to complete.

.. note::

    If you encounter an "OutOfMemoryError", you should set your $ANT_OPTS variable, see :doc:`/support/troubleshooting-tips`

Deploying the web application
--------------------------------------------

Once you have read access to a production database, you can build and release a web application against it.  


Configure
~~~~~~~~~~~~~~~~~~~~~~~~~

In the `~/.intermine` directory, update the webapp properties in your malariamine.properties file].  Update the following properties:

* tomcat username and password
* superuser username and password

UserProfile
~~~~~~~~~~~~~~~~~~~~~~~~~

The userprofile database stores all user-related information such as username and password, tags, queries, lists and templates.

1. Configure 

Update your malariamine.properties file  with correct information for the `db.userprofile-production` database:

.. code-block:: properties

  db.userprofile-production.datasource.serverName=DB_SERVER
  db.userprofile-production.datasource.databaseName=userprofile-malariamine
  db.userprofile-production.datasource.user=USER_NAME
  db.userprofile-production.datasource.password=USER_PASSWORD

2. Create the empty database:

.. code-block:: bash

  $ createdb userprofile-biotestmine

3. Build the database:

.. code-block:: bash

  # in biotestmine
  $ ./gradlew buildUserDB

You only need to build the userprofile database once.

.. warning::

  The build-db and build-db-userprofile commands rebuild the database and thus will delete any data. 

4. Load default templates:

.. code-block:: bash

  # in biotestmine
  $ ./gradlew loadDefaultTemplates

This command loads the `default-template-queries.xml` file.  

Deploying the webapp
~~~~~~~~~~~~~~~~~~~~~~~~~

Run the following command to release your webapp: 

.. code-block:: bash

  # in biotestmine
  $ ./gradlew tomcatStartWar


Using the webapp
~~~~~~~~~~~~~~~~~

Navigate to http://localhost:8080/biotestmine to view your webapp.  The path to your webapp is the `webapp.path` value set in biotestmine.properties.

.. topic:: Next 

  Now that you have a database and a working webapp, you'll want to know how to add your own logo, pick a colour scheme, modify how data is displayed etc. Our :doc:`webapp tutorial <webapp>` is a detailed guide on how to customise all parts of the InterMine web application.


Help
----------------------

Gradle
~~~~~~~~~~~~~~~~~

Anytime you run `./gradlew` and something bad happens, add the --stacktrace --debug options.

This will give you more detailed output and hopefully a more helpful error message.

Logs
~~~~~~~~~~~~~~~~~

If the error occurs while you are integrating data, the error message will be in the `intermine.log` file in the directory you are in.

If the error occurs while you are browsing your webapp, the error message will be located in the Tomcat logs:  `$TOMCAT/logs`.  

.. toctree::
   :maxdepth: 2
   
   test-data 

.. index:: tutorial, ant, logs, userprofile, malariamine, data integration, keys, primary keys, priority conflicts, make_mine, project XML, FASTA, GFF3, data integration, UniProt, publications, build-db, creating a databasebiotestmine

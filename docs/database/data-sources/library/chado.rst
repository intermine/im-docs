Chado
================================

We have developed an InterMine data source that can use a GMOD Chado database as a source for an InterMine warehouse. The eventual aim is to allow import of any Chado database with some configuration.  This will provide a web environment to perform rapid, complex queries on Chado databases with minimal development effort.

Converter
----------

The converter for this source is the `ChadoDBConverter` class.  This class controls which `ChadoProcessors` are run.  A `ChadoProcessor` class corresponds to a chado module.  For example, the sequence module is processed by the `SequenceProcessor` and the stock module is processed by the `StockProcessor`.

Chado tables
--------------------

The `chado-db` source is able to integrate objects from a Chado database.  Currently only tables from the `Chado sequence module` and `Chado stock modules` are read.

These tables are queried from the chado database:

`feature`
  used to create objects in the ObjectStore

* The default configuration only supports features that have a Sequence Ontology type (eg. `gene`, `exon`, `chromosome`)
* Each new feature in InterMine will be a sub-class of `SequenceFeature`.

`featureloc`
  used to create `Location` objects to set `chromosomeLocation` reference in each `SequenceFeature`

`feature_relationship`
  used to find `part_of` relationships between features

* this information is used to create parent-child references and collections
* examples include setting the `transcripts` collection in the `Exon` objects and the `gene` reference in the `Transcript` class.

`dbxref` and `feature_dbxref`
  used to create `Synonym` objects for external identifiers of features

* the `Synonym`s will be added to the `synonyms` collection of the relevant `SequenceFeature`

`featureprop`
  used to set fields in features based on properties

* an example from the FlyBase database: the `SequenceFeature.cytoLocation` field is set using the `cyto_range` feature_prop

`synonym` and `feature_synonym`
  used to create extra `Synonym` objects for `chado` synonyms and to set fields in features

* the `Synonym`s will be added to the `synonyms` collection of the relevant `SequenceFeature`

`cvterm` and `feature_cvterm`
  used to set fields in features and to create synonyms based on CV terms

`pub`, `feature_pub` and `db`
  used to set the `publications` collection in the new `SequenceFeature` objects.

Additionally, the `StockProcessor` class reads the tables from the chado stock module, eg. stockcollection, stock, stock_genotype.

Default configuration
----------------------

The default configuration of `ChadoDBConverter` is to query the `feature` table to only a limited list of types.  The list can be changed by sub-classing the `ChadoDBConverter` class and overriding the `getFeatureList()` method.  The `featureloc`, `feature_relationship` and `pub` tables will then be queried to create locations, parent-child relationships
and publications (respectively).

Converter configuration
----------------------------------------

Sub-classes can control how the Chado tables are used by overriding the `getConfig()` method and returning a configuration map.

Source configuration
---------------------

Example source configuration for reading from the ''C.elegans'' Chado database:

.. code-block:: xml

    <source name="chado-db-wormbase-c_elegans" type="chado-db" dump="true">
      <property name="source.db.name" value="wormbase"/>
      <property name="genus" value="Caenorhabditis"/>
      <property name="species" value="elegans"/>
      <property name="taxonId" value="6239"/>
      <property name="dataSourceName" value="WormBase"/>
      <property name="dataSetTitle" value="WormBase C.elegans data set"/>
    </source>


Sub-classing the converter
----------------------------------------

The processor classes can be sub-classed to allow organism or database specific configuration.  To do that, create your class (perhaps in `bio/sources/chado-db/main/src/`) set the `processors` property in your source element.  For example for reading the FlyBase Chado database there is a `FlyBaseProcessor` which can be configured like this:

.. code-block:: xml

	<source name="chado-db-flybase-dmel" type="chado-db">
	...
		<property name="processors" value="org.intermine.bio.dataconversion.FlyBaseProcessor"/>
	...

Current uses
--------------------

`FlyMine <http://www.flymine.org>`_ uses the `chado-db` source for reading the ''Drosophila'' genomes from the FlyBase `chado` database.  The `FlyBaseProcessor` sub-class is used for configuration and to handle FlyBase special cases.

`modMine <http://intermine.modencode.org>`_ for the modENCODE project uses `ChadoDBSource` for reading ''D. melanogaster'' from FlyBase and to read ''C. elegans'' data from the WormBase `chado` database.  The `WormBaseProcessor` sub-class is used for configuration when reading from WormBase.

Implementation notes for the chado-db source
------------------------------------------------------------

The `chado-db` source is implemented by the `ChadoDBConverter` class which runs the `ChadoProcessor`s that have been configured in the `project.xml`.  The configuration looks like this:

.. code-block:: xml

  <source name="chado-db-some-database" type="chado-db">
    ...
    <property name="processors" value="org.intermine.bio.dataconversion.ChadoSequenceProcessor org.intermine.bio.dataconversion.StockProcessor"/>
    ...

`ChadoDBConverter`.process() will create an object for each `ChadoProcessor` in turn, then call `ChadoProcessor.process()`.

Chado sequence module table processing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`ChadoSequenceProcessor` processes the sequence module from Chado.  The `process()` method handles each table in turn by calling: `processFeatureTable()`, `processFeatureCVTermTable()` etc.

Each table processing method calls a result set method, eg. `processFeatureTable()` calls `getFeatureTableResultSet()` and then processes each row.  The returned `ResultSet` may not always include all rows from the Chado table.  For example the `getFeatures()` method returns a sub-set of the possible feature types and that list is used to when querying the feature table.

Generally each row is made into an appropriate object, eg. in `processFeatureTable()`, `feature` table rows correspond to `BioEntity` objects.  Some rows of some tables are ignored (ie. not turned into objects) based on configuration.

Reading the feature table
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Handled by `ChadoSequenceProcessor.processFeatureTable()`

For each feature it calls: `ChadoSequenceProcessor.makeFeatureData()`, which may be overridden by subclasses.  If `makeFeatureData()` returns null (eg. because the sub-class does not need that feature) the row is discarded, otherwise processing of the feature continues.

Based on the configuration, fields in the `BioEntity` are set using `feature.uniquename` and
`feature.name` from Chado.

If the `residues` column in the feature is set, create a `Sequence` object and add it to the new `BioEntity`.

Reading the featureloc table
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Handled by `ChadoSequenceProcessor.processLocationTable()`.

This method gets passed a result set with start position, end position and information from the `featureloc` table.  For each row from the result set it will:

* store a `Location` object
* set `chromosomeLocation` in the associated `SequenceFeature`
* set the `chromosome` reference in the `SequenceFeature` if the `srcfeature` from the `featureloc` table is a chromosome feature

Reading the feature_relationship table
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Handled by `ChadoSequenceProcessor.processRelationTable()`.

This method calls `getFeatureRelationshipResultSet()` to return the relations of interest.  The relations will be used to create references and collections.

The method will automatically attempt to find and set the appropriate references and collections for `part_of` relations.  As an example, if there is a `part_of` relation in the table between `Gene` and `Transcript` and there `Gene.transcript` reference or a `Gene.transcripts` collection, it will be set.

There are two modes of operation, controlled by the `subjectFirst` parameters.  If true, order by the `subject_id` of the `feature_relationship` table so we get results like:

================  =============  ===================
gene1_feature_id  relation_type  protein1_feature_id
gene1_feature_id  relation_type  protein2_feature_id
gene2_feature_id  relation_type  protein1_feature_id
gene2_feature_id  relation_type  protein2_feature_id
================  =============  ===================

(Assuming the unlikely case where two genes are related to two proteins)

If `subjectFirst` is false we get results like:

================  =============  ===================
gene1_feature_id  relation_type  protein1_feature_id
gene2_feature_id  relation_type  protein1_feature_id
gene1_feature_id  relation_type  protein2_feature_id
gene2_feature_id  relation_type  protein2_feature_id
================  =============  ===================

The first case is used when we need to set a collection in the gene, the second if we need to set a collection in proteins.

Reading the cvterm table
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Handled by `ChadoSequenceProcessor.processFeatureCVTermTable()`

Using the default chado source
----------------------------------------

1. Add the chado database to your MINE_NAME.properties file, eg:

.. code-block:: properties

  db.flybase.datasource.class=org.postgresql.ds.PGPoolingDataSource
  db.flybase.datasource.dataSourceName=db.flybase
  db.flybase.datasource.serverName=SERVER_NAME
  db.flybase.datasource.databaseName=DATABASE_NAME
  db.flybase.datasource.user=USER_NAME
  db.flybase.datasource.password=SECRET_PASSWORD
  db.flybase.datasource.maxConnections=10
  db.flybase.driver=org.postgresql.Driver
  db.flybase.platform=PostgreSQL

The chado database has to be on the local network.

2. Add source to project XML file

.. code-block:: xml

    <source name="chado-db" type="chado-db">
      <property name="source.db.name" value="flybase"/>
      <property name="organisms" value="7227"/>
      <property name="dataSourceName" value="FlyBase"/>
      <property name="converter.class" value="org.intermine.bio.dataconversion.ChadoDBConverter"/>
      <property name="processors" value="org.intermine.bio.dataconversion.SequenceProcessor"/>
    </source>

3. Run the build

.. code-block:: bash

 $ cd MINE_NAME/integrate
 $ (cd ../dbmodel && ant build-db -v); ant -Dsource=chado-db -v

See :doc:`/database/database-building/index` for more information on running builds.

This will load the data using the default chado loader. If you want to load more data you will have to write a custom chado converter. FlyMine uses a FlyBase chado "processor" to parse interactions, etc. See `FlyBaseProcessor.java <http://https://github.com/intermine/intermine/blob/dev/bio/sources/chado-db/main/src/org/intermine/bio/dataconversion/FlyBaseProcessor.java>`_ for an example.

Tripal
----------

The Chado specific tables are not in the postgres default “public” schema of the database. Instead, Tripal puts it in a postgres schema named “chado".

To workaround this, you would need to alter your Chado processor to run this query first, before running any SELECT statements:

.. code-block:: sql

	ALTER DATABASE <dbname> SET search_path TO chado, public



Starting with **InterMine 1.8**, you can instead directly define the schema in the properties of the database in your properties file, like

.. code-block:: properties

 db.your_source.datasource.schema=your_schema

for example

.. code-block:: properties

 db.tripaldbname.datasource.schema=chado

.. index:: chado, FlyBase, WormBase

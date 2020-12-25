# Chado

We have developed an InterMine data source that can use a GMOD Chado database as a source for an InterMine warehouse. The eventual aim is to allow import of any Chado database with some configuration. This will provide a web environment to perform rapid, complex queries on Chado databases with minimal development effort.

## Converter

The converter for this source is the \[ChadoDBConverter\]{.title-ref} class. This class controls which \[ChadoProcessors\]{.title-ref} are run. A \[ChadoProcessor\]{.title-ref} class corresponds to a chado module. For example, the sequence module is processed by the \[SequenceProcessor\]{.title-ref} and the stock module is processed by the \[StockProcessor\]{.title-ref}.

## Chado tables

The \[chado-db\]{.title-ref} source is able to integrate objects from a Chado database. Currently only tables from the \[Chado sequence module\]{.title-ref} and \[Chado stock modules\]{.title-ref} are read.

These tables are queried from the chado database:

\[feature\]{.title-ref}

: used to create objects in the ObjectStore

* The default configuration only supports features that have a

  Sequence Ontology type \(eg. \[gene\]{.title-ref}, \[exon\]{.title-ref},

  \[chromosome\]{.title-ref}\)

* Each new feature in InterMine will be a sub-class of

  \[SequenceFeature\]{.title-ref}.

\[featureloc\]{.title-ref}

: used to create \[Location\]{.title-ref} objects to set \[chromosomeLocation\]{.title-ref} reference in each \[SequenceFeature\]{.title-ref}

\[feature\_relationship\]{.title-ref}

: used to find \[part\_of\]{.title-ref} relationships between features

* this information is used to create parent-child references and

  collections

* examples include setting the \[transcripts\]{.title-ref} collection in

  the \[Exon\]{.title-ref} objects and the \[gene\]{.title-ref} reference

  in the \[Transcript\]{.title-ref} class.

\[dbxref\]{.title-ref} and \[feature\_dbxref\]{.title-ref}

: used to create \[Synonym\]{.title-ref} objects for external identifiers of features

* the \[Synonym\`s will be added to the \`synonyms\]{.title-ref}

  collection of the relevant \[SequenceFeature\]{.title-ref}

\[featureprop\]{.title-ref}

: used to set fields in features based on properties

* an example from the FlyBase database: the

  \[SequenceFeature.cytoLocation\]{.title-ref} field is set using the

  \[cyto\_range\]{.title-ref} feature\_prop

\[synonym\]{.title-ref} and \[feature\_synonym\]{.title-ref}

: used to create extra \[Synonym\]{.title-ref} objects for \[chado\]{.title-ref} synonyms and to set fields in features

* the \[Synonym\`s will be added to the \`synonyms\]{.title-ref}

  collection of the relevant \[SequenceFeature\]{.title-ref}

\[cvterm\]{.title-ref} and \[feature\_cvterm\]{.title-ref}

: used to set fields in features and to create synonyms based on CV terms

\[pub\]{.title-ref}, \[feature\_pub\]{.title-ref} and \[db\]{.title-ref}

: used to set the \[publications\]{.title-ref} collection in the new \[SequenceFeature\]{.title-ref} objects.

Additionally, the \[StockProcessor\]{.title-ref} class reads the tables from the chado stock module, eg. stockcollection, stock, stock\_genotype.

## Default configuration

The default configuration of \[ChadoDBConverter\]{.title-ref} is to query the \[feature\]{.title-ref} table to only a limited list of types. The list can be changed by sub-classing the \[ChadoDBConverter\]{.title-ref} class and overriding the \[getFeatureList\(\)\]{.title-ref} method. The \[featureloc\]{.title-ref}, \[feature\_relationship\]{.title-ref} and \[pub\]{.title-ref} tables will then be queried to create locations, parent-child relationships and publications \(respectively\).

## Converter configuration

Sub-classes can control how the Chado tables are used by overriding the \[getConfig\(\)\]{.title-ref} method and returning a configuration map.

## Source configuration

Example source configuration for reading from the \'\'C.elegans\'\' Chado database:

```text
<source name="chado-db-wormbase-c_elegans" type="chado-db" dump="true">
  <property name="source.db.name" value="wormbase"/>
  <property name="genus" value="Caenorhabditis"/>
  <property name="species" value="elegans"/>
  <property name="taxonId" value="6239"/>
  <property name="dataSourceName" value="WormBase"/>
  <property name="dataSetTitle" value="WormBase C.elegans data set"/>
</source>
```

## Sub-classing the converter

The processor classes can be sub-classed to allow organism or database specific configuration. To do that, create your class \(perhaps in \[bio/sources/chado-db/main/src/\]{.title-ref}\) set the \[processors\]{.title-ref} property in your source element. For example for reading the FlyBase Chado database there is a \[FlyBaseProcessor\]{.title-ref} which can be configured like this:

```text
<source name="chado-db-flybase-dmel" type="chado-db">
...
    <property name="processors" value="org.intermine.bio.dataconversion.FlyBaseProcessor"/>
...
```

## Current uses

[FlyMine](http://www.flymine.org) uses the \[chado-db\]{.title-ref} source for reading the \'\'Drosophila\'\' genomes from the FlyBase \[chado\]{.title-ref} database. The \[FlyBaseProcessor\]{.title-ref} sub-class is used for configuration and to handle FlyBase special cases.

[modMine](http://intermine.modencode.org) for the modENCODE project uses \[ChadoDBSource\]{.title-ref} for reading \'\'D. melanogaster\'\' from FlyBase and to read \'\'C. elegans\'\' data from the WormBase \[chado\]{.title-ref} database. The \[WormBaseProcessor\]{.title-ref} sub-class is used for configuration when reading from WormBase.

## Implementation notes for the chado-db source

The \[chado-db\]{.title-ref} source is implemented by the \[ChadoDBConverter\]{.title-ref} class which runs the \[ChadoProcessor\`s that have been configured in the \`project.xml\]{.title-ref}. The configuration looks like this:

```text
<source name="chado-db-some-database" type="chado-db">
  ...
  <property name="processors" value="org.intermine.bio.dataconversion.ChadoSequenceProcessor org.intermine.bio.dataconversion.StockProcessor"/>
  ...
```

\[ChadoDBConverter\]{.title-ref}.process\(\) will create an object for each \[ChadoProcessor\]{.title-ref} in turn, then call \[ChadoProcessor.process\(\)\]{.title-ref}.

### Chado sequence module table processing

\[ChadoSequenceProcessor\]{.title-ref} processes the sequence module from Chado. The \[process\(\)\]{.title-ref} method handles each table in turn by calling: \[processFeatureTable\(\)\]{.title-ref}, \[processFeatureCVTermTable\(\)\]{.title-ref} etc.

Each table processing method calls a result set method, eg. \[processFeatureTable\(\)\]{.title-ref} calls \[getFeatureTableResultSet\(\)\]{.title-ref} and then processes each row. The returned \[ResultSet\]{.title-ref} may not always include all rows from the Chado table. For example the \[getFeatures\(\)\]{.title-ref} method returns a sub-set of the possible feature types and that list is used to when querying the feature table.

Generally each row is made into an appropriate object, eg. in \[processFeatureTable\(\)\]{.title-ref}, \[feature\]{.title-ref} table rows correspond to \[BioEntity\]{.title-ref} objects. Some rows of some tables are ignored \(ie. not turned into objects\) based on configuration.

#### Reading the feature table

Handled by \[ChadoSequenceProcessor.processFeatureTable\(\)\]{.title-ref}

For each feature it calls: \[ChadoSequenceProcessor.makeFeatureData\(\)\]{.title-ref}, which may be overridden by subclasses. If \[makeFeatureData\(\)\]{.title-ref} returns null \(eg. because the sub-class does not need that feature\) the row is discarded, otherwise processing of the feature continues.

Based on the configuration, fields in the \[BioEntity\]{.title-ref} are set using \[feature.uniquename\]{.title-ref} and \[feature.name\]{.title-ref} from Chado.

If the \[residues\]{.title-ref} column in the feature is set, create a \[Sequence\]{.title-ref} object and add it to the new \[BioEntity\]{.title-ref}.

#### Reading the featureloc table

Handled by \[ChadoSequenceProcessor.processLocationTable\(\)\]{.title-ref}.

This method gets passed a result set with start position, end position and information from the \[featureloc\]{.title-ref} table. For each row from the result set it will:

* store a \[Location\]{.title-ref} object
* set \[chromosomeLocation\]{.title-ref} in the associated

  \[SequenceFeature\]{.title-ref}

* set the \[chromosome\]{.title-ref} reference in the

  \[SequenceFeature\]{.title-ref} if the \[srcfeature\]{.title-ref} from

  the \[featureloc\]{.title-ref} table is a chromosome feature

#### Reading the feature\_relationship table

Handled by \[ChadoSequenceProcessor.processRelationTable\(\)\]{.title-ref}.

This method calls \[getFeatureRelationshipResultSet\(\)\]{.title-ref} to return the relations of interest. The relations will be used to create references and collections.

The method will automatically attempt to find and set the appropriate references and collections for \[part\_of\]{.title-ref} relations. As an example, if there is a \[part\_of\]{.title-ref} relation in the table between \[Gene\]{.title-ref} and \[Transcript\]{.title-ref} and there \[Gene.transcript\]{.title-ref} reference or a \[Gene.transcripts\]{.title-ref} collection, it will be set.

There are two modes of operation, controlled by the \[subjectFirst\]{.title-ref} parameters. If true, order by the \[subject\_id\]{.title-ref} of the \[feature\_relationship\]{.title-ref} table so we get results like:

gene1\_feature\_id relation\_type protein1\_feature\_id gene1\_feature\_id relation\_type protein2\_feature\_id gene2\_feature\_id relation\_type protein1\_feature\_id gene2\_feature\_id relation\_type protein2\_feature\_id

\(Assuming the unlikely case where two genes are related to two proteins\)

If \[subjectFirst\]{.title-ref} is false we get results like:

gene1\_feature\_id relation\_type protein1\_feature\_id gene2\_feature\_id relation\_type protein1\_feature\_id gene1\_feature\_id relation\_type protein2\_feature\_id gene2\_feature\_id relation\_type protein2\_feature\_id

The first case is used when we need to set a collection in the gene, the second if we need to set a collection in proteins.

#### Reading the cvterm table

Handled by \[ChadoSequenceProcessor.processFeatureCVTermTable\(\)\]{.title-ref}

## Using the default chado source

1. Add the chado database to your MINE\_NAME.properties file, eg:

```text
db.flybase.datasource.class=org.postgresql.ds.PGPoolingDataSource
db.flybase.datasource.dataSourceName=db.flybase
db.flybase.datasource.serverName=SERVER_NAME
db.flybase.datasource.databaseName=DATABASE_NAME
db.flybase.datasource.user=USER_NAME
db.flybase.datasource.password=SECRET_PASSWORD
db.flybase.datasource.maxConnections=10
db.flybase.driver=org.postgresql.Driver
db.flybase.platform=PostgreSQL
```

The chado database has to be on the local network.

1. Add source to project XML file

```text
<source name="chado-db" type="chado-db">
  <property name="source.db.name" value="flybase"/>
  <property name="organisms" value="7227"/>
  <property name="dataSourceName" value="FlyBase"/>
  <property name="converter.class" value="org.intermine.bio.dataconversion.ChadoDBConverter"/>
  <property name="processors" value="org.intermine.bio.dataconversion.SequenceProcessor"/>
</source>
```

1. Run the build

```text
flymine $ ./gradlew clean builddb
flymine $ ./gradlew integrate -Psource=chado-db
```

See `/database/database-building/index`{.interpreted-text role="doc"} for more information on running builds.

This will load the data using the default chado loader. If you want to load more data you will have to write a custom chado converter. FlyMine uses a FlyBase chado \"processor\" to parse interactions, etc. See [FlyBaseProcessor.java](https://github.com/intermine/intermine/blob/master/bio/sources/chado-db/src/main/java/org/intermine/bio/dataconversion/FlyBaseProcessor.java) for an example.

## Tripal

The Chado specific tables are not in the postgres default "public" schema of the database. Instead, Tripal puts it in a postgres schema named "chado\".

To workaround this, you would need to alter your Chado processor to run this query first, before running any SELECT statements:

```text
ALTER DATABASE <dbname> SET search_path TO chado, public
```

Starting with **InterMine 1.8**, you can instead directly define the schema in the properties of the database in your properties file, like

```text
db.your_source.datasource.schema=your_schema
```

for example

```text
db.tripaldbname.datasource.schema=chado
```

::: {.index} chado, FlyBase, WormBase :::


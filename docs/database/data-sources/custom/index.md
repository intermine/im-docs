---
title: Writing your own data source
---

The aim of this tutorial is to create a new data source to parse your data file and load the data into your InterMine database.

There are three parts to creating a new source:

1. Create a directory for your data sources, e.g. `flymine-bio-sources`
2. Write a data parser
3. Configure the mine to use this new source

To get started, create a directory to put all of your data sources in. You only need to that once. Then follow the instructions below and run the script to create your data source. If necessary, use the APIs provided to write code to parse your data file. Finally, add your new data source to your project XML file.

## 1. Create bio-sources directory

You only need to do this once, but you need a directory to hold all of your mine's data sources.

* Place next to your mine, e.g. ~/git/flymine and ~/git/flymine-bio-sources
* Keep in source control. Please. We use Git.

## 2. Run make\_source script

Checkout the intermine scripts repository that contains the make\_source script.

```bash
# check out the repository that has the scripts we need
~/git $ git clone https://github.com/intermine/intermine-scripts.git
```

The `make_source` script creates the basic skeleton for a source. It should be run in your mine's data sources directory, like this:

```bash
# run the script in the directory you created for your mine data sources
~/git/flymine-bio-sources $ ~/git/intermine-scripts/make_source $SOURCE_NAME $SOURCE_TYPE
```

**SOURCE\_NAME**

The name of your source, e.g. uniprot-fasta or biogrid. The script expects a lowercase word without any special characters \(except dashes, dashes are fine\).

**SOURCE\_TYPE**

The type of your source. It can be one of six options, see below.

Which source type do I need? It depends! If you want to use Java and have a custom data file, use `custom-file`. If you want to use the Perl API, then select `intermine-items-xml-file`.

| Source type | When to use? |
| :--- | :--- |
| db | To load data directly from another **database** |
| gff | for GFF files |
| fasta | for FASTA files |
| obo | for Ontology files |
| custom-file | If you have a data file and want to parse using **Java** |
| intermine-items-xml-file | If you have a data file and want to parse using a **language other than Java** |
| intermine-items-large-xml-file | Same as above but the file is very very large |

The script also creates a gradle project if one does not exist.

## 3. Add your source to your project XML file

Add your new source to the project XML file so it will be run during your build. Below are example project XML snippets for each source type. Note that different parser types have different expected parameters.

See [Project XML](../../database-building/project-xml.md) for further reading about the project XML file.

### Versions

The "version" provided for each source has to match the version of your data parser, e.g. you would want to set `version=1.2.3` for your source `bio-source-mysource-1.2.3.jar`. If you do not provide a version in the project XML file, the default InterMine version will be used.

See [Data Source Versions](dataparser-versions.md) for details.

## 3. Write your parser

For most types of data, you'll have to write some code to store your data into InterMine.

{% hint style="info" %}
Run `make_source` with no arguments to get a full list of source types.
{% endhint %}

### custom-file

This a source that reads from a file in a custom format. A custom Java FileConverter will be needed. The `make_source` script will create a skeleton `FileConverter` in `<source-name>/src/main/java/org/intermine/bio/dataconversion`. Edit this code to process the particular file you need to load, using the [Java Items API](../apis/java-items-api.md) to create and store items to the database.

The `project.xml` configuration is as below:

```markup
<!-- add to your mine's project XML file -->
<source name="my-new-source-name" type="my-new-source-name" version="1.2.3">
  <property name="src.data.dir" location="/some/data/directory"/>
  <!-- optionally specify includes or excludes -->
  <property name="src.data.dir.includes" value="*.xml"/>
</source>
```

See [Data Source Versions](dataparser-versions.md) for details on how to version your data parser.

#### Additional Properties in Project XML

Any properties you define in a source entry in your mine's project.xml will be available in that source's converter or post-processing class, provided that there is a setter with an appropriate name.

This applies to any class that inherits from:

* org.intermine.dataconversion.DataConverter
* org.intermine.dataconversion.DBConverter
* org.intermine.dataconversion.DirectoryConverter
* org.intermine.dataconversion.FileConverter
* org.intermine.postprocess.PostProcessor

For instance, if you have this entry:

```markup
<!-- in project XML -->
<source name="my-new-source-name" type="my-new-source-name" version="2.3.4">
  <property name="bar.info" value="baz"/>
  <property name="bazMoreInfo" value="hello-world"/>
</source>
```

Then those values will be available \(provided you create the setters correctly\):

```java
// In a class that extends org.intermine.postprocess.PostProcessor, for example
public void setBarInfo(String info) {
  // given the example project XML values above, "info" has the value of "baz"
  this.info = info;
}
public void setBazMoreInfo(String moreInfo) {
  // given the example project XML values above, "moreInfo" has the value of "hello-world"
  this.moreInfo = moreInfo;
}
```

### intermine-items-xml-file

This type of source can read a file in InterMine Items XML format and store the data in a mine. The `project.xml` configuration is as below:

```markup
# add your source to your project XML file
<source name="my-new-source-name" type="my-new-source-name" version="1.2.3">
  <property name="src.data.file" location="/some/directory/objects_in_intermine_format.xml"/>
</source>
```

See [this page](../apis/index.md) for more information on the Items XML format and links to APIs that can generate it. This source type doesn't generate any stub Java code.

### intermine-items-large-xml-file

This source works as above but writes the XML to an intermediate items database to avoid reading the whole file into memory at once. This is the best choice for large XML files where large is several hundred megabytes \(although this depends on the amount of RAM specified in your `GRADLE_OPTS` environment variable\).

### db

This source reads directly from a relational database. It will generate a skeleton `DBConverter` in `<source-name>/src/main/java/org/intermine/bio/dataconversion`. You will use the Java API to store data to the InterMine database.

To connect to the original database you need to add properties in xxxmine.properties with the prefix `db.sourcename`.

This is tested for PostgreSQL and MySQL.

Common properties \(to be added to your mine properties file\):

```markup
db.sourcename.datasource.dataSourceName=db.sourcename
db.sourcename.datasource.maxConnections=10
db.sourcename.datasource.serverName=SERVER_NAME
db.sourcename.datasource.databaseName=DB_NAME
db.sourcename.datasource.user=USER_NAME
db.sourcename.datasource.password=USER_PASSWORD
```

Add these for PostgreSQL:

```markup
db.sourcename.datasource.class=com.zaxxer.hikari.HikariDataSource
db.sourcename.datasource.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
db.sourcename.driver=org.postgresql.Driver
db.sourcename.platform=PostgreSQL
```

Add these for MySQL:

```markup
db.sourcename.datasource.class=com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource
db.sourcename.driver=com.mysql.jdbc.Driver
db.sourcename.platform=MySQL
```

The db value has to match the `source.db.name` in your project XML entry, for example:

```markup
# project XML
<source name="chado-db-flybase-dmel" type="chado-db" version="1.2.3">
  <property name="source.db.name" value="flybase"/>
  ...
</source>
```

Example entry in flymine.properties:

```text
# flymine.properties
db.flybase.datasource.class=com.zaxxer.hikari.HikariDataSource
db.flybase.datasource.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
db.flybase.datasource.dataSourceName=db.flybase
db.flybase.datasource.serverName=localhost
db.flybase.datasource.databaseName=FB2011_01
db.flybase.datasource.user=USERNAME
db.flybase.datasource.password=SECRET
db.flybase.datasource.maxConnections=10
db.flybase.driver=org.postgresql.Driver
db.flybase.platform=PostgreSQL
```

### GFF3

Create a gff source to load genome annotation in GFF3 format. This creates an empty `GFF3RecordHandler` in `<source-name>/src/main/java/org/intermine/bio/dataconversion`. The source will work without any changes but you can edit the `GFF3RecordHandler` to read specific attributes from the last column of the GFF3 file. See the InterMine tutorial and [GFF3](../library/gff.md) for more information on integrating GFF3.

### FASTA

Create a fasta source to load sequence data in FASTA format. This creates an empty `*FastaConverter.java` file in `<source-name>/src/main/java/org/intermine/bio/dataconversion`. The source will work without any changes but you can edit the `*FastaConverter.java` to read specific attributes from the fasta file. See the InterMine tutorial and [FASTA](../library/fasta.md) for more information on integrating FASTA.

### OBO

Create a obo source to load ontology in OBO format.

```markup
# an example OBO entry
<source name="go" type="go">
  <property name="src.data.file" location="/data/go/go.obo" version="1.2.3"/>
</source>
```

You don't need to write any code to parse the OBO file, the ontology terms are created automatically.

## 4. Update the Additions file

Update the file in the `src/main/resources` directory called `new-source_additions.xml`. This file details any extensions needed by the data model to store data from this source, everything else is automatically generated from the model description so this is all we need to do to add to the model. The file is in the same format as a complete Model description.

To add to an existing class the contents should be similar to the example code below. The class name is a class already in the model, the attribute name is the name of the new field to be added and the type describes the type of data to be stored. In the example, the `Protein` class will be extended to include a new attribute called `extraData` which will hold data as a string.

```markup
<?xml version="1.0"?>
<classes>
  <class name="Protein>" is-interface="true">
    <attribute name="extraData" type="java.lang.String"/>   
  </class>
</classes>
```

To create a new class, the `new-source_additions.xml` file should include contents similar to the example below:

```markup
<?xml version="1.0"?>
<classes>
  <class name="NewFeature" extends="SequenceFeature" is-interface="true">
    <attribute name="identifier" type="java.lang.String"/>  
    <attribute name="confidence" type="java.lang.Double"/>
  </class>
</classes>
```

The extends clause is optional and is used to inherit \(include all the attributes of\) an existing class, in this case we extend `SequenceFeature`, an InterMine class that represents any genome feature. `is-interface` should always be set to true. The attribute lines as before define the names and types of data to be stored. A new class will be created with the name `NewFeature` that extends `SequenceFeature`.

To cross reference this with another class, similar XML should be used as the example below:

```markup
<class name="NewFeature" extends="SequenceFeature" is-interface="true">
  <reference name="protein" referenced-type="Protein" reverse-reference="features"/>
</class>
```

In the example above, we create a link from NewFeature to the Protein class via the reference named protein. To complete the link, a reverse reference may be added to Protein to point back at the NewFeature, this is optional - the reference could be one-way. Here we define a collection called features, this means that for every NewFeature that references a Protein, that protein will include it in its features collection. Note that as this is a collection a Protein can link to multiple NewFeatures but NewFeature.protein is a reference so each can only link to one Protein.

The reverse entry needs to be added to Protein \(still in the same file\):

```markup
<class name="Protein" is-interface="true">
  <collection name="features"  referenced-type="NewFeature" reverse-reference="protein"/>
</class>
```

The final additions XML should look like:

```markup
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
```

If all the data you wish to load is already modelled in InterMine, then you don't need an additions file. See [Model Description](../../../data-model/model.md) for details.

### Global Additions File

If you don't want to create an additions file for each of your mine's data sources, you can also create a "global" additions file. See the "Global Additions File" section of [Model Merging](../../database-building/model-merging.md) for details on how to set this parameter.

## 5. Update Keys file

Within the `src/main/resources` directory is a file called `new-source_keys.properties`. Here we can define primary keys that will be used to integrate data from this source with any exiting objects in the database. We want to integrate genes by their `primaryIdentifier` attribute so we define that this source should use the key:

```text
# new-source_keys.properties
Gene.key_primaryidentifier=primaryIdentifier
```

See [Model Merging](../../database-building/model-merging.md)

## 6. Build your JAR and put on the classpath

Now your code is ready, compile it, build a JAR and put on the classpath with this command:

```bash
./gradlew install
```

See the "Version" section above for how to properly version your JAR.

{% hint style="info" %}
This JAR is now on your classpath. If you make changes, you will want to run this command again.
{% endhint %}

## 7. Run a build and load your data!

Once you've updated the config files, and written your parser \(if necessary\), create the database as usual. The source should now be included when building the mine.

```bash
./gradlew builddb
```

{% hint style="info" %}
Run the `clean` task before `builddb` when changing the model. `clean` removes the `build` directory which is the location of the data model. If you don't, you won't see your new data model changes!
{% endhint %}

It's also recommended that you write a unit test for your source. It saves time!

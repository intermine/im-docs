Tutorial
========

Following the steps on this page you will set up an example InterMine.
You will:

> -   Load some real data sets for Malaria (*P. falciparum*)
> -   Learn about how data integration works
> -   Deploy a webapp to query the data

::: {.note}
::: {.title}
Note
:::

See `/get-started/quick-start`{.interpreted-text role="doc"} if you are
impatient and just want to run an InterMine.
:::

Getting Started
---------------

### Software

We use [git](http://git-scm.com) to manage and distribute source code
and [gradle](http://gradle.org) as our build system. InterMine makes use
of a variety of freely available software packages. For this tutorial
you will need the following software packages installed locally and
running:

+------------+----------+--------------------------------------------+
| Software   | At least | Purpose                                    |
+============+==========+============================================+
| Git        | > 1.7    | > It is our source control software. We    |
|            |          | > use it to check out, update, manage, and |
|            |          | > distribute our source code. Note:        |
|            |          | > InterMine is available via JCenter as    |
|            |          | > executable JARs. We do not recommend     |
|            |          | > downloading the InterMine source code.   |
+------------+----------+--------------------------------------------+
| Java SDK   | > 8      | > We use Gradle as our build system and    |
|            |          | > the usage of Gradle requires an Java     |
|            |          | > Software Development Kit (Java SDK)      |
|            |          | > installation. We recommend you use       |
|            |          | > OpenJDK as it\'s probably safer moving   |
|            |          | > forward.                                 |
+------------+----------+--------------------------------------------+
| PostgreSQL | > 9.3.x  | > It is a powerful, open source            |
|            |          | > object-relational database system that   |
|            |          | > uses and extends the SQL language        |
|            |          | > combined with many features that safely  |
|            |          | > store and scale the most complicated     |
|            |          | > data workloads. We use it for our        |
|            |          | > database.                                |
+------------+----------+--------------------------------------------+
| Tomcat     | > 8.5.x  | > It is an open source implementation of   |
|            |          | > the Java Servlet, JavaServer Pages, Java |
|            |          | > Expression Language and Java WebSocket   |
|            |          | > technologies. We use it for deploying    |
|            |          | > the web application.                     |
+------------+----------+--------------------------------------------+
| Solr       | > 7.2.1  | > Solr makes it easy for programmers to    |
|            |          | > develop sophisticated, high-performance  |
|            |          | > search applications with advanced        |
|            |          | > features. We use it for its keyword      |
|            |          | > search in our search engines.            |
+------------+----------+--------------------------------------------+
| Perl       | > 5.8.8  | > Many of the build processes are carried  |
|            |          | > out by Perl programs. For this tutorial  |
|            |          | > you will not need it. You will need Perl |
|            |          | > installed on your system to build or     |
|            |          | > maintain an InterMine installation.      |
+------------+----------+--------------------------------------------+

Note: InterMine only supports installations onto Linux and Mac OS X
systems. Windows systems of any kind are not supported. We run a mixture
of Debian and Fedora servers in our data centre in Cambridge. See
`/system-requirements/software/index`{.interpreted-text role="doc"} for
configuration details.

### BioTestMine

Download the mine code from GitHub.

    $ mkdir git
    $ cd git
    ~/git $ git clone https://github.com/intermine/biotestmine

### Get rid of daemons

Gradle has helper processes enabled by default. We\'re going to disable
those by setting [-Dorg.gradle.daemon=false]{.title-ref}

    ~/git $ export GRADLE_OPTS="-Dorg.gradle.daemon=false"

### Help! Something\'s gone wrong.

If at any point you need help or have a quick (or not so quick)
question, please [get in touch](http://intermine.org/contact/)! We have
a discord server, twitter and a developer mailing list.

BioTest Mine
------------

BioTestMine is a dummy test mine we use to test out new features which
contains real (old) data for Malaria (*P. falciparum*).

To get started, change into the directory you checked out the
BiotestMine source code to and look at the sub-directories:

``` {.bash}
~/git $ cd biotestmine
~/git/biotestmine $ ls
```

  directory/file      purpose
  ------------------- ----------------------------------------------------------------------------------------------------
  /dbmodel            contains information about the data model and related configuration files
  /webapp             basic configuration for the webapp
  /data               contains a tar file with data to load
  build.gradle        The [\--stacktrace]{.title-ref} option will display complete error messages if there is a problem.
  gradle.properties   Sets system variables. Determines which version of InterMine you use.
  settings.gradle     Sets gradle projects. Do not edit.
  project.xml         Configures which data parsers are run during your build.

There is also a gradle directory ([/gradle]{.title-ref}) and executables
([gradlew, gradle.bat]{.title-ref}).

### Project.xml

The [project.xml]{.title-ref} allows you to configure which data to load
into your Mine. The file has two sections: sources and post-processing.

#### \<sources\>

The [\<source\>]{.title-ref} elements list and configure the data
sources to be loaded. A source can have a name and a type.

[type]{.title-ref}

:   Corresponds to the name of the bio-source artifact (jar) which
    includes parsers to retrieve data and information on how it will be
    integrated.

[name]{.title-ref}

:   can be anything and can be the same as [type]{.title-ref}, using a
    more specific name allows you to define specific integration keys.

[\<source\>]{.title-ref} elements can have several properties depending
on source type: [src.data.dir]{.title-ref}, [src.data.file]{.title-ref}
and [src.data.includes]{.title-ref} are all used to define locations of
files that the source should load. Other properties are used as
parameters to specific parsers.

#### \<post-processing\>

Specific operations can be performed on the Mine once data is loaded,
these are listed here as [\<post-process\>]{.title-ref} elements. We
will look at these in more detail later.

### Data to load

The biotestmine git repository includes a tar file with data to load
into BiotestMine. These are real, complete data sets for *P. falciparum*
(but very old!).

We will load genome annotation from PlasmoDB, protein data from UniProt
and GO annotation also from PlasmoDB.

See `/get-started/tutorial/test-data`{.interpreted-text role="doc"} for
details on the data.

Copy this to a local directory (your home directory is fine for this
workshop) and extract the archive:

``` {.bash}
$ cd
$ cp git/biotestmine/data/malaria-data.tar.gz .
$ tar -zxvf malaria-data.tar.gz
```

A dummy project XML file is available in the [/data/]{.title-ref}
directory. Copy it into your [biotestmine]{.title-ref} directory, then
edit [project.xml]{.title-ref} to point each source at the extracted
data, just replace [/data]{.title-ref} with [/home/username]{.title-ref}
(or on a mac [/Users/username]{.title-ref}). Do use the absolute path.

``` {.bash}
$ cd ~/git/biotestmine
$ cp ~/git/biotestmine/data/project.xml .
~/git/biotestmine $ sed -i 's/\DATA\_DIR/\/home\/username/g' project.xml
```

For example, the [uniprot-malaria]{.title-ref} source:

``` {.xml}
<sources>
  <source name="uniprot-malaria" type="uniprot">
    <property name="uniprot.organisms" value="36329"/>
    <property name="src.data.dir" location="/home/username/malaria/uniprot/"/>
  </source>
  ...
```

::: {.note}
::: {.title}
Note
:::

All file locations must be absolute not relative paths.
:::

The [project.xml]{.title-ref} file is now ready to use.

### Properties file

Configuration of local databases and tomcat deployment is kept in a
[MINE_NAME.properties]{.title-ref} file in a [.intermine]{.title-ref}
directory under your home directory. We need to set up a
[biotestmine.properties]{.title-ref} file.

If you don\'t already have a [.intermine]{.title-ref} directory in your
home directory, create one now:

``` {.bash}
$ cd
$ mkdir .intermine
```

There is a partially completed properties file for BioTestMine already.
Copy it into your [.intermine]{.title-ref} directory:

``` {.bash}
$ cd
$ cp git/biotestmine/data/biotestmine.properties .intermine/
```

Update this properties file with your postgres server location, username
and password information for the two databases you just created. The
rest of the information is needed for the webapp and will be updated
later.

For the moment you need to change [PSQL_USER]{.title-ref} and
[PSQL_PWD]{.title-ref} in the [db.production]{.title-ref} and
[db.common-tgt-items]{.title-ref} properties.

``` {.properties}
# Access to the postgres database to build into and access from the webapp                              
db.production.datasource.serverName=localhost
# port: uncomment the next line if use different port other than 5432
# db.production.datasource.port=PORT_NUMBER
db.production.datasource.databaseName=biotestmine
db.production.datasource.user=PSQL_USER
db.production.datasource.password=PSQL_PWD
```

If you don\'t have a password for your postgres account you can leave
[password]{.title-ref} blank.

### Create databases

Finally, we need to create [biotestmine]{.title-ref} and
[items-biotestmine]{.title-ref} postgres databases as specified in the
[biotestmine.properties]{.title-ref} file:

``` {.bash}
$ createdb biotestmine
$ createdb items-biotestmine
```

New postgres databases default to [UTF-8]{.title-ref} as the character
encoding. This will work with InterMine but performance is better with
[SQL_ASCII]{.title-ref}.

The Data Model
--------------

Now we\'re ready to set up a database schema and load some data into our
BioTestMine, first some information on how data models are defined in
InterMine.

### Defining the model

InterMine uses an object-oriented data model, classes in the model and
relationships between them are defined in an XML file. Depending on
which data types you include you will need different classes and fields
in the model, so the model is generated from a core model XML file and
any number of [additions]{.title-ref} files. These additions files can
define extra classes and fields to be added to the model.

-   Elements of the model are represented by Java classes and references
    between them.
-   These Java classes map automatically to tables in the database
    schema.
-   The object model is defined as an XML file, that defines
    [classes]{.title-ref}, their [attributes]{.title-ref} and
    [references]{.title-ref} between classes.
-   The Java classes and database schema are automatically generated
    from an XML file.

The model is generated from a core model XML file and any number of
additions files defined in the
[dbmodel/build.gradle](https://github.com/intermine/biotestmine/blob/master/dbmodel/build.gradle#L37)
file.

#### core.xml

The core InterMine data model is defined in
[core.xml](https://github.com/intermine/intermine/blob/master/bio/model/core.xml)
file.

Note the fields defined for \`Protein\`:

``` {.xml}
<class name="Protein" extends="BioEntity" is-interface="true">
  <attribute name="md5checksum" type="java.lang.String"/>
  <attribute name="primaryAccession" type="java.lang.String"/>
  <attribute name="length" type="java.lang.Integer"/>
  <attribute name="molecularWeight" type="java.lang.Double"/>
  <reference name="sequence" referenced-type="Sequence"/>
  <collection name="genes" referenced-type="Gene" reverse-reference="proteins"/>
</class>
```

Protein is a subclass of [BioEntity]{.title-ref}, defined by
[extends=\"BioEntity\"]{.title-ref}. The [Protein]{.title-ref} class
will therefore also inherit all fields of [BioEntity]{.title-ref}.

``` {.xml}
<class name="BioEntity" is-interface="true">
  <attribute name="primaryIdentifier" type="java.lang.String"/>
  <attribute name="secondaryIdentifier" type="java.lang.String"/>
...
```

#### Sequence Ontology

``` {.bash}
mineDBModelConfig {
  modelName = "genomic"
  extraModelsStart = "so_additions.xml genomic_additions.xml"
  extraModelsEnd = ""
}
```

The first file merged into the core model is the
[so_additions.xml]{.title-ref} file. This XML file is generated in the
[dbmodel/build]{.title-ref} directory from terms listed in the
[so_terms]{.title-ref} file, as configured in the
[dbmodel/build.gradle](https://github.com/intermine/biotestmine/blob/master/dbmodel/build.gradle#L31)
file.

``` {.bash}
dbModelConfig {
  soTermListFilePath = "dbmodel/resources/so_terms"
  soAdditionFilePath = "dbmodel/build/so_additions.xml"
}
```

The build system creates classes corresponding to the Sequence Ontology
terms.

#### Additions files

The model is then combined with any extra classes and fields defined in
the sources to integrate, those listed as [\<source\>]{.title-ref}
elements in [project.xml]{.title-ref}. Look at the [additions
file](https://github.com/intermine/intermine/blob/master/bio/sources/uniprot/src/main/resources/uniprot_additions.xml)
for the UniProt source, for example. This defines extra fields for the
[Protein]{.title-ref} class which will be added to those from the core
model.

### Creating a database

Now run the gradle task to merge all the model components, generate Java
classes and create the database schema:

``` {.bash}
# creates the empty database tables
~/git/biotestmine $ ./gradlew buildDB
```

The clean task is necessary when you have run the task before, it
removes the [build]{.title-ref} directory and any previously generated
models.

This task has done several things:

1.  Merged the core model with other model additions and created a new
    XML file:

``` {.bash}
~/git/biotestmine $ less dbmodel/build/resources/main/genomic_model.xml 
```

Look for the [Protein]{.title-ref} class, you can see it combines fields
from the core model and the UniProt additions file.

2.  The [so_additions.xml]{.title-ref} file has also been created using
    the sequence ontology terms in \`so_term\`:

``` {.bash}
~/git/biotestmine $ less dbmodel/build/so_additions.xml 
```

Each term from [so_term]{.title-ref} was added to the model, according
to the sequence ontology.

3.  Generated and compiled a Java class for each of the
    [\<class\>]{.title-ref} elements in the file. For example
    \`Protein.java\`:

``` {.bash}
~/git/biotestmine $ less dbmodel/build/gen/org/intermine/model/bio/Protein.java
```

Each of the fields has appropriate getters and setters generated for it,
note that these are [interfaces]{.title-ref} and are turned into actual
classes dynamically at runtime - this is how the model copes with
multiple inheritance.

4.  Automatically created database tables in the postgres database
    specified in [biotestmine.properties]{.title-ref} as
    [db.production]{.title-ref} - in our case [biotestmine]{.title-ref}.
    Log into this database and list the tables and the columns in the
    protein table:

``` {.bash}
$ psql biotestmine
biotestmine=#  \d
biotestmine=#  \d protein
```

The different elements of the model XML file are handled as follows:

[attributes]{.title-ref}

:   there is one column for each attribute of [Protein]{.title-ref} -
    e.g. [primaryIdentifer]{.title-ref} and [length]{.title-ref}.

[references]{.title-ref}

:   references to other classes are foreign keys to another table - e.g.
    [Protein]{.title-ref} has a reference called [organism]{.title-ref}
    to the [Organism]{.title-ref} class so in the database the
    [protein]{.title-ref} table has a column [organismid]{.title-ref}
    which would contain an id that appears in the [organism]{.title-ref}
    table.

[collections]{.title-ref}

:   indirection tables are created for many-to-many collections - e.g.
    [Protein]{.title-ref} has a collection of [Gene]{.title-ref} objects
    so an indirection table called [genesproteins]{.title-ref} is
    created.

This has also created necessary indexes on the tables:

``` {.bash}
biotestmine=#  \d genesproteins
```

::: {.warning}
::: {.title}
Warning
:::

Running [buildDB]{.title-ref} will destroy any existing data loaded in
the biotestmine database and re-create all the tables.
:::

The model XML file is stored in the database once created, this and some
other configuration files are held in the
[intermine_metadata]{.title-ref} table which has [key]{.title-ref} and
[value]{.title-ref} columns:

``` {.bash}
biotestmine=# select key from intermine_metadata;
```

Loading Data
------------

Now we have the correct data model and the correct empty tables in the
database. We can now run several data parsers to load our data into our
database.

For this tutorial we will run several data integration and
post-processing steps manually. This is a good way to learn how the
system works and to test individual stages. For running actual builds
there is a [project_build]{.title-ref} script that will run all steps
specified in [project.xml]{.title-ref} automatically. We will cover this
later.

### Loading data from a source

Loading of data is done by running the [integrate]{.title-ref} gradle
task.

``` {.bash}
# load the uniprot data source
~/git/biotestmine $ ./gradlew integrate -Psource=uniprot-malaria --stacktrace
```

                  purpose
  --------------- ----------------------------------------------------------------------------------------------------
  ./gradlew       Use the provided gradle wrapper so that we can be sure everyone is using the same version.
  integrate       Gradle task to run the specified data source
  -Psource=       Data source to run. Source name should match the value in your project XML file
  \--stacktrace   The [\--stacktrace]{.title-ref} option will display complete error messages if there is a problem.

This will take a couple of minutes to complete, the command runs the
following steps:

1.  Checks that a source with name [uniprot-malaria]{.title-ref} exists
    in [project.xml]{.title-ref}
2.  Reads the UniProt XML files at the location specified by
    [src.data.dir]{.title-ref} in the [project.xml]{.title-ref} file
3.  Runs the parser included in the UniProt JAR. The JARs for every core
    InterMine data source are published in
    [JCenter](https://jcenter.bintray.com/org/intermine/). The build
    looks for jar with the name matching
    \"bio-source-\<source-type\>-\<version\>.jar\", e.g.
    [bio-source-uniprot-2.0.0.jar]{.title-ref}. Maven will automatically
    download the correct JARs for you.
4.  The UniProt data parser reads the original XML and creates
    [Items]{.title-ref} which are metadata representations of the
    objects that will be loaded into the biotestmine database. These
    items are stored in an intermediate [items]{.title-ref} database
    (more about [Items]{.title-ref} later).
5.  Reads from the [items]{.title-ref} database, converts items to
    objects and loads them into the biotestmine database.

This should complete after a couple of minutes. Now that the data has
loaded, log into the database and view the contents of the protein
table:

``` {.bash}
$ psql biotestmine
biotestmine#  select count(*) from protein;
```

And see the first few rows of data:

``` {.bash}
biotestmine#  select * from protein limit 5;
```

### Object relational mapping

InterMine works with objects, objects are loaded into the production
system and queries return lists of objects. These objects are persisted
to a relational database. Internal InterMine code (the ObjectStore)
handles the storage and retrieval of objects from the database
automatically. By using an object model InterMine queries benefit from
inheritance, for example the [Gene]{.title-ref} and [Exon]{.title-ref}
classes are both subclasses of [SequenceFeature]{.title-ref}. When
querying for SequenceFeatures (representing any genome feature) both
Genes and Exons will be returned automatically.

We can see how inheritance is represented in the database:

-   One table is created for each class in the data model.
-   Where one class inherits from another, entries are written to both
    tables. For example:

``` {.bash}
biotestmine#  select * from gene limit 5;
```

The same rows appear in the [sequencefeature]{.title-ref} table:

``` {.bash}
biotestmine#  select * from sequencefeature limit 5;
```

All classes in the object model inherit from
[InterMineObject]{.title-ref}. Querying the
[intermineobject]{.title-ref} table in the database is a useful way to
find the total number of objects in a Mine:

``` {.bash}
biotestmine#  select count(*) from intermineobject;
```

All tables include an [id]{.title-ref} column for unique ids and a
[class]{.title-ref} column with the actual class of that object.
Querying the [class]{.title-ref} column of [intermineobject]{.title-ref}
you can find the counts of different objects in a Mine:

``` {.bash}
biotestmine#  select class, count(*) from intermineobject group by class;
```

A technical detail: for speed when retrieving objects and to deal with
inheritance correctly (e.g. to ensure a [Gene]{.title-ref} object with
all of its fields is returned even if the query was on the
[SequenceFeature]{.title-ref} class) a serialised copy of each object is
stored in the [intermineobject]{.title-ref} table. When queries are run
by the ObjectStore they actually return the ids of objects - these
objects are may already be in a cache, if not the are retrieved from the
[intermineobject]{.title-ref} table.

Loading Genome Data from GFF3 and FASTA
---------------------------------------

We will load genome annotation data for *P. falciparum* from PlasmoDB

-   genes, mRNAs, exons and their chromosome locations - in GFF3 format
-   chromosome sequences - in FASTA format

### Data integration

Note that genes from the GFF3 file will have the same
[primaryIdentifier]{.title-ref} as those already loaded from UniProt.
These will merge in the database such that there is only one copy of
each gene with information from both data sources. We will load the
genome data then look at how data integration in InterMine works.

First, look at the information currently loaded for gene
[PFL1385c]{.title-ref} from UniProt:

``` {.sql}
biotestmine=#  select * from gene where primaryIdentifier = 'PFL1385c';
```

### GFF3 files

[GFF3](https://github.com/The-Sequence-Ontology/Specifications/blob/master/gff3.md)
is a standard format use to represent genome features and their
locations, each line represents one feature and has nine tab-delimited
columns:

``` {.properties}
MAL1    ApiDB   gene    183057  184457  .       -       .       ID=gene.46311;description=hypothetical%20protein;Name=PFA0210c
MAL1    ApiDB   mRNA    183057  184457  .       +       .       ID=mRNA.46312;Parent=gene.46311
MAL1    ApiDB   exon    183057  184457  .       -       0       ID=exon.46313;Parent=mRNA.46312
```

col 1: \"seqid\"

:   an identifier for a \'landmark\' on which the current feature is
    locatated, in this case \'MAL1\', a \'\'P. falciparum\'\'
    chromosome.

col 2: \"source\"

:   the database or algorithm that provided the feature

col 3: \"type\"

:   a valid Sequence Ontology term defining the feature type - here
    [gene]{.title-ref} or [mRNA]{.title-ref}

col 4 & 5: \"start\" and \"end\"

:   coordinates of the feature on the landmark in col 1

col 6: \"score\"

:   an optional score, used if the feature has been generated by an
    algorithm

col 7: \"strand\"

:   \'+\' or \'-\' to indicate the strand the feature is on

col 8: \"phase\"

:   for [CDS]{.title-ref} features to show where the feature begins with
    reference to the reading frame

col 9: \"attributes\"

:   custom attributes to describe the feature, these are name/value
    pairs separated by \';\'. Some attributes have predefined meanings,
    relevant here:

-   [ID]{.title-ref} - identifier of feature, unique in scope of the
    GFF3 file
-   [Name]{.title-ref} - a display name for the feature
-   [Parent]{.title-ref} - the [ID]{.title-ref} of another feature in
    the file that is a parent of this one. In our example the
    [gene]{.title-ref} is a [Parent]{.title-ref} of the
    [mRNA]{.title-ref}.

A dot means there is no value provided for the column.

The files we are loading are from PlasmoDB and contain
[gene]{.title-ref}, [exon]{.title-ref} and [mRNA]{.title-ref} features,
there is one file per chromosome. Look at an example:

``` {.bash}
$ less /data/malaria/genome/gff/MAL1.gff3
```

### The GFF3 source

InterMine includes a parser to load valid GFF3 files. The creation of
features, sequence features, locations and standard attributes is taken
care of automatically.

Other [gff3]{.title-ref} properties can be configured in the
[project.xml]{.title-ref} The properties set for
[malaria-gff]{.title-ref} are:

gff3.seqClsName = Chromosome

:   the ids in the first column represent [Chromosome]{.title-ref}
    objects, e.g. MAL1

gff3.taxonId = 36329

:   taxon id of malaria

gff3.dataSourceName = PlasmoDB

:   the data source for features and their identifiers, this is used for
    the DataSet (evidence) and synonyms.

gff3.seqDataSourceName = PlasmoDB

:   the source of the seqids (chromosomes) is sometimes different to the
    features described

gff3.dataSetTitle = PlasmoDB P. falciparum genome

:   a DataSet object is created as evidence for the features, it is
    linked to a DataSource (PlasmoDB)

You can also configure GFF properties in the gff.config file. See
`/database/data-sources/library/gff`{.interpreted-text role="doc"} for
details.

To deal with any specific attributes or perform custom operations on
each feature you can write a handler in Java which will get called when
reading each line of GFF. For malaria gff we need a handler to switch
which fields from the file are set as [primaryIdentifier]{.title-ref}
and [symbol]{.title-ref}/[secondaryIdentifier]{.title-ref} in the
features created. This is to match the identifiers from UniProt, it is
quite a common issue when integrating from multiple data sources.

From the example above, by default:
[ID=gene.46311;description=hypothetical%20protein;Name=PFA0210c]{.title-ref}
would make [Gene.primaryIdentifier]{.title-ref} be
[gene.46311]{.title-ref} and [Gene.symbol]{.title-ref} be
[PFA0210c]{.title-ref}. We need [PFA0210c]{.title-ref} to be the
[primaryIdentifier]{.title-ref}.

Look at the [malaria-gff.properties]{.title-ref} file - there are two
properties of interest:

``` {.properties}
# set the source type to be gff
have.file.gff=true

# specify a Java class to be called on each row of the gff file to cope with attributes
gff3.handlerClassName = org.intermine.bio.dataconversion.MalariaGFF3RecordHandler
```

The property file has specified a Java class to process the GFF file,
[MalariaGFF3RecordHandler](https://github.com/intermine/intermine/blob/master/bio/sources/example-sources/malaria-gff/src/main/java/org/intermine/bio/dataconversion/MalariaGFF3RecordHandler.java).
This code changes which fields the [ID]{.title-ref} and
[Name]{.title-ref} attributes from the GFF file have been assigned to.

### Loading GFF3 data

Now execute the [malaria-gff]{.title-ref} source by running this
command:

``` {.bash}
# load the GFF data
~/git/biotestmine $ ./gradlew integrate -Psource=malaria-gff --stacktrace
```

This will take a few minutes to run. Note that this time we don\'t run
[buildDB]{.title-ref} as we are loading this data into the same database
as UniProt. As before you can run a query to see how many objects of
each class are loaded:

``` {.bash}
$ psql biotestmine
biotestmine#  select class, count(*) from intermineobject group by class;
```

### FASTA files

FASTA is a minimal format for representing sequence data. Files comprise
a header with some identifier information preceded by \'\>\' and a
sequence. At present the InterMine FASTA parser loads just the first
entry in header after [\>]{.title-ref} and assigns it to be an attribute
of the feature created. Here we will load one FASTA file for each
malaria chromosome. Look at an example of the files we will load:

``` {.bash}
$ less /data/malaria/genome/fasta/MAL1.fasta
```

The type of feature created is defined by a property in
[project.xml]{.title-ref}, the attribute set defaults to
[primaryIdentifier]{.title-ref} but can be changed with the
[fasta.classAttribute]{.title-ref} property. The following properties
are defined in [project.xml]{.title-ref} for
\`malaria-chromosome-fasta\`:

[fasta.className = org.intermine.model.bio.Chromosome]{.title-ref}

:   the type of feature that each sequence is for

[fasta.dataSourceName = PlasmoDB]{.title-ref}

:   the source of identifiers to be created

[fasta.dataSetTitle = PlasmoDB chromosome sequence]{.title-ref}

:   a DataSet object is created as evidence

[fasta.taxonId = 36329]{.title-ref}

:   the organism id for malaria

[fasta.includes = MAL\*.fasta]{.title-ref}

:   files to process

This will create features of the class [Chromosome]{.title-ref} with
[primaryIdentifier]{.title-ref} set and the
[Chromosome.sequence]{.title-ref} reference set to a
[Sequence]{.title-ref} object. Also created are a [DataSet]{.title-ref}
and [DataSource]{.title-ref} as evidence.

### Loading FASTA data

Now run the [malaria-chromosome-fasta]{.title-ref} source by running
this command:

``` {.bash}
# load FASTA data
~/git/biotestmine $ ./gradlew integrate -Psource=malaria-chromosome-fasta --stacktrace
```

This has integrated the chromosome objects with those already in the
database. In the next step we will look at how this data integration
works.

Data Integration
----------------

### Data integration in BioTestMine

The sources [uniprot-malaria]{.title-ref} and [malaria-gff]{.title-ref}
have both loaded information about the same genes. Before loading genome
data we ran a query to look at the information UniProt provided about
the gene \"PFL1385c\":

``` {.bash}
biotestmine=# select id, primaryidentifier, secondaryidentifier, symbol, length , chromosomeid, chromosomelocationid, organismid from gene where primaryIdentifier = 'PFL1385c';
    id    | primaryidentifier | secondaryidentifier | symbol | length | chromosomeid | chromosomelocationid | organismid 
----------+-------------------+---------------------+--------+--------+--------------+----------------------+------------
83000626 | PFL1385c          |                     | ABRA   |        |              |                      |   83000003
(1 row)
```

Which showed that UniProt provided [primaryIdentifier]{.title-ref} and
[symbol]{.title-ref} attributes and set the [organism]{.title-ref}
reference. The [id]{.title-ref} was set automatically by the ObjectStore
and will be different each time you build your Mine.

Running the same query after [malaria-gff]{.title-ref} is added shows
that more fields have been filled in for same gene and that it has kept
the same id:

``` {.bash}
biotestmine=# select id, primaryidentifier, secondaryidentifier, symbol, length , chromosomeid, chromosomelocationid, organismid from gene where primaryIdentifier = 'PFL1385c';
    id    | primaryidentifier | secondaryidentifier | symbol | length | chromosomeid | chromosomelocationid | organismid 
----------+-------------------+---------------------+--------+--------+--------------+----------------------+------------
83000626 | PFL1385c          | gene.33449          | ABRA   |   2232 |     84017653 |             84018828 |   83000003
(1 row)
```

This means that when the second source was loaded the integration code
was able to identify that an equivalent gene already existed and merged
the values for each source, the equivalence was based on
[primaryIdentifier]{.title-ref} as this was the field that the two
sources had in common.

Note that [malaria-gff]{.title-ref} does not include a value for
[symbol]{.title-ref} but it did not write over the [symbol]{.title-ref}
provided by UniProt, actual values always take precedence over null
values (unless configured otherwise).

Now look at the organism table:

``` {.bash}
biotestmine=# select * from organism;
genus | taxonid | species | abbreviation |    id    | shortname | name |               class                
-------+---------+---------+--------------+----------+-----------+------+------------------------------------
      |   36329 |         |              | 83000003 |           |      | org.intermine.model.genomic.Organism
(1 row)
```

Three sources have been loaded so far that all included the organism
with [taxonId]{.title-ref} 36329, and more importantly they included
objects that reference the organism. There is still only one row in the
organism table so the data from three sources has merged, in this case
[taxonId]{.title-ref} was the field used to define equivalence.

### How data integration works

Data integration works by defining keys for each class of object to
describe fields that can be used to define equivalence for objects of
that class. For the examples above:

-   [primaryIdentifier]{.title-ref} was used as a key for
    [Gene]{.title-ref}
-   [taxonId]{.title-ref} was used as a key for [Organism]{.title-ref}

For each [Gene]{.title-ref} object loaded by [malaria-gff]{.title-ref} a
query was performed in the [biotestmine]{.title-ref} database to find
any existing [Gene]{.title-ref} objects with the same
[primaryIdentifier]{.title-ref}. If any were found fields from both
objects were merged and the resulting object stored.

Many performance optimisation steps are applied to this process. We
don\'t actually run a query for each object loaded, requests are batched
and queries can be avoided completely if the system can work out no
integration will be needed.

We may also load data from some other source that provides information
about genes but doesn\'t use the identifier scheme we have chosen for
[primaryIdentifier]{.title-ref} (in our example [PFL1385c]{.title-ref}).
Instead it only knows about the [symbol]{.title-ref}
([ABRA]{.title-ref}), in that case we would want that source to use the
[symbol]{.title-ref} to define equivalence for [Gene]{.title-ref}.

Important points:

-   A [key]{.title-ref} defines a field or fields of a class that can be
    used to search for equivalent objects
-   Multiple primary keys can be defined for a class, sources can use
    different keys for a class if they provide different identifiers
-   One source can use multiple primary keys for a class if the objects
    of that class don\'t consistently have the same identifier type
-   [null]{.title-ref} - if a source has no value for a field that is
    defined as a primary key then the key is not used and the data is
    loaded without being integrated.

### Integration Keys in BioTestMine

The keys used by each source are set in the source\'s
[resources]{.title-ref} directory.

-   [uniprot-malaria](https://github.com/intermine/intermine/blob/master/bio/sources/uniprot/src/main/resources/uniprot_keys.properties)
-   [malaria-gff](https://github.com/intermine/intermine/blob/master/bio/sources/example-sources/malaria-gff/src/main/resources/malaria-gff_keys.properties)

The key on [Gene.primaryIdentifier]{.title-ref} is defined in both
sources, that means that the same final result would have been achieved
regardless of the order in which the two sources were loaded.

These [\_keys.properties]{.title-ref} files define keys in the format:

``` {.properties}
Class.name_of_key = field1, field2
```

The [name_of_key]{.title-ref} can be any string but you must use
different names if defining more than one key for the same class, for
example in [uniprot_keys.properties]{.title-ref} there are two different
keys defined for \`Gene\`:

``` {.properties}
Gene.key_primaryidentifier = primaryIdentifier
Gene.key_secondaryidentifier = secondaryIdentifier
```

It is better to use common names for identical keys between sources as
this will help avoid duplicating database indexes. Each key should list
one or more fields that can be a combination of [attributes]{.title-ref}
of the class specified or [references]{.title-ref} to other classes, in
this case there should usually be a key defined for the referenced class
as well.

### The [tracker]{.title-ref} table

A special [tracker]{.title-ref} table is created in the target database
by the data integration system. This tracks which sources have loaded
data for each field of each object. The data is used along with
priorities configuration when merging objects but is also useful to view
where objects have come from.

-   Look at the columns in the tracker table, [objectid]{.title-ref}
    references an object from some other table
-   Query tracker information for the objects in the examples above:

``` {.sql}
select distinct sourcename from tracker, gene where objectid = id and primaryidentifier = 'PFL1385c';

select objectid, sourcename, fieldname, version from tracker, gene where objectid = id and primaryidentifier = 'PFL1385c';

select distinct sourcename from tracker, organism where objectid = id;
```

Updating Organism and Publication Information
---------------------------------------------

Organisms and publications in InterMine are loaded by their taxon id and
PubMed id respectively. The [entrez-organism]{.title-ref} and
[update-publications]{.title-ref} sources can be run at the end of the
build to examine the ids loaded, fetch details via the NCBI Entrez web
service and add those details to the Mine.

### Fetching organism details

You will have noticed that in previous sources and in
[project.xml]{.title-ref} we have referred to organisms by their NCBI
Taxonomy id. These are numerical ids assigned to each species. We use
these for convenience in integrating data, the taxon id is a good unique
identifier for organisms whereas names can come in many different
formats: for example in fly data sources we see: [Drosophila
melanogaster]{.title-ref}, [D. melanogaster]{.title-ref}, Dmel, DM, etc.

Looking at the [organism]{.title-ref} table in the database you will see
that the only column filled in is \`taxonid\`:

``` {.bash}
$ psql biotestmine
biotestmine#  select * from organism;
```

From the root [biotestmine]{.title-ref} directory run the
[entrez-organism]{.title-ref} source:

``` {.bash}
# load organism data
~/git/biotestmine $ ./gradlew integrate -Psource=entrez-organism --stacktrace
```

This should only take a few seconds. This source does the following:

-   runs a query in the production database for all of the taxon ids
-   creates an NCBI Entrez web service request to fetch details of those
    organisms
-   converts the data returned from Entrez into a temporary Items XML
    file
-   loads the Items XML file into the production database

Now run the same query in the production database, you should see
details for \'\'P. falciparum\'\' added:

``` {.psql}
$ psql biotestmine
biotestmine#  select * from organism;
```

As this source depends on organism data previously loaded it should be
one of the last sources run and should appear at the end of
[\<sources\>]{.title-ref} in [project.xml]{.title-ref}.

### Fetching publication details

Publications are even more likely to be cited in different formats and
are prone to errors in their description. We will often load data
referring to the same publication from multiple sources and need to
ensure those publications are integrated correctly. Hence we load only
the PubMed id and fetch the details from the NCBI Entrez web service as
above.

Several InterMine sources load publications:

``` {.sql}
biotestmine#  select count(*) from publication;
biotestmine#  select * from publication limit 5;
```

Now run the [update-publications]{.title-ref} source to fill in the
details:

``` {.bash}
~/git/biotestmine $ ./gradlew integrate -Psource=update-publications --stacktrace
```

As there are often large numbers of publications, they are retrieved in
batches from the web service.

Now details will have been added to the [publication]{.title-ref} table:

``` {.psql}
biotestmine#  select * from publication where title is not null limit 5;
```

As this source depends on publication data previously loaded, it should
be one of the last sources run and should appear at the end of
[\<sources\>]{.title-ref} in [project.xml]{.title-ref}.

Post Processing
---------------

Post-processing steps are run after all data is loaded, they are
specified as [\<post-process\>]{.title-ref} elements in
[project.xml]{.title-ref}.

Some of these can only be run after data from multiple sources are
loaded. For example, for the Malaria genome information we load features
and their locations on chromosomes from [malaria-gff]{.title-ref} but
the sequences of chromosomes from
[malaria-chromosome-fasta]{.title-ref}. These are loaded independently
and the [Chromosome]{.title-ref} objects from each are integrated,
neither of these on their own could set the sequence of each
[Exon]{.title-ref}. However, now they are both loaded the
[transfer-sequences]{.title-ref} post-process can calculate and set the
sequences for all features located on a [Chromosome]{.title-ref} for
which the sequence is known.

Some post-process steps are used to homogenize data from different
sources or fill in shortcuts in the data model to improve usability -
e.g. [create-references]{.title-ref}.

Finally, there are post-process operations that create summary
information to be used by the web application:
[summarise-objectstore]{.title-ref}, [create-search-index]{.title-ref}
and [create-autocomplete-indexes]{.title-ref}.

### BioTestMine Post Processing

The following [\<post-process\>]{.title-ref} targets are included in the
BioTestMine [project.xml]{.title-ref}.

Run queries listed here before and after running the post-processing to
see examples of what each step does.

#### [create-references]{.title-ref}

This fills in some shortcut references in the data model to make
querying easier. For example, [Gene]{.title-ref} has a collection of
[transcripts]{.title-ref} and [Transcript]{.title-ref} has a collection
of [exons]{.title-ref}. [create-references]{.title-ref} will follow
these collections and create a [gene]{.title-ref} reference in
[Exon]{.title-ref} and the corresponding [exons]{.title-ref} collection
in [Gene]{.title-ref}.

``` {.sql}
biotestmine#  select * from exon limit 5;
```

The empty [geneid]{.title-ref} column will be filled in representing the
reference to gene.

Execute the [create-references]{.title-ref} postprocess by running this
command:

``` {.bash}
# execute create-references postprocess
~/git/biotestmine $ ./gradlew postprocess -Pprocess=create-references
```

#### [transfer-sequences]{.title-ref}

The sequence for chromosomes is loaded by
[malaria-chromosome-fasta]{.title-ref} but no sequence is set for the
features located on them. This step reads the locations of features,
calculates and stores their sequence and sets the
[sequenceid]{.title-ref} column. The [sequenceid]{.title-ref} column for
this exon is empty:

``` {.sql}
biotestmine# select * from exon where primaryidentifier = 'exon.32017';
```

Execute the [transfer-sequences]{.title-ref} postprocess by running this
command:

``` {.bash}
# execute transfer-sequences postprocess
~/git/biotestmine $ ./gradlew postprocess -Pprocess=transfer-sequences
```

After running [transfer-sequences]{.title-ref} the
[sequenceid]{.title-ref} column is filled in.

#### [do-sources]{.title-ref}

Each source can also provide code to execute post-process steps if
required. This command loops through all of the sources and checks
whether there are any post-processing steps configured. There aren\'t
any for the sources we are using for BioTestMine but you should always
include the [do-sources]{.title-ref} element.

#### [summarise-objectstore]{.title-ref}, [create-search-index]{.title-ref} & [create-autocomplete-index]{.title-ref}

These generate summary data and search indexes used by the web
application, see `/webapp/keyword-search/index`{.interpreted-text
role="doc"} for details.

Execute the [summarise-objectstore]{.title-ref} postprocess by running
this command:

``` {.bash}
# execute transfer-sequences postprocess
~/git/biotestmine $ ./gradlew postprocess -Pprocess=summarise-objectstore
```

You must have Solr installed and running for the indexes to be populated
correctly.

**Install SOLR**

Download [Solr binary
package](http://archive.apache.org/dist/lucene/solr/7.2.1/) and extract
it to any place you like. Inside [/solr-7.2.1]{.title-ref} directory
start the server with this command:

``` {.bash}
# Starts the server instance on port 8983
solr-7.2.1 $ ./bin/solr start
```

**Initialising Search Indexes**

To create a Intermine collection for search process, run this command
inside the solr directory.

``` {.bash}
# Initialises the search index
solr-7.2.1 $ ./bin/solr create -c biotestmine-search
```

To create a Intermine collection for autocomplete process, run this
command inside the solr directory.

``` {.bash}
# Initaliases the autocomplete index
solr-7.2.1 $ ./bin/solr create -c biotestmine-autocomplete
```

These are empty search indexes that will be populated by the
[create-search-index]{.title-ref} &
[create-autocomplete-index]{.title-ref} postprocesses.

See `/system-requirements/software/solr`{.interpreted-text role="doc"}
for details.

Execute the [create-search-index]{.title-ref} and
[create-autocomplete-index]{.title-ref} postprocesses by running these
commands:

``` {.bash}
# execute create-search-index and create-autocomplete-index postprocesse
~/git/biotestmine $ ./gradlew postprocess -Pprocess=create-search-index
~/git/biotestmine $ ./gradlew postprocess -Pprocess=create-autocomplete-index
```

Building a Mine with a Perl script
----------------------------------

So far we have created databases, integrated data and run
post-processing with individual gradle tasks. Alternatively InterMine
has a Perl program called [project_build]{.title-ref} that reads the
[project.xml]{.title-ref} definition and runs all of the steps in
sequence. The script has the option of creating snapshots during the
build at specified checkpoints.

### Build complete BioTestMine

To build BioTestMine using the [project_build]{.title-ref} script, first
download the script:

``` {.bash}
# download the script
~/git/biotestmine $ wget https://raw.githubusercontent.com/intermine/intermine-scripts/master/project_build
# make executable
~/git/biotestmine $ chmod +x project_build
```

Run the [project_build]{.title-ref} script from your
[biotestmine]{.title-ref} directory:

``` {.bash}
~/git/biotestmine $ ./project_build -b -v localhost ~/biotestmine-dump
```

This will take \~15-30mins to complete.

::: {.note}
::: {.title}
Note
:::

If you encounter an \"OutOfMemoryError\", you should set your
\$GRADLE_OPTS variable, see
`/support/troubleshooting-tips`{.interpreted-text role="doc"}
:::

Deploying the web application
-----------------------------

You can deploy a web application against your newly built database.

### Configure

In the [\~/.intermine]{.title-ref} directory, update the webapp
properties in your biotestmine.properties file. Update the following
properties:

-   tomcat username and password
-   superuser username and password

### UserProfile

The userprofile database stores all user-related information such as
username and password, tags, queries, lists and templates. To build the
userprofile database:

1.  Configure

Update your biotestmine.properties file with correct information for the
[db.userprofile-production]{.title-ref} database:

``` {.properties}
db.userprofile-production.datasource.serverName=DB_SERVER
db.userprofile-production.datasource.databaseName=userprofile-biotestmine
db.userprofile-production.datasource.user=USER_NAME
db.userprofile-production.datasource.password=USER_PASSWORD
```

2.  Create the empty database:

``` {.bash}
$ createdb userprofile-biotestmine
```

3.  Build the database:

``` {.bash}
# creates the empty tables
~/git/biotestmine $ ./gradlew buildUserDB
```

You only need to build the userprofile database once.

::: {.warning}
::: {.title}
Warning
:::

The buildDB and buildUserDB commands rebuild the database and thus will
delete any data.
:::

### Deploying the webapp

Before deploying the biotestmine webapp, you need to configure tomcat.
See `/system-requirements/software/tomcat`{.interpreted-text role="doc"}
for configuration details.

Run the following command to deploy your webapp:

``` {.bash}
# deploy the webapp (tomcat must be running)
~/git/biotestmine $ ./gradlew cargoDeployRemote
```

If you make changes, redeploy your webapp with this command:

``` {.bash}
# REdeploy the webapp (tomcat must be running)
~/git/biotestmine $ ./gradlew cargoReDeployRemote
```

### Using the webapp

Navigate to <http://localhost:8080/biotestmine> to view your webapp. The
path to your webapp is the [webapp.path]{.title-ref} value set in
biotestmine.properties.

::: {.topic}
**Next**

Now that you have a database and a working webapp, you\'ll want to know
how to add your own logo, pick a colour scheme, modify how data is
displayed etc. Our `webapp tutorial <webapp>`{.interpreted-text
role="doc"} is a detailed guide on how to customise all parts of the
InterMine web application.
:::

Help
----

### Gradle

Anytime you run [./gradlew]{.title-ref} and something bad happens, add
the [\--stacktrace]{.title-ref} or [\--debug]{.title-ref} options.

This will give you more detailed output and hopefully a more helpful
error message.

### Logs

If the error occurs while you are integrating data, the error message
will be in the [intermine.log]{.title-ref} file in the directory you are
in.

If the error occurs while you are browsing your webapp, the error
message will be located in the Tomcat logs: [\$TOMCAT/logs]{.title-ref}.

### Contact us!

Please [contact us](http://intermine.org/contact/) if you run into
problems. We have a discord server, twitter and a developer mailing
list.

::: {.index}
tutorial, logs, userprofile, malariamine, biotestmine, data integration,
keys, primary keys, priority conflicts, project XML, FASTA, GFF3, data
integration, UniProt, publications, build-db, creating a database
:::

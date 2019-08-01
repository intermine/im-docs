Upgrading InterMine
======================

See `our blog <https://intermineorg.wordpress.com/category/release-notes/>`_ for details on each of the InterMine releases. You can view the `release notes <https://github.com/intermine/intermine/releases>`_ and associated tickets on GitHub too.

Upgrade Instructions
---------------------

For non-disruptive releases, you can upgrade your mine by incrementing your version number in your mine's `gradle.properties` file:

 .. code-block:: guess

	# example -- flymine's gradle.properties
	systemProp.imVersion=4.0.0
	systemProp.bioVersion=4.0.0

To get patch updates automatically, use the plus (+) notation:

 .. code-block:: guess

	# example -- flymine's gradle.properties
	systemProp.imVersion=4.0.+
	systemProp.bioVersion=4.0.+

Read more: :doc:`InterMine versions </intermine/intermine-versions>` and :doc:`InterMine Roadmap </intermine/roadmap>`

InterMine 4.0.0
---------------------

DataSet.licence was added to the data model. To update to this new data model for this release, you'll want to rebuild your database and redeploy your webapp.

See our `blog post <https://intermineorg.wordpress.com/2019/05/09/intermine-4-0-intermine-as-a-fair-framework/>`_ for details on how to use the new features to make your mine to be more FAIR.

InterMine 3.1.2
---------------------

This is a non-disruptive release.


InterMine 3.1.1
---------------------

This is a non-disruptive release.

InterMine 3.1.0
---------------------

The class `Strain` was added to the core InterMine data model in this release.

* You will need to rebuild your database with the new model to release a new webapp.
* If you do have Strains in your data, you might think about using the core data classes now available.

.. code-block:: xml

    <!-- core.xml -->
    <class name="Strain" extends="BioEntity" is-interface="true">
        <attribute name="annotationVersion" type="java.lang.String"/>
        <attribute name="assemblyVersion" type="java.lang.String"/>
        <collection name="features" referenced-type="SequenceFeature" reverse-reference="strain" />
    </class>

    <class name="SequenceFeature" extends="BioEntity" is-interface="true">
        <!-- snip -->
        <reference name="strain" referenced-type="Strain"  reverse-reference="features" />
    </class>

    <class name="Organism" is-interface="true">
        <!-- snip -->
        <collection name="strains" referenced-type="Strain"/>
    </class>

To update to use the new InterMine release:

* Change your mine's `gradle.properties` file to `3.1.+`.
 
 .. code-block:: properties

  # example -- flymine's gradle.properties
  systemProp.imVersion=3.1.+
  systemProp.bioVersion=3.1.+

* Change your data sources' `gradle.properties` file to `3.1.+`.
 
 .. code-block:: properties

  # example -- flymine-bio-sources gradle.properties
  systemProp.imVersion=3.1.+
  systemProp.bioVersion=3.1.+

InterMine 3.0.0
---------------------

This release adds Solr to InterMine. To upgrade, you will need to rebuild your database and install Solr.
  
To Upgrade
~~~~~~~~~~~
 
1. Change your mine's `gradle.properties` file to `3.0.+`. If you have data sources, change the version they use too.
 
 .. code-block:: properties

	# example -- flymine's gradle.properties
	systemProp.imVersion=3.0.+
	systemProp.bioVersion=3.0.+

2. Install Solr
 
  :doc:`Solr installation /system-requirements/software/solr`
 
3. Configure Solr

  :doc:`Solr configuration /webapp/keyword-search`
 
4. Rebuild your database. 

Specifically the postprocesses that build the search index.  

You should then be able to deploy your webapp as normal, with the new and improved search.
 

InterMine 2.+
---------------------

`InterMine 2.0 <https://intermineorg.wordpress.com/2017/09/22/intermine-2-0-summer-update/>`_ is a disruptive release and is not backwards compatible. This means that databases, webapps and code from previous releases will need to be updated to work with the new InterMine release. Below are detailed instructions on how to migrate your InterMine to the new build system. 

.. warning::

  If you have custom InterMine code, your changes will likely not work as expected after the upgrade. Please contact us and we can help you migrate your edits to the new system.

Please contact us if you have any questions or concerns! We have a mailing list or you can contact us directly via email or our discord channel (chat.intermine.org). If you are having difficulties, we can also arrange a skype call to walk through any problems together. Please make sure your code is public, e.g. GitHub, so we can help test!

Gradle 
-------

InterMine now uses Gradle to manage dependencies and to build and run InterMine. Please see :doc:`Gradle Quick Start </system-requirements/software/gradle/index>` for useful Gradle commands and :doc:`Gradle FAQs </system-requirements/software/gradle/FAQs>` for help with common questions and errors.

See the `Gradle <https://intermineorg.wordpress.com/2017/09/13/intermine-2-0-gradle/>`_ blog post for details as to why we made this change.

Maven
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You will need Maven installed. We use Maven to manage mine-specific InterMine dependencies, including your mine-specific data parsers.

.. code-block:: bash
  
  # for Ubuntu
  sudo apt-get install maven

You do not need to install Gradle locally. Instead, use the Gradle wrapper provided.

Remove InterMine code
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Previously you had to download and compile InterMine. Now, instead, you’ll be using the compiled InterMine JARs available via Maven. This means you should remove all InterMine code from your mine repositories. Your mine repositories should only contain your mine (webapp and dbmodel) and your mine's custom data sources.

If you have your mine and bio/sources in your InterMine checkout, instead of in their own repository, you'll have to separate them out. 

What you want to end up with:

   * FlyMine - https://github.com/intermine/flymine/ (MUST be the name of your mine)
   * FlyMine specific data sources - https://github.com/intermine/flymine-bio-sources

Options to separate out your mine repo:

1. You can copy over your directories directly. Don't do this! You'll lose your history.

.. code-block:: sh

  # don't do this
  ~/git $ cp intermine/flymine flymine; cd flymine
  ~/git/flymine $ git init; git add *; git commit -am "initial commit"

2. Instead, use `git filter-branch` command. Follow the `directions <https://help.github.com/articles/splitting-a-subfolder-out-into-a-new-repository/>`_ on how to move a directory to a new repository and keep your history in GitHub.

**You should not have any core InterMine code locally.**

New directory structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine has switched to use the standard `Maven directory structure <https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html>`_.

.. code-block:: guess

   src/main/java
   src/main/resources
   src/test/java
   src/test/resources

You will have to run two migration scripts to move your current mine over to this new layout -- one script for your mine and one for your mine's data parsers. The migration scripts are located in the `intermine-scripts <https://github.com/intermine/intermine-scripts/blob/master/gradle-migration/data-sources/migrateBioSources.sh>`_ repository. 

.. code-block:: sh

    ~/git $ git clone https://github.com/intermine/intermine-scripts.git

Migrate Mine webapp to New directory structure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run "migrateMine" script to move your mine over to the new directory system. You might want to create a new `gradle` branch for testing.

.. code-block:: sh

    ~/git/intermine-scripts/gradle-migration/mine $ ./migrateMine.sh ~/git/flymine 

Migrate Data Sources to New directory structure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the "migrateBioSources" script to move your sources over to the new directory system.

.. code-block:: sh

    ~/git/intermine-scripts/gradle-migration/data-sources $ ./migrateBioSources.sh ~/git/flymine-bio-sources  

Run this command to put your sources on the classpath and therefore available to the database build:

.. code-block:: sh

  # not part of the upgradle process. You will install every time you make a change
  ~/git/flymine-bio-sources $ ./gradlew install --stacktrace

This task builds the JARs and places them on your classpath in `~/.m2/repository`.

Note the command is `./gradlew` instead of `gradle`. Use the provided Gradle wrapper instead of locally installed Gradle.

You will have to `install` your sources every time you update the source code to update the JAR being used by the build.

Previously the data model was merged from all data sources' additions XML file. This is no longer true. Since each source is in its own JAR now, the data model is self-contained. Therefore if you reference a class in your data parser, it must be present in the additions file. Alternatively, you can specify a single data model file that will be merged into each source:

.. code-block:: sh

    // [in build.gradle in root of your mine bio/sources directory, e.g. flymine-bio-sources]
    // uncomment to specify an extra additions file for your bio-sources
    // this file will be merged with the additions file for each data source
    // and included in each source JAR.
    //bioSourceDBModelConfig {
    //    # file should live in your mine's bio/sources directory
    //    globalAdditionsFile = "MY-MINE_additions.xml"
    //}

Update config
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Remove `<property name="source.location" location="../bio/sources/"/>` from your project XML file
2. Set `GRADLE_OPTS` instead of `ANT_OPTS`

   * Use the same parameters.
   * Append `-Dorg.gradle.daemon=false` to prevent daemons from being used.

3. Update project XML for some sources

   * `SO` source's location has been updated to be: `<property name="src.data.file" location="so.obo" />` 
   * `Protein2ipr` source has a new attribute: `<property name="osAlias" value="os.production"/>`
   * `intermine-items-xml-file` isn't a valid value for "type" anymore. Use the project name instead.
   * `src.data.dir` can only have a `location` attribute. `src.data.dir` cannot have a `value` attribute.
   * Change the location of the generated files for `entrez-organism` and `update-publications` data sources to be `organisms.xml` and `publications.xml` (instead of in the `build` directory)

4. InterPro data file needs to be updated. The file incorrectly references `interpro.dtd` when you should have the full path instead.

   * Update interpro.xml 
   * `<!DOCTYPE interprodb SYSTEM "ftp://ftp.ebi.ac.uk/pub/databases/interpro/interpro.dtd">`
   * I asked InterPro to fix but they said no. Maybe you could ask too?
   * See https://github.com/intermine/intermine/issues/1914 for the discussion.

5. Update each data source's additions file to be correct. Alternatively you can use the `extraAdditionsFile` (see previous section).
6. `PostprocessUtil.java` moved to the `bio` package, so you maybe have to update your import to be `import org.intermine.bio.util.PostProcessUtil;`.

Please see :doc:`Gradle Quick Start </system-requirements/software/gradle/index>` for details on Gradle and common Gradle commands and :doc:`Gradle FAQs </system-requirements/software/gradle/FAQs>` for help with common questions and errors.

Data Model
-----------

* Syntenic Regions have been added to the data model
* Protein.molecularWeight is now a Float instead of an Integer
* GO evidence codes now have a name and URL
* OntologyAnnotation can now annotate any InterMine object, as long as that class inherits `Annotatable`
* Sequence Ontolgy has been updated to the latest version
* Organism.taxonId is a String instead of an Integer.

See the `Model Changes <https://intermineorg.wordpress.com/2017/09/08/intermine-2-0-proposed-model-changes-iii/>`_ blog post for details.

You have may to update your data sources and queries to match the new data model.

Dependencies
--------------------------

Software dependency requirements have been updated to the latest versions. This is so we can get rid of legacy code and make use of new features.

.. code-block:: guess

   Java SDK 8
   Tomcat 8.5.x
   Postgres 9.3+

You will get errors if you use older versions. e.g. If you use Java 7, you will get this error: `Caused by: java.security.NoSuchProviderException: no such provider: SunEC` 


API changes
--------------------------

We are making some non-backwards compatible changes to our API. These three end points have a parameter called `xml` which holds the XML query. We are going to rename this parameter to be `query` (as we now accept JSON queries!) to match the syntax of all the other end points.

.. code-block:: guess

    /query/upload
    /template/upload
    /user/queries (POST)

Please update any code that references these end points.


Pre-InterMine 2.0 Upgrade Instructions
------------------------------------------------------------------


To pull changes in your local repository and merge them into your working files:

.. code-block:: bash

	$ git pull upstream

If you host a copy of the :doc:`CDN </webapp/performance/index>`, then you should also pull in changes from
that repository.


Upgrade to InterMine 1.6
---------------------------------

The core model of InterMine has changed in release 1.1 so you may encounter more errors than usual.

update integration keys
   	You may need to update your integration keys if they are using a class or field
        that's been changed.

update custom converter
	If you are storing data using a class or field that's been changed, you will have
        to change your code to use the new model. See below for the complete list of model
        changes.

template queries
	You will have to update your templates to use the new model

interaction viewer
	The cytoscape tool uses the new model - will not work until you build a database with the new code

Interactions

+-------------------+-------------------------+-----------------------------+
| class             | old                     | new                         |
+===================+=========================+=============================+
| Interaction       | gene1                   | participant1                |
+                   +-------------------------+-----------------------------+
|                   | gene2                   | participant2                |
+                   +-------------------------+-----------------------------+
|                   | relationshipType (Term) | relationshipType (String)   |
+-------------------+-------------------------+-----------------------------+
| InteractionDetail | allInteractors (Gene)   | allInteractors (Interactor) |
+-------------------+-------------------------+-----------------------------+
| Interactor        | --                      | stoichiometry               |
+                   +-------------------------+-----------------------------+
|                   | InteractionDetail.role1 | role                        |
+                   +-------------------------+-----------------------------+
|                   | InteractionDetail.type  | type                        |
+-------------------+-------------------------+-----------------------------+

Protein Domains

+-------------------+-------------------+----------------------+
| class             | old               | new                  |
+===================+===================+======================+
| ProteinDomain     | proteins          | proteinDomainRegions |
+-------------------+-------------------+----------------------+
| Protein           | proteinDomains    | proteinDomainRegions |
+-------------------+-------------------+----------------------+
|ProteinDomainRegion| --                | start                |
+                   +-------------------+----------------------+
|                   | --                | end                  |
+                   +-------------------+----------------------+
|                   | --                | identifier           |
+                   +-------------------+----------------------+
|                   | --                | database             |
+-------------------+-------------------+----------------------+


Upgrade to InterMine 1.4
---------------------------------

There are no model changes, but we've added some new features that require an update.

We've added a new fancy connection pool, you should see a performance improvement. However you do need to update some configuration files.

Postgres config file 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The number of database connections required will depend on your usage. 100 connections is the default and should be okay for production webapps. However each webapp reserves 20 connections so on your dev machines it may be wise to raise the maximum quite a bit.

.. topic:: postgresql.conf

	max_connections=250

$MINE properties files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

in your $MINE directory:

.. topic:: default.intermine.integrate.properties

        set
        
	`db.production.datasource.maxConnections=20`
	 
	`db.common-tgt-items.datasource.maxConnections=5`
        
        and for each database replace
        
        `db.production.datasource.class=org.postgresql.ds.PGPoolingDataSource`
        
        (or any other db pooling class)
        
        with these 2 lines
        
        `db.production.datasource.class=com.zaxxer.hikari.HikariDataSource
        db.production.datasource.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource`



.. topic:: default.intermine.webapp.properties

        set
        
	`db.production.datasource.maxConnections=20`
	
	and for each database replace
        
        `db.production.datasource.class=org.postgresql.ds.PGPoolingDataSource`
        
        (or any other db pooling class)
        
        with these 2 lines
        
        `db.production.datasource.class=com.zaxxer.hikari.HikariDataSource
        db.production.datasource.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource`


Any other data source you use should be set to five connections, raised to ten if you encounter problems, e.g. the build failing with an error like so:

.. topic:: Error message

	Caused by: org.postgresql.util.PSQLException: FATAL: connection limit exceeded for non-superusers 

Or this (See `#912 <https://github.com/intermine/intermine/issues/912>`_)

.. topic:: Error message

	Unable to get sub-ObjectStore for Translating ObjectStore

See :doc:`/system-requirements/software/postgres/hikari` for details.

InterMine-model Refactor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The metadata package has moved from to `InterMine-model <https://github.com/intermine/intermine/tree/beta/intermine/model/main/src/org/intermine>`_. If you have custom data sources that use InterMine Utils, you may have to update your code to reflect the new location. Your IDE should be able to do this for you. 

Tomcat
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add `clearReferencesStopTimerThreads` to your $TOMCAT/conf/context.xml file, so it should look like so:

.. code-block:: xml

 <Context sessionCookiePath="/" useHttpOnly="false" clearReferencesStopTimerThreads="true">
 ...
 </Context>


Upgrade to InterMine 1.3.x
---------------------------------

This code will work with any webapp and database created with InterMine 1.3+.

Upgrade to InterMine 1.3
---------------------------------

* Remove all duplicate entries from web.xml
* Model changes:

  * DataSet now has a publication reference
  * AnnotationExtension has been moved from GOAnnotation to GOEvidence.

Also, we have changed our GO parser a bit. Each line in a gene annotation file now corresponds with an Evidence object. In prior releases, each Evidence object was unique, e.g. only a single evidence code per gene / GO term pair.

Upgrade to InterMine 1.2.1
---------------------------------

If you have your own home page (begin.jsp), you must manually make this change: `501e221 <https://github.com/intermine/intermine/commit/501e221ff1804d387cd3de7e69d99fc2fd943d41>`_

This is a fix for the keyword search - when users submit a blank search form, see `Issue #329 <https://github.com/intermine/intermine/issues/329>`_

There are no model or configuration changes in this release.

Upgrade to InterMine 1.2
---------------------------------

The core data model has not been changed, so you should be able to release a webapp
using InterMine 1.2 code without making any changes.

Upgrade to InterMine 1.1
---------------------------------

The core model of InterMine has changed in release 1.1 so you may encounter more errors than usual.

update integration keys
   	You may need to update your integration keys if they are using a class or field
        that's been changed.

update custom converter
	If you are storing data using a class or field that's been changed, you will have
        to change your code to use the new model. See below for the complete list of model
        changes.

template queries
	You will have to update your templates to use the new model

interaction viewer
	Widget uses the new model - will not work until you build a database with the new code

Model Changes
~~~~~~~~~~~~~~~~~~~~~~

Updated to latest version of Sequence Ontology, 2.5

===================   ============================
old                   new
===================   ============================
Comment.text          Comment.description
Gene.ncbiGeneNumber   --
--                    Gene.description
--                    Gene.briefDescription
===================   ============================

Interactions
^^^^^^^^^^^^^^

+-------------------+-------------------+----------------------+
| class             | old               | new                  |
+===================+===================+======================+
| Interaction       | gene              | gene1                |
+                   +-------------------+----------------------+
|                   | interactingGenes  | gene2                |
+                   +-------------------+----------------------+
|                   | type              | details.type         |
+                   +-------------------+----------------------+
|                   | role              | details.role1        |
+                   +-------------------+----------------------+
|                   | --                | details.role2        |
+                   +-------------------+----------------------+
|                   | name              | details.name         |
+                   +-------------------+----------------------+
|                   | shortName         | --                   |
+-------------------+-------------------+----------------------+
| InteractionRegion | primaryIdentifier | --                   |
+                   +-------------------+----------------------+
|                   | name              | --                   |
+-------------------+-------------------+----------------------+

Gene Ontology
^^^^^^^^^^^^^^

+--------------+------------+----------------------+
| class        | old        | new                  |
+==============+============+======================+
| GOAnnotation | withText   | evidence.withText    |
+              +------------+----------------------+
|              | with       | evidence.with        |
+              +------------+----------------------+
|              | --         | annotationExtension  |
+--------------+------------+----------------------+
| OntologyTerm | --         | crossReferences [1]_ |
+--------------+------------+----------------------+

.. [1] used for Uberon

Identifiers
~~~~~~~~~~~~~~~~~~~~~~

We have several [wiki:Homologue new homologue data converters] available in this InterMine release.
However, some of these new data sources use Ensembl IDs. If you want to load the model organism
database identifier instead (important for interoperation with other InterMines), you should use the
Entrez Gene ID resolver:

#. Download the identifier file - ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz
#. Unzip the file
#. Add the path to properties file:

.. code-block:: properties

	# in ~/.intermine/MINE_NAME.properties
	resolver.entrez.file=/DATA_DIR/ncbi/gene_info

Configuration Updates
~~~~~~~~~~~~~~~~~~~~~~

Web services uses the `webapp.baseurl` property to run queries, so be sure this is the valid URL for
your mine. Otherwise you will get an "Unable to construct query" error on the query results page.

.. code-block:: properties

	# in ~/.intermine/MINE_NAME.properties
	# used by web services for running queries, needs to be valid
	webapp.baseurl=http://localhost:8080

.. index:: upgrades, updating InterMine, InterMine 2.0, releases, new releases

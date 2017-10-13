Upgrading InterMine
======================

**InterMine 2.0** is a disruptive release and is not backwards compatible. This means that databases, webapps and code from previous releases will need to be updated to work with the new InterMine release. Below are detailed instructions on how to do that.


Gradle 
-------

InterMine now uses Gradle to manage dependencies and to build and run InterMine.

New directory structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine has switched to use the standard directory structure.

.. code-block:: guess

   src/main/java
   src/main/resources
   src/test/java
   src/test/resources


How to update your data sources to use Gradle
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Run this script to copy your sources over to the new directory system.

.. code-block:: guess

    build_script.py <file location>

* Do this to make your sources available to Gradle when you build a database.

See <Gradle docs> for details.

How to run a database build
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Use this script to run a build.

.. code-block:: guess

    build_script.py <dump file location>

See <Gradle docs> for details.


Data Model
-----------

* Syntenic Regions have been added to the data model
* Protein.molecularWeight is now a float instead of an integer
* GO evidence codes now have a name and URL
* OntologyAnnotation can now annotate any InterMine object, as long as that class inherits `Annotatable`.

See https://intermineorg.wordpress.com/2017/09/08/intermine-2-0-proposed-model-changes-iii/ for details.


Dependencies
--------------------------

Software dependency requirements have been updated to the latest versions. This is so we can get rid of legacy code and make use of new features.

.. code-block:: guess

   Java SDK 8
   Tomcat 8.5.x
   Postgres 9.3+


API changes
--------------------------

We are making some non-backwards compatible changes to our API. These three end points have a parameter called `xml` which holds the XML query. We are going to rename this parameter to be `query` (as we now accept JSON queries!) to match the syntax of all the other end points.

.. code-block:: guess

    /query/upload
    /template/upload
    /user/queries (POST)

Blue Genes
-----------

Run this command to deploy a Blue genes instance:

.. code-block:: guess

    <blue genes command goes here>



######################################
Pre-InterMine 2.0 Upgrade Instructions
######################################


To pull changes in your local repository and merge them into your working files:

.. code-block:: bash

	$ git pull upstream

If you don't have a git repo yet, see :doc:`/git/index` for details.

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
^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

See :doc:`/get-started/hikaricp` for details.

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

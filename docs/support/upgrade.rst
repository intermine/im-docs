Upgrade Instructions
=======================

To pull changes in your local repository and merge them into your working files:

.. code-block:: bash

	$ git pull upstream

If you don't have a git repo yet, see :doc:`/git/index` for details.

If you host a copy of the :doc:`CDN </webapp/performance>`, then you should also pull in changes from
that repository.

Upgrade to InterMine 1.4
---------------------------------

There are no model changes, but we've added some new features that require an update.

We've added a new fancy connection pool, you should see a performance improvement. However you do have to change the Postgres setting `max_connections`. 

Postgres config file 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The number of connections required will depend on your usage. 100 connections is the default and should be okay for production webapps. However each webapp reserves 20 connections so on your dev machines it may be wise to raise the maximum quite a bit.

.. code-block:: properties

	max_connections=250

$MINE properties files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

in your $MINE directory:

`default.intermine.integrate.properties` 

.. code-block:: properties

	db.production.datasource.maxConnections=20
	db.common-tgt-items.datasource.maxConnections=5

`default.intermine.webapp.properties`

.. code-block:: properties

	db.production.datasource.maxConnections=20

Any other data source you use should be set to five connections, raised to ten if you encounter problems, e.g. the build failing with an error like so:

| Caused by: org.postgresql.util.PSQLException: FATAL: connection limit exceeded for non-superusers 

See :doc:`/get-started/hikaricp` for details.

InterMine-model Refactor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The metadata package has moved from to `InterMine-model <https://github.com/intermine/intermine/tree/beta/intermine/model/main/src/org/intermine>`. If you have custom data sources that use Util files, you may have to update your code to reflect the new location. Your IDE should be able to do this for you. 

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

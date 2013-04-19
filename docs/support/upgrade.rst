Upgrade Instructions
=======================

To pull changes in your local repository and merge them into your working files:

.. code-block:: bash

	$ git pull upstream

If you don't have a git repo yet, see :doc:`/git/index` for details.

If you host a copy of the CDN, then you should also pull in changes from
that [repository](https://github.com/intermine/CDN). 

Upgrade to InterMine 1.2
---------------------------------

The core data model has not been changed, so you should be able to release a webapp using InterMine 1.2 code without making any changes.

Upgrade to InterMine 1.1
---------------------------------

The core model of InterMine has changed in release 1.1 so you may encounter more errors than usual. 
 
update integration keys
   	You may need to update your integration keys if they are using a class or field that's been changed.    

update custom converter
	If you are storing data using a class or field that's been changed, you will have to change your code to use the new model. See below for the complete list of model changes.

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

We have several [wiki:Homologue new homologue data converters] available in this InterMine release. However, some of these new data sources use Ensembl IDs. If you want to load the model organism database identifier instead (important for interoperation with other InterMines), you should use the Entrez Gene ID resolver: 

#. Download the identifier file - ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz
#. Unzip the file
#. Add the path to properties file:

.. code-block:: properties

	# in ~/.intermine/MINE_NAME.properties
	resolver.entrez.file=/DATA_DIR/ncbi/gene_info 

Configuration Updates
~~~~~~~~~~~~~~~~~~~~~~

Web services uses the `webapp.baseurl` property to run queries, so be sure this is the valid URL for your mine. Otherwise you will get an "Unable to construct query" error on the query results page.

.. code-block:: properties

	# in ~/.intermine/MINE_NAME.properties
	# used by web services for running queries, needs to be valid
	webapp.baseurl=http://localhost:8080

Tomcat 7.0
~~~~~~~~~~~~~~~~~~~~~~

If you would like to use Tomcat 7.0 with InterMine 1.1, add this property:

.. code-block:: properties

	# in ~/.intermine/MINE_NAME.properties
	webapp.tomcat.version=7

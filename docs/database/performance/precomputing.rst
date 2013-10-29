Query performance (precomputed tables)
================================================

InterMine can make use of precomputed tables (analagous to materialised views) for faster execution of queries. These can represent any SQL query (or InterMine query) and can automatically be substituted into incoming queries by our own cost-based query optimiser. For example, a precompute that joins three tables could be used in a larger query that includes that join thus reducing the total number of tables joined in the query. Template queries can be precomputed completely so that for any any value entered in an editable constraint the query will be executed from a single database table.

Template queries
----------------------

Webapp
~~~~~~~~~~~~

As the superuser, when you create a new template or edit an existing one there is a 'precompute' link on the MyMine saved templates list. Clicking this will create a precomputed table for just this query. It can take some time to create the tables and requests aren't put in a queue so it is not a good idea to click many of these links at once. The 'precompute' link will change to 'precomputed' once there is a precomputed table created.

Command line
~~~~~~~~~~~~~~~~~~~~~~~~

Precomputing template queries makes sure that public templates will always run quickly. You can precompute all templates saved as the superuser in your userprofile database from the command line. This checks each template first to see if it is already precomputed.

.. code-block:: bash

	# in <mine>/webapp
	$ ant precompute-templates

Sometimes it can be slow to precompute complex templates, an ignore flag lets you specify a comma separated list of template names not to precompute. For example:

.. code-block:: bash

	# in <mine>/webapp
	$ ant -Dignore=template1,template2 precompute-templates

Manual specification of queries
--------------------------------------------

You can specify any IQL query to precompute in the file `<mine>/dbmodel/resources/genomic_precompute.properties`. These allow you to design queries you think are likely to be created commonly or be parts of larger queries. It is the place to put queries that will be used in list upload and widgets to ensure they run fast.


.. code-block:: bash

	# in <mine>/webapp
	> ant precompute-queries

Here is an example query:

.. code-block:: sql

	precompute.query.6 = 
     SELECT a1_.id AS a3_, a2_.name AS a4_ 
     FROM org.intermine.model.bio.Protein AS a1_, org.intermine.model.bio.Organism AS a2_ 
     WHERE a1_.organism CONTAINS a2_

You can also specify the classes involved:

.. code-block:: properties

	precompute.constructquery.20 = Protein organism Organism

Dropping precomputed tables
--------------------------------------------

To drop all precomputed tables in a database:

.. code-block:: bash

	# in <mine>/webapp
	$ ant drop-precomputed-tables

Size of precomputed tables
--------------------------------------------

You can see the names and sizes of all precomputed tables by running this SQL query in psql:

.. code-block:: sql

	SELECT relname,category,pg_size_pretty(pg_relation_size(oid)) 
	FROM pg_class, precompute_index 
	WHERE relname NOT LIKE 'pg_%' and relname = name 
	ORDER BY pg_relation_size(oid) DESC;

Note that this only lists the table sizes, there may be many indexes associated with each table which may also be large. To see the size of all tables and indexes in the database use:

.. code-block:: sql

	SELECT relname,pg_size_pretty(pg_relation_size(oid)) 
	FROM pg_class 
	WHERE relname NOT LIKE 'pg_%' 
	ORDER BY pg_relation_size(oid) DESC;

Template Summaries
--------------------------------------------

After the templates are precomputed, they are "summarised". This means any dropdowns for the templates will be updated to only include valid values for that specific templates. How it's done:

* All editable constraints are dropped, non-editable constraints are kept
* Valid values (summaries) for dropdowns are recalculated 

For example, if you have a template with an option to select a chromosome, all chromosomes in the database will be displayed. However if you have a non-editable constraint setting the value of the organism to be human, only the human chromosomes will be displayed after summarisation.


FAQs
------

How do you know what to put in the precomputes file? 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is what we did for FlyMine:

1. Common joins to be done, e.g. Gene to protein
2. Widgets - see what queries the widgets are running, add those queries 
3. Problem areas being reported, certain queries being slower than expected, e.g. interaction queries

These three things, along with precomputing templates, seems to work best.

Ideally we would have some sort of query profiling and would be able to tell where precomputing helps.

How do you tell if what you put in there is actually helping?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can tell the query is using a precomputed table by checking the logs for the prefix `precomp_`

Were all these queries (in the flymine file) created by hand? 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

No. We ran all of our analysis tools on the list analysis page, e.g GO enrichment widget and captured the queries being run via the logs. 


.. index:: precomputes, query speed, database speed, optimisation

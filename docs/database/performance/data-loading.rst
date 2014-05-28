Data loading performance
================================



Java options
--------------------

Loading data can be memory intensive so there are some Java options that should be tuned to improve performance.  See a note about :doc:`/system-requirements/software/java`


Storing Items in order
----------------------------

When loading objects into the production ObjectStore the order of loading can have a big impact on performance.  It is important to store objects before any other objects that reference them.  For example, if we have a Gene with a Publication in its evidence collection and a Synonym referencing the Gene, the objects should be stored in the order: Publication, Gene, Synonym.  (If e.g. the Gene is stored after the Synonym a placeholder object is stored in the Gene's place which is later replaced by the real Gene.  This takes time).

Objects are loaded in the order that Items are stored by converter code or the order they appear in an Items XML file.  When Items are stored into the items database (during the build or using `ant -Dsource=sourcename -Daction=retrieve`) you can check if there are improvements possible with this SQL query:

.. code-block:: sql

   SELECT classnamea, name, classnameb, count(*)
   FROM (SELECT distinct itema.classname AS classnamea, name, itemb.classname AS classnameb, itemb.identifier
         FROM item AS itemA, reference, item AS itemB
         WHERE itema.id = itemid AND refid = itemb.identifier
               AND itema.id < itemb.id) AS a
   GROUP BY classnamea, name, classnameb;


If there are no results then no improvement can be made.  The example below shows that there were 27836 Gene Items stored after the Synonyms that reference them.  `subject` is the name of the reference in Synonym.  Changing the store order would improve performance.

::

 	classnamea |  name   | classnameb | count 
	------------+---------+------------+-------
 	Synonym    | subject | Gene       | 27836


Switching off the DataTracker
--------------------------------------------------

In order to allow data conflicts to be managed, the system needs to keep track of where each piece of data came from. This is because conflicting values will be resolved by a priority system where one data source is regarded as more reliable than another for a particular field value. However, storing this data takes significant time while running the DataLoader, and can now be switched off on a per-class basis for the whole DataLoading run. This is useful if you know that there will never be any data conflicts for a particular class and the data will not be merged, e.g. Sequence or Location objects. The configuration is found in the properties file for the project, and a configuration line for "datatrackerMissingClasses" is added to the IntegrationWriter entry, like this:

.. code-block:: properties

	integration.production.class=org.intermine.dataloader.IntegrationWriterDataTrackingImpl
	integration.production.osw=osw.production
	integration.production.datatrackerMaxSize=100000
	integration.production.datatrackerCommitSize=10000
	integration.production.datatrackerMissingClasses=OneAttribute

The parameter is a comma-separated list of class names for which no tracking data should be stored. All objects which are instances of these classes will be omitted, including subclasses. 


Recommended Hardware and Software
---------------------------------------

The hardware and support software used for a data loading has a significant impact on data loading performance. The main recommendations we have are:

* Install lots of RAM, like 16GB or more, but watch out for multiple RAM modules slowing down your RAM access speed.
* Have at least two real CPUs - hyperthreading doesn't count. Preferably have at least four CPUs.
* It is more important to have fast individual CPUs than a lot of CPUs for a build server. FlyMine does use multiple threads during data loading, but not asymmetrically - there is one thread which takes a lot of the CPU time. On the other hand, for a production server, having a few more CPUs is more important.
* Have a decent IO subsystem. We currently use a fibrechannel attached RAID array of 16 15krpm discs for our build servers.
* Use a recent version of PostgreSQL. At the time of writing, Postgres 8.4 is promising to come out Real Soon Now with significant improvements for the type of query we run frequently, especially if the machine has a large RAID array. Make sure you check out the effective_concurrency option.
* We can actually build a database for production faster than Postgres can undump from a backup file. This is because we generate precomputed tables and indexes in parallel using several CPUs simultaneously. Therefore, it makes sense to complete the last few steps of the build (namely precomputed tables and indexes) on your production servers directly, instead of completing them on the build server and transferring the data across to the production servers.

PostgreSQL Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~

Recommended settings for PostgreSQL are in :doc:`/system-requirements/software/postgres/postgres`

.. index:: data loading speed, performance 

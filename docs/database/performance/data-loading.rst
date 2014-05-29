Data loading performance
================================

The speed at which InterMine is able to load data into the databases depends on a number of factors including complexity of objects loaded, hardware specifications and so on. Below are some steps you can take to speed up your build.


Java options
--------------------

Loading data can be memory intensive so there are some Java options that should be tuned to improve performance.  See a note about :doc:`/system-requirements/software/java`

PostgreSQL
---------------------------------------

* Use a recent, correctly configured version of PostgreSQL.
* InterMine can actually build a database for production faster than Postgres can undump from a backup file. This is because we generate precomputed tables and indexes in parallel using several CPUs simultaneously. Therefore, it makes sense to complete the last few steps of the build (namely precomputed tables and indexes) on your production servers directly, instead of completing them on the build server and transferring the data across to the production servers.

Recommended settings for PostgreSQL are in :doc:`/system-requirements/software/postgres/postgres`

Hardware
---------------------------------------

See a note about :doc:`/system-requirements/hardware/index`


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

Non-InterMineObjects
---------------------------------------

For the ultimate in performance gain, objects can be stored in the database which are not instances of InterMineObject. Such objects are stored in "flat mode" in an SQL table. Because they do not have an ID, they cannot be referenced by other objects, fetched by ID, or deleted by ID, and they cannot have a collection, or be in a many-to-many collection. They are not stored in the main InterMineObject table, and are not stored in the DataTracker, and are never merged with other objects by the DataLoader. No class hierarchy may exist in these classes, and no dynamic objects may make use of these classes. The objects take much less space in the database than instances of InterMineObject. The objects can however contain attributes and references to other objects, and can be in one-to-many collections of other objects. The full Query interface will work correctly with these simple objects. Simple objects are configured in the Model by declaring the superclass of a class to be "java.lang.Object" in the model description, like this:

.. code-block:: xml

    <class name="SimpleObject" is-interface="false" extends="java.lang.Object">
        <attribute name="name" type="java.lang.String"/>
        <reference name="employee" referenced-type="Employee" reverse-reference="simpleObjects"/>
    </class>


We recommend you set `is-interface` to "false" for these objects. There is no need to specify these classes in the "dataTrackerMissingClasses" property as above, because these classes are never tracked. 

Proxies
--------------------

In object/relational mapping systems when an object is read from the database we need to know which objects it is related to in order to follow references and collections. However, if the entire object were fetched each time and then it's referenced objects were fetched, etc one request could materialise millions of objects. e.g. if Gene references Organism and has a collection of Proteins we would fetch a Gene, it's Organism and Proteins then recusively fetch all references for the new objects.

Instead we use proxies. `org.intermine.objectstore.proxy.ProxyReference` appears to be a standard `InterMineObject` but in fact just contains an object id, when any method is called on the proxy the object is materialized automatically. e.g. Calling `gene.getOrganism()` returns a `ProxyReference` but calling `gene.getOrganism().getName()` de-referneces the proxy and returns the name.

`org.intermine.objectstore.proxy.ProxyCollection` does the same for collections but wraps an objectstore query required to populate the collection, the collection is materialised in batches as it is iterated over by wrapping a SingletonResults object. 

Performance test
---------------------------------------

In objectstore/test run ‘ant test-performance’  (requires unittest database)

Our results for comparison:

.. code-block:: properties

	[run-performance-test] Starting performance test...
	[run-performance-test] Stored 10000 employee objects, took: 8303ms
	[run-performance-test] Stored 10000 employee objects, took: 7334ms
	[run-performance-test] Stored 10000 employee objects, took: 7727ms
	[run-performance-test] Total store time: 23364ms. Average time per thousand: 778.800ms.
	[run-performance-test]
	[run-performance-test] Reading all employee objects with empty object cache
	[run-performance-test] Read  10000 employee objects, took: 444ms.
	[run-performance-test] Read  20000 employee objects, took: 126ms.
	[run-performance-test] Read  30000 employee objects, took: 101ms.
	[run-performance-test] totalTime: 681 rowCount: 30000
	[run-performance-test] Finished reading 30000 employee objects, took: 681ms. Average time per thousand: 22.700ms.


============================ ============= ============ ============ ==============
.                            Load time     objs / min   DB size      tracker size
============================ ============= ============ ============ ==============
Original                     4.51 min      1,525,015    9.6 GB       3.7 GB
No tracker                   3.94 min      1,748,446    5.56 GB      1 GB
Consequence as SimpleObject  3.37 min      2,044,448    4.6 GB       1.4 GB
Both of above                3.20 min      2,153,291    4.1 GB       1 GB
============================ ============= ============ ============ ==============








.. index:: data loading speed, performance, postgres, hardware, speed

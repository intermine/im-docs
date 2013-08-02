Database Building
================================

A 'build' of a mine is a complete data loading run starting from an empty database. It is recommended that you use the :doc:`/database/database-building/build-script`. The build script runs the data integration and any post-processing steps.

Each mine has an integrate project that reads the project.xml file and builds the data warehouse. This steps through each `source` defined in the project.xml file and transates the specified data from a source format and loads it into the production database. Data integration is governed by primary keys, any conflicts are resolved by a priorities config file.

.. toctree::
    :maxdepth: 4
    
    build-script
    data-integration
    model-merging
    primary-keys
    priority-config
    post-processing/index


Data Loading code
---------------------------

The code for retrieving data from sources and loading into the production InterMine database is mostly in the integrate project with some classes extending those in objectstore.

Retrieve/ load
~~~~~~~~~~~~~~~~~~~~

    Diagram of retrieve/ load 

    the retrieve step from source files to the items database is done by parsers in bio/sources
    the load step is performed by the dataloader code using integration keys defined in each source 

Overview
~~~~~~~~~~~~~~~~

The process:

* Read items in id order from items database
* Convert each item to a Java object of the correct class, usually inheriting from InterMineObject
  * simple object inherit directly from FastPathObject which is a parent of InterMineObject 
* Use integration keys to look for equivalent objects in production db
* Merge objects according to priorities if necessary
* Store the new object 

The code
^^^^^^^^^^^^^^^^^

ObjectStoreDataLoaderTask creates

Threads
^^^^^^^^^^^^^^^^^

The data loading process uses four threads, each of which populates a queue from the next thread and/or reads from the previous one.

    thread 1 - reading from the items database (depends on speed of queries)
    thread 2 - fetching equivalent objects, merging objects.
    thread 3 - writing to the production db
    thread 4 - looking up objects in production db
    plus data tracker, stores information about the source for all fields stored 

The core code
^^^^^^^^^^^^^^^^^

ObjectStoreDataLoader is mostly construction of objects and error checking, this is all the main loop really does:

.. code-block:: java

	// queryClass is Item
	Query q = new Query();
	QueryClass qc = new QueryClass(queryClass);
	q.addFrom(qc);
	q.addToSelect(qc);
	q.setDistinct(false);

	getIntegrationWriter().beginTransaction();
	SingletonResults res = os.executeSingleton(q, ITEM_READ_BATCH_SIZE, false, false, true);
	Collection<FastPathObject> tmpRes = (Collection) res;
	for (FastPathObject obj : tmpRes) {
	    getIntegrationWriter().store(obj, source, skelSource);
	}
	getIntegrationWriter().commitTransaction();
	getIntegrationWriter().close();

Looking up objects
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Looking up objects in the target database is slow, writes need to be flushed (this may not be true now).

    batch multiple requests together
    works out some information about what is in the target database - e.g. if key is on gene symbol and organism if not genes for a particular organism are in the database no queries will be done.
    requires that all objects from the source being loaded are unique for many performance enhancements 

Performance
^^^^^^^^^^^^^^^^^

    order of items is important, any referenced items should be stored first
    iterative improvement - the load will either be disk bound or CPU bound, speeding up one of the three steps makes it more valuable to speed up the others:
        e.g. there's not much gain from speeding up copyFields if the storing process can't keep up.
        diagnose this by watching top during the build and seeing whether either of the posgres processes or the java process is at 100% CPU.
        it could look like it's CPU bound if java is garbage collecting continually, if CPU is high and memory is at max this may be the case. 


.. index:: database building
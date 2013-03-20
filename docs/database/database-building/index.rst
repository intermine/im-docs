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


Running a Single Datasource
----------------------------

Before starting the build process you will need to set up the appropriate properties and then initialise your database with this command:

.. code-block:: bash

  $ cd MINE_NAME/dbmodel/
  $ ant build-db

.. warning::

    Running the `build-db` target will drop the current database and create a new, blank database.

To run all sources, use our Perl script described here :doc:`/database/database-building/build-script`

To run a data source, run this command in the `MINE_NAME/integrate/` directory, specifying the source name (as it appears in project.xml):

.. code-block:: bash

  $ ant -v -Dsource=malaria-gff

Most sources have multiple stages in retrieving data, to run just one stage use:

.. code-block:: bash

  $ ant -v -Dsource=malaria-gff -Daction=[retrieve|load]

The stages are:

retrieve
	load data from source database/files into an items database

translate
	convert from a source items database to a target items database

load
	read from a target items database and integrate into the production database

Most sources do not have a `translate` step so `retrieve` will write to the `common-tgt-items` database.



.. index:: running a build, build-db, Dsource, Daction, integration, data integration
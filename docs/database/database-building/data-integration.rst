Data Integration
======================

Before starting the build process you will need to set up the appropriate properties and then initialise your database with this command:

.. code-block:: bash

  $ cd MINE_NAME/dbmodel/
  $ ant build-db

Integration can be run from the `MINE_NAME/integrate/` directory by:

.. code-block:: bash

  $ ant -v -Dsource=all


To run just one `source` specify the name (as it appears in project.xml):

.. code-block:: bash

  $ ant -v -Dsource=malaria-gff

Most sources have multiple stages in retrieving data, to run just one stage use:

.. code-block:: bash

  $ ant -v -Dsource=malaria-gff -Daction=[retreive|load]

The stages are:

* `retrieve` - load data from source database/files into an items database
* `translate` - convert from a source items database to a target items database
* `load` - read from a target items database and integrate into the production database

Most sources do not have a `translate` step so `retrieve` will write to the `common-tgt-items` database.


Range Queries (BioSeg)
===========

.. note::
 Starting with InterMine 1.4 Bioseg is no longer required if you are using a Postgres version higher than 9.1.


Postgres 9.2 and higher
=======================

InterMine now can perform range queries on location table taking advantage of Postgres built in ``int4range`` type.

The int4range type requires Postgres 9.2 and queries perform best with 9.3.

If range types are not available (Postgres 9.1) then queries will revert to bioseg if available or vanilla queries if not.

New installations of Postgres may still need to install gist for the indexes to work.


Indexing
--------
Performance is improved by creating an index of int4range(start, end) on the location table.

This is achieved in the post-process phase of the build of an InterMine (see :doc:`/get-started/tutorial/index`).

Please use the ``create-location-range-index`` post-process, which should replace ``create-bioseg-location-index`` in the project.xml file in your YOUR_MINE directory.

The ``create-overlap-view`` task will also detect whether built-in ranges are available and use them instead of bioseg for the overlappingfeatures view.

Postgres 9.1
=============
For Postgres 9.1 bioseg is still required. Here how to install it.

Prerequisites
-------------------

Contrib software
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========  ==========================================
debian    apt-get install postgresql-contrib-9.1
fedora    yum install postgresql-contrib
========  ==========================================

Header files
~~~~~~~~~~~~~~

========  ==========================================
debian    apt-get install postgresql-server-dev-9.1
fedora    yum install postgresql-devel
========  ==========================================

pg_config
~~~~~~~~~~~~~~

========  ==========================================
debian    apt-get install libpq-dev
========  ==========================================

Installation
------------------

1. Download the bioseg tar from http://www.bioinformatics.org/bioseg/wiki/.
2. Untar the file, change to the created directory and run these commands

.. code-block:: bash

	$ make USE_PGXS=t clean
	$ make USE_PGXS=t
	$ make USE_PGXS=t install


Create bioseg Type
----------------------

You need to create the bioseg type in each database that is going to use it. If you create it in the `template1`, then all newly-created databases will have the bioseg type.

.. warning::

	DO NOT install bioseg to the `template0` or `postgres` databases - they should never be altered.

Change directory to the postgres contrib directory

========  ==========================================
debian    /usr/share/postgresql/9.1/contrib
fedora    /usr/share/pgsql/contrib
========  ==========================================

For each database, type:

.. code-block:: bash

	# in the contrib directory
	$ psql (database) <bioseg.sql

Gist
=====

We also need to create the default gist operators too, in order to have normal types in multi-column indexes.

Postgres 8.x users
~~~~~~~~~~~~~~~~~~~~~

For each database, type:

.. code-block:: bash

	# in the contrib directory
	$ psql (database) <btree_gist.sql

Postgres 9.x users
~~~~~~~~~~~~~~~~~~~~~

See http://www.postgresql.org/docs/9.1/static/btree-gist.html.  Run the command in the template1 database:

.. code-block:: bash

	$ CREATE EXTENSION btree_gist;

.. index:: bioseg

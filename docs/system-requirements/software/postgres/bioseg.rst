BioSeg
===========

Prerequisites
-------------------

Contrib software
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

========  ==========================================
debian    apt-get install postgresql-contrib-8.4
fedora    yum install postgresql-contrib
========  ==========================================

Header files
~~~~~~~~~~~~~~

========  ==========================================
debian    apt-get install postgresql-server-dev-8.4
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
debian    /usr/share/postgresql/8.4/contrib
fedora    /usr/share/pgsql/contrib
========  ==========================================

For each database, type:

.. code-block:: bash

	# in the contrib directory
	$ psql (database) <bioseg.sql

Gist
-----

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

	$ CREATE EXTENSION btree_gist   

.. index:: bioseg
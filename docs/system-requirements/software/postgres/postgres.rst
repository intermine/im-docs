Installing PostgreSQL
======================

.. important::
  We recommend you install PostgreSQL 9.2 and above. We currently run our `continuous integration tests`_ on PostgreSQL 9.2. `The PostgreSQL downloads page`_ has packages for most systems that set up everything for you.

Fedora/CentOS
	https://computingforgeeks.com/how-to-install-postgresql-on-fedora/

Debian/Ubuntu
	`sudo apt-get install postgresql`

Mac
    There are several good options:

        * `Postgres.app`_ - Very easy for a development machine, requires zero configuration.
        * MacPorts_
        * Homebrew_
        * Manually_

    We have had good experiences with Postgres.app and Macports.

Some of the recommended setting below may not apply to older versions of PostgreSQL.

Configuration file
-------------------
Most of the configurations below are made by updating the file `postgresql.conf`, usually located in `/etc/postgres/version-nr/main`.

Required Configurations
---------------------------------------

Allow remote connections
~~~~~~~~~~~~~~~~~~~~~~~~
====================  ===================
listen_addresses      '*'
port                  5432
====================  ===================


Recommended Configurations
------------------------------------------------------------------------------

The system works reasonably well with the default configuration. For better performance we recommend to make the changes below.


Character Set Encoding
~~~~~~~~~~~~~~~~~~~~~~

You should only use either `SQL_ASCII` or `UTF-8`. If performance is an issue, the use of `SQL_ASCII` is strongly recommended. [#note]_


Procedures to change character encoding to `SQL_ASCII` in PostgreSQL 9.x:

.. code-block:: bash

	sudo -u postgres psql
	update pg_database set datallowconn = TRUE where datname = 'template0';
	\c template0
	update pg_database set datistemplate = FALSE where datname = 'template1';
	drop database template1;
	create database template1 with template = template0 encoding = 'SQL_ASCII' LC_COLLATE='C' LC_CTYPE='C';
	update pg_database set datistemplate = TRUE where datname = 'template1';
	\c template1
	update pg_database set datallowconn = FALSE where datname = 'template0';
	\q
	exit


You can check the expected screenshot here [#screenshot]_ .

Database Server Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Kernel Memory setting
""""""""""""""""""""""""""""

Please check your server kernel setting to prevent kernel from becoming unstable during runtime (which would require a reboot). For that, use `sysctl` command to set kernel parameters.

.. code-block:: bash

        getconf PAGE_SIZE
        getconf _PHYS_PAGES

        sysctl -a | grep -E "shmall|shmmax"

(use sudo if necessary)

Set

.. code-block:: bash

        shmall = phys_pages / 2
        shmmax = shmall * pagesize

by editing the file

.. code-block:: bash

   /etc/sysctl.d/30-postgresql-shm.conf

and sourcing it

.. code-block:: bash

      sudo sysctl -p /etc/sysctl.d/30-postgresql-shm.conf



PostgreSQL parameters
""""""""""""""""""""""""""""


For better performance. Read `Tuning your PostgreSQL Server <http://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server/>`_ for more information.


===============================   =============================
Parameter                         Suggested value (build)
===============================   =============================
shared_buffers			  10-25% of RAM
temp_buffers  			  around 80MB
work_mem  			  around 500MB but < 10% of RAM
maintenance_work_mem  		  5% of RAM    but < 20% of RAM
default_statistics_target  	  around 250
random_page_cost  		  around 2.0-2.5
effective_cache_size  		  50% of RAM
synchronous_commit                off
geqo_threshold  		  14
from_collapse_limit  		  14
join_collapse_limit  		  14
max_locks_per_transaction 	  640
max_pred_locks_per_transaction 	  640
checkpoint_segments 		  128
checkpoint_timeout 		  10min
checkpoint_completion_target      0.9
===============================   =============================


Note that most of the changes above require starting postgres.

.. note::

	Depending on your system configuration (production or development), the type of sources used in the build (files or databases) and the load on your web application, you may need to increase the
	**max_connections**
	parameter (for example to 250).


Client Authentication
""""""""""""""""""""""""""""

You should also add a line to the pg_hba.conf file to allow logging in via password:

.. code-block:: guess

	host    all         all         0.0.0.0/0             password



----------------------------------------------------------------------




..        # SHMMAX should not exceed 4294967295 on a 32-bit system. On x86-64 platforms, SHMMAX can be much larger than 4GB since the virtual address space is not limited by 32 bits.
..	$ ipcs -lm # Determine current shared memory limits, e.g. max seg size is SHMMAX in kbytes

..	$ cat /proc/sys/kernel/shmmax # Determine the value of SHMMAX

..	$ sudo vim /etc/sysctl.conf # Configure SHMMAX value (Bytes) in sysctl.conf, 50% of total memory is advised, e.g. add
..	# kernel.shmmax = 268435456

..	$ sudo sysctl -p # make the config take effect at runtime.
..	# Or simply do: sudo sysctl -w kernel.shmmax=268435456



.. [#note]
   The InterMine system stores all text in the database in `UTF-8` format. If you set PostgreSQL to `LATIN-9`, then PostgreSQL will perform some incorrect conversions, and may even give an error. Setting the format to `UTF-8` results in PostgreSQL treating the text correctly, which is quite complicated and slow.

   If you set PostgreSQL to `SQL_ASCII`, then that is a special character set in Postgres, which basically means "do no conversions". This is sufficient for almost all operations. All comparisons and index lookups will be done on a byte-by-byte basis, which is much faster than having to deal with Unicode's complications.

   Please try to treat InterMine as a black box. The fact that it uses PostgreSQL to store its data should be a detail that should be hidden as much as possible. The InterMine system is written in Java, and therefore handles all text in Unicode.

   The template1 database is the database used as a template when you run the `createdb` command. Update the encoding for template1 to be SQL_ASCII then every database you create from now on will have the correct encoding.


.. [#screenshot]
.. code-block:: guess

   postgres=# update pg_database set datallowconn = TRUE where datname = 'template0';
   UPDATE 1
   postgres=# \c template0
   You are now connected to database "template0" as user "postgres".
   template0=# update pg_database set datistemplate = FALSE where datname = 'template1';
   UPDATE 1
   template0=# drop database template1;
   DROP DATABASE
   template0=# create database template1 with template = template0 encoding = 'SQL_ASCII' LC_COLLATE='C'    LC_CTYPE='C';
   CREATE DATABASE
   template0=# update pg_database set datistemplate = TRUE where datname = 'template1';
   UPDATE 1
   template0=# \c template1
   You are now connected to database "template1" as user "postgres".
   template1=# update pg_database set datallowconn = FALSE where datname = 'template0';
   UPDATE 1


See also: :doc:`/system-requirements/software/postgres/hikari`

.. index:: PostgreSQL, SQL_ASCII, LATIN-9, UTF-8

.. _continuous integration tests: https://travis-ci.org/intermine/intermine
.. _The PostgreSQL downloads page: http://www.postgresql.org/download
.. _Postgres.app: http://postgresapp.com/
.. _MacPorts: https://github.com/codeforamerica/ohana-api/wiki/Installing-PostgreSQL-with-MacPorts-on-OS-X
.. _Manually: http://www.postgresql.org/download/macosx
.. _Homebrew: https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3

Installing PostgreSQL
======================

http://www.postgresql.org/download has packages for most systems that set up everything for you. 

Fedora/CentOS
	http://wiki.openscg.com/index.php/PostgreSQL_RPM_Installation

Debian/Ubuntu
	`sudo apt-get install postgresql`

Mac
	http://www.postgresql.org/download/macosx.  We've had the most success with MacPorts.



After installation, you need to update `postgresql.conf` 

* This file is usually located in `/etc/postgres/`: 
* If you are going to install Postgres 9.x:

  * It's not easy to change the default encoding to SQL_ASCII anymore, so you should do this before creating any production databases.
  * There are special instructions for installing BioSeg



Required Configuration
~~~~~~~~~~~~~~~~~~~~~~

====================  ===================
listen_addresses      '*'
port                  5432
====================  ===================


Recommended Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

	The default configuration is fine for a development server. It is conservative however, so for better performance we recommend you make the changes below.

For optimum performance. Read http://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server for more information.

=========================   ==============================================================
shared_buffers			Set to around 1/4 or more of total RAM (config SHMMAX first)
temp_buffers  			Set to around 80MB
work_mem  			Set to around 500MB but not more than 1/10 of available RAM
maintenance_work_mem  		Set to around 3000MB but not more than 1/5 of available RAM
default_statistics_target  	Set to around 250
random_page_cost  		Set to around 2.0, rather than 4.0
effective_cache_size  		Set to about 1/2 - 3/4 the amount of RAM in the computer
geqo_threshold  		Set to 14
from_collapse_limit  		Set to 14
join_collapse_limit  		Set to 14
max_locks_per_transaction 	Set to 640
=========================   ==============================================================

You should also add a line to the pg_hba.conf file to allow logging in via password:

.. code-block:: properties

	host    all         all         0.0.0.0/0             password


Note that changing some settings requires stopping/starting postgres, restart has no effect.

You may also need to configure (increase) your shared momery (SHMMAX), e.g.

.. code-block:: bash

        # SHMMAX should not exceed 4294967295 on a 32-bit system. On x86-64 platforms, SHMMAX can be much larger than 4GB since the virtual address space is not limited by 32 bits. 
	$ ipcs -lm # Determine current shared memory limits, e.g. max seg size is SHMMAX in kbytes

	$ cat /proc/sys/kernel/shmmax # Determine the value of SHMMAX

	$ sudo vim /etc/sysctl.conf # Configure SHMMAX value (Bytes) in sysctl.conf, 50% of total memory is advised, e.g. add 
	# kernel.shmmax = 268435456

	$ sudo sysctl -p # make the config take effect at runtime.
	# Or just change the value in current session: sudo sysctl -w kernel.shmmax=268435456

You also need to install the `bioseg` data type, and the `contrib btree_gist` plug-in, as described in :doc:`bioseg`.

Character Set Encoding
~~~~~~~~~~~~~~~~~~~~~~

We recommend using either `SQL_ASCII` or `UTF-8`. Theoretically, we should be using `UTF-8`, which is more correct, however its performance is rather poor, so we use `SQL_ASCII`.

The InterMine system stores all text in the database in `UTF-8` format. If you set Postgres to `LATIN-9`, then Postgres will perform some incorrect conversions, and may even give an error. Setting the format to `UTF-8` results in Postgres treating the text completely correctly, which is quite a complicated and slow operation in `UTF-8`.

If you set Postgres to `SQL_ASCII`, then that is a special character set in Postgres, which basically means "do no conversions". This is sufficient for almost all operations. All comparisons and index lookups will be done on a byte-by-byte basis, which is much faster than having to deal with Unicode's complications.

Please try to treat InterMine as a black box. The fact that it uses Postgres to store its data should be a detail that should be hidden as much as possible. The InterMine system is written in Java, and therefore handles all text in Unicode. 

Procedures to change character encoding to `SQL_ASCII` in PostgreSQL 9.1.x - https://gist.github.com/boboppie/4148428

.. index:: PostgreSQL

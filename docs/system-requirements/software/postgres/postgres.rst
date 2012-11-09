PostgreSQL
===========

 * [http://www.postgresql.org/download/ PostgreSQL] has packages for most systems that set up everything for you.
 * You should use at least version 8.3, as we have recently removed workarounds for some bugs in previous versions.
   Postgres 8.4 is the default for most package managers and has better performance.
     * Fedora/CentOS: follow this link: http://wiki.openscg.com/index.php/PostgreSQL_RPM_Installation
     * !Debian/Ubuntu: 'sudo apt-get postgresql-8.4'
     * Mac:  see [http://www.postgresql.org/download/macosx].  We've had the most success with !MacPorts.
     * Solaris:  see [http://wiki.postgresql.org/wiki/Detailed_installation_guides#Solaris]
 * After installation, you need to update {{{postgresql.conf}}} - this file is usually located in `/etc/postgres/8.4`: 
 * If you are going to install Postgres 9.x:
   * It's not easy to change the default encoding to [http://www.postgresql.org/docs/9.0/static/multibyte.html SQL_ASCII] anymore, so you should do this before creating any databases.
   * There are special instructions for installing BioSeg, see BiosegInstallation

Required Configuration
~~~~~~~~~~~~~~~~~~~~~~

||listen_addresses||'*'||||
||tcpip_socket||true||(not needed in recent releases)||
||port||5432||||

Recommended Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

for optimum performance

||shared_buffers||Set to around 150MB||
||temp_buffers||Set to around 80MB||
||work_mem||Set to around 500MB but not more than 1/10 of available RAM||
||maintenance_work_mem||Set to around 3000MB but not more than 1/5 of available RAM||
||default_statistics_target||Set to around 250||
||random_page_cost||Set to around 2.0, rather than 4.0||
||effective_cache_size||Set to about 2/3 the amount of RAM in the computer||
||geqo_threshold||Set to 14||
||from_collapse_limit||Set to 14||
||join_collapse_limit||Set to 14||
||max_locks_per_transaction||Set to 640||

You should also add a line to the pg_hba.conf file to allow logging in via password:
{{{
host    all         all         0.0.0.0/0             password
}}}

Note that changing some settings requires stopping/starting postgres, restart has no effect.

You also need to install the bioseg data type, and the contrib btree_gist plug-in, as described in BiosegInstallation.

Character Set Encoding
~~~~~~~~~~~~~~~~~~~~~~

We recommend using either SQL_ASCII or UTF-8. Theoretically, we should be using UTF-8, which is more correct, however its performance is rather poor, so we use SQL_ASCII.

The InterMine system stores all text in the database in UTF-8 format. If you set Postgres to LATIN-9, then Postgres will perform some incorrect conversions, and may even give an error. Setting the format to UTF-8 results in Postgres treating the text completely correctly, which is quite a complicated and slow operation in UTF-8.

If you set Postgres to SQL_ASCII, then that is a special character set in Postgres, which basically means "do no conversions". This is sufficient for almost all operations. All comparisons and index lookups will be done on a byte-by-byte basis, which is much faster than having to deal with Unicode's complications.

Please try to treat InterMine as a black box. The fact that it uses Postgres to store its data should be a detail that should be hidden as much as possible. The InterMine system is written in Java, and therefore handles all text in Unicode. 

----

See: [http://www.postgresql.org/docs/8.3/interactive/app-psql.html Postgres documentation]


Related topics:

.. toctree::
   :maxdepth: 2
   
   oracle
   bioseg


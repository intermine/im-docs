BioSeg
===========

== How to install Bioseg into Postgres ==

 * In addition to bioseg, we need the standard postgresql contrib software
||debian||apt-get install postgresql-contrib-8.4||
||fedora||yum install postgresql-contrib||
 * To compile the bioseg code, we need the postgres header files
||debian||apt-get install postgresql-server-dev-8.4||
||fedora||yum install postgresql-devel||
 * Install [http://www.postgresql.org/docs/8.1/static/app-pgconfig.html pg_config]
||debian||apt-get install libpq-dev||
 * Download the bioseg tar from http://www.bioinformatics.org/bioseg/wiki/. 
    * We are currently using version 0.8, which has a major bugfix and performance improvement over version 0.6.
 * Untar the file, change to the created directory and run these commands
    {{{
make USE_PGXS=t clean
make USE_PGXS=t
make USE_PGXS=t install
}}}

== Create bioseg Type ==

Now, you need to create the bioseg type in each database that is going to use it. If you create it in the template1, then all newly-created databases will have the bioseg type. 

'''DO NOT install bioseg to the template0 or postgres databases - they should never be altered.'''

Change directory to the postgres contrib directory 
||debian||`/usr/share/postgresql/8.4/contrib`||
||fedora||`/usr/share/pgsql/contrib`||

For each database, type:
{{{
# in the contrib directory
psql (database) <bioseg.sql
}}}

== Gist ==

We also need to create the default gist operators too, in order to have normal types in multi-column indexes.

=== Postgres 8.x users===

'''DO NOT install bioseg to the template0 or postgres databases - they should never be altered.'''

For each database, type:
{{{
# in the contrib directory
psql (database) <btree_gist.sql
}}}

=== Postgres 9.x users===

See [http://www.postgresql.org/docs/9.1/static/btree-gist.html btree-gist].  Run the command in the template1 database: 
{{{
CREATE EXTENSION btree_gist   
}}}


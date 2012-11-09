Hardware
===================

Recommendations 
----------------------

The requirements for running InterMine depend on the size of data warehouse you need to create. It is possible to build small InterMine databases on most linux or Mac desktops but with more substantial databases a more powerful dedicated server is required. The recommendations below are for running substantial servers such as FlyMine or InterMines for the major model organism databases.

Database servers 
~~~~~~~~~~~~~~~~

 * 8 cores
 * 32 GB RAM
 * ~2TB usable storage (SAS disks are faster than SATA but more expensive)
   * RAID 10 (4TB raw in RAID 10)
   * hardware RAID controller with a battery backed cache (gives faster write speeds)
   * it doesn't matter whether storage is in the same box or a separate disk array, if separate needs a Fibre Channel connection 
 * Linux/Unix capable of running Java and PostgreSQL 

A less expensive option:

 * 4 cores
 * 16GB RAM
 * ~2TB usable storage
   *  RAID 10
   *  hardware RAID controller with a battery backed cache (gives faster write speeds) 
 * Linux/Unix capable of running Java and PostgreSQL 

Note:  It's fairly essential to have separate development and production machines.

Web server to run Tomcat
~~~~~~~~~~~~~~~~~~~~~~~~

 * 4 cores
 * 8GB RAM (or more)
 * ~200GB local disks 

A less expensive option is to run Tomcat on the database machine and not buy separate web servers, we do this for modENCODE and performance is fine.

OS
~~~

 * Any distribution of linux/Unix should be fine as long as it runs Java and Postgres, Debian is our preference. 
 * Use something mainstream and reliable like Linux or BSD
 * Use the system that your friendly sysadmin is most familiar with.
 * Not favourites:
   * CentOS
   * Tru64
   * :doc:`solaris`


What we use
--------------------

FlyMine has separate build and production build servers and separate build and production build web servers.

Build
~~~~~~

This runs the Java data integration code to build the warehouse, reading from source files/DBs and loading into an intermediate postgres database then the final postgres database.  This is write intensive; the faster the disks the better, it only needs 4 cores but the more RAM the better.

Production
~~~~~~~~~~
This runs the production postgres database.  More cores and more RAM means better handling of concurrent requests and more of the database in cache.  InterMine often fires a lot of queries at a time for a single user - i.e. when running templates for a report page.

Web server
~~~~~~~~~~
FlyMine has a separate machine to run Tomcat to serve the webapp, this is the machine that actually runs the live InterMine code.  For us this a 4 core machine with 8GB RAM.  The cores are more important than the speed, disk space not important, more RAM means better caching.

modENCODE - identical machines
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For modENCODE we actually have two identical servers that switch roles with each release.  With higher data volumes and more frequent releases this makes more sense as we avoid dumping and reloading.

Database sizes/ disk space
~~~~~~~~~~~~~~~~~~~~~~~~~~

Disk space on the build and production machines obviously depends on volume of data. 

Multiply the database size by at least 3 for a corresponding InterMine instance.  This takes into account the various redundant ways we store data and precomputed tables, all to boost query performance.

Precomputed tables are pre-joined tables that can be swapped in dynamically to reduce table joins in actual queries and improve performance.  This means a lot of duplicated data is stored.

As a rough guide the current FlyBase database with all 12 genomes is 33GB, an InterMine with this and a couple of extra data sources is 100GB.  A full FlyMine release is typically around 500GB.

When running an InterMine build with multiple data sources, database copies are made periodically for backups so there needs to be extra space available, at least four times the final database size.


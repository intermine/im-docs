Hardware
===================

The requirements for running InterMine depend on the size of data warehouse you need to create. It is possible to build small InterMine databases on most Linux or Mac OS X systems but for more substantial databases a powerful dedicated server is required. The recommended minimum harware requirements for running substantial servers such as FlyMine or InterMines for major model organism databases are given below.

Recommendations 
---------------

Setting up database servers 
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The hardware used for a data loading has a **significant** impact on data loading performance. The main recommendations we have are:

* Install plenty of RAM, 16GB or more, but watch out for multiple RAM modules slowing down your RAM access speed.
* Have at least two real CPUs - hyperthreading doesn’t count. Preferably have at least four CPUs.
* It is more important to have fast individual CPUs than a lot of CPUs for a build server. InterMine does use multiple threads during data loading, but not asymmetrically - there is one thread which takes a lot of the CPU time. On the other hand, for a production server, having a few more CPUs is more important.
* Have a decent IO subsystem. We currently use a fibrechannel attached RAID array of 16 15krpm discs for our build servers.

=========================================================================
Recommended minimum harware requirements for a large InterMine instance
=========================================================================
========= ========== ====================================================
CPU       RAM        Storage
========= ========== ====================================================
8 cores   32 GB RAM  ~2TB usable storage with RAID 10 (4TB raw in RAID 10)
========= ========== ====================================================
* SAS disks are faster than SATA
* Hardware RAID controller with a battery backed cache (gives faster write speeds)
* It doesn't matter whether storage is in the same box or a separate disk array. If it is separate a fibrechannel connection is required.
=========================================================================

.. note::

    It's essential to have separate development and production machines.

Choosing an operating system
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Any distribution of Linux/Unix should be fine as long as it is capable of running Java and Postgres, although Debian is our preference. 
* Use something mainstream and reliable like Linux or Berkeley Software Distribution (BSD) 
* Use the system that your friendly sysadmin is most familiar with.
* Not favourites: Tru64 & :doc:`solaris`

What we use
--------------------
FlyMine has separate build and production build servers and separate build and production build web servers. 

Build
~~~~~~
This runs the Java data integration code to build the warehouse, reading from source files/databases  and loading into an intermediate postgres database then the final postgres database. This is write-intensive and only needs 4 cores, but the faster the disk and the more RAM the better.

Production
~~~~~~~~~~
This runs the production postgres database.  More cores and more RAM means better handling of concurrent requests and more of the database in cache.  InterMine often sends a lot of queries at a time for a single user - i.e. when running templates for a report page.

Web server
~~~~~~~~~~
FlyMine has a separate machine to run Tomcat to serve the webapp, this is the machine that actually runs the live InterMine code.  For us this a 4 core machine with 8GB RAM.  Disk space is not important because the cores are more important than the speed, and for better caching more RAM is required.

modENCODE - identical machines
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For modENCODE we actually have two identical servers that switch roles with each release.  With higher data volumes and more frequent releases this makes more sense as in this way we can avoid dumping and reloading. Unlike FlyMine, modMine's database and webapp live on the same server.

Database sizes/ disk space
~~~~~~~~~~~~~~~~~~~~~~~~~~
Disk space on the build and production machines obviously depends on volume of data. 

* Multiply the database size by at least 3 for a corresponding InterMine instance.  This takes into account the various redundant ways we store data and precomputed tables, all to boost query performance.
* As a rough guide the current FlyBase database with all 12 genomes is 33GB, an InterMine with this and a couple of extra data sources is 100GB.  A full FlyMine release is typically around 500GB.
* When running an InterMine build with multiple data sources, database copies are made periodically for backups so there needs to be extra space available, at least four times the final database size.

.. note::

    Precomputed tables are pre-joined tables that can be swapped in dynamically to reduce table joins in actual queries and improve performance.  This means a lot of duplicated data is stored.

Related topics:

.. toctree::
   :maxdepth: 2
   
   solaris
   


.. index:: Debian, hardware

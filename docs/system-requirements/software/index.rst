Software
===========

InterMine makes use of a variety of freely available software packages.  All of the software listed below is required. 

==========  ===============  ===================================
Software    Minimum Version  Purpose
==========  ===============  ===================================
Git         1.7              check out and update source code
Java SDK    6.0              build and use InterMine
Ant         1.8              invokes the InterMine build
Tomcat      6.0.29           website
PostgreSQL  8.3              database
Perl        5.8.8            run build scripts
==========  ===============  ===================================

.. note::

	InterMine only supports installations onto Linux and Mac OS X systems. Windows systems of any kind are not supported.  We run a mixture of Debian and Fedora servers in our data centre in Cambridge.

After installation, most programs require extra configuration to work with InterMine:

.. toctree::
   :maxdepth: 2
   
   ant
   git
   java
   perl
   postgres/index
   tomcat
   macs


.. index:: software dependencies
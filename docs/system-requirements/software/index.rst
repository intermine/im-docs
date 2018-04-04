Software
===========

InterMine makes use of a variety of freely available software packages.  

==========  ========= ===================================
Software    At least  Purpose
==========  ========= ===================================
Git         1.7       check out and update source code
Java SDK    8         build and use InterMine
Tomcat      8.5.x     website
PostgreSQL  9.3.x     database
Perl        5.8.8     run build scripts
Maven       3.0.5     manage local dependencies
==========  ========= ===================================

.. note::

	InterMine only supports installations onto Linux and Mac OS X systems. Windows systems of any kind are not supported.  We run a mixture of Debian and Fedora servers in our data centre in Cambridge.

After installation, most programs require extra configuration to work with InterMine:

.. toctree::
   :maxdepth: 2

   git
   java
   perl
   postgres/index
   tomcat
   macs
   maven
   
.. index:: software dependencies, git, Java, Perl, PostgreSQL, Mac, Apples, gradle, Tomcat, maven

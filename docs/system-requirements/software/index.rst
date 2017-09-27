Software
===========

InterMine makes use of a variety of freely available software packages.  All of the software listed below is required. 

==========  ========= ===================================
Software    At least  Purpose
==========  ========= ===================================
Ant                   invokes InterMine build    
Gradle                invokes InterMine build  
Git         1.7       check out and update source code
Java SDK    8         build and use InterMine
Tomcat      8.5.x     website
PostgreSQL  9.3.x     database
Perl        5.8.8     run build scripts
==========  ========= ===================================

InterMine added Gradle in the 2.0 release. Gradle does most of the compiling and running, but still executes some ant tasks underneath the hood. Eventually we are going to replace ant entirely. However, to execute a database build or deploy a webapp, you will need to use the Gradle commands.

.. note::

	InterMine only supports installations onto Linux and Mac OS X systems. Windows systems of any kind are not supported.  We run a mixture of Debian and Fedora servers in our data centre in Cambridge.

After installation, most programs require extra configuration to work with InterMine:

.. toctree::
   :maxdepth: 2

   ant
   gradle
   git
   java
   perl
   postgres/index
   tomcat
   macs
   eclipse

.. index:: software dependencies, git, Java, Perl, PostgreSQL, Mac, Apples, gradle, Tomcat

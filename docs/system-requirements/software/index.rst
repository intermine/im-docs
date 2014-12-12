Software
===========

InterMine makes use of a variety of freely available software packages.  All of the software listed below is required. 

==========  ========= ======== =============== ===================================
Software    At least  At most  Recommended     Purpose
==========  ========= ======== =============== ===================================
Git         1.7                latest          check out and update source code
Java SDK    6         7        7               build and use InterMine
Ant         1.8                latest          invokes the InterMine build
Tomcat      7.0.x     < 8      latest          website
PostgreSQL  9.1                9.3             database
Perl        5.8.8              latest          run build scripts
==========  ========= ======== =============== ===================================

.. note::

	InterMine only supports installations onto Linux and Mac OS X systems. Windows systems of any kind are not supported.  We run a mixture of Debian and Fedora servers in our data centre in Cambridge.

.. note::
	
	InterMine doesn't work with Tomcat 8, or Java 8 yet. We hope to resolve this issue soon.

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
   eclipse


.. index:: software dependencies, git, Java, Perl, PostgreSQL, Mac, Apples, ant, Tomcat

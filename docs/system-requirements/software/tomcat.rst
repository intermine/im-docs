Tomcat
===========


Installation
----------------------

.. warning::

   Several people have had problems with Tomcat installations set up by Linux package managers.  We recommend installing according to the these instructions instead.

The quickest way to get a working Tomcat:

#. Download the latest stable binary distribution `tar.gz` from the Apache Tomcat site. 
#. Unpack it:

.. code-block:: bash

   $ tar -zxvf apache-tomcat-x.y.z.tar.gz

#. Use the `startup.sh` and `shutdown.sh` scripts in `apache-tomcat-x.y.z/bin/` to start and stop Tomcat.  
 
   #. You can run it as your own user for development purposes, you should never run tomcat as `root`.

#. Set up the manager user as below.

See Tomcat's installation instructions - http://tomcat.apache.org/tomcat-6.0-doc/setup.html.

After Installation
----------------------

Set up a tomcat user with the 'manager' role by editing `conf/tomcat-users.xml`: 

Tomcat 6.0.xx
~~~~~~~~~~~~~~~~~~~~~~~~~~
   
.. code-block:: xml

   <tomcat-users>
      <role rolename="manager"/>
      <user username="manager" password="manager" roles="manager"/>
   </tomcat-users>

Tomcat 7.0.xx
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

   <tomcat-users>
      <role rolename="manager-gui"/>
      <role rolename="manager-script"/>
      <user username="manager" password="manager" roles="manager-gui,manager-script"/>
   </tomcat-users>


You can check this works by accessing the manager interface at http://localhost:8080/manager/html

If you used a package manager to get Tomcat, the manager may not be included. Here's the Debian command you need:

.. code-block:: bash

   $ apt-get install tomcat6-admin


Server XML
~~~~~~~~~~~~

You also need to check in your `server.xml` file that the correct `UTF-8` encoding has been applied to all connectors in use (see http://wiki.apache.org/tomcat/FAQ/CharacterEncoding). Make sure that every connector element in use reads as follows:

.. code-block:: xml

   <Connector ... URIEncoding="UTF-8"/>
         ...
   </Connector>


Without this, permalinks may break.

Tomcat 7.0 
~~~~~~~~~~~~

Starting from InterMine 1.1, you can now deploy your mine using Tomcat 7.0

Update your config files:

Add a new property (default is 6.0.xx)

.. code-block:: properties

   # in MINE.properties
   webapp.tomcat.version=7

in `$TOMCAT/conf/tomcat-users.xml` set:

.. code-block:: xml

   <role rolename="manager-gui"/>
   <role rolename="manager-script"/>
   <user username="manager" password="manager" roles="manager-gui,manager-script"/>


Add the property in startup.sh:

.. code-block:: bash

   JAVA_OPTS="$JAVA_OPTS -Dorg.apache.el.parser.SKIP_IDENTIFIER_CHECK=true"
   export JAVA_OPTS 

Tomcat 7.0 has improved the enforcement of the Expression Language rules and doesn't allow to use java key words. 
The flag makes Tomcat 7 more permissive.

Starting Tomcat 
~~~~~~~~~~~~~~~~

If Tomcat isn't already running, start it with this command:

.. code-block:: bash

   # from tomcat/bin
   $ ./startup.sh

Visit the Tomcat manager at http://localhost:8080/.  The username and password required to access the manager are `webapp.manager` and `webapp.password` as specified in your Mine properties file.

Stopping Tomcat
~~~~~~~~~~~~~~~~

To stop Tomcat, run this command:

.. code-block:: bash

   # from tomcat/bin
   $ ./shutdown.sh

You can't drop a database if Tomcat has an open connection to a Postgres database. You have to:

#. undeploy your webapp
#. restart tomcat
#. dropdb 

Out of Memory Errors
~~~~~~~~~~~~~~~~~~~~

To avoid `java.lang.OutOfMemory` errors, specify the JVM heap size in `$TOMCAT_HOME/bin/tomcat.sh`. You can specify the size as part of `TOMCAT_OPTS`:

.. code-block:: properties

   '-Xmx256m -Xms128m'


.. index:: Tomcat, JAVA_OPTS
Tomcat
===========


Installation
----------------------

.. warning::

   Several people have had problems with Tomcat installations set up by Linux package managers, mainly due to permissions issues.  We recommend installing according to the these instructions instead. 

The quickest way to get a working Tomcat:

#. Download the latest stable binary distribution `tar.gz` from the Apache Tomcat site. 
#. Unpack it:

.. code-block:: bash

   $ tar -zxvf apache-tomcat-x.y.z.tar.gz

After Installation
----------------------

Users
~~~~~~~~~~~~~~~~~~~~~~~~~~

Set up a tomcat user with the 'manager' role by editing `conf/tomcat-users.xml`: 

.. code-block:: xml

   <tomcat-users>
      <role rolename="manager-gui"/>
      <role rolename="manager-script"/>
      <user username="manager" password="manager" roles="manager-gui,manager-script"/>
   </tomcat-users>


You can check this works by accessing the manager interface at http://localhost:8080/manager/html

If you used a package manager to get Tomcat, the manager may not be included. Here's the Debian command you need:

.. code-block:: bash

   $ apt-get install tomcat7-admin

Context
~~~~~~~~

Edit context.xml:

.. code-block:: xml

   <Context sessionCookiePath="/" useHttpOnly="false" clearReferencesStopTimerThreads="true">
   ... 
   </Context>

Server XML
~~~~~~~~~~~~

You also need to check in your `server.xml` file that the correct `UTF-8` encoding has been applied to all connectors in use (see  `CharacterEncoding <http://wiki.apache.org/tomcat/FAQ/CharacterEncoding>`_). Make sure that every connector element in use reads as follows:

.. code-block:: xml

   <Connector ... URIEncoding="UTF-8"/>
         ...
   </Connector>


Without this, permalinks may break.

startup.sh 
~~~~~~~~~~~~

Add this property in startup.sh:

.. code-block:: bash

   JAVA_OPTS="$JAVA_OPTS -Dorg.apache.el.parser.SKIP_IDENTIFIER_CHECK=true"
   export JAVA_OPTS 

Tomcat 7.0 has improved the enforcement of Expression Language rules and by default doesn't allow the use of Java keywords.
This flag makes Tomcat 7 more permissive.

If tomcat is installed as service, add org.apache.el.parser.SKIP_IDENTIFIER_CHECK=true to /etc/tomcat7/catalina.properties instead of adding JAVA_OPTS in startup.sh.

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

Common Errors
~~~~~~~~~~~~~~~~~~~

Out of Memory Errors
^^^^^^^^^^^^^^^^^^^^^^^^^

To avoid `java.lang.OutOfMemory` errors, specify the JVM heap size in `$TOMCAT_HOME/bin/tomcat.sh`. You can specify the size as part of `TOMCAT_OPTS`:

.. code-block:: properties

   '-Xmx256m -Xms128m'

Session Errors 
^^^^^^^^^^^^^^^^^^^^^^^^^

If you get a "Session Error" when you start up your webapp, you may need to update your Tomcat configuration to remove application path in front of sessions' cookies. 

You get this error because the home page makes several requests but your session is lost between transactions with a new session started with the first query. For instance, when you go to the beta.flymine.org home page your cookie path will initially be "/". To display the "most popular" template queries, a query is run on full URL using the path "/beta". The session with the "/" path is discarded and a new session cookie is created with the "/beta" path. (You can view the values stored in your cookies via your web browser.)


Add these 2 attributes to `$TOMCAT/conf/context.xml`

.. code-block:: properties

   sessionCookiePath="/"
   useHttpOnly="false"


`Tomcat 7.0 context documentation <http://tomcat.apache.org/tomcat-7.0-doc/config/context.html>`_


.. index:: Tomcat, JAVA_OPTS, emptySessionPath, sessionCookiePath, session error, out of memory error

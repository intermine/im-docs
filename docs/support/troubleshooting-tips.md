Troubleshooting tips
========================

This page describes what to do if you encounter problems when installing or maintaining InterMine.  Please feel free to :doc:`/about/contact-us` with any questions you may have.

Error messages
--------------

If you encounter a problem when running a task, try adding the verbose flag:

.. code-block:: bash

	# add --stacktrace flag to get the complete error message
	$ ./gradlew builddb --stacktrace


Logs
----

Data warehouse
~~~~~~~~~~~~~~

When integrating data, usually the errors are in intermine.log in your mine's directory.

Webapp
~~~~~~~~~~~~~~

When you see an error on the webapp or get a blank page and nothing appears in the webapp log from log4j, it is likely you will be able to find more information on what went wrong in the tomcat logs:

* tomcat/logs/catalina.out  
* tomcat/logs/localhost.$DATE.logs

It will likely be the log that was modified last.  

A good way of looking at the output to these logs in real time is to use the command:

.. code-block:: bash

	$ tail -f tomcat/logs/$LOGNAME

If you reload the webapp you will see the error output directly on the screen.

IQL in logs
~~~~~~~~~~~~~~~~~~~~

If you are having problems with a specific query, you can run it directly in the console. The query is listed in the log files in IQL (InterMine Query Language). To run the query directly, go to `$MINE/dmodel` and execute this command:

.. code-block:: bash

	$ ./gradlew runIQLQuery -Pquery='some IQL'

Show all properties 
~~~~~~~~~~~~~~~~~~~~

Note that you can do this in a running web-app to check that it works by visiting the `HOST/PATH/showProperties.do` url when logged in as superuser. 

Common Errors 
~~~~~~~~~~~~~~

Listed here are some common errors encountered in InterMine and some suggested fixes. 

UnsupportedClassVersionError
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: java

	java.lang.UnsupportedClassVersionError: org/intermine/task/FileName (Unsupported major.minor version 49.0)

This means that your version of Java is too old, you need at least Java 8 to run InterMine.

can't open datasource
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: guess

	java.lang.RuntimeException: can't open datasource for {platform=PostgreSQL, datasource.dataSourceName=db.flatmodeunittest, ...

Errors of this type mean there was a problem accessing a database, in this example with `db.flatmodeunittest`.  Either the database specified in the `mine.properties` file doesn't exist or the server/user/password details in the properties are incorrect.

FATAL: sorry, too many clients already
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: java

	org.postgresql.util.PSQLException: Backend start-up failed: FATAL: sorry, too many clients already - for database: db.bio-fulldata-test

This occurs when the number of connections to a database exceeds the maximum configured in the postgres configuration. You need to increase the value of `max_connections` in the `postgresql.conf` file and restart postgres.  Try 100 connections:

.. code-block:: java

	max_connections = 100

If you still experience this problem, restart Postgres.

OutOfMemoryError: Java heap space
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: java

	java.lang.OutOfMemoryError: Java heap space

This means that a Java process hasn't been allocated enough memory to function correctly.  You can increase the amount of memory by changing the `-Xmx` property in your `GRADLE_OPTS` environment variable.  We recommend `8G` as a minimum, more is often needed during dataloading.  Your `GRADLE_OPTS` variable should include the following:

.. code-block:: bash

	$ echo $GRADLE_OPTS
	$ -Xmx8G -Dorg.gradle.daemon=false

Can't find class name `ClassName`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: java

	Exception caught: java.lang.IllegalArgumentException: Unknown class name Protein in package org.intermine.model.bio

In this example a class named `Protein` could not be found in the data model, this will usually arise when running a parser and attempting to create an `Item` for a class that does not exist.  Check your `SOURCE-NAME_additions.xml` files to see if the class is listed, only the additions files for sources lists on `project.xml` when `./gradlew builddb` was run will be included in the data model.

Can't find keys
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: java

	Caused by: java.lang.IllegalArgumentException: Unable to find keys for source protfeatures_source in file protfeatures_source_keys.properties


It is expecting to find some keys to integrate data from that source. Do you have a keys file in the `protfeatures/src/main/resources`? 

Classpath issues
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Classpath issues can generate various errors, eg a conflict caused by `wstx-asl-3.2.4.jar` when the XMLOutputFactory created its StreamWriter in PathQueryBinding:

.. code-block:: java

	XMLStreamWriter writer = factory.createXMLStreamWriter(sw);

Failed to parse the expression
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Tomcat 7 is less permissive than Tomcat 6, so you have might see this:

.. code-block:: java


	Caused by: org.apache.jasper.JasperException: /queryBuilderConstraint.jsp (line: 90, column: 14) "${dec.boolean}" contains invalid expression(s): javax.el.ELException: Failed to parse the expression [${dec.boolean}]

Add this to your Tomcat startup.sh script:

.. code-block:: bash

	JAVA_OPTS="$JAVA_OPTS -Dorg.apache.el.parser.SKIP_IDENTIFIER_CHECK=true"
	export JAVA_OPTS
	
See :doc:`/system-requirements/software/tomcat` for more details.

Session Error
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you get a session error when you first start up your webapp, update your Tomcat configuration to handle different URLs. See :doc:`/system-requirements/software/tomcat`.

.. index:: help, classpath, antlib-int.xml, keys, OutOfMemoryError, too many clients error, showProperties, logs, error messages

Client side errors
~~~~~~~~~~~~~~~~~~

Assuming you are using Google Chrome as your browser press `Ctrl+Shift+I` to open a Debugger. In there click on the "Console" tab. If errors are present you should see them in red. If you want to inspect what kind of data are being sent/fetched, click on the Network Tab.

If you are using the List Widgets library ``(>= 1.2.4)`` then you can launch a "debug mode" on them. Simply wait for your page to load. Then append ``#debug`` at the end of the page URL. You should see buttons on individual widgets allowing you to see a debug trace of events happening.



Keyword Search fails
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There is no extra configuration required to get the search working. The search uses a Lucene index not the postgres database. The Lucene index is created at build-time, and it is the last source build as part of the tutorial.

The search should be very quick, but depending on the machine it's on, the initial search can be quite slow. On the first search, the index is unpacked from the database and loaded into memory which can take up to a minute.

If the search is just failing instantly, check your log files ($TOMCAT/logs). When the index is unpacked from the database, it writes to disk. There may be permissions or space issues.

See :doc:`/system-requirements/software/gradle/FAQs` for more error messages.

.. index:: LOG, intermine.log, catalina.out, IQL, JAVA_OPTS, PermGen, PSQLException

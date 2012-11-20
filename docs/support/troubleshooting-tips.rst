Troubleshooting tips
========================

This page describes what to do if you encounter problems when installing or maintaining InterMine.  Please feel free to [wiki:ContactUs contact us] with any questions you may have.

Error messages
--------------

If you encounter a problem when running Ant, try adding the verbose flag:
{{{
> ant -verbose
}}}
This should output a more useful error message.

Logs
----

Data warehouse
~~~~~~~~~~~~~~

When integrating data, usually the errors are in intermine.log file in the directory you are in, eg. {{{/integrate}}} or {{{/dbmodel}}}.

Webapp
~~~~~~~~~~~~~~

In order for the intermine webapp to write logs, you must correctly set the {{{webapp.logdir}}} property in {{{~/.intermine/malariamine.properties}}}. The property must be an absolute path to a directory on the tomcat machine, writable by tomcat.

When you see an error on the webapp or get a blank page and nothing appears in the webapp log from log4j, it is likely you will be able to find more information on what went wrong in the tomcat logs:

  * tomcat/logs/catalina.out  
  * tomcat/logs/localhost.DATE.logs

It will likely be the log that was modified last.  

A good way of looking at the output to these logs in real time is to use the command:
{{{
> tail -f tomcat/logs/LOGNAME
}}}

If you reload the webapp you will see the error output directly on the screen.

Show all properties 
~~~~~~~~~~~~~~~~~~~~

Note that you can do this in a running web-app to check that it works by visiting the HOST/PREFIX/showProperties.do url when logged in as superuser. 

Common Errors 
~~~~~~~~~~~~~~

Listed here are some common errors encountered in InterMine and some suggested fixes. 

UnsupportedClassVersionError
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

{{{
java.lang.UnsupportedClassVersionError: org/intermine/task/FileName (Unsupported major.minor version 49.0)
}}}
This means that your version of Java is too old, you need at least Java 1.5 to run !InterMine.

can't open datasource
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

{{{
java.lang.RuntimeException: can't open datasource for {platform=PostgreSQL, datasource.dataSourceName=db.flatmodeunittest, ...
}}}
Errors of this type mean there was a problem accessing a database, in this example with `db.flatmodeunittest`.  Either the database specified in the xxx.properties file doesn't exist or the server/user/password details in the properties are incorrect.

FATAL: sorry, too many clients already
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

{{{
org.postgresql.util.PSQLException: Backend start-up failed: FATAL: sorry, too many clients already - for database: db.bio-fulldata-test
}}}
This occurs when the number of connections to a database exceeds the maximum configured in the postgres configuration.  You need to increase the value of `max_connections` in the `postgresql.conf` file and restart postgres.  Try 50 connections:
{{{
max_connections = 50
}}} 
If you still experience this problem, see [wiki:RunningABuild building a Mine].


OutOfMemoryError: Java heap space
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{{
java.lang.OutOfMemoryError: Java heap space
}}}
This means that a Java process hasn't been allocated enough memory to function correctly.  You can increase the amount of memory by changing the `-Xmx` property in your `ANT_OPTS` environment variable.  We recommend `1000M` as a minimum, more is often needed during dataloading.  Your `ANT_OPTS` variable should include the following:
{{{
> echo $ANT_OPTS
-Xmx1000M -XX:MaxPermSize=256M
}}}
If you still experience this problem, see [wiki:RunningABuild building a Mine].


OutOfMemoryError: PermGen space
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{{
java.lang.OutOfMemoryError: PermGen space
}}}
This occurs when Java has run out for !PermGen space - where it stores !ClassLoaders and Class definitions, etc.  It can be fixed by increasing the `-XX:MaxPermSize` value in your `ANT_OPTS` environment variable, the default is `128M`, trying `256M` would be best.  The `ANT_OPTS` variable should include the following:
{{{
> echo $ANT_OPTS
-Xmx1000M -XX:MaxPermSize=256M
}}}
If you still experience this problem, see [wiki:RunningABuild building a Mine].


Can't find class name `ClassName`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{{
Exception caught: java.lang.IllegalArgumentException: Unknown class name Protein in package org.intermine.model.bio
}}}

In this example a class named `Protein`  could not be found in the data model, this will usually arise when running a parser and attempting to create an `Item` for a class that does not exist.  Check your `sourcename_additions.xml` files to see if the class is listed, only the additions files for sources lists on `project.xml` when `ant build-db` was run will be included in the data model.

Can't find keys
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{{
Caused by: java.lang.IllegalArgumentException: Unable to find keys for
source protfeatures_source in file protfeatures_source_keys.properties
}}}

It is expecting to find some keys to integrate data from that source.
Do you have a keys file in the bio/sources/protfeatures/resources? 

Can't find antlib-int.xml
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{{
Unable to find jar:file:/home/malariamine/svn/trunk/intermine/integrate/main/dist/intermine-integrate.jar!/org/intermine/task/antlib-int.xml
}}}

This happens occasionally, probably due to a concurrency issue in the build system.  Run the ANT command again and it should work.

Classpath issues
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Classpath issues can generate various errors, eg a conflict caused by `wstx-asl-3.2.4.jar` when the XMLOutputFactory created its !StreamWriter in !PathQueryBinding:
{{{
XMLStreamWriter writer = factory.createXMLStreamWriter(sw);
}}}


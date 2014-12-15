HikariCP and InterMine settings
================================

InterMine, starting with release 1.4, is using HikariCP as its default JDBC connection pool.
If this is not available, InterMine will use the default postgresql distribution (PGPoolingDataSource).

HikariCP is a fast, reliable and lightweight connection pool. For details about the improvements it brings please refers to https://github.com/brettwooldridge/HikariCP.

From the InterMine user point of view, the main change is that the maximum number of connections allocated to a database, set in the properties files, is now reserved at the start and it is not any longer a ceiling to the number of connections a database can reach.

As a consequence, setting for the previously used connection pool could exhaust the postgresql allocation at start up (either of building an InterMine database or a web application).

InterMine properties has been updated to deal with the change, but you could still need to edit the `datasource.maxConnections` properties specific for your mine, see "Which properties?" section below.

.. note::
 Reasonable settings for ``datasource.maxConnections`` can be seen in the files
  * flymine/default.intermine.integrate.properties
  * flymine/default.intermine.webapp.properties
 with values of 20 for the production database and 5 for other databases.
 You may need to increase your Postgres parameter ``max connections``, for example to 250.

.. note::
 The InterMine property ``datasource.maxConnections`` corresponds to the ``maximumPoolSize`` of the HikariCP.

For more information about the properties files in InterMine, please refer to our :doc:`/get-started/tutorial/index`, and in particular to sections 

http://intermine.readthedocs.org/en/latest/get-started/tutorial/#creating-a-new-mine
http://intermine.readthedocs.org/en/latest/get-started/tutorial/#properties-file

Which properties?
-----------------
The properties that you should check have a reasonable setting for a database `maxConnections` are, in order of priority:

1. YOUR_MINE.properties in your .intermine directory (if you set them there)
2. YOUR_MINE/default.intermine.integrate.properties  (for building a mine)
3. YOUR_MINE/default.intermine.webapp.properties  (for building a web application)


Some further information about the order of precedence for the setting of properties is available, for the web application, at
http://intermine.readthedocs.org/en/latest/webapp/properties/web-properties/?highlight=overrides#overriding-properties

Tomcat
-------

You'll also need to update your Tomcat settings. Add `clearReferencesStopTimerThreads` to your $TOMCAT/conf/context.xml file, so it should look like so:

.. code-block:: xml

 <Context sessionCookiePath="/" useHttpOnly="false" clearReferencesStopTimerThreads="true">
 ...
 </Context>



Other HikariCP configurations
------------------------------

While HikariCP default settings are good, there could be situations where some changes could be useful. HikariCP provides a good number of parameters that can be set (see the configuration section at https://github.com/brettwooldridge/HikariCP).

For example, sometime it can be useful, to avoid exceeding the number of connections set in the database, to set the minimumIdle number of connections.
This could be the case in development and when deploying multiple webapps.

For performance purposes is nevertheless suggested by Hikari people to have 
`minimumIdle = maximumPoolSize` (InterMine maxConnections).

To set a minimumIdle parameter just add a line like the following to the appropriate properties file

`db.production.datasource.minimumIdle=10`


Further readings and references
--------------------------------
https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing

https://groups.google.com/forum/#!forum/hikari-cp

----------------------

.. index:: tutorial, Hikari, connection pool, database


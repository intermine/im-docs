Database and Web application
========================================================

InterMine is governed by a properties file located in the $HOME/.intermine named `$MINE_NAME.properties`.  This page describes which values are set in that file.

Example: https://github.com/intermine/intermine/blob/dev/bio/tutorial/malariamine.properties

Database names and locations
------------------------------

The following properties determine the settings for the production database.  This database is used by the build system and the webapp.

=======================================  ===============  ==============================
Property name                            Example          Determines  
=======================================  ===============  ==============================
db.production.datasource.serverName      server_name      server name 
db.production.datasource.databaseName    malariamine      database name 
db.production.datasource.user            postgres_user    database username 
db.production.datasource.password        SECRET           database password 
=======================================  ===============  ==============================

The following properties determine the settings for the items database.  This database is used during builds only.

=============================================  ===============  =================================
Property name                                  Example          Determines  
=============================================  ===============  =================================
db.common-tgt-items.datasource.serverName      server_name      server name 
db.common-tgt-items.datasource.databaseName    malariamine      database name 
db.common-tgt-items.datasource.user            postgres_user    database username 
db.common-tgt-items.datasource.password        SECRET           database password 
=============================================  ===============  =================================

The following properties determine the settings for the items database.  This database is used by the webapp only.  It holds all user related information, including lists, queries and tags.

===================================================  ===============  ===========================
Property name                                        Example          Determines  
===================================================  ===============  ===========================
db.userprofile-production.datasource.serverName      server_name      server name 
db.userprofile-production.datasource.databaseName    malariamine      database name 
db.userprofile-production.datasource.user            postgres_user    database username 
db.userprofile-production.datasource.password        SECRET           database password 
===================================================  ===============  ===========================


Web application name and location
----------------------------------

===============================  =========================================================================  ======================================================================
Property name                    Example                                                                    Determines  
===============================  =========================================================================  ======================================================================
os.production.verboseQueryLog    true                                                                       if true, all queries are logged.  Defaults to false 
webapp.deploy.url                http://localhost:8080                                                      location of tomcat server 
webapp.path                      malariamine                                                                location of path of webapp 
webapp.manager                   TOMCAT_USER                                                                tomcat username, needed to deploy webapp 
webapp.password                  TOMCAT_PWD                                                                 tomcat password, needed to deploy webapp 
webapp.baseurl                   http://www.flymine.org                                                     home link; used by client side JavaScript AJAX requests 
superuser.account                test_user@mail_account                                                     account name for superuser 
superuser.initialPassword        secret                                                                     password used when account is created 
project.standalone               true                                                                       run with associated web site.  Defaults to false 
project.title                    MalariaMine                                                                name of mine 
project.subTitle                 An example of InterMine.bio with data from <i>Plasmodium falciparum</i>    text that appears in the header at the top of the page 
project.releaseVersion           tutorial                                                                   text that appears at the top of the page next to the mine name  
project.sitePrefix               http://www.flymine.org                                                     various URLs use this as the prefix 
project.helpLocation             http://www.flymine.org/help                                                various URLs use this as the prefix 
===============================  =========================================================================  ======================================================================

.. warning::

	`webapp.baseurl` and `webapp.path` must be correct or else your queries will not run

Email
------

Emails are sent to users when they create an account, forget their password, or use the contact form.

======================  =========================================================  ===================================================================
Property name           Example                                                    Determines  
======================  =========================================================  ===================================================================
mail.host               localhost                                                  mail host to use 
mail.from               account@my_mail_host                                       "from" email address 
mail.subject            Welcome to MalariaMine                                     "subject" for email send when account created 
mail.text               You have successfully created an account on MalariaMine    "body" for email send when account created 
feedback.destination    test_user@mail_address                                     recipient of feedback form located on bottom of every page 
======================  =========================================================  ===================================================================

This is the normal mailer. There is a different configuration for SMTP.

Multiple versions of a mine
----------------------------

It's possible to use several properties files by adding a suffix.  Here's an example scenario:

#. add a suffix to the name of your property file:

    * `malariamine.properties.dev` - points to the development database and a webapp

#. use the `-Drelease` ant target
  
# `dev` is the suffix on the properties filename

.. code-block:: bash

	# malariamine/integrate
	ant build-db -Drelease=dev

	# malariamine/webapp
	ant default remove-webapp release-webapp -Drelease=dev



Default Intermine properties
-------------------------------------

In addition to the user properties above, each mine needs two global properties file.  These should be in the root directory of the mine - e.g. in the malariamine directory. You should not edit these files.

default.intermine.integrate.properties
	used by the loading/integration stage

default.intermine.webapp.properties
	used by the intermine webapp code when running inside Tomcat.


.. index:: multiple mines, Drelease, email, forgot password, feedback, database properties, webapp properties, title, project title, subtitle, release version, help location, contact form, create account, superuser, deploy URL, mine properties, SMTP

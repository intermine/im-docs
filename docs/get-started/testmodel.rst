Testmodel
==========

Create a file called `testmodel.properties` 

* This file tells the testmodel application which databases to use.  
* You will need to change the properties to your own database server and database username/password. 
* Put it in `~/.intermine` with the following contents. 

.. code-block:: properties

	db.userprofile-test.datasource.serverName=localhost
	db.userprofile-test.datasource.databaseName=userprofile-testmodel
	db.userprofile-test.datasource.user=USERNAME
	db.userprofile-test.datasource.password=PASSWORD

	db.unittest.datasource.serverName=localhost
	db.unittest.datasource.databaseName=unittest
	db.unittest.datasource.user=USERNAME
	db.unittest.datasource.password=PASSWORD

	project.sitePrefix=http://www.flymine.org/flymine
	project.releaseVersion=test

	webapp.deploy.url=http://localhost:8080
	webapp.baseurl=http://localhost:8080
	webapp.path=intermine-test
	webapp.manager=TOMCAT_MANAGER
	webapp.password=TOMCAT_PASSWORD
	webapp.logdir=/var/log
	superuser.account=SUPERUSER_EMAIL

	project.rss=NEWS-FEED

	# You don't need to change these
	webapp.os.alias=os.unittest
	webapp.userprofile.os.alias=osw.userprofile-test
	project.standalone=true

Manually create the databases needed by the testmodel application. Execute:

.. code-block:: bash

	$ createdb testmodel-webapp
	$ createdb testmodel-webapp-userprofile

Initialise the two databases:

.. code-block:: bash

	$ cd testmodel/dbmodel
	$ ant clean build-db
	$ ant insert-data-unittest
	$ cd testmodel/webapp/main
	$ ant build-db-userprofile

Build the testmodel web application and release to the running tomcat:

.. code-block:: bash

	$ cd testmodel/webapp/main
	$ ant default release-webapp

If you have previously released a webapp to `/intermine-test` you will need to remove it as well:

.. code-block:: bash

	$ cd testmodel/webapp/main
	$ ant default remove-webapp release-webapp

Browse to http://localhost:8080/intermine-test to view the web interface for the testmodel application.

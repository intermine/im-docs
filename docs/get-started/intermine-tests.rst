InterMine Tests
===============

Continuous Integration
-------------------------

We run all our tests on every commit using the Continous Integration service
`Travis-CI`_. You can do the same for your fork:

  * Log in to Travis-CI with your GitHub account.
  * Enable your fork of intermine for Travis builds.

All the tests will be run on every change you make, and you will be notified
of errors by email.

Setting up a Local Test Environment
----------------------------------------

After getting the source code for InterMine and ensuring you have all of the
required prerequisites, the next step is to try the tests to confirm that
everything runs well in your environment.

We also recommend looking at the files that run our continous integration tests
for examples of how this can be automated:

  * `config/travis/init.sh`
  * `config/travis/run.sh`

Running the core tests
---------------------------

Create databases
~~~~~~~~~~~~~~~~~~~

Create blank databases required by the tests named:  `unittest`,
`truncunittest`, `fulldatatest`, `flatmodetest`, `notxmltest`.  See
PostgresBasics and introduction to some Postgres commands. 

.. code-block:: bash

  $ for db in unittest truncunittest fulldatatest flatmodetest notxmltest; do createdb $db; done


Update properties file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to set up a properties file to provide database details to the test
code.  In your home directory create a file called `intermine-test.properties`
and update the server name, database names, and database username and password.
You can use different database names as long as the actual database name used
to create the database and the `db.xxx.datasource.databaseName` value match.  

.. code-block:: properties

  # super user
  superuser.account=test

  # common properties

  os.query.max-time=10000000
  os.query.max-limit=100000
  os.query.max-offset=10000000
  os.queue-len=100

  # testing properties

  db.notxmlunittest.datasource.serverName=localhost
  db.notxmlunittest.datasource.databaseName=notxmltest
  db.notxmlunittest.datasource.user=USERNAME
  db.notxmlunittest.datasource.password=SECRET_PASSWORD

  db.truncunittest.datasource.serverName=localhost
  db.truncunittest.datasource.databaseName=truncunittest
  db.truncunittest.datasource.user=USERNAME
  db.truncunittest.datasource.password=SECRET_PASSWORD

  db.flatmodeunittest.datasource.serverName=localhost
  db.flatmodeunittest.datasource.databaseName=flatmodetest
  db.flatmodeunittest.datasource.user=USERNAME
  db.flatmodeunittest.datasource.password=SECRET_PASSWORD

  db.fulldatatest.datasource.serverName=localhost
  db.fulldatatest.datasource.databaseName=fulldatatest
  db.fulldatatest.datasource.user=USERNAME
  db.fulldatatest.datasource.password=SECRET_PASSWORD

  db.userprofile-test.datasource.serverName=localhost
  db.userprofile-test.datasource.databaseName=userprofile-test
  db.userprofile-test.datasource.user=USERNAME
  db.userprofile-test.datasource.password=SECRET_PASSWORD

  db.unittest.datasource.serverName=localhost
  db.unittest.datasource.databaseName=unittest
  db.unittest.datasource.user=USERNAME
  db.unittest.datasource.password=SECRET_PASSWORD



There are separate test projects for the main InterMine libraries: core objectstore code, the integration code and the web code.  These are the
packages/directories:

* intermine/objectstore/test
* intermine/integrate/test

Run the tests
~~~~~~~~~~~~~~~~~~~

Run the tests by changing to the appropriate directory and running `ant` with no arguments.  For example:

.. code-block:: bash

  # in intermine/objectstore/test/
  $ ant

In this initial setup you may see some Java Exceptions, for diagnosis of common errors see: CommonErrors

View results
~~~~~~~~~~~~~~~~~~~

The HTML test report will be created in the build directory, eg. `intermine/objectstore/test/build/test/results/index.html`

We aim to keep the tests at a 100% pass rate at all times.


Running the bio tests
--------------------------------

InterMine includes a `bio` project which contains specific code for biological data and parsers for many data formats.  To run tests on this code you need to set up another properties file and create some more databases.

Create databases
~~~~~~~~~~~~~~~~~~~

Create blank databases called `bio-test` and `bio-fulldata-test` (as above you can use different names as long as they match the `db.xxx.datasource.databaseName` values.  For example:

.. code-block:: bash

  $ createdb bio-test
  $ createdb bio-fulldata-test

Update properties file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set up a properties file to provide database details to the test code. In `.intermine` create a file called `intermine-bio-test.properties` and configure the server name, database names, and database username and password. 

.. code-block:: properties

  os.default=os.production-client

  # common properties

  os.query.max-time=10000000
  os.query.max-limit=100000
  os.query.max-offset=10000000
  os.queue-len=100

  # testing properties

  db.bio-fulldata-test.datasource.serverName=localhost
  db.bio-fulldata-test.datasource.databaseName=bio-fulldata-test
  db.bio-fulldata-test.datasource.user=USERNAME
  db.bio-fulldata-test.datasource.password=SECRET_PASSWORD

  db.bio-test.datasource.serverName=localhost
  db.bio-test.datasource.databaseName=bio-test
  db.bio-test.datasource.user=USERNAME
  db.bio-test.datasource.password=SECRET_PASSWORD


Set up a properties file to provide database details to the test code. In `.intermine` create a file called `intermine-bio-test.properties` and configure the server name, database names, and database username and password. 

.. code-block:: properties

  os.default=os.production-client

  # common properties

  os.query.max-time=10000000
  os.query.max-limit=100000
  os.query.max-offset=10000000
  os.queue-len=100

  # testing properties

  db.bio-fulldata-test.datasource.serverName=localhost
  db.bio-fulldata-test.datasource.databaseName=bio-fulldata-test
  db.bio-fulldata-test.datasource.user=USERNAME
  db.bio-fulldata-test.datasource.password=SECRET_PASSWORD

  db.bio-test.datasource.serverName=localhost
  db.bio-test.datasource.databaseName=bio-test
  db.bio-test.datasource.user=USERNAME
  db.bio-test.datasource.password=SECRET_PASSWORD

Build the databases
~~~~~~~~~~~~~~~~~~~

Build database tables automatically generated from the bio model by running the following in `bio/test-all/dbmodel`:

.. code-block:: bash

  $ ant clean build-db

Run the tests
~~~~~~~~~~~~~~~~~~~

Execute the tests, in `bio/test-all` run:

.. code-block:: bash

  $ ant clean; ant


Run a single test
~~~~~~~~~~~~~~~~~~~

You can also run a test for an individual source by running the ant command with no arguments.

.. code-block:: bash

  # in bio/sources/uniprot/test
  $ ant

The test results will be located at `uniprot/test/build/test/results/index.html`.  You can also run these as JUnit tests directly from Eclipse.

.. index:: tests, unit tests

Running the web application tests
--------------------------------

InterMine includes tests for running automated browser based user interface testing using `Selenium <http://www.seleniumhq.org/>`_. In particular the tests are meant to cover the main interface features of the generic web-application.

InterMine's web applications tests are written in Python using unittest as the main test framework, selenium to interact with the Selenium webdriver and nose as a test runner.

The test suite can be found in the intermine/testmodel/webapp/selenium/ directory.

Environment Variables
~~~~~~~~~~~~~~~~~~~

All tests run against a target which is the base URL of an InterMine instance.

.. code-block:: properties

  # The base URL of the web application.
  # Example: http://localhost:8080/intermine-demo
  TESTMODEL_BASE

Credentials for a Gmail account are required to test OpenID authentication in account-login-openid-test.py:

.. code-block:: properties

  # The username of a Gmail account
  TESTMODEL_OPENID_NAME

  # The password of a Gmail account
  TESTMODEL_OPENID_PASSWORD

Run the tests
~~~~~~~~~~~~~~~~~~~

The tests are normally run as part of the CI test suite. They can also be run locally which is always a good idea when a new test is added or an existing test is modified.

To the run tests manually:

.. code-block:: bash

  # in intermine/testmodel/webapp/selenium/
  $ virtualenv venv
  $ source venv/bin/activate
  $ pip install -r requirements.txt
  $ nosetests

Developing test scripts
~~~~~~~~~~~~~~~~~~~

Selenium offers a Firefox plugin called `Selinium IDE <http://www.seleniumhq.org/download/>`_ that can be used to record a user's actions in the browser and then generate Selenium code in a variety of languages. While you may need to write code for more complex scenarios, the plugin can be a fast way to generate most of the work.

Python based test scrips should be placed in intermine/testmodel/webapp/selenium/test/ and their filename should end with "[filename]-test.py". Test scripts in this directory are automatically included when nosetests is executed or when continual integration takes place.

.. _Travis-CI: https://travis-ci.org/intermine/intermine

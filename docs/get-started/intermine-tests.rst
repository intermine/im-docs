InterMine Tests
===============


After getting the source code for InterMine and ensuring you have all of the required prerequisites, the next step is to try the tests to confirm that everything runs well in your environment.

Running the core tests
---------------------------

Create databases
~~~~~~~~~~~~~~~~~~~

Create blank databases required by the tests named:  `unittest`, `truncunittest`, `fulldatatest`, `flatmodetest`, `notxmltest`.  See PostgresBasics and introduction to some Postgres commands. 

.. code-block:: bash

  $ createdb unittest
  $ createdb truncunittest
  $ createdb fulldatatest
  $ createdb flatmodetest
  $ createdb notxmltest


Update properties file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to set up a properties file to provide database details to the test code.  In your home directory create a file called `intermine-test.properties` and update the server name, database names, and database username and password.  

You can use different database names as long as the actual database name used to create the database (in Step 1.1) and the `db.xxx.datasource.databaseName` value match.  See `intermine/doc/example/intermine-test.properties` for an example

There are separate test projects for the main InterMine libraries: core objectstore code, the integration code and the web code.  These are the
packages/directories:

* intermine/objectstore/test
* intermine/integrate/test

Run the tests
~~~~~~~~~~~~~~~~~~~

Run the tests by changing to the appropriate directory and running `ant` with no arguments (see also: [wiki:AntTargets a list of useful ant targets]).  For example:

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

Set up a properties file to provide database details to the test code. In `.intermine` create a file called `intermine-bio-test.properties` and configure the server name, database names, and database username and password. Here is an example: `intermine/doc/example/intermine-bio-test.properties`

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

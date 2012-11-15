InterMine Tests
===============

[[PageOutline]]

= Running the InterMine tests =

After [wiki:SVNCheckout getting the source code] for InterMine and ensuring you have all of the required [wiki:Prerequisites], the next step is to try the tests to confirm that everything runs well in your environment.

= 1 Running the core tests =

== 1.1 Create databases ==

Create blank databases required by the tests named:  `unittest`, `truncunittest`, `fulldatatest`, `flatmodetest`, `notxmltest`.  See PostgresBasics and introduction to some Postgres commands. 
   {{{
createdb unittest
createdb truncunittest
createdb fulldatatest
createdb flatmodetest
createdb notxmltest
}}}

== 1.2 Update properties file ==

You need to set up a properties file to provide database details to the test code.  In your home directory create a file called `intermine-test.properties` and update the server name, database names, and database username and password.  

You can use different database names as long as the actual database name used to create the database (in Step 1.1) and the `db.xxx.datasource.databaseName` value match.  Here is an example:

   [source:/trunk/intermine/doc/example/intermine-test.properties intermine-test.properties]

There are separate test projects for the main InterMine libraries: core objectstore code, the integration code and the web code.  These are the
packages/directories:

  * intermine/objectstore/test/
  * intermine/integrate/test/

== 1.3 Run the tests ==

Run the tests by changing to the appropriate directory and running `ant` with no arguments (see also: [wiki:AntTargets a list of useful ant targets]).  For example:
   {{{
# in intermine/objectstore/test/
ant
}}}

In this initial setup you may see some Java Exceptions, for diagnosis of common errors see: CommonErrors

== 1.4 View results ==

The HTML test report will be created in the build directory, eg. `intermine/objectstore/test/build/test/results/index.html`

We aim to keep the tests at a 100% pass rate at all times.


= 2 Running the bio tests =

InterMine includes a `bio` project which contains specific code for biological data and parsers for many data formats.  To run tests on this code you need to set up another properties file and create some more databases.

== 2.1 Create databases ==

Create blank databases called `bio-test` and `bio-fulldata-test` (as above you can use different names as long as they match the `db.xxx.datasource.databaseName` values.  For example:
   {{{
createdb bio-test
createdb bio-fulldata-test
   }}}

== 2.2 Update properties file ==

Set up a properties file to provide database details to the test code. In {{{.intermine}}} create a file called intermine-bio-test.properties and configure the server name, database names, and database username and password. Here is an example: 

   [source:/trunk/intermine/doc/example/intermine-bio-test.properties intermine-bio-test.properties]

== 2.3 Build the databases ==

Build database tables automatically generated from the bio model by running the following in `bio/test-all/dbmodel`:
  {{{
ant clean build-db
  }}}

== 2.4 Run the tests ==

Execute the tests, in `bio/test-all` run:
  {{{
ant clean; ant
  }}}

== 2.5 Run a single test ==

You can also run a test for an individual source by running the ant command with no arguments.
  {{{
# in bio/sources/uniprot/test
ant
  }}}

The test results will be located at `uniprot/test/build/test/results/index.html`.  You can also run these as JUnit tests directly from Eclipse.

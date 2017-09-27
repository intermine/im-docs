Upgrading InterMine
======================

InterMine 2.0 is a disruptive release and is not backwards compatible. This means that databases, webapps and code from previous releases will need to be updated to work with the new InterMine release. Below are detailed instructions on how to do that.


Gradle 
-------

We now use Gradle to manage dependencies and to build and run InterMine.

New directory structure
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


How to update to use Gradle
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Run this script to 

How to run a database build
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


See Gradle for details.


Data Model
-----------

* Syntenic Regions have been added to the data model
* Protein.molecularWeight is now a float instead of an integer
* GO evidence codes now have a name and URL
* OntologyAnnotation can now annotate any InterMine object, as long as that class inherits `Annotatable`.

See https://intermineorg.wordpress.com/2017/09/08/intermine-2-0-proposed-model-changes-iii/ for details.


Dependencies
--------------------------

Software dependency requirements have been updated to the latest versions. This is so we can get rid of legacy code and make use of new features.

   Java SDK 8
   Tomcat 8.5.x
   Postgres 9.3+


API changes
--------------------------

We are making some non-backwards compatible changes to our API.

/user/queries will be moved to /queries

These three end points have a parameter called xml which holds the XML query. We are going to rename this parameter to be query (as we now accept JSON queries!) to match the syntax of all the other end points.

/query/upload
/template/upload
/user/queries (POST)

.. index:: upgrades, updating InterMine, InterMine 2.0, releases, new releases

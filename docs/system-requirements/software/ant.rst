Ant
===========

Installation Notes
-------------------

Several people have had problems with Ant installations set up by Linux package managers. We recommend installing Ant manually. 

 `Ant's manual <http://ant.apache.org/manual/index.html>`_ has detailed instructions on how to install Ant.
 
 Make sure you don't have any ant-related jars on your classpath already, or else the InterMine build will fail.  

InterMine and Ant
-----------------

The InterMine project uses Ant for compiling code, building data models and databases and for running the data loading/integration process.  You shouldn't ever have to write new Ant XML, but you will run lots of Ant targets we have already defined.  These will usually compile some code, create databases or run particular Java code.

An example use is to create the tables and indexes for a new Mine in an empty PostgreSQL database.  In the `<mine>/dbmodel` directory we would do:

.. code-block:: bash

	$ ant build-db


Whenever you use `ant` you can add a `-v` flag to get verbose output. We recommend doing this as it will give you detailed stack straces if a command fails:

.. code-block:: bash

	$ ant -v build-db


You can pass parameters from the command line using `-Dparameter=value`. For example, when integrating data you can pass in a particular source name:

.. code-block:: bash

	$ ant -v -Dsource=malaria-gff

Ant and the InterMine build system will ensure that all prerequisite code is compiled, the model is created and will create all tables and indexes based on the model.

Common Ant targets
------------------

=========	========================================
Target  	Purpose
=========	======================================== 
clean
clean-all  	clean this project and all dependencies
compile
jar      	produce jar/war
generate 	create generated code
action   	do the action for this project, if any
javadoc  	build javadoc to build/javadoc
=========	========================================



Tests  
`````````````````````


=========	=============================================
Target  	Purpose
=========	============================================= 
default 	will produce a jar and run tests
test
test-all	test all dependencies as well as this project
=========	=============================================


To run a single test class:

.. code-block:: bash

	$ ant -Dtest.includes=org/intermine/ClassToTest.class



DBmodel 
```````````````

=============	========================================
Target  		Purpose
=============	======================================== 
build-db 		build the objectstore
run-iql-query   run an IQL query directly in the console
=============	======================================== 


Webapp 
``````````````````````````

========================	========================================================================== 
Target  					Purpose
========================	========================================================================== 
clean 						removes temporary directories
default 					forces rebuild of .war file
release-webapp 				deploy to tomcat 
remove-webapp 				remove from tomcat 
build-db-userprofile		initialise/clear the userprofile database (loads default templates too)
load-default-templates 		load default-template-queries.xml to the superuser account 
write-userprofile-xml 		exports user profile database xml file to build/userprofile.xml
read-userprofile-xml 		imports user profile database from build/userprofile.xml
drop-precomputed-tables
precompute-queries
precompute-queries-test
precompute-templates
========================	========================================================================== 

Test-model
`````````````````````````````````````````````````````````````````

====================	========================================
Target  				Purpose
====================	======================================== 
insert-data-unittest  	insert test data into database
====================	======================================== 

.. index:: ant

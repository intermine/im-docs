Testmodel
========

= Building the testmodel application =

 1. Check that you have the required software installed and configured, see [wiki:Prerequisites prerequisites].
 1. Get the [wiki:SVNCheckout InterMine software]
 1. Create a file called 'testmodel.properties' 
    * This file tells the testmodel application which databases to use.  
    * You will need to change the properties to your own database server and database username/password. 
    * Put it in {{{~/.intermine}}} with the following contents. 
      [[includeConf(trunk/intermine/doc/example/testmodel.properties)]]
 1. You should now manually create the databases needed by the testmodel application. Execute:
    {{{
createdb testmodel-webapp
createdb testmodel-webapp-userprofile
}}}
 1. Now initialise the two databases:
    {{{
cd testmodel/dbmodel
ant clean build-db
ant insert-data-unittest

cd testmodel/webapp/main
ant build-db-userprofile
}}}
 1. Build the testmodel web application and release to the running tomcat:
    {{{
cd testmodel/webapp/main
ant default release-webapp
}}}
 If you have previously released a webapp to `/intermine-test` you will need to remove it as well:
    {{{
cd testmodel/webapp/main
ant default remove-webapp release-webapp
}}}
 1. Browse to http://localhost:8080/intermine-test to view the web interface for the testmodel application.

----

See:  GettingStarted, QuickStart

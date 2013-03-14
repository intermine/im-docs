Diagnostic
================================

Things to test if something goes wrong when releasing your InterMine webapp:


#. Restart Tomcat

 #. Tomcat may not restart successfully, be sure to check the Tomcat process really is gone.

#. Check MINE.properties files

  #. The `base-url` property must valid or else queries will not run properly.
  #. This file must live in the `.intermine` directory

#. Remove old code

 #. Run `ant clean-all` - sometimes you have to manually remove the webapp and its jar from tomcat webapps directory.
 #. Make sure `/build` is gone from your `webapp` directory.

#. Release webapp

    a. run `ant default remove-webapp release-webapp` 

 If that still doesn't solve your problem, let us know!

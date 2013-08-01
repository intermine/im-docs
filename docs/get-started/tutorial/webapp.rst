Tutorial - webapp
========================

This tutorial aims to cover the basics of configuring an InterMine webapp.

Overview
----------------------

InterMine is a powerful, flexible software program in which is meant to be highly configurable. In general, 
customisation of InterMine is accomplished by updating the appropriate configuration file and redeploying the webapp. 
A few features are updated via tagging as well. See :doc:`/webapp/index` for the full documentation on the webapp.  

This tutorials is intended to give a general idea of what you can customise in InterMine and how to do it. We're going
to go through each section of the webapp and give step by step instructions on how to update your webapp.

Prerequites: You should have completed the previous tutorial, have a userprofile and production database and successfully 
deployed the webapp.

General Layout
---------------------

Each web page in InterMine has a header and footer. The header contains everything at the top of the page, including 
the navigation tabs and the keyword search. The footer contains the contact form and InterMine logo.


Header
~~~~~~~

First, let's update the logo of your site. The logo should be 45px x 43px and named `logo.png`. 

1. Copy your image into this directory: `MINE_NAME/webapp/resources/webapp/model/images`
2. Start Tomcat
3. Deploy your webapp with this command:

ant default remove-webapp release-webapp

If you are making lots of changes to your webapp, you may encounter some issues. If your webapp is slow or fails to 
respond, restart tomcat. If your changes are not being reflected in your webapp, add the `clean` target:

ant clean; ant default remove-webapp release-webapp

This removes all temporary directories so you are certain your new files are being used. The `clean-all` target removes
temporary directories from all dependencies as well.

See :doc:`/prerequisites/software/ant` for a list of ant targets.

You should see your new logo in the top left corner of your webapp. If you don't refresh your browser.

See :doc:`/webapp/layout` for details.



Home page
----------------------

Logo and subtitle
~~~~~~~~~~~~~~~~~~~~~~

First, let's update the logo


There are four main text files you are going to be updating the most:

~/.intermine/<MINE_NAME>.properties
  database and webapp names and locations. includes passwords and shouldn't be in source control.

web.properties
  webapp behaviour, e.g. link outs, tabs on home page

model.properties
  text displayed on webapp, e.g. error messages

webconfig-model.xml
  webapp functionality, e.g. custom export types, widgets

See :doc:`/webapp/properties/index` for details.

Next we are going to go through what you need to do to customise your InterMine instance.


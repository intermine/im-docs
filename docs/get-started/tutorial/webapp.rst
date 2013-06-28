Tutorial - webapp
========================

This tutorial aims to cover the basics of configuring an InterMine instance.

Overview
----------------------

InterMine is a powerful, flexible software program in which is meant to be highly configurable. In general, customisation of InterMine is accomplished by updating the appropriate configuration file and redeploying the webapp. This tutorials is intended to give a general idea of what you can customise in InterMine and how to do it. For the full list, please see :doc:`/webapp/index`. A few features are updated via tagging as well, that will be covered in detail later.

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


Home page
----------------------

Logo and subtitle
~~~~~~~~~~~~~~~~~~~~~~

First, let's update the logo



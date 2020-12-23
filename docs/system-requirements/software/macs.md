Mac Installation Notes
=================================

This is a work in progress, at the moment just some notes and useful links.

Installing Tomcat
-----------------------

Tomcat is easy to install by downloading the tar.gz file of the latest release and extracting it, then you can get started almost immediately.

From the Tomcat website find the latest stable version in the Downloads section, currently 6.0.x.  Scroll to 'Binary Distributions', 'Core' and save the `tar.gz` file.
 
Extract this file with:

.. code-block:: bash

	$ tar -zxvf apache-tomcat-6.0.x

Change into the apache-tomcat-6.0.x, the following directories are of interest:

* `bin` - scripts to startup and shutdown tomcat 
* `logs` - error logs are written here
* `webapps` - the directory web applications are deployed to
* `conf` - configuration files

Before starting you need to set up a mananger user so you can deploy web applications and we recommend you allocate more RAM to tomcat - [wiki:Prerequisites#Tomcat see here]

Start up tomcat by running:

.. code-block:: bash

	$ apache-tomcat-6.0.x/bin/startup.sh

To check tomcat is running try to access `localhost:8080` in a web browser, you should see a Tomcat home page.  If you don't see the tomcat page check `apache-tomcat-6.0.x/catalina.out` and `apache-tomcat-6.0.x/localhost-<data>.log` for error messages and consult the Tomcat docs
 

Installing Eclipse
----------------------------

Eclipse is a free, open-source Java editing environment, configuration to open the various code modules in InterMine as Eclipse projects is included in the checkout.  You can download the Mac OS X version of Eclipse from http://www.eclipse.org/downloads, either the standard or EE edition will work fine.  Just unzip the download and it will work immediately.

See our guide to setting up InterMine in Eclipse: EclipseSetup.

For convenient startup from the Terminal command line you can put `eclipse` in your `$PATH` or create a link to it, for example:

.. code-block:: bash

	$ sudo ln -s /Applications/eclipse/eclipse /usr/local/bin/eclipse 

Apple has a guide to Eclipse at https://beginnersbook.com/2016/04/how-to-install-eclipse-on-mac-os-x/.

Installing Postgres
-----------------------

See http://www.postgresql.org/download/macosx.  We've had the most success with MacPorts.  

.. index:: apples, Mac
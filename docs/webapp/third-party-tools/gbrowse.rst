GBrowse
================================

Link out to another GBrowse
----------------------------------

You can link out to an external GBrowse instance. See here for an example: http://intermine.readthedocs.org/en/latest/webapp/report-page/report-displayers-examples/#gbrowse

GBrowse Instance for your mine
--------------------------------------

GBrowse is an interactive, generic, web-based genome annotation viewer created as part of the GMOD project.  InterMine is able to export GFF3 and FASTA files suitable for importing into a GBrowse instance.  Links in GBrowse can then refer to InterMine object report pages and the report pages can have links to GBrowse.

The GBrowse website has installation instructions and a tutorial.  BioPerl is a requirement of GBrowse.

Properties
~~~~~~~~~~~~~~~~~~~

The dbname, username and password are set in your mine properties file:

.. code-block:: properties

  project.title=FlyMine
  project.sitePrefix=/flymine
  gbrowse.database=gbrowse
  gbrowse.database.adaptor=mysql
  gbrowse.database.source=my-mine-release-1.0
  gbrowse.database.host=localhost
  gbrowse.database.user=username
  gbrowse.database.password=password
  gbrowse.database.write.user=username
  gbrowse.database.write.password=password


The `gbrowse.database.source` property is user visible name of the GBrowse configuration.  It will appear in URLs and on the GBrowse pages.  For example in FlyMine a GBrowse URL could be:

.. code-block:: properties

  http://www.flymine.org/cgi-bin/gbrowse/flymine-release-11.0/?label=Genes;name=FlyMineInternalID_1090061028;width=750


In this case `flymine-release-11.0` is the `gbrowse.database.source`.  This property is also used by GBrowse to choose the configuration file to use from the `gbrowse.config.directory` (see below).  For example if the property is set to `test-mine`, the file will be called `test-mine.conf`.  

The gbrowse.database.write.*, gbrowse.database and gbrowse.database.host properties are used by the `load-gbrowse-data-mysql` target.  The gbrowse.database.user and gbrowse.database.password, gbrowse.database.host, gbrowse.database and gbrowse.database.source properties are used by `ant install-gbrowse-conf` (see below).

Add GBrowse project
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add `/gbrowse` directory to your mine. You can copy FlyMine's, simple replace all mentions of FlyMine with the name of your mine.


Creating files for GBrowse
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On your local machine, in `MINE_NAME/gbrowse`:

.. code-block:: bash

  $ ant write-gff

which writes GFF and FASTA files for each chromosome to the `MINE_NAME/gbrowse/build/gbrowse/data/` directory.

This command may use more than the default memory available for Java.  See the note about setting `ANT_OPTS`, at the bottom the [wiki:Prerequisites] page to increase the limit.

Loading into GBrowse
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To load GFF and FASTA files into a local GBrowse schema you need:

* a machine with GBrowse, BioPerl and MySQL installed
* a 'gbrowse' database present in MySQL (use: `mysqladmin create gbrowse`)
* set your umask to 0002 (to create files readable to all), which is needed so the the MySQL server can read the files created by the next step 

.. code-block:: bash

  $ umask 0002
  $ ant load-gbrowse-data-mysql

This loads the GFF and FASTA files into a local (MySQL) gbrowse schema.

If there are problems, run `ant` with the `-v` flag. 

Installing the MINE_NAME.conf file
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

First make sure that these two properties are in your `MINE_NAME.properties` file:

.. code-block:: properties

  gbrowse.config.directory=/etc/apache2/gbrowse.conf
  gbrowse.www.directory=/var/www/gbrowse


The directories will vary depending on where GBrowse is installed.  You can also use any valid `rsync` path, eg. `some_user@some_machine:/some/path/`

Run this in `MINE_NAME/gbrowse`:

.. code-block:: bash

  $ ant install-gbrowse-conf

which command copies the a GBrowse configuration file from `MINE_NAME/gbrowse/resources/MINE_NAME.conf` into Apache's GBrowse conf directory (as configured with the `gbrowse.config.directory` property).  While being copied the filename is changed to `<source_name>.conf` where `<source_name>` is the value of the `gbrowse.database.source` property.

You will need to make sure that the `gbrowse.config.directory` is writable by the user.

Databse host, username and password are also read from the properties and substituted into `<source_name>.conf`.

GBrowse uses the filename of the configuration file to create the URL to access.  eg. setting gbrowse.database.source to flymine-release-3.0 gives a database that can be accessed at: http://www.flymine.org/browser/bin/gbrowse/flymine-release-3.0

.. index:: GBrowse, genome browser
Create Your InterMine!
==============================

This guide will show you how to create a new InterMine. You will need all the dependencies listed in :doc:`/system-requirements/software/index`

.. note::

    These instructions assume you have taken the :doc:`/get-started/tutorial/index`, a detailed guide to integrating data with InterMine.

1. Run a script to create your InterMine
----------------------------------------

Download the script.

::

    ~/git/ $ git clone https://github.com/intermine/intermine-scripts.git

Execute the script to generate your InterMine instance. Here we are using `TigerMine` but of course you would use your mine name here.

::

    ~/git/ $ ~/git/scripts/make_mine TigerMine

You will see a message like: `created /home/$USER/git/tigermine directory for tigermine`.

You now have an InterMine! The :doc:`tutorial </get-started/tutorial/index>` goes into detail about the various files that comprise an InterMine.

2. Add a mine properties file
------------------------------

Your InterMine uses a properties file for database usernames and passwords, let's create that file now.

Make an intermine directory in your home directory.

::

    # change to be in your home directory
    ~/git $ cd
    # make an intermine directory
    ~ $ mkdir .intermine

Copy the properties file you created in the tutorial. 

::

    ~/.intermine $ wget https://github.com/intermine/biotestmine/blob/master/data/biotestmine.properties 

Rename the file to match your Mine.

::

    ~/.intermine $ mv biotestmine.properties tigermine.properties

Now update your new properties files with the values correct for your InterMine. 

See :doc:`/webapp/properties/intermine-properties` for details on this file and what each property means.

3. Create databases
--------------------------

Just as in the demo, you will create your InterMine databases.

::

    # create the database for your mine data
    ~/git/tigermine $ createdb tigermine
    ~/git/tigermine $ createdb tigermine-items
    # create the database for user information
    ~/git/tigermine $ createdb userprofile-tigermine

.. note::

    These database names should match the ones you added to your mine.properties file in the previous step.

These databases are empty. We'll populate the main database in the following steps, but let's put some default information in our user database now.

::

    # create the empty tables for the user database, plus add the superuser
    ~/git/tigermine $ ./gradlew buildUserDB

4. Update project file
--------------------------

The data loaded into your mine is controlled by the `project.xml` file located in the root of your mine directory. See :doc:`/database/database-building/project-xml` for details on the project XML file. 

InterMine has a few dozen libraries for popular data sources. See :doc:`/database/data-sources/library/index` for the full list. Select one of the data sources and add it to your project XML file.

For example, :doc:`/database/data-sources/library/ncbi-gene` loads gene information from the NCBI. Download the data files listed, then add the given project XML entry to your own mine's project XML file, like so:

::

    <source name="ncbi-gene" type="ncbi-gene">
        <property name="src.data.dir" location="/DATA/ncbi" />
        <property name="organisms" value="9606" />
    </source>

See :doc:`/database/data-sources/custom/index` if you want to load your own data into your mine.

You can also add postprocesses to your build, here are common ones: 

::
  
  <post-processing>
    <post-process name="do-sources" />
    <post-process name="create-attribute-indexes" />
    <post-process name="summarise-objectstore" />
    <post-process name="create-autocomplete-index" />
    <post-process name="create-search-index" />
  </post-processing>
  

See :doc:`/database/database-building/post-processing/index` for details on what postprocesses do.

5. Set up your search index (optional)
---------------------------------------

Solr handles the keyword search in InterMine. See :doc:`/system-requirements/software/solr` for details on how to set this up for your mine.

If you skip this step, your mine will work fine but the keyword search will fail.

6. Build + deploy your webapp
------------------------------

Now run the build!

::

  # download the script
  ~/git/tigermine $ wget https://raw.githubusercontent.com/intermine/intermine-scripts/master/project_build
  # make executable
  ~/git/tigermine $ chmod +x project_build

Run the `project_build` script from your `biotestmine` directory:

::

    ~/git/tigermine $ ./project_build localhost /data/tigermine-build

See :doc:`/database/database-building/build-script` for more on the `project_build` script.

Deploy your webapp. Make sure tomcat is running.

::

    # deploy your webapp to tomcat
    ~/git/tigermine $ ./gradlew cargoDeployRemote 
    # if you have already deployed once, you will want to run this command instead:
    ~/git/tigermine $ ./gradlew cargoRedeployRemote 

See :doc:`/system-requirements/software/gradle/index` for more on Gradle.

Next steps
----------------------------

Congratulations! Next you will want to:

* :doc:`customise your mine </webapp/properties/index>` 
* :doc:`add your own data sources </database/data-sources/custom/index>` 
* :doc:`join the intermine mailing list </support/mailing-list>`

.. index:: Getting started, make_mine

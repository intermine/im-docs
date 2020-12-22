Quick Start
==============================

This guide will show you how to create a `BioTestMine` InterMine instance. You will need all the dependencies listed in :doc:`/system-requirements/software/index`

.. note::

    Please see :doc:`/get-started/tutorial/index`, a detailed guide to integrating data with InterMine.

1. Get the software
----------------------------------------

Clone the repository

::

    ~/git/ $ git clone https://github.com/intermine/biotestmine.git


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

Copy the properties file from the git repository to your local InterMine directory.

::
   
    ~/.intermine $ cp ~/git/biotestmine/data/biotestmine.properties

Now update your new properties files with the values correct for your InterMine. Replace PSQL_USER and PSQL_PWD with your postgres username and password.

See :doc:`/webapp/properties/intermine-properties` for details on this file and what each property means.

3. Set up your search index (optional)
---------------------------------------

Solr handles the keyword search in InterMine. See :doc:`/system-requirements/software/solr` for details on how to set Solr up for your mine.

If you skip this step, your mine will work fine but the keyword search will fail.

4. Build + deploy your webapp
------------------------------

Now run the build!

::

  ~/git/biotestmine $ ./setup.sh

Your build (depending on your server) will take a few minutes to run.

Next steps
----------------------------

Congratulations! You now have an InterMine! Visit it at localhost:8080/biotestmine.

Next you will want to:

* `learn how to use the InterMine webapp <http://intermine.org/tutorials/>`_
* :doc:`customise your mine </webapp/properties/index>` 
* :doc:`add your own data sources </database/data-sources/custom/index>` 
* :doc:`join the intermine mailing list </support/mailing-list>`

.. index:: Quick start, biotestmine

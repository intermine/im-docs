Userprofile 
================================

The user profile is an InterMine ObjectStore which stores Profile information such as username and password, tags, queries, lists and templates.

Creating a new UserProfile database
---------------------------------------

First you must create the empty database in Postgres.  Use this command, replacing HOST and USER with the correct values:

.. code-block:: bash

	$ createdb userprofile -h HOST -u USER

These commands are needed in the webapp to initialise a userprofile database:

.. code-block:: bash

	# in <MINE_NAME>/webapp
	$ ant build-db-userprofile

Releasing a webapp with a new production database
-------------------------------------------------

If you already have a userprofile database and want to keep the data it contains, you can do this:

1. Verify that the `serialNumber` in the new production db and in the userprofile are different. Only in this case, the upgrading list process updates the lists when the user logs in 

.. code-block:: bash

	# run in production and userprofile database.  when releasing a new porduct
	select * from intermine_metadata where key='serialNumber';

2. Release the webapp pointing to the new production db.

3. In the `savedbag` table the field `intermine_current` should be set to `false`.  

4. When the user logs in, the upgrading list process will update the list (using `bagvalues` table) 

* if there are no conflicts the flag will be set to `true` and the user will not have to take any action
* if there are issues (eg. if a gene has merged with another) the flag will be set to `false`, and the user will have to manually upgrade their list.


Templates and tags
----------------------

Default templates and tags are defined in `default-template-queries.xml`.

These are loaded when you build a userprofile database.

Back ups
--------------------------

1. cron job on production runs this script:

* `userprofile_backup_cron`
* dumps db, only saves copy if different from previous version
* updates sym links

2. userprofile_backup_cron script runs this script:
   
* `userprofile_backup`
* does the dumping

.. index:: userprofile, default-template-queries.xml
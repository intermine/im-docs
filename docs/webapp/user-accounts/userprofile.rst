Userprofile 
================================

The user profile is an InterMine ObjectStore which stores Profile information such as username and password, tags, queries, lists and templates.

== Creating a new UserProfile database ==

First you must create the empty database in Postgres.  Use this command, replacing HOST and USER with the correct values:
{{{
% createdb userprofile -h HOST -u USER
}}}


These commands are needed in the webapp to initialise a userprofile database:
{{{
# in <MINE_NAME>/webapp
% ant build-db-userprofile
}}}

== Releasing a webapp with a new production database ==

=== InterMine 0.98 or later ===

For InterMine versions 0.98 or later, if you already have a userprofile database and want to keep the data it contains, you can do this:

 1. Verify that the `serialNumber` in the new production db and in the userprofile are different. Only in this case, the upgrading list process updates the lists when the user logs in 
    {{{
# run in production and userprofile database.  when releasing a new porduct
select * from intermine_metadata where key='serialNumber';
}}}
 1. Release the webapp pointing to the new production db.
 1. In the `savedbag` table the field `intermine_current` should be set to `false`.  
    * When the user logs in, the upgrading list process will update the list (using `bagvalues` table) 
      * if there are no conflicts the flag will be set to `true` and the user will not have to take any action
      * if there are issues (eg. if a gene has merged with another) the flag will be set to `false`, and the user will have to manually upgrade their list.


=== InterMine versions prior to 0.98 ===

For InterMine versions prior to 0.98, if you already have a userprofile database and want to keep the data it contains, you can do this:

{{{
# in <MINE_NAME>/webapp - only for InterMine versions before 0.98
% ant write-userprofile-xml
% ant build-db-userprofile
% ant read-userprofile-xml
}}}

=== Templates and tags ===

Default templates and tags are defined in [source:trunk/bio/tutorial/malariamine/webapp/resources/default-template-queries.xml <MINE_NAME>/webapp/resources/default-template-queries.xml] 

These are loaded when you build a userprofile database.

== Back ups ==

 1. cron job on production runs this script:
    * [http://intermine.org/browser/trunk/bio/scripts/flymine/general/userprofile_backup_cron userprofile_backup_cron] 
    * dumps db, only saves copy if different from previous version
    * updates sym links
 1. userprofile_backup_cron script runs this script:
    * [http://intermine.org/browser/trunk/bio/scripts/userprofile_backup userprofile_backup]
    * does the dumping


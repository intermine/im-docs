List upgrade
================================

When you update an InterMine production database, user lists have to be updated as well. This document aims to describe this process.

Why a list "upgrade" is needed
-----------------------------------------------

Lists are saved in the userprofile `savedbag` table and in the production database `osbag_int` table.

.. code-block:: psql

	       Table "public.savedbag"
	    Column     |  Type   | Modifiers 
	---------------+---------+-----------
 	osbid         | integer | not null
 	type          | text    | 
 	id            | integer | not null
 	name          | text    | 
 	datecreated   | bigint  | 
 	description   | text    | 
 	userprofileid | integer | 
	Indexes:
    	"savedbag_pkey" UNIQUE, btree (id)

   	Table "public.osbag_int"
 	Column |  Type   | Modifiers 
	--------+---------+-----------
 	bagid  | integer | 
 	value  | integer | 
	Indexes:
    "osbag_int_index1" UNIQUE, btree (bagid, value)
    "osbag_int_index2" btree (value, bagid)

To make queries fast, the bag contents are stored in the production database as internal object ids. When we make new releases the object ids are no longer valid. 

Summary
-----------------------------------------------

* upgrade lists only when users log in - so we won't waste time upgrading dormant user accounts and old lists.
* The contents of each list will also be stored in the userprofile database and we will use these to upgrade the list to internal object ids in the new production database.
* The new system knows when the lists need to be upgraded. For this purpose, a serialNumber, identifying the production database, is generated when we build a new production db, and stored in the userprofile database when we release the webapp. If the two serialNumberbs don't match, the system should upgrade the lists. 

Upgrading to a new release
-----------------------------------------------

* When a new production db is built, all the bags have to be upgraded.
* When a user logs in, a thread will begin upgrading their saved lists to the new release - finding and writing the corresponding object ids to the production database.
* The user can verify the status of theirs saved bags in MyMine->Lists page.
* If there are any issues, the user can click on the Upgrade link and browse in the bagUploadConfirm page where all conflicts will be displayed.
* Once the user has resolved any issues, the list can be saved clicking the button 'Upgrade a list of ...' and used for queries, etc.
* If a user never logs in to a particular release, the bag will not be upgraded, but can still be upgraded as normal if the log in to a later release.

.. figure::  ../../imgs/ListUpgrade.jpg
   :align:   center

Lists not current
-----------------------------------------------

If a list is not current:

* the user can't use it in the query/template to add bag contraints
* the bag is not displayed in the List->View page
* the bag is displayed in MyMine->Lists page, but the column Current is setted Not Current. Selecting the link, the user can resolve any issue.
* the bag is not dispayed in the Lists section on the report pages 

Userprofile database
-----------------------------------------------

The list upgrade system, needs a new bagvalues table in the userprofile database, with savedbagid and value columns. This table should be generated manually, running the load-bagvalues-table ant task in the webapp directory. The load-bagvalues-table task, should create the table and load the contents of the list using the former production db, that is the same db used to create the saved lists. Every time, you re-create the userprofile database, you have to re-generate the 'bagvalues' table. In theory, you should never re-create the userprofile db, so you should run the load-bagvalues-table task only once.

The table should be populated with one row corresponding to each row in production db osbag_int table. Each row should contain the IntermineBag id and the first value not empty of the primary identifier field, defined in the class_keys propertiers file.

The 'bagvalues' table is updated when the user is logged-in and:

* create a new list from the result page or starting from some identifiers
* create a new list from union, copy, intersection, subtraction operations
* add or delete some rows to/from the list
* delete a list 

When a user logs in, any lists he has created in his session become saved bags in the userprofile database, and the bagvalues table should be updated as well. The contents of bagvalues is only needed when upgrading to a new release. The thread upgrading the lists, uses the contents of bagvalues as input and, if the list upgrades with no issues:

* write values to osbag_int table
* set in the savedbag table the intermine-current to true
* update osbid.

The `intermine-current`, in the table savedbag, marks whether the bag has been upgraded. The column is generated when you create the userpofile database or when load-bagvalues-table has been executed. 

Serial Number Overview
-----------------------------------------------

The new list upgrade functionality, uses a serialNumber that identifies, in a unique way, the production database. The serialNumber is re-generated each time we build a new production db. On startup of the webapp, the webapp compares the production serialNumber with its own serialNumber (before stored using the production serialNumber). If the two serialNumbers match, the lists will not be updgraded; if don't, the lists are setted as 'not current' and will be upgraded only when the user logs in.

We distinguish four cases:

CASE1: production serialNumber and userprofile serialNumber are both null ==> we don't need upgrade the list.
Scenario: I have released the webapp but I haven't re-build the production db.

CASE2: production serialNumber is not null but userprofile serialNumber is null ==> we need upgrade the lists.
Scenario: I have run build-db in the production db and it's the first time that I release the webapp.
On the startup, the webapp sets intermine_current to false and the userprofile serialNumber value with the production serialNumber value.

CASE3: production serialNumber = userprofile serialNumber ==> we don't need upgrade the lists.
Scenario: we have released the webapp but we haven't changed the production db.

CASE4: production serialNumber != userprofile serialNumber ==> we need upgrade the lists.
Scenario: we have run build-db in the production and a new serialNumber has been generated.

The following diagram, shows the possible states.
With the green, we identify the states that don't need a list upgrade, with the red those need a list upgrade.

.. figure::  ../../imgs/SerialNumber.jpg
   :align:   center

.. index:: list upgrade

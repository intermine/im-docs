List upgrade
================================

When you update an InterMine production database, user lists have to be updated as well. This document aims to describe this process.

Why a list "upgrade" is needed
-----------------------------------------------

Lists are saved in the userprofile `savedbag` table and in the production database `osbag_int` table.

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

Current System
-----------------------------------------------

* upgrade lists only when users log in - so we won't waste time upgrading dormant user accounts and old lists.
* The contents of each list will also be stored in the userprofile database and we will use these to upgrade the list to internal object ids in the new production database.
* The new system knows when the lists need to be upgraded. For this purpose, a serialNumber, identifying the production database, is generated when we build a new production db, and stored in the userprofile database when we release the webapp. If the two serialNumberbs don't match, the system should upgrade the lists. 

.. index:: list upgrade

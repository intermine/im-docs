---
title: List upgrade
---

When you update an InterMine production database, user lists have to be
updated as well. This document aims to describe this process.

Why a list \"upgrade\" is needed
================================

Lists are saved in the userprofile [savedbag]{.title-ref},
[bagvalues]{.title-ref} tables and in the production database
[osbag_int]{.title-ref} table.

Production Database
-------------------

**obsbag_int table**

  **column**   **notes**
  ------------ ---------------------
  bagid        unique bag id
  value        intermine object id

::: {.note}
::: {.title}
Note
:::

The InterMine ID is only valid per database. If the database is rebuilt,
the IDs change and the information in this table becomes incorrect. The
lists require an *upgrade* for them to be updated with the new, correct
InterMine object IDs.
:::

Userprofile Database
--------------------

**savedbag table**

  **column**        **notes**
  ----------------- ------------------------------------
  osbid             bag id
  type              type of object, eg. Gene
  id                id
  name              name of list, provided by user
  datecreated       timestamp
  description       description, provided by user
  userprofileid     user id
  intermine_state   CURRENT, NOT_CURRENT or TO_UPGRADE

**bagvalues table**

  **column**   **notes**
  ------------ ----------------------------------------
  savedbagid   bag id
  value        identifier originally typed in by user
  extra        organism short name

Lists are saved along with the user information in the
[savedbag]{.title-ref} table. The identifiers used to create a list are
also stored in the [bagvalues]{.title-ref} table in the userprofile
database. These identifiers are used to upgrade the list to internal
object ids in the new production database.

To make queries fast, the list contents are stored in the production
database as internal object ids. When a new production database is used,
the object ids are no longer valid and need to be \"upgraded\".

Process
=======

-   Upgrade lists only when users log in - so we won\'t waste time
    upgrading dormant user accounts and old lists.
-   Superuser lists are upgraded when the webapp is first deployed.
-   The webapp knows when the lists need to be upgraded. For this
    purpose a [serialNumber]{.title-ref}, identifying the production
    database, is generated when we build a new production db and stored
    in the userprofile database when we release the webapp. If the two
    serialNumberbs don\'t match, the system should upgrade the lists.

Upgrading to a new release
==========================

-   When a new production db is built, all the lists have to be
    upgraded. Their state is set to NOT_CURRENT.
-   When a user logs in, a thread will begin upgrading their saved lists
    to the new release - finding and writing the corresponding object
    ids to the production database. If there are no issues (all
    identifiers are resolved automatically) the state of the list is set
    to CURRENT.
-   The user can verify the state of theirs saved bags in MyMine-\>Lists
    page.
-   If there are any issues, the state of the list is set to TO_UPGRADE.
    These lists are shown in MyMine-\>List page in a separate table. The
    user can click on the Upgrade List link and browse in the
    bagUploadConfirm page where all conflicts will be displayed.
-   Once the user has resolved any issues, the list can be saved
    clicking the button \'Upgrade a list of \...\' and used for queries,
    etc. The state is set to CURRENT.
-   If a user never logs in to a particular release, the list will not
    be upgraded, but can still be upgraded as normal if the log in to a
    later release.

Lists not current
=================

If a list is not current:

-   the user can\'t use it in the query/template to add list contraints
-   the list is not displayed in the List-\>View page
-   the list is displayed in MyMine-\>Lists page, but the column
    [Current]{.title-ref} is set [Not Current]{.title-ref}. Selecting
    the link, the user can resolve any issue.
-   the list is not dispayed in the Lists section on the report pages

bagvalues table
===============

The list upgrade system, needs a bagvalues table in the userprofile
database, with savedbagid and value columns. This table should be
generated manually, running the [load-bagvalues-table]{.title-ref} ant
task in the webapp directory. The [load-bagvalues-table]{.title-ref}
task, should create the table and load the contents of the list using
the former production db, that is the same db used to create the saved
lists. Every time, you re-create the userprofile database, you have to
re-generate the \'bagvalues\' table. In theory, you should never
re-create the userprofile db, so you should run the
[load-bagvalues-table]{.title-ref} task only once.

Userprofile database
====================

The table should be populated with one row corresponding to each row in
production db osbag_int table. Each row should contain the
[IntermineBag]{.title-ref} id and the first value not empty of the
primary identifier field, defined in the [class_keys]{.title-ref}
properties file.

The [bagvalues]{.title-ref} table is updated when the user is logged in
and:

-   creates a new list from the result page or starting from some
    identifiers
-   creates a new list from union, copy, intersection, subtraction
    operations
-   add or delete some rows to/from the list
-   deletes a list

When a user logs in, any lists he has created in his session become
saved bags in the userprofile database, and the [bagvalues]{.title-ref}
table should be updated as well. The contents of [bagvalues]{.title-ref}
is only needed when upgrading to a new release. The thread upgrading the
lists, uses the contents of bagvalues as input and, if the list upgrades
with no issues:

-   write values to osbag_int table
-   set in the savedbag table the intermine-current to true
-   update osbid.

The [intermine-current]{.title-ref} in the table [savedbag]{.title-ref}
marks whether the bag has been upgraded. The column is generated when
you create the userprofile database or when
[load-bagvalues-table]{.title-ref} has been executed.

Serial Number Overview
======================

The list upgrade functionality uses a serialNumber that identifies the
production database. The serialNumber is re-generated each time we build
a new production db. On startup of the webapp, the webapp compares the
production serialNumber with its own serialNumber (before stored using
the production serialNumber). If the two serialNumbers match, the lists
will not be updgraded; if don\'t, the lists are set as \'not current\'
and will be upgraded only when the user logs in.

There are four cases:

1.  production serialNumber and userprofile serialNumber are both null
    ==\> we don\'t need upgrade the list.

> Scenario: I have released the webapp but I haven\'t re-build the
> production db.

2.  production serialNumber is not null but userprofile serialNumber is
    null ==\> we need upgrade the lists.

> Scenario: I have run [build-db]{.title-ref} in the production db and
> it\'s the first time that I release the webapp. On startup, the webapp
> sets [intermine_current]{.title-ref} to false and the userprofile
> serialNumber value with the production serialNumber value.

3.  production serialNumber = userprofile serialNumber ==\> we don\'t
    need upgrade the lists.

Scenario: we have released the webapp but we haven\'t changed the
production db.

4.  production serialNumber != userprofile serialNumber ==\> we need
    upgrade the lists.

Scenario: we have run [build-db]{.title-ref} in the production and a new
serialNumber has been generated.

The following diagram shows the possible states. With the green, we
identify the states that don\'t need a list upgrade, with the red those
need a list upgrade.

![](../../imgs/SerialNumber.png){.align-center}

::: {.index}
list upgrade
:::

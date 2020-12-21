---
title: Userprofile
---

The user profile is an InterMine ObjectStore which stores Profile
information such as username and password, tags, queries, lists and
templates.

Creating a new UserProfile database
===================================

First you must create the empty database in Postgres.

``` {.bash}
# create the new empty database
~/git/flymine $  createdb userprofile-biotestmine
```

These commands are needed in the webapp to initialise a userprofile
database:

``` {.bash}
# this comment populates superuser, default templates etc.
~/git/flymine $ ./gradlew buildUserDB
```

Releasing a webapp with a new production database
=================================================

If you already have a userprofile database and want to keep the data it
contains, you can do this:

1.  Verify that the [serialNumber]{.title-ref} in the new production db
    and in the userprofile are different. Only in this case, the
    upgrading list process updates the lists when the user logs in

``` {.bash}
# run in production and userprofile database.  when releasing a new product
select * from intermine_metadata where key='serialNumber';
```

2.  Release the webapp pointing to the new production db.
3.  In the [savedbag]{.title-ref} table the field
    [intermine_state]{.title-ref} should be set to [false]{.title-ref}.
4.  When the user logs in, the upgrading list process will update the
    list (using [bagvalues]{.title-ref} table)

-   if there are no conflicts the flag will be set to [true]{.title-ref}
    and the user will not have to take any action
-   if there are issues (eg. if a gene has merged with another) the flag
    will be set to [false]{.title-ref}, and the user will have to
    manually upgrade their list.

Templates and tags
==================

Default templates and tags are defined in
[default-template-queries.xml]{.title-ref}.

These are loaded when you build a userprofile database.

Back ups
========

For our mines, we have a script to back up the user databases every five
minutes, but only if there has been a change.

::: {.index}
userprofile, default-template-queries.xml
:::

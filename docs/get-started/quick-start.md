---
title: Quick Start
---

This guide will show you how to create a [BioTestMine]{.title-ref}
InterMine instance. You will need all the dependencies listed in
`/system-requirements/software/index`{.interpreted-text role="doc"}

::: {.note}
::: {.title}
Note
:::

Please see `/get-started/tutorial/index`{.interpreted-text role="doc"},
a detailed guide to integrating data with InterMine.
:::

1. Get the software
===================

Clone the repository

    ~/git/ $ git clone https://github.com/intermine/biotestmine.git

You now have an InterMine! The
`tutorial </get-started/tutorial/index>`{.interpreted-text role="doc"}
goes into detail about the various files that comprise an InterMine.

2. Add a mine properties file
=============================

Your InterMine uses a properties file for database usernames and
passwords, let\'s create that file now.

Make an intermine directory in your home directory.

    # change to be in your home directory
    ~/git $ cd
    # make an intermine directory
    ~ $ mkdir .intermine

Copy the properties file from the git repository to your local InterMine
directory.

    ~/.intermine $ cp ~/git/biotestmine/data/biotestmine.properties

Now update your new properties files with the values correct for your
InterMine. Replace PSQL_USER and PSQL_PWD with your postgres username
and password.

See `/webapp/properties/intermine-properties`{.interpreted-text
role="doc"} for details on this file and what each property means.

3. Set up your search index (optional)
======================================

Solr handles the keyword search in InterMine. See
`/system-requirements/software/solr`{.interpreted-text role="doc"} for
details on how to set Solr up for your mine.

If you skip this step, your mine will work fine but the keyword search
will fail.

4. Build + deploy your webapp
=============================

Now run the build!

    ~/git/biotestmine $ ./setup.sh

Your build (depending on your server) will take a few minutes to run.

Next steps
==========

Congratulations! You now have an InterMine! Visit it at
localhost:8080/biotestmine.

Next you will want to:

-   [learn how to use the InterMine
    webapp](http://intermine.org/tutorials/)
-   `customise your mine </webapp/properties/index>`{.interpreted-text
    role="doc"}
-   `add your own data sources </database/data-sources/custom/index>`{.interpreted-text
    role="doc"}
-   `join the intermine mailing list </support/mailing-list>`{.interpreted-text
    role="doc"}

::: {.index}
Quick start, biotestmine
:::

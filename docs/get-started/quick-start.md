---
title: Quick Start
---

This guide will show you how to create a `BioTestMine` InterMine instance. You will need all the dependencies listed in [Software](../system-requirements/software/index.md)

{% hint style="info" %}
Please see [Tutorial](tutorial/index.md), a detailed guide to integrating data with InterMine. 
{% endhint %}

### 1. Get the software

Clone the repository

```text
~/git/ $ git clone https://github.com/intermine/biotestmine.git
```

You now have an InterMine! This [tutorial](tutorial/index.md) goes into detail about the various files that comprise an InterMine.

### 2. Add a mine properties file

Your InterMine uses a properties file for database usernames and passwords, let's create that file now.

Make an intermine directory in your home directory.

```text
# change to be in your home directory
~/git $ cd
# make an intermine directory
~ $ mkdir .intermine
```

Copy the properties file from the git repository to your local InterMine directory.

```text
~/.intermine $ cp ~/git/biotestmine/data/biotestmine.properties
```

Now update your new properties files with the values correct for your InterMine. Replace PSQL\_USER and PSQL\_PWD with your postgres username and password.

See [Database and Web application](../webapp/properties/intermine-properties.md) for details on this file and what each property means.

### 3. Set up your search index \(optional\)

Solr handles the keyword search in InterMine. See [Solr](../system-requirements/software/solr.md) for details on how to set Solr up for your mine.

If you skip this step, your mine will work fine but the keyword search will fail.

### 4. Build + deploy your webapp

Now run the build!

```text
~/git/biotestmine $ ./setup.sh
```

Your build \(depending on your server\) will take a few minutes to run.

## Next steps

Congratulations! You now have an InterMine! Visit it at localhost:8080/biotestmine.

Next you will want to:

* [learn how to use the InterMine webapp](http://intermine.org/tutorials/)
* [customise your mine](../webapp/properties/index.md)
* [add your own data sources ](../database/data-sources/custom/index.md)
* [join the intermine mailing list](../support/mailing-list.md)


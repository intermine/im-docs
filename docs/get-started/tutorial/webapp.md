---
title: Tutorial - Configure your InterMine webapp!
---

This tutorial aims to cover the basics of configuring an InterMine webapp.

## Overview

In general, customisation of InterMine is accomplished by updating the appropriate configuration file and redeploying the webapp. See the Web Application section for the full documentation on the webapp.

:::note
You should have completed the previous tutorial and have successfully deployed the webapp.
:::

This tutorial is intended to give a general idea of what you can customise in InterMine and how to do it. We're going to go through each section of the webapp and give step by step instructions on how to configure different parts of the page. This is a detailed tutorial and should take you ~30 minutes to complete - it is not meant to be comprehensive. Where topics aren't covered, there are links provided for more information. If you have a question that you don't see answered, try searching the documentation or taking a look at the index. Intermine has an active developer's [Mailing list](../../support/mailing-list.md) as well.

:::note
You will need to have Tomcat running for this tutorial.
:::

If your webapp is under heavy usage or development, Tomcat may run out of memory. See [Tomcat](../../system-requirements/software/tomcat.md) for details on how to update your settings to adjust the amount of memory available to Tomcat.

## General Layout

Each web page in InterMine has the same header and footer. The header contains everything at the top of the page, including the navigation tabs and the keyword search. The footer contains the contact form and InterMine logo.

![Header and footer of FlyMine website](/img/branding.png)

Let's start configuring our mine by updating these common sections of our web application.

### Header

#### Logo

First, let's update the logo of your site. The logo should be 45x43pixels and named `logo.png`, for example:

![FlyMine's logo](../../imgs/logo.png)

1. Copy your image into this directory:

   `./webapp/src/main/webapp/model/images/logo.png`.

2. Add the property in the `web.properties` file:

   ```text
   branding.images.logo = http://localhost:8080/biotestmine/model/images/logo.png
   ```

3. Deploy your webapp with this command:

    ```text
    $ ./gradlew cargoRedeployRemote
    ```

4. Refresh your browser

![Updated logo](/img/new-logo.png)

You should see your new logo at the top right corner of your webapp. If you don't, try clearing your browser's cache.

#### clean

If your changes are still not being reflected in your webapp, add the `clean` target:

```text
$ ./gradlew clean; ./gradlew cargoRedeployRemote
```

This removes all temporary directories so you are certain your new files are being used.

See [Gradle - Quick Start](../../system-requirements/software/gradle/index.md) for a list of all available Gradle tasks.

#### How do I know which property to change?

Now you know how to change properties and configure your mine. How then do you know _which_ property to change? There are a few resources available to you:

**Web Application**

A detailed section listing of everything you can configure in the InterMine webapp. It's grouped by InterMine webpage, e.g. Home Page, so you should be able to find what you need easily.

**Google**

The search for this site is quite good, although you can still use Google, e.g. here's [a Google search for help with logos](http://google.com/?q=logo+site%3Aintermine.readthedocs.org).

**Ask us!**

A quick email to the dev [Mailing list](../../support/mailing-list.md) usually proves to be quite helpful too.

### Keyword Search

InterMine's keyword search uses a Lucene-based index created at build-time. Every field in the database is indexed, unless you configure a table or column to be skipped. You can also configure facets / categories to help your users mine the search results. See [Keyword Search](../../webapp/keyword-search/index.md) for details on how to configure the keyword search.

:::note
When the first search is executed after a webapp is released, the search index is:

1. Retrieved from the database
2. Written to temp files
3. Loaded into memory for use by the webapp

This can take up to a minute. Our release scripts include a command to run this search so that the index is preloaded.
:::

The Lucene index can become quite large, depending on the size of the database. FlyMine's index is ~2G, so make certain you have plenty of room.

### Footer

The footer is positioned at the bottom of every page in the InterMine webapp. It contains the contact link and the funding message.

![Funding message in footer](/img/intermine_funder.jpg)

To update the funding message, add the project.credit.x properties in the `web.properties` file.

In the [Home Page](../webapp/homepage/index#credits) you can find all the details. 

Redeploy your webapp to see your changes.

## Home page and General layout

See [Home page](../../webapp/homepage/index.md) for more details on how to update your home page.

See [General Layout](../../webapp/layout/index.md) for more details on how to update the header, footer and colour scheme of your InterMine webapp.

## InterMine properties files
| Properties file | Purpose |
| :--- | :--- | :--- |
| [~/.intermine/biotestmine.properties](../../web-services/intermine-properties.md) | database and webapp names and locations, includes passwords and shouldn't be in source control |
| [web.properties](../../webapp/properties/web-properties.md) | webapp behaviour, e.g. link outs, branding, bioschemas markup |
| [webconfig-model.xml](../../webapp/properties/webconfig-model.md) | webapp functionality, e.g. custom export types, widgets |








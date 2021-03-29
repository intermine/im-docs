---
title: InterMine Properties
---

InterMine is governed by a properties file located in the $HOME/.intermine named `$MINE_NAME.properties`. This page describes which values are set in that file.

Example: [https://github.com/intermine/biotestmine/blob/master/data/biotestmine.properties](https://github.com/intermine/biotestmine/blob/master/data/biotestmine.properties)

## Database names and locations

The following properties determine the settings for the production database. This database is used by the build system and the webapp.

| Property name | Example | Determines |
| :--- | :--- | :--- |
| db.production.datasource.serverName | server\_name | server name |
| db.production.datasource.databaseName | biotestmine | database name |
| db.production.datasource.user | postgres\_user | database username |
| db.production.datasource.password | SECRET | database password |

The following properties determine the settings for the items database. This database is used during builds only.

| Property name | Example | Determines |
| :--- | :--- | :--- |
| db.common-tgt-items.datasource.serverName | server\_name | server name |
| db.common-tgt-items.datasource.databaseName | biotestmine | database name |
| db.common-tgt-items.datasource.user | postgres\_user | database username |
| db.common-tgt-items.datasource.password | SECRET | database password |

The following properties determine the settings for the user profile database. This database is used by the webapp only. It holds all user related information, including lists, queries and tags.

| Property name | Example | Determines |
| :--- | :--- | :--- |
| db.userprofile-production.datasource.serverName | server\_name | server name |
| db.userprofile-production.datasource.databaseName | biotestmine | database name |
| db.userprofile-production.datasource.user | postgres\_user | database username |
| db.userprofile-production.datasource.password | SECRET | database password |

## Web application name and location

| Property name | Example | Determines |
| :--- | :--- | :--- |
| os.production.verboseQueryLog | true | if true, all queries are logged. Defaults to false |
| webapp.deploy.url | [http://localhost:8080](http://localhost:8080/) | location of tomcat server |
| webapp.hostname | localhost | name of host |
| webapp.path | biotestmine | location of path of webapp |
| webapp.manager | TOMCAT\_USER | tomcat username, needed to deploy webapp |
| webapp.password | TOMCAT\_PWD | tomcat password, needed to deploy webapp |
| webapp.baseurl | [http://www.flymine.org](http://www.flymine.org/) | home link; used by client side JavaScript AJAX requests |
| superuser.account | [test\_user@mail\_account](mailto:test_user%40mail_account) | account name for superuser |
| superuser.initialPassword | secret | password used when account is created |
| project.standalone | true | run with associated web site. Defaults to false |
| project.title | biotestmine | name of mine |
| project.subTitle | An example of InterMine.bio with data from &lt;i&gt;Plasmodium falciparum&lt;/i&gt; | text that appears in the header at the top of the page |
| project.releaseVersion | tutorial | text that appears at the top of the page next to the mine name |
| project.sitePrefix | [http://www.flymine.org](http://www.flymine.org/) | various URLs use this as the prefix |
| project.helpLocation | [http://www.flymine.org/help](http://www.flymine.org/help) | various URLs use this as the prefix |

**Note**
`webapp.baseurl` and `webapp.path` must be correct or else your queries will not run.

## Email

Emails are sent to users when they create an account, forget their password, or use the contact form.

| Property name | Example | Determines |
| :--- | :--- | :--- |
| mail.host | localhost | mail host to use |
| mail.from | [account@my\_mail\_host](mailto:account%40my_mail_host) | “from” email address |
| mail.subject | Welcome to biotestmine | “subject” for email sent when account is created |
| mail.text | You have successfully created an account on BioTestMine | “body” for email sent when account is created |
| feedback.destination | [test\_user@mail\_address](mailto:test_user%40mail_address) | recipient of feedback form located at the bottom of every page |

This is the normal mailer. There is a different configuration for SMTP.

## Multiple versions of a mine

It's possible to use several properties files by adding a suffix. Here's an example scenario:

1. Add a suffix to the name of your property file:

   `biotestmine.properties.dev` - points to the development database and a webapp

2. Use `-Dorg.gradle.project.release=dev`

   \# `dev` is the suffix on the properties filename

   ```bash
   # build the database specified in dev properties file
   ./gradlew builddb -Dorg.gradle.project.release=dev

   # deploy the webapp specified in dev properties file
   ./gradlew cargoReDeployRemote -Dorg.gradle.project.release=dev
   ```



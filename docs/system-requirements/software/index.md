---
title: Software
---

InterMine makes use of a variety of freely available software packages.

| Software | At least | Purpose |
| :--- | :--- | :--- |
| Git | 1.7 | check out and update source code |
| Java SDK | 8 | build and use InterMine |
| Tomcat | 8.5.x | website |
| PostgreSQL | 9.3.x | database |
| Perl | 5.8.8 | run build scripts |
| Maven | 3.0.5 | manage local dependencies |
| SOLR | 7.2.1 | search engine |

**Note**
InterMine only supports installations onto Linux and Mac OS X systems. Windows systems of any kind are not supported. We run a mixture of Debian and Fedora servers in our data centre in Cambridge.

After installation, most programs require extra configuration to work with InterMine:

* [Git](git.md)
	* [Getting started](git.md#getting-started)
	* [Local Installation (for advanced users)](git.md#local-installation-(for-advanced-users%29)
* [Java](java.md)
	* [GRADLE\_OPTS](java.md#gradle\_opts)
* [Perl](perl.md)
	* [CPAN](perl.md#cpan)
	* [DEB Packages](perl.md#deb-packages)
	* [Manually installing InterMine modules](perl.md#manually-installing-intermine-modules)
	* [List of Perl Modules to Install](perl.md#list-of-perl-modules-to-install)
	* [How to install all the Perl Modules to Run the Data Downloader Script](perl.md#how-to-install-all-the-perl-modules-to-run-the-data-downloader-script)
* [PostgreSQL](postgres/index.md)
	* [Installing PostgreSQL](postgres/postgres.md)
	* [HikariCP and InterMine settings](postgres/hikari.md)
* [Tomcat](tomcat.md)
	* [Installation](tomcat.md#installation)
	* [After Installation](tomcat.md#after-installation)
* [Mac Installation Notes](macs.md)
	* [Installing Tomcat](macs.md#installing-tomcat)
	* [Installing Eclipse](macs.md#installing-eclipse)
	* [Installing Postgres](macs.md#installing-postgres)
* [Maven](maven.md)
* [Intellij](intellij.md)
	* [Errors](intellij.md#errors)
	* [Running Unit Tests](intellij.md#running-unit-tests)
* [Solr](solr.md)
	* [Configure the InterMine instance](solr.md#configure-the-intermine-instance)
	* [Install SOLR](solr.md#installing-solr)
	* [Initialising Search Indexes](solr.md#initialising-search-indexes)
	* [Create Search Indexes](solr.md#create-search-indexes)
	* [Configuring Search Results](solr.md#configuring-search-results)
	* [Production search](solr.md#production-search)

InterMine uses [Gradle](gradle/index.md) to manage the build but do not install Gradle locally. Instead use the wrapper provided.


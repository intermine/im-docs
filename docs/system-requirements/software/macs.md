---
title: Mac Installation Notes
---

This is a work in progress. At the moment, just some notes and useful links.

## Installing Tomcat

Tomcat is easy to install by downloading the tar.gz file of the latest release and extracting it. You can then get started almost immediately.

From the Tomcat website, find the latest stable version in the Downloads section, currently 6.0.x. Scroll to 'Binary Distributions', 'Core' and save the `tar.gz` file.

Extract this file with:

```bash
$ tar -zxvf apache-tomcat-6.0.x
```

Change into the apache-tomcat-6.0.x, the following directories are of interest:

* `bin` - scripts to startup and shutdown tomcat
* `logs` - error logs are written here
* `webapps` - the directory web applications are deployed to
* `conf` - configuration files

Before starting, you need to set up a manager user, so you can deploy web applications. We recommend you allocate more RAM to tomcat - \[wiki:Prerequisites\#Tomcat see here\]

Start up tomcat by running:

```bash
$ apache-tomcat-6.0.x/bin/startup.sh
```

To check tomcat is running, try to access `localhost:8080` in a web browser. You should see a Tomcat home page. If you don't see the tomcat page, check `apache-tomcat-6.0.x/catalina.out` and `apache-tomcat-6.0.x/localhost-<data>.log` for error messages and consult the Tomcat docs.

## Installing Postgres

See [http://www.postgresql.org/download/macosx](http://www.postgresql.org/download/macosx). We've had the most success with MacPorts.


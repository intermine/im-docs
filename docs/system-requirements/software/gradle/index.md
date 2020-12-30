# index

orphan

:

## Gradle - Quick Start

[Gradle](https://gradle.org) is InterMine\'s build tool. In InterMine 2.0 Gradle replaced ant.

Please see `Upgrade instructions </intermine/upgrade>`{.interpreted-text role="doc"} for details on how to migrate your system to use Gradle and `Gradle FAQs </system-requirements/software/gradle/FAQs>`{.interpreted-text role="doc"} for commonly asked questions about Gradle.

Below are common commands you will use when building InterMine database and deploying webapps. See [docs.gradle.org](https://docs.gradle.org/current/userguide/command_line_interface.html) for the full list.

### Data sources

Previously all third party JARs were kept in the InterMine code repository and the build compiled all InterMine dependencies. Now, Gradle, via the Maven plugin, manage and download all JARs and only your local project is compiled.

**To use local data sources**

```text
~/git/flymine-bio-sources $ ./gradlew install
```

* See the maven plugin docs on the \[install

  task\]\([https://docs.gradle.org/current/userguide/maven\_plugin.html](https://docs.gradle.org/current/userguide/maven_plugin.html)\)

  for details.

* Example: [https://github.com/intermine/flymine-bio-sources](https://github.com/intermine/flymine-bio-sources) -

  FlyMine-specific data sources.

* When installed locally, the JAR that is produced is available in the

  maven repo located in \[~/.m2/repository\]{.title-ref}

* The JARs downloaded as dependencies are available in the Gradle

  cache, \[~/.gradle/caches/modules-2/files-2.1/\]{.title-ref}.

::: {.note} ::: {.title} Note :::

The build is going to be looking at the resulting JAR created by this command. If you make any changes to your data sources, install again to update the JAR to make those changes visible to the build. :::

**To use common data sources in the InterMine library**

* No action required. Use project XML file as normal.

The migration script you used set up the dependency to the \[intermine-bio-sources\]{.title-ref} project already. This project includes \[uniprot\]{.title-ref} and other data sources, and are on the classpath. During the build, the code will look for the uniprot jar, e.g. \[bio-source-uniprot-2.0.jar\]{.title-ref} and find it on the classpath successfully. Maven will download it for you.

### Database

Delete and recreate all database tables

```text
~/git/flymine $ ./gradlew buildDB
```

Delete and recreate all database tables using a specific property file.

```text
~/git/flymine $ ./gradlew buildDB -Dorg.gradle.project.release=dev
```

To run a single source

```text
~/git/flymine $ ./gradlew integrate -Psource=uniprot  --stacktrace
```

::: {.note} ::: {.title} Note :::

You can try --info or --debug too :::

To run a single postprocess

```text
~/git/flymine $ ./gradlew postprocess -Pprocess=do-sources --stacktrace
```

To run a full build

```text
~/git/flymine $ ./project_build -b localhost /tmp/flymine-dump
```

We are using the same [project build](https://github.com/intermine/intermine-scripts/blob/master/project_build) script, but we\'ve moved it to the \[intermine-scripts\]{.title-ref} repository with our other scripts.

### Webapp

There are several ways to deploy your InterMine webapp. You can use \[cargo\]{.title-ref} to deploy your webapp to a running Tomcat instance, or \[gretty\]{.title-ref} to use an embedded Tomcat instance. Run \[./gradlew tasks\]{.title-ref} to see all the available tasks.

We use \[cargo\]{.title-ref} for our production instances and \[gretty\]{.title-ref} on our local dev machines.

#### Deploy a webapp \(cargo\)

```text
~/git/flymine $ ./gradlew cargoDeployRemote
~/git/flymine $ ./gradlew cargoRedeployRemote
~/git/flymine $ ./gradlew cargoUndeployRemote
```

Uses the config in the mine properties file, e.g. \[flymine.properties\]{.title-ref}, to deploy the webapp, see below.

Property name Example Determines

webapp.hostname localhost name of host. If not set, tries to use \[webapp.deploy.url\]{.title-ref} webapp.path flymine location of path of webapp webapp.manager TOMCAT\_USER tomcat username, needed to deploy webapp webapp.password TOMCAT\_PWD tomcat password, needed to deploy webapp webapp.protocol https OPTIONAL, defaults to http webapp.port 8081 OPTIONAL, defaults to 8080

::: {.warning} ::: {.title} Warning :::

Cargo uses hot deployment which over time fills up the PermGen memory of the JVM process running your container. Continuously deploying an artifact will inevitablity lead to a java.lang.OutOfMemoryError :::

#### Deploy a webapp \(gretty\)

```text
~/git/flymine $ ./gradlew tomcatStartWar
~/git/flymine $ ./gradlew tomcatStop
```

* Embedded tomcat, uses port 8080.
* Logs are in $HOME/logs, for more details:

  [http://akhikhl.github.io/gretty-doc/Logging.html](http://akhikhl.github.io/gretty-doc/Logging.html)

#### Deploy blue genes

```text
~/git/flymine $ ./gradlew blueGenesStart
```

* Gets the \[mine name\]{.title-ref}, \[URL\]{.title-ref} and tools

  location from the $mine.properties file.

* Uses the webservices from the webapp specified in the

  $mine.properties file. For the time being, you have to have an

  InterMine webapp running to launch a bluegenes instance.

* The app will be deployed at the specified \[URL\]{.title-ref},

  port 5000.

* It is suggested to launch the app in the background \(append

  \[&\]{.title-ref} to the command\).

* Please see `Blue genes </webapp/blue-genes/index>`{.interpreted-text

  role="doc"} for details on how to configure your bluegenes instance.

### Specify properties file

To use a specific properties file, set the file suffix with the \[-Dorg.gradle.project.release\]{.title-ref} parameter like so:

```text
~/git/flymine $ ./gradlew builddb -Dorg.gradle.project.release=dev
```

That command will build the database set in the \[flymine.properties.dev\]{.title-ref} file.

### Gradle

To see a list of command-line options, run

```text
./gradlew --help
```

To see what tasks are available

```text
./gradlew tasks
```

To get rid of compiled files

```text
./gradlew clean
```

To update your local packages

```text
./gradlew install
```

* See

  `Local installation </system-requirements/software/git/>`{.interpreted-text

  role="doc"} for how to install InterMine locally. \(You shouldn\'t do

  this normally, instead use the JARs available via Maven\).

* Always use \[./gradlew\]{.title-ref} instead of \[gradle\]{.title-ref}.

  This is the wrapper that comes with InterMine and ensure that

  everyone is using the same version.

#### Daemons

The updated Gradle version comes with \[daemons\]{.title-ref} enabled by default. These are helper processes that exist in the background. This can speed up builds for example but sometimes, under heavy development, can cause problems when InterMine does not properly dereference assets. We are working on fixing this! In the meantime, you should append \[-Dorg.gradle.daemon=false\]{.title-ref} to your \[GRADLE\_OPTS\]{.title-ref} variable.

* See: \[Daemon

  docs\]\([https://docs.gradle.org/current/userguide/gradle\_daemon.html](https://docs.gradle.org/current/userguide/gradle_daemon.html)\)

### Further Reading

* \[Gradle

  docs\]\([https://docs.gradle.org/current/userguide/command\_line\_interface.html](https://docs.gradle.org/current/userguide/command_line_interface.html)\)

* \[InterMine blog

  post\]\([https://intermineorg.wordpress.com/2017/09/13/intermine-2-0-gradle/](https://intermineorg.wordpress.com/2017/09/13/intermine-2-0-gradle/)\)

* \[InterMine

  presentation\]\([https://docs.google.com/presentation/d/1mgcC7TSieHa4JdYzxYUVspftKO8rDpFN0X9JaKQXkDM/edit](https://docs.google.com/presentation/d/1mgcC7TSieHa4JdYzxYUVspftKO8rDpFN0X9JaKQXkDM/edit)\)

::: {.index} gradle, ant, cargo, gretty, bluegenes, tomcat, JARs :::


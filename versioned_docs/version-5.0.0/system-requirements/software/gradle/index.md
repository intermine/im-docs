---
title: Gradle - Quick Start
---

[Gradle](https://gradle.org) is InterMine's build tool. In InterMine 2.0, Gradle replaced ant.

Please see [Upgrade instructions](../../../intermine/upgrade.md) for details on how to migrate your system to use Gradle and [Gradle FAQs](faqs.md) for commonly asked questions about Gradle.

Below are common commands you will use when building InterMine databases and deploying webapps. See [docs.gradle.org](https://docs.gradle.org/current/userguide/command_line_interface.html) for the full list.

### Data sources

Previously, all third party JARs were kept in the InterMine code repository and the build compiled all InterMine dependencies. Now, Gradle, via the Maven plugin, manages and downloads all JARs and only your local project is compiled.

**To use local data sources**

```text
~/git/flymine-bio-sources $ ./gradlew install
```

* See the maven plugin docs on the [install task](https://docs.gradle.org/current/userguide/maven_plugin.html) for details.
* Example: [https://github.com/intermine/flymine-bio-sources](https://github.com/intermine/flymine-bio-sources) - FlyMine-specific data sources.
* When installed locally, the JAR that is produced is available in the

  maven repo located in `~/.m2/repository`

* The JARs downloaded as dependencies are available in the Gradle

  cache, `~/.gradle/caches/modules-2/files-2.1/`.

**Note**
The build is going to be looking at the resulting JAR created by this command. If you make any changes to your data sources, install again to update the JAR to make those changes visible to the build.

**To use common data sources in the InterMine library**

* No action required. Use project XML file as normal.

The migration script you used already set up the dependency to the `intermine-bio-sources` project. This project includes `uniprot` and other data sources, and are on the classpath. During the build, the code will look for the uniprot jar, e.g. `bio-source-uniprot-2.0.jar` and find it on the classpath successfully. Maven will download it for you.

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

**Note**
You can try --info or --debug too

To run a single postprocess

```text
~/git/flymine $ ./gradlew postprocess -Pprocess=do-sources --stacktrace
```

To run a full build

```text
~/git/flymine $ ./project_build -b localhost /tmp/flymine-dump
```

We are using the same [project build](https://github.com/intermine/intermine-scripts/blob/master/project_build) script, but we've moved it to the `intermine-scripts` repository with our other scripts.

### Webapp

To deploy your InterMine webapp you can use the [cargo](https://github.com/bmuschko/gradle-cargo-plugin/blob/master/README.md) gradle plugin. Run `./gradlew tasks` to see all the available tasks.

#### Deploy a webapp to a running Tomcat instance

```text
~/git/flymine $ ./gradlew cargoDeployRemote
~/git/flymine $ ./gradlew cargoRedeployRemote
~/git/flymine $ ./gradlew cargoUndeployRemote
```

Uses the config in the mine properties file, e.g. `flymine.properties`, to deploy the webapp, see below.

| Property name | Example | Determines |
| :--- | :--- | :--- |
| webapp.hostname | localhost | name of host. If not set, tries to use webapp.deploy.url |
| webapp.path | flymine | location of path of webapp |
| webapp.manager | TOMCAT\_USER | tomcat username, needed to deploy webapp |
| webapp.password | TOMCAT\_PWD | tomcat password, needed to deploy webapp |
| webapp.protocol | https | OPTIONAL, defaults to http |
| webapp.port | 8081 | OPTIONAL, defaults to 8080 |

**Note**
Cargo uses hot deployment which over time, fills up the PermGen memory of the JVM process running your container. Continuously deploying an artifact will inevitably lead to a java.lang.OutOfMemoryError

#### Deploy a webapp with embedded Tomcat
Only on your local dev machines.

```text
~/git/flymine $ ./gradlew cargoRunLocal
```

* Embedded tomcat, uses port 8080.

#### Trying out BlueGenes

:::note
**This approach is only recommended for trying out the app.** See [BlueGenes](../../../webapp/bluegenes/index) for deploying to a production environment.
:::

```text
~/git/flymine $ ./gradlew blueGenesStart
```

* The app will run at localhost on port 5000.
* Will use `systemProp.blueGenesVersion` defined in gradle.properties file.
* Uses the following parameters defined in the `~/.intermine/$MINE.properties` file.

| purpose | parameter | example |
| :--- | :--- | :--- |
| base URL for mine's web services | webapp.baseurl | http://www.flymine.org |
| path appended to the base URL and unique namespace for mine | webapp.path | flymine |
| name of your mine as it will be displayed in BlueGenes | project.title | BioTestMine |
| location of JavaScript tools | bluegenes.toolLocation | /intermine/tools/ |


### Specify properties file

To use a specific properties file, set the file suffix with the `-Dorg.gradle.project.release` parameter like so:

```text
~/git/flymine $ ./gradlew builddb -Dorg.gradle.project.release=dev
```

That command will build the database set in the `flymine.properties.dev` file.

### Gradle

To see a list of command-line options, run:

```text
./gradlew --help
```

To see what tasks are available, run:

```text
./gradlew tasks
```

To get rid of compiled files, run:

```text
./gradlew clean
```

To update your local packages, run:

```text
./gradlew install
```

* See [Local installation](../git.md) for how to install InterMine locally. \(You shouldn't do

  this normally, instead use the JARs available via Maven\).

* Always use `./gradlew` instead of `gradle`. This is the wrapper that comes with InterMine and ensures that everyone is using the same version.

#### Daemons

The updated Gradle version comes with `daemons` enabled by default. These are helper processes that exist in the background. This can speed up builds for example, but sometimes, under heavy development, can cause problems when InterMine does not properly dereference assets. We are working on fixing this! In the meantime, you should append `-Dorg.gradle.daemon=false` to your `GRADLE_OPTS` variable.

* See: [Daemon docs](https://docs.gradle.org/current/userguide/gradle_daemon.html)

### Further Reading

* [Gradle docs](https://docs.gradle.org/current/userguide/command_line_interface.html)
* [InterMine blog post](https://intermineorg.wordpress.com/2017/09/13/intermine-2-0-gradle/)
* [InterMine presentation](https://docs.google.com/presentation/d/1mgcC7TSieHa4JdYzxYUVspftKO8rDpFN0X9JaKQXkDM/edit)


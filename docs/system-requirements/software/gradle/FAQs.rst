Gradle - FAQs
================

`Gradle <https://gradle.org>`_ is InterMine's build tool. In InterMine 2.0 Gradle replaced ant.

Please see :doc:`Upgrade instructions </support/upgrade>` for details on how to migrate your system to use Gradle and :doc:`Gradle Quick Start </system-requirements/software/gradle/index>` for common Gradle commands.


I got an error: "Caused by: java.security.InvalidKeyException: EC parameters error"
--------------------------------------------------------------------------------------------------------------------

InterMine 2.0 only works with Java 8+. Please update your Java version and that will fix this error.

I got an error: "Caused by: java.security.NoSuchProviderException: no such provider: SunEC"
--------------------------------------------------------------------------------------------------------------------

InterMine 2.0 only works with Java 8+. Please update your Java version and that will fix this error.

I got ANOTHER error: "java.lang.ClassCastException: org.apache.xerces.parsers.XIncludeAwareParserConfiguration cannot be cast to org.apache.xerces.xni.parser.XMLParserConfiguration "
--------------------------------------------------------------------------------------------------------------------

Updated your `GRADLE_OPTS` to disable deamons. 

`export GRADLE_OPTS="-Dorg.gradle.daemon=false"`

`./gradlew builddb` works but I don't see `builddb` in my `build.gradle` file. Where is it?
--------------------------------------------------------------------------------------------------------------------

All the ant tasks that were in the `imbuild` directory are now Gradle tasks located in the InterMine Plugin. For example, the `builddb <https://github.com/intermine/intermine/blob/gradle/plugin/src/main/groovy/org/intermine/plugin/dbmodel/DBModelPlugin.groovy>`_ task is located in the `DBModelPlugin <https://github.com/intermine/intermine/blob/gradle/plugin/src/main/groovy/org/intermine/plugin>`_ 

These tasks may be helpful:

.. code-block:: sh
    
    # see the available tasks to run
    ~/git/flymine $ ./gradlew tasks
    
    # see which tasks are being run during the execution of a specific command
    ~/git/flymine $ ./gradlew builddb --info

Gradle tasks can be overridden by your local Gradle `build.gradle` file. You can also add new tasks.

How does my mine know to use the Plugin? How do dependencies work?
--------------------------------------------------------------------------------------------

In the mine `build.gradle` file you will see the `plugin` added to the mine's dependencies:

.. code-block:: gradle

    dependencies {
        classpath group: 'org.intermine', name: 'plugin', version: System.getProperty("imVersion")
    }

If you look at the Plugin, you will see that it depends on InterMine specific packages, e.g. intermine-objectstore and bio-core.

The `System.getProperty("imVersion")` by default is set to be `2.0.+` in your local `gradle.properties` file but you can change this.

Where is InterMine code on my server?
--------------------------------------------------------------------------------------------

The InterMine JARs are here on your machine:

.. code-block:: bash

    # gradle - remote repos
    ~/.gradle/caches/modules-2/files-2.1/org.intermine/
    # maven - local installs
    ~/.m2

You normally will be pulling the JARs down from the remote repository, unless you have installed the JARs locally yourself.

Which JAR am I using? I have JARs in both of those directories.
--------------------------------------------------------------------------------------------

Here is an excerpt from the mine's `build.gradle` file the determines which JAR is being used:

.. code-block:: guess

    repositories {
        mavenLocal()
        jcenter()
        maven {
            url "https://oss.jfrog.org/artifactory/oss-snapshot-local"
        }
    }

Gradle will go through these respositories in order. It stops when it finds a match for the specfied JAR.

Maven Local
~~~~~~~~~~~~~~~

Gradle first looks in `mavenLocal()` which is your `~/.m2/repository` directory. 

These are JARs you have installed locally. 

Remote Repositiories (JCenter and JFrog)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If Gradle does NOT find a local JAR, it will look in the remote repositories (JCenter and Jfrog).

`JCenter <https://jcenter.bintray.com/>`_ is where our InterMine release JARs will be stored remotely. 

`JFrog <https://oss.jfrog.org/artifactory/webapp/#/home>`_ is where our InterMine SNAPSHOT JARs are currently.

Gradle will pull down the correct JAR and store in `~/.gradle/caches/modules-2/files-2.1/org.intermine/`.

I don't want to use the InterMine JAR provided. I have custom code for only me and want to use my own JAR.
------------------------------------------------------------------------------------------------------------------------

1. Clone the repo https://github.com/intermine/intermine as normal.
2. Change to use the gradle branch.
3. Merge your code changes into the InterMine repo.
4. "Install" the InterMine JAR

.. code-block:: bash

    # if your code changes are in InterMine        
    ~/git/intermine/intermine $ ./gradlew install
    # if your code changes are in the plugin        
    ~/git/intermine/plugin $ ./gradlew install
    # if your code changes are in bio
    ~/git/intermine/bio $ ./gradlew install
    # if your code changes are in a bio-source
    ~/git/intermine/bio/sources $ ./gradlew install

Installing a Gradle project:

1. Compiles the code and creates a JAR
2. Maven puts this JAR on the classpath by copying to local `~/.m2` directory.
3. Because of the order of repos, local JARs are always used first


I got an out of memory error! Help!
----------------------------------------------

Gradle gets its properties differently from ant. Instead of `ANT_OPTS`, set `GRADLE_OPTS`. Use the same values.

I set `GRADLE_OPTS` properly and I still am getting an "out of memory" error message
--------------------------------------------------------------------------------------------

Use the `--no-daemon` flag when running `./gradlew` commands. This will prevent the use of daemons.

The Gradle daemon's memory settings are set in the `gradle.properties` file. If you do not have them set, the default value is 1 GB of memory. This is insufficient for building an InterMine and you will get errors. If you don't use daemons, the Gradle process will use the values set in `GRADLE_OPTS`.

I got a different error! Help!
----------------------------------------------

Please send a detailed stacktrace to the dev mailing list. 

Common issues:

* Always use the wrapper provided. `./gradlew` and NOT `gradle`.
* Using a `daemon`. Always use the `--no-daemon` flag. Run `./gradlew --stop` to stop the running daemons.

.. index:: gradle, ant

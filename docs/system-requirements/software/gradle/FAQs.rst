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

I got an out of memory error! Help!
----------------------------------------------

Gradle gets its properties differently from ant. Instead of `ANT_OPTS`, set `GRADLE_OPTS`. Use the same values but also append `-Dorg.gradle.daemon=false` to prevent the use of Gradle daemons.

I set `GRADLE_OPTS` properly and I still am getting an "out of memory" error message
--------------------------------------------------------------------------------------------

Append `-Dorg.gradle.daemon=false` to prevent the use of Gradle daemons.

I got ANOTHER error: "java.lang.ClassCastException: org.apache.xerces.parsers.XIncludeAwareParserConfiguration cannot be cast to org.apache.xerces.xni.parser.XMLParserConfiguration "
--------------------------------------------------------------------------------------------------------------------

Update your `GRADLE_OPTS` to disable deamons. 

`export GRADLE_OPTS="-Dorg.gradle.daemon=false"`

Error in log file when I deploy my webapp: "Caused by: java.io.IOException: Error writing request body to server"
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Try `./gradlew cargoRedeployRemote` instead of `./gradlew cargoDeployRemote`

I tried to install my data source, but I got an exception saying it can't find a class. I know this class IS in my data model though!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Update your source's additions file to include this class.

Previously, all additions files listed in your project XML were merged into a single genomic_model.xml that was placed on your classpath. Now, instead, only the core data model and your additions file are merged into genomic_model.xml and placed in the JAR of the data source. 

Alternatively, you can set the `extraAdditionsFile` parameter to specify a single file that will be merged into each of your data sources. Look for this configuration in your mine's bio sources `build.gradle` file.

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

Gradle will go through each of these repositories and use the best version it finds.

Maven Local
~~~~~~~~~~~~~~~

Gradle first looks in `mavenLocal()` which is your `~/.m2/repository` directory. These are JARs you have installed locally. 

Remote Repositiories (JCenter and JFrog)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Gradle then looks in the remote repositories (JCenter and Jfrog).

`JCenter <https://jcenter.bintray.com/org/intermine/>`_ is where our InterMine JARs are stored remotely. 

`JFrog <https://oss.jfrog.org/artifactory>`_ is where our InterMine SNAPSHOT JARs are currently.

Gradle will use the JAR with the latest version. This is because we use the `2.0+` notation. 

The versions for the JARs are set in each project:

.. code-block:: guess

     intermine/build.gradle
     plugin/build.gradle
     bio/build.gradle
     bio/sources/build.gradle
     bio/postprocess/build.gradle

Currently this version is **2.0.0-RC-01**

Which dependency versions to use is set in the gradle.properties file for each project:

.. code-block:: guess

     intermine/gradle.properties
     plugin/gradle.properties
     bio/gradle.properties
     bio/sources/gradle.properties
     bio/postprocess/gradle.properties

Currently set to **2.0+**

You can overwrite this value and set these values in your mine's `gradle.properties` file.

I got a different error! Help!
----------------------------------------------

Please send a detailed stacktrace to the dev mailing list, or pop onto our discord -- chat.intermine.org.

Common issues:

* Always use the wrapper provided. `./gradlew` and NOT `gradle`.
* Using a `daemon`. Update your `GRADLE_OPTS` with the `no-daemon` flag.

.. index:: gradle, ant, Maven

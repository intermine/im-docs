Gradle - FAQs
================

`Gradle <https://gradle.org>`_ is InterMine's build tool. In InterMine 2.0 Gradle replaced ant.

Please see :doc:`Upgrade instructions </support/upgrade>` for details on how to migrate your system to use Gradle and :doc:`Gradle Quick Start </system-requirements/software/gradle/index>` for common Gradle commands.

`./gradlew builddb` works but I don't see `builddb` in my `build.gradle` file. Where is it?
--------------------------------------------------------------------------------------------------------------------

The Gradle tasks are located in the InterMine Plugin

For example, the `builddb <https://github.com/intermine/intermine/blob/gradle/plugin/src/main/groovy/org/intermine/plugin/dbmodel/DBModelPlugin.groovy>`_ task is located in the `DBModelPlugin <https://github.com/intermine/intermine/blob/gradle/plugin/src/main/groovy/org/intermine/plugin>`_ 

These tasks may be helpful:

.. code-block:: sh
    
    # see the available tasks to run
    ~/git/flymine $ ./gradlew tasks
    
    # see which tasks are being run during the execution of a specific command
    ~/git/flymine $ ./gradlew builddb --info

Gradle tasks can be overridden by your local Gradle `build.gradle` file. You can also add new tasks.

Where is InterMine code on my server?
--------------------------------------------------------------------------------------------

The JARs are here on your machine:

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

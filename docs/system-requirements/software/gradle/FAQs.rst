Gradle - FAQs
================

`Gradle <https://gradle.org>`_ is InterMine's build tool. In InterMine 2.0 Gradle replaced ant.

Please see :doc:`Upgrade instructions </support/upgrade>` for details on how to migrate your system to use Gradle and :doc:`Gradle Quick Start </system-requirements/software/gradle/index>` for common Gradle commands.

I am running `./gradlew builddb` but I don't see a `builddb` command in my `build.gradle` file. Where is it?
----------------------------------------------------------------------------------------------------------------

The Gradle tasks are located in the InterMine Plugin, but can be overridden by your local Gradle `build.gradle` file. 

For example, the `builddb <https://github.com/intermine/intermine/blob/gradle/plugin/src/main/groovy/org/intermine/plugin/dbmodel/DBModelPlugin.groovy>`_ task is located in the `DBModelPlugin`. 

.. code-block:: sh
    
    # see the available tasks to run
    ~/git/flymine $ ./gradlew tasks

.. code-block:: sh
    
    # see which tasks are being run during the execution of a specific command
    ~/git/flymine $ ./gradlew builddb --info

I see the `builddb` task in the Plugin. Where is that code on my server?
--------------------------------------------------------------------------------------------

The JARs are here on your machine:

# gradle - remote repos
~/.gradle/caches/modules-2/files-2.1/org.intermine/

# maven - local installs
~/.m2

Which JAR am I using?
--------------------------------------------------------------------------------------------

Here is an excerpt from the mine's build.gradle file:

```
  repositories {
    mavenLocal()
    jcenter()
    maven {
        url "https://oss.jfrog.org/artifactory/oss-snapshot-local"
    }
  }
```

Gradle will go through these respositories in order. It stops when it finds a match.

Maven Local
~~~~~~~~~~~~~~~

Gradle first looks in `mavenLocal()` which is your `~/.m2` (maven) directory. 

These are JARs you have installed locally. 

Remote Repositiories (JCenter and JFrog)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If Gradle does NOT find a local JAR, it will look in the remote repositories (jcenter and jfrog).


I got an out of memory error! Help!
----------------------------------------------

Gradle gets its properties differently from ant. Instead of `ANT_OPTS`, set `GRADLE_OPTS`. Use the same values.

I set `GRADLE_OPTS` properly and I still am getting an error message
--------------------------------------------------------------------------------------------

The Gradle daemon's memory settings are set in the `gradle.properties` file. If you do not have them set, the default value is 1 GB of memory. This is insufficient for building an InterMine and you will get errors.

Instead, use the `--no-daemon` flag when running `./gradlew` commands. This will prevent the use of daemons, and instead use the values set in `GRADLE_OPTS`.

I got a different error! Help!
----------------------------------------------

Please send a detailed stacktrace to the dev mailing list. Common issues:

* 

.. index:: gradle, ant

Gradle
========

`Gradle <https://gradle.org>`_ is InterMine's build tool. In InterMine 2.0 Gradle replaced ant.

Please see :doc:`Upgrade instructions </support/upgrade>` for details on how to migrate your system to use Gradle.

Below are common commands you will use when building InterMine database and deploying webapps.

Data sources
----------------------------

One of the biggest shifts is how InterMine handles dependencies. Previously all third party JARs were kept in the InterMine code repository and the build compiled all InterMine dependencies. Now, Gradle and Maven manage and download all JARs and only your local project is compiled.

**To use local data sources**

.. code-block:: sh
    
    ~/git/flymine-bio-sources $ ./gradlew install

* https://github.com/intermine/flymine-bio-sources - FlyMine-specific data sources.
* When installed locally, the JAR that is produced is available in the Gradle cache, `~/.gradle/caches`.
* Maven JARs are located in `~/.m2`

.. note::

    The build is going to be looking at the resulting JAR created by this command. If you make any changes to your data sources, install again to update the JAR to make those changes visible to the build.

**To use common data sources in the InterMine library**

* No action required. Use project XML file as normal.

The migration script you used set up the dependency to the `intermine-bio-sources` project already. This project includes `uniprot` and other data sources, and are on the classpath. During the build, the code will look for the uniprot jar, e.g. `bio-source-uniprot-2.0.jar` and find it on the classpath successfully. Maven will download it for you.

Database
----------------------------

Delete and recreate all database tables

.. code-block:: sh
    
    ~/git/flymine $ ./gradlew builddb

To run a single source

.. code-block:: sh
    
    ~/git/flymine $ ./gradlew integrate -Psource=uniprot  --stacktrace --no-daemon

.. note::

    You can try --info or --debug too

To run a full build 

.. code-block:: sh

    ~/git/flymine $ ./project_build flymine

Webapp
----------------------------

Deploy a webapp

.. code-block:: sh

    ~/git/flymine $ ./gradlew tomcatStartWar

* Shut down your local tomcat, we are using embedded tomcat here
* Logs are in $HOME/logs, for more details: http://akhikhl.github.io/gretty-doc/Logging.html

Deploy blue genes

.. code-block:: sh

    ~/git/flymine $ ./gradlew blueGenesStart

Gradle
----------------------------

To see a list of command-line options, run 

.. code-block:: sh 

    ./gradlew --help

To stop all daemons

.. code-block:: sh 

    ./gradlew --stop

To get rid of compiled files

.. code-block:: sh 

    ./gradlew clean

To update your local packages

.. code-block:: sh 

    ./gradlew install

* Always use `./gradlew` instead of `gradle`. This is the wrapper that comes with InterMine and ensure that everyone is using the same version.

Daemons
~~~~~~~~~~~~~

The updated Gradle version comes with `daemons` enabled by default. These are helper processes that exist in the background. This can speed up builds for example but sometimes, under heavy development, can cause problems when InterMine does not properly dereference assets. We are working on fixing this! In the meantime, you can use "--no-daemon" to disable this gradle feature.

* See: `Daemon docs <https://docs.gradle.org/current/userguide/gradle_daemon.html>`_

Further Reading
---------------------------- 

* https://gradle.org/docs/
* `InterMine blog post <https://intermineorg.wordpress.com/2017/09/13/intermine-2-0-gradle/>`_
* `InterMine presentation <https://docs.google.com/presentation/d/1mgcC7TSieHa4JdYzxYUVspftKO8rDpFN0X9JaKQXkDM/edit>`_

.. index:: gradle, ant

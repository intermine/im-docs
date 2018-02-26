Gradle
========

`Gradle <https://gradle.org>`_ is InterMine's build tool. In InterMine 2.0 Gradle replaced ant.

Database
----------------------------

Delete and recreate all database tables

.. code-block:: sh
    
    ~/git/flymine $ ./gradlew builddb

To run a single source

.. code-block:: sh
    
    ~/git/flymine $ ./gradlew integrate -Psource=uniprot  --stacktrace --no-daemon

(You can try --info or --debug too.)

To run a full build 

.. code-block:: sh

    ~/git/flymine $ ./project_build flymine

Webapp
----------------------------

Deploy a webapp

.. code-block:: sh

    ~/git/flymine $ ./gradlew tomcatStartWar

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

* See: https://docs.gradle.org/current/userguide/gradle_daemon.html

Further Reading
---------------------------- 

* https://gradle.org/docs/
* https://intermineorg.wordpress.com/2017/09/13/intermine-2-0-gradle/
 
.. index:: gradle, ant

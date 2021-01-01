Java
===========

We recommend you use OpenJDK rather than Sun's JDK. There isn't much difference between the two as far as InterMine is concerned, but it's probably safer in the long run.

The version of Gradle we are using is compatible with Java 11.

GRADLE_OPTS
---------------------

InterMine can be rather memory-intensive, so you will probably need to set memory options for Java. To do this, set the environment variable `GRADLE_OPTS` to pass in to Java, by placing the following line in your `~/.bashrc` file: 

.. code-block:: bash

    # ~/.bashrc file
	$ export GRADLE_OPTS="-server -Xmx8g -XX:+UseParallelGC -Xms2g -XX:SoftRefLRUPolicyMSPerMB=1 -XX:MaxHeapFreeRatio=99 -Dorg.gradle.daemon=false"

Run `source` to use this value in the current session.

You should change the `-Xmx` and `-Xms` values if you have very little or a lot of RAM in your computer.

Building a database requires much more memory as compared to running only a webapp.

.. index:: Java, OutOfMemoryError, ANT_OPTS, GRADLE_OPTS

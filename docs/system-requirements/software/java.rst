Java
===========

InterMine can be rather memory-intensive, so you will probably need to set memory options for Java. To do this, set the environment variable `ANT_OPTS` to pass in to Java, by placing the following line in your `~/.bashrc` file: 

.. code-block:: bash

	export ANT_OPTS="-server -XX:MaxPermSize=256M -Xmx1700m -XX:+UseParallelGC -Xms1700m -XX:SoftRefLRUPolicyMSPerMB=1 -XX:MaxHeapFreeRatio=99"

Run  `. ~/.bashrc` to use this value in the current session.

You should change the `-Xmx` and `-Xms` values if you have very little or very much RAM in your computer.

Increase the `MaxPermSize` setting if you get this error `java.lang.OutOfMemoryError: PermGen space`

.. index:: Java, OutOfMemoryError, ANT_OPTS

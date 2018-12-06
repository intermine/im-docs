Git
====

`Git <http://git-scm.com>`_ is our source control software.  Download and install git on your local machine.

.. note::

    InterMine is available via JCenter as executable JARs. We do not recommend downloading the InterMine source code. 

InterMine code is available on `GitHub <https://github.com/intermine/intermine>`_

* `create your account in github <https://github.com/signup/free>`_
* login and go in 'Account Settings' section to configure the `SSH keys <https://help.github.com/articles/generating-ssh-keys>`_

Local Installation
----------------------

You should use the JARs available via `JCenter <https://jcenter.bintray.com/org/intermine/>`_. However, if you want to make custom changes to InterMine, you can install locally.

1. Get InterMine code

::

    ~/git $ git clone https://github.com/intermine/intermine.git

2. Checkout the InterMine version you need

::

    # change into the correct directory
    ~/git $ cd intermine
    # get a list of tags
    ~/git/intermine $ git tag -l

::

    # get the correct version of the InterMine software
    ~/git/intermine $ git checkout tags/<tag_name> -b <branch_name>

3. Copy in your changes.

4. Rebuild JARs locally.

Run the Maven command `./install` to compile and create the JARs you need to run an InterMine instance.

::

    ~/git/intermine $ (cd plugin && ./gradlew clean && ./gradlew install) && (cd intermine && ./gradlew clean && ./gradlew install) && (cd bio && ./gradlew clean && ./gradlew install) && (cd bio/sources && ./gradlew clean && ./gradlew install)  && (cd bio/postprocess/ && ./gradlew clean && ./gradlew install)

Why will Maven use my JARs instead of the published JARs?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Gradle build files are configured so that Maven looks in your local Maven (`~/.m2/respository`) directory first before looking in JCenter. If Maven finds the correct version locally, those are the JARs it will use. But make sure you have the correct version!

Set your InterMine version 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The InterMine version you use is determined by the system variables set in your mine's `gradle.properties` file.

Make sure you have your :doc:`/database/data-sources/versions/` set correctly. If you want to use local JARs, it's best to specify the exact version, e.g. `2.1.1`, of your local JARs. Do this in your mine's `gradle.properties` file.

If you use `2.1.+` there's a possiblity a newer version of InterMine is published. The plus sign instructs Maven to get the latest version of InterMine in *any* repository. In which case, Maven would use the newer JARs in JCenter instead of your local JARs.


.. index:: git
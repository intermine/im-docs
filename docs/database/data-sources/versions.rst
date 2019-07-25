InterMine Versions
================================

InterMine JARs are versioned
---------------------------------

The JAR for each InterMine package is versioned. This version is set in the `build.gradle` for that package. 

For example, the latest InterMine version is set in the `build.gradle <https://github.com/intermine/intermine/blob/dev/bio/sources/build.gradle#L24>`_ file for InterMine's bio-sources. InterMine uses `semantic versioning <https://semver.org/>`_, which means:

    MAJOR version when you make incompatible API changes,
    MINOR version when you add functionality in a backwards-compatible manner, and
    PATCH version when you make backwards-compatible bug fixes. 

How do I specify a version for my own data sources?
---------------------------------------------------------------------------------------------------

To specify the version for your mine's custom source, you would edit the `version` value in the `build.gradle` file in your `/bio-sources` directory. When you install your source, the JAR of the correct version will be created.

See FlyMine's `build.gradle <https://github.com/intermine/flymine-bio-sources/blob/master/build.gradle#L26>`_ file.

We recommend you also use `semantic versioning <https://semver.org/>`_.

How do I specify which version to use in my build?
------------------------------------------------------------------

To use a specific version, add a parameter to your project XML entry.

.. code-block:: xml

    <source name="flyatlas" type="flyatlas" version="2.0.0">
      <property name="src.data.dir" location="/data/flyatlas"/>
    </source>

You will get an error if it can't find a JAR with this version. Note that this is a simple string comparison, e.g. "2.0" will NOT match with "2.0.0".

If no version is provided, the default InterMine version is used. For InterMine's bio sources, a global variable is set in the `gradle.properties` file in your mine. 

You can look in the maven directory to make sure the correct versioned JARs are being created. 

.. code-block:: guess

    # see your JARs in your maven directory
    ~/.m2/repository/org/intermine/bio-source-gtex $ ls
    4.0.0  maven-metadata-local.xml


Default InterMine Versions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: properties

    # in your mine gradle.properties
    systemProp.imVersion=3.1.+
    systemProp.bioVersion=3.1.+

These are global variables used by the build system. If you do not specify a version in your project XML for a source, the `systemProp.bioVersion` value is used by default. 

See FlyMine's `gradle.properties <https://github.com/intermine/flymine/blob/master/gradle.properties#L1-L2>`_ file for an example.


.. index:: version, semantic versioning, JAR version, systemProp, imVersion, bioVersion

Data Source Versions
================================

InterMine JARs are versioned
---------------------------------

The JAR for each InterMine source and postprocess is versioned. This version is set in the `build.gradle` for that source. 

For example, the latest InterMine version is set in the `build.gradle <https://github.com/intermine/intermine/blob/dev/bio/sources/build.gradle#L24>`_ file for InterMine's bio-sources. If the version is set to be `2.3.4` in that file, for example, the JARs on Maven will be available for that version, e.g. "bio-source-uniprot-2.3.4.jar". 

InterMine uses `semantic versioning <https://semver.org/>`_, which means:

    MAJOR version when you make incompatible API changes,
    MINOR version when you add functionality in a backwards-compatible manner, and
    PATCH version when you make backwards-compatible bug fixes. 

For now, all InterMine JARs have the same version by default.

How do I specify which version JAR to generate for my own data sources?
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

Default InterMine Versions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: properties

    # in your mine gradle.properties
    systemProp.imVersion=3.1.+
    systemProp.bioVersion=3.1.+

These are global variables used by the build system. If you do not specify a version in your project XML for a source, the `systemProp.bioVersion` value is used by default. 

See FlyMine's `gradle.properties <https://github.com/intermine/flymine/blob/master/gradle.properties#L1-L2>`_ file for an example.

Which version should I use?
------------------------------------------------------------------

The plus sign is interpreted by Maven to mean "get the latest version." e.g. `3.1.+` will retrieve intermine-api-3.1.0.jar and `2.+` will retrieve `intermine-api-2.1.1.jar`. `

It will be up to you how strict you want to be with version numbers. You have several options:

OPTION 1: Get me the ABSOLUTE latest version always
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

That would look like this:

.. code-block:: properties

    # in your mine gradle.properties
    systemProp.imVersion=+
    systemProp.bioVersion=+

No. First, I don't think that would even work. Second, the MAJOR version changes are by definition not backwards compatible so this would break your code.

OPTION 2: Get me the latest updates automatically
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

That would look like this:

.. code-block:: properties

    # in your mine gradle.properties
    systemProp.imVersion=3.+
    systemProp.bioVersion=3.+

This is the easiest option, and should be okay as the MINOR updates are backwards compatible. However, MINOR versions can introduce new features so this option isn't suitable for production mines.

OPTION 3: Get me the latest patches
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

That would look like this:

.. code-block:: properties

    # in your mine gradle.properties
    systemProp.imVersion=3.1.+
    systemProp.bioVersion=3.1.+

Default option. Includes all patches automatically but not new features. Recommended for dev mines.


OPTION 4: Only get me the exact version I specify
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

That would look like this:

.. code-block:: properties

    # in your mine gradle.properties
    systemProp.imVersion=3.1.0
    systemProp.bioVersion=3.1.0

Safest option because you will be able to test on the exact code. Recommended for production mines.

.. index:: version, semantic versioning, JAR version, systemProp, imVersion, bioVersion

Data Source Versions
================================

InterMine JARs are versioned
---------------------------------

The JAR for each InterMine source and postprocess is versioned. This version is set in the `build.gradle` for that source. 

For example, the latest InterMine version is set in the `build.gradle <https://github.com/intermine/intermine/blob/dev/bio/sources/build.gradle#L24>`_ file for InterMine's bio-sources. If the version is set to be `2.3.4` in that file, for example, the JARs on Maven will be available for that version, e.g. "bio-source-uniprot-2.3.4.jar". 

InterMine uses "semantic versioning". See  `semver.org <https://semver.org>`_ for details. For now, all InterMine JARs have the same version by default.

How do I specify which version JAR to generate for my own data sources?
---------------------------------------------------------------------------------------------------

To specify the version for your mine's custom source, you would edit the `version` value in the `build.gradle` file in your `/bio-sources` directory. When you install your source, the JAR of the correct version will be created.

See FlyMine's `build.gradle https://github.com/intermine/flymine-bio-sources/blob/master/build.gradle#L26`_ file.

How do I specify which version to use in my build?
------------------------------------------------------------------

To use a specific version, add a parameter to your project XML entry.

.. code-block:: xml

    <source name="flyatlas" type="flyatlas" version="2.0.0">
      <property name="src.data.dir" location="/data/flyatlas"/>
    </source>

You will get an error if it can't find a JAR with this version.

If no version is provided, the default InterMine version is used. For InterMine's bio sources, a global variable is set in the `gradle.properties` file in your mine. 

See FlyMine's `gradle.propertiesttps://github.com/intermine/flymine/blob/master/gradle.properties#L1-L2`_ file.

.. index:: version, semantic versioning, JAR version

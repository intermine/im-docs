InterMine Versioning Policy
================================

Version Numbering
-------------------

InterMine uses `semantic versioning <https://semver.org/>`_:

====== ====================================================
MAJOR  incompatible API changes
MINOR  functionality added in a backwards-compatible manner
PATCH  backwards-compatible bug fixes
====== ====================================================

InterMine releases a new major version containing new features about once a year. Each major version receives bug fixes and, if need be, security fixes that are released at least once every three months in what we call a "minor release." For more information on the minor release schedule, you can view the minor release `roadmap <https://github.com/intermine/intermine/projects/7>`_.

If the release team determines that a critical bug or security fix is too important to wait until the regularly scheduled minor release, it may make a release available outside of the minor release schedule.

We always recommend that all users run the latest available minor release.

Upgrading
----------

Major versions often change the data model or the InterMine API. These changes are often complex, so we do not maintain backward compatibility. A database rebuild is required. We also recommend reading the :doc:`upgrading </intermine/upgrade>` section of the major version you are planning to upgrade to.

Upgrading to a minor release does not normally require a database rebuild; you can stop your webapp, update your InterMine version number, and redeploy your webapp. For some releases, manual changes may be required to complete the upgrade, so always read the release notes before upgrading.

While upgrading will always contain some level of risk, InterMine minor releases fix only frequently-encountered bugs, security issues, and blocking problems to reduce the risk associated with upgrading. For minor releases, the **community considers not upgrading to be riskier than upgrading**. 

.. index:: version, semantic versioning, JAR version

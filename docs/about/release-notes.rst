Updating to the Latest Release
================================

See :doc:`/support/upgrade` for instructions on how to update your Mine.

InterMine 1.2.1
==============================================

This is a minor release consisting of bug fixes, see `GitHub <https://github.com/intermine/intermine/issues?milestone=5&page=1&state=closed>`_ for the full list.



InterMine 1.2
==============================================

This is a minor release consisting of bug fixes and some new features. See `GitHub <https://github.com/intermine/intermine/issues?milestone=3&page=1&state=closed>`_ for the full list.

InterMine 1.1
==============================================


In this release, we've added lots of new features - users can share lists, mines can have more than one "superuser" and users can change the background distribution of enrichment widgets. We've also improved the model for interactions and gene ontology.

.. note::

    This release is only available via GitHub.

See :doc:`/support/upgrade` for instructions on how to update your Mine to the new version.

Report Widgets
------------------------

You can now embed widgets in any HTML page. See http://report-widgets.labs.intermine.org/ for live, interactive examples.

See :doc:`/embedding/report-widgets` for details on how to use these for your mine.

List Widgets
------------------------

Users can now change and save the background distribution for enrichment widgets on list analysis page.

Multiple Admins
-------------------------

The main superuser can "deputise" other users to give them superuser powers - meaning they can publish public templates and lists in the mine.

Sharing Lists
-------------------------

Users can share lists with registered users or invite new users to share lists.

Data
-------------------------

We've added a several new data sources

* Uberon
* identifiers

   * flybase-identifiers
   * zfin-identifiers
   * wormbase-identifiers
   * sgd-identifiers

* Homologues

   * OrthoDB
   * Panther
   * Homologene

Export
-------------------------

When exporting sequences you can now specify the size of flanking regions to include.

Model Changes
-------------------------

* GO
* interactions

Please see :doc:`/support/upgrade` for the complete list of changes to the model.

Other 
-------------------------

* UPDATE - list upgrade performance significantly improved.
* FIX - if a friendly mine is unavailable, this no longer causes a delay in pages being loaded
* FIX - inner joins now work in all queries
* FIX - lots of minor bug fixes, see the complete list https://github.com/intermine/intermine/issues?milestone=2 
* NEW - InterMine works with Tomcat 7.0 





.. index:: release notes

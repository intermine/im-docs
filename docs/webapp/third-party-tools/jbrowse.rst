JBrowse
================================

JBrowse can be run directly from InterMine web-services. This means that using JBrowse from
a report page is straightforward.

You need to:

* Have a `JBrowse`_ installed somewhere that you can use (tested with 1.11.3).
 
* Let the webapp know where the JBrowse to be used is installed 
  by adding the following property to a property file (eg. the one on the ``.intermine``
  directory):

  ``jbrowse.install.url = http://some.jbrowse.install/somewhere/index.html``

* Add the appropriate report displayer stanza to the ``webconfig.xml`` file for your mine:

.. code-block:: xml

    <reportdisplayer javaClass="org.intermine.bio.web.displayer.JBrowseDisplayer"
            jspName="model/jbrowseDisplayer.jsp"
            replacesFields=""
            placement="Genomics"
            types="SequenceFeature"/>

And that is it.

.. index:: JBrowse, genome browser
.. _JBrowse: http://jbrowse.org

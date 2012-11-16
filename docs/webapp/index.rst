Web Application
================================

.. toctree::
    :maxdepth: 2


    appearance/index
    data-categories/index
    help/index
    homepage/index
    keyword-search/index
    lists/index
    query-results/index
    region-search/index
    report-page/index
    template-queries/index
    properties/index
    admin/index
    user-accounts/index
    linking-in/index
    performance/index
    third-party-tools/index
    monitoring-site-usage/index

Overwrite any JSP
------------------------

When the webapp is compiled, the order of projects is:

#. intermine/webapp
#. bio/webapp        <-- overwrites files in intermine/webapp
#. MINE_NAME/webapp <-- overwrites files in intermine/webapp and bio/webapp

You can overwrite any JSP in the intermine or bio/webapp projects by having a JSP of the same name in your mine's webapp directory.  The danger of this is that you will have to upgrade these JSPs manually.

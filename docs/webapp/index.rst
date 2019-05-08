Guide to Customising your Web Application
================================================================

.. toctree::
    :maxdepth: 2

    blue-genes/index
    homepage/index
    report-page/index
    lists/index
    template-queries/index
    query-results/index
    query-builder/index
    keyword-search/index
    layout/index
    region-search/index
    properties/index
    data-categories/index
    markup/index
    help/index
    linking-in/index
    third-party-tools/index
    monitoring-site-usage/index
    admin/index
    user-accounts/index
    performance/index
    diagnostic/index
    javadoc/index
    permanent-url/index
    markup/index
    iodocs

Overwrite any JSP
------------------------

When the webapp is compiled, the order of projects is:

#. intermine/webapp
#. bio/webapp        <-- overwrites files in intermine/webapp
#. MINE_NAME/webapp <-- overwrites files in intermine/webapp and bio/webapp

You can overwrite any JSP in the intermine or bio/webapp projects by having a JSP of the same name in your mine's webapp directory.  The danger of this is that you will have to upgrade these JSPs manually.

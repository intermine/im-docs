Customise webapp
========================================================

.. toctree::
    :maxdepth: 4

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



QueryBuilder
------------

''Select a Data Type to Begin a Query''

'''types in bold''':  [wiki:Tagging Tag] types with "im:preferredBagType".  Use the [http://www.flymine.org/query/tree.do model browser] to tag classes.

'''intro text''': Most text in InterMine can be set in ModelProperties.

'''help text''': See ClassDescriptions.

''query builder''

'''SUMMARY''':  Which columns appear when you click on SUMMARY button are set in WebConfigModel.

'''autocomplete''': Add fields to the ObjectStoreSummaryProperties file to have their form fields autocomplete.




Overwrite any JSP
------------------------

When the webapp is compiled, the order of projects is:

 1. intermine/webapp
 1. bio/webapp        <-- overwrites files in intermine/webapp
 1. $MINE_NAME/webapp <-- overwrites files in intermine/webapp and bio/webapp

You can overwrite any JSP in the intermine or bio/webapp projects by having a JSP of the same name in your mine's webapp directory.  The danger of this is that you will have to upgrade these JSPs manually.


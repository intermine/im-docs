Guide to Customising BlueGenes
================================================================

Content
------------------------

Certain features of the BlueGenes app are controlled by parameters set in the `web.properties` file. These properties are also used in the current webapp user interface.

=======================================  ================================================  =======================================  
purpose                                  parameters                                        example
=======================================  ================================================  =======================================  
default examples for the ID resolver     bag.example.identifiers                           ``bag.example.identifiers.protein=Q8T3M3,FBpp0081318,FTZ_DROME`` and ``bag.example.identifiers=CG9151, FBgn0000099`` (one per type)
default separators                       list.upload.delimiters                            ``\n\t,``
default regionsearch                     genomicRegionSearch.*                             ``H. sapiens`` (note: please do not use long format, e.g. ``Homo sapiens``)
default query builder query              services.defaults.query                           ``<query model="genomic" view="Gene.secondaryIdentifier Gene.symbol Gene.primaryIdentifier Gene.organism.name" sortOrder="Gene.secondaryIdentifier ASC" ><constraint path="Gene.organism.name" op="=" value="Homo sapiens" code="A" /></query>``
default keyword search                   quickSearch.identifiers                           ``e.g. PPARG, Insulin, rs876498``
=======================================  ================================================  =======================================  

Please see :doc:`/webapp/properties/web-properties` for details on these parameters.

Environment
------------------------

BlueGenes uses the following parameters defined in the `~/.intermine/$MINE.properties` file.

+----------------------------------------------------------------------+------------------------+-----------------------------------+
| purpose                                                              | parameters             | example                           |
+======================================================================+========================+===================================+
| location of JavaScript tools                                         | bluegenes.toolLocation | `/intermine/tools/node_modules/`  |
+----------------------------------------------------------------------+------------------------+-----------------------------------+
| base URL for requests to the InterMine instance                      | webapp.baseurl         | `http://www.flymine.org`          |
+----------------------------------------------------------------------+------------------------+-----------------------------------+
| path appended to the base URL                                        | webapp.path            | `flymine`                         |
+----------------------------------------------------------------------+------------------------+-----------------------------------+
| name of your InterMine instance as it will be displayed in BlueGenes | project.title          | `BioTestMine`                     |
+----------------------------------------------------------------------+------------------------+-----------------------------------+

Please see :doc:`/webapp/properties/intermine-properties` for details on this property file.

.. index:: bluegenes, tools, javascript


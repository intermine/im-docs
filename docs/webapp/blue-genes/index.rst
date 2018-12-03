Guide to Customising Blue Genes
================================================================

Blue genes content
------------------------

Certain features of the blue genes app are controlled by parameters set in the `web.properties` file. These properties are also used in the current webapp user interface.

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

Tool location
------------------------

To specify a location for your JavaScript tools to be used in your BlueGenes instance, set this parameter in your `~/.intermine/$MINE.property` file.

================================== ================================== ==================================
purpose                            parameters                         example
================================== ================================== ==================================
location of JavaScript tools       bluegenes.toolLocation             `/intermine/tools/node_modules/`
================================== ================================== ==================================

Please see :doc:`/webapp/properties/intermine-properties` for details on this property file.

.. index:: bluegenes, tools, javascript


Linking in to your mine
================================

This page aims to describe the various ways to link to a Mine.


Link directly to query results
-----------------------------------

Template name
~~~~~~~~~~~~~~~

Links to results of specified template.  URL generated on template form in webapp.

http://www.flymine.org/query/loadTemplate.do?name=Chromosome_Gene&constraint1=Gene.chromosome.primaryIdentifier&op1=eq&value1=2L&constraint2=Gene.organism.name&op2=eq&value2=Drosophila+melanogaster&method=results

Query XML
~~~~~~~~~~~~~~~~~

Links to results of query.  Can run any query built by QueryBuilder; QueryBuilder generates the XML.

http://www.flymine.org/query/loadQuery.do?skipBuilder=true&query=%0A%3Cquery+name%3D%22%22+model%3D%22genomic%22+view%3D%22Gene.primaryIdentifier+Gene.secondaryIdentifier+Gene.goAnnotation.ontologyTerm.name+Gene.goAnnotation.ontologyTerm.identifier+Gene.goAnnotation.ontologyTerm.namespace%22+sortOrder%3D%22Gene.primaryIdentifier+asc%22%3E%0A++%3Cconstraint+path%3D%22Gene.organism.shortName%22+op%3D%22%3D%22+value%3D%22A.+gambiae%22%2F%3E%0A%3C%2Fquery%3E%0A&trail=%7Cquery&method=xml

Link to List Analysis page
----------------------------


Template results
~~~~~~~~~~~~~~~~~~~~~~

Links to list analysis page comprised of results of template query.  "path" attribute determines which column used to create list.  URL available on template form in webapp.

http://www.flymine.org/query/loadTemplate.do?name=Pathway_Genes&constraint1=Pathway.name&op1=eq&value1=Pentose+phosphate+pathway&constraint2=Pathway.genes.organism.name&op2=eq&value2=Drosophila+melanogaster&constraint3=Pathway.dataSets.name&op3=eq&value3=KEGG+pathways+data+set&method=list&path=Pathway.genes 


List of Identifiers
~~~~~~~~~~~~~~~~~~~~~~~~~

Links to list analysis page for specified objects.  For a very long list, use a form instead of a link.  Can use any identifiers.

http://www.flymine.org/query/portal.do?externalids=CG2262,CG3069,CG2859,CG5041,FBgn0036513&class=Gene


Query builder
----------------------------------

Links directly to query builder, starts a query using the provided list.

http://www.flymine.org/query/loadQuery.do?name=<LIST_NAME>&method=list

Report page
----------------------------------

Links directly to report page.  URL available on report page in webapp.

http://www.flymine.org/query/portal.do?externalid=FBgn0004053&class=Gene&origin=flybase


Link into Mine with Orthologues
------------------------------------

The example URL contains ''D. melanogaster'' genes.  The results will contain the corresponding ''C. elegans'' genes, if any.  This will only work if you have orthologue data loaded into your Mine. Will forward to report page OR list analysis page.

http://www.flymine.org/query/portal.do?externalids=CG2262,CG3069,CG2859,CG5041,FBgn0036513&class=Gene&orthologue=C.%20elegans

Convert any identifiers to Genes
---------------------------------

When linking to a report page or a list analysis page you can convert the data type, for instance if you provide a Protein identifier and want to link to the corresponding Gene, you need to specify the class as Gene.  Will only work if you have a converter template available

http://www.flymine.org/query/portal.do?externalid=EVE_DROME&class=Gene

More examples
----------------

See FlyMine for more examples: http://blog.flymine.org/link-to-flymine

.. index:: mine links, links
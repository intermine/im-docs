Linking in to your mine
================================

= Links = 

This page aims to describe the various ways to link to a Mine.


== link directly to Mine ==

||'''destination'''||'''method'''||'''example link'''||'''notes'''||
||results||template*||[http://www.flymine.org/query/loadTemplate.do?name=Chromosome_Gene&constraint1=Gene.chromosome.primaryIdentifier&op1=eq&value1=2L&constraint2=Gene.organism.name&op2=eq&value2=Drosophila+melanogaster&method=results example]||Links to results of specified template.  URL available on template form in webapp.||
||||query XML||[http://www.flymine.org/query/loadQuery.do?skipBuilder=true&query=%0A%3Cquery+name%3D%22%22+model%3D%22genomic%22+view%3D%22Gene.primaryIdentifier+Gene.secondaryIdentifier+Gene.goAnnotation.ontologyTerm.name+Gene.goAnnotation.ontologyTerm.identifier+Gene.goAnnotation.ontologyTerm.namespace%22+sortOrder%3D%22Gene.primaryIdentifier+asc%22%3E%0A++%3Cconstraint+path%3D%22Gene.organism.shortName%22+op%3D%22%3D%22+value%3D%22A.+gambiae%22%2F%3E%0A%3C%2Fquery%3E%0A&trail=%7Cquery&method=xml example]||Links to results of query.  Can run any query built by QueryBuilder; QueryBuilder generates the XML.||
||list analysis||template results*||[http://www.flymine.org/query/loadTemplate.do?name=Pathway_Genes&constraint1=Pathway.name&op1=eq&value1=Pentose+phosphate+pathway&constraint2=Pathway.genes.organism.name&op2=eq&value2=Drosophila+melanogaster&constraint3=Pathway.dataSets.name&op3=eq&value3=KEGG+pathways+data+set&method=list&path=Pathway.genes example]||Links to list analysis page comprised of results of template query.  "path" attribute determines which column used to create list.  URL available on template form in webapp.||
||||list of identifiers||[http://www.flymine.org/query/portal.do?externalids=CG2262,CG3069,CG2859,CG5041,FBgn0036513&class=Gene example]||Links to list analysis page for specified objects.  For a very long list, use a form instead of a link.  Can use any identifiers.||
||report page||identifier||[http://www.flymine.org/query/portal.do?externalid=FBgn0004053&class=Gene&origin=flybase example]||Links directly to report page.  URL available on report page in webapp.||
||report page OR list analysis||orthologues||[http://www.flymine.org/query/portal.do?externalids=CG2262,CG3069,CG2859,CG5041,FBgn0036513&class=Gene&orthologue=C.%20elegans example]||The example URL contains ''D. melanogaster'' genes.  The results will contain the corresponding ''C. elegans'' genes, if any.  This will only work if you have orthologue data loaded into your Mine.||
|| ||convert to different type||[http://www.flymine.org/query/portal.do?externalid=EVE_DROME&class=Gene example]||When linking to a report page or a list analysis page you can convert the data type, for instance if you provide a Protein identifier and want to link to the corresponding Gene, you need to specify the class as Gene.  Will only work if you have a converter template available||

== Download data directly using the InterMine WebService ==

 * API details: WebService
 * Client Libraries:
   * PythonClient
   * JavaClient 
   * PerlClient
 * Formats: 
   * TSV/CSV: [http://ratmine.mcw.edu/ratmine/service/template/results?name=gene_to_snps&constraint1=Gene&op1=LOOKUP&value1=3539&extra1=&size=10&format=tab]
   * JSON: [http://www.flymine.org/query/service/template/results?name=Pathway_Genes&constraint1=Pathway.name&op1=eq&value1=Pentose+phosphate+pathway&constraint2=Pathway.genes.organism.name&op2=eq&value2=Drosophila+melanogaster&format=jsonobjects&size=10]
   * XML: [http://www.flymine.org/query/service/template/results?name=Pathway_Genes&constraint1=Pathway.name&op1=eq&value1=Pentose+phosphate+pathway&constraint2=Pathway.genes.organism.name&op2=eq&value2=Drosophila+melanogaster&format=xml&size=10]

== embed data in web-pages using the JavaScriptClient ==

Example:
{{{
<div id="some-placeholder"></div>
<script type="text/javascript">
    IMBedding.setBaseUrl("http://www.flymine.org/query");
    IMBedding.loadTemplate(
        {
            name:           "Gene_RegionOverlappingTFbindingsite",

            constraint1:    "Gene",
            op1:            "LOOKUP",
            value1:         "CG2328",
            code1:          "A",
        },            
        '#some-placeholder',
    );
</script>
}}}

See:  http://blog.flymine.org/link-to-flymine for more information on how to link into a Mine.


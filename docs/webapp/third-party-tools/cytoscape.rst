Cytoscape network viewer
================================

= Network Displayer =

Network Displayer, as a member of InterMine ReportDisplayerGallery, also named Interaction Viewer is based on [http://cytoscapeweb.cytoscape.org/ CytoscapeWeb] flash component.

The current working example is gene interaction displayer, it links to gene/protein report pages, and displays the gene on the report page, its interacting genes, and physical and genetics interactions between them.

== Configuration ==

1. add the following entry to your '''webconfig-model.xml''' file:


{{{
#xml
<reportdisplayer javaClass="org.intermine.bio.web.displayer.CytoscapeNetworkDisplayer"
                jspName="model/cytoscapeNetworkDisplayer.jsp"
                replacesFields="interactions"
                placement="Interactions"
                types="Gene,Protein"/>
}}}

2. add the following entries to your '''struts-config-model.xml''' file:

{{{
#xml
<action path="/cytoscapeNetworkExport"
        type="org.intermine.bio.web.struts.CytoscapeNetworkExportAction"/>

<action path="/cytoscapeNetworkAjax"
        type="org.intermine.bio.web.struts.CytoscapeNetworkAjaxAction"/>

}}}

3. re-release your webapp and you should see the interaction displayer on gene report pages.

== Data format ==

CytoscapeWeb can parse the following date formats:

 * [http://wiki.cytoscape.org/Cytoscape_User_Manual/Network_Formats/ SIF]
 * [http://www.cs.rpi.edu/research/groups/pb/punin/public_html/XGMML/ XGMML]
 * JSON (aka [http://cytoscapeweb.cytoscape.org/documentation/elements#section/NetworkModel NetworkModel])

Network can be exported as:

 * SIF
 * XGMML
 * PNG
 * SVG
 * TSV
 * CSV

== Implementation ==

What we do for the interactions viewer (the one that targetmine has) is generate the query in Java, e.g.: 

    ''select * from interactions, genes where gene = [the gene on the report page]''

This query returns all the interactions for that gene of interest.  Then we do another query to find out how the genes in the interactions are
related.  These data are then sent to the Cytoscape viewer via ajax call in SIF/XGMML/JSON format, and the Cytoscape viewer displays those data.

Table of some source files and their functions:

||'''file name'''||'''function'''||
||CytoscapeNetworkDisplayer.java||the report displayer class, get a set of genes interacting with the report gene, in your case, the genes/proteins on the same pathway as the report gene/protein||
||cytoscapeNetworkDisplayer.jsp||the web page to display the network||
||CytoscapeNetworkAjaxAction.java||the Structs action class (config in struts-config-model.xml) to handle the http request and call CytoscapeNetworkService to generate the network data||
||CytoscapeNetworkGenerator.java||generate network data in SIF/XGMML/JSON format||
||CytoscapeNetworkService.java||service class||
||CytoscapeNetworkNodeData.java||netowrk work node model||
||CytoscapeNetworkEdgeData.java||netowrk work edge model||

A diagram shows the work flow (the call hierarchy of all the java classes) of how the network data is generated. After fetching the data to the web page, you can customise the outlook of the network by using [http://cytoscapeweb.cytoscape.org/documentation CytoscapeWeb javascript API].

[[Image(cytoscapeNetworkViewer.png)]]

== Future Plan ==

 * Make network viewer code easier to repurpose for other types of networks. e.g. ideally we would just be able to change or configure (in '''web.properties''') the query and have it work. 
 
 * Upgrade to [http://cytoscape.github.com/cytoscapeweb/ Cytoscape Web 2]


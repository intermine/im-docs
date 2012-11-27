Cytoscape network viewer
================================

The network viewer is based on the CytoscapeWeb flash component.

The current working example is gene interaction displayer, it links to gene/protein report pages, and displays the gene on the report page, its interacting genes, and physical and genetics interactions between them.

Configuration
--------------------------

1. add the following entry to your '''webconfig-model.xml''' file:

.. code-block:: xml

	<reportdisplayer javaClass="org.intermine.bio.web.displayer.CytoscapeNetworkDisplayer"
                jspName="model/cytoscapeNetworkDisplayer.jsp"
                replacesFields="interactions"
                placement="Interactions"
                types="Gene,Protein"/>

2. add the following entries to your '''struts-config-model.xml''' file:

.. code-block:: xml

	<action path="/cytoscapeNetworkExport" type="org.intermine.bio.web.struts.CytoscapeNetworkExportAction"/>
	<action path="/cytoscapeNetworkAjax" type="org.intermine.bio.web.struts.CytoscapeNetworkAjaxAction"/>

3. re-release your webapp and you should see the interaction displayer on gene report pages.

Data format
---------------------------------------

CytoscapeWeb can parse the following date formats:

* SIF
* XGMML
* JSON 

Network can be exported as:

* SIF
* XGMML
* PNG
* SVG
* TSV
* CSV

Implementation
------------------------------------------

What we do for the interactions viewer (the one that targetmine has) is generate the query in Java, e.g.: 

.. code-block:: sql

    select * from interactions, genes where gene = [the gene on the report page]

This query returns all the interactions for that gene of interest.  Then we do another query to find out how the genes in the interactions are
related.  These data are then sent to the Cytoscape viewer via ajax call in SIF/XGMML/JSON format, and the Cytoscape viewer displays those data.

Table of some source files and their functions:


CytoscapeNetworkDisplayer.java
	the report displayer class, get a set of genes interacting with the report gene, in your case, the genes/proteins on the same pathway as the report gene/protein||

CytoscapeNetworkDisplayer.jsp
	the web page to display the network

CytoscapeNetworkAjaxAction.java
	the Structs action class (config in struts-config-model.xml) to handle the http request and call CytoscapeNetworkService to generate the network data

CytoscapeNetworkGenerator.java
	generate network data in SIF/XGMML/JSON format

CytoscapeNetworkService.java
	service class

CytoscapeNetworkNodeData.java
	netowrk work node model

CytoscapeNetworkEdgeData.java
	netowrk work edge model

After fetching the data to the web page, you can customise the outlook of the network by using CytoscapeWeb javascript API.

.. index:: Cytoscape, SIF, XGMML, PNG, SVG, interactions, network viewer, interactions widget

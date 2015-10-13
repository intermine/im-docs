Cytoscape network viewer
================================

This tool takes gene interaction data from Intermine and visualises it using [cytoscape.js](http://js.cytoscape.org/), a fabulous network visualisation tool. It replaces the flash-based CytoscapeWeb network viewer found in previous versions of the tool. 

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

3. add the following entries to your '''aspects.xml''' file:

.. code-block:: xml

  <aspect name="Interactions">
    <subtitle>IntAct</subtitle>
    <icon-image>model/images/interaction.gif</icon-image>
    <large-image>model/images/interaction.gif</large-image>
    <tile-name></tile-name>
    <intro-text>
      Protein-protein interactions from IntAct (PSI-MI format), genetic interactions from the BioGRID and miRNA target predictions from miRBase.
    </intro-text>
    <tile-name>model/interactions.jsp</tile-name>
    <aspect-source name="IntAct" url="http://www.ebi.ac.uk/intact/"/>
    <aspect-source name="BioGRID" url="http://www.thebiogrid.org/"/>
    <aspect-source name="miRBase" url="http://microrna.sanger.ac.uk/targets/v4/"/>
  </aspect>

4. re-release your webapp and you should see the interaction displayer on gene report pages.

Data export format
---------------------------------------

The network visualisation can be exported as:

* PNG
* JPG
* TSV
* CSV

Implementation
------------------------------------------
This tool accesses the list of gene interactions for the target gene by calling a web service, sorting the data into edges and nodes, and inserting them into an HTML canvas for display. It can also be used externally to the report page as a stand alone application. For external setup instructions, see the [Cytoscape Intermine](https://github.com/yochannah/cytoscape-intermine) repo, and the [standalone app demo page](http://yochannah.github.io/cytoscape-intermine/)

**Dependencies:** This tool uses [imjs](https://github.com/intermine/imjs) to query the data, and [imtables](https://github.com/intermine/im-tables) to display table data.

A short list of Java files found on the Intermine side:

CytoscapeNetworkDisplayer.java
	the report displayer class, get a set of genes interacting with the report gene, in your case, the genes/proteins on the same pathway as the report gene/protein

CytoscapeNetworkDisplayer.jsp
	the web page to display the network

CytoscapeNetworkService.java
	service class

.. index:: Cytoscape, SIF, XGMML, PNG, SVG, interactions, network viewer, interactions widget

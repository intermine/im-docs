# Cytoscape network viewer

This tool takes gene interaction data from Intermine and visualises it using [cytoscape.js](http://js.cytoscape.org/), a fabulous network visualisation tool. It replaces the flash-based CytoscapeWeb network viewer found in previous versions of the tool.

## Configuration

1. Add the following entry to your '''webconfig-model.xml''' file:

   ```markup
   <reportdisplayer javaClass="org.intermine.bio.web.displayer.CytoscapeNetworkDisplayer"
               jspName="model/cytoscapeNetworkDisplayer.jsp"
               replacesFields="interactions"
               placement="Interactions"
               types="Gene,Protein"/>
   ```

2. If you host your own [Intermine CDN](https://github.com/intermine/CDN), make sure to pull the most recent update, as the interaction displayer script is loaded via CDN, under `js/intermine/gene-interaction-displayer`.
3. Re-release your webapp and you should see the interaction displayer

   on gene report pages.

## Data export format

The network visualisation can be exported as:

* PNG
* JPG
* TSV
* CSV

## Implementation

This tool accesses the list of gene interactions for the target gene by calling a web service, sorting the data into edges and nodes, and inserting them into an HTML canvas for display. It can also be used externally to the report page as a stand alone application. For external setup instructions, see the [Cytoscape Intermine](https://github.com/yochannah/cytoscape-intermine) repo, and the [standalone app demo page](http://yochannah.github.io/cytoscape-intermine/)

**Dependencies:** This tool uses [imjs](https://github.com/intermine/imjs) to query the data, and [imtables](https://github.com/intermine/im-tables) to display table data.

A short list of Java files found on the Intermine side:

**CytoscapeNetworkDisplayer.java**

The report displayer class, gets a set of genes interacting with the report gene, in your case, the genes/proteins on the same pathway as the report gene/protein

**CytoscapeNetworkDisplayer.jsp**

The web page to display the network

**CytoscapeNetworkService.java**

Service class


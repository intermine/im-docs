# Heatmap

InterMine makes use of canvasXpress [heatmap](http://www.canvasxpress.org/examples/heatmap-1.html) to visualize gene expression data.

[CanvasXpress](http://www.canvasxpress.org/) is a JavaScript library based on the `<canvas>` tag implemented in HTML5. It is written by Isaac Neuhausi.

Hierarchical and k-Means clustering algorithms and zoom in/out functionality have been implemented within the heatmap.

## An example in modMine

Note: The last release of modMine is from 2014, the site is now maintained by the [ENCODE group](https://www.encodeproject.org/) at Stanford University and the legacy software is available on [GitHub](https://github.com/modENCODE-DCC/modmine/).

A specific heatmap application can be referred in [modMine](http://intermine.modencode.org/). It visualizes fly expression data \([example](http://intermine.modencode.org/query/bagDetails.do?scope=global&bagName=example)\) generated from [modENCODE project](http://www.modencode.org/).

The raw data is parsed and converted to InterMine objects. In a Struts controller, the expression data will be fetched by running a InterMine path query and parsed to JSON string. The JSON string will be sent to a JSP page by a http request to feed into heatmap.

### Expression data source: a data loader example

[FlyExpressionScoreConverter](https://github.com/modENCODE-DCC/modmine/blob/dev/bio/sources/modmine/fly-expression-score/main/src/org/intermine/bio/dataconversion/FlyExpressionScoreConverter.java) is a specific data converter for modENCODE fly expression data. The class is located at `bio/sources/modmine/fly-expression-score`. Any other similar expression data conversion tasks can take the data source as a reference.

Expression data type is an extension of InterMine core model. This example can be found [here](https://github.com/modENCODE-DCC/modmine/blob/dev/modmine/dbmodel/resources/modencode-metadata_additions.xml/) and in the code block below.

```markup
# modmine/dbmodel/resources/modencode-metadata_additions.xml
<class name="GeneExpressionScore" is-interface="true">
<attribute name="score" type="java.lang.Double" />
    <reference name="gene" referenced-type="Gene" reverse-reference="expressionScores" />
    <reference name="cellLine" referenced-type="CellLine" />
    <reference name="developmentalStage" referenced-type="DevelopmentalStage" />
    <reference name="submission" referenced-type="Submission" />
    <reference name="organism" referenced-type="Organism" />
</class>
```

Please note that it is now recommended to add the model extension to a source specific additions.xml under a source directory, rather than to a general "additions" file.

### Controller

The controller class [HeatMapController](https://github.com/modENCODE-DCC/modmine/blob/master/modmine/webapp/src/org/modmine/web/HeatMapController.java) is a component of [Struts MVC framework](https://struts.apache.org/). It holds the logic to process user requests.

In HeatMapController, a query is run to fetch expression scores from database \(ref method `queryExpressionScore`\), then the results are parsed to JSON string \(ref method `getJSONString`\) and set in the request \(ref method `findExpression`\).

Struts config:

```markup
# modmine/webapp/resources/struts-config-model.xml 
<action path="/initHeatMap"
type="org.modmine.web.HeatMapController" />

<action path="/heatMap" forward="heatMap.page" />


#  modmine/webapp/resources/tiles-defs-model.xml
<definition name="heatMap.tile" path="/model/heatMap.jsp"
    controllerUrl="/initHeatMap.do"/>

<definition name="heatMap.page" extends="layout.template">
    <put name="body" value="heatMap.tile"/>
    <put name="pageName" value="heatMap"/>
</definition>
```

### Web page

In modMine we have two separate heatmaps, one for cell line and one for developmental stage.

[heatMap.jsp](https://github.com/modENCODE-DCC/modmine/blob/master/modmine/webapp/resources/webapp/model/heatMap.jsp) displays the heatmaps. canvasXpress object takes the expression JSON string and other parameters to create the heatmaps. jQuery is used to adjust page layout.

##Alternatives

A more up to date way of creating widget like heatmaps takes advantage of the InterMine webservices framework to query and generate JSON strings and embed the heatmap on any web page. Please check some examples of the tecnique  [here](http://github.com/intermine/intermine-embedding-examples)

An alternative, and more general library is [D3.js](http://d3js.org/), an example of heatmap can be found [here](https://observablehq.com/@mbostock/electric-usage-2019). [ThaleMine](https://bar.utoronto.ca/thalemine) used to display a couple of such D3 implementations, and the code is still available [here](https://github.com/intermine/CDN/blob/master/js/intermine/expression/1.0.3/expression.js).

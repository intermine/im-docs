Widgets
================================

There are several widgets available on the InterMine list analysis page, and they are configured in [wiki:WebConfigModel webconfig-model.xml].  

There are three categories of widget:  table, graph, and enrichment widgets.

||'''widget type'''||'''purpose'''||
||table||displays the counts from the list for the collection specified||
||graph||displays a chart based on a dataset you specify||
||enrichment||displays the p-values of objects that appear in your list||

To add a widget to your mine:

 1. add config to your WebConfigModel file
 2. re-release your webapp
 3. view widget in a list analysis page


Below are the details on how to configure each widget type. 


'''NB''':  Please read the documentation carefully and check your config file for typos.  Most attributes are case sensitive. When the webapp is released, the config is validated and any errors displayed in the home page.


.. toctree::
    :maxdepth: 4
    
    enrichment-widgets


= 1 Configuration =

== 1.1 Table widgets ==


Table widgets display objects and the counts of related objects in your list.

[[Image(table.png)]]


'''Configure the table widget in WebConfigModel'''

||'''attribute'''||'''purpose'''||'''example'''||
||id||unique id used by javascript only. Spaces not allowed.||unique_id||
||pathStrings||which collection to use in the widget||Gene.homologues[type=orthologue].homologue.organism||
||exportField||which field from the objects in your list to export||primaryIdentifier||
||typeClass||types of lists that should display this widget. Use the simple class name||Gene||

''optional attributes''

||'''attribute'''||'''purpose'''||'''example'''||
||title||appears at the top of the widget||Orthologues||
||description||description of the widget||Counts of orthologues in other organisms for the genes in this list.||
||displayFields||which fields from the objects in the collection (in the above example, Gene.proteins) to display, eg. primaryAccession||name||
||columnTitle||heading for the "count" column||Orthologues||
||externalLink||link displayed next to first column, identifier will be appended to link||||
||externalLinkLabel||label for external link||||
||views||path fields display in the query running when the user clicks on the widget||secondaryIdentifier, symbol, organism.shortName||

[[BR]]



== 1.2 !Graph/Chart widgets ==

Graph widgets display datasets in graphical format.

[[Image(chart.png)]]

'''Configure the graph widget in WebConfigModel'''

||'''attribute'''||'''purpose'''||'''example'''||
||id||unique id used by javascript only. Spaces not allowed.||unique_id||
||graphType ||which type of chart to render||!ColumnChart,!BarChart or !PieChart||
||startClass||it's the root class for all the paths specified in the configuration. All the paths set, will be built starting from that. Specify only the simple name (e.g. Gene). You can choose to set the bag type class or the root class associated to the category path.||Gene||
||typeClass||type of lists that should display this widget.  You can specify ONLY ONE class. If you need another type, you have to define a new widget.Use the simple class name.||Gene||
||categoryPath||the category path. This has to be an attribute. We can specify the subclass using the syntax path[subclass type]||mRNAExpressionResults.stageRange||
||seriesPath||the series path. This has to be an attribute. We can specify the subclass using the syntax path[subclass type]||mRNAExpressionResults.expressed||
||seriesValues||the values of different series. Case sensitive. You can specify boolean values||* true,false[[BR]]* Up,Down||
||seriesLabels||the labels displayed on the graphs to distinguish inside a category the different series||* Expressed,Not Expressed[[BR]]* Up,Down||
||views||attributes paths displayed when the user clicks an area on the graph||primaryIdentifier,secondaryIdentifier,name,organism.name||

''optional attributes''

||'''attribute'''||'''purpose'''||'''example'''||
||title||appears at the top of the widget||BDGP expression patterns||
||description||description of the widget||Expression patterns of Drosophila mRNAs during embryogenesis ...||
||domainLabel ||Label displayed on x-axis in the !ColumnChart (on y-axis in the !BarChart)||Stage||
||rangeLabel ||Label displayed on y-axis in the !ColumnChart (on x-axis in the a !BarChart)||Gene count||
||filterLabel||label for filter form field||Organism||
||filters||the values for the filter, set in the dropdown. We can use static values or a grammar to specify the values contained in the list. The default value in general is the first value set in the 'filters' attribute or the first value returned by the query. With static values, you can add 'All' meaning no filter applied.||* All,KEGG pathways data set,Reactome data[[BR]]* organism.name=[list] (the organism's name contained in the list are loaded in the filter dropdown)||   
||listPath||the path used to build the bag constraint.You don't need to specify it, if the startClass contains the bag type class  ||!FlyAtlasResult.material (if startClass is !FlyAtlasResult)|| 
||constraints||the constraints separated by comma. Case sensitive. The paths have to be attributes. The operator can be = or !=. For the values we can use static values or the selected filter value using the syntax: ''path contraint = [filter identifier]''||* mRNAExpressionResults.dataSet.name=BDGP in situ data set[[BR]]* mRNAExpressionResults.dataSet.name!=null[[BR]]* organism.name=[Organism] (organism's name matching with the value selected in the filter with filterLabel 'Organism')||
    

NOTE: The graphs use Google Visualitation API.  

[[BR]]


== 1.3 Enrichment widgets ==

Enrichment widgets calculate p-values representing the probability annotation occurred by chance.  See EnrichmentWidgets for more information on how the p-value is calculated.

  [[Image(enrichment.png)]]
 
'''Configure the enrichment widget in webconfig-model.xml'''

||'''attribute'''||'''purpose'''||'''example'''||
||id||unique id used by javascript only. Spaces not allowed.||unique_id||
||startClass||Root class for all the paths specified in the configuration. Specify only the simple name (e.g. Gene)||Gene[[BR]]Protein||
||startClassDisplay||Field displayed when user clicks on the widget on 'Matches' column||primaryIdentifier||
||typeClass||Type of lists that should display this widget.  You can specify ONLY ONE class. If you need another type, you have to define a new widget. Use the simple class name.||Gene||
||enrich||Field to be enriched, displayed in the widget in the firts column. You have to specify only one field. Specify the subclass using the syntax path[subclass type]||goAnnotation.ontologyTerm.parents.name||
||views||attributes paths displayed when the user clicks on ''View results'' button. Specify the subclass using the syntax path[subclass type]||secondaryIdentifier,symbol,primaryIdentifier,organism.name...||

''optional attributes''

||'''attribute'''||'''purpose'''||'''example'''||
||title||appears at the top of the widget||Gene Ontology Enrichment||
||description||description of the widget||GO terms enriched for items in this list.||
||label||heading for the column||GO Term||
||externalLink||link displayed next to first column||http://amigo.geneontology.org/cgi-bin/amigo/term_details?term=||
||filters||extra filters to add to the display.  Use static values or a grammar to specify the values contained in the list.  The default value in general is the first value set in the 'filters' attribute or the first value returned by the query. With static values, you can add 'All' meaning no filter applied.||* biological_process,cellular_component,molecular_function[[BR]]* All,KEGG pathways data set,Reactome data set[[BR]]* organism.name=[list] (the organism's name contained in the list are loaded in the filter dropdown)||
||filterLabel||label for filter form field||Ontology
||enrichIdentifier||identifier for the row displayed, if not specified, enrich field used. Specify only one. This has to be an attribute. Used in the results table. Specify the subclass using the syntax path[subclass type]||goAnnotation.ontologyTerm.parents.identifier||
||constraints||the constraints separated by comma. The paths have to be attributes. The operator can be = or !=. Case sensitive. For the values we can use:[[BR]]static values[[BR]]the selected filter value using the syntax: ''path contraint = [filter identifier]''[[BR]]only the value contained in the list||* goAnnotation.ontologyTerm.parents.namespace=[Ontology],[[BR]]* organism.name=[list][[BR]]* primaryIdentifier != null,[[BR]]* goAnnotation.qualifier = null[[BR]]* goAnnotation.ontologyTerm.parents.identifier != go:0008150||
||constraintsForView||the constraints separated by comma used for building the query executed when the user clicks on the widget on 'Matches' column||mRNAExpressionResults.expressed = true||
    
== 1.4 Examples ==

See other mines' config files for more examples, eg:

 * [source:/branches/intermod_workshop/flymine/webapp/resources/webapp/WEB-INF/webconfig-model.xml FlyMine]
 * [source:/branches/intermod_workshop/modmine/webapp/resources/webapp/WEB-INF/webconfig-model.xml modMine]
 * [source:/branches/intermod_workshop/metabolicmine/webapp/resources/webapp/WEB-INF/webconfig-model.xml metabolicMine]


= 2 Displaying widgets =

== 2.1 !JavaScript ==

=== 2.1.1 Widget service ===

Create a new Widgets instance pointing to a service:

{{{var widgets = new intermine.widgets("http://beta.flymine.org/query/service/");}}}

=== 2.1.2 Choose a widget ===

Choose which widget(s) you want to load:

{{{
// Load all Widgets:
widgets.all('Gene', 'myList', '#all-widgets');
// Load a specific Chart Widget:
widgets.chart('flyfish', 'myList', '#widget-1');
// Load a specific Enrichment Widget:
widgets.enrichment('pathway_enrichment', 'myList', '#widget-2');
// Load a specific Table Widget:
widgets.table('interactions', 'myList', '#widget-3');
}}}


== 2.2 CSS ==

Widgets are using Twitter Bootstrap CSS framework: http://twitter.github.com/bootstrap


== 2.3 Embedding mine widgets on a custom page ==

Following is a documentation describing how to embed widgets not in a mine context.

Online example: [http://tinkerbin.com/Xb3SZhOK]

 1. Open up a document in your text editor.
 1. Use the InterMine API Loader that always gives you the latest version of the widgets. In the {{{head}}} element of the page, add the following line:
    {{{
<script src="http://cdn.intermine.org/api"></script>
}}}
 1. Load the Widget Service:
    {{{
<script type="text/javascript">
intermine.load('widgets', function() {
    var Widgets = new intermine.widgets('http://beta.flymine.org/query/service/');
});
</script>
}}}
    {{{intermine.load}}} represents a block of code that loads the widgets by pointing them to a specific mine.
 1. Use the widget web service to view which widgets are available on the mine, eg:  [http://beta.flymine.org/beta/service/widgets/]
 1. See which lists are available in the mine:  [http://beta.flymine.org/query/service/lists]
 1. Add a widget (from the list in the previous step) to !JavaScript. So within the {{{intermine.load}}} block, after creating the {{{Widgets}}} instance, do this:
    {{{
// Load all Widgets:
Widgets.all('Gene', 'myList', '#all-widgets');
// Load a specific Chart Widget:
Widgets.chart('flyfish', 'myList', '#widget-1');
// Load a specific Enrichment Widget:
Widgets.enrichment('pathway_enrichment', 'myList', '#widget-2');
// Load a specific Table Widget:
Widgets.table('interactions', 'myList', '#widget-3');
}}}
    Where the '''first parameter''' passed is either type of object or name of widget to load. The '''second''' is the name of list (public list) to access and '''third''' is an element on the page where your widgets will appear. This element needs to obviously exist on the page first. A common one is a div that would look like this: {{{<div id="all-widgets"></div>}}}
 1. Add HTML, eg:
    {{{
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>test</title>
    <script src="http://cdn.intermine.org/api"></script>
    <script type="text/javascript">
        intermine.load('widgets', function() {
            var Widgets = new intermine.widgets('http://beta.flymine.org/query/service/');
            // Load all Widgets:
            Widgets.all('Gene', 'myList', '#all-widgets');
        });
    </script>
</head>

<body>
    <!-- DIV goes here -->
    <div class="widget" id="all-widgets">
</body>
</html>
}}}
 1. You will have noticed that the widgets either pickup a style (CSS) from your HTML page, or they appear unstyled. To style them, you can use a variant of Twitter Bootstrap referred to in point 4.2.

== 2.4 Using a temporary list on the fly ==

This guide is taken from an embedding example here [https://github.com/radekstepan/intermine-embedding-examples].

=== Requirements ===

1. InterMine Generic WebService Client Library from GitHub or InterMine CDN.
2. InterMine List Widgets Client Library from GitHub or InterMine CDN.
3. A mine that has the desired Enrichment Widget configured.
4. An API Access Key generated by logging in to MyMine and visiting the API Key tab, then clicking on Generate a new API key. This assumes that you do not want to automatically provide the API key as is the case of within mine embedding that can be seen for example here.

=== Code ===

First require the !JavaScript libraries needed to run the example. You probably have your own version of a Twitter Bootstrap compatible CSS style included on the page already.

{{{
<!-- dependencies -->
<script src="http://cdn.intermine.org/js/jquery/1.7/jquery.min.js"></script>
<script src="http://cdn.intermine.org/js/underscore.js/1.3.3/underscore-min.js"></script>
<script src="http://cdn.intermine.org/js/backbone.js/0.9.2/backbone-min.js"></script>

<!-- intermine -->
<script src="http://cdn.intermine.org/api"></script>
<script src="http://cdn.intermine.org/js/intermine/imjs/latest/imjs.js"></script>
<script src="http://cdn.intermine.org/js/intermine/widgets/latest/intermine.widgets.js"></script>
}}}

The next step is defining a couple of variables.

{{{
var root = 'http://www.flymine.org/query';
var tokn = 'U1p3r9Jb95r2Efrbu1P1CdfvKeF'; // API token
var name = 'temp-list-from-js-query'; // temporary list name
}}}

Now we connect with the mine through IMJS.

{{{
// Service connection.
var flymine = new intermine.Service({
    'root':  root,
    'token': tokn
});
}}}

Then we define the query whose results will be converted into a list later on.

{{{
// The query herself.
var query = {
    'select': [ 'symbol', 'primaryIdentifier' ],
    'from': 'Gene',
    'where': {
        'symbol': {
            'contains': 'ze'
        }
    },
    'limit': 10
};
}}}

Now we call the mine converting the results of the query into a list.

{{{
flymine.query(query, function(q) {
    // Save the query as a list.
    q.saveAsList({'name': name}, function(l) {
        // Now we have created a list under a name.
    });
});
}}}

Now, in the callback that has created the list, we can instantiate the List Widgets client and display the result.

{{{
var widgets = new intermine.widgets(root + '/service/', tokn);
// A new Chart List Widget for a particular list in the target #widget.
widgets.chart('flyfish', name, '#widget');
}}}

The only problem with this approach is that if we make this sort of call multiple times, we will fail on the second and subsequent ocassions as we will get a WebService exception telling us that the 'temporary' list name is taken. **Thus inspect the code of the example to see how to make a call to the service to delete the list if it exists**.

== 2.5 Defining custom actions on widget events ==

In a mine context, List Widgets are configured automatically to e.g. display a Results Table when clicking on "Create a List". The relevant piece of source is here:

[https://github.com/intermine/intermine/blob/dev/intermine/webapp/main/resources/webapp/widget.jsp]

Outside of a mine context, one needs to pass in what happens when one interacts with the Widgets. You can also decide whether to show/hide either/and/or title or description of the widget (for everything else use CSS).

Clicking on an individual match (Gene, Protein etc.) in popover window:

{{{
var options = {
    matchCb: function(id, type) {
        window.open(mineURL + "/portal.do?class=" + type + "&externalids=" + id);
    }
};
Widgets.enrichment('pathway_enrichment', 'myList', '#widget', options);
}}}

Clicking on View results button in a popover window:

{{{
var options = {
    resultsCb: function(pq) {
        ...
    }
};
Widgets.enrichment('pathway_enrichment', 'myList', '#widget', options);
}}}

Clicking on Create list button in a popover window:

{{{
var options = {
    listCb: function(pq) {
        ...
    }
};
Widgets.enrichment('pathway_enrichment', 'myList', '#widget', options);
}}}

I want to hide the title or description of a widget.

{{{
var options = {
    "title": false,
    "description": false
};
Widgets.enrichment('pathway_enrichment', 'myList', '#widget', options);
}}}

=== 2.5.1 Showing a Results Table ===

The example below assumes that you have resolved all ResultsTables dependencies and have a !PathQuery in JSON/JavaScript format that you want to display in a {{{#container}}}:

{{{
// PathQuery needs to be in a JSON string format.
var pq = JSON.stringify(pq);
// use an instance of a Service or perhaps you already have one.
var service = new intermine.Service({'root': service, 'token': token});
// Create a new ResultsTable.
var view = new intermine.query.results.CompactView(service, pq);
// Say where to put it.
view.$el.appendTo("#container");
// Show it.
view.render();
}}}


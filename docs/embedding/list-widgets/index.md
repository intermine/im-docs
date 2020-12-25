# index

::: {.index} embedding, javascript embedding, widgets, list widgets, list analysis page widgets :::

## List Widgets

::: {.toctree maxdepth="2

q-and-a enrichment-widgets"} :::

There are several list widgets \(widgets from now on\) available on the InterMine list analysis page, and they are configured in `/webapp/properties/webconfig-model`{.interpreted-text role="doc"}.

There are three categories of widgets:

table

: displays the counts from the list for the collection specified

graph/chart

: displays a graph/chart based on a dataset you specify

enrichment

: displays the p-values of objects that appear in your list

To add a widget to your mine:

1. add config to your `webconfig-model.xml` file
2. re-release your webapp
3. view widget in a list analysis page

Below are the details on how to configure each widget type.

::: {.note} ::: {.title} Note :::

Please read the documentation carefully and check your config file for typos. Most attributes are case sensitive. When the webapp is released, the config is validated and any errors displayed in the home page. :::

### Configuration

#### Table widgets

Table widgets display objects and the counts of related objects in your list.

![](../../../.gitbook/assets/table.png){.align-center}

An example table widget of Orthologues in FlyMine.

attribute purpose example

`id` unique id used by javascript only. Spaces not allowed. `unique_id` `pathStrings` which collection to use in the widget `Gene.homologues[type=orthologue].homologue.organism` `exportField` which field from the objects in your list to export `primaryIdentifier` `typeClass` types of lists that should display this widget. Use the simple class name `Gene`

The following are optional attributes:

attribute purpose example

`title` appears at the top of the widget `Orthologues` `description` description of the widget `Counts of orthologues` `displayFields` which fields from the objects in the collection \(in the above example, `Gene.proteins`\) to display, eg. `primaryAccession` `name` `columnTitle` `externalLink` `externalLinkLabel` heading for the \"count\" column link displayed next to first column, identifier will be appended to link label for external link `Orthologues` `views` path fields display in the query running when the user clicks on the widget `symbol`

#### Graph/Chart widgets

Graph widgets display datasets in graphical format.

![An example chart widget of BDGP Expression Patterns in FlyMine.](../../../.gitbook/assets/chart.png){.align-center}

+--------------+--------------------------+--------------------------+ \| attribute \| purpose \| example \| +==============+==========================+==========================+ \| id \| unique id used by \| &gt; `unique_id` \| \| \| javascript only. Spaces \| \| \| \| not allowed. \| \| +--------------+--------------------------+--------------------------+ \| graphType \| which type of chart to \| &gt; \| \| \| render \| `ColumnChart`,`BarChart` \| \| \| \| &gt; or `PieChart` \| +--------------+--------------------------+--------------------------+ \| startClass \| it\'s the root class for \| &gt; `Gene` \| \| \| all the paths specified \| \| \| \| in the \| \| \| \| configuration. \| \| +--------------+--------------------------+--------------------------+ \| typeClass \| type of lists that \| &gt; `Gene` \| \| \| should display this \| \| \| \| widget. Use the simple \| \| \| \| class name. \| \| +--------------+--------------------------+--------------------------+ \| categoryPath \| Must be attribute. We \| &gt; `mRNAExpre | | | can specify the subclass | ssionResults.stageRange` \| \| \| using the syntax \| \| \| \| `path[subclass type]` \| \| +--------------+--------------------------+--------------------------+ \| seriesPath \| the series path. This \| &gt; `mRNAExpr | | | has to be an attribute. | essionResults.expressed` \| \| \| We can specify the \| \| \| \| subclass using the \| \| \| \| syntax \| \| \| \| `path[subclass type]` \| \| +--------------+--------------------------+--------------------------+ \| seriesValues \| the values of different \| &gt; `true,false` or \| \| \| series. Case sensitive. \| &gt; `Up,Down` \| \| \| You can specify boolean \| \| \| \| values \| \| +--------------+--------------------------+--------------------------+ \| seriesLabels \| the labels displayed on \| &gt; `| | | the graphs to | Expressed,Not Expressed` \| \| \| distinguish inside a \| &gt; or `Up,Down` \| \| \| category the different \| \| \| \| series \| \| +--------------+--------------------------+--------------------------+ \| views \| attributes paths \| &gt; `name,organism.name` \| \| \| displayed when the user \| \| \| \| clicks an area on the \| \| \| \| graph \| \| +--------------+--------------------------+--------------------------+

::: {.warning} ::: {.title} Warning :::

You can specify **only one** class in `typeClass`. If you need another type, you have to define a new widget. :::

The following are optional attributes:

attribute purpose example

`title` appears at the top of the widget `BDGP expression patterns` `description` description of the widget `Expression patterns` `domainLabel` Label displayed on x-axis in the ColumnChart \(on y-axis in the BarChart\) `Stage` `rangeLabel` Label displayed on y-axis in the ColumnChart \(on x-axis in the a BarChart\) `Gene count` `filterLabel` label for filter form field `Organism` `filters` the values for the filter, set in the dropdown. `All,KEGG pathways,Reactome data` `listPath` the path used to build the bag constraint. `FlyAtlasResult.material` `constraints` separated by comma, case sensitive, must be attributes, operator can be \[=\]{.title-ref} or \[!=\]{.title-ref} `organism.name=[Organism]`

::: {.note} ::: {.title} Note :::

The graphs use [Google Visualitation API](https://developers.google.com/chart/interactive/docs/reference). :::

#### Enrichment widgets

Enrichment widgets calculate p-values representing the probability annotation occurred by chance. See `enrichment-widgets`{.interpreted-text role="doc"} for more information on how the p-value is calculated.

![An example enrichment widget of Gene Ontology in FlyMine.](../../../.gitbook/assets/enrichment.png){.align-center}

attribute purpose example

`id` unique id used by JavaScript only. Spaces not allowed. `unique_id` `startClass` Root class for all the paths specified in the configuration. Use simple name \(e.g. Gene\) `Gene` `startClassDisplay` Field displayed when user clicks on the widget on \'Matches\' column `primaryIdentifier` `typeClass` Type of lists that should display this widget. Use the simple class name. `Gene` `enrich` Field to be enriched, displayed in the widget in the firts column. `goAnnotation.ontologyTerm.parents.name` `views` attributes paths displayed when the user clicks on _View results_ button. `symbol,organism.name`

::: {.warning} ::: {.title} Warning :::

You can specify **only one** class in `typeClass`. If you need another type, you have to define a new widget. :::

The following are optional attributes:

attribute purpose example

`title` appears at the top of the widget `Gene Ontology Enrichment` `description` description of the widget `GO terms enriched.` `label` heading for the column `GO Term` `externalLink` link displayed next to first column `googie` `filters` extra filters to add to the display `organism.name=[list]` `filterLabel` label for filter form field `Ontology` `enrichIdentifier` identifier for the row displayed, if not specified, enrich field used. `goAnnotation.ontologyTerm.identifier` `constraints` constraints separated by comma. The paths have to be attributes. The operator can be `=` or `!=`. `organism.name=[list]` `constraintsForView` `correctionCoefficient` constraints separated by comma used for building the query executed when the user clicks on the widget on \'Matches\' column set to org.intermine.bio.web.widget.GeneLenghtCorrectionCoefficient to normalize by gene length `results.expressed = true`

#### Examples

See other mines\' config files for more examples, eg:

* \[FlyMine\'s

  webconfig-model.xml\]\([https://github.com/intermine/flymine/blob/master/webapp/src/main/webapp/WEB-INF/webconfig-model.xml](https://github.com/intermine/flymine/blob/master/webapp/src/main/webapp/WEB-INF/webconfig-model.xml)\)

* \[HumanMine\'s

  webconfig-model.xml\]\([https://github.com/intermine/humanmine/blob/master/webapp/src/main/webapp/WEB-INF/webconfig-model.xml](https://github.com/intermine/humanmine/blob/master/webapp/src/main/webapp/WEB-INF/webconfig-model.xml)\)

#### Background population

In the enrichment widgets, you can change the reference population. The reference population is specific for widget, list and user. If you are logged you can save your preference selecting the checkbox \'Save your preference\'. The background population selected should include all items contained in the list.

#### Gene length correction coefficient

Depending on the type of experiment your data comes from, it is sometimes necessary to normalize by gene length in order to get the correct p-values. If your data comes from a genome-wide binding experiment such as ChIP-seq or DamID, binding intervals are more likely to be associated with longer genes than shorter ones, and you should therefore normalize by gene length. This is not the case for experiments such as gene expression studies, where gene length does not play a role in the likelihood that a particular set of genes will be overrepresented in the list. If you want normalize by gene length, add the attribute correctionCoefficient set to \'org.intermine.bio.web.widget.GeneLenghtCorrectionCoefficient\'. The gene length correction coefficient is applicable only for lists containing genes with a length, so for a list of genes do not have a length the option is not shown. If a list contains some genes without a length these genes will be discarded.

#### Export Values

The exported file from enrichment widgets includes the enrichment identifier as the fourth column. It is contextual to the startClass attribute in the configuration. For example, an enrichment widget for publications would return the PubMedID field, where a GO enrichment widget would return the GO Term field.

### Displaying widgets

#### JavaScript

**Widget service**

Create a new Widgets instance pointing to a service:

```text
var widgets = new intermine.widgets("http://beta.flymine.org/beta/service/");
```

**Choose a widget**

Choose which widget\(s\) you want to load:

```text
// Load all Widgets:
widgets.all('Gene', 'myList', '#all-widgets');
// Load a specific Chart Widget:
widgets.chart('flyfish', 'myList', '#widget-1');
// Load a specific Enrichment Widget:
widgets.enrichment('pathway_enrichment', 'myList', '#widget-2');
// Load a specific Table Widget:
widgets.table('interactions', 'myList', '#widget-3');
```

#### CSS

::: {.note} ::: {.title} Note :::

Widgets are using [Twitter Bootstrap](https://getbootstrap.com/2.0.2/) CSS framework. :::

#### Embedding mine widgets on a custom page

Following is a documentation describing how to embed widgets not in a mine context.

1. Open up a document in your text editor.
2. Use the `/embedding/api-loader`{.interpreted-text role="doc"} that always gives you the latest version of the widgets. In the `<head>` element of the page, add the following line:

   > ```text
   > <script src="http://cdn.intermine.org/api"></script>
   > ```

3. Load the Widget Service:

   > ```text
   > <script type="text/javascript">
   >     intermine.load('widgets', function() {
   >         var Widgets = new intermine.widgets('http://beta.flymine.org/beta/service/');
   >     });
   > </script>
   > ```
   >
   > `intermine.load` represents a block of code that loads the widgets by pointing them to a specific mine.

4. Use the widget web service to view which widgets are available on the mine, eg: \[[http://beta.flymine.org/beta/service/widgets/\]{.title-ref}](http://beta.flymine.org/beta/service/widgets/]{.title-ref})
5. See which lists are available in the mine: \[[http://beta.flymine.org/beta/service/lists\]{.title-ref}](http://beta.flymine.org/beta/service/lists]{.title-ref})
6. Add a widget \(from the list in the previous step\) to JavaScript. So within the `intermine.load` block, after creating the `Widgets` instance, do this:

   > ```text
   > // Load all Widgets:
   > Widgets.all('Gene', 'myList', '#all-widgets');
   > // Load a specific Chart Widget:
   > Widgets.chart('flyfish', 'myList', '#widget-1');
   > // Load a specific Enrichment Widget:
   > Widgets.enrichment('pathway_enrichment', 'myList', '#widget-2');
   > // Load a specific Table Widget:
   > Widgets.table('interactions', 'myList', '#widget-3');
   > ```
   >
   > Where the _first parameter_\' passed is either type of object or name of widget to load. The _second_ is the name of list \(public list\) to access and _third_ is an element on the page where your widgets will appear. This element needs to obviously exist on the page first. A common one is a div that would look like this: `<div id="all-widgets"></div>`.

7. Add HTML, eg:

   > ```text
   > <html xmlns="http://www.w3.org/1999/xhtml">
   > <head>
   >     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   >     <title>test</title>
   >     <script src="http://cdn.intermine.org/api"></script>
   >     <script type="text/javascript">
   >         intermine.load('widgets', function() {
   >             var Widgets = new intermine.widgets('http://beta.flymine.org/beta/service/');
   >             // Load all Widgets:
   >             Widgets.all('Gene', 'myList', '#all-widgets');
   >         });
   >     </script>
   > </head>
   >
   > <body>
   >     <!-- DIV goes here -->
   >     <div class="widget" id="all-widgets">
   > </body>
   > </html>
   > ```

8. You will have noticed that the widgets either pickup a style \(CSS\) from your HTML page, or they appear unstyled. To style them, you can use a variant of Twitter Bootstrap.

```text
the simple name (e.g. `Gene`). You can choose to set the bag type
class or the root class associated to the category path.
```

```text
the simple name (e.g. `Gene`). You can choose to set the bag type
class or the root class associated to the category path.
```

```text
contained in the list. The default value in general is the first
value set in the \'filters\' attribute or the first value returned
by the query. With static values, you can add \'All\' meaning no
filter applied.
```

```text
value using the syntax: `path constraint = [filter identifier]`.
```

```text
with filterLabel \'Organism\'
```

```text
syntax `path[subclass type]`.
```

```text
syntax `path[subclass type]`.
```

```text
the list. The default value in general is the first value set in the
\'filters\' attribute or the first value returned by the query. With
static values, you can add \'All\' meaning no filter applied.
```

```text
results table. Specify the subclass using the syntax
`path[subclass type]`.
```

```text
selected filter value using the syntax:
`path contraint = [filter identifier]` only the value contained in
the list.
```


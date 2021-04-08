---
title: Embedding widgets on a HTML page
---

### JavaScript

**Widget service**

Create a new Widgets instance pointing to a service:

```javascript
var widgets = new intermine.widgets("http://beta.flymine.org/beta/service/");
```

**Choose a widget**

Choose which widget\(s\) you want to load:

```javascript
// Load all Widgets:
widgets.all('Gene', 'myList', '#all-widgets');
// Load a specific Chart Widget:
widgets.chart('flyfish', 'myList', '#widget-1');
// Load a specific Enrichment Widget:
widgets.enrichment('pathway_enrichment', 'myList', '#widget-2');
// Load a specific Table Widget:
widgets.table('interactions', 'myList', '#widget-3');
```

### CSS

**Note**
Widgets are using [Twitter Bootstrap](https://getbootstrap.com/2.0.2/) CSS framework.

### Embedding mine widgets on a custom page

The following describes how to embed widgets not in a mine context.

1. Open up a document in your text editor.
2. Use the InterMine JavaScript API Loader that always gives you the latest version of the widgets. In the `<head>` element of the page, add the following line:

    ```markup
    <script src="http://cdn.intermine.org/api"></script>
    ```

3. Load the Widget Service:

    ```markup
    <script type="text/javascript">
        intermine.load('widgets', function() {
            var Widgets = new intermine.widgets('http://beta.flymine.org/beta/service/');
        });
    </script>
    ```
   
    `intermine.load` represents a block of code that loads the widgets by pointing them to a specific mine.

4. Use the widget web service to view which widgets are available on the mine, eg: [`http://beta.flymine.org/beta/service/widgets/`](http://beta.flymine.org/beta/service/widgets/]{.title-ref})
5. See which lists are available in the mine: [`http://beta.flymine.org/beta/service/lists`](http://beta.flymine.org/beta/service/lists]{.title-ref})\`\`
6. Add a widget \(from the list in the previous step\) to JavaScript. So within the `intermine.load` block, after creating the `Widgets` instance, do this:

    ```javascript
    // Load all Widgets:
    Widgets.all('Gene', 'myList', '#all-widgets');
    // Load a specific Chart Widget:
    Widgets.chart('flyfish', 'myList', '#widget-1');
    // Load a specific Enrichment Widget:
    Widgets.enrichment('pathway_enrichment', 'myList', '#widget-2');
    // Load a specific Table Widget:
    Widgets.table('interactions', 'myList', '#widget-3');
    ```
   
    Where the _first parameter_ passed is either type of object or name of widget to load. The _second_ is the name of list \(public list\) to access and _third_ is an element on the page where your widgets will appear. This element needs to obviously exist on the page first. A common one is a div that would look like this: `<div id="all-widgets"></div>`.

7. Add HTML, eg:

    ```markup
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>test</title>
        <script src="http://cdn.intermine.org/api"></script>
        <script type="text/javascript">
            intermine.load('widgets', function() {
                var Widgets = new intermine.widgets('http://beta.flymine.org/beta/service/');
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
    ```

8. You will have noticed that the widgets either pickup a style \(CSS\) from your HTML page, or they appear unstyled. To style them, you can use a variant of Twitter Bootstrap.

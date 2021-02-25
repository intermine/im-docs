---
title: Template Queries
---

There are several processes run after the data loading is completed, one of which is the objectstore summarisation. This step counts the number of objects of particular classes, identifies any empty references/collections and collects values to appear in dropdowns in the query builder and templates. The summarisation process also constructs the indexes needed for "type-ahead" autocompletion, this is configured by adding entries to the [ObjectStore Summary](../../database/database-building/post-processing/objectstore-summary-properties.md) file.

## Dropdowns

Some fields have only a few different values, and are represented as dropdowns on forms so that users may see all possible values. You can set the maximum number of values to display, the default is 200.

To update a template query's dropdowns to only legal values, navigate to the templates page in "my mine" and click on the "summarise" link.

* All editable constraints are dropped, non-editable constraints are kept
* Valid values \(summaries\) for dropdowns are recalculated

Also, if your database has tables that should be ignored, you can set this too:

```text
# in objectstoresummary.config.properties
ignore.counts=org.intermine.model.bio.GOAnnotation.withText org.intermine.model.bio.Location.subject
```

### Organism

To populate the organism dropdown, include the [Organisms](../../database/data-sources/library/organism.md) data source in your build. Many of the tools available in InterMine assume this source will be loaded and expect a populated organism table.

## Auto-completion

Fields in template queries and the QueryBuilder can have type-ahead autocompletion to assist in selecting valid terms. As you start to type, possible matches are fetched from the database; the text you have typed can match anywhere within the terms and multiple words fetched. This is particularly useful for ontology terms or protein domain names.

You can set up autocompletion by completing these steps:

1. Add the postprocess to your `MINE_NAME/project.xml` file.

   ```markup
   <post-processing>    
     ...
     <post-process name="create-autocomplete-index"/>
   </post-processing>
   ```

2. Run this command:

   ```bash
   # run postprocess
   ~/git/flymine $ ./gradlew postprocess -Pprocess=create-autocomplete-index --stacktrace
   ```

This process will add all fields set in this properties file to the autocompletion index.

Now, when you release your webapp, fields you've configured will suggest similar terms as users are typing in the QueryBuilder or the template form.

## Optional constraints

To make a template constraint optional:

1. Edit the template in the query builder
2. Click on the padlock next to the constraint
3. Select optional:

Required - the user must supply a value

Optional: ON - optional and ON by default

Optional: OFF - optional and OFF by default

## Templates page

To have templates appear on the templates page, create a template as a SuperUser and tag the template with the "&lt;im:public&gt;" tag.

The templates are sorted by most popular first. If the user is logged in the user's most popular templates are shown first.

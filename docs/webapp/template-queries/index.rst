Template Queries
================================

There are several processes run after the data loading is completed, one of which the objectstore summarisation.  This step counts the number of objects of particular classes, identifies any empty references/collections and collects values to be appear in dropdowns in the query builder and templates. The summarisation process also constructs the indexes needed for "type-ahead" autocompletion, this is configured by adding entries to the `objectstoresummary.config.properties`

Dropdowns
--------------

Some fields have only a few different values, and are represented as dropdowns on forms so that users may see all possible values. You can set the maximum number of values to display, the default is 200.

Also, if your database has tables that should be ignored, you can set this too:

.. code-block:: properties

  # in objectstoresummary.config.properties
  ignore.counts=org.intermine.model.bio.GOAnnotation.withText org.intermine.model.bio.Location.subject


Auto-completion
------------------------

Fields in template queries and the QueryBuilder can have type-ahead autocompletion to assist in selecting valid terms. As you start to type, possible matches are fetched from the database; the text you have typed can match anywhere within the terms and multiple words can be matched. This is particularly useful for ontology terms or protein domain names.

You can set up autocompletion by completing these steps:

1. Add all fields you want to be autocompleted to this file, like so:

.. code-block:: properties

  # in MINE_NAME/dbmodel/resources/objectstoresummary.config.properties
  org.intermine.model.bio.Disease.autocomplete = description

2. Add the postprocess to your `MINE_NAME/project.xml` file.

.. code-block:: xml

  <post-processing>    
    ...
    <post-process name="create-autocomplete-index"/>
  </post-processing>

3. In the `/postprocess` directory, run this command:

.. code-block:: bash

  # in malariamine/postprocess
  $ ant -Daction=create-autocomplete-index

This process will add all fields set in this properties file to the autocompletion index.

Now, when you release your webapp, fields you've configured will suggest similar terms as users are typing in the QueryBuilder or the template form.

Optional constraints
----------------------------------

To make a template constraint optional:

#. edit the template in the query builder
#. click on the padlock next to the constraint
#. select optional:

|  Required - the user must supply a value
|  Optional: ON - optional and ON by default
|  Optional: OFF - optional and OFF by defaul


Templates page
------------------

To have templates appear on the templates page, create a template as a SuperUser and tag the template with the "im:public" tag.

The templates are sorted by most popular first.  If the user is logged in the user's most popular templates are shown first.


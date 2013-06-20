Results Tables
===============

Configuring the Results Tables
-------------------------------

The results tables can be configured in a number of ways, including:

The initial state of Sub-Tables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Outer-Joined collections are rendered in subtables within a single cell. By default
these are not immediately rendered, and just the number of rows are indicated. This
means that even sections with very large sub-tables are rendered efficiently - in the
worst case the sub-tables may contain thousands of rows, and so a table with even 10
main rows might present 10,000 sub-rows or more, which can significantly impact
browser performance (an example of this would be a table that contained publications
with an outer-joined selection of genes; genome publications can list every gene in an
organism, and this scenario easily leads to very large sub-tables).

However, if you don't like the default behaviour and would prefer for the sub-tables to be open
when the main table is rendered onto the page, this is simply altered, through the
following configuration snippet:

.. code-block:: javascript

  intermine.setOptions({SubtableInitialState: 'open'})

Cell Formatters
~~~~~~~~~~~~~~~~

The cells in each table can be configured to display their information in
custom manners. To do this a javascript function must be registered to handle
certain types of cell, and configured to respond to certain paths.

Formatters are not enabled by default, as they may be unexpected, and in could
cause unneccessary requests to the server. Fortunately they are easily enabled. There
are four formatter included (but not enabled) by default:

 * Location - formats a chromosome location as eg: "2L:123..456"
 * Sequence - formats a DNA or Protein sequence in FASTA lines.
 * Publication - formats a publication in a citable format with title, first author and year.
 * Organism - formats an organism's name in italics, using the short-name format.
 
To enable these formatters register the formatted path (see below), eg:

.. code-block:: javascript

  intermine.scope('intermine.results.formatsets.genomic', {
    'Organism.name': true,
    'Organism.shortName': true
  });

To enable all the default formatters, you can use the following snippet:

.. code-block:: javascript

  var keyPath, formatsets = intermine.results.formatsets.genomic;
  for (keyPath in formatsets) {
    formatsets[keyPath] = true;
  }

Such customisation javascript should be placed in a custom model-includes.js file.

The Formatting Function
^^^^^^^^^^^^^^^^^^^^^^^^

The interface expected for a formatting function is:

::

  (Backbone.Model intermineObject) -> String|HtmlElement

Where the Model instance represents an intermine object. Fields of the object can be retrieved
through the standard ``#get(String)`` method. The return value will be inserted into the table using
the ``jQuery#html`` function, so both html strings and HtmlElements can be accepted as return values.
  
This function is executed as a method on a intermine.results.table.Cell (which will be bound as
``this``), supplying the following properties as part of its interface:

::

  this.el :: HtmlElement - The cell element in the DOM.
  this.$el :: jQuery - The cached jQuery selector for the cell element.
  this.options :: Object - The arguments supplied when constructing the cell, this includes:
    options.query :: intermine.Query

The function may also support two optional parts of the formatter interface:

::

  Formatter.replaces :: Array<String> - The list of fields of the class that this formatter replaces.
  Formatter.merge :: (Backbone.Model, Backbone.Model) -> () - A function to merge information
    from different objects into a single model.
    
A typical pattern would be to check to see whether the object currently has all the information
required to render it, and if not then make a request to retrieve the missing information. Any changes
to the model will cause the cell to be re-rendered, thus a request that gets missing information
and sets it onto the model will cause the function to be called again with the complete information.

For examples of implementations of this interface please see:

* https://github.com/intermine/im-tables/blob/dev/src/formatters/bio/core/organism.coffee
* https://github.com/intermine/im-tables/blob/dev/src/formatters/bio/core/chromosome-location.coffee
    
The Formatting Configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To register a function to respond to specific types of data, it must be referenced under the
``intermine.results.formatters`` namespace by the name of the class that it handles. For example this
can be done with the ``intermine.scope`` function:

eg:

.. code-block:: javascript

  intermine.scope('intermine.results.formatters', {Exon: myExonFormatter});
  
A separate entry must be made under the 'intermine.results.formatsets.{modelname}' namespace to
register which paths trigger cell formatting. For example to register a formatter for the 'Exon'
class which only formats the 'symbol' field:

.. code-block:: javascript

  intermine.scope('intermine.results.formatsets.genomic', {'Exon.symbol': true});
  
In a similar way, we can disable any currently configured formatter by setting the value of this
value to 'false':

.. code-block:: javascript

  intermine.scope('intermine.results.formatsets.genomic', {'Exon.symbol': false});
  
individual formatters can be configured to respond to different fields of an object. So you could
have one formatter for `Gene.length` and another for `Gene.symbol`, if you are unable to achieve what
you need with css alone. To do this, the value in the formatset should be the formatter itself, rather
than a boolean value, eg:

.. code-block:: javascript

  intermine.scope('intermine.results.formatsets.genomic', {
    'Gene.symbol': geneSymbolFormatter,
    'Gene.length': geneLengthFormatter
  });
  
  

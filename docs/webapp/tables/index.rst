Results Tables
===============

Configuring the Results Tables
-------------------------------

The results tables can be configured in a number of ways, including:

Cell Formatters
~~~~~~~~~~~~~~~~

The cells in each table can be configured to display their information in
custom manners. To do this a javascript function must be registered to handle
certain types of cell, and configured to respond to certain paths.

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

  intermine.scope('intermine.results.formatters', {MyClassName: myFormatter});
  
A separate entry must be made under the 'intermine.results.formatsets.{modelname}' namespace to
register which paths trigger cell formatting. For example to register a formatter for the 'Exon'
class which only formats the 'symbol' field:

.. code-block:: javascript

  intermine.scope('intermine.results.formatsets.genomic', {'Exon.symbol': true});
  
In a similar way, we can disable any currently configured formatter by setting the value of this
value to 'false':

.. code-block:: javascript

  intermine.scope('intermine.results.formatsets.genomic', {'Exon.symbol': false});

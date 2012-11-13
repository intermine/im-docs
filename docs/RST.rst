Syntax
======

Enumerated lists
----------------

3. This is the first item 
4. This is the second item 
5. Enumerators are arabic numbers,  single letters, or roman numerals 
6. List items should be sequentially numbered, but need not start at 1 (although not all formatters will honour the first index). 
#. This item is auto-enumerated

Level 3 titles
~~~~~~~~~~~~~~

Level 4 titles
^^^^^^^^^^^^^^

*emphasis* **strong** ``literal`` `link <http://>`_

Level 5 titles
""""""""""""""

... are discouraged as they look smaller than paragraphs

Definition lists
----------------

what 
    Definition lists associate a term with a definition. 

how 
    The term is a one-line phrase, and the definition is one or more paragraphs or body elements, indented relative to the term. Blank lines are not allowed between term and definition.

Source Code
-----------

This is a normal text paragraph. The next paragraph is a code sample

.. code-block:: javascript

    /* Type here! */

    Widget = {
        hide: function() {
            return this.element
                .animate({opacity: 0.0, top: -10});
        },
        show: function() {
            return this.element
                .animate({opacity: 1.0, top: 0});
        },
        element: $(".widget")
    }

This is a normal text paragraph again followed by some CoffeeScript.

.. code-block:: coffeescript

    # Type here! 
    Scope::find = (name, options) ->
        return true if @check(name, options)
        @add name, "var"
        false

Note
-----------

.. note::

    This is a note!

Warning
-----------

.. warning::

    This is a warning! :(

Query Results
================================

This page describes the features of InterMine's results tables, explains how to use the
more advanced features they provide, and gives a brief description of how to embed them in
other pages.


Upload look and feel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

'''export''':  See [wiki:Export] for details on exporting options.

'''column headers''':  See ClassAndFieldLabels to change column headers.

'''links''': Only unique fields (class keys) are links in results pages.  Add fields to ClassKeys to make the fields links on results pages.

Instead of linking to an intermine report page, you can set the links to redirect to external page.  See LinkRedirects

'''weird brackets''':  You may see the following in query results:  `GO:0007480 [GOTerm]`.  This happens when a column is a parent type but the individual result is a subclass.  The subclass will by in brackets.


The key features of the results tables are:
  * Pagination
  * Sorting
  * Re-Ordering Columns
  * Summaries
  * Filters
  * Hiding / Removing Columns
  * Adding new columns
  * Creating lists from results, or adding items from the table to existing lists
  * Exporting results.
  * Getting code to run an equivalent query.

Pagination
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are two separate UI elements for controlling pagination of the table: pagination buttons, and a
pagination scroll bar.

The pagination buttons
^^^^^^^^^^^^^^^^^^^^^^^^

These buttons are located above the top right corner of the table. There are seven of them, with the following
functions:
  ⇤::
    Go to the beginning of the result set. If already at the beginning, this button will be disabled.
  ↞::
    Go back 5 pages of results. If you are on the 7th page, where each page is showing 25 rows and so
    starting at row 151, then this button will take you to page 2, which starts at result 26.
    If you are at the beginning of the result set, this button will be disabled. If you are between page
    2 and page 5, it will take you to the first page.
  ←::
    Go back a single page of results. If you are at the beginning of the results, this will be disabled.
  '''p. x'''::
    This button displays the number of the current page. Clicking on this button will allow you to choose the 
    page number directly, either from a drop-down list, or if there are more then 100 pages of results, by
    entering the page number.
  →::
    Go forward a single page of results. If you are already at the end of the results, this will be disabled.
  ↠::
    Go forward 5 pages of results. If you are on the 2nd page, where each page is showing 25 rows and so
    starting at row 26, then this button will take you to page 7, which starts at result 151.
  ⇥::
    Go to the last page in the results set. If you are already at the end of the results, this will be disabled.



The Pagination Scroll Bar
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This function both as a marker to indicate where in the result set you are, and as a control to choose any
arbitrary page of results to show in the table. Like any scroll bar that you find on a window, moving the scroll
bar will select a different subset of results to show in the visible table.



Sorting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The results in the table always have a sort order, defined by default to be sorted in ascending order, from left to
right across all columns. If a particular sort-order is defined, then in the column header at the top of the table, 
instead of a two headed arrow, there will be an arrow point up (sorted in ascending order) or down (sorted in descending
order). A table can have a sort order defined on none, one, some or all of its columns. Columns that are part of outer-joins
can not be used in the sort order.

The sort order can be changed in one of the following two ways:
 * Click on the arrow in the top right of a column header. This will make this table sorted by just this column. If the
   table was already sorted on this column, this action will change the sort direction (ascending <--> descending).
 * Click the button labelled "Manage Columns". This will open up a dialogue for richer column actions. There are two tabs in this
   dialogue. Click on the second tab ("Re-Sort Columns"). This will show an interface for changing the sort-direction or 
   sorted columns, add or remove columns from the sort-order, and change the precedence of the sorted-columns. This interface
   is made up of two sections: the top box shows the currently sorted columns. The box at the bottom shows all the columns
   this table could possibly be sorted by.
     * If there is no sort order defined, then the top box will be empty. Click 
       the '''+''' button on buttons in the lower box to add them.
     * Sorted columns will be in order of their precedence, from top to bottom. To change the precedence, drag the columns into
       the preferred order of precedence.
     * To remove a column from the sort-order, click on the '''-''' sign on the left of a sorted column.
     * To change the direction of the sorted columns (''ascending'' <--> ''descending''), click on the left edge
       of a sorted column until it displays the direction you would like.



Re-Ordering Columns
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The columns in the result table can be re-ordered. To do this, use the "Manage Columns" tool (also used for complex sorting).
This tool is activated by clicking on the "Manage Columns" button above the table. This brings up a dialogue with two sections.
Make sure the first section is selected (''Re-Order Columns''). In this section there is a single box showing the columns in the
table in order, from top to bottom. To define a new order for these columns, drag them around until they are in the desired
configuration.

Summaries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the bottom right of the column headers on the tables is an '''i''' icon. When clicked, this opens a summary of the values
in this column, including a list of the constraints applied to this column in the underlying query, as well as a list of the values, and
an appropriate visualisation of the data in this column, as either a histogram or a pie-chart. The column can be further
filtered by selecting elements from the list displayed, and clicking the '''Apply filter''' button at the bottom. If a column has a small
number of possible values, and there are no collections in the path to that column, then the visualisation will be a pie-chart, otherwise a 
histogram chart will be displayed. Typing into the text field above the table further filters down the items in the table, based on
what is entered.

Filters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The constraints applied to the colums in the query are indicated in the column summaries described above. These can be edited by clicking
on the '''edit''' button (an icon in the shape of a pencil) next to the constraint description in the column summary, and changing the values
or the operator. The whole constraint may be removed by clicking on the '''x''' icon next to the constraint description.

Filters added from the column summaries may be edited in just this way.

Hiding / Removing a column
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are two buttons in the column header for each column that determine which columns are seen.

One is a '''-''' sign, and when clicked reduces the column to a thin bar, reducing space if you do not wish to see that data temporarily. Hiding a column
does not change the query, but just changes what is shown. 

The other is a '''x''' sign, which removes the column from the query completely. This may have the effect of changing the number of 
rows in the result set, and even the objects returned from the database, as it does alter the structure of the query.

Adding New Columns
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Other columns can be added to the table by using the text box above the table. When a user types into this, possible paths
for this table that match the input are displayed in a list below the text field. Selecting a value, and clicking ''ENTER'' will 
change the table by adding this column to the query. Be careful though, since like removing columns, adding them can change
the number and make-up of the rows returned.

Creating Lists from Results
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lists can be created from a result set, or lists you have access to
can be added to. To do this, click on the button labelled "Create/Add to List". This will
drop down a list of ways to select items from the result table. First make sure the selector
at the top is set to the desired operation (creating a new list, or adding to an existing one).

When creating a new list, you can either:
  * Select all of a group of items from the table, such as all the genes, or all their locations.
    If this option is selected, a dialogue will open to allow you specify the name, description and tags
    of the new list.
  * Or choose individual items from the table.
    If this option is chosen, then a dialogue will appear that first requires you to click on
    items in the table to select them, before having you specify the name, description and tags
    of the new list.

When creating a new list, you can either:
  * Select all of a group of items from the table, such as all the genes, or all their locations.
    If this option is selected, a dialogue will open to allow you specify the list to add to.
  * Or choose individual items from the table.
    If this option is chosen, then a dialogue will appear that first requires you to click on
    items in the table to select them, before having you specify the list to add to.

Exporting Results
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The results as seen in the table can be exported in a variety of formats. To access these, click
on the button in the top right labelled "Export" to see the various formats. In each case the exported results
will be the same in content as what can be seen in the table - any changes made by adding or removing columns, 
reordering the columns or changing the sort order or constraints will be reflected in the exported results.

As well as downloading the exported results directly to the your computer, you may also send them 
directly to Galaxy for processing.

Getting Code to Run or Embed this Query
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You are able to get code in a number of languages. To access this, click on the "Get Code" button, 
which will present you with the different languages available. The javascript option enables you to
embed the result table in the form you see it in any other page.

The html code produced can be used as a standalone page, or as a template to extract
the relevant parts from for insertion into other pages.

.. toctree::
    :maxdepth: 4

    export
    redirects
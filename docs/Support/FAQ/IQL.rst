FAQ: InterMine Query Language
=============================

My fields have been renamed to 'intermine_from' and 'intermine_to' in the database. Why?
----------------------------------------------------------------------------------------

``from`` is a reserved word in IQL. You need to surround it with double quotes, in a rather bizarre manner, like this:

.. code-block:: sql
    
    SELECT object."from" FROM object

See: :doc:`QueryPackage`.

Is the order important in ``WHERE`` clause in IQL?
----------------------------------------------

No. ``name = 'Fred' AND age = 5`` is the same as ``5 = age AND name = 'Fred'``.

See: :doc:`IQL`.

My query is taking too long. How long should queries take? How can I make the queries faster?
---------------------------------------------------------------------------------------------

The database sits on top of Postgres, and the methods by which Postgres answers queries are deep magic that can cause all sorts of unexpected timing phenomena.

Adding a constraint to reduce the amount of results can make the query slower, because Postgres may have to read just as much data from the database, but it has to do more work to filter the results by the constraint. On the other hand, an extra constraint could also make the query faster, if it allows the database to make use of an index or choose a faster algorithm.

If there are a lot of rows in the results, then it is worth trying to use a large batch size on the Results object, if you are running this from Java, by calling ``Results.setBatchSize(10000)`` or so. I believe 1000 is the default batch size, so 10000 should help a bit.

Lastly, make sure the database has been analysed properly (which should be done automatically as part of the build process).
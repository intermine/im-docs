Debugging
================================

Below are common errors you may encounter when building your InterMine. Please contact us if you continue to have problems!


Given a ProxyReference, but id not in ID Map
------------------------------------------------

Error message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: guess

    java.lang.RuntimeException: Exception while dataloading - to allow multiple errors, set the property "dataLoader.allowMultipleErrors" to true Problem while loading item identifier 6_1083 because Given a ProxyReference, but id not in ID Map. Source object ID: <ProxyReference os: org.intermine.objectstore.translating.ObjectStoreTranslatingImpl@1607c7a, id:  66342, proxied class: interface org.intermine.model.InterMineObject>


Problem
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    

This error means the code tried to store an object that was referenced by another object but could not find it. This means you've set a reference to an object, but not stored that referenced object in the database.

Here's an example:

.. code-block:: java

    // set reference to organism object
    gene.setReference("organism", organism);
    // store gene object
    store(gene)
    // never store organism object!

Gene now refers to an object that does not exist in the database. To fix, make sure you are storing all the correct objects in your code.


Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    

Make sure your code is correct and refers only to objects that are going to be stored in the database.

* Unit tests for this data source should be updated to check for these cases.
* If you are loading XML created by another script, be sure to validate the data before loading.

To find out which object is not being stored, use the `item identifier` listed in the error message -- in this case, `6_1083`. Look in the `items` database to determine the values for this object.

.. code-block:: sql

    select * from item where identifier = '6_1083'
    
This gives s the class and item id:

.. code-block:: guess

    implementations | classname | identifier |   id
    -----------------+-----------+------------+---------
                    | Strain    | 6_1083     | 1380031

We see this object is a Strain. We now know which type of data is not being stored. We can then look in the attribute table to get the identifier. Using the `id` we can query the attribute table.

.. code-block:: sql

    select * from attribute where itemid = 1380031;

This gives us any attributes stored for this object, in our example this gives us the primary identifier.

.. code-block:: sql

     intermine_value |       name        | itemid
    -----------------+-------------------+---------
    LS2329          | primaryIdentifier | 1380031

.. index:: debugging, build failed, ID Map, ProxyReference

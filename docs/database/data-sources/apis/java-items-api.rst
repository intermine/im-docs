Java Items API
====================

'Items' are a data format for the InterMine system, each Item represents a Java data object that will be stored.  They are a convenient way to deal with data that is portable to other languages and has a simple XML format.

Usage in a Converter
----------------------------

Items are most commonly used in a converter which provides some convenience methods.

Items are usually manipulated in a converter as part of a source InterMine source.  All converters subclass `DataConverter` or one of its subclasses.  This provides some convenience methods.

Create an item - this uses an `ItemFactory` (see below) which validates the class name and all fields against the data model:

.. code-block:: java

	Item gene = createItem("Gene");

Store an item (or collection of items) to the target items database:

.. code-block:: java

	store(gene);
	store(items);

For a simple example of a converter see the `wormbase-identifiers` converter.

Item methods
----------------------------

Item has methods to set values of attributes, references to other objects and collections of other objects.

To set an attribute (a field of an Item that is a Java type, e.g. String, Integer) use `setAttribute`).  Note that all attribute types are treated as a String, they will be parsed to the appropriate type later.

.. code-block:: java

	gene.setAttribute("symbol", "zen");
	organism.setAttribute("taxonId", "7227");


All items have an identifier generated for them automatically, these are used to reference other Items.  You can set a reference with to an Item identifier or by using the item itself.

.. code-block:: java

	String orgIdentifier = organism.getIdentifier();
	gene.setReference("organism", orgIdentifier);

Or:

.. code-block:: java

	gene.setReference("organism", organism);

Set collections of other Items:

.. code-block:: java

	List<Item> publications = new ArrayList<Item>();
	publications.add(pub1);
	publications.add(pub2);
	gene.setCollection(publications);

Or add one at a time:

.. code-block:: java

	gene.addToCollection("publications", pub1);
	gene.addToCollection("publications", pub2.getIdentifier());

Attribute, Reference and ReferenceList (collections) can all be created independently and added to Items, this is sometimes useful in parsers to avoid holding too many Items in memory.


Creating Items with an ItemFactory
--------------------------------------------------------

When not used in a Converter you should create Items using an ItemFactory (the Converter does this for you), this validates the class name and all attribute/reference names against the data model.  This requires that you get a Model instance (if there isn't already one).

.. code-block:: java

	Model model = Model.getInstance("genomic");
	ItemFactory factory = new ItemFactory(model);

Create an item with the class name.

.. code-block:: java

	Item gene = itemFactory.makeItemForClass("Gene");
	Item organism = itemFactory.makeItemForClass("Organism");

Reading/Writing XML
----------------------------

To write a collection of Items to XML use `FullRenderer`:

.. code-block:: java

	FileWriter fw = new FileWriter(new File(fileName));
	fw.write(FullRenderer.render(items));
	fw.close();

To read an XML file into a List of items use `FullParser`:

.. code-block:: java

	List items = FullRenderer.parse(new FileInputStream(file));

.. index:: Java Items API

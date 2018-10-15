InterMine Items XML
================================

InterMine items XML is a generic format that encodes data the matches InterMine class definitions.


.. code-block:: xml

  <items>
     <item id="0_1" class="NewFeature" implements="">
        <attribute name="identifier" value="feature2"/>
        <attribute name="confidence" value="0.8"/>
        <reference name="protein" ref_id="0_3"/> 
    </item>
    <item id="0_2" class="NewFeature" implements="">
        <attribute name="identifier" value="feature2"/>
        <attribute name="confidence" value="0.37"/>
        <reference name="protein" ref_id="0_3"/> 
    </item>
    <item id="0_3" class="Protein" implements="">
        <attribute name="primaryAccession" value="Q8I5D2" />
        <attribute name="extraData" value="proteinInfo"/>
        <collection name="features">
            <reference ref_id="0_1" />
            <reference ref_id="0_2" />
        </collection>
    </item>
  </items>

Here, the root element is always <items>.

Within <items> each object has is within a separate <item> element.

Each <item> has an id with the format <NAMESPACE_SUBID>. For simple cases, the namespace can always be '0'.  These IDs are used to signify connections between items within the item XML file - once the data is loaded into InterMine its own serial IDs are used instead and these Item XML ids disappear.

The child elements of an <item> are either

* <attribute> - this has the name of the attribute (matching the defined class name) and a value
* <reference> - where the property is a reference to some other item by its Items XML id.
* <collection> - this is a collection of <reference>s

Example scripts used to generate InterMine Items XML can be found at `intermine_items_example.pl <https://github.com/intermine/intermine-scripts/blob/master/examples/intermine_items_example.pl>`_.

Datatypes
---------

The data formats required for attributes in InterMine Items XML for the most part they are fairly obvious and match internal Java types (e.g. strings are UTF-8, doubles are 64-bit IEEE 754 floating point).

One exception is the format required for Dates.  InterMine allows this to be expressed in 3 different ways.

1. As the number of seconds since the Unix epoch.
2. In the string format 'yyyy-MM-dd HH:mm:ss', assuming UTC.
3. In the string format 'yyyy-MM-dd', assuming UTC.

If parsing fails for all these formats then InterMine will throw a RuntimeException.

APIs
----

InterMine Items XML can either be generated directly in your favourite programming language, or there are a number of language-specific APIs that can generate it, and handle issues like Item XML allocation and referencing automatically.  

.. toctree::
    :maxdepth: 1

    java-items-api
    perl-items-api
    python-items-api

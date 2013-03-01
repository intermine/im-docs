How Do I Get a Summary of a Gene?
------------------------------------

You need to make a request to the `query/results` resource:

You can make either a GET or a POST request - it may be better to make POST
requests if your query gets large. The query format must be provided as an
XML document in the InterMine `PathQuery XML format`_, and to write meaningful
queries you will need to know a bit about the data model. For these reasons
we recommend you consider using the client libraries below. But if you do
want to make the request using a tool such as `curl`, it would look like this: 

.. code-block:: bash

  QUERY='<query model="genomic" 
     view="Gene.symbol Gene.name Gene.primaryIdentifier Gene.length Gene.chromosome.primaryIdentifier
           Gene.chromosomeLocation.start Gene.chromosomeLocation.end">
        <constraint path="Gene.symbol" op="=" value="eve"/>
        </query>'
  curl --data-urlencode query="$QUERY" http://www.flymine.org/query/service/query/results

This can be done much more concisely using the other tools, such as
the Perl client libaries. Notice that here the library uses introspection
of the data model to provide the appropriate fields.:

.. code-block:: perl

  use 5.12.0;
  use Webservice::InterMine 1.0301;

  my $flymine = get_service('www.flymine.org/query');

  $flymine->select('Gene.*')->where(symbol => 'eve')->show;


.. _PathQuery XML Format: http://www.flymine.org/query/service/schema/query.xsd


  

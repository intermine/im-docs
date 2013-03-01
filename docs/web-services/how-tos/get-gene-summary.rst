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
  my $eve = $flymine->select('Gene.*')->where(symbol => 'eve')->first;

  say $eve->{name};
  say $eve;

Similar faclities are available in the Python client:

.. code-block:: python

  from intermine.webservice import Service

  flymine = Service('www.flymine.org/query')
  eve = flymine.model.Gene.where(symbol = 'eve').first()

  print(eve.name)
  print(eve)

And in Ruby:

.. code-block:: ruby

  require 'intermine/service'

  flymine = Service.new('www.flymine.org/query')
  eve = flymine.query('Gene').select('*').where( :symbol => 'eve' ).first

  puts eve.name
  puts eve

And in JavaScript:

.. code-block:: javascript

  var intermine = require('imjs');

  var flymine = new intermine.Service({root: 'www.flymine.org/query'});
  var search = flymine.find('Gene', 'eve');

  // Only expecting a single match, but the method
  // yields a list of matches.
  search.done(function(matches) {
    matches.forEach(function(gene) {
      console.log(gene.name);
      console.log(gene);
    });
  });


.. _PathQuery XML Format: http://www.flymine.org/query/service/schema/query.xsd


  

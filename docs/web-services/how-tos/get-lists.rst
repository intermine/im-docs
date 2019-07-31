:orphan:


How Do I Get A Listing of My Lists?
------------------------------------

You simply need to make a GET request to the /lists resource:

.. code-block:: bash

  curl -H 'Accept: application/tsv' http://beta.flymine.org/beta/service/lists

The above request will show only public lists. To see yours as well, provide an
authentication token:

.. code-block:: bash

  curl -H 'Accept: application/tsv' http://beta.flymine.org/beta/service/lists?token=$TOKEN

To do something similar in Perl:

.. code-block:: perl

  use 5.12.0;
  use Webservice::InterMine 1.0301;

  my $TOKEN   = undef; # provide a token to see your lists.
  my $flymine = get_service('www.flymine.org/query', $TOKEN);

  say for $flymine->lists;

Or Python:

.. code-block:: python

  from intermine.webservice import Service
  TOKEN = None # supply a token to see your own lists.

  flymine = Service('www.flymine.org/query', token = TOKEN)

  for l in flymine.get_all_lists():
    print l

Or Ruby:

.. code-block:: ruby

  require 'intermine/service'
  TOKEN = nil # supply a token to see your own lists.

  flymine = Service.new('www.flymine.org/query', TOKEN)
  flymine.lists.each do |list|
    puts list
  end

Or javascript:

.. code-block:: javascript

  var util      = require('util');
  var intermine = require('imjs');

  var flymine = new intermine.Service({
    root: 'www.flymine.org/query',
    token: null // supply a token to see your own lists.
  });

  flymine.fetchLists().done(function(lists) {
    lists.forEach(function(list) {
      console.log(util.format("%s: ( %d %ss )", list.name, list.size, list.type));
    });
  });



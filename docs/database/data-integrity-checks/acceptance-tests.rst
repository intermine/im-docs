Acceptance Tests
================================

How to run the tests
--------------------

 1. Add a file to [source:/trunk/bio/core/test/resources/flymine_acceptance_test.conf MINE-NAME_acceptance_test.conf]
 1. run acceptance tests here:
   {{{
    cd MINE_NAME/integrate
    ant acceptance-tests 
    }}}
 1. The results will be in `MINE_NAME/integrate/build/acceptance_test.html`

Types of tests 
--------------------

You can assert that a query returns true:

.. code-block:: properties

	assert {
   		sql: select count(*) >= 400000 from goannotation
	}


Or doesn't have any results:

.. code-block:: properties

	no-results {
   		sql: select * from datasource where url is null or name is null or description is null
   		note: all fields of data source should be filled in
	}

Or has at least some results:

.. code-block:: properties

	some-results {
   		sql: select * from organism where name = 'Anopheles gambiae'
   		note: We should have an Anopheles gambiae  object but not an Anopheles gambiae PEST one
	}


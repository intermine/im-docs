Testmine
==========

This is an InterMine used for testing new features, and for continuous integration tests on Travis. Its tables include: Employee, Company and Department. The mine does not contain biological data. 

To start a testmine, run the `setup <https://github.com/intermine/intermine/blob/master/testmine/setup.sh>`_ script:

.. code-block:: sh

	testmine $ ./setup.sh

It uses your UNIX username if you haven't set the PSQL_USER, PSQL_PWD ENV variables. The script copies the `testmodel.properties <https://github.com/intermine/intermine/blob/master/testmine/dbmodel/resources/testmodel.properties>`_ file into your home `.intermine` directory.

There are different targets to load data:

* insertData - Loads basic data, e.g. EmployeeA, EmployeeB
* loadsadata - Loads basic data set and testmodel_extra_data.xml
* enormocorp - Loads basic data set, testmodel_extra_data.xml, and testmodel_enormo_data.xml

The setup script runs `loadsadata`. 

.. code-block:: sh

	# run to see which tasks are available for you
	testmine $ ./gradlew tasks

.. index:: test model, travis

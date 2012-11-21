Oracle Data Source
=================================

You can load data from Oracle directly into an InterMine instance. The JDBC driver is already in the classpath:  `intermine/objectstore/main/lib ojdbc14.jar`


Database Properties
-----------------------------

Add this to your mine properties file, these are the values that are going to be passed to Oracle in the connection string:
    
.. code-block:: properties

    db.mysourcedb.datasource.class=oracle.jdbc.pool.OracleDataSource
    db.mysourcedb.datasource.dataSourceName=db.sgd
    db.mysourcedb.datasource.serverName=HOSTNAME
    db.mysourcedb.datasource.databaseName=XE
    db.mysourcedb.datasource.user=USER
    db.mysourcedb.datasource.password=PWD
    db.mysourcedb.datasource.maxConnections=10
    db.mysourcedb.driver=oracle.jdbc.driver.OracleDriver
    db.mysourcedb.datasource.driverType=thin
    db.mysourcedb.datasource.portNumber=1521
    db.mysourcedb.platform=Oracle

Data Source
------------------

Create a new source with a `db` source_type, eg:

.. code-block:: bash

    $ ./bio/scripts/make_source MySource db

Add this source to your project.xml file.  The value, `mysourcedb` in this example, tells the build system to get the database information from the `db.mysourcedb` entry in your properties file.
    
.. code-block:: xml

    <source name="mysource" type="mysource" >      
        <property name="source.db.name" value="mysourcedb"/>
    </source>

Data Converter
------------------

You can now connect to Oracle in your source.  In your converter, get the connection to the database

.. code-block:: java

        // a database has been initialised from properties starting with db.sgd
        Connection connection = getDatabase().getConnection();

Run a query to retrieve your data

.. code-block:: java

        String query = "SELECT feature_no, dbxref_id FROM feature WHERE feature_type = 'gene'";  
        Statement stmt = connection.createStatement();
        ResultSet res = stmt.executeQuery(query);

Iterate through results and convert each row to an InterMine object.

.. code-block:: java

        // loop through each row of results
        while (res.next()) {
             // create a gene
             Item item = createItem("Gene");

             // set gene fields from results
             item.setAttribute("primaryIdentifier", res.getString("dbxref_id")); 
             item.setAttribute("secondaryIdentifier", res.getString("feature_name"));

             // store item in database
             store(item);
        }    

.. index:: Oracle

Oracle 
===========

You can load data from Oracle directly into an InterMine instance.

 1. The JDBC driver is already in the classpath:  [source:/trunk/intermine/objectstore/main/lib ojdbc14.jar]
 1. Add this to your `mine.properties` file, these are the values that are going to be passed to Oracle in the connection string:
    {{{
# oracle

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
}}}
 1. Create a new source with a `db` source_type, eg:
    {{{
./bio/scripts/make_source MySource db
}}}
 1. Add this source to your project.xml file.  The value, `mysourcedb` in this example, tells the build system to get the database information from the `db.mysourcedb` entry in your properties file.
    {{{
    <source name="mysource" type="mysource" >      
        <property name="source.db.name" value="mysourcedb"/>
    </source>
}}}

----

 1. You can now connect to Oracle in your source.  In your converter, get the connection to the database
    {{{
        // a database has been initialised from properties starting with db.sgd
        Connection connection = getDatabase().getConnection();
}}}
 1. Run a query to retrieve your data
    {{{
        String query = "SELECT feature_no, dbxref_id FROM feature WHERE feature_type = 'gene'";  
        Statement stmt = connection.createStatement();
        ResultSet res = stmt.executeQuery(query);
}}}
 1. Iterate through results and convert each row to an InterMine object.
    {{{

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
}}} 


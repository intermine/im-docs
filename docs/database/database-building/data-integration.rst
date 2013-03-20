Data Integration
======================

During the data integration stage of the build, the objects created by the data source are added to the database.  

* If no primary keys are set all objects are added.  
* If primary keys exists, the build system will check the database for that primary key.  
  * If the key is not found, the new object is stored in the database.
  * If the key is present in the database, the build system will attempt to merge the new object from the current source with the existing object in the database.

.. index:: data integration

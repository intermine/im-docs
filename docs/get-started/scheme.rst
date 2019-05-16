How to set up your InterMine webapp to use https
================================================

You will need to use a CDN delivering https content (see :doc:`/webapp/performance/index`), for example https://cdn.intermine.org



Set the corresponding entry in ‘global.web.properties’, for example

.. code-block:: properties

   head.cdn.location = https://cdn.intermine.org




Tomcat requirements
----------------------
You should add a configuration to your tomcat server.xml in the Engine section, specifying the address of your proxy:

.. code-block:: xml
	
  <Valve className="org.apache.catalina.valves.RemoteIpValve"
       protocolHeaderHttpsValue="https"
       remoteIpHeader="x-forwarded-for"
       proxiesHeader="x-forwarded-by"
       internalProxies="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
       protocolHeader="x-forwarded-proto" />



It is also good practice to limit access to tomcat port only to the host's loopback address (localhost):

.. code-block:: xml

   <Connector port="8080" protocol="HTTP/1.1"
           address="127.0.0.1"
           connectionTimeout="20000"
           URIEncoding="UTF-8"
           redirectPort="8443" />


----------------------


.. index:: tutorial, Amazon, malariamine, ant, project_build, cloud, AWS

Galaxy
================================

Enable Galaxy export 
--------------------

Add to ''web.properties''' file, replacing FlyMine with your Mine name:

.. code-block:: properties

	# in web.properties
	galaxy.display = true
	galaxy.disabledMessage = Galaxy export is disabled.
	galaxy.baseurl.default = http://main.g2.bx.psu.edu
	galaxy.url.value = /tool_runner?tool_id=flymine
	galaxy.welcomeMessage = <b>Welcome to FlyMine, GALAXY users</b><br/><br/>You can run queries by clicking on the 'Templates' tab at the top of this page.&nbsp;&nbsp;You can end the query results to Galaxy from the 'EXPORT' menu in the results page.

Update Struts config

.. code-block:: xml

	# MINE/webapp/resources/struts-config-model.xml
	<action path="/galaxyExportOptions" forward="galaxyExportOptions.page"/>
	<action path="/initGalaxyExportOptions"
        	type="org.intermine.bio.web.struts.GalaxyExportOptionsController"/>
	<action path="/galaxyExportAction" name="galaxyExportForm"
    	    type="org.intermine.bio.web.struts.GalaxyExportAction" parameter="method"/>

.. code-block:: xml
	
	# MINE/webapp/resources/tiles-defs-model.xml
	<definition name="galaxyExportOptions.page" extends="layout.template">
	    <put name="body" value="galaxyExportOptions.tile"/>
    	<put name="pageName" value="galaxyExportOptions"/>
	</definition>
	<definition name="galaxyExportOptions.tile" path="/model/galaxyExportOptions.jsp"
    	    controllerUrl="/initGalaxyExportOptions.do"/>

.. code-block:: xml

	# MINE/webapp/resources/struts-config-model-form.xml
	<form-bean name="galaxyExportForm" type="org.intermine.bio.web.struts.GalaxyExportForm"/>

Customization
-------------

Properties located in the ''web.properties''' file.

===============  ================================================  =========
parameter        purpose                                           required? 
===============  ================================================  =========
display          enable Galaxy export                              yes[1]_.  
disabledMessage  displayed when Galaxy export is disabled          yes
baseurl.default  base url of Galaxy server                         yes[2]_.
url.value        tool runner url                                   yes[3]_.    
welcomeMessage   displays on the homepage when coming from Galaxy  yes  
===============  ================================================  =========

.. [1] when display is false  

.. [2] default url is the main Galaxy server, but it can be replaced by any public/private server  

.. [3] e.g. on main Galaxy server, the tool for flymine is `/tool_runner?tool_id=flymine`.  Customize this url to specific mines, learn how to create a tool from `Galaxy wiki <http://http://wiki.g2.bx.psu.edu/Admin/Tools/External%20Display%20Applications%20Tutorial?highlight=%28tool%29|%28runner%29>`_  



.. code-block:: properties

	# galaxy
	## set to "false" to disable galaxy
	galaxy.display = true
	galaxy.disabledMessage = Galaxy export is disabled.
	galaxy.baseurl.default = http://main.g2.bx.psu.edu
	galaxy.url.value = /tool_runner?tool_id=flymine
	galaxy.welcomeMessage = <b>Welcome to FlyMine, GALAXY users</b><br/><br/>You can run queries by \
	clicking on the 'Templates' tab at the top of this page.&nbsp;&nbsp;You can send the query results \
	to Galaxy from the 'EXPORT' menu in the results page.

.. index:: Galaxy
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

||'''parameter'''||'''purpose'''||'''required?'''||'''options'''||'''default'''||
||display||enable Galaxy export||yes||true/false||true||
||disabledMessage||The message displayed when Galaxy export is disabled||when display is false||-||-||
||baseurl.default||the base url of Galaxy server||yes||-||default url is the main Galaxy server, but it can be replaced by any public/private server||
||url.value||the tool runner url, e.g. on main Galaxy server, the tool for flymine is "/tool_runner?tool_id=flymine"||yes||-||customize this url to specific mines, learn how to create a tool from [http://wiki.g2.bx.psu.edu/Admin/Tools/External%20Display%20Applications%20Tutorial?highlight=%28tool%29|%28runner%29 Galaxy wiki]||
||welcomeMessage||the message displays on the homepage when linking from Galaxy to an InterMine instance||yes||-||customize the name of mine, e.g. for flymine the message would be "Welcome to FlyMine, GALAXY users"||


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

InterMine User Tracking
================================

[[PageOutline]]

= Trackers =

== Overview ==
The following user activities are recorded during browsing of all mine webapps, to track the usage: 
 * template query executions
 * query executions from the QueryBuilder
 * list creations by upload, operations (copy, union...) or from result tables
 * list executions  
 * searches by keyword
 * user logins

The trackers, recording all tracks, are defined in the ''global.web.properties'' file under the property ''webapp.trackers''.[[BR]]
All tracks are saved into specific tables, created automatically, if they don't already exist, in the userprofile database.[[BR]]
The tables are:
 * templatetrack
 * querytrack
 * listtrack
 * searchtrack
 * logintrack.

The table are created at the startup of the webapp.[[BR]] 
If some table definitions needed to be updated, the browsing of the webapp is blocked, and a warning message is displayed.[[BR]]
Run the ant task ''update-templatetrack-table'' in the webapp directory and then restart the webapp. 

== Usage page in the webapp ==

You can access to the '''Usage''' page, via the !MyMine page, only if you are a superuser.[[BR]]
The page shows all tracks grouped in these sections: Template usage, Custom queries executed, Logins, Keyword Searches, List Analysis page views and List Creation.[[BR]]
Each section contains:
 * a diagram showing the trend of that specific track during the time range selected: 1d, 5d, 1m, 3m, 6m, 1y. The diagrams point out the number of tracks per day (number of template query execution, number the query execution....) without specify wich template or type query(Gene, Protein...) has been executed. 
[[Image(TemplateTrend.png)]]
 * a table showing the number of tracks for each template, type of query, type of list....
[[Image(TemplateTable.png)]][[BR]]
Furthemore, in the ''Template usage'' section, there is a pie diagram showing the first 9 most popular templates and their number of executions in the time range selected: last 2 weeks, last month, last 3 months, last year.[[BR]]
Under the label 'Other' the number of executions of templates from 10th to 15th position.[[BR]]
[[Image(TemplatePie.png)]]

== Import/Export XML ==

Import and export XML functionalities allow you to:
 * export all tracks from the userprofile database into an XML file
 * import all tracks from an XML file into the userprofile database 
The import functionality generates the tracker tables, if these haven't been created before.

When you release a webapp, you may need to recreate the userprofile database without losing all tracks saved until that moment.[[BR]]
Before running ''create-db-userprofile'', execute ''write-userprofile-xml'' in order to save all the tracks into the ''userprofile.xml'' file.[[BR]]
The file has the following structure:
 {{{
<userprofiles>
<tracks>
<templatetracks>
<templatetrack templatename="fourConstraints" username="butano@flymine.org" sessionidentifier="18FB96389B8C44817780B1B778C6F1C2" timestamp="2011-05-06 14:43:42.779"></templatetrack>
...
</templatetracks>
<logintracks>
<logintrack username="butano@flymine.org" timestamp="2011-05-17 16:27:38.729"></logintrack>
...
</logintracks>
<listtracks>
<listtrack type="Company" count="2" buildmode="IDENTIFIERS" event="CREATION" username="butano@flymine.org" sessionidentifier="65C4AD9C3C3EEC86FDB88BAC9EFFC7FF"
timestamp="2011-05-18 09:42:16.905"></listtrack>
...
</listtracks>
<querytracks>
<querytrack type="Address" username="butano@flymine.org" sessionidentifier="EDD0090DE148413B1B35E8DFF2FE4CF1" timestamp="2011-05-18 10:40:29.961"></querytrack>
...
</querytracks>
<searchtracks>
<searchtrack keyword="CompanyA" username="" sessionidentifier="C83EAE50F49A7777E15C69AF31412839" timestamp="2011-05-18 12:38:09.0"></searchtrack>
...
</searchtracks></tracks></userprofiles>
 }}}

Then run ''create-db-userprofile'' and ''read-userprofile-xml''.

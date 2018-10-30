InterMine User Tracking
================================


The following user activities are recorded during browsing of all mine webapps, to track the usage: 

* template query executions
* query executions from the QueryBuilder
* list creations by upload, operations (copy, union...) or from result tables
* list executions  
* searches by keyword
* user logins

The trackers, recording all tracks, are defined in the `global.web.properties` file under the property `webapp.trackers`.

All tracks are saved into specific tables, created automatically, if they don't already exist, in the userprofile database.

The tables are:

* templatetrack
* querytrack
* listtrack
* searchtrack
* logintrack

The table are created at the startup of the webapp. 

If some table definitions needed to be updated, the browsing of the webapp is blocked, and a warning message is displayed.

Run the ant task `update-templatetrack-table` in the webapp directory and then restart the webapp. 

Usage page in the webapp
-------------------------------

You can access to the *Usage* page, via the MyMine page, only if you are a superuser.

The page shows all tracks grouped in these sections: Template usage, Custom queries executed, Logins, Keyword Searches, List Analysis page views and List Creation.

Each section contains:

* a diagram showing the trend of that specific track during the time range selected: 1d, 5d, 1m, 3m, 6m, 1y. The diagrams point out the number of tracks per day (number of template query execution, number the query execution....) without specify wich template or type query(Gene, Protein...) has been executed. 
* a table showing the number of tracks for each template, type of query, type of list....

Furthemore, in the ''Template usage'' section, there is a pie diagram showing the first 9 most popular templates and their number of executions in the time range selected: last 2 weeks, last month, last 3 months, last year.

Under the label 'Other' the number of executions of templates from 10th to 15th position.


.. index:: tracking Mine usage

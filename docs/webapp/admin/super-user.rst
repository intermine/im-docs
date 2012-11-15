Superuser
================================

The SuperUser is the administrator of your InterMine webapp.  The SuperUser can use tagging to configure the appearance and functionality of the webapp.

The SuperUser account is created when the UserProfile database is built using the properties specified in the MineManager's Mine Settings > Web screen.

Templates
----------------

All logged in users can create template queries, but the SuperUser can make them available to all users by tagging them as public templates.  Making a template query is an easy way to get users of your webapp to the data they want very quickly.

Tagging
--------

'''Template queries and lists'''

The SuperUser can change where templates and lists appear by adding tags via the templates and lists pages in the MyMine section of the webapp.

||'''tag'''||'''purpose'''||
||im:public||make list/template viewable by all users||
||im:frontpage||put list/template on home page||
||im:converter||template used in generating links in the 'Convert' section on the list analysis page||
||im:aspect||template appears on aspect page||

'''Fields and collections'''

The SuperUser can change how fields are displayed by adding tags via the report page.

||'''tag'''||'''purpose'''||
||im:hidden||hides the field/collection||
||im:summary||add collection to 'Summary' section of report page||
||im:aspect||collection appears underneath category||

'''Classes'''

The SuperUser can change how classes are displayed by adding tags via the model browser.

||'''tag'''||'''purpose'''||
||im:aspect||class appears on aspect page||
||im:preferredBagType||class appears first in the class selection||



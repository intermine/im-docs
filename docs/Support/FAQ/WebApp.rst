FAQ: WebApp
===========

How do I make templates and lists show up on the templates/lists page?
----------------------------------------------------------------------

1. Log into your site's super user account.
2. Tag the template or list as ``im:public``.

See: :doc:`Tagging`.

How do I make a public template or list show up on the homepage?
----------------------------------------------------------------

1. Log into your site's super user account.
2. Tag the template or list as ``im:frontpage``.

See: :doc:`Tagging`.

How can I set which fields are links/used to create lists on the results page?
------------------------------------------------------------------------------

Add them to the ``trunk/bio/tutorial/malariamine/dbmodel/resources/class_keys.properties`` file.

See: :doc:`WebappConfig`.

How can I customise how data is displayed on the report page?
-------------------------------------------------------------

Make a custom jsp page.

See: :doc:`WebappConfig`.

How can I add my own logo and change the colour scheme?
-------------------------------------------------------

See: :doc:`WebappAppearance`.

If I rebuild a mine, all user profiles and their saved info (queries, lists, etc.) associated with that mine are deleted. Is this the case? If so, how can I save the profiles and their info and import them into the newly rebuilt mine?
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

No, all the data will be saved unless you do ``ant build-db-userprofile`` in the webapp directory. However, saved lists work with internal ids which change when a new build of the mine is done. To solve this you write the userprofile to XML first and re-import it.

1. While you still have your old build do ``ant write-userprofile-xml`` in webapp and copy the ``userprofile.xml`` file somewhere.
2. When the new build is ready copy ``userprofile.xml`` back into the build directory.
3. Run ``ant read-userprofile-xml`` to read it back in, this should do queries to update the lists to new ids.

I would check this works before you risk losing a userprofile database. Of course, if you only have a couple of lists you can just re-import them from the webapp.

Where can I set the list of default templates?
----------------------------------------------

Update the ``trunk/bio/tutorial/malariamine/webapp/src/default-template-queries.xml`` file.

See: :doc:`UserProfile`.

My quick search doesn't work. What arguments does the quick search expect?
--------------------------------------------------------------------------

At the moment the quick search is configured to run a particular template query. We use a query called ``A_IdentifierSynonym_Object`` this is configured in ``webapp/resources/web.properties``.

All biological feature classes in the model have a collection of Synonyms objects to represent alternative identifiers. We also create synonyms for each object identifier, e.g for a Gene with identifier 'eve' we also create a Synonym with value 'eve'. This means we can just search through the synonym table to find any feature type.

How can I customise the data categories on the main page?
---------------------------------------------------------

1. Customise your categories in ``trunk/bio/tutorial/malariamine/webapp/resources/webapp/WEB-INF/aspects.xml``
2. Run ``ant default remove-webapp release-webapp`` to update the customized categories. The "default" target makes forces a re-build of the WAR file before releasing.

See: :doc:`DataCategories`.

How can I customise the data categories on the report page?
-----------------------------------------------------------

1. Fields
    * Tag classes with the ``im:aspect:Genomics`` tag. When this class appears on a report page, it will be displayed underneath the Genomics data category.
1. Templates
    * Tag templates with the ``im:public`` and ``im:aspect:Genomics`` tags.
    * Update the identifier template constraint to be the correct field.

See: :doc:`DataCategories`.

Where can I set the password for the superuser.account?
-------------------------------------------------------

There is a property for setting an initial password, along with the property for setting the superuser's email address:

.. code-block:: properties

    superuser.account=some@email.address
    superuser.initialPassword=somepassword

This should only be used to set an initial password - obviously the fact that the password is stored in a properties file makes it insecure, so you should change the password as soon as possible. If you don't set that property, then a random password will be generated (but since it is stored in hashed form and the original is thrown away, there is no way to find out what that is).

If you do not know the superuser's password, then you can as with any other account use the "Forgotten password" facility on the login page. This will send you an email containing a link that you can follow to your webapp to change the password.
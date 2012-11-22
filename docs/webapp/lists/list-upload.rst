List upload
================================


InterMine has a sophisticated list import system.  The page aims to describe how it works.

Users can paste any identifier into the list upload form; it can be an identifier, symbol or name.  The list upload form runs a series of queries to try to match the identifier to an object in the database.  

This is also how the LOOKUP constraint works.

NOTE:  The list upload form runs the three queries listed below until it finds a match for the user's identifiers.  In InterMine 1.0 it's now possible to run all three queries every time regardless of if a match was returned.  You may want to configure your mine to do this if your database contains lots of identifiers that are assigned to different objects, this option would allow your users to see more options - not just the first.

Queries
-------

1. default query

First, we query for the value in [wiki:ClassKeys key fields].  For example:
{{{
select * from gene 
where name = 'adh' OR 
      symbol = 'adh' or 
      primaryIdentifier = 'adh' or 
      secondaryIdentifier = 'adh';
}}}

If this query returned results, that object is added to our list and we are done.

If this query didn't return any results, we move on to step 2. 

2. bag queries

Next we run queries listed in [source:/trunk/bio/webapp/resources/webapp/WEB-INF/bag-queries.xml bag-queries.xml] (see below)

 1. looks for cross references
 1. looks for synonyms 

Matches returned from this query are not added to the list, they are displayed under the `synonyms matched` heading.  Users can optionally add them to their list.

If this query didn't return any results, we move on to step 3. 

See [source:/trunk/bio/webapp/resources/webapp/WEB-INF/bag-queries.xml bag-queries.xml]

3. converters

Next we run appropriate converter template, which are templates tagged with `im:converter`.  See: [wiki:Tagging]

Matches returned from this query are not added to the list, they are displayed under the `converted type` heading.  Users can optionally add them to their list.

Configuration
-------------

'''example list''':  The example list is set in "bag.example.identifiers" property in WebProperties.
'''types''': See ClassKeys
'''organisms''':  All organisms in your database will be displayed here.  You can set the default in WebProperties.
'''valid delimiters''':  The default valid delimiters are comma, space, tab or new line.  You can change this value by setting the "list.upload.delimiters" property in WebProperties.


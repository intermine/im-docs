---
title: Template Queries
---

There are several processes run after the data loading is completed, one of which is the objectstore summarisation. This step counts the number of objects of particular classes, identifies any empty references/collections and collects values to appear in dropdowns in the query builder and templates. The summarisation process also constructs the indexes needed for "type-ahead" autocompletion, this is configured by adding entries to the [ObjectStore Summary](../../database/database-building/post-processing/objectstore-summary-properties.md) file.

## Optional constraints

To make a template constraint optional:

1. Edit the template in the query builder
2. Click on the padlock next to the constraint
3. Select optional:

Required - the user must supply a value

Optional: ON - optional and ON by default

Optional: OFF - optional and OFF by default

## Templates page

To have templates appear on the templates page, create a template as a SuperUser and tag the template with the "&lt;im:public&gt;" tag.

The templates are sorted by most popular first. If the user is logged in the user's most popular templates are shown first.

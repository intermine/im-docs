Text and messages
========================================================

These files control much of the text in the web application:

`InterMineWebApp.properties <https://github.com/intermine/intermine/blob/dev/intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties>`_ 
   Most of the text appearing on the webapp (button names, forms, some help text, etc.) is defined in this file. If you want the webapp to appear in a different language than English, you will have to translate the file.

`model.properties <https://github.com/intermine/intermine/blob/dev/flymine/webapp/resources/model.properties>`_ 
   Model specific properties. Merges with InterMineWebApp.properties, overwrites properties in that file.

.. index:: model properties, funding, export
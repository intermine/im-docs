Model properties
========================================================

These files control much of the text in the web app:

 * [source:trunk/intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties InterMineWebApp.properties]
   * Most of the text appearing on the webapp (button names, forms, some help text, etc.) is defined in this file. 
   * If you want the webapp to appear in a different language than English, you will have to translate the file.
 * [source:trunk/flymine/webapp/resources/model.properties model.properties]
   * Model specific properties
   * Merges with !InterMineWebApp.properties, overwrites properties in that file
List analysis
===============

fields displayed
	determined by webconfig-model.xml

export
	See :doc:`/webapp/query-results/export`

"Convert to a different type"
	Tag conversion template with `im:converter` tag.  A "Conversion" template has to connect two data classes and include the id field, e.g. 

.. code-block:: xml

	<template name="Gene_To_Protein_Type_Converter" title="Gene to protein type converter" comment="">
  		<query name="Gene_To_Protein_Type_Converter" model="genomic" view="Gene.id Gene.proteins.id" longDescription="" sortOrder="Gene.id asc">
    			<constraint path="Gene.id" editable="true" description="Gene.id" op="=" value="0"/>
  		</query>
	</template>

"Orthologues"
	If you have orthologues loaded in your mine, you will see links in this section

"View homologues in other Mines"
	See :doc:`/webapp/properties/web-properties`

external links
	See :doc:`/webapp/properties/web-properties`

template queries
	Tag template with the ``im:report`` tag. See :doc:`/webapp/admin/index`.

widgets
	See: :doc:`/embedding/list-widgets/index`

.. index:: list analysis page

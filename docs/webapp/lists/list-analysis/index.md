# List analysis

fields displayed

: determined by webconfig-model.xml

export

: See `/webapp/query-results/export`{.interpreted-text role="doc"}

\"Convert to a different type\"

: Tag conversion template with \[im:converter\]{.title-ref} tag. A \"Conversion\" template has to connect two data classes and include the id field, e.g.

```text
<template name="Gene_To_Protein_Type_Converter" title="Gene to protein type converter" comment="">
    <query name="Gene_To_Protein_Type_Converter" model="genomic" view="Gene.id Gene.proteins.id" longDescription="" sortOrder="Gene.id asc">
            <constraint path="Gene.id" editable="true" description="Gene.id" op="=" value="0"/>
    </query>
</template>
```

\"Orthologues\"

: If you have orthologues loaded in your mine, you will see links in this section

\"View homologues in other Mines\"

: See `/webapp/properties/web-properties`{.interpreted-text role="doc"}

external links

: See `/webapp/properties/web-properties`{.interpreted-text role="doc"}

template queries

: Tag template with the `im:report` tag. See `/webapp/admin/index`{.interpreted-text role="doc"}.

widgets

: See: `/embedding/list-widgets/index`{.interpreted-text role="doc"}

::: {.index} list analysis page :::


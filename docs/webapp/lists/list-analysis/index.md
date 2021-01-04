# List analysis

**fields displayed**

determined by webconfig-model.xml

**export**

See [Export](../../query-results/export.md)

**"Convert to a different type"**

Tag conversion template with `im:converter` tag. A "Conversion" template has to connect two data classes and include the id field, e.g.

```markup
<template name="Gene_To_Protein_Type_Converter" title="Gene to protein type converter" comment="">
    <query name="Gene_To_Protein_Type_Converter" model="genomic" view="Gene.id Gene.proteins.id" longDescription="" sortOrder="Gene.id asc">
            <constraint path="Gene.id" editable="true" description="Gene.id" op="=" value="0"/>
    </query>
</template>
```

**"Orthologues"**

If you have orthologues loaded in your mine, you will see links in this section

**"View homologues in other Mines"**

See [Features](../../properties/web-properties.md)

**external links**

See [Features](../../properties/web-properties.md)

**template queries**

Tag template with the `im:report` tag. See [Website Admin](../../admin/index.md).

**widgets**

See: [List Widgets](../../../embedding/list-widgets/index.md)


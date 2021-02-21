---
title: The PathQuery API
---

InterMine installations accept queries over their data in a custom format known as _Path-Queries_. This is a graph-based query format which inherits some of its semantics and terminology from SQL.

## Paths

The core concept of _Path-Queries_ is naturally enough the _Path_, examples of which are:

* `Gene`: A plain root.
* `Gene.symbol`: A root and an attribute.
* `Gene.chromosomeLocation`: A reference to a complex attribute \(a reference\).
* `Gene.organism.name`: A chain from a root to an attribute through one or more references.
* `Gene.pathways.identifier`: A path may potentially match multiple values i.e. there may be several pathway identifiers that match this path for any given gene.
* `Protein.gene.homologues.homologue.alleles.alleleClass`: Paths may be of arbitrary length.

In the XML serialization of path-queries, all paths must be completely qualified. In the JSON format, a prefix can be specified with the `from` or `root` property.

## Queries

Queries associate paths with various parts of the query:

### The View: Defining Output Columns

To define what is retrieved from the data-store, a view is defined. This is simply a list of paths; any information in the data-store graph that matches these paths and satisfies the constraints \(see below\) will be included in the results.

eg:

```markup
<query model="genomic" view="Organism.name Organism.taxonId"/>
```

```javascript
{from: "Organism", select: ["name", "taxonId"]}
```

### Joins: Handling null values

In any chain of references in a long path such as `Gene.sequence.residues` or `Gene.proteins.proteinDomains.name`, there may be null values. There are two behaviours supported for dealing with null references \(i.e. where a gene does not have any sequence attached, or it has no proteins, or those proteins have no protein domains\) and they are:

* `INNER JOIN`: This is the default behaviour. It prevents the entire path from matching, so that if the query contains `Gene.symbol` and `Gene.proteins.name` and a gene in the data store has no proteins, then that gene will not match at all, and no data will be returned for the symbol of that gene i.e. it is a required feature of this query that all genes in the result set have at least one protein \(this is a kind of implicit existential constraint\).
* `OUTER JOIN`: This is an optional behaviour. It allows references in paths to be empty while permitting higher parts of the path to continue to match. So for example, if the query contains `Gene.symbol` and `Gene.proteins.name` and a gene in the data store has no proteins, then no protein data for that gene will be returned, but the gene will still match the query, and the symbol for that gene will be included in the retrieved results \(this makes the proteins optional\).

Some of the consequences of using outer joins are as follows:

* Due to the optional nature of the outer joined data, it is not permitted to sort on attributes in an outer joined section.
* Constraints \(see below\) cannot be combined in an `or` relationship across join boundaries. So one cannot ask for all genes which are either of a certain length or which have a certain pathway if there is an outer join on pathways.

eg:

```markup
<query model="genomic" view="Gene.symbol Gene.pathways.identifier">
  <join path="Gene.pathways" style="OUTER"/>
</query>
```

```javascript
{from: "Gene", select: ["symbol", "pathways.identifier"], joins: ["pathways"]}
```

### Constraints: Restricting matching values

By default, all values of a given type match a query unless they are excluded by empty references on an inner joined path. To restrict the result set, constraints can be used.

#### Constraints on attributes:

The following are examples of constraints on attributes in the data store:

```markup
<constraint path="Gene.symbol" op="=" value="eve"/>
<constraint path="Gene.length" op="&gt;" value="12345"/>
<constraint path="Gene.homologues.homologue.organism.taxonId" op="!=" value="7227"/>
<constraint path="Gene.description" op="CONTAINS" value="some term"/>
```

The JSON format allows a couple of different mechanisms for describing constraints such as:

```javascript
{
  select: ["Gene.symbol"],
  where: {
    "symbol": "eve",
    "length": {gt: 12345},
    "homologues.homologue.organism.taxonId": {"!=": 7227},
    "description": {contains: "some term"}
  }
}
```

or:

```javascript
{
  select: ["Gene.symbol"],
  where: [
    {path: "symbol", op: "=", value: "eve"},
    {path: "length", op: ">", value: 12345},
    {path: "homologues.homologue.organism.taxonId", op: "!=", value: 7227},
    {path: "description", op: "CONTAINS", value: "some term"}
  ]
}
```

or

```javascript
{
  select: ["Gene.symbol"],
  where: [
    [ "symbol", "=", "eve" ],
    [ "length", ">", 12345 ],
    [ "homologues.homologue.organism.taxonId", "!=", 7227 ],
    [ "description", "CONTAINS", "some term" ]
  ]
}
```

#### Multi-Value Constraints

One can specify that a path resolves to a value matching one \(or none\) of a set of values. This can be done like so:

```markup
<constraint path="Gene.symbol" op="ONE OF">
  <value>eve</value>
  <value>bib</value>
  <value>zen</value>
</constraint>
```

```javascript
{
  select: ["Gene.proteins.name"],
  where: {
    symbol: ["eve", "bib", "zen"]
  }
}
```

A special sub-type of this kind of constraint is the range constraint shown below:

```markup
<constraint path="Gene.chromosomeLocation" op="OVERLAPS">
  <value>X:12345..45678</value>
  <value>2L:12345..45678</value>
  <value>3R:12345</value>
</constraint>
```

```javascript
{
  select: ["Gene.symbol"],
  where: {
    chromosomeLocation: {OVERLAPS: ["X:12345..45678", "2L:34567..78654", "3R:12345"]}
  }
}
```

#### Lookup Constraints

Lookup constraints allow convenient constraints over multiple attributes of a value, or querying when you don't know the particular attribute you wish to constrain. For example:

```markup
<constaint path="Gene" op="LOOKUP" value="eve"/>
```

```javascript
{
  select: ["Gene.symbol"],
  where: [[ "Gene", "LOOKUP", "eve"]]
}
```

An extra disambiguating value can be supplied. Its meaning depends on context, so for example, this would limit genes to a particular organism:

```markup
<constaint path="Gene" op="LOOKUP" value="eve" extraValue="D. melanogaster"/>
```

```javascript
{
  select: ["Gene.symbol"],
  where: [[ "Gene", "LOOKUP", "eve", "D. melanogaster"]]
}
```

#### List Constraints

Nodes in the query graph can be constrained by membership in a stored list. This type of constraint is similar to multi-value constraints, in that we are looking at membership in a set, and also similar to lookup constraints in that we treat entities as subjects of the constraints, rather than values of any of the attributes of the entities. A simple example is selecting all the proteins for genes in a given list as shown below:

```markup
<constraint path="Protein.genes" op="IN" value="a given list"/>
<!-- Or to exclude those records -->
<constraint path="Protein.genes" op="NOT IN" value="a given list"/>
```

```javascript
{
  select: ["Protein.*"],
  where: [["genes", "IN", "a given list"]]
}
```

The only relationships that may be asserted are "IN" and "NOT IN".

#### Loop Constraints

Queries can require that two nodes in the query graph refer \(or do not refer\) to the same entity. This kind of constraint is termed a "Loop" constraint. An example of this would be to request all the genes in the pathways a given gene is in, so long as they are \(or are not\) one of the orthologues of the gene in question.

A loop constraint is composed of two paths, and either `=` or `!=`.

```markup
<constraint path="Gene.homologues.homologue" op="=" value="Gene.pathways.genes"/>
<!-- or -->
<constraint path="Gene.homologues.homologue" op="!=" value="Gene.pathways.genes"/>
```

```javascript
{
  select: ["Gene.homologues.homologue.*", "Gene.pathways.genes.*"],
  where: [
    ["Gene.symbol", "=", "x"],
    ["Gene.homologues.homologue", "=", "Gene.pathways.genes"]
  ]
}
```

Loop constraints must link paths that are not separated by `outer joins`.

#### Type Constraints

Type constraints, in addition to limiting the returned results, have the side-effect of type-casting the references in their paths to the given type, enabling other paths to reference otherwise unreferenceable fields.

eg.

```markup
<constraint path="Gene.overlappingFeatures" type="ChromosomeStructureVariation"/>
```

```javascript
{
  from: "Gene",
  select: ["symbol", "overlappingFeatures.element1.primaryIdentifier"],
  where: {
    overlappingFeatures: "ChromosomeStructureVariation"
  }
}
```

Type constraints may not participate in the constraint logic, and as such, never have a `code` associated with them.

## Sort Order

The order of the results can be determined through the sort order like so:

```markup
<query model="genomic" view="Gene.symbol" sortOrder="Gene.length DESC Gene.name ASC"/>
```

```javascript
{select: ["Gene.symbol"], sortOrder: [["length", "DESC"], ["name", "ASC"]]}
```

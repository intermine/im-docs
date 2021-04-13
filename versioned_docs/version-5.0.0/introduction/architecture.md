---
title: Architecture
---
The InterMine system includes:

* BlueGenes, the Clojure-powered user interface for InterMine underpinned by the InterMine Web Services. Despite the legacy web application, BlueGenes is completely separate from the InterMine Server.

* InteMine Server composed by several modules written in Java:
  * the Web Services module which expose core functionalities (queries, templates and lists) as well as metadata (such as the data model) and specialized resources (such as DNA sequence export, region search and enrichment statistics),
  * the legacy web application built with Apache Struts 1 framework,
  * the data integration modules that load data from common biological formats e.g. GFF3, FASTA, OBO, BioPAX, GAF, PSI,
  * the ObjectStore, a custom object/relational mapping module optimized for read-only database performance.


* Client libraries for many programming languages, including Python, Perl, Ruby, Java and JavaScript. The client libraries enable users to automate data-based workflows or access data directly without using the InterMine user interface.

![InterMine Architecture](/img/architecture.png)

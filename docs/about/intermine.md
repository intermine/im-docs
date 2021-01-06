# InterMine Features

InterMine is a powerful open source data warehouse system, created specifically for integrating and analysing complex biological data. Benefiting from over a decade of data warehousing experience and input from a wide range of research collaborators, InterMine is still in active development, and is used by a number of major model organism databases among others. InterMine features include:

### Sophisticated data integration facilities

While a core biological model based on the Sequence Ontology is provided, the data model is flexible and extensible -- new data types can be added easily by editing an XML file. A range of data parsers is provided to facilitate the data loading, and a number of consistency checks after the database build ensure that the data has been integrated correctly. Sophisticated identifier resolution ensures that all data identifiers are correctly updated to their most current form.

### Fast, flexible querying

The sophisticated query optimisation means that users can construct and perform a wide range of queries across the data model, while retaining good query speed. The query optimisation method is constructed around the use of precomputed tables, meaning that the data schema does not need to be denormalized in order to speed up query time. The system is also fast enough to deal with large quantities of data - the HumanMine database contains over 50 million objects, and its size with precomputed tables is 200 GB, with PhytoMine being much larger, containing 2 billion objects and almost 1500GB.

### User-friendly web interface and analysis tools

The web application is included with the InterMine package, and is an accessible starting point for first time users. It contains a number of features focused around list analysis \(a common need in biology\) including graphical data displayers and tools that automatically calculate a set of enrichment statistics. It also includes report pages, interactive results tables, saved template queries, a regions search tool and a query builder. This setup makes it possible to browse and explore data without any programming knowledge. Users can save their data and queries in a private workspace.

### Extensive set of APIs and web tools

InterMine can be accessed programmatically, and we provide client libraries for five commonly used programming languages \(Python, Perl, Ruby, Java, JavaScript\). This enables bioinformatician users to access InterMine functionality without using the web application and to query data from a number of different InterMine instances using a single script, or as part of an automated workflow. It also enables the easy embedding of InterMine analysis tools into external websites, as well as the development of external applications that access InterMine data.

### Highly developed and extensible system

InterMine has been in development for over 10 years, and during this time, based on user demand, we have introduced a large number of features. These range from faceted filtering options and enabling Boolean logic and set operations, to table sorting and filtering, a range of standardised export options, integration of other tools such as Cytoscape, and enabling embedding of individual analysis tools as part of external websites. With funding secured for a further 5 years, we plan to continue adding features to InterMine. Furthermore, the open source, extensible framework means InterMine is also open to other developers to build upon.


---
title: Web Services Overview
---

InterMine provides programmatic access to its features via web services. This allows users to automate:

* Data retrieval \(custom queries, templated queries, keyword searches\)
* List creation/analysis/management
* User profile management
* Data-model introspection

For a full listing of web service capabilities on various mines, please see the [HTTP API documentation](http://iodocs.apps.intermine.org).

## Getting Started

**Install Required Dependencies**

If you are reading this page, we make the assumption you know how to write and run programs in your language of choice. You will probably want to download and install the appropriate client library \(see [API and Client Libraries](index.md#api-and-client-libraries)\), which typically involves the standard package manager for the given platform.

**Look at some example code**

We also assume you are already familiar with the InterMine web interface, as provided by sites such as [FlyMine](http://www.flymine.org). Each result table in the web interface includes a mechanism for generating code using one of the client libraries which generates the same results as those seen in the table \(click on the **code** button\). The generated code is meant to help get you started with the use of the client libraries.

There is also a [Tutorial](tutorial.md) for the Python API

**Modify the code so it does what you want**

Working from the generated stub, you can edit the code to perform your intended task. You will probably want to refer to the API documentation for your target language \(see below\).

## API and Client Libraries

InterMine exposes its functionality over an HTTP API \(generally following RESTful principles, but there is a bit of RPC there\). Client libraries are available in commonly used languages so you can get started quickly. All our code is hosted on [Github](http://www.github.com/intermine), and contributions are welcome. All InterMine code is free and open-source, released under the LGPL \(see [Legal](../about/index.md#legal)\).

For information on the underlying API, and the supported libraries, please visit the following links:

**HTTP API**

Documentation on services available from mines: [http://iodocs.apps.intermine.org](http://iodocs.apps.intermine.org)

**Java**

[Download](https://github.com/intermine/intermine-ws-java) \| [API](http://intermine.org/intermine-ws-java/javadoc/) \| [Tutorial](https://github.com/intermine/intermine-ws-java-docs/) \| [Source](https://github.com/intermine/intermine-ws-java)

**Perl Client**

[Download \| API](http://search.cpan.org/perldoc?Webservice%3A%3AInterMine) \| [Tutorial](https://metacpan.org/pod/distribution/Webservice-InterMine/lib/Webservice/InterMine/Cookbook.pod) \| [Source](https://github.com/intermine/intermine-ws-perl)

**Python Client**

[Download](http://pypi.python.org/pypi/intermine) \| [API](http://intermine.org/intermine-ws-python) \| [Tutorial](https://github.com/intermine/intermine-ws-python-docs/) \| [Source](https://github.com/intermine/intermine-ws-client.py)

**Ruby Client**

[Download \| API](http://www.rubygems.org/gems/intermine) \| Tutorial \| [Source](https://github.com/intermine/intermine-ws-ruby)

**JavaScript Client \(for Bowser and node.js\)**

[Download](https://npmjs.org/package/imjs) \| [API](http://alexkalderimis.github.io/imjs/) \| Tutorial \| [Source](https://github.com/intermine/imjs)

**R Client**

[Download](http://bioconductor.org/packages/release/bioc/html/InterMineR.html) \| [Docs](http://bioconductor.org/packages/release/bioc/html/InterMineR.html) \| [Tutorial](http://bioconductor.org/packages/release/bioc/html/InterMineR.html) \| [Source](http://bioconductor.org/packages/release/bioc/html/InterMineR.html)

## Authentication

Authenticated web services are accessed via tokens: either 24-hour anonymous tokens or permanent user API key tokens. See [Authentication](authentication.md) for more details.


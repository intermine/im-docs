Web Services
================================

InterMine allows, and encourages, programmatic access to
its features, also known as *web services*. This allows
users to automate:

* Data retrieval (custom queries, templated queries, keyword searches).
* List creation/analysis/management
* User profile management
* Data-model introspection

For a full listing of web service capabilities please see the
`HTTP API documentation <http://iodocs.labs.intermine.org>`_.

Getting Started
----------------

Install Required Dependencies
    If you are reading this page, we make the assumption you know how to write and
    run programs in your language of choice. You will probably want to download
    and install the appropriate client library (see `API and Client Libraries`_),
    which typically involves the standard package manager for the given platform.

Look at some example code
    We assume you are already familiar with the InterMine web interface, as provided
    by sites such as `FlyMine <http://www.flymine.org>`_. Each result table in the web
    interface includes a mechanism for generating code using one of the client libraries
    which generates the same results as those seen in the table (click on the **code**
    button). The generated code is meant to help get you started with the use of the
    client libraries. 

Modify the code so it does what you want
    Working from the generated stub, you can edit the code to perform your intended task. You
    will probably want to refer to the API documentation for your target
    language (see below).


How Do I?
-------------

For the kinds of things you will probably be wanting to do, see :ref:`howtows`

API and Client Libraries
------------------------

InterMine exposes its functionality over an HTTP API (generally following RESTful
principles, but there is a bit of RPC there). Client libraries are available in commonly
used languages so you can get started quickly. All our code is hosted on `Github <http://www.github.com/intermine>`_,
and contributions are welcome. All InterMine code is free and open-source, released under
the LGPL (see :ref:`legal`).

For information on the underlying API, and the supported libraries, please visit the following links:

HTTP API
     Documentation: `<http://iodocs.labs.intermine.org>`_
Java
    `Download <https://github.com/intermine/intermine/raw/master/intermine/webservice/client/download/dist/java-intermine-webservice-client-2.0.zip>`_
    | `Docs <http://extrac.sysbiol.cam.ac.uk/wiki/JavaClient>`_
    | `Source <https://github.com/intermine/intermine/tree/master/intermine/webservice/client>`_
Perl Client
    `Download | Docs <http://search.cpan.org/perldoc?Webservice%3A%3AInterMine>`_
    | `Source <https://github.com/intermine/intermine-ws-perl>`_
Python Client
    `Download <http://pypi.python.org/pypi/intermine>`_
    | `Docs <http://packages.python.org/intermine/>`_
    | `Source <https://github.com/intermine/intermine-ws-client.py>`_
Ruby Client
    `Download | Docs <http://www.rubygems.org/gems/intermine>`_
    | `Source <https://github.com/intermine/intermine-ws-ruby>`_
JavaScript Client (for Browser and node.js)
    `Download <https://npmjs.org/package/imjs>`_
    | `Docs <http://alexkalderimis.github.io/imjs/>`_
    | `Source <https://github.com/intermine/imjs>`_

.. index:: Perl, Ruby, web services, REST, Python, JavaScript, code generation, clients, Java

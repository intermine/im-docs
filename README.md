intermine.org
=============

Landing page and documentation for the InterMine project,

Landing page
------------

To see the source for the landing page, switch to the `gh-pages` branch.

The designs and source source for the landing page can be found in the [intermine/design-materials](https://github.com/intermine/design-materials/tree/master/websites/intermine.org/) repo.

Documentation
-------------

The markup used is called **reStructuredText** and guides can be found [here](http://sphinx-doc.org/rest.html) or [here](http://docutils.sourceforge.net/docs/user/rst/quickref.html). It is used by [Sphinx](http://sphinx-doc.org), a Python documentation generator, to build HTML version of a documentation. [ReadTheDocs](https://intermine.readthedocs.org) automagically checks daily for changes to this repo and rebuilds the docs.

To build the Sphinx documentation locally, run:

```bash
$ cd docs/ ; make html
```

The source for the Sphinx documentation theme can be found in the [intermine/design-materials](https://github.com/intermine/design-materials/tree/master/websites/intermine.org/) repo.
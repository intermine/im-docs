intermine.org
=============

Landing page and documentation for the InterMine project.

Landing page
------------

To see the source for the landing page, switch to the `gh-pages` branch.

The designs and source source for the landing page can be found in the
[intermine/design-materials][1] repo.

Documentation
-------------

The HTML documentation is generated from [RST][rest] source, using a Python
static site generator called [Sphinx][sphinx]. RST stands for
**reStructuredText** (see [reference][quickref]).  When you push to the [GitHub
repo][repo] for these docs, this triggers a new build of the [documentation
site][docssite], where the changes will be visible within a few minutes.
This process is managed by [ReadTheDocs][rtd], an online service for
maintaining documentation.

Building locally
----------------

You should build locally before you push, to make sure your changes are correct.
You will need the Sphinx environment for this. **Make** and **Python** are
required, and we recommend using **virtualenv** to manage dependencies:

Setting up:

```bash
cd docs
virtualenv .
source ./bin/activate
pip install -r requirements.txt
```

Building the docs:

```bash
# In the docs directory
make html
```

Theming
-------
The source for the Sphinx documentation theme can be found in the
[intermine/design-materials][theme] repo.

[1]: https://github.com/intermine/design-materials/tree/master/websites/intermine.org/
[repo]: https://github.com/intermine/intermine.org
[rest]: http://sphinx-doc.org/rest.html
[rtd]: https://readthedocs.org/
[docssite]: https://intermine.readthedocs.org
[quickref]: http://docutils.sourceforge.net/docs/user/rst/quickref.html
[sphinx]: http://sphinx-doc.org
[theme]: https://github.com/intermine/design-materials/tree/master/websites/intermine.org/

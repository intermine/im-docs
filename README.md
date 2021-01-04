# intermine.org

Documentation for the [InterMine](http://intermine.org) project.

## Documentation

The HTML documentation is generated from [RST](http://sphinx-doc.org/rest.html) source, using a Python static site generator called [Sphinx](http://sphinx-doc.org). RST stands for **reStructuredText** \(see [reference](http://docutils.sourceforge.net/docs/user/rst/quickref.html)\). When you push to the [GitHub repo](https://github.com/intermine/intermine.org) for these docs, this triggers a new build of the [documentation site](https://intermine.readthedocs.org), where the changes will be visible within a few minutes. This process is managed by [ReadTheDocs](https://readthedocs.org/), an online service for maintaining documentation.

## Building locally

You should build locally before you push, to make sure your changes are correct. You will need the Sphinx environment for this. **Make** and **Python 2.7** are required, and we recommend using \[Conda\]\[conda\] to manage dependencies:

Setting up:

```bash
cd docs
conda create -n im-docs python=2.7
conda activate im-docs
pip install -r requirements.txt
conda install sphinx
```

Building the docs:

```bash
# In the docs directory
make html
```

## Theming

The source for the Sphinx documentation theme can be found in the [intermine/design-materials](https://github.com/intermine/design-materials/tree/master/websites/intermine.org/) repo.

\[conda\]: [https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)


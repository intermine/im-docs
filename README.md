# InterMine Server Documentation

Documentation for the [InterMine](http://intermine.org) project.

## Documentation

The HTML documentation is generated from Markdown docs, using the static site generator called [Docusaurus](https://v2.docusaurus.io/). 

## Building locally

You should build locally before you push, to make sure your changes are correct. You will need **nodejs** (version >= 10.15.1) and **yarn** (version >= 1.5) installed.

Building the docs:

```bash
cd im-docs
yarn install
yarn start
```

## Deployment

This repository uses GitHub Actions to automatically deploy any changes pushed to the master branch to GitHub Pages. The website is deployed to: http://intermine.org/im-docs/

If you wish to deploy manually for some reason, you can use the below command considering you have commit access to the repository.

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

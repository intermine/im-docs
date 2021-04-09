---
title: Tool API Overview
---

BlueGenes provides a new approach to adding visualisations and analyses tools to your InterMine, allowing you to create tiny JavaScript applications to be embedded within the webapp.

- Include any third-party JS library
- Use [imjs](https://github.com/intermine/imjs) to query for additional data
- Specify to BlueGenes what objects to display for and on what pages

The bundles you create containing your apps will be served individually by BlueGenes, and they will only be loaded on demand, when the object and/or page you've specified to support is present. BlueGenes will pass your app the object ID (which can be multiple for a list or query result) which you can then pass to [imjs](https://github.com/intermine/imjs) to obtain more data on the object, for the purpose of creating graphs or interactive tools.

## Automatically installed tools

## Tools folder

### Installing local tools

## Making new tools available to others

[Tool Store page](http://intermine.org/intermine-user-docs/docs/admin-account#the-tools-store)

---
title: Tool API Overview
---

BlueGenes provides a new approach to adding visualisations and analyses tools to your InterMine, allowing you to create tiny JavaScript applications to be embedded within the webapp.

- Include any third-party JS library
- Use [imjs](https://github.com/intermine/imjs) to query for additional data
- Specify to BlueGenes [what objects to display for and on what pages](specification#configjson)

The bundles you create containing your apps will be served individually by BlueGenes, and they will only be loaded on demand, when the object and/or page you've specified to support is present. BlueGenes will pass your app the object ID (which can be multiple for a list or query result) which you can then pass to [imjs](https://github.com/intermine/imjs) to obtain more data on the object, for the purpose of creating graphs or interactive tools.

## Tools folder and config

BlueGenes tools are located at the [tool path](../blue-genes/index#environment) which defaults to the `tools` directory where BlueGenes is run. It contains all installed tools nested within the path corresponding to their npm package name (e.g., `@intermine/bluegenes-interaction-network`). Installed tools are managed using the `tools.edn` config file, which references the path of all installed tools and their version number.

## Automatically installed tools

When you start BlueGenes and `tools.edn` is missing, it will automatically install all tools from [npm](https://www.npmjs.com/) satisfying:

- scope must be *intermine*
- keyword must be *bluegenes-intermine-tool*

## Installing local tools

You can add tools that exist locally to your BlueGenes installation by copying them into the [tools directory](#tools-folder-and-config), ensuring their path matches their npm package name (see **NOTE** below for details), and adding their entry to the [tools config](#tools-folder-and-config). If the tool is under development and you want to test it within BlueGenes, a useful tip is to create a [symbolic link](https://linuxize.com/post/how-to-create-symbolic-links-in-linux-using-the-ln-command/). Below is an example command run from the tools directory for a locally developed *bluegenes-interaction-network* tool.

```bash
ln -s ~/projects/bluegenes-interaction-network @intermine/bluegenes-interaction-network
```

:::note
The path of your tool within the `tools` directory needs to be exactly the same as your npm package name, which can be found in your tool's `package.json` under the `name` key.
:::

Make sure to add your tool's path and its version number to `tools.edn` so it's visible to BlueGenes.

```
{:tools {;; Other tools
         "@intermine/bluegenes-interaction-network" "1.0.0"}}
```

In the directory of your tool, you can continue developing and rebuild it to see your changes in BlueGenes.

## Making new tools available to others

All npm packages with the keyword `bluegenes-intermine-tool` are displayed on the [BlueGenes Tool Store page](http://intermine.org/intermine-user-docs/docs/admin-account#the-tools-store) accessible to InterMine server admins. Any available tool can be quickly installed from the user interface by clicking the *install* button.

For your tool to appear on the Tool Store page, all you need to do is ensure your tool's `package.json` contains `bluegenes-intermine-tool` in the array under the `keywords` key (this is already done for you if you used the [tool generator](https://github.com/intermine/generator-bluegenes-tool)), and [publish](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages) your tool to the npm package registry. This can usually be done by [signing up for an npm user account](https://www.npmjs.com/signup), then logging in at the terminal and publishing your package with the following commands, run from your tool directory:

```bash
npm login # Only needs to be done once.
npm publish
```

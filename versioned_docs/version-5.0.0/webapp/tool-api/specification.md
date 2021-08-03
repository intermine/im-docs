---
title: Tool API Specification
---

## Tool structure

```
.
+-- mytool/
|   +-- dist/
|      +-- style.css (optional)
|      +-- bundle.js (required)
|   +-- src/
|      +-- style.less (optional, could be some other preprocessor)
|      +-- index.js (optional, but recommended)
|   +-- config.json (required)
|   +-- package.json (required)
|   +-- demo.html (optional)
|   +-- preview.png (optional)
```

You may also have additional files and folders, if needed. They won't interfere.


### dist

Put all of your production-ready files in here. Ideally, this should be no more than two things:

- **bundle.js** contains your entire application with all dependencies bundled in, excluding [imjs](https://github.com/intermine/imjs) which is available on the window.
- **style.css** is optional. Use if any additional styles are required.

Filenames can be changed as long as the correct files are specified in [config.json](#configjson).

### src

How do you build the static files above? Probably with the *src* directory. This is the folder you'll be doing most of your work in.

### index.js

This is the preferred entry point to build *dist/bundle.js*. You may import external libraries using *package.json* dependencies if needed. Make sure to export a main method with the following signature:

```javascript
export function main (el, service, imEntity, state, config, navigate) {
  // code to initialise your app here
}
```


**el** - The ID of a DOM element where the tool will render.

**service** - An object representing an InterMine service, like the following:

```json
{
  "root": "https://www.humanmine.org/humanmine",
  "token": "bananacakes"
}
```

**imEntity**

An object representing the data passed to the app, e.g.:

```json
{
  "Gene": {
    "class": "Gene",
    "format": "id",
    "value": 456
  }
}
```

If your tool *accepts* `ids` and takes multiple *classes*, (see [config.json](/docs/tools/tool-api.md#configjson)) it might receive more than one class if they are present on the list or query results page.

```json
{
  "Gene": {
    "class": "Gene",
    "format": "ids",
    "value": [1, 2]
  },
  "Protein": {
    "class": "Protein",
    "format": "ids",
    "value": [3, 4]
  }
}
```

Subclasses (descendant of a class in the data model hierarchy) might also be passed to your tool if it's descendant of one of your tool's *classes*. When this happens, the key will still be its superclass which you specified in *classes*, while the subclass name can be accessed under `class`. If you want your tool to work with subclasses, you'll need to make sure that any queries you build based on *imEntity* sets the `from` key to this class (`imEntity.Gene.class` in this example).

```json
{
  "Gene": {
    "class": "ORF",
    "format": "id",
    "value": 5
  }
}
```

It is up to you which class you want to use in your tool, and you can even use multiple.

Currently, it is not possible to receive multiple classes on the report page with *accepts* `id`. However, the Tool API allows for this, should it be an option in the future.

**state** - **NOT IMPLEMENTED** - The intent is to allow tools to have local state which persists across changes to a result table (e.g., on the query results page), which causes tools to be reinitialised with the new data. Please [contact us](../../about/contact-us) if you have a use case for this.

**config** - The config object as defined in *config.json*, in case the tool wishes to use data from it.

**navigate**

A function you can call to make BlueGenes navigate to a specific page.

```javascript
// Navigate to a report page.
navigate("report", {type: "Gene", id: 1018204});
// Run a query and open the page showing the results.
navigate("query", myQueryObj);
// Show the results page for an existing list.
navigate("list", "PL_GenomicsEngland_GenePanel:Radial_dysplasia");
```

You can optionally specify a third argument with the namespace of a mine (e.g., `"humanmine"`).

### style.less

This is the preferred entry point to build *dist/styles.css*.  If your tool has a stylesheet already, make sure to import the styles and wrap them in a parent class corresponding to your tool's name, to ensure the styles are sandboxed. See the [tutorial](tutorial#goodness-thats-ugly-lets-make-it-look-a-little-nicer) for an example of this.

### config.json

This file provides data describing how BlueGenes should use your tool.

```json
{
  "accepts": ["id", "ids"],
  "classes": ["Gene", "Protein", "*"],
  "depends": ["AtlasExpression", "ProteinAtlasExpression"],
  "description": "Optional text shown in info popover.",
  "files": {
    "css": "dist/style.css",
    "js": "dist/bundle.js"
  },
  "threshold": 100,
  "toolName": {
    "human": "Protein Features",
    "cljs": "proteinFeatures"
  },
  "version": 2
}
```
**accepts**

* id: a single database ID, for a tool to be shown on an object's report page
* ids: multiple database IDs, for a tool to be shown on list analysis/query results

Specifying `id` means that the tool will be shown on the report page and passed the ID of the InterMine object (e.g., a protein might be represented by the ID 4815162342). For `ids`, the tool will be shown for list and query results and passed multiple IDs consisting of all the InterMine objects present. If you specify both, the tool will be shown in both circumstances and you'll need to ensure it can handle both single and multiple IDs.

**classes** - use `*` if you want the tool to display for all objects. Otherwise, the tool will display for a specified class of objects (e.g., a gene displayer). Note that a subclass of a class you specify here may be passed via *imEntity* (see [section on imEntity](#indexjs) for more details).

**depends** lets you specify any class names in the InterMine server's model that your tool depends on. This is useful if you're querying for a non-standard path that is only present in a specific InterMine instance. Any instances which don't have the class name in their model will not attempt to run your tool, and will instead, list it as unsupported.

**description** is optional and lets you add text (markdown supported) that is shown when hovering/clicking an info icon in the header of the tool beside its name. Used to include extra details on your tool which would take too much space if shown as part of the visualisation. For newlines, use `\n` as JSON does not support literal newlines.

**files** - one file each for CSS and JS. This should be the [files](#dist) built from *src* bundling all your dependencies. CSS is optional if the tool has no additional styling.

**threshold** is the greatest count of objects your tool will automatically load for. This will be matched against the [imEntity](#indexjs) with the highest amount of `value` elements. If your tool becomes very resource intensive or its visualisation becomes very crowded, when the amount of objects reach a certain threshold, you should set this to an appropriate number. The tool will still be present, although it will stay collapsed with a message explaining to the user that there are too many results and they can click to load the tool. If this property isn't set, BlueGenes will default to 1000 (this means you can set a higher threshold if you wish to override it).

**toolName** is an object with a human-readable name, as well as an internal name. The human name would be what you want to see as a header for this tool (e.g. ProtVista might be called "Protein Features"). The internal `cljs` name needs to be unique among tools and identical to the global JS variable which your tool's bundle initialises.

**version** is a whole number indicating which major version of the Tool API your tool adheres to. When creating a tool, you should always specify the latest version presented here. If your tool's version does not match the Tool API version of the BlueGenes using your tool, a warning will be shown and your tool will be disabled from displaying. In this case, you will have to update your tool to support the Tool API version of the BlueGenes using your tool, update the version key in your *config.json* and [publish](overview#making-new-tools-available-to-others) a new version of your tool. See the [Changelog](#changelog) for details on each version.

### preview.png

Optional preview image for the [Tool Store page](http://intermine.org/intermine-user-docs/docs/admin-account#the-tools-store). When admins are selecting tools, this is the way to impress them!

## Other notes

* [imjs](https://www.npmjs.com/package/imjs) will be available on the window automatically.
* [React.js](https://reactjs.org/) (vars React and ReactDOM) will also be available on the window, due to being used by BlueGenes.

**Credits:** Thanks to [Vivek](https://gist.github.com/vivekkrish/2e5e4128efbbf2014c194aae6b83d245), [Josh](https://gist.github.com/joshkh/76091f1182d425934c1c5dbe2644d23a) and [Yo](https://github.com/yochannah/) for early work on the Tool API proposal.

## Changelog

We aim to keep all changes to the Tool API as backwards compatible as possible, but in some cases, breaking changes are necessary. The Tool API major version number will increment on breaking changes and additional details on the rationale and upgrading process will be included.

Guidelines which should be followed for Tool API changes:
1. All maintainers of the tools in https://github.com/topics/bluegenes-tool need to be contacted.
2. A breaking change should be avoided unless deemed absolutely necessary, as agreed between developers and maintainers.
3. Developers will assist with upgrading existing tools, even so far as to creating PRs.
4. If the tool maintainer doesn't provide a way to test the updated tool, this becomes their responsibility.
5. When releasing a breaking version, send an email to the dev-intermine mailing list with a warning that things may break if they update BlueGenes to this version.

### Tool API version 1.0

- Initial release.

### Tool API version 2.0

- Changes `imEntity` from an object to a nested object with keys corresponding to each object's class.

  `{"class": "Gene", "format": "id", "value": 1}` **-->** `{"Gene": {"class": "Gene", "format": "id", "value": 1}}`

  **Rationale:** It's possible for a list or query results page to have multiple classes, depending on the columns present. This meant a tool needed to be able to receive multiple imEntity's, which the previous Tool API didn't allow.

  **Upgrading:** You will need to grab the value you wish to work on out from the nested object in `imEntity`. As an example, for a tool that works on the "Gene" class, you would change `imEntity.value` to `imEntity.Gene.value`. If your tool takes multiple classes, you can decide whether to always default to one if available, or present a different behaviour when multiple classes are present.

- Adds a `version` key to *config.json*.

  **Rationale:** To accomodate the first breaking change in the Tool API, we have added versioning of the tools. If your tool's version does not match the Tool API version of the BlueGenes using it, a warning will be displayed and your tool won't be shown on the respective pages. To make your tool work again, you will have to update it to support the changes to the Tool API, as well as update the `version` key in *config.json*. Note that a missing `version` key will be interpreted as version 1.

  **Upgrading:** Make sure your tool adheres to Tool API version 2 as described here, then add `"version": 2` to your *config.json*.

# publication-search

{% hint style="info" %}
You can view the source files for this project in the [intermine/intermine-apps-c](https://github.com/intermine/intermine-apps-c/tree/master/publication-search) repo.
{% endhint %}

This document will guide you through the process of writing a JavaScript client side app \(running completely in a browser\) using [Bower](http://bower.io/) and [Grunt](http://gruntjs.com/) tools. This app will connect to an [InterMine](http://intermine.org) instance to run a query. The objective will be to fetch a list of publications for each _bio entity_ found that is _like_ our query.

The libraries we will be using:

1. [Bower](http://bower.io/) to fetch vendor dependencies such as JavaScript, CSS or Fonts.
2. [canJS](http://canjs.com/) is a framework for client-side development handling routing, events etc.
3. [CoffeeScript](http://coffeescript.org/) a language that compiles down to JavaScript and makes writing an app easier.
4. [Foundation](http://foundation.zurb.com/) is a CSS framework of reusable UI components.
5. [Grunt](http://gruntjs.com/) to build/transpile our source files.
6. [jQuery](http://jquery.com/) is a DOM manipulation library \(and more\).
7. [Mustache](http://mustache.github.io/) is a multi-platform templating language allowing us to embed dynamic objects in HTML.
8. [Node](http://en.wikipedia.org/wiki/Nodejs) JavaScript desktop software platform.
9. [Stylus](http://learnboost.github.io/stylus/) allows us to be more expressive and dynamic with CSS.
10. [Lodash](http://lodash.com/) is a utility toolbelt making actions such as iterating over items easier.
11. [imjs](https://github.com/alexkalderimis/imjs) used to query InterMines from browser or Node. Saves you having to write raw HTTP requests.

## Initialize Project

The first step will be to setup our directory structure.

**`build/`**

Will be the directory where our final app package will live. We will develop in languages like [Stylus](http://learnboost.github.io/stylus/) or [CoffeeScript](http://coffeescript.org/) and need a way to package all these resources into one whole directory. This is where all these files will live.

**`bower_components/`**

This directory will be automatically created and will contain libraries we have requested through the Bower system.

**`example/`**

Contains an example of our app in use.

**`src/`**

Source files that our code will consist of.

**`bower.json`**

Will contain a listing of libraries we want to download using [Bower](http://bower.io/).

**`package.json`**

Lists libraries we will need to compile and build our app with.

### Node.js platform

Since our application is targeting JavaScript in the browser, it is pretty useful if we use JavaScript on our computer \(desktop\) too. Enter [Node](http://en.wikipedia.org/wiki/Nodejs) which allows us to execute JavaScript on our computers instead of just our browsers.

You can fetch [binaries](http://nodejs.org/download/) from the homepage or use your \(hopefully Linux\) [packman](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

Once Node is installed, edit the `package.json` file like so:

```javascript
{
    "name": "publication-search",
    "version": "0.0.0",
    "devDependencies": {
        "bower": "~1.2.7",
        "grunt": "~0.4.1",

        "grunt-apps-c": "0.1.14",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-stylus": "~0.9.0",

        "grunt-contrib-uglify": "~0.2.5",
        "grunt-contrib-cssmin": "~0.6.2"
    }
}
```

This file tells Node which libraries will be used to build our app. These are not client-side libraries, but server-side if you will.

The top bit of the `devDependencies` lists a bunch of Grunt and Bower related libraries.

In order to install all of these, execute the following:

```bash
$ npm install -d
```

### Bower vendor dependencies

Now we want to fetch libraries that our app, when running, will depend on.

Edit the `bower.json` file like so:

```javascript
{
    "name": "publication-search",
    "version": "0.0.0",
    "dependencies": {
        "jquery": "2.0.3",
        "lodash": "2.4.1",
        "canjs": "2.0.4",
        "foundation": "5.0.2",
        "imjs": "3.2.1"
    }
}
```

The file has a bunch of key-value pairs.

**`name`**

Name of our application in the Bower ecosystem, required.

**`version`**

Version number in the Bower ecosystem, required.

**`dependencies`**

Lists the actual libraries and their versions to fetch. You can populate this list by executing `$ bower install jquery --save` for example. This will download the latest version of the `jquery` component into the `bower_components/` directory. You can [search](http://sindresorhus.com/bower-components/) for available components using `$ bower search jquery`. To actually trigger a search, execute `$ bower install`. The different libraries will be introduced as we code along.

### Grunt building

Grunt is used to munge files together and execute commands on them. Create a file called `Gruntfile.coffee`:

```coffeescript
module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON("package.json")

        apps_c:
            commonjs:
                src: [ 'src/**/*.{coffee,mustache}' ]
                dest: 'build/js/ps.js'
                options:
                    main: 'src/app.coffee'
                    name: 'ps'

        stylus:
            compile:
                src: [ 'src/styles/app.styl' ]
                dest: 'build/css/ps.css'

        concat:            
            scripts:
                src: [
                    # Vendor dependencies.
                    'bower_components/jquery/jquery.js'
                    'bower_components/lodash/dist/lodash.js'
                    'bower_components/canjs/can.jquery.js'
                    'bower_components/canjs/can.map.setter.js'
                    'bower_components/imjs/js/im.js'
                    # Our app.
                    'build/js/ps.js'
                ]
                dest: 'build/js/ps.bundle.js'
                options:
                    separator: ';' # for minification purposes

            styles:
                src: [
                    'bower_components/foundation/css/normalize.css'
                    'bower_components/foundation/css/foundation.css'
                    # Our app.
                    'build/css/ps.css'
                ]
                dest: 'build/css/ps.bundle.css'

        uglify:
            scripts:
                files:
                    'build/js/ps.min.js': 'build/js/ps.js'
                    'build/js/ps.bundle.min.js': 'build/js/ps.bundle.js'

        cssmin:
            combine:
                files:
                    'build/css/ps.bundle.min.css': 'build/css/ps.bundle.css'
                    'build/css/ps.min.css': 'build/css/ps.css'

    grunt.loadNpmTasks('grunt-apps-c')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    grunt.registerTask('default', [
        'apps_c'
        'stylus'
        'concat'
    ])

    grunt.registerTask('minify', [
        'uglify'
        'cssmin'
    ])
```

This file is written in [CoffeeScript](http://coffeescript.org/) and lists the tasks to run when we want to build our app. From the top:

**`apps_c`**

This directive says that we want to take any [CoffeeScript](http://coffeescript.org/) and [Mustache](http://mustache.github.io/) files we find in `src/` and combine them into one JavaScript package.

**`stylus`**

Take a [Stylus](http://learnboost.github.io/stylus/) file and turn it into CSS.

**`concat`**

Take our vendor files \(installed using [Bower](http://bower.io/)\) and, together with our app, make them into a bundle. If someone else wants to use our app they need our app and its deps too, so this one file will do it for them. Do the same to CSS too.

**`uglify`**

Minify our built JavaScript files. This makes them small, but unreadable, so not great for debugging.

**`cssmin`**

The same as `uglify` but for CSS

Then we have two calls to `grunt.registerTask` which bundle a bunch of tasks together. For example, running `$ grunt minify` will run the `uglify` and `cssmin` tasks.

While developing, it is quite useful to watch the source files and re-run the build task like so:

```bash
$ watch --color grunt
```

This will run the default Grunt task every 2s.

## Source files

### Example page

One needs an access point where our app will get loaded with particular configuration. This is where the `example/index.html` comes in:

```markup
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Publication Search</title>

    <link href="build/css/ps.bundle.css" media="all" rel="stylesheet" type="text/css" />
    <script src="build/js/ps.bundle.js"></script>
</head>
<body>
    <div id="app"></div>
    <script>
        // Once scripts have loaded.
        $(function() {
            // ...show the app.
            require('ps')({
                'el':   '#app',
                'mine': 'http://www.mousemine.org/mousemine'
            });
        });
    </script>
</body>
</html>
```

This file does not do anything else other then load our built CSS and JS files and starts our app once the page loads. In our example, we are pointing to a `build` directory relative to the `example` directory. So let's make a symbolic link to the actual `build`:

```bash
$ ln -s ../build build/
```

Such links get preserved when version controlling using [Git](http://git-scm.com/). We are linking to our bundled builds that contain vendor dependencies too.

Then we are waiting for the page to load and call our \(future\) app with some config.

The name `ps` is being configured in the `Gruntfile.coffee` file in the `apps-c` task.

As for the config:

**`el`**

Selector where our app should be displayed.

**`mine`**

Points to an [InterMine](http://intermine.org).

The `require` call relates to [CommonJS](http://addyosmani.com/writing-modular-js/). It is one way of loading JavaScript modules. It avoids having to expose all of our functions and objects on the global \(`window`\) object and implements a way of relating between different files. For example, to load a module on the same _directory_ level as me:

```coffeescript
require './module'
```

### App index

We have asked to load an app in our `example/index.html` page, now we are going to write the backing code.

The `apps-c` task \(in `Gruntfile.coffee`\) contains the following two options:

**`name`**

How do we call our app for [CommonJS](http://addyosmani.com/writing-modular-js/) `require` call?

**`main`**

Contains a path \(an index\) that will be called when we actually call the `require` function.

We have specified that our app index lives in `src/app.coffee`, so let's create this file:

```coffeescript
render  = require './modules/render'
query   = require './modules/query'
imjs    = require './modules/imjs'
state   = require './modules/state'

layout  = require './templates/layout'

components = [
    'alert'
    'search'
    'table'
]

module.exports = (opts) ->
    # Load the components.
    ( require "./components/#{name}" for name in components )

    # Setup the UI.
    $(opts.el).html render layout

    # Do we have mine set?
    return state.attr { 'type': 'warning', 'text': 'Mine is not set' } unless opts.mine

    # Setup the client.
    imjs.attr { 'client': new intermine.Service 'root': opts.mine }

    # Manually change the query to init the search?
    query(q) if q = opts.symbol
```

Each module \(file\) in our app needs to export some functionality. When we call `require`, we will be getting this functionality.

#### Observable

We are going to be using [canJS](http://canjs.com/) which gives us objects that can be _observed_. What this means is that when their values change, others listening to these changes will be notified. When we want to [change](http://canjs.com/docs/can.Map.prototype.attr.html) their value we call `attr` function on them. One such example is where we setup the client. We are passing an object which is set on `imjs`,a [canMap](http://canjs.com/docs/can.Map.html). Or the line below where we set a symbol on a `query` which is a [canCompute](http://canjs.com/docs/can.compute.html). The advantage here is that whenever we set a new symbol on `query`, anyone else will be told it has changed and do something. This something means to trigger a search.

#### Components

But first, we are require some components in the memory. These are [canComponent](http://canjs.com/docs/can.Component.html) instances. They wrap some user interface functionality \(think widget\) and are tied to a DOM tag. Whenever this tag appears on the page, a component gets automatically created with the appropriate template and data. For now, let's just say these need to be loaded before we inject our first template into the page. An example of a tag:

```markup
<app-component></app-component>
```

We inject the said template, layout, on the line below. Layout will represent the HTML that is true for our app/page. It will have custom tags in it that automatically get rendered as components \(as above\).

### Layout

Let us take a look at the layout template then; in `/src/templates/layout.mustache`:

```text
<div class="row collapse">
    <div class="small-2 columns">
        <span class="prefix">Search:</span>
    </div>
    <div class="small-10 columns">
        <app-search></app-search>
    </div>
</div>

<div class="row collapse">
    <div class="small-12 columns">
        <app-alert></app-alert>
    </div>
</div>

<div class="row collapse">
    <div class="small-12 columns">
        <app-table></app-table>
    </div>
</div>
```

Our app will consist of 3 components:

**`app-search`**

A component that will represent our input search field.

**`app-alert`**

An alert message showing what state the app is in.

**`app-table`**

A table with results of our search.

### Search component

The search component will bind the `query` to our input field; in `/src/components/search.coffee`:

```coffeescript
query = require '../modules/query'

# Search form.
module.exports = can.Component.extend

    tag: 'app-search'

    template: require '../templates/search'

    scope: -> { 'query': { 'value': query } }

    events:
        'input keyup': (el, evt) ->
            if (evt.keyCode or evt.which) is 13
                query do el.val
```

To do so, we require the `query` module. It is the same module we have seen in our app index. And then, we are off using the standard [canComponent](http://canjs.com/docs/can.Component.html) notation. There is:

**`tag`**

Which is the custom DOM tag/element for this component. Again, if this tag appears on the page, this component will spring to life.

**`template`**

This is the template that will get injected into the `tag`.

**`scope`**

Ah, the magic. You can either pass in an object of key-value pairs that will be accessible within our `template`. A more interesting approach is to return a function that returns said object. Doing so will make this component listen in on any changes in the object. In our example, we are \(using slightly convoluted notation\) listening to changes to `query`, which is a [canCompute](http://canjs.com/docs/can.compute.html).

**`events`**

Makes this component listen to events in the template and then do something. The syntax is `<event>`. In our example, whenever the user has pressed \(and raised their finger\) from a key on a keyboard, we call a function. This function checks that the key was `Enter` and updates the `query`.

### Search template

The search template just outputs the current value of the query:

```text
<input type="text" placeholder="e.g. brca, gamma" value="{{ query.value }}" autofocus>
```

We are also giving this field the focus on the page so a user can just start typing.

### Query module

We have been talking about this `query` for a while, it is time to write its code; in `/src/modules/query.coffee`:

```coffeescript
pubs  = require './pubs'
imjs  = require './imjs'
state = require './state'

# The default search query.
query = can.compute ''

# Keep track of requests.
gid = 0

# Observe query changes to trigger a service search.
query.bind 'change', (ev, q) ->
    state.attr { 'type': 'info', 'text': 'Searching &hellip;' }
    id = ++gid

    imjs.search q, (err, res) ->
        # Too late?
        return if id < gid
        return state.attr { 'type': 'warning', 'Oops &hellip' } if err
        state.attr { 'type': 'success', 'text': "Found #{res.length} results" }
        pubs.replace res

module.exports = query
```

First we require some other modules:

**`pubs`**

Will represent our results collection/list.

**`imjs`**

A module doing the actual search.

**`state`**

Will be told what the state of the app is \(for alerts\).

We initialize the query to be empty using `''`. If a developer wants to pass an initial query, we have seen the relevant code in app index.

Then we have a function that listens in on our changes. Whenever query changes, this function is triggered. We use it to first say that we are starting a search. Then we actually call the `imjs` module to do the search. If all went fine, we inject the new results into the `pubs` module.

There are two things that could go wrong:

1. The search might not be successfull \(mine down, malformed query etc.\)
2. The results may arrive too late, such as when the user sees the first set of results after asking for another set of results.

Both cases are handled.

### State module

Is a [canMap](http://canjs.com/docs/can.Map.html) that keeps track of the app state; it lives in `/src/modules/state.coffee`:

```coffeescript
module.exports = new can.Map
    'type': 'info'
    'text': 'Search is ready'
```

The map has two attributes, one for a type of state we are in `[ info|success|warning ]` and the other for the actual message.

### IMJS module

This module will do the actual search on the mine. It is called imjs since it is going to be using the [imjs](https://github.com/alexkalderimis/imjs) library behind the scenes. We will find it in `/src/modules/imjs.coffee`:

```coffeescript
query =
    'select': [
        'Publication.title'
        'Publication.year'
        'Publication.journal'
        'Publication.pubMedId'
        'Publication.authors.name'
        'Publication.bioEntities.symbol'
        'Publication.bioEntities.id'
    ]
    'orderBy': [
        { 'Publication.title': 'ASC' }
    ]
    'joins': [
        'Publication.authors'
    ]

module.exports = new can.Map

    # Needs to be initialized.
    client: null

    # Search publications by bio entity symbol.
    search: (symbol, cb) ->
        return cb 'Client is not setup' unless @client

        @client.query _.extend({}, query, {
            'where': [
                {
                    'path': 'Publication.bioEntities.symbol'
                    'op':   'CONTAINS'
                    'value': symbol
                }
            ]
        }), (err, q) ->
            return cb err if err
            # Run the query.
            q.tableRows (err, res) ->
                return cb err if err

                # Re-map to a useful format.
                remap = (rows) ->
                    type = null
                    _.extend _.zipObject(_.map rows, (row) ->
                        # Add our type.
                        type = row.class if row.column is 'Publication.bioEntities.id'
                        # Tuple of column - value.
                        [
                            row.column.split('.').pop()
                            if row.rows then _.map(row.rows, remap) else row.value
                        ]
                    ), { type }

                cb null, _.map res, remap
```

At the top, we are defining the query that will be used to run the query. The format is that of an InterMine PathQuery. You can see [imjs](https://github.com/alexkalderimis/imjs) for syntax and more information. One can generate this syntax by visiting the mine in question, running a query in QueryBuilder and then choosing to export to JavaScript in the Results Table.

Our query will be looking for publications, fetching their bio entities \(genes, alleles, proteins etc.\) and authors. Authors is a separate collection mapped to a publication.

Then we are using the [canMap](http://canjs.com/docs/can.Map.html) syntax to define a `client` attribute and a `search` function. An object can have both attributes and functions defined.

We took care of initializing the `client` in app index. In that step, we were intializing the [imjs](https://github.com/alexkalderimis/imjs) library to use a specific mine, MouseMine in our case.

The search function takes two parameters, a symbol and a callback. The first is the search symbol coming from `query` module, the second, a function that will be called when we have errors or results. Hopefully the latter.

We are then using [imjs](https://github.com/alexkalderimis/imjs) syntax to extend our `query` with a constraint on a bio entity symbol, matching our symbol and returning `tableRows`.

The `remap` function is just formatting the results into a format that is useful to us. In our case, we want to have the following data structure which is conducive to being traversed in a [Mustache](http://mustache.github.io/) template:

```javascript
[
    {
        "title": "Distinct negative regulatory mechanisms involved in the repression of human embryonic epsilon- and fetal G gamma-globin genes in transgenic mice.",
        "year": 1994,
        "journal": "J Biol Chem",
        "pubMedId": "7806539",
        "authors": [
            {
                "name": "Perez-Stable C",
                "type": null
            }
        ],
        "symbol": "Tg(Ggamma-T)15Cps",
        "id": 1678446,
        "type": "Transgene"
    }
]
```

We are extracting the type of the bio entity matched and creating a nested `authors` field.

Once we have the new data we are calling back using the `cb` function, it is customary to specify an error as the first argument into said function. Since all is well, we are passing a `null` value.

### Publications list

We still have one module to cover. This is the `pubs` we have referred to elsewhere; in `/src/modules/pubs.coffee`:

```coffeescript
module.exports = new can.List []
```

We are using the [canList](http://canjs.com/docs/can.List.html) object to store an observable array of values. To be honest, we don't need to use an observable object here, but you may want to, if you are going to be changing values in the array rather than replacing the whole thing outright.

### Alert component

When doing our searches we have decided to keep track of the state of the application. Are we searching? Do we have errors? That sort of thing.

We already wrote a module, a [canMap](http://canjs.com/docs/can.Map.html), to represent the data structure. Now we just need to write the [canComponent](http://canjs.com/docs/can.Component.html) for it.

```coffeescript
state = require '../modules/state'

# An alert.
module.exports = can.Component.extend

    tag: 'app-alert'

    template: require '../templates/alert'

    scope: -> state
```

What it does is that it shows up when `app-alert` appears and then displays a template and observes when `state` changes.

### Alert template

Each component needs a template. The alert one will look like this:

```text
<div class="alert-box {{ type }}">
    {{{ text }}}.
</div>
```

What we are saying here is to display a [Foundation](http://foundation.zurb.com/) alert box with a custom type and a text. We use `{{{ }}}` to display the text which allows us to use HTML in the `text` string and have it unescaped.

### Results table component

Now that we are searching for and updating `pubs` with new data, we have to observe them in a [canComponent](http://canjs.com/docs/can.Component.html) and render them. It lives in `/src/components/table.coffee`:

```coffeescript
pubs = require '../modules/pubs'

# Table of publication results.
module.exports = can.Component.extend

    tag: 'app-table'

    template: require '../templates/table'

    scope: -> { pubs }
```

This will make an array of publications available to us in a template under the `pubs` key.

### Results table template

As for the template that displays the results; in `/src/templates/table.mustache`:

```text
{{ #if pubs.length }}
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Journal</th>
            <th>Year</th>
            <th>Match</th>
        </tr>
    </thead>
    <tbody>
    {{ #pubs }}
        <tr>
            <td class="title">
                <a target="_{{ pubMedId }}" href="http://www.ncbi.nlm.nih.gov/pubmed/{{ pubMedId }}">{{ title }}</a>
            </td>
            <td>
            {{ #authors }}
                <span class="author">{{ name }}</span>
            {{ /authors }}
            </td>
            <td>{{ journal }}</td>
            <td>{{ year }}</td>
            <td class="nowrap">
                <a target="_{{ id }}" href="http://www.mousemine.org/mousemine/report.do?id={{ id }}">
                    {{ symbol }}
                </a>
                <span class="label">{{ type }}</span>
            </td>
        </tr>
    {{ /pubs }}
    </tbody>
</table>
{{ /if }}
```

Firstly, we are checking if we actually have any results to speak of. If so, we render a table &lt;tr/&gt; element for each publication.

We can see that `{{ #pubs }}` and `{{ #authors }}` both represent a for loop.

### Style

We are going to wrap up by writing a stylesheet. For this, we are going to use [Stylus](http://learnboost.github.io/stylus/); in `/src/styles/app.styl`:

```text
@import 'nib'

body
    padding: 20px

table
    width: 100%

    td
        .author
            &:not(:last-child)
                &:after
                    content: ", "
                    display: inline-block

        .label
            padding: 0 4px
            line-height: 16px

        &.title
            width: 40%

        &.nowrap
            white-space: nowrap
```

Stylus allows us to write nested rules, such as when we want to select a table cell, `<td/>` in a `<table/>`.

At the top, we can see a reference to [nib](http://visionmedia.github.io/nib/). This will make any of our rules to be generated with browser vendor prefixed, where appropriate and allows us to use shorthand notation for various oft repeated rules.

## Fin

This concludes our application. Running a static web server to view the `/example` folder, we are presented with a page that displays our app. Typing a symbol into the input box and pressing `Enter` launches a request against MouseMine and if successfull, shows us results.

## Appendix

### pomme.js

What we have not covered is the case when we want to embed our app beside other apps on a page. If that were the case, all our CSS rules would start conflicting with other rules on the page. Not to speak of canComponents that may pop up in all kinds of places if we are using the same tags across different apps.

One way to deal with this issue is to make use of the [pommejs](https://github.com/radekstepan/pomme.js) library. What it does is create a sandbox \(using an `<iframe/>`\) which is isolated from anything else on the page. One would load an app inside one such sandbox and not have to worry about library collusion.

For example, we would create a pure [pommejs](https://github.com/radekstepan/pomme.js) _build_ in [Grunt](http://gruntjs.com/). In `Gruntfile.coffee`, add the following task:

```coffeescript
copy:
    pomme:
        src: [ 'bower_components/pomme.js/build/app.bundle.js' ]
        dest: 'build/js/pomme.bundle.js'
        expand: yes
        flatten: yes

grunt.loadNpmTasks('grunt-contrib-copy')
```

This requires you to have the following task installed:

```bash
$ npm install grunt-contrib-copy
```

In order to download the library itself using [Bower](http://bower.io/):

```bash
$ bower install pomme.js
```

Now, we are copying a bundled version of [pommejs](https://github.com/radekstepan/pomme.js) into our build directory.

To create this sandbox, we are going to require [pommejs](https://github.com/radekstepan/pomme.js) instead; in `/example/index.html`:

```markup
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Publication Search</title>

    <script src="build/js/pomme.bundle.js"></script>
</head>
<body>
    <div id="app"></div>
    <script>
        // Once scripts have loaded.
        $(function() {
            var Pomme = require('pomme.js');
            var channel = new Pomme({
                'target': '#app',
                'template': function() {
                    return '<MY TEMPLATE HERE>'
                }
            });
        });
    </script>
</body>
</html>
```

In the section above, we can see a placeholder for a template. In that place we need to return a string which will correspond to the html that needs to be executed within the sandbox. It should look something like this \(but as a string!\):

```markup
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Publication Search</title>

    <link href="build/css/ps.bundle.css" media="all" rel="stylesheet" type="text/css" />
    <script src="build/js/ps.bundle.js"></script>
</head>
<body>
    <div id="app"></div>
    <script>
        // Once scripts have loaded.
        $(function() {
            // ...show the app.
            require('ps')({
                'el':   '#app',
                'mine': 'http://www.mousemine.org/mousemine'
            });
        });
    </script>
</body>
</html>
```

So our example `index.html` has moved into a string and is being executed inside an iframe.

Refer to the [pommejs](https://github.com/radekstepan/pomme.js) documentation if you'd like to know how to open a two way communication channel between the parent page and the iframe window.


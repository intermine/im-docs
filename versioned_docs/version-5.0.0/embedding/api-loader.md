---
title: InterMine JavaScript API Loader
---

**Note**
See also [GitHub repo](https://github.com/intermine/intermine-api-loader) for source code.

**Note**
If you are loading JavaScript libraries on a page, you should use a loader \(count of 1\). Why not use ours?

### Purpose

To simplify loading of CSS and JS libraries. The API Loader automatically works out the order the libraries should be loaded based on dependencies between them. It also skips libraries that already exist on a page or that pass a specific check.

### How to use

**Note**
If you are passing a string or an array as the first parameter into the library, these are @deprecated but still working for backwards compatibility.

First you require the API Loader. You can, for example, use the following shorthand notation that always points to the latest version.

```markup
<script src="http://cdn.intermine.org/api"></script>
```

Now, you can use the loader by passing in an object that looks for example like so:

```javascript
intermine.load({
  'js': {
    'JSON': {
      'path': 'http://cdn.intermine.org/js/json3/3.2.2/json3.min.js'
    },
    'setImmediate': {
      'path': 'http://cdn.intermine.org/js/setImmediate/1.0.1/setImmediate.min.js'
    },
    'example': {
      'path': 'http://',
      'test': function() {
        return true;
      }
    },
    'async': {
      'path': 'http://cdn.intermine.org/js/async/0.2.6/async.min.js',
      'depends': ['setImmediate']
    },
    'jQuery': {
      'path': 'http://cdn.intermine.org/js/jquery/1.8.2/jquery.min.js',
      'depends': ['JSON']
    },
    '_': {
      'path': 'http://cdn.intermine.org/js/underscore.js/1.3.3/underscore-min.js',
      'depends': ['JSON']
    },
    'Backbone': {
      'path': 'http://cdn.intermine.org/js/backbone.js/0.9.2/backbone-min.js',
      'depends': ['jQuery', '_']
    }
  }
}, function(err) {
  // your libraries have loaded
});
```

The object works like so:

1. You pass in either a `js` or a `css` object based on whether you are requesting JavaScript or CSS libraries \(or both\).
2. The key inside the object, like `jQuery` then refers to your library. If this key is on a `window` object \(as is the case with jQuery library\), we won't load the library since it already exists.
3. If you do not like the previous check and want something more robust, pass a sync function under the `test` key. Return `true` if a library should NOT be loaded.
4. `path` represents the URL pointing to the library.
5. Use `depends` key, passing an array if a library depends on other libraries in your list. In the example, you can see that `Backbone` depends on `jQuery` and `_` \(underscore.js\). The appropriate loading order will be worked out from this.
6. Check the `err` variable passed in the callback function \(second parameter\).

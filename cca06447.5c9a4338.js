(window.webpackJsonp=window.webpackJsonp||[]).push([[518],{589:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return l}));var o=r(3),n=r(7),a=(r(0),r(707)),s={title:"ObjectStore Summary"},i={unversionedId:"database/database-building/post-processing/objectstore-summary-properties",id:"version-5.0.0/database/database-building/post-processing/objectstore-summary-properties",isDocsHomePage:!1,title:"ObjectStore Summary",description:'There are several processes run after the data loading is completed, one of which, the objectstore summarisation. This step counts the number of objects of particular classes, identifies any empty references/collections and collects values to appear in dropdowns in the query builder and templates. The summarisation process also constructs the indexes needed for "type-ahead" autocompletion, this is configured by adding entries to the objectstoresummary.config.properties.',source:"@site/versioned_docs/version-5.0.0/database/database-building/post-processing/objectstore-summary-properties.md",slug:"/database/database-building/post-processing/objectstore-summary-properties",permalink:"/im-docs/docs/database/database-building/post-processing/objectstore-summary-properties",editUrl:"https://github.com/intermine/im-docs/edit/master/versioned_docs/version-5.0.0/database/database-building/post-processing/objectstore-summary-properties.md",version:"5.0.0"},c=[{value:"Dropdowns",id:"dropdowns",children:[]},{value:"Auto-completion",id:"auto-completion",children:[]}],p={toc:c};function l(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,'There are several processes run after the data loading is completed, one of which, the objectstore summarisation. This step counts the number of objects of particular classes, identifies any empty references/collections and collects values to appear in dropdowns in the query builder and templates. The summarisation process also constructs the indexes needed for "type-ahead" autocompletion, this is configured by adding entries to the objectstoresummary.config.properties.'),Object(a.b)("h3",{id:"dropdowns"},"Dropdowns"),Object(a.b)("p",null,"Some fields have only a few different values, and are represented as dropdowns on forms so that users may see all possible values. You can set the maximum number of values to display, the default is 200."),Object(a.b)("p",null,"If a field is never going to have less than 200 unique values, you can set the field to be ignored. Create a space-delimited list here and those fields will be skipped:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-text"}),"# in MINE_NAME/dbmodel/resources/objectstoresummary.config.properties\nignore.counts=org.intermine.model.bio.GOAnnotation.withText org.intermine.model.bio.Location.subject\n")),Object(a.b)("h3",{id:"auto-completion"},"Auto-completion"),Object(a.b)("p",null,"Fields in template queries and the QueryBuilder can have type-ahead autocompletion to assist in selecting valid terms. As you start to type, possible matches are fetched from the database; the text you have typed can match anywhere within the terms and multiple words fetched. This is particularly useful for ontology terms or protein domain names."),Object(a.b)("p",null,"You can set up autocompletion by completing these steps:"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Add all fields you want to be autocompleted to this file, like so:"),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-text"}),"# in MINE_NAME/dbmodel/resources/objectstoresummary.config.properties\norg.intermine.model.bio.Disease.autocomplete = description\n"))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Add the postprocess to your MINE","_","NAME/project.xml file."),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-markup"}),'<post-processing>    \n  <post-process name="create-autocomplete-index"/>\n</post-processing>\n'))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"In the /postprocess directory, run this command:"),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),"~/git/flymine $ ./gradlew postprocess -Pprocess=create-autocomplete-index --stacktrace\n")))),Object(a.b)("p",null,"This process will add all fields set in this properties file to the autocompletion index."),Object(a.b)("p",null,"Now, when you release your webapp, fields you've configured will suggest similar terms as users are typing in the QueryBuilder or the template form."))}l.isMDXComponent=!0},707:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return b}));var o=r(0),n=r.n(o);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=n.a.createContext({}),l=function(e){var t=n.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return n.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},m=n.a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(r),m=o,b=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return r?n.a.createElement(b,i(i({ref:t},p),{},{components:r})):n.a.createElement(b,i({ref:t},p))}));function b(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,s=new Array(a);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var p=2;p<a;p++)s[p]=r[p];return n.a.createElement.apply(null,s)}return n.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);
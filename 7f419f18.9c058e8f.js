(window.webpackJsonp=window.webpackJsonp||[]).push([[319],{389:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return s}));var r=n(3),o=n(7),a=(n(0),n(707)),i={title:"Home page"},c={unversionedId:"webapp/homepage/index",id:"version-5.0.0/webapp/homepage/index",isDocsHomePage:!1,title:"Home page",description:"Note",source:"@site/versioned_docs/version-5.0.0/webapp/homepage/index.md",slug:"/webapp/homepage/index",permalink:"/im-docs/docs/webapp/homepage/index",editUrl:"https://github.com/intermine/im-docs/edit/master/versioned_docs/version-5.0.0/webapp/homepage/index.md",version:"5.0.0",sidebar:"version-5.0.0/someSidebar",previous:{title:"Guide to Customising BlueGenes",permalink:"/im-docs/docs/webapp/blue-genes/index"},next:{title:"Permanent URLs",permalink:"/im-docs/docs/webapp/report-page/permanentURL"}},p=[{value:"RSS/Blog Feed",id:"rssblog-feed",children:[]},{value:"Credits",id:"credits",children:[]}],l={toc:p};function s(e){var t=e.components,i=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,i,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Note"),"\nThis text describes how to customize the homepage of your mine."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Note"),"\nSee also ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/im-docs/docs/webapp/layout/index"}),"General Layout")," for whole app look & feel"),Object(a.b)("h2",{id:"rssblog-feed"},"RSS/Blog Feed"),Object(a.b)("p",null,"To add the RSS feed at the bottom right corner of the page, add the following to your MINE properties file ","(","in ",Object(a.b)("inlineCode",{parentName:"p"},".intermine")," file",")",":"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-text"}),"project.rss = http://<your_blog>/<your_feed_url>\n")),Object(a.b)("p",null,"eg:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-text"}),"project.rss=http://blog.flymine.org/?feed=rss2\n")),Object(a.b)("p",null,"Two latest entries will be shown in the box. If you want to provide a link underneath the entry listing to your blog, add the following to the config file:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-text"}),"project.news = http://<your_blog>\n")),Object(a.b)("h2",{id:"credits"},"Credits"),Object(a.b)("p",null,"By default InterMine credit is added to the bottome of the page."),Object(a.b)("p",null,Object(a.b)("img",{alt:"image",src:n(804).default})),Object(a.b)("p",null,"To add additional funders, set the following in the ",Object(a.b)("inlineCode",{parentName:"p"},"web.properties")," file:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-text"}),"project.credit.1.image=<the_funder_logo_url>\nproject.credit.1.url=<the_funder_url>\n")),Object(a.b)("p",null,"eg:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-text"}),"project.credit.1.image=https://www.humanmine.org/humanmine/images/wellcome-logo-black.png\nproject.credit.1.url=https://wellcome.ac.uk/\n")))}s.isMDXComponent=!0},707:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),s=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=s(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),b=s(n),d=r,m=b["".concat(i,".").concat(d)]||b[d]||u[d]||a;return n?o.a.createElement(m,c(c({ref:t},l),{},{components:n})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},804:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/intermine_funder-461c5ea749e739cefd2739c7978beb75.jpg"}}]);
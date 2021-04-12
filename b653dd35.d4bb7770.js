(window.webpackJsonp=window.webpackJsonp||[]).push([[459],{529:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return o})),n.d(t,"default",(function(){return s}));var a=n(3),r=n(7),p=(n(0),n(703)),i={title:"Help"},l={unversionedId:"webapp/help/index",id:"webapp/help/index",isDocsHomePage:!1,title:"Help",description:"This page lists how you can update the help sections of your InterMine.",source:"@site/docs/webapp/help/index.md",slug:"/webapp/help/index",permalink:"/im-docs/docs/next/webapp/help/index",editUrl:"https://github.com/intermine/im-docs/edit/master/docs/webapp/help/index.md",version:"current"},o=[{value:"Top Links",id:"top-links",children:[]},{value:"Take a tour link",id:"take-a-tour-link",children:[]},{value:"Contextual help, the <code>?</code> on each page",id:"contextual-help-the--on-each-page",children:[{value:"Set the URL in your properties file",id:"set-the-url-in-your-properties-file",children:[]},{value:"Set the context",id:"set-the-context",children:[]}]},{value:"Data definitions",id:"data-definitions",children:[]}],c={toc:o};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(p.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(p.b)("p",null,"This page lists how you can update the help sections of your InterMine."),Object(p.b)("h2",{id:"top-links"},"Top Links"),Object(p.b)("p",null,"To add help links to the top of your website, add an entry to ",Object(p.b)("inlineCode",{parentName:"p"},"web.properties")," listing the links:"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"header.links=link1, link2\n")),Object(p.b)("p",null,"Then specify the URLs:"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"header.links.link1=http://www.mysite.com/link1\nheader.links.link2=http://www.mysite.com/link2\n")),Object(p.b)("p",null,"For example, see FlyMine's web.properties file:"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"header.links=help,FAQ,about,cite,software\nheader.links.FAQ=http://trac.flymine.org/wiki/FlyMineFAQ\nheader.links.about=http://blog.flymine.org/?page_id=35\nheader.links.cite=http://blog.flymine.org/?page_id=37\nheader.links.help=http://blog.flymine.org/?page_id=45\nheader.links.software=http://blog.flymine.org/?page_id=39\n")),Object(p.b)("h2",{id:"take-a-tour-link"},"Take a tour link"),Object(p.b)("p",null,"The tour link is set in ",Object(p.b)("inlineCode",{parentName:"p"},"headMenu.jsp")," as:"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"<project.helpLocation>/tour/start\n")),Object(p.b)("p",null,"Set ",Object(p.b)("inlineCode",{parentName:"p"},"project.helpLocation")," property in your mine.properties file. If you don't have help pages set up, link to FlyMine's pages:"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"project.helpLocation=http://www.flymine.org/help\n")),Object(p.b)("h2",{id:"contextual-help-the--on-each-page"},"Contextual help, the ",Object(p.b)("inlineCode",{parentName:"h2"},"?")," on each page"),Object(p.b)("h3",{id:"set-the-url-in-your-properties-file"},"Set the URL in your properties file"),Object(p.b)("p",null,"On each page is a ? that links to help pages. Specify the main URL that this question mark should link to by setting the ",Object(p.b)("inlineCode",{parentName:"p"},"project.helpLocation")," property in your mine.properties file."),Object(p.b)("p",null,"If you don't have help pages set up, link to FlyMine's pages:"),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"project.helpLocation=http://www.flymine.org/help\n")),Object(p.b)("h3",{id:"set-the-context"},"Set the context"),Object(p.b)("ol",null,Object(p.b)("li",{parentName:"ol"},Object(p.b)("p",{parentName:"li"},"If the user is on a webpage defined in the properties file, then when they click the help link they will be forwarded to the help section for the page they were viewing.")),Object(p.b)("li",{parentName:"ol"},Object(p.b)("p",{parentName:"li"},"If the page they are on is not specified in the properties file, they will be forwarded to the first page of the help document.")),Object(p.b)("li",{parentName:"ol"},Object(p.b)("p",{parentName:"li"},"The context is determined by parsing the URL and taking the name of the current webpage, minus the ",Object(p.b)("inlineCode",{parentName:"p"},".do"),". For example, go to FlyMine and click on the 'templates' tab, this is the URL:"),Object(p.b)("p",{parentName:"li"},Object(p.b)("a",Object(a.a)({parentName:"p"},{href:"http://www.flymine.org/query/templates.do"}),"http://www.flymine.org/query/templates.do"),'. The parsed name of that webpage is "templates".')),Object(p.b)("li",{parentName:"ol"},Object(p.b)("p",{parentName:"li"},"Below are the mappings from parsed webpage name to anchor names on"),Object(p.b)("p",{parentName:"li"},"the help page."))),Object(p.b)("pre",null,Object(p.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"help.page.<parsed webpage name> = <anchor in help.html file>\n\nhelp.page.begin=begin\nhelp.page.templates=templates\nhelp.page.bag=lists\nhelp.page.bag.upload=lists:upload\nhelp.page.bag.view=lists:view\nhelp.page.customQuery=customQuery\nhelp.page.mymine.lists=mymine:lists\nhelp.page.mymine.history=mymine:queryHistory\nhelp.page.mymine.saved=mymine:savedQueries\nhelp.page.mymine.templates=mymine:savedTemplates\nhelp.page.mymine.password=mymine:changePassword\nhelp.page.dataCategories=data\nhelp.page.objectDetails=reportPage\nhelp.page.template=template\nhelp.page.results=results\nhelp.page.bagDetails=listAnalysis\nhelp.page.bagUploadConfirm=buildList\nhelp.page.query=query\nhelp.page.importQueries=importQueries\nhelp.page.importTemplates=importTemplates\nhelp.page.tree=tree\nhelp.page.aspect=dataCategory\n")),Object(p.b)("p",null,"Your mine's web.properties file is merged with this web.properties file, so the entries you add to web.properties will overwrite the values listed above."),Object(p.b)("h2",{id:"data-definitions"},"Data definitions"),Object(p.b)("p",null,"Update these in the classDescriptions.properties file."))}s.isMDXComponent=!0},703:function(e,t,n){"use strict";n.d(t,"a",(function(){return h})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},p=Object.keys(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),s=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},h=function(e){var t=s(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,p=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),h=s(n),u=a,d=h["".concat(i,".").concat(u)]||h[u]||b[u]||p;return n?r.a.createElement(d,l(l({ref:t},c),{},{components:n})):r.a.createElement(d,l({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=n.length,i=new Array(p);i[0]=u;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<p;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);
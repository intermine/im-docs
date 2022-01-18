(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{197:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),i=(n(0),n(545)),b={title:"General Layout"},c={unversionedId:"webapp/layout/index",id:"version-5.0.0/webapp/layout/index",isDocsHomePage:!1,title:"General Layout",description:"This page describes how to customise the look & feel of the whole InterMine webapp.",source:"@site/versioned_docs/version-5.0.0/webapp/layout/index.md",slug:"/webapp/layout/index",permalink:"/im-docs/docs/webapp/layout/index",editUrl:"https://github.com/intermine/im-docs/edit/master/versioned_docs/version-5.0.0/webapp/layout/index.md",version:"5.0.0",sidebar:"version-5.0.0/someSidebar",previous:{title:"BlueGenes",permalink:"/im-docs/docs/webapp/bluegenes/index"},next:{title:"Home page",permalink:"/im-docs/docs/webapp/homepage/index"}},l=[{value:"Logo",id:"logo",children:[]},{value:"Intro",id:"intro",children:[]},{value:"Branding",id:"branding",children:[]},{value:"Favicon",id:"favicon",children:[]},{value:"Footer",id:"footer",children:[]}],o={toc:l};function p(e){var t=e.components,b=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},o,b,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"This page describes how to customise the look & feel of the whole InterMine webapp."),Object(i.b)("h3",{id:"logo"},"Logo"),Object(i.b)("p",null,"The logo is independent from any themes and is located here ",Object(i.b)("inlineCode",{parentName:"p"},"MINE_NAME/webapp/src/main/webapp/model/images/logo.png"),". The recommended size is 45px x 43px. An example:"),Object(i.b)("p",null,Object(i.b)("img",{alt:"FlyMine&#39;s logo",src:n(561).default})),Object(i.b)("h3",{id:"intro"},"Intro"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},Object(i.b)("inlineCode",{parentName:"strong"},"project.title"))),Object(i.b)("p",null,"in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/im-docs/docs/web-services/intermine-properties#web-application-name-and-location"}),"Web application name and location"),", configure the name of the mine"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},Object(i.b)("inlineCode",{parentName:"strong"},"project.releaseVersion"))),Object(i.b)("p",null,"in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/im-docs/docs/web-services/intermine-properties#web-application-name-and-location"}),"Web application name and location"),", configure the version of the mine"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},Object(i.b)("inlineCode",{parentName:"strong"},"project.subTitle"))),Object(i.b)("p",null,"in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/im-docs/docs/web-services/intermine-properties#web-application-name-and-location"}),"Web application name and location"),", configure the subtitle showing in the header"),Object(i.b)("p",null,Object(i.b)("img",{alt:"FlyMine&#39;s intro text",src:n(562).default})),Object(i.b)("h3",{id:"branding"},"Branding"),Object(i.b)("p",null,"These parameters are returned by the branding API end point, and are used by the new user interface BlueGenes and external applications, e.g. the InterMine iOS app, the InterMine registry and the InterMine R client.\nAdd the the following properties to your ",Object(i.b)("inlineCode",{parentName:"p"},"web.properties"),":"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:"left"})),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:"left"})))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:"left"}),"branding.images.logo"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:"left"}),"The image's URL")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:"left"}),"branding.colors.header.main"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:"left"}),"Main colour for your mine, defaults to grey, ","#","595455")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:"left"}),"branding.colors.header.text"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:"left"}),"Text colour for your mine, defaults to white, ","#","fff")))),Object(i.b)("p",null,"As example, the FlyMine's configuration:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"branding.images.logo = https://www.flymine.org/flymine/model/images/logo.png\nbranding.colors.header.main = #5c0075\nbranding.colors.header.text = #fff\n")),Object(i.b)("p",null,Object(i.b)("img",{alt:"FlyMine&#39;s layout",src:n(553).default})),Object(i.b)("h3",{id:"favicon"},"Favicon"),Object(i.b)("p",null,"The favicon is a small icon displayed beside the tab or window title in the web browser."),Object(i.b)("p",null,"The favicon itself should be located in ",Object(i.b)("inlineCode",{parentName:"p"},"<your_mine>/webapp/src/main/webapp/model/images/favicon.ico"),", and BlueGenes will use it if it's present for the default mine (otherwise it will fallback to the InterMine logo)."),Object(i.b)("p",null,"You can also configure a favicon for BlueGenes (useful if you have one webapp serving multiple mines) by adding it as a ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"../bluegenes/index#resources"}),"resource")," under the ",Object(i.b)("inlineCode",{parentName:"p"},"resources/public/favicon.ico")," path."),Object(i.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"tip")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"If you want to generate a favicon from an image, use this ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"http://tools.dynamicdrive.com/favicon/"}),"Dynamic Drive")," tool."))),Object(i.b)("h3",{id:"footer"},"Footer"),Object(i.b)("p",null,"The following can be configured in the ",Object(i.b)("inlineCode",{parentName:"p"},"web.properties")," file."),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Property"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.url.github"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Display ",Object(i.b)("em",{parentName:"td"},"GitHub icon")," linking to URL"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Hidden")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.supportEmail"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Display ",Object(i.b)("em",{parentName:"td"},"email icon")," linking to email address"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Hidden")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.news"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Display ",Object(i.b)("em",{parentName:"td"},"blog icon")," linking to URL"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Hidden")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.url.twitter"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Display ",Object(i.b)("em",{parentName:"td"},"Twitter icon")," linking to URL"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Hidden")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.url.discord"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Display ",Object(i.b)("em",{parentName:"td"},"Discord icon")," linking to URL"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Hidden")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.citation"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"URL used for ",Object(i.b)("strong",{parentName:"td"},"CITE <MINENAME",">")," link"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(a.a)({parentName:"td"},{href:"http://intermine.org/publications/"}),"http://intermine.org/publications/"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.url.aboutUs"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"URL used for ",Object(i.b)("strong",{parentName:"td"},"ABOUT US")," link"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(a.a)({parentName:"td"},{href:"http://intermine.org/about-intermine/"}),"http://intermine.org/about-intermine/"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"project.url.privacyPolicy"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"URL used for ",Object(i.b)("strong",{parentName:"td"},"PRIVACY POLICY")," link"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(a.a)({parentName:"td"},{href:"http://intermine.org/privacy-policy/"}),"http://intermine.org/privacy-policy/"))))))}p.isMDXComponent=!0},545:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=r.a.createContext({}),p=function(e){var t=r.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=p(e.components);return r.a.createElement(o.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,b=e.parentName,o=l(e,["components","mdxType","originalType","parentName"]),d=p(n),u=a,m=d["".concat(b,".").concat(u)]||d[u]||s[u]||i;return n?r.a.createElement(m,c(c({ref:t},o),{},{components:n})):r.a.createElement(m,c({ref:t},o))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,b=new Array(i);b[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,b[1]=c;for(var o=2;o<i;o++)b[o]=n[o];return r.a.createElement.apply(null,b)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},553:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/branding-4e78625feef8aad4f079d0ef4ccd1dd7.png"},561:function(e,t,n){"use strict";n.r(t),t.default="data:image/png;base64,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"},562:function(e,t,n){"use strict";n.r(t),t.default="data:image/png;base64,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"}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{240:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return s}));var a=n(3),r=n(7),i=(n(0),n(545)),o={title:"BlueGenes"},c={unversionedId:"webapp/bluegenes/index",id:"webapp/bluegenes/index",isDocsHomePage:!1,title:"BlueGenes",description:"BlueGenes is a new user interface to InterMine replacing the JSP-based webapp included with the InterMine server. It runs as its own service and utilises the InterMine web service API.",source:"@site/docs/webapp/bluegenes/index.md",slug:"/webapp/bluegenes/index",permalink:"/im-docs/docs/next/webapp/bluegenes/index",editUrl:"https://github.com/intermine/im-docs/edit/master/docs/webapp/bluegenes/index.md",version:"current",sidebar:"someSidebar",previous:{title:"Useful ObjectStore properties",permalink:"/im-docs/docs/next/database/performance/configuration"},next:{title:"General Layout",permalink:"/im-docs/docs/next/webapp/layout/index"}},b=[{value:"Running BlueGenes",id:"running-bluegenes",children:[]},{value:"Configuration",id:"configuration",children:[{value:"Proxy requests to InterMine web service paths",id:"proxy-requests-to-intermine-web-service-paths",children:[]},{value:"Additional mines",id:"additional-mines",children:[]},{value:"Resources",id:"resources",children:[]}]}],l={toc:b};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"BlueGenes is a new user interface to InterMine replacing the JSP-based webapp included with the InterMine server. It runs as its own service and utilises the InterMine web service API."),Object(i.b)("h2",{id:"running-bluegenes"},"Running BlueGenes"),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"This is a guide to running BlueGenes in a production environment. If you wish to simply try it out, ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"../../system-requirements/software/gradle/index#trying-out-bluegenes"}),"click here")," to see how to start it from Gradle."))),Object(i.b)("p",null,"The recommended way to run BlueGenes in production is by using ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04#step-1-%E2%80%94-installing-docker"}),"Docker"),". On every release, a prebuilt image is pushed to ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://hub.docker.com/r/intermine/bluegenes/tags"}),"dockerhub"),". The latest version can be downloaded by doing a pull:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"docker pull intermine/bluegenes:latest\n")),Object(i.b)("p",null,"You should define the environment of your InterMine by creating a ",Object(i.b)("inlineCode",{parentName:"p"},"bluegenes.env")," file."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"BLUEGENES_DEFAULT_SERVICE_ROOT=https://mymine.org/mymine\nBLUEGENES_DEFAULT_MINE_NAME=MyMine\nBLUEGENES_DEFAULT_NAMESPACE=mymine\n")),Object(i.b)("p",null,"These are the essentials. For more configuration options, see ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"#configuration"}),"Configuration"),"."),Object(i.b)("p",null,"You will want to keep your ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"../tool-api/overview#tools-folder-and-config"}),"tools folder")," outside the container, so that your existing tools will be kept when updating BlueGenes. To do this, run ",Object(i.b)("inlineCode",{parentName:"p"},"mkdir tools")," to create a folder we'll use as a docker bind mount. Then start the docker container with the following command:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'docker run -p 5000:5000 --env-file bluegenes.env -v "$(pwd)"/tools:/tools -d --restart unless-stopped intermine/bluegenes\n')),Object(i.b)("p",null,"You should be able to access BlueGenes from ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"http://localhost:5000"}),"http://localhost:5000"),". To make it publicly accessible, you can point a reverse proxy to this port, or use a different port on the host (e.g. ",Object(i.b)("inlineCode",{parentName:"p"},"-p 80:5000"),")."),Object(i.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"Essential docker commands")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("ul",{parentName:"div"},Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docker ps -a")," - List all containers"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docker logs <container>")," - Print logs of a container"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docker stop <container>")," - Stop a container"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docker rm <container>")," - Remove a container"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"docker images")," - List images available locally")))),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Environment variable"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"SERVER_PORT"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Port to be used by BlueGenes web server"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"5000")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"LOGGING_LEVEL"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Minimum level for logging"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"info")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"GOOGLE_ANALYTICS"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Google Analytics tracking ID"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"nil")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"BLUEGENES_TOOL_PATH"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Directory on server where BlueGenes tools are installed"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"./tools")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"BLUEGENES_DEPLOY_PATH"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Custom URL path to host BlueGenes. Must start with ",Object(i.b)("inlineCode",{parentName:"td"},"/")," and ",Object(i.b)("strong",{parentName:"td"},"not")," end with ",Object(i.b)("inlineCode",{parentName:"td"},"/"),", e.g. ",Object(i.b)("inlineCode",{parentName:"td"},"/bluegenes"),". If you wish to host at root, set to ",Object(i.b)("inlineCode",{parentName:"td"},"nil"),"."),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"nil")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"BLUEGENES_BACKEND_SERVICE_ROOT"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Override service root for backend API requests (usually an internal address)"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"nil")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"BLUEGENES_DEFAULT_SERVICE_ROOT"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Default InterMine service to run HTTP requests against"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),Object(i.b)("a",Object(a.a)({parentName:"td"},{href:"https://www.flymine.org/flymine"}),"https://www.flymine.org/flymine"))),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"BLUEGENES_DEFAULT_MINE_NAME"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Mine name to display for default mine"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"FlyMine")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"BLUEGENES_DEFAULT_NAMESPACE"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Namespace of the default mine"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"flymine")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"BLUEGENES_ADDITIONAL_MINES"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Additional mines managed by this BlueGenes instance ",Object(i.b)("a",Object(a.a)({parentName:"td"},{href:"#additional-mines"}),"(more info)")),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"[]")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"HIDE_REGISTRY_MINES"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Disable acquiring and displaying mines from the public InterMine registry"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"false")))),Object(i.b)("h3",{id:"proxy-requests-to-intermine-web-service-paths"},"Proxy requests to InterMine web service paths"),Object(i.b)("p",null,"This is required if you want to host the InterMine web services on the same address as BlueGenes. You will need to configure the following reverse proxy rules, replacing ",Object(i.b)("inlineCode",{parentName:"p"},"yourmine")," with the deploy path of your mine:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"~ ^/([A-z0-9\\-]+\\.(xml|txt))$ -> /var/www/yourmine/$1\n/ -> bluegenes-server:5000/\n/yourmine/service -> tomcat-server:8080/yourmine/service\n/yourmine/model -> tomcat-server:8080/yourmine/model\n/yourmine/portal.do -> tomcat-server:8080/yourmine/portal.do\n/yourmine/run.do -> tomcat-server:8080/yourmine/run.do\n/query -> tomcat-server:8080/yourmine\n")),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},Object(i.b)("inlineCode",{parentName:"p"},"/query")," is required for ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/4.0.0/webapp/linking-in/index"}),"linking in to the old webapp"),"."))),Object(i.b)("h3",{id:"additional-mines"},"Additional mines"),Object(i.b)("p",null,"BlueGenes allows you to quickly switch between mines using a dropdown in the navbar. This will display mines from the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"http://registry.intermine.org/"}),"InterMine Registry")," (unless ",Object(i.b)("inlineCode",{parentName:"p"},"HIDE_REGISTRY_MINES")," is set) but you can also specify your own mines to be shown as a distinct group, usually for other mines of your organisation. This allows you to have a ",Object(i.b)("strong",{parentName:"p"},"single BlueGenes server work as a front end to multiple mines"),", without having to run a separate BlueGenes server for each mine in your organisation."),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(i.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(i.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(i.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(i.b)("p",{parentName:"div"},"Specifying additional mines is also required for ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"../report-page/permanentURL"}),"permanent URL resolution")," and ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"../markup/index"}),"web pages markup")," to work for other mines not defined as the default mine."))),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"BLUEGENES_ADDITIONAL_MINES")," expects a value encoded in ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/edn-format/edn"}),"EDN"),". In short, square brackets denote a sequence of values, while curly braces denote key-value pairs for every two elements. Keys in maps are keywords, which start with a colon followed by characters. Comma is treated as whitespace, and whitespace separates elements."),Object(i.b)("p",null,"Below is an examples of HumanMine and FlyMine specified as additional mines."),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'BLUEGENES_ADDITIONAL_MINES=[{:root "https://www.humanmine.org/humanmine", :name "HumanMine", :namespace "humanmine"} {:root "https://www.flymine.org/flymine", :name "FlyMine", :namespace "flymine"}]\n')),Object(i.b)("h3",{id:"resources"},"Resources"),Object(i.b)("p",null,"You can add new or override existing resources served by BlueGenes by creating a ",Object(i.b)("inlineCode",{parentName:"p"},"resources")," directory and having docker mount it and added to the Java class path with the following command:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'docker run -p 5000:5000 --env-file bluegenes.env -v "$(pwd)"/tools:/tools -v "$(pwd)"/resources:/resources -d --restart unless-stopped --entrypoint /usr/bin/java intermine/bluegenes -cp "resources:bluegenes.jar" bluegenes.core\n')),Object(i.b)("p",null,"The path inside the ",Object(i.b)("inlineCode",{parentName:"p"},"resources")," directory should match what is ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/intermine/bluegenes/tree/dev/resources"}),"provided in BlueGenes"),", meaning everything inside ",Object(i.b)("inlineCode",{parentName:"p"},"resources/public")," is served from the web server root."))}s.isMDXComponent=!0},545:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return u}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),s=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,l=b(e,["components","mdxType","originalType","parentName"]),p=s(n),m=a,u=p["".concat(o,".").concat(m)]||p[m]||d[m]||i;return n?r.a.createElement(u,c(c({ref:t},l),{},{components:n})):r.a.createElement(u,c({ref:t},l))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var b in t)hasOwnProperty.call(t,b)&&(c[b]=t[b]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=n[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);
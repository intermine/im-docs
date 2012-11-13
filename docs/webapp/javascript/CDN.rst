Content Delivery Network
================================

InterMine web-applications rely on a server to deliver static files such as JavaScript and CSS. The default location for this server is "http://cdn.intermine.org".

Setting up your own CDN
^^^^^^^^^^^^^^^^^^^^^^^^

This dependency is easy to remove. You can host all these files yourself from any location.
We recommend doing the following:

  * Cloning your own copy of the CDN (http://github.com/intermine/CDN).
    This means you have local copies of all the files.
  * Making the root directory of your checkout visible through a web-server (an 
    Apache 'alias' directive is sufficient). 
    These resources should be accessible through CORS enabled web-servers - see: http://enable-cors.org/
  * Change the value of the 'head.cdn.location' property in your web-app. This is
    currently configured in 'global.web.properties' as {{{head.cdn.location = http://cdn.intermine.org}}}
    Note that you can do this in a running web-app to check that
    it works by visiting the HOST/PREFIX/showProperties.do url when logged in as superuser. 



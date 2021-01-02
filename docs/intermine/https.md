# How to set up your InterMine webapp to use https

You will need to use a CDN delivering https content \(see [Performance](../webapp/performance/index.md)\), for example [https://cdn.intermine.org](https://cdn.intermine.org)

Set the corresponding entry in 'global.web.properties', for example

```text
head.cdn.location = https://cdn.intermine.org
```

You can also override this property by setting it directly in your`mine.properties` file.

{% hint style="info" %}
If you are moving your existing mine to https, please take care of updating also the following properties in the same `mine.properties` file:

* project.sitePrefix
* webapp.deploy.url
* webapp.baseurl

If you are using your own jbrowse server, this will now need to be served through https as well, and you will need to adjust also the property:

* jbrowse.install.url
{% endhint %}

## Tomcat requirements

You should add a configuration to your tomcat server.xml in the Engine section, specifying the address of your proxy:

```markup
<Valve className="org.apache.catalina.valves.RemoteIpValve"
     protocolHeaderHttpsValue="https"
     remoteIpHeader="x-forwarded-for"
     requestAttributesEnabled="true"
     internalProxies="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
     protocolHeader="x-forwarded-proto" />
```

It is also good practice to limit access to tomcat port only to the host's loopback address \(localhost\):

```markup
<Connector port="8080" protocol="HTTP/1.1"
        address="127.0.0.1"
        connectionTimeout="20000"
        URIEncoding="UTF-8"
        redirectPort="8443" />
```


# Open ID

InterMine web-applications allow users to create accounts and sign in to these accounts by authenticating with a selection of Open-ID providers, including Yahoo.

To sign in with one of these authentication providers: 1. Click on '''login''' \(in the upper-right\). 2. Click the name of the Open-ID provider you wish to use. 3. Authenticate yourself with your provider. 4. You will be redirected to your mine when finished.

{% hint style="info" %}
Google has shut down its OpenID-2 service. To continue using Google authentication, you must use OAuth2 authentication! See the section on editing web-properties for more details.
{% endhint %}

To set this up for a mine you administer:

* The most important thing is to set up a couple of properties correctly in your mine's properties file \(located in the `.intermine` directory\), eg:

```text
webapp.baseurl=http://beta.flymine.org
webapp.path=intermine-test
```

If you do not wish to allow Open-ID accounts, set the property "openid.allowed=false" in any of the property files that end up in the WEB\_PROPERTIES map.

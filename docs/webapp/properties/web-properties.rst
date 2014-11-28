Features
========================================================

The `web.properties` file configures several attributes for the InterMine web application.

attributeLink
    Used to configure hyperlinks, generally to external dbs.  See "External Links" section below

bag.example.identifiers
    Text present in the list upload form.  See "List upload examples" section below

externallink
    Redirect links in query results.  See :doc:`/webapp/query-results/redirects`

galaxy
    See :doc:`/webapp/third-party-tools/galaxy`

genomicRegionSearch
    See :doc:`/webapp/region-search/index`

header.links
    links at upper right corner

meta.keywords
    will populate meta tag for keywords

meta.description
    will populate meta tag for description.  Google uses this in their search results, I think

portal.welcome
    the message to show when a user arrives at the webapp via the portal action (eg. <something>/portal.do)

quickSearch.identifiers
    Text displayed in search box

theme
    Colour scheme for the webapp.  Available options are:  blue, bright_blue, gold, green, grey, brown, ecoli_blue, metabolic, modmine, ratmine and purple 

xrefLink
    Used to configure hyperlinks for CrossReferences.  See below

Home page
-----------

Search box (first box on the left)

===========================  ============================================
begin.searchBox.title        title of box on left
begin.searchBox.description  text in the box on the left 
begin.searchBox.example      text in the form field 
===========================  ============================================

List upload box (middle box)

=========================  =========================
begin.listBox.title        Title of box 
begin.listBox.description  Text in box 
bag.example.identifiers    Text in form field 
=========================  =========================

Third box

===========================  ============================================
begin.thirdBox.title         Title of box if user is new 
begin.thirdBox.visitedTitle  Title of box if user has visited before 
begin.thirdBox.description   Text in box 
begin.thirdBox.linkTitle     Text for large button 
begin.thirdBox.link          URL for large button 
===========================  ============================================

Tabs
-----------

Templates tagged with each category will appear under the appropriate tab. 

===========================  ================================
begin.tabs.1.id              Name of category, eg. Genes
begin.tabs.1.description     Text for that tab
===========================  ================================

List upload examples
----------------------

Using the `bag.example.identifiers` key, one can provide a list of keyword examples on the list create/upload page. This could lead to a mixed list of items being updated and only, say Protein or Gene, identifiers being uploaded.

If one wants to provide different example identifiers per different types, like Genes, Proteins, SNPs, you can do so by using the following key:

`bag.example.identifiers.gene`, `bag.example.identifiers.protein` etc.

Then, when the user selects a Genes from a dropdown select box for type and choose the Example list link, the text box will be populated keywords associated only with `bag.example.identifiers.gene` key in the config file.

External links
----------------------

You can add links to other websites by adding entries to the `web.properties` file.  

The format for this property is:

.. code-block:: properties

    # on the report page - a single identifier
    'attributelink' + unique_name + class + taxonId + attributeName + (url|imageName|text)

    # on the list analysis page - a list of identifiers
    'attributelink' + unique_name + class + taxonId + attributeName + 'list' + (url|imageName|text)


unique_name
    used to distinguish between multiple configurations for the same attribute/organism/class combination

class 
    class of object to link, eg. Protein

taxonId 
    either a proper id or '*' when no assumptions is made regarding the organism

attributeName
    which identifier field to pass to the URL, e.g. if attributeName is primaryIdentifier, the value of primary identifier field will be used as the attribute value    
    
list 
    indicates the link will have a list of identifiers

url 
    url to link to

imageName 
    name of logo (optional), must be in /model directory

text 
    text that will appear next to the logo

The value of the attribute (for the current object) is substituted anywhere the string "<<attributeValue>>" occurs in the text or the url

example:

.. code-block:: properties

    attributelink.flybase.Gene.7227.primaryIdentifier.url=http://www.flybase.org/.bin/fbidq.html?<<attributeValue>>
    attributelink.flybase.Gene.7227.primaryIdentifier.text=FlyBase: <<attributeValue>>

In this case `Gene` pages for Drosophila melanogaster will have a link that uses the `organismDbId` field.

A list example:

.. code-block:: properties

    attributelink.flymine.Gene.*.primaryIdentifier.list.url=http://www.flymine.org/query/portal.do?externalid=<<attributeValue>>&class=Gene
    attributelink.flymine.Gene.*.primaryIdentifier.list.text=FlyMine
    attributelink.flymine.Gene.*.primaryIdentifier.list.imageName=flymine_logo_link.gif

Only if a taxonId is specified the code will check if the link to the external db is relevant.

Settings for the xrefLink property
--------------------------------------------

You can configure the URLs for querying CrossReference from external sources by adding entries to the {{{web.properties}}} file.  

The format for this property is:

.. code-block:: properties

    # on the report page
    'xreflink' + dataSource_name + (url|imageName)

dataSource_name 
    the name of the external database

url 
    url to link to

imageName 
    name of logo (optional), must be in /model directory

example:

.. code-block:: properties

    xreflink.PFAM.url=http://pfam.sanger.ac.uk/family?
    xreflink.PIRSF.url=http://pir.georgetown.edu/cgi-bin/ipcSF?id=


Cross references represent identifiers used in external databases, eg. FlyBase, UniProt. An object in InterMine which has CrossReference will have a identifier and data source for that cross reference. In order to find the cross reference in that data source, a url is required to link to and the full path should look like url+identifier, e.g. ''http://pfam.sanger.ac.uk/family?PF00001''. In web.properties, the first part of the full path could be configured as in "url", and identifier will be added programmatically to the rear of it. The dataSource_name should be consistent with the source name of the CrossReferences in the InterMine database.

OpenAuth2 Settings
---------------------

You can configure your mine to accept delegated authentication from one or more identity
resources which are protected by OAuth2_ authentication. For this, you must register each
application with the provider, giving them details of your application such as its name, and
where it will be located. This varies from provider to provider - see
`this tutorial <http://benfoster.io/blog/oauth-providers>`_ for a good
guide to the registration process for a number of popular providers.

We are using the `Apache OLTU`_ library to help manage the authentication flow. This means
that configuring some of the more common providers, such as Facebook, Github and Microsoft
is very simple. It also allows us to add any identity provider that meets certain minimum
sanity requirements.

Configuration is managed through adding values to the ``web-properties``.

The Callback URI
~~~~~~~~~~~~~~~~~~

Don't forget that you will need to specify the redirect URI differently at different
providers. For the InterMine system, the callback will be ``BASE_URL/PATH/oauth2callback.do?provider=$PROVIDER``,
but some providers require just the domain name, others will ask for a specific path. Best
practice is to give as general a path as possible in case this needs changing in the future.
Many providers will require a path, but allow the ``redirect_uri`` to be any subpath of that
URI - in which case you should provide ``BASE_URL/PATH``.

Enabling Supported Providers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You will need to inform the InterMine system of the names of the providers which have been
configured to work with your application. This should be a comma separated list of provider
names. The values are case insensitive, and will be processed as upper-case values. E.G.:

.. code-block:: properties

    oauth2.providers = github,facebook,microsoft,strava,aip

Configuring OLTU Supported Providers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To configure an OLTU supported provider (such as Github or Facebook), you simply need to
define the client-id and client-secret you registered your application with, eg:

.. code-block:: properties

    oauth2.GITHUB.client-id = $GH-CLIENT-ID
    oauth2.GITHUB.client-secret = $GH-CLIENT-SECRET


Configuring a Custom Provider
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To configure a custom provider some other properties need to be provided.
Taking AIP's araport system as an example, this can be configured thusly:

.. code-block:: properties

    oauth2.AIP.client-id = YOUR_CLIENT_ID
    oauth2.AIP.client-secret = YOUR_CLIENT_SECRET

The URLs needed by the flow - contact your provider to find these out:

.. code-block:: properties

    oauth2.AIP.url.auth = https://api.araport.org/authorize
    oauth2.AIP.url.token = https://api.araport.org/token

The scopes need to access the identity resource. This should include sufficient levels of permission
to access the name and email of the authenticating user.

.. code-block:: properties

    oauth2.AIP.scopes = PRODUCTION

Information about the way the token endpoint functions. If the token endpoint expects parameters to be passed
in the query-string use the value "QUERY", and if the endpoint expects the parameters to be passed
in the message body provide the value "BODY":

.. code-block:: properties

    oauth2.AIP.messageformat = BODY

Information about the way the token endpoint responds. If the token endpoint responds with
``JSON``, then provide the value "JSON", and if the endpoint responds with url-encoded form-data, 
then provide the value "FORM"

.. code-block:: properties

    oauth2.AIP.responsetype = JSON

Information about the way the identity resource operates. If the resource expects
the bearer token to be in the query parameters provide the value "query", and if the
bearer token is expected to be in the ``Authorization`` header, pass the value
"header".

.. code-block:: properties

    oauth2.AIP.resource-auth-mechanism = header

The location of the identity resource. This must be a resource that can respond with ``JSON``. If query
parameters are needed they should be included in the URL. An ``Accept`` header will be provided with the
value ``application/json``.

.. code-block:: properties

    oauth2.AIP.identity-resource = https://api.araport.org/profiles/v2/me

Guides to interpreting the response from the identity resource. These are all optional. 

.. code-block:: properties

    # Provide a value if the identity is within a message envelope. The value is the
    # key of the envelope.
    oauth2.AIP.identity-envelope = result
    # Provide a key to access a unique identifier for the user. Default = id
    oauth2.AIP.id-key = uid
    # Provide a key to access the user's email. Default = email
    oauth2.AIP.email-key = email
    # Provide a key to access the user's name. May be a composite value (comma separated). Default = name
    oauth2.AIP.name-key = first_name,last_name

.. _OAuth2: http://oauth.net/2/
.. _Apache OLTU: http://oltu.apache.org/

Delegated Authentication with JWTs
------------------------------------

InterMine supports completely automated delegated authentication, whereby a mediator may add a token
that authenticates the user according to a chain of trust. This uses public-key cryptography to establish
trust, and JWTs to transmit assertions.

[nb. All the configuration in this section can (and should) go in your `~/.intermine/MINE.properties` file]

To enable this feature you need to do a couple of things:

Create a Key Store [optional]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine needs access to public keys - this can mean creating a JKS key store
(http://docs.oracle.com/javase/7/docs/api/java/security/KeyStore.html) with the certificate
used to sign the JWTs - you should store the certificate against the alias with the same
name as used in the `iss` claim in the JWT. The keystore file should be saved as `keystore.jks.$release`
in the `~/.intermine` directory, or moved as part of your release cycle to
`MINE/resources/webapp/WEB-INF/` immediately prior to building your webapp.

If you do this, then you need to provide the following configuration:

===============================  =========================================================
`security.keystore.password`      The password for this keystore.
===============================  =========================================================

If your keystore has no password, then you do not need to set that property.
See below for a quick guide to creating a valid keystore.

Provide Public Keys in your properties files [optional]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Instead of (or in addition to) creating a keystore, you can also provide keys
in property files. Even though these are public keys, they are best included in
your `~/.intermine/MINE.properties.release` file, since they will be specific
to a particular instance. Internally if you do not provide a keystore, an empty
one will be created.

This is done by listing them as follows:

===============================  ============================================================
`security.publickey.$ALIAS`       $BASE64_ENCODED_PUBLIC_KEY
===============================  ============================================================

You can provide multiple keys and they will be all stored in the applications
key-store under the given alias. Every key must have an alias, even if there is
only one. If there is a problem with the key (it cannot be decoded, it is not
valid, etc) it will by default be skipped, unless the following property is set
to `true` (in which case it will throw an error and prevent your
web-application from starting):

==================================  ============================================================
`keystore.strictpublickeydecoding`   `true` or `false`
==================================  ============================================================

The value `BASE64_ENCODED_PUBLIC_KEY` is the base64 encoding of the bytes of public key. Below is
a sample program to illustrate how to do this in Java and python:

.. code-block:: java

    import java.security.KeyPairGenerator;
    import java.security.PublicKey;
    import org.apache.commons.codec.binary.Base64;

    public class EncodeKey {

        public static void main(String... args) throws Exception {
            PublicKey key = getKey();
            Base64 encoder = new Base64();
            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
            System.out.println(encoder.encodeToString(key.getEncoded()));
        }

        private static PublicKey getKey() {
            // Generating a random key - provide your own of course.
            return keyGen.generateKeyPair().getPublic();
        }
    }

or

.. code-block:: python

    # using pycrypto https://www.dlitz.net/software/pycrypto/
    from Crypto.PublicKey import RSA
    from Crypto import Random

    # Generate a new random public key.
    random = Random.new().read
    pair = RSA.generate(1024, random.read)
    public_key = pair.publickey()

    print(base64.encodestring(public_key.exportKey(format = 'DER')))

Selecting keys at runtime.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Since this feature relies on public key cryptography, you need to tell the InterMine application
which keys to use to verify which JWT tokens. This can be done with the following properties:

===============================  ============================================================
`jwt.verification.strategy`       `NAMED_ALIAS` (default), `ANY`, or `WHITELIST` - optional
===============================  ============================================================

This property defaults to the most secure option, `NAMED_ALIAS`, where only keys associated
with the issuer of the token with be used to verify it. This means you will need to link the
two. Each token must identify its issuer (with the `iss` claim), you can map from that value
to a key available to InterMine by providing the alias it is available as in the keystore. If
you plan on accepting your own tokens, then you can provide the alias of your private key.

===============================  =========================================================
`security.keystore.alias.$iss`    The alias for the key certificate used to sign the JWT.
===============================  =========================================================

If you use the `WHITELIST` strategy, the you must provide the list of aliases that can be
used to verify JWTs. All of them will be tried until one verifies successfully.

===============================  =========================================================
`jwt.alias.whitelist`             The comma separated list of aliases to use.
===============================  =========================================================

If you select the `ANY` strategy, no further configuration is needed.

Multiple issuers can be supported by providing a key for each alias.

Managing non-standard claims
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine reads to claims about the end user from the JWT - who it identifies,
and their email address. The email claim is non-standard, and needs to be
configured. The subject claim can be overriden if the JWT tokens you are
receiving have their subject identified in a different claim. To do so provide
the following properties (in the following table, `$iss` is the value of the
`iss` claim of the token):

===============================  ==================================================================================
 `jwt.key.email.$iss`              The name of the claim that provides the email of the subject. Defaults to
                                   `http://wso2.org/claims/emailaddress`
 `jwt.key.sub.$iss`                The name of the claim that provides the identity of the subject. This should be
                                   unique for each issuer. Not needed if the token provides the `sub` claim
===============================  ==================================================================================                                  

Other properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following properties may also be important

=================================  ===================================================================================
 `jwt.publicidentity`               Used as the `iss` claim on any tokens the application issues itself. Also, if the
                                    tokens received include an `aud` claim (see `aud definition`_) then this value
                                    must match that value for verification to complete.
 `jwt.verifyaudience`               `true` or `false` (default = true). Whether to verify the `aud` claim.
 `security.privatekey.password`     Used to gain access to the private key used by the application for signing its
                                    own tokens.
 `security.privatekey.alias`        Used to retrieve the private key used by the application for signing its own
                                    tokens. To provide a private key you must configure a key store.
=================================  ===================================================================================
                                  
.. _aud definition: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#audDef

Checking your configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An ant task is provided to make checking this (admittedly rather complex)
set-up easier. To make use of it you should configure your keys as for
production, acquire a valid JWT representative of one of the ones you expect to
encounter in production, enter you webapp directory (`$MINE/webapp`) and then
call the following ant task:

.. code-block:: bash

    ant verify-jwt \
        -Drelease=$RELEASE \ # Needed to read the correct properties file
        -Dkeystore=$KEYSTORE_LOCATION \
        -Djwt=$JWT

If correctly set up, you should get a message printed to the console telling
you who the token identifies.

Setting up the Key-Store
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You will need a Java Key Store to use public-key cryptography for security. To get started you can use
the following command to generate a `keystore.jks` file with a new public/private key-pair:

.. code-block:: sh

  keytool -genkey -alias ALIAS_A -keyalg RSA -keystore keystore.jks -keysize 2048

The following command will allow you to add a certificate to your key-store:

.. code-block:: sh

  keytool -import -trustcacerts -alias ALIAS_B -file B.crt -keystore keystore.jks


This set-up would allow you to start accepting JWT tokens signed by the owner of `B.crt`, which could be
configured by making sure they are associated in your property files. So if the owner of `B.crt`
identified themselves with the `iss` (issuer) claim `http://b.com`, then you could link the certificate
to the claim with the following property:

.. code-block:: properties

  security.keystore.alias.http://b.com = ALIAS_B


Overriding properties
---------------------------------

* `intermine/webapp/main/resources/webapp/WEB-INF/global.web.properties` - used by all mines.  Properties set here will be available to everyone, even the test model mine.
* `bio/webapp/resources/webapp/WEB-INF/bio.web.properties` - used by all bio-mines.  Properties set here will be available to all mines that use the bio layer.  so not the test model model. Can overwrite properties in the global.web.properties file.
* `flymine/webapp/resources/web.properties` - used by a mine.  Properties set here will be available to only that specific mine.  Can create mine-specific properties or overwrite properties in the above two files.
* `$HOME/.intermine/flymine.properties` - used by a mine. Properties set here will be available only to that specific mine, and will override all other properties. Put sensitive values here that should not be commited to version control.


.. index:: web properties, cross reference links, attribute links, link outs, list upload examples, header links, meta keywords, meta description, portal welcome message, keyword search examples

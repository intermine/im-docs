---
title: Features
---

The [web.properties]{.title-ref} file configures several attributes for
the InterMine web application.

attributeLink

:   Used to configure hyperlinks, generally to external dbs. See
    \"External Links\" section below

bag.example.identifiers

:   Text present in the list upload form. See \"List upload examples\"
    section below

externallink

:   Redirect links in query results. See
    `/webapp/query-results/redirects`{.interpreted-text role="doc"}

galaxy

:   See `/webapp/third-party-tools/galaxy`{.interpreted-text role="doc"}

genomicRegionSearch

:   See `/webapp/region-search/index`{.interpreted-text role="doc"}

header.links

:   links at upper right corner

meta.keywords

:   will populate meta tag for keywords

meta.description

:   will populate meta tag for description. Google uses this in their
    search results, I think

project.citation

:   populates the \"Cite\" text in the footer.

portal.welcome

:   the message to show when a user arrives at the webapp via the portal
    action (eg. \<something\>/portal.do)

quickSearch.identifiers

:   Text displayed in search box

theme

:   Colour scheme for the webapp. Available options are: blue,
    bright_blue, gold, green, grey, brown, ecoli_blue, metabolic,
    modmine, ratmine and purple

xrefLink

:   Used to configure hyperlinks for CrossReferences. See below

markup.webpages.enable

:   Used to enable structured data in JSON-LD format in InterMine web
    pages. Available options are: true or false

Branding
========

These parameters are returned by the branding API end point, and are
used by external applications, e.g. the InterMine iOS app, the InterMine
registry and the InterMine R client.

  ----------------------------- -------------------------------------------------------
  branding.images.logo          This image should be 45px by 45px
  branding.colors.header.main   Main colour for your mine, defaults to grey, \#595455
  branding.colors.header.text   Text colour for your mine, defaults to white, \#fff
  ----------------------------- -------------------------------------------------------

Home page
=========

Search box (first box on the left)

  ----------------------------- -----------------------------
  begin.searchBox.title         title of box on left
  begin.searchBox.description   text in the box on the left
  begin.searchBox.example       text in the form field
  ----------------------------- -----------------------------

List upload box (middle box)

  --------------------------- --------------------
  begin.listBox.title         Title of box
  begin.listBox.description   Text in box
  bag.example.identifiers     Text in form field
  --------------------------- --------------------

Third box

  ----------------------------- -----------------------------------------
  begin.thirdBox.title          Title of box if user is new
  begin.thirdBox.visitedTitle   Title of box if user has visited before
  begin.thirdBox.description    Text in box
  begin.thirdBox.linkTitle      Text for large button
  begin.thirdBox.link           URL for large button
  ----------------------------- -----------------------------------------

Tabs
====

Templates tagged with each category will appear under the appropriate
tab.

  -------------------------- -----------------------------
  begin.tabs.1.id            Name of category, eg. Genes
  begin.tabs.1.description   Text for that tab
  -------------------------- -----------------------------

List upload examples
====================

Using the [bag.example.identifiers]{.title-ref} key, one can provide a
list of keyword examples on the list create/upload page. This could lead
to a mixed list of items being updated and only, say Protein or Gene,
identifiers being uploaded.

External links
==============

You can add links to other websites by adding entries to the
[web.properties]{.title-ref} file.

The format for this property is:

``` {.guess}
# on the report page - a single identifier
'attributelink' + unique_name + class + taxonId + attributeName + (url|imageName|text)

# on the list analysis page - a list of identifiers
'attributelink' + unique_name + class + taxonId + attributeName + 'list' + (url|imageName|text)
```

unique_name

:   used to distinguish between multiple configurations for the same
    attribute/organism/class combination

class

:   class of object to link, eg. Protein

taxonId

:   either a proper id or \'\*\' when no assumptions is made regarding
    the organism

attributeName

:   which identifier field to pass to the URL, e.g. if attributeName is
    primaryIdentifier, the value of primary identifier field will be
    used as the attribute value

list

:   indicates the link will have a list of identifiers

url

:   url to link to

imageName

:   name of logo (optional), must be in /model directory

text

:   text that will appear next to the logo

The value of the attribute (for the current object) is substituted
anywhere the string \"\<\<attributeValue\>\>\" occurs in the text or the
url

example:

``` {.properties}
attributelink.flybase.Gene.7227.primaryIdentifier.url=http://www.flybase.org/.bin/fbidq.html?<<attributeValue>>
attributelink.flybase.Gene.7227.primaryIdentifier.text=FlyBase: <<attributeValue>>
```

In this case [Gene]{.title-ref} pages for Drosophila melanogaster will
have a link that uses the [organismDbId]{.title-ref} field.

A list example:

``` {.properties}
attributelink.flymine.Gene.*.primaryIdentifier.list.url=http://www.flymine.org/flymine/portal.do?externalid=<<attributeValue>>&class=Gene
attributelink.flymine.Gene.*.primaryIdentifier.list.text=FlyMine
attributelink.flymine.Gene.*.primaryIdentifier.list.imageName=flymine_logo_link.gif
attributelink.flymine.Gene.*.primaryIdentifier.list.usePost=true
```

Only if a taxonId is specified the code will check if the link to the
external db is relevant.

Settings for the xrefLink property
==================================

You can configure the URLs for querying CrossReference from external
sources by adding entries to the [web.properties]{.title-ref} file.

The format for this property is:

``` {.guess}
# on the report page
'xreflink' + dataSource_name + (url|imageName)
```

dataSource_name

:   the name of the external database

url

:   url to link to

imageName

:   name of logo (optional), must be in /model directory

example:

``` {.properties}
xreflink.PFAM.url=http://pfam.sanger.ac.uk/family?
xreflink.PIRSF.url=http://pir.georgetown.edu/cgi-bin/ipcSF?id=
```

Cross references represent identifiers used in external databases, eg.
FlyBase, UniProt. An object in InterMine which has CrossReference will
have a identifier and data source for that cross reference. In order to
find the cross reference in that data source, a url is required to link
to and the full path should look like url+identifier, e.g.
\'\'<http://pfam.sanger.ac.uk/family?PF00001>\'\'. In web.properties,
the first part of the full path could be configured as in \"url\", and
identifier will be added programmatically to the rear of it. The
dataSource_name should be consistent with the source name of the
CrossReferences in the InterMine database.

OpenAuth2 Settings (aka. OpenID Connect)
========================================

You can configure your mine to accept delegated authentication from one
or more identity resources which are protected by
[OAuth2](http://oauth.net/2/) authentication. This involves sending the
user to another site, having them sign in there, and being sent back to
your InterMine with their credentials.

We are using the [Apache
OLTU](https://attic.apache.org/projects/oltu.html) library to help
manage the authentication flow. This means that configuring some of the
more common providers, such as Google, Facebook, Github and Microsoft is
very simple. It also allows us to add any identity provider that meets
certain minimum sanity requirements.

::: {.warning}
::: {.title}
Warning
:::

Google has closed down their OpenID-2 based authentication solution in
favour of OpenID Connect (OAuth2). If you want to use Google as an
authentication provider you must use OAuth2.
:::

Configuration is managed through adding values to the `web-properties`.

Registering your Application.
-----------------------------

You *must register your application* with the provider, giving them
details of your application such as its name, and where it will be
located. This varies from provider to provider - see [this
tutorial](http://benfoster.io/blog/oauth-providers) for a good guide to
the registration process for a number of popular providers. For example,
for Google, you will need a Google+ account and to visit [the Google
developer\'s console](https://console.developers.google.com/) to create
an application.

For ELIXIR, you will need:

1.  an ELIXIR identity. Please register the ELIXIR ID
    [here](https://elixir-europe.org/register) , if you don\'t already
    have it
2.  register the new client
    [here](https://login.elixir-czech.org/oidc/manage/dev/dynreg), using
    the *Self-service client registration* page.
3.  send an email to <aai-contact@elixir-europe.org> in order to receive
    a form that you have to completed with additional informations

For each application you will need to register the callback URI, which
looks like:

``` {.bash}
${webapp.baseurl}/${webapp.path}/oauth2callback.do?provider=${PROVIDER}
```

Where [webapp.baseurl]{.title-ref} and [webapp.path]{.title-ref} are the
corresponding values from your configuration, and [PROVIDER]{.title-ref}
is the name of the provider in all uppercase letters (as configured
below). Google requires the [provider]{.title-ref} parameter as part of
the URI, but other providers do not - you should check with each of
them.

You will probably be asked to register a javascript domain. This is not
used by us, but you can enter the [webapp.baseurl]{.title-ref}.

Enabling Supported Providers
----------------------------

You will need to inform the InterMine system of the names of the
providers which have been configured to work with your application. This
should be a comma separated list of provider names. The values are case
insensitive, and will be processed as upper-case values. E.G.:

``` {.properties}
# in  ~/.intermine/MINE.properties
# You can list just a single provider:
oauth2.providers = GOOGLE
# or multiple providers, combining standard and custom providers:
oauth2.providers = GOOGLE,ELIXIR,GITHUB,FACEBOOK,MICROSOFT,STRAVA,AIP
```

Configuring OLTU Supported Providers
------------------------------------

To configure an OLTU supported provider (such as Github or Facebook),
you simply need to define the client-id and client-secret you registered
your application with, eg:

::: {.warning}
::: {.title}
Warning
:::

All secrets, including these ones (especially the client-secret) MUST
not be committed to version control or made publicly accessible. DO NOT
add them to your web.properties file, but instead add them to your
mine.properties file (eg. \~/.intermine/MINE.properties).
:::

``` {.properties}
# ~/.intermine/MINE.properties
oauth2.GITHUB.client-id = $GH-CLIENT-ID
oauth2.GITHUB.client-secret = $GH-CLIENT-SECRET
```

Configuring a Custom Provider
-----------------------------

To configure a custom provider some other properties need to be
provided. Taking AIP\'s araport system as an example, this can be
configured thusly:

``` {.properties}
# All OAuth2 clients need this configution. Do not commit to version control!
oauth2.AIP.client-id = YOUR_CLIENT_ID
oauth2.AIP.client-secret = YOUR_CLIENT_SECRET
```

The URLs needed by the flow - contact your provider to find these out:

``` {.properties}
oauth2.AIP.url.auth = https://api.araport.org/authorize
oauth2.AIP.url.token = https://api.araport.org/token
```

The scopes need to access the identity resource. This should include
sufficient levels of permission to access the name and email of the
authenticating user.

``` {.properties}
oauth2.AIP.scopes = PRODUCTION
```

Information about the way the token endpoint functions. If the token
endpoint expects parameters to be passed in the query-string use the
value \"QUERY\", and if the endpoint expects the parameters to be passed
in the message body provide the value \"BODY\":

``` {.properties}
oauth2.AIP.messageformat = BODY
```

Information about the way the token endpoint responds. If the token
endpoint responds with `JSON`, then provide the value \"JSON\", and if
the endpoint responds with url-encoded form-data, then provide the value
\"FORM\"

``` {.properties}
oauth2.AIP.responsetype = JSON
```

Information about the way the identity resource operates. If the
resource expects the bearer token to be in the query parameters provide
the value \"query\", and if the bearer token is expected to be in the
`Authorization` header, pass the value \"header\".

``` {.properties}
oauth2.AIP.resource-auth-mechanism = header
```

The location of the identity resource. This must be a resource that can
respond with `JSON`. If query parameters are needed they should be
included in the URL. An `Accept` header will be provided with the value
`application/json`.

``` {.properties}
oauth2.AIP.identity-resource = https://api.araport.org/profiles/v2/me
```

Guides to interpreting the response from the identity resource. These
are all optional.

``` {.properties}
# Provide a value if the identity is within a message envelope. The value is the
# key of the envelope.
oauth2.AIP.identity-envelope = result
# Provide a key to access a unique identifier for the user. Default = id
oauth2.AIP.id-key = uid
# Provide a key to access the user's email. Default = email
oauth2.AIP.email-key = email
# Provide a key to access the user's name. May be a composite value (comma separated). Default = name
oauth2.AIP.name-key = first_name,last_name
```

Delegated Authentication with JWTs
==================================

InterMine supports completely automated delegated authentication,
whereby a mediator may add a token that authenticates the user according
to a chain of trust. This uses public-key cryptography to establish
trust, and JWTs to transmit assertions.

::: {.note}
::: {.title}
Note
:::

All the configuration in this section can (and should) go in your
[\~/.intermine/MINE.properties]{.title-ref} file
:::

To enable this feature you need to do a couple of things:

Create a Key Store \[optional\]
-------------------------------

InterMine needs access to public keys - this can mean creating a JKS key
store
(<http://docs.oracle.com/javase/7/docs/api/java/security/KeyStore.html>)
with the certificate used to sign the JWTs - you should store the
certificate against the alias with the same name as used in the
[iss]{.title-ref} claim in the JWT. The keystore file should be saved as
[keystore.jks.\$release]{.title-ref} in the [\~/.intermine]{.title-ref}
directory, or moved as part of your release cycle to
[MINE/resources/webapp/WEB-INF/]{.title-ref} immediately prior to
building your webapp.

If you do this, then you need to provide the following configuration:

+----------------------------------+----------------------------------+
| [securit                         | The password for this keystore.  |
| y.keystore.password]{.title-ref} |                                  |
+==================================+==================================+
|                                  |                                  |
+----------------------------------+----------------------------------+
| If your keystore has no          | > then you do not need to set    |
| password,                        | > that property.                 |
+----------------------------------+----------------------------------+
| See below for a quick guide to   | eating a valid keystore.         |
| cr                               |                                  |
+----------------------------------+----------------------------------+
| Provide Public Keys in your      | rties files \[optional\]         |
| prope                            |                                  |
+----------------------------------+----------------------------------+
| ------------------------------   | ------------------------------   |
+----------------------------------+----------------------------------+
| Instead of (or in addition to)   | eating a keystore, you can also  |
| cr                               | provide keys                     |
+----------------------------------+----------------------------------+
| in property files. Even though   | ese are public keys, they are    |
| th                               | best included in                 |
+----------------------------------+----------------------------------+
| your                             | s.release\` file, since they     |
| \`\~/.intermine/MINE.propertie   | will be specific                 |
+----------------------------------+----------------------------------+
| to a particular instance.        | lly if you do not provide a      |
| Interna one will be created.     | keystore, an empty               |
+----------------------------------+----------------------------------+
| This is done by listing them as  | ollows:                          |
| f                                |                                  |
+----------------------------------+----------------------------------+
| ===============================  | ============================     |
|                                  | ================================ |
+----------------------------------+----------------------------------+
| [securit                         | > \$BASE64_ENCODED_PUBLIC_KEY    |
| y.publickey.\$ALIAS]{.title-ref} |                                  |
+----------------------------------+----------------------------------+

You can provide multiple keys and they will be all stored in the
applications key-store under the given alias. Every key must have an
alias, even if there is only one. If there is a problem with the key (it
cannot be decoded, it is not valid, etc) it will by default be skipped,
unless the following property is set to [true]{.title-ref} (in which
case it will throw an error and prevent your web-application from
starting):

+----------------------------------+----------------------------------+
| [keystore.stri                   | [true]{.title-ref} or            |
| ctpublickeydecoding]{.title-ref} | [false]{.title-ref}              |
+==================================+==================================+
|                                  |                                  |
+----------------------------------+----------------------------------+
| The value                        | \` is the base64 encoding of the |
| \`BASE64_ENCODED_PUBLIC_KEY      | bytes of public key. Below is    |
+----------------------------------+----------------------------------+
| a sample program to illustrate   | o do this in Java and python:    |
| how t                            |                                  |
|                                  |                                  |
| ``` {.java}                      |                                  |
| ```                              |                                  |
+----------------------------------+----------------------------------+
| > import                         | rator;                           |
| > java.security.KeyPairGene      |                                  |
| > import                         |                                  |
| > java.security.PublicKey;       |                                  |
+----------------------------------+----------------------------------+
| > import                         | binary.Base64;                   |
| > org.apache.commons.codec.      |                                  |
| >                                |                                  |
| > public class EncodeKey {       |                                  |
+----------------------------------+----------------------------------+
| > public static void main(Stri   | ng\... args) throws Exception {  |
+----------------------------------+----------------------------------+
| > PublicKey key = getKey()       | ;                                |
+----------------------------------+----------------------------------+
| > Base64 encoder = new Bas       | e64();                           |
+----------------------------------+----------------------------------+
| > KeyPairGenerator keyGen        | =                                |
|                                  | KeyPai                           |
|                                  | rGenerator.getInstance(\"RSA\"); |
+----------------------------------+----------------------------------+
| > System.out.println(encod }     | er.en                            |
|                                  | codeToString(key.getEncoded())); |
+----------------------------------+----------------------------------+
| > private static PublicKey get   | Key() {                          |
+----------------------------------+----------------------------------+
| > // Generating a random k       | ey - provide your own of course. |
+----------------------------------+----------------------------------+
| > return keyGen.generateKe } }   | yPair().getPublic();             |
|                                  |                                  |
| or                               |                                  |
|                                  |                                  |
| ``` {.python}                    |                                  |
| ```                              |                                  |
+----------------------------------+----------------------------------+
| > \# using pycrypto              | tz.net/software/pycrypto/        |
| > <https://www.dli> from         |                                  |
| > Crypto.PublicKey import RSA    |                                  |
| > from Crypto import Random      |                                  |
+----------------------------------+----------------------------------+
| > \# Generate a new random       | ey.                              |
| > public k random =              |                                  |
| > Random.new().read              |                                  |
+----------------------------------+----------------------------------+
| > pair = RSA.generate(1024,      | .read)                           |
| > random public_key =            |                                  |
| > pair.publickey()               |                                  |
+----------------------------------+----------------------------------+
| >                                | \_key.exportKey(format =         |
| print(base64.encodestring(public | \'DER\')))                       |
|                                  |                                  |
| ### Selecting keys at runtim     |                                  |
| e. {#selecting-keys-at-runtime.} |                                  |
+----------------------------------+----------------------------------+
| Since this feature relies on     | key cryptography, you need to    |
| public                           | tell the InterMine application   |
+----------------------------------+----------------------------------+
| which keys to use to verify      | T tokens. This can be done with  |
| which JW                         | the following properties:        |
+----------------------------------+----------------------------------+
| ===============================  | =========================        |
| ===                              | ================================ |
+----------------------------------+----------------------------------+
| [jwt.ve                          | AMED_ALIAS\` (default),          |
| rification.strategy]{.title-ref} | [ANY]{.title-ref}, or            |
| \`N                              | [WHITELIST]{.title-ref} -        |
|                                  | optional                         |
+----------------------------------+----------------------------------+

This property defaults to the most secure option,
[NAMED_ALIAS]{.title-ref}, where only keys associated with the issuer of
the token with be used to verify it. This means you will need to link
the two. Each token must identify its issuer (with the [iss]{.title-ref}
claim), you can map from that value to a key available to InterMine by
providing the alias it is available as in the keystore. If you plan on
accepting your own tokens, then you can provide the alias of your
private key.

+----------------------------------+----------------------------------+
| [security.k                      | The alias for the key            |
| eystore.alias.\$iss]{.title-ref} | certificate used to sign the     |
|                                  | JWT.                             |
+==================================+==================================+
|                                  |                                  |
+----------------------------------+----------------------------------+
| If you use the                   | gy, the you must provide the     |
| [WHITELIST]{.title-ref} strate   | list of aliases that can be      |
+----------------------------------+----------------------------------+
| used to verify JWTs. All of them | will be tried until one verifies |
|                                  | successfully.                    |
+----------------------------------+----------------------------------+
| ===============================  | =========================        |
|                                  | ================================ |
+----------------------------------+----------------------------------+
| [                                | > The comma separated list of    |
| jwt.alias.whitelist]{.title-ref} | > aliases to use.                |
+----------------------------------+----------------------------------+

If you select the [ANY]{.title-ref} strategy, no further configuration
is needed.

Multiple issuers can be supported by providing a key for each alias.

Managing non-standard claims
----------------------------

InterMine reads to claims about the end user from the JWT - who it
identifies, and their email address. The email claim is non-standard,
and needs to be configured. The subject claim can be overriden if the
JWT tokens you are receiving have their subject identified in a
different claim. To do so provide the following properties (in the
following table, [\$iss]{.title-ref} is the value of the
[iss]{.title-ref} claim of the token):

+----------------------------------+----------------------------------+
| > [                              | > The name of the claim that     |
| jwt.key.email.\$iss]{.title-ref} | > provides the email of the      |
|                                  | > subject. Defaults to           |
|                                  | > [http://wso2.org/              |
|                                  | claims/emailaddress]{.title-ref} |
+----------------------------------+----------------------------------+
| >                                | > The name of the claim that     |
|  [jwt.key.sub.\$iss]{.title-ref} | > provides the identity of the   |
|                                  | > subject. This should be unique |
|                                  | > for each issuer. Not needed if |
|                                  | > the token provides the         |
|                                  | > [sub]{.title-ref} claim        |
+----------------------------------+----------------------------------+

Other properties
----------------

The following properties may also be important

+----------------------------------+----------------------------------+
| >                                | > Used as the [iss]{.title-ref}  |
| [jwt.publicidentity]{.title-ref} | > claim on any tokens the        |
|                                  | > application issues itself.     |
|                                  | > Also, if the tokens received   |
|                                  | > include an [aud]{.title-ref}   |
|                                  | > claim (see [aud                |
|                                  | > definition](http://sel         |
|                                  | f-issued.info/docs/draft-ietf-oa |
|                                  | uth-json-web-token.html#audDef)) |
|                                  | > then this value must match     |
|                                  | > that value for verification to |
|                                  | > complete. Defaults to your     |
|                                  | > project title.                 |
+----------------------------------+----------------------------------+
| >                                | > [true]{.title-ref} or          |
| [jwt.verifyaudience]{.title-ref} | > [false]{.title-ref} (default = |
|                                  | > true). Whether to verify the   |
|                                  | > [aud]{.title-ref} claim.       |
+----------------------------------+----------------------------------+
| > [security.                     | > Used to gain access to the     |
| privatekey.password]{.title-ref} | > private key used by the        |
|                                  | > application for signing its    |
|                                  | > own tokens.                    |
+----------------------------------+----------------------------------+
| > [securi                        | > Used to retrieve the private   |
| ty.privatekey.alias]{.title-ref} | > key used by the application    |
|                                  | > for signing its own tokens. To |
|                                  | > provide a private key you must |
|                                  | > configure a key store.         |
+----------------------------------+----------------------------------+

Checking your configuration
---------------------------

An ant task is provided to make checking this (admittedly rather
complex) set-up easier. To make use of it you should configure your keys
as for production, acquire a valid JWT representative of one of the ones
you expect to encounter in production, enter you webapp directory
([\$MINE/webapp]{.title-ref}) and then call the following ant task:

``` {.bash}
ant verify-jwt \
    -Drelease=$RELEASE \ # Needed to read the correct properties file
    -Dkeystore=$KEYSTORE_LOCATION \
    -Djwt=$JWT
```

If correctly set up, you should get a message printed to the console
telling you who the token identifies.

Setting up the Key-Store
------------------------

You will need a Java Key Store to use public-key cryptography for
security. To get started you can use the following command to generate a
[keystore.jks]{.title-ref} file with a new public/private key-pair:

``` {.sh}
keytool -genkey -alias ALIAS_A -keyalg RSA -keystore keystore.jks -keysize 2048
```

The following command will allow you to add a certificate to your
key-store:

``` {.sh}
keytool -import -trustcacerts -alias ALIAS_B -file B.crt -keystore keystore.jks
```

This set-up would allow you to start accepting JWT tokens signed by the
owner of [B.crt]{.title-ref}, which could be configured by making sure
they are associated in your property files. So if the owner of
[B.crt]{.title-ref} identified themselves with the [iss]{.title-ref}
(issuer) claim [http://b.com]{.title-ref}, then you could link the
certificate to the claim with the following property:

``` {.properties}
security.keystore.alias.http://b.com = ALIAS_B
```

Overriding properties
=====================

-   [intermine/webapp/main/resources/webapp/WEB-INF/global.web.properties]{.title-ref} -
    used by all mines. Properties set here will be available to
    everyone, even the test model mine.
-   [bio/webapp/resources/webapp/WEB-INF/bio.web.properties]{.title-ref} -
    used by all bio-mines. Properties set here will be available to all
    mines that use the bio layer. so not the test model model. Can
    overwrite properties in the global.web.properties file.
-   [flymine/webapp/resources/web.properties]{.title-ref} - used by a
    mine. Properties set here will be available to only that specific
    mine. Can create mine-specific properties or overwrite properties in
    the above two files.
-   [\$HOME/.intermine/flymine.properties]{.title-ref} - used by a mine.
    Properties set here will be available only to that specific mine,
    and will override all other properties. Put sensitive values here
    that should not be commited to version control.

::: {.index}
web properties, cross reference links, attribute links, link outs, list
upload examples, header links, meta keywords, meta description, portal
welcome message, keyword search examples, oauth, oauth2, authentication,
Google, openid, GMail, jwt
:::

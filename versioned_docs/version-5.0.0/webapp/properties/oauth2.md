---
title: OAuth2 Settings
---
You can configure your mine to accept delegated authentication from one or more identity resources which are protected by [OAuth2](http://oauth.net/2/) authentication. This involves sending the user to another site, having them sign in there, and being sent back to your InterMine with their credentials.

We are using the [Apache OLTU](https://attic.apache.org/projects/oltu.html) library to help manage the authentication flow. This means that configuring some of the more common providers, such as Google, Facebook, Github and Microsoft is very simple. It also allows us to add any identity provider that meets certain minimum sanity requirements.

**Warning**
Google has closed down their OpenID-2 based authentication solution in favour of OpenID Connect \(OAuth2\). If you want to use Google as an authentication provider you must use OAuth2.

Configuration is managed through adding values to the `web-properties`.

### Registering your Application.

You _must register your application_ with the provider, giving them details of your application such as its name, and where it will be located. This varies from provider to provider - see [this tutorial](http://benfoster.io/blog/oauth-providers) for a good guide to the registration process for a number of popular providers. For example, for Google, you will need a Google+ account and to visit [the Google developer's console](https://console.developers.google.com/) to create an application.

For ELIXIR, you will need:

1. an ELIXIR identity. Please register the ELIXIR ID [here](https://elixir-europe.org/register) , if you don't already

   have it

2. register the new client [here](https://spreg.aai.elixir-czech.cz/spreg/), using the _New service_ page.
3. send an email to [aai-contact@elixir-europe.org](mailto:aai-contact@elixir-europe.org) in order to receive a form that you have to complete with additional information

For each application you will need to register the callback URI, which looks like:
```bash
{the_bluegenes_domain}/api/auth/oauth2callback?provider=GOOGLE
```

or (if you use the legacy user interface):
```bash
${webapp.baseurl}/${webapp.path}/oauth2callback.do?provider=${PROVIDER}
```

Where `webapp.baseurl` and `webapp.path` are the corresponding values from your configuration, and `PROVIDER` is the name of the provider in all uppercase letters \(as configured below\). Google requires the `provider` parameter as part of the URI, but other providers do not - you should check with each of them.

You can register 2 callback URIs if you want to provide both legacy and BlueGenes interfaces.

You will probably be asked to register a JavaScript domain. This is not used by us, but you can enter the `webapp.baseurl`.

### Enabling Supported Providers

You will need to inform the InterMine system of the names of the providers which have been configured to work with your application. This should be a comma separated list of provider names. The values are case insensitive, and will be processed as upper-case values. E.g.:

```text
# in  ~/.intermine/MINE.properties
# You can list just a single provider:
oauth2.providers = GOOGLE
# or multiple providers, combining standard and custom providers:
oauth2.providers = GOOGLE,ELIXIR,GITHUB,FACEBOOK,MICROSOFT,STRAVA,AIP
```

### Configuring OLTU Supported Providers

To configure an OLTU supported provider \(such as Github or Facebook\), you simply need to define the client-id and client-secret you registered your application with, eg:

**Warning**
All secrets, including these ones \(especially the client-secret\) MUST not be committed to version control or made publicly accessible. DO NOT add them to your web.properties file, but instead, add them to your mine.properties file \(eg. ~/.intermine/MINE.properties\).

```text
# ~/.intermine/MINE.properties
oauth2.GITHUB.client-id = $GH-CLIENT-ID
oauth2.GITHUB.client-secret = $GH-CLIENT-SECRET
```

### Configuring a Custom Provider

To configure a custom provider, some other properties need to be provided. Taking AIP's araport system as an example, this can be configured thusly:

```text
# All OAuth2 clients need this configution. Do not commit to version control!
oauth2.AIP.client-id = YOUR_CLIENT_ID
oauth2.AIP.client-secret = YOUR_CLIENT_SECRET
```

The URLs needed by the flow - contact your provider to find these out:

```text
oauth2.AIP.url.auth = https://api.araport.org/authorize
oauth2.AIP.url.token = https://api.araport.org/token
```

The scopes need to access the identity resource. This should include sufficient levels of permission to access the name and email of the authenticating user.

```text
oauth2.AIP.scopes = PRODUCTION
```

Information about the way the token endpoint functions. If the token endpoint expects parameters to be passed in the query-string use the value "QUERY", and if the endpoint expects the parameters to be passed in the message body provide the value "BODY":

```text
oauth2.AIP.messageformat = BODY
```

Information about the way the token endpoint responds. If the token endpoint responds with `JSON`, then provide the value "JSON", and if the endpoint responds with url-encoded form-data, then provide the value "FORM"

```text
oauth2.AIP.responsetype = JSON
```

Information about the way the identity resource operates. If the resource expects the bearer token to be in the query parameters, provide the value "query", and if the bearer token is expected to be in the `Authorization` header, pass the value "header".

```text
oauth2.AIP.resource-auth-mechanism = header
```

The location of the identity resource. This must be a resource that can respond with `JSON`. If query parameters are needed they should be included in the URL. An `Accept` header will be provided with the value `application/json`.

```text
oauth2.AIP.identity-resource = https://api.araport.org/profiles/v2/me
```

Guides to interpreting the response from the identity resource. These are all optional.

```text
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

## Delegated Authentication with JWTs

InterMine supports completely automated delegated authentication, whereby a mediator may add a token that authenticates the user according to a chain of trust. This uses public-key cryptography to establish trust, and JWTs to transmit assertions.

**Note**
All the configuration in this section can \(and should\) go in your `~/.intermine/MINE.properties` file.

To enable this feature you need to do a couple of things:

### Create a Key Store \[optional\]

InterMine needs access to public keys - this can mean creating a JKS key store \([http://docs.oracle.com/javase/7/docs/api/java/security/KeyStore.html](http://docs.oracle.com/javase/7/docs/api/java/security/KeyStore.html)\) with the certificate used to sign the JWTs - you should store the certificate against the alias with the same name as used in the `iss` claim in the JWT. The keystore file should be saved as `keystore.jks.$release` in the `~/.intermine` directory, or moved as part of your release cycle to `MINE/resources/webapp/WEB-INF/` immediately prior to building your webapp.

If you do this, then you need to provide the following configuration:

| `security.keystore.password` | The password for this keystore. |
| :--- | :--- |


If your keystore has no password, then you do not need to set that property. See below for a quick guide to creating a valid keystore.

### Provide Public Keys in your properties files \[optional\]

Instead of \(or in addition to\) creating a keystore, you can also provide keys in property files. Even though these are public keys, they are best included in your `~/.intermine/MINE.properties.release` file, since they will be specific to a particular instance. Internally if you do not provide a keystore, an empty one will be created.

This is done by listing them as follows:

| `security.publickey.$ALIAS` | $BASE64\_ENCODED\_PUBLIC\_KEY |
| :--- | :--- |


You can provide multiple keys and they will all be stored in the applications key-store under the given alias. Every key must have an alias, even if there is only one. If there is a problem with the key \(it cannot be decoded, it is not valid, etc\) it will be skipped by default, unless the following property is set to `true` \(in which case it will throw an error and prevent your web-application from starting\):

| `keystore.strictpublickeydecoding` | `true` or `false` |
| :--- | :--- |


The value `BASE64_ENCODED_PUBLIC_KEY` is the base64 encoding of the bytes of public key. Below is a sample program to illustrate how to do this in Java and python respectively:

```java
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
```

or

```python
# using pycrypto https://www.dlitz.net/software/pycrypto/
from Crypto.PublicKey import RSA
from Crypto import Random

# Generate a new random public key.
random = Random.new().read
pair = RSA.generate(1024, random.read)
public_key = pair.publickey()

print(base64.encodestring(public_key.exportKey(format = 'DER')))
```

### Selecting keys at runtime.

Since this feature relies on public key cryptography, you need to tell the InterMine application which keys to use to verify which JWT tokens. This can be done with the following properties:

| `jwt.verification.strategy` | `NAMED_ALIAS` \(default\), `ANY`, or `WHITELIST` - optional |
| :--- | :--- |


This property defaults to the most secure option, `NAMED_ALIAS`, where only keys associated with the issuer of the token will be used to verify it. This means you will need to link the two. Each token must identify its issuer \(with the `iss` claim\), you can map from that value to a key available to InterMine by providing the alias it is available as in the keystore. If you plan on accepting your own tokens, then you can provide the alias of your private key.

| `security.keystore.alias.$iss` | The alias for the key certificate used to sign the JWT. |
| :--- | :--- |


If you use the `WHITELIST` strategy, then you must provide the list of aliases that can be used to verify JWTs. All of them will be tried until one verifies successfully.

| `jwt.alias.whitelist` | The comma separated list of aliases to use. |
| :--- | :--- |


If you select the `ANY` strategy, no further configuration is needed.

Multiple issuers can be supported by providing a key for each alias.

### Managing non-standard claims

InterMine reads to claims about the end user from the JWT - who it identifies, and their email address. The email claim is non-standard, and needs to be configured. The subject claim can be overridden if the JWT tokens you are receiving have their subject identified in a different claim. To do so provide the following properties \(in the following table, `$iss` is the value of the `iss` claim of the token\):

|  |  |
| :--- | :--- |
| `jwt.key.email.$iss` | The name of the claim that provides the email of the subject. Defaults to `http://wso2.org/claims/emailaddress` |
| `jwt.key.sub.$iss` | The name of the claim that provides the identity of the subject. This should be unique for each issuer. Not needed if the token provides the `sub` claim |

### Other properties

The following properties may also be important

|  |  |
| :--- | :--- |
| `jwt.publicidentity` | Used as the iss claim on any tokens the application issues itself. Also, if the tokens received include an `aud` claim \(see [aud definition](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#audDef)\) then this value must match that value for verification to complete. Defaults to your project title. |
| `jwt.verifyaudience` | `true` or `false` \(default = true\). Whether to verify the aud claim. |
| `security.privatekey.password` | Used to gain access to the private key used by the application for signing its own tokens. |
| `security.privatekey.alias` | Used to retrieve the private key used by the application for signing its own tokens. To provide a private key you must configure a key store. |

### Checking your configuration

An ant task is provided to make checking this \(admittedly rather complex\) set-up easier. To make use of it you should configure your keys as for production, acquire a valid JWT representative of one of the ones you expect to encounter in production, enter you webapp directory \(`$MINE/webapp`\) and then call the following ant task:

```bash
ant verify-jwt \
    -Drelease=$RELEASE \ # Needed to read the correct properties file
    -Dkeystore=$KEYSTORE_LOCATION \
    -Djwt=$JWT
```

If correctly set up, you should get a message printed to the console telling you who the token identifies.

### Setting up the Key-Store

You will need a Java Key Store to use public-key cryptography for security. To get started, you can use the following command to generate a `keystore.jks` file with a new public/private key-pair:

```text
keytool -genkey -alias ALIAS_A -keyalg RSA -keystore keystore.jks -keysize 2048
```

The following command will allow you to add a certificate to your key-store:

```text
keytool -import -trustcacerts -alias ALIAS_B -file B.crt -keystore keystore.jks
```

This set-up would allow you to start accepting JWT tokens signed by the owner of `B.crt`, which could be configured by making sure they are associated in your property files. So if the owner of `B.crt` identified themselves with the `iss` \(issuer\) claim [`http://b.com`](http://b.com), then you could link the certificate to the claim with the following property:

```text
security.keystore.alias.http://b.com = ALIAS_B
```


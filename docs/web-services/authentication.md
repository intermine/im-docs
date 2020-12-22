::: {#ws-authentication}

orphan

:   
:::

Authentication
==============

Authentication with InterMine Web services is chiefly used to identify a
user and access their lists and templates.

Tokens come in two flavours: Temporary/anonymous and
permanent/associated with an existing account. Each token will uniquely
identify an individual for a single specific InterMine instance
-cross-mine applications will need 1 token per user per InterMine.

To authenticate a user, add a token to your HTTP requests, typically as
a GET or POST parameter, e.g.:

    # Return all public lists and any private lists associated with this token:
    GET http://www.flymine.org/query/service/lists?token=DFGg5dge5gnmja04Peh6faA3hd

Not all endpoints require authentication - use [I/O
docs](http://iodocs.apps.intermine.org/) to identify which endpoints do
require authentication.

Anonymous authentication
------------------------

Anonymous 24-hour tokens are available via the `/session` method, and
are useful for working with short-term disposable lists. If users want
to preserve their lists or view existing lists associated with an
account, they should be encouraged to use a permanent token (see docs
below).

> GET <http://www.flymine.org/query/service/user/session>

Should result in a response like this:

    {
      "token": "M1E5vakfN5xdy3I1ncm7",
      "executionTime": "2017.03.22 11:42::17",
      "wasSuccessful": true,
      "error": null,
      "statusCode": 200
    }

### Expired token gotcha:

Make sure not to pass any old or invalid tokens as arguments when
requesting the new token.

This request will not return a token, and will return a 401 instead:

    GET http://www.flymine.org/query/service/user/session?token=someOldExpiredToken

### I/O Docs demo:

Experiment with anonymous tokens in I/O docs:
<http://iodocs.apps.intermine.org/flymine/docs#/ws-session/GET/session>

Authentication for existing user accounts (permanent tokens)
------------------------------------------------------------

Via the JSP UI, log into "MyMine" (top left corner tab) and click on
"account details". Your token / API key is shown at the bottom. If none
exists you can choose to generate a new API key.

### Note regarding generating API keys:

If you already have a key, don't click the "Generate a new API key"
button unless you wish to invalidate your old key! Only one key is
active at any given time.

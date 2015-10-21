# AirDroidJS

AirDroid JS is an NodeJS module that provides a wrapper to some of the AirDroid Core API functionality for you to incorporate into your very own app. 

### Version
0.1.0

### Installation

I have not pushed this to npm yet so you need to manually set this up.

```sh
$ git clone https://github.com/donaldej/adjs.git
$ cd adjs
$ npm install
```
Once installed, you can include module and try it out. Included a couple example scripts to show how to use the events, promises and callbacks.

### Development

Contributers are welcome to help out by adding more functionality, optimizing some of my code or by just helping test and research.

### Currently Working
 - signIn method - Authenticate with your registered email and password.
 - getUserInfo method - Retrieve user settings as well as the websocket urls.
 - getCsrfToken method - Create the CSRF token to allow the server to trust you.
 - CookieJAR
 - En/De-Cryption utilities for the websocket body data.


### Todos

 - Write Tests
 - Add Websockets to allow for push updates.
 - Add more functions.
 - Create a better data model with event emitters and such.

License
----

MIT
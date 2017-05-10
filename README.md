# keyvalue-xyz

An unnoficial [keyvalue.xyz](https://keyvalue.xyz/) client.

### Usage

```js
var kvs = require('keyvalue-xyz');

// Creating a new token
kvs.createToken(key, function(error, token) {
    // error: any error that has occurred
    // token: the token that can be used to fetch and update the specified key
});

// Setting the value for a key
kvs.setValueForKey(token, key, value, function(error) {
    // error: any error that has occurred
});

// Setting the JSON value for a key
kvs.setJSONForKey(token, key, jsonValue, function(error) {
    // error: any error that has occurred
});

// Getting the value for a key
kvs.getValueForKey(token, key, function(error, value) {
    // error: any error that has occurred
    // value: the value for the provided key
});

// Getting the JSON value for a key
kvs.getJSONForKey(token, key,, function(error, value) {
    // error: any error that has occurred
    // value: the JSON value for the provided key
});
```

### Building / Testing

1. Checkout this repository
1. `npm install`
1. `npm test`

HRaP - HTTP Requests as Promise
--------------------------------------------

This Node.js module provides the event based `request` function from the `http` and `https` modules in Node's API in the Promise format, such that HTTP(S) requests may be programmed in a sequential order in your source code.

# Features

 * Laissez-faire error handling: You provide the promise rejection handler
 * Depends on native Node modules only
 * Zero polyfilling
 * Encoding opinionated (there might be other HTTP libraries who fare better with use cases involving support for other kinds of string coding)
 * Following redirects: Just add `followRedirects: true` to the [options](https://github.com/vegardbb/hrap/blob/3afcddee455a8c7ca4ba0efb2c64237d417afe28/index.js#L41) parameter. Implemented with the 3rd party module [follow-redirects](https://github.com/follow-redirects/follow-redirects)

## Exported functions

Importing the module when using CommonJS modules:

```javascript
const hrap = require('hrap')
```

When using EcmaScript modules:
```javascript
import hrap from 'hrap'
```

## Consumption

```javascript
const hrap = require('hrap')

const onResponse = ({ status, message, contentType, body }) => {
  console.log(contentType) // application/json; charset=utf-8
  console.log(status) // 200
  console.log(message) // OK
  const { userId, id, title, completed } = JSON.parse(body)
  console.log(userId) // 1
  console.log(id) // 1
  console.log(title) // 'delectus aut autem'
  console.log(completed) // false
}

const onError = ({ stack }) => {
  console.log(stack)
}

hrap('https://jsonplaceholder.typicode.com/todos/1').then(onResponse).catch(onError)
```

### Function parameters

The default export accepts as argument two parameters: the former is the URL to the resource, either in its URL object format, or in conventional string form. The latter is [the set of options passed](https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_request_options_callback) to [`http.ClientRequest.request`](https://nodejs.org/docs/latest-v14.x/api/http.html#http_class_http_clientrequest). As of version 2.1.0 you can also feed in just the request options object, which is assumed to include relevant URL parameters such as *protocol*, *hostname* and *port*. If you want to pass a request body to be written to the request, put as a full string on the *body* property in the *options* parameter.

### The value passed to the resolver callback

The **resolve** function in the returned Promise instance will receive one argument, an object consisting of four properties:
 * the response body, `body`
 * the response status code, `status`
 * the response status message, `message`
 * the content type of the response, `contentType`

Whenever the `error` event is fired internally, the error object is passed on to the **reject** callback in its entirety.

# Miscellaneous

 * [Change log](https://github.com/vegardbb/hrap/blob/main/CHANGELOG.md)
 * [Report an issue](https://github.com/vegardbb/hrap/issues)
 * [License](https://github.com/vegardbb/hrap/blob/main/LICENSE)

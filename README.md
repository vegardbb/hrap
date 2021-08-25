Introducing HRaP - HTTP Requests as Promise
--------------------------------------------

This Node.js module provides the event based `request` function from the `http` and `https` modules in Node's API in the Promise format, such that HTTP(S) requests may be programmed in a sequential order in your source code.

# Features

 * Laissez-faire error handling: You provide the promise rejection handler
 * Depends on native Node modules only
 * Zero polyfilling
 * Encoding opinionated (there might be other HTTP libraries who fare better with such use cases)

## Exported functions

 * TODO: Return Interface Documentation
 * TODO: Option Parameter Interface Documentation
 * TODO: Exported functions Documentation

## Return values

The resolver function will receive one argument, an object consisting of three properties, the response body, the response status code and the response status message.

# A few relevant questions

Finally, a bit of trivia.

## Why yet **another** HTTP request package for Node/server side?

It's free real estate.

## What is the primary motivation behind this module?

This program is published to motivate programmers of end user facing services to be more conscious of and directly rely on Node's APIs more than they typically are. At the end of the day, the Node APIs are depended on in the kind of packages you find deep in your dependency tree in the package.json file, or in popular web frameworks such as Express.js and Hapi. Yet, at the end of the day, Node.js is more than just an execution environment for Javascript code.

## Why not export a similar Promise wrapper for the *request* method on the `ClientHttp2Session` instance?

To achieve this, All I'd have to do is to export the Promise factory function which is used to wrap each of the core modules imported statically in the sourcecode. A more pressing reason for this choice is the implicit invitation to employ patterns of the old world (i.e. one-time callbacks) onto the new (reusable callbacks, also known as streams). I'm just saying, learn to use the event patterns Node is built on.

## I need to access **insert response header attribute here**, why won't you expose more of the header object through the resolved object?

My take on the response header is that it, like all other data elements that pertain to the request, be encapsulated by the module. If so, the header object could be accessed by means of a proper getter function on the object. That would require a little brain work and testing on my part, but I do not reject the implementation of such a feature in the foreseeable future. I just don't have ample time on hand right now.

## Will this package implement automatic redirect, handling JSON responses, coffee brewing, et cetera?

These features involve architectural decisions that can go in multitudes of different directions, and is guaranteed to break someone's use case. I prefer to leave such concerns to the individual package user.

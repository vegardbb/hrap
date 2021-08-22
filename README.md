Introducing HRaP - HTTP Requests as Promise
--------------------------------------------

This Node.js module provides the event based `request` function from the `http` and `https` modules in Node's API in the Promise format, such that HTTP(S) requests may be programmed in a sequential order in your source code.

# Features

 * Laissez-faire error handling: You provide the promise rejection handler
 * Depends on native Node modules only
 * Zero polyfilling

## Exported functions

...

## Return values

The resolver function will receive one argument, an object consisting of three properties, the response body, the response status code and the response status message.

# A few relevant questions

Finally, a bit of trivia.

## Why yet **another** HTTP request package for Node/server side?

It's free real estate.

## What is the primary motivation behind this module?

This program is published to motivate programmers of end user facing services to be more conscious of and directly rely on Node's APIs more than they typically are. At the end of the day, the Node APIs are depended on in the kind of packages you find deep in your dependency tree in the package.json file, or in popular web frameworks such as Express.js and Hapi. Yet, at the end of the day, Node.js is more than just an execution environment for Javascript code.

## Will this package implement automatic redirect, handling JSON responses, coffee brewing, et cetera?

These features involve architectural decisions that can go in multitudes of different directions, and is guaranteed to break someone's use case. I prefer to leave such concerns to the individual package user.

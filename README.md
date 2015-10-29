# Hf

[![Build Status](https://travis-ci.org/smizell/hf.svg)](https://travis-ci.org/smizell/hf)

Hf is a library for working with [Hf representations](#hf-data-structure). It provides functions that take regular JavaScript objects rather than using constructors and prototypes.

- [Overview](#overview)
- [Install](#install)
- [Usage](#usage)
  - [`hf.getByRel`](#hfgetbyrel)
  - [`hf.filterByRel`](#hffilterbyrel)
  - [`hf.filterByTag`](#hffilterbytag)
  - [`hf.attributes`](#hfattributes)
  - [`hf.transitions`](#hftransitions)
  - [`hf.path`](#hfpath)
- [Example Hf object](#example-hf-object)
- [Hf Data Structure](#hf-data-structure)

## Overview

> "It is better to have 100 functions operate on one data structure than 10 functions on 10 data structures." —Alan Perlis

### Problems Using JSON

Using dot notation to interface with JSON is nice at first. If you get a `response` back with `{ foo: 'bar'}`, it is quick and easy to do `response.foo` to get `bar`. But there are some difficulties that this practice can bring, especially if the response can change.

First, a client will throw an error the moment that a given path does not exist. Let's say we get the following as a response from the server.

```js
{
  "foo": {
    "bar": "baz"
  }
}
```

Next, we may access the `baz` value by using `response.foo.bar`. The moment the response does not include `foo`, our code will throw an error that it can't read the property from `bar` of `undefined`. To get around this, we check to make sure `foo` is there, and while this works, it requires us to always check values exist before we start traversing them with dot notation. It also means our code has a lot of `if` statements scattered throughout, and the actual logic of our code is a little less clear.

Second, we run into problems when a property can have a value of varying types. There are many hypermedia formats that use a property to define a `rel` for a link transition, and this value can usually either be an object or an array of objects.

A customer response from a server may look as follows, with some data left out of course. Note: this is a fictional format for use as an example.

```js
{
  "links": {
    "order": {
      "href": "/order/1"
    }
  }
}
```

If we desire to add more orders, the convention is usually to make the `order` link an array of `order` links.

```js
{
  "links": {
    "order": [
      {
        "href": "/order/1"
      },
      {
        "href": "/order/2"
      }
    ]
  }
}
```

If the code we originally used was `customer.links.order.href`, our code no longer works with this response. This forces me to either check the type of the value each time or rely on a library to handle parsing this for me. Either way, the niceness of the dot notation is now buried within several if statements or is hidden behind a library's API.

Lastly, as we access parts of this response above, we are either required to piece data together or create a new object with all of the relevant data. For instance, if we access the first order above using `customer.links.order[0]`, our value is `{ "href": "/order/1" }`. The `rel`, being the key by which the order is accessed, is not included in this object and is therefore some additional piece of data I need to pass around with it.

Because of this, we are unable to easily iterate through links and embedded resources by accessing the response directly. We'll need more code to handle all of the types and key-value pairs or rely on a simple library to handle this for me.

### Design of Hf

The hope is that Hf will be able to address the problems by providing a simple hypermedia format and using functions rather than objects and methods.

### A Companion Hypermedia Format

The first step in working toward addressing the problems above was to put together [a very simple format](#hf-data-structure) for hypermedia. It is not the most robust by any means, but it:

1. Includes all relevant information for a transition in each object.
1. Includes all transition in the same array for easy iterating and transforming

While this makes it difficult to access `href` values as shown above, it does allow us to future-proof our lookups a little and rely on simple functions are pulling out data.

### Functions Acting on Data

The next step was to build a library for helping with common use cases. For instance, there is a lot of times you'll need all of the links from a response. The code for that would be as simple as this:

```js
resource.transitions.filter(transition => transition.tag === 'link');
```

But here we fall into a couple of traps we walked through above. First, if transitions is not in the response, our code fails. To get around this, we pass the response to a function that always returns an array, no matter what it gets.

```js
hf.filterByTag(resource, 'link');
```

Additionally, we have functions for handling path lookups in an object. For instance, let's say we receive this response from the server.

```js
{
  "attributes": {
    "foo": {
      "bar": "baz"
    }
  }
}
```

If we used `response.attributes.foo.bar`, the code is very tightly coupled with this response. If that path is not there, things fail again. To help with this, we can use the `path` function.

```js
hf.path(response, ['attributes', 'foo', 'bar']);
```

This function will return `baz` if the value is there, but if any step of the path is not found, it automatically returns `undefined` unless we pass in a default as the third argument. This means that if we get some response from the server that isn't what we were expecting—even if `attributes` is not present, our code does not fail, and we don't have `if` statements scattered throughout my code checking to ensure type and the path exist.

## Install

```sh
npm install hf --save
```

## Usage

### `hf.hasRel`

Takes an Hf object or transitions array and a `rel` and returns true if the rel is found and false if not.

```js
// returns true if next is in the document
hf.hasRel(hfObj, 'next');
```

### `hf.getByRel`

Takes an Hf object and a `rel` and returns the first transitions it finds. If there is an `embed` transition, it returns that before any `link` transition.

```js
// returns either undefined or a transition object
hf.getByRel(hfObj, 'next');
```

### `hf.filterByRel`

Takes an Hf object or transitions array and a `rel` and returns an array of transitions with a matching `rel`.

```js
// returns an array of transition objects
hf.filterByRel(hfObj, 'next');
```

### `hf.filterByTag`

Takes an Hf object or transitions array and a `tag` and returns an array of transitions with a matching `tag`. The `tag` argument can be either `link`, `form`, or `embed`.

```js
// returns an array of transition objects
hf.filterByRel(hfObj, 'link');
```

### `hf.attributes`

Takes an Hf object and returns the attributes if there are any or an empty object. You use this instead of `hfObj.attributes` because this returns and empty object if `attributes` isn't found.

```js
// returns an attributes object
hf.attributes(hfObj);
```

### `hf.transitions`

Takes an Hf object and returns the transitions if there are any. You use this instead of `hfObj.transitions` because this returns and empty array if `transitions` are't found.

```js
// returns an array of transition objects
hf.transitions(hfObj);
```

### `hf.path`

Takes an object or array and an array of steps. It returns the value if found or undefined if not.

```js
// Returns 'one'
hf.path({
  attributes: {
    bar: 'foo',
    foo: [{bar: ['zero', 'one', 'two']}],
  },
}, ['attributes', 'foo', 0, 'bar', 1]);
```

The `path` function also takes a default value as the last argument in the event the path was not found.

```js
// Returns 'foobar'
hf.path({}, ['attributes', 'foo', 0, 'bar', 1], 'foobar');
```

## Example Hf object

```js
let hfObj = {
  attribute: {
    name: 'John Doe'
  },
  transitions: [
    {
      tag: 'link',
      rels: ['orders'],
      href: '/user/1/orders'
    },
    {
      tag: 'form',
      rels: ['update'],
      href: '/user/1',
      method: 'POST',
      data: {
        name: 'John Doe'
      }
    }
  ],
};
```

## Hf Data Structure

### Hf (object)

- attributes (object) - Attributes for a given resource
- transitions (array[Link, Form, Embed]) - Transitions from state

### Link (object)

- tag: link (string, fixed) - Link classifier
- href (string) - Resolvable URL
- rels (array) - Array of link relations

### Form (Link)

- tag: form (string, fixed) - Form classifier
- method (string) - HTTP method for the form
- encType (array[string]) - Media type to encode form in
- data (object) - Data object for form

### Embed (Hf, Link)

- tag: embed (string, fixed) - Embed classifier

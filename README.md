# Hf

[![Build Status](https://travis-ci.org/smizell/hf.svg)](https://travis-ci.org/smizell/hf)

Hf is a library for working with [Hf representations](#hf-data-structure). It provides functions that take regular JavaScript objects rather than using constructors and prototypes.

- [Hf](#hf)
  - [Overview](#overview)
    - [Problems Using JSON](#problems-using-json)
    - [Design of Hf](#design-of-hf)
    - [A Companion Hypermedia Format](#a-companion-hypermedia-format)
    - [Functions Acting on Data](#functions-acting-on-data)
  - [Install](#install)
  - [Usage](#usage)
    - [`hf.has`](#hfhas)
    - [`hf.getBy`](#hfgetby)
    - [`hf.filterBy`](#hffilterby)
    - [`hf.metaAttributes`](#hfmetaattributes)
    - [`hf.metaLinks`](#hfmetalinks)
    - [`hf.attributes`](#hfattributes)
    - [`hf.transitions`](#hftransitions)
    - [`hf.path`](#hfpath)
  - [Example Hf object](#example-hf-object)
  - [Hf Data Structure](#hf-data-structure)
    - [Hf (object)](#hf-object)
    - [Link (object)](#link-object)
    - [Form (Link)](#form-link)
    - [Query (Link)](#query-link)
    - [Embed (Hf, Link)](#embed-hf-link)
  - [Developing and Contributing](#developing-and-contributing)

## Overview

> "It is better to have 100 functions operate on one data structure than 10 functions on 10 data structures." —Alan Perlis

### Problems Using JSON

Using dot notation to interface with JSON is nice at first. If we get a `response` back with `{ foo: 'bar'}`, it is quick and easy to do `response.foo` to get `bar`. But there are some difficulties that this practice can bring, especially if the response can change. In JavaScript, these difficulties slowly push us towards interacting with the response by adding conditionals to make sure the structure is what we expected, or letting some library handle it for us.

For example, a client will throw an error the moment that a given path does not exist. Let's say we get the following as a response from the server.

```js
{
  "foo": {
    "bar": "baz"
  }
}
```

We may access the `baz` value by using `response.foo.bar`. But the moment the response does not include `foo`, our code will throw an error that it can't read the property from `bar` of `undefined`. To get around this, we check to make sure `foo` is there, and while this works, it requires us to always check values exist before we start traversing them with dot notation. It also means our code has a lot of `if` statements scattered throughout, moving us away from interacting directly with the data.

We can also run into problems when a property can have a value of varying types. There are many hypermedia formats that use a property to define a `rel` for a link transition, and this value can usually either be an object or an array of objects.

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

If the code we originally used was `customer.links.order.href`, our code no longer works with this response. This forces us to either check the type of the value each time or rely on a library to handle parsing this for me. Either way, the niceness of the dot notation is now buried within several if statements or is hidden behind a library's API.

One small difficult that is created with this is that the link relation is used a property, which along with the potential value being an array, requires multiple levels of iterating.

### Design of Hf

The hope is that Hf will be able to address the problems by providing a simple hypermedia format and using functions rather than objects and methods. The idea is to give up on interacting with the JSON structure directly and provide some safety while doing so.

#### A Companion Hypermedia Format

The first step in working toward addressing the problems above was to put together [a very simple format](#hf-data-structure) for hypermedia. It is not the most robust by any means, but it:

1. Includes all relevant information for a transition in each object
1. Includes all transition in the same array for easy iterating and transforming

While this makes it difficult to access `href` values as shown above, it does allow us to future-proof our lookups a little and rely on simple functions are pulling out data.

#### Functions Acting on Data

The next step was to build a library for helping with common use cases. For instance, there is a lot of times you'll need all of the links from a response. The code for that would be as simple as this:

```js
resource.transitions.filter(transition => transition.tag === 'link');
```

But here we fall into similar traps we walked through above. For instance, if `transitions` is not in the response at a future time, our code will fail. To get around this, we pass the response to a function that always returns an array, no matter what it gets.

```js
hf.filterBy(resource, {tag: 'link'});
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

If we used `response.attributes.foo.bar`, the code is very tightly coupled with this response, and relies on that exact path to be there. If that path is missing, things fail again. To help with this, we can use the `path` function.

```js
hf.path(response, ['attributes', 'foo', 'bar']);
```

This function will return `baz` if the value is there, but if any step of the path is not found, it automatically returns `undefined` unless we pass in a default as the third argument. If we were to then get some response from the server that isn't what we were expecting—even if `attributes` is not present, our code does not fail. We also don't have `if` statements scattered throughout our code checking to ensure the correct type and the path exist.

#### Made for Filtering

Another idea was to put as many transition types into a single array for filtering while providing lot of values to filter upon. Many formats break transitions into links, forms, embedded resources, etc., and require iterating and filtering multiple arrays to find relevant information. This structure puts everything in a `transitions` array and keeps all values as strings or objects for easy lookups.

#### Safety and Failing Gracefully

The functions provided here only take certain types and only return certain types. They fail gracefully when they get types they don't expect while returning the correct type anyway. For example, say we get this response back from the server.

```js
{
	"attributes": {
    "foo": {
      "bar": "baz"
    }
  },
  "transitions": [
		{
			"tag": "link",
			"ref": "self",
			"href": "/foo"
		}
	]
}
```

We may be tempted to write code as such to get the value of `bar` and get the `href` of the link with `rel` as `self`.

```js
var bar = response.attributes.foo.bar;
var selfLink = response.transitions.filter(function(transition) {
	return transition.rel === 'self';
})[0];
```

This code looks fine. But what if we get back this response later?

```js
{
	"attributes": {},
  "transitions": []
}
```

The code breaks of course. Using the functions provided, we can do:

```js
var bar = hf.path(response, ['attributes', 'foo', 'bar']);
var selfLink = hf.getBy(response, {rel: 'self'});
```

This code would work for the first example, and return `undefined` for both values in the second.

### Summary

This library and format come from headaches encountered with working directly with JSON. It is made to provide simple functions for interacting with a single data structure. It's meant to be very almost-laughably simple. 

## Install

```sh
npm install hf --save
```

## Usage

### `hf.has`

Takes an Hf object or transitions array and a conditions object and returns true if it finds at least one matching transition.

```js
// returns true if next is in the document
hf.has(hfObj, {rel: 'next'});
```

### `hf.getBy`

Takes an Hf object or transitions array as the first argument and a conditions object or function as the second argument. It returns the first matching transition or `undefined`.

```js
// returns first transition with rel next and tag link
hf.getBy(hfObj, {rel: 'next', tag: 'link'});

// returns first transition with rel next regardless of tag
hf.getBy(hfObj, {rel: 'next'});

// returns first transition with rel next
hf.getBy(hfObj, function(transition) {
  return transition.rel === 'next';
});
```

### `hf.filterBy`

Takes an Hf object or transitions array as the first argument and a conditions object or function as the second argument. It returns all transitions with matching conditions or an empty array.

```js
// returns all transitions with rel next and tag link
hf.filterBy(hfObj, {rel: 'next', tag: 'link'});

// returns all transitions with rel next regardless of tag
hf.filterBy(hfObj, {rel: 'next'});

// returns all transitions with rel next
hf.filterBy(hfObj, function(transition) {
  return transition.rel === 'next';
});
```

### `hf.metaAttributes`

Takes an Hf object and returns the meta attributes if there are any or an empty object. You use this instead of `hfObj.meta.attributes` because this returns an empty object even if `meta.attributes` isn't found.

```js
// returns a meta attributes object
hf.metaAttributes(hfObj);
```

### `hf.metaLinks`

Takes an Hf object and returns the meta links if there are any or an empty array. You use this instead of `hfObj.meta.links` because this returns an empty object even if `meta.links` isn't found.

```js
// returns a meta links array
hf.metaLinks(hfObj);
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
  meta: {
    links: [
      {
        rel: 'profile',
        href: 'http://example.com/profile'
      }
    ]
  },
  attribute: {
    name: 'John Doe'
  },
  transitions: [
    {
      tag: 'link',
      rel: 'orders',
      href: '/user/1/orders'
    },
    {
      tag: 'form',
      rel: 'update',
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

**Proposed media type**: `application/vnd.hf+json`

### Hf (object)

- meta (object)
    - attributes (object) - Meta attributes for a given resource
    - links (array[Link]) - Meta links for a given resource
- attributes (object) - Attributes for a given resource
- transitions (array[Link, Form, Embed]) - Transitions from state

### Link (object)

- tag: link (string, fixed) - Link classifier
- href (string, required) - Resolvable URL
- rel (string, required) - Link relations

### Form (Link)

- tag: form (string, fixed) - Form classifier
- method (string, required) - HTTP method for the form
- encType (string) - Media type for encoding request
- data (object) - Data object for form

### Embed (Hf, Link)

- tag: embed (string, fixed) - Embed classifier

## Developing and Contributing

To test, you can run:

```sh
npm test
```

If you install nodemon, you can run `npm run develop`.

```sh
npm install nodemon -g
npm run develop
```

Contributions are welcome! Please open a pull request.

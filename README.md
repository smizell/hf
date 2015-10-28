# Hf

Hf is a library for working with [Hf representations](#hf-representation). It provides simple functions that work with JavaScript objects and values rather than using a prototype chain.

## Install

```sh
npm install hf --save
```

## Usage

### `hf.getByRel`

Takes an Hf object and a `rel` and returns the first transitions it finds. If there is an `embed` transitions, it returns that before any `link` transitions.

```js
// returns either undefined or a transition object
hf.getByRel(hfObj, rel);
```

### `hf.filterByRel`

Takes and Hf object and a `rel` and returns an array of transitions with a matching `rel`.

```js
// returns an array of transition objects
hf.filterByRel(hfObj, rel);
```

### `hf.filterByTag`

Takes and Hf object and a `tag` and returns an array of transitions with a matching `tag`.

```js
// returns an array of transition objects
hf.filterByRel(hfObj, tag);
```

### `hf.attributes`

Takes and Hf object and returns the attributes if there are any or an empty object. You use this instead of `hfObj.attributes` because this returns and empty object if `attributes` isn't found.

```js
// returns an attributes object
hf.attributes(hfObj);
```

### `hf.transitions`

Takes an Hf object and returns the transitions if there are any. You use this instead of `hfObj.transitions` because this returns and empty array if `transitions` are't found.

```js
// returns an array of transition objects
hf.attributes(hfObj);
```

### `hf.path`

Takes an Hf object and an array of steps and returns the value if found or undefined if not.

```js
// Returns 'one'
hf.path({
  attributes: {
    bar: 'foo',
    foo: [{bar: ['zero', 'one', 'two']}],
  },
}, ['attributes', 'foo', 0, 'bar', 1]);
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

- attributes (object)
- transitions (array[Link, Form, Embed])

### Link (object)

- tag: link (string, fixed)
- href (string)
- rels (array)

### Form (Link)

- tag: form (string, fixed)
- method (string)
- data (object)

### Embed (Hf, Link)

- tag: embed (string, fixed)

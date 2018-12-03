# react-preloader

Library for displaying preloader when response is longer than **duration**.

## Motivation


![react-preloader](https://giphy.com/gifs/ckTGwxd9JMUJG4PaGe)

You can see gif right above to understand idea.

## Properties

### Required

#### url
Url of response - string

#### loaded
React component, when response is successful render this component

### Not required

#### fetch
Function to fetch data. Default - window.fetch

#### duration
Number - if response is longer this value - show preloader(in ms). Default - 500

#### errored
React component, when response is failed render this component. Default -
```js
() => <span>ERROR</span>
```

#### preloader
React component for display preloader. Default -
```js
() => <span>Loading...</span>
```

## More details and example

You can clone this repository and check example

## TODO

- [ ] Add tests
- [ ] Write clear description
- [ ] SSR


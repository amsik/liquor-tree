---
layout: default
id: index
title: What is it?
---

## Global Config

`Vue.config` is an object containing Vue's global configurations. You can modify its properties listed below before bootstrapping your application:

### silent

- **Type:** `boolean`

- **Default:** `false`

- **Usage:**

  ``` js
  Vue.config.silent = true
  ```

  Suppress all Vue logs and warnings.

### optionMergeStrategies

- **Type:** `{ [key: string]: Function }`

- **Default:** `{}`

- **Usage:**

  ``` js
  Vue.config.optionMergeStrategies._my_option = function (parent, child, vm) {
    return child + 1
  }

  const Profile = Vue.extend({
    _my_option: 1
  })

  // Profile.options._my_option = 2
  ```

  Define custom merging strategies for options.

  The merge strategy receives the value of that option defined on the parent and child instances as the first and second arguments, respectively. The context Vue instance is passed as the third argument.

- **See also:** [Custom Option Merging Strategies](../guide/mixins.html#Custom-Option-Merge-Strategies)

### devtools

- **Type:** `boolean`

- **Default:** `true` (`false` in production builds)

- **Usage:**

  ``` js
  // make sure to set this synchronously immediately after loading Vue
  Vue.config.devtools = true
  ```

  Configure whether to allow [vue-devtools](https://github.com/vuejs/vue-devtools) inspection. This option's default value is `true` in development builds and `false` in production builds. You can set it to `true` to enable inspection for production builds.

### errorHandler

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

  ``` js
  Vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` is a Vue-specific error info, e.g. which lifecycle hook
    // the error was found in. Only available in 2.2.0+
  }
  ```

  Assign a handler for uncaught errors during component render function and watchers. The handler gets called with the error and the Vue instance.

  > In 2.2.0+, this hook also captures errors in component lifecycle hooks. Also, when this hook is `undefined`, captured errors will be logged with `console.error` instead of crashing the app.

  > In 2.4.0+ this hook also captures errors thrown inside Vue custom event handlers.

  > Error tracking services [Sentry](https://sentry.io/for/vue/) and [Bugsnag](https://docs.bugsnag.com/platforms/browsers/vue/) provide official integrations using this option.

### warnHandler

> New in 2.4.0+

- **Type:** `Function`

- **Default:** `undefined`

- **Usage:**

  ``` js
  Vue.config.warnHandler = function (msg, vm, trace) {
    // `trace` is the component hierarchy trace
  }
  ```

  Assign a custom handler for runtime Vue warnings. Note this only works during development and is ignored in production.

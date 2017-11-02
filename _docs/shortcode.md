---
title: Shortcode
---

## Overview

To display field value on the website, besides the [helper functions](/displaying-fields/), the Meta Box plugin provides a simple shortcode `[rwmb_meta]` to help users show the value in the post content or widget text without opening theme files and inserting PHP code.

```php
[rwmb_meta meta_key="field_id" post_id="15" ...]
```

## Attributes

Attribute|Description
---|---
`meta_key`|The meta key, same as field ID. Required.
`post_id`|The post ID. Optional. If not defined, then the current post ID is used.

This shortcode works exactly like [rwmb_the_value()](/rwmb-the-value/) function with the same parameters.

If you pass other attributes to the shortcode, those attributes will be passed to [rwmb_the_value()](/rwmb-the-value/) function as the 2nd parameter.
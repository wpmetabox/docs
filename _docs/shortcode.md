---
title: Shortcode
---

To display field value on the website, besides the [helper functions](/displaying-fields/), the Meta Box plugin provides a simple shortcode `[rwmb_meta]` to help users show the value in the post content or widget text without opening theme files and inserting PHP code.

## Shortcode

The shortcode `[rwmb_meta]` take the following attributes:

```php
[rwmb_meta meta_key="field_id" post_id="15" ...]
```

This shortcode works exactly like [rwmb_the_value()](/rwmb-the-value/) function with the same parameters.

## Attributes

Attribute|Description
---|---
`meta_key`|The meta key, same as field ID. Required.
`post_id`|The post ID. Optional. If not defined, then the current post ID is used.
`size`|Image size, used for image fields only. If not present, the `thumbnail` size will be used.
`taxonomy`|The taxonomy for which to retrieve terms, used for taxonomy fields.
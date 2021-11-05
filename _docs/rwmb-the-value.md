---
title: rwmb_the_value
---

## Overview

`rwmb_the_value` is a helper function which outputs the HTML of the field.

It's very helpful in case you want to output a real Google maps for `map` field, or a player for `oembed` field.

Unlike [rwmb_get_value()](/rwmb-get-value/), this function always outputs human-readable content. For example, for a checkbox list, it outputs the labels of the choices, not the values.

## Usage

To display field's value in your theme, copy the following code and paste it in your theme's template file:

```php
rwmb_the_value( $field_id );
```

You can put it in the theme `single.php` or `template-parts/content.php` file, depending on your [theme structure](https://developer.wordpress.org/themes/basics/template-files/).

## Arguments

This function accepts 4 arguments as below:

```php
rwmb_the_value( $field_id, $args, $post_id, $echo );
```

Name|Description
---|---
`$field_id`|The field ID. Required.
`$args`|Extra arguments for some field types (image, file, etc.). Optional. Can be array or a string in format `param1=value1&param2=value2`. See more details in field types (on the left menu, section Fields). Optional.
`$post_id`|Post ID that custom fields are get from. Optional. If not present, current post ID is used.
`$echo`|Echo the HTML output (`true` - default) or return it (`false`).

## Returned value

By default, the function just outputs the HTML content of the field. If you set `$echo` to `false`, then it will return the HTML as a string.

For simple fields like `text`, `select`, HTML output is just the field value.

For other fields, HTML can be unordered list (`checkbox_list`), Google maps (`map`), list of users (`user`), etc.

{% include alert.html type="warning" content="Depends on the field types, the output can be different. See more details in field types (on the left menu, section Fields)." %}

## Undefined function error

If you're using `rwmb_the_value` in your theme, there may be a situation when an admin accidentally deactivate the Meta Box plugin and you will see error "Undefined function rwmb_the_value..." and your site will be broken.

To prevent this problem, a simple fix for that is adding the following code into your theme's `functions.php` file:

```php
if ( ! function_exists( 'rwmb_the_value' ) ) {
    function rwmb_the_value( $key, $args = '', $post_id = null, $echo = true ) {
        return false;
    }
}
```

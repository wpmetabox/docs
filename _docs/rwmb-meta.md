---
title: rwmb_meta
---

## Overview

`rwmb_meta` is the main helper function of the plugin, which helps you get the field value.

It's actually a wrapper of [rwmb_get_value()](/rwmb-get-value/) and [rwmb_the_value()](/rwmb-the-value/) functions to make sure the returned value is always helpful to developers.

More precisely:
- If field type is either `oembed` or `map`, it's exactly like [rwmb_the_value()](/rwmb-the-value/), but returns the field HTML output.
- For other field types, it's exactly like [rwmb_get_value()](/rwmb-get-value/).

## Usage

To get field value or displaying it in your theme, copy the following code and paste it in your theme's template file:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

You can put it in the theme `single.php` or `template-parts/content.php` file, depending on your [theme structure](https://developer.wordpress.org/themes/basics/template-files/).

## Arguments

The helper function `rwmb_meta` accepts 3 arguments as below:

```php
rwmb_meta( $field_id, $args, $post_id );
```

Name|Description
---|---
`$field_id`|The field ID. Required.
`$args`|Extra arguments for some field types (image, file, etc.). Optional. Can be array or a string in format `param1=value1&param2=value2`. See more details in field types (on the left menu, section Fields). Optional.
`$post_id`|Post ID that custom fields are get from. Optional. If not present, current post ID is used.

## Returned value

- If the field has a single value (not `multiple` nor `clone`), then the function returns that value.
- If the field has multiple values (`multiple` or `clone`), then the function returns an array of values.

This is an example how to display date of birth (which is a `date` field):

```php
echo rwmb_meta( 'dob' );
```

This is an example how to display list of interests (a `checkbox_list` field):

```php
$interests = rwmb_meta( 'interests' );
foreach ( $interests as $interest ) {
    echo $interest;
}
```

{% include alert.html type="warning" content="Depends on the field types, the returned value can be different. See more details in field types (on the left menu, section Fields)." %}

## Undefined function error

If you're using `rwmb_meta` in your theme, there may be a situation when an admin accidentally deactivate the Meta Box plugin and you will see error "Undefined function rwmb_meta..." and your site will be broken.

To prevent this problem, a simple fix for that is adding the following code into your theme's `functions.php` file:

```php
if ( ! function_exists( 'rwmb_meta' ) ) {
    function rwmb_meta( $key, $args = '', $post_id = null ) {
        return false;
    }
}
```

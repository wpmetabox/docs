---
title: rwmb_get_value
---

## Overview

`rwmb_get_value` is a helper function which helps you get the field value.

It's actually a wrapper of `get_post_meta()` function with some additions to match [the way the plugin saves post meta in the database](/database/).

It also adds some additional information to the returned value (such as image info) to make it's easier for developers.

## Usage

To get field value or displaying it in your theme, copy the following code and paste it in your theme's template file:

```php
$value = rwmb_get_value( $field_id );
echo $value;
```

You can put it in the theme `single.php` or `template-parts/content.php` file, depending on your [theme structure](https://developer.wordpress.org/themes/basics/template-files/).

## Arguments

The helper function `rwmb_get_value` accepts 3 arguments as below:

```php
rwmb_get_value( $field_id, $args, $post_id );
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
echo rwmb_get_value( 'dob' );
```

This is an example how to display list of interests (a `checkbox_list` field):

```php
$interests = rwmb_get_value( 'interests' );
foreach ( $interests as $interest ) {
    echo $interest;
}
```

{% include alert.html type="warning" content="Depends on the field types, the returned value can be different. See more details in field types (on the left menu, section Fields)." %}

## Undefined function error

If you're using `rwmb_get_value` in your theme, there may be a situation when an admin accidentally deactivate the Meta Box plugin and you will see error "Undefined function rwmb_get_value..." and your site will be broken.

To prevent this problem, a simple fix for that is adding the following code into your theme's `functions.php` file:

```php
if ( ! function_exists( 'rwmb_get_value' ) ) {
    function rwmb_get_value( $key, $args = '', $post_id = null ) {
        return false;
    }
}
```

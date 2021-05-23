---
title: Displaying fields
---

There are 4 ways to display a field created by Meta Box:

- **Using a page builder**: which helps you to select and display fields visually anywhere on your site when the page builder is active.
- **Using MB Views**: a powerful and flexible way to select and display fields with Twig (a template engine). It supports conditions, loops, and shortcode that can be embedded anywhere.
- **Using code** via helper functions: the best way to display fields if you're familiar with editing theme/plugin PHP files.
- **Using shortcode**

## Using a page builder

If you use a page builder like Elementor to build your website, then using it to display Meta Box fields is the most intuitive way. Meta Box integrates well with:

- Elementor: via [our free integration extension](https://metabox.io/plugins/mb-elementor-integrator/)
- Beaver Builder: via [our free integration extension](https://metabox.io/plugins/meta-box-beaver-themer-integrator/)
- Brizy: official support by Brizy
- Bricks: official support by Bricks

For other page builders like Oxygen and Divi, you can use their existing module to display custom fields to display Meta Box fields.

Here is a video tutorial on how to use Elementor to display Meta Box's fields:

<iframe width="560" height="315" src="https://www.youtube.com/embed/NzR9lii2S30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Using MB Views

[MB Views](https://metabox.io/plugins/mb-views/) helps you to select fields and output them into an HTML template. You can also add your own CSS/JavaScript to style fields the way you want.

With MB Views, you have full control of the HTML output and the location (on which page) that views render.

Here is a video tutorial on using MB Views:

<iframe width="560" height="315" src="https://www.youtube.com/embed/4udvu8PqfkE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

For more details on using MB Views, please see [this documentation](/extensions/mb-views/).

## Using code

To get custom field value in WordPress or display it in your theme, use the `rwmb_meta` helper function. Copy the following code and paste it in your theme's template file:

```php
$value = rwmb_meta( $field_id, $args = [], $post_id = null );
echo $value;
```

You can put it in the theme `single.php` or `template-parts/content.php` file, depending on your [theme structure](https://developer.wordpress.org/themes/basics/template-files/).

The function accepts 3 arguments:

Name|Description
---|---
`$field_id`|The custom field ID. Required.
`$args`|Extra arguments for some custom field types (image, file, etc.). Optional. Can be array or a string in format `param1=value1&param2=value2`. See more details in the custom field types (on the left menu, section Fields). Optional.
`$post_id`|Post ID that custom field gets from. Optional. If not present, the current post ID is used.

Return value:

- If the custom field has a single value (not `multiple` nor `clone`), then the function returns that value.
- If the custom field has multiple values (`multiple` or `clone`), then the function returns an array of values.

This is an example of how to display the date of birth (which is a `date` field):

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

{% include alert.html type="warning" content="Depends on the custom field types, the returned value can be different. See more details in custom field types (on the left menu, section Fields)." %}

### Helper functions

Besides `rwmb_meta`, Meta Box also provides 2 more helper functions that work with the custom field value:

- [rwmb_meta()](/rwmb-meta/)
- [rwmb_the_value()](/rwmb-the-value/)
- [rwmb_get_value()](/rwmb-get-value/)

In order to understand the usage of helper functions and the difference between them, please see this video tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/NFZE4Sxi2p4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Undefined function error

If you're using `rwmb_meta` in your theme, there may be a situation when an admin accidentally deactivates the Meta Box plugin and you will see the error "Undefined function rwmb_meta..." and your site will be broken.

To prevent this problem, a simple fix for that is adding the following code into your theme's `functions.php` file:

```php
if ( ! function_exists( 'rwmb_meta' ) ) {
    function rwmb_meta( $key, $args = [], $post_id = null ) {
        return null;
    }
}
```

### Note

The `rwmb_meta` function is a wrapper of `get_post_meta` with some additions to match [the way the plugin saves custom fields in the database](/database/). It also adds some additional information to the returned value (such as image info) to make it's easier for developers.

However, you can always use `get_post_meta` to get the custom field value stored in the database. `print_r` might help you to see how the custom field value is formatted.

If the helper functions don't return the correct value, then please check your code that registers meta boxes. Do you register meta boxes under some conditions like `is_admin()` or inside another hook? Do you put this snippet:

```php
add_filter( 'rwmb_meta_boxes', 'your_function' );
```

right in your theme's `functions.php` file or in your plugin file without any condition?

If you do, then please remove all the conditions. The conditions might prevent the plugin to get the field settings in the frontend. And in that case, it fallback to just `get_post_meta()`, which might return an unexpected value (single value for checkbox list, for example).


## Using our shortcode

To make it easy for users to insert custom fields' values inside post content/widget or anywhere, Meta Box provides a shortcode to help you get and display field values.

To display a field value for the curren post:

```
[rwmb_meta id="field_id"]
```

To display a field value for a specific post:

[rwmb_meta id="field_id" object_id="123"]
```

The shortcode works similar to the `rwmb_meta` helper function above. For more details about the shortcode, please see [this documentation](/shortcode/).
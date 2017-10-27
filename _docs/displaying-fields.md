---
title: Displaying fields
---

To get field meta value, use this function:

```php
rwmb_meta( $field_id, $args = array(), $post_id = null );
```

To display field value in the frontend, just put the code below in your theme's template file:

```php
echo rwmb_meta( $field_id, $args, $post_id );
```

You can omit `$args` and/or `$post_id`. In that case, the function will return simple value (for text, radio, select) for the current post in the loop.

**Note:** Since version 4.8.0, in order to make the helper function works properly in the front end, the code that registers meta boxes and custom fields must run in BOTH front end and admin area. E.g, avoid writing like this:

```php
if ( is_admin() ) {
    add_filter( 'rwmb_meta_boxes', 'prefix_register_meta_boxes' );
    function prefix_register_meta_boxes() {
        // Code
    }
}
```

Instead, write this:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_meta_boxes' );
function prefix_register_meta_boxes() {
    // Code
}
```

## Arguments

Name|Description
---|---
`$field_id`|The field ID.
`$args`|Array of arguments or a string in format `param=value1&amp;param2=value2`. See below for supported arguments.
`$post_id`|Post ID. Optional. If not present, current post ID is used.

List of arguments for `$args`:

Name|Description
---|---
`type`|Field type. Required for all fields for version prior to 4.8.0. Since 4.8.0, this is required only for `map` and `oembed` to display rich media.
`multiple`|Does field has multiple values (true or false)? For fields that always have multiple values (checkbox list, autocomplete, file, image) it's automatically set to `true` and you can omit it. Not used since 4.8.0.
`clone`|Is field cloneable? Not used since 4.8.0.
`taxonomy`|Taxonomy. Required for `taxonomy` and `taxonomy_advanced` for version prior to 4.8.0. See taxonomy field below for more info.
`size`|Image size. Used for image fields only. If missed, `thumbnail` will be used. See image field below for more info

## Returned value

- If the field has a single value (not `multiple`, not `clone`), then the function returns the value of the field.
- If the field has multiple values (`multiple` or `clone`), then the function returns an array of values.

This is an example how to display date of birth (which is a `date` field):

```php
echo rwmb_meta( 'dob' );
```

This is an example how to display list of interests (a `checkbox_list` field):

```php
$interests = rwmb_meta( 'interests' ); // Since 4.8.0
$interests = rwmb_meta( 'interests', 'type=checkbox_list' ); // Prior to 4.8.0

echo implode( ', ', $interests );
```

For specific field types, please see below:

### Taxonomy

For `taxonomy` and `taxonomy_advanced` field, the helper function returns list of terms object, similar to `get_terms` function.

**Note:** Prior to 4.8.0, you must set `type=taxonomy&amp;taxonomy=TAXONOMY` in `$args` to make it work properly.

This example shows how to display list of terms:

```php
$terms = rwmb_meta( 'field_id' );
$content = '';
if ( !empty( $terms ) ) {
    $content .= '<ul>';
    foreach ( $terms as $term ) {
        $content .= sprintf(
            '<li><a title="%s" href="%s">%s</a></li>',
            esc_attr( $term->name ),
            esc_url( get_term_link( $term, 'tax_slug' ) ),
            esc_html( $term->name )
        );
    }
}
echo $content;
```

### User

For `user` field, the helper function returns user ID.

### WYSIWYG

The WYSIWYG field only displays the raw content in HTML format. It doesn't wrap paragraphs in `p` tag by default or render shortcodes as in the `the_content()` function. To do that, you need to use the following code:

```php
$content = rwmb_meta( 'field_id' );
$content = wpautop( $content ); // Wrap paragraphs in p tags
$content = do_shortcode( $content ); // Render shortcodes
echo $content;

// Short version
echo do_shortcode( wpautop( rwmb_meta( 'field_id' ) ) );
```

## Prevent undefined function `rwmb_meta`

If you're using `rwmb_meta` in your theme, there may be a situation when an admin accidentally deactivate the Meta Box plugin and you will see error "Undefined function rwmb_meta..." and your site will be broken.

To prevent this problem, a simple fix for that is adding the following code into your theme's `functions.php` file:

```php
if ( ! function_exists( 'rwmb_meta' ) ) {
    function rwmb_meta( $key, $args = '', $post_id = null ) {
        return false;
    }
}
```

## For developers

The `rwmb_meta` function is just a wrapper of `get_post_meta` with some additions to match [the way the plugin saves post meta in the database](/how-post-meta-is-saved-in-the-database/). It also adds some additional information to the returned value (such as image info) to make it's easier for developers.

However, you can always use `get_post_meta` to get the value stored in the custom fields. `print_r` might help you to see how the value is stored in the database.
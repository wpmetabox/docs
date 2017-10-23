---
title: Get custom field value and display in the front end
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

### File

For `file`, `file_advanced`, `file_upload`, the function accepts the following parameters in `$args`:

Name|Description
---|---
`limit`|Limit the number of returned files.

The helper function function returns an array of files, each file has the following information:

```php
array(
    'ID'   => 123,
    'name' => 'intro.txt',
    'path' => '/var/www/wp-content/uploads/intro.txt',
    'url' => 'https://example.com/wp-content/uploads/intro.txt',
    'title' => 'Introduction',
);
```

This is an example how to display links to download uploaded files:

```php
$files = rwmb_meta( 'info' ); // Since 4.8.0
$files = rwmb_meta( 'info', 'type=file' ); // Prior to 4.8.0

if ( !empty( $files ) ) {
    foreach ( $files as $file ) {
        echo "<a title="{$file['name']}" href="{$file['url']}">{$file['name']}</a>";
    }
}
```

### Image

For `image`, `image_advanced`, `plupload_image`, `thickbox_image` fields, the function accepts the following parameters in `$args`:

Name|Description
---|---
`size`|Image size returned. Optional. If missed, `thumbnail` will be used.
`limit`|Limit the number of returned images.

The function returns an array of images, each image has the following information:

```php
array(
    'ID'   => 123,
    'name' => 'logo-150x80.png',
    'path' => '/var/www/wp-content/uploads/logo-150x80.png',
    'url' => 'https://example.com/wp-content/uploads/logo-150x80.png',
    'width' => 150,
    'height' => 80,
    'full_url' => 'https://example.com/wp-content/uploads/logo.png',
    'title' => 'Logo',
    'caption' => 'Logo caption',
    'description' => 'Used in the header',
    'alt' => 'Logo ALT text',
    'srcset' => 'large.jpg 1920w, medium.jpg 960w, small.jpg 480w' // List of responsive image src, added in 4.8.0
    'sizes' => array(), // List of image sizes. See https://codex.wordpress.org/Function_Reference/wp_get_attachment_metadata
    'image_meta' => array(), // List of image meta. See https://codex.wordpress.org/Function_Reference/wp_get_attachment_metadata
)
```

There's one argument in the returned array that you might be interested in: `full_url`. It's the URL of the full-size image (original image). You can use it for lightbox effect or in a slider with thumbnails.

This is an example how to Display uploaded images with lightbox effect:

```php
$images = rwmb_meta( 'gallery', 'size=YOURSIZE' ); // Since 4.8.0
$images = rwmb_meta( 'gallery', 'type=image&size=YOURSIZE' ); // Prior to 4.8.0

if ( !empty( $images ) ) {
    foreach ( $images as $image ) {
        echo '<a href="', esc_url( $image['full_url'] ), '" title="', esc_attr( $image['title'] ), '" rel="lightbox"><img style="padding:5px" src="', esc_url( $image['url'] ), '"  alt="', esc_attr( $image['alt'] ), '"></a>';
    }
}
```

### Map

For `map`, the function accepts the following parameters in `$args`:

```php
$args = array(
    'type' => 'map', // Required
    'width' => '640px', // Map width, default is 640px. Can be '%' or 'px'
    'height' => '480px', // Map height, default is 480px. Can be '%' or 'px'
    'zoom' => 14, // Map zoom, default is the value set in admin, and if it's omitted - 14
    'marker' => true, // Display marker? Default is 'true',
    'marker_title' => '', // Marker title when hover
    'marker_icon' => '', // URL to the custom marker icon. If missed, use default icon.
    'info_window' => '<h3>Info Window Title</h3>Info window content. HTML <strong>allowed</strong>', // Info window content, can be anything. HTML allowed.
    'js_options' => array()
);
```

All the arguments are self-explained.

A good thing here is you can add HTML to `info_window`. Just remember the content will be passed to Javascript, so things like quotes (single or double) **should be avoided**. You should use plain tags like `strong`, `em`, `h2`, `h3`, `h4`, ... and style them by CSS.

If you need more advanced options for the map, use the `js_options` parameter, which accept an array of arguments from [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference#MapOptions). For example:

```php
$args = array(
    'type' => 'map',
    'width' => '640px',
    'height' => '480px',
    'js_options' => array(
        'mapTypeId' => 'HYBRID',
        'zoomControl' => false,
        'zoom' => 10, // You can use 'zoom' inside 'js_options' or as a separated parameter
    ),
);
```

Note: The function returns the HTML markup for the map, **NOT** the value stored in the custom field.

To display the map, simply use the code below:

```php
echo rwmb_meta( 'field_id', $args );
```

To get the value stored in the custom field, please use the code below:

```php
$location = get_post_meta( get_the_ID(), 'field_id', true );
// returns "latitude,longitude,zoom"
```

### Oembed

For `oembed` field, the helper function returns the rendered HTML markup for the object (video, audio, etc.). In order to show the HTML, you must set `type=oembed` in the `$args` as follow

```php
echo rwmb_meta( 'field_id', 'type=oembed' );
```

To get the value stored in the custom field, e.g. the URL of the oembed object, please use the code below:

```php
$url = get_post_meta( get_the_ID(), 'field_id', true );
// returns "https://youtube.com/watch?v=abcXYZ"
```

### Post

For `post` field, the helper function returns post ID.

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

The `rwmb_meta` function is just a wrapper of `get_post_meta` with some additions to match [the way the plugin saves post meta in the database](/how-post-meta-is-saved-in-the-database/). It also adds some additional information to the returned value (such as image info) to make it's easier for users.

However, you can always use `get_post_meta` to get the value stored in the custom fields. `print_r` might help you to see how the value is stored in the database.
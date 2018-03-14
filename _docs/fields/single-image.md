---
title: Single image
---

## Overview

The single image field allows user to select or upload one image via the WordPress media library. It's similar to the [image_advanced](/fields/image-advanced/) field, but limit to select only one image.

## Screenshot

![single image](https://i.imgur.com/c7Pa4eH.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta. `true` or `false` (default). Optional. Note: it might affect other posts if you use same file for multiple posts.

## Sample code

```php
array(
    'type' => 'single_image',
    'name' => 'Single Image',
    'id'   => 'my_image',
),
```

## Data

This field saves the image ID in the post meta.

## Template usage

To get the uploaded image, use the helper function [rwmb_meta()](/rwmb-meta/):

```php
$image = rwmb_meta( 'info', array( 'size' => 'thumbnail' ) );
echo '<a href="', $image['full_url'], '"><img src="', $image['url'], '"></a>';
```

This 2nd argument for `rwmb_meta` is an array of extra parameters and accepts the following parameters:

Name|Description
---|---
`size`|Image size returned. Optional. If missed, `thumbnail` will be used.

This helper function returns an array of image information:

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
    'srcset' => 'large.jpg 1920w, medium.jpg 960w, small.jpg 480w' // List of responsive image src
    'sizes' => array(), // List of image sizes. See https://codex.wordpress.org/Function_Reference/wp_get_attachment_metadata
    'image_meta' => array(), // List of image meta. See https://codex.wordpress.org/Function_Reference/wp_get_attachment_metadata
);
```

If you only want to display the uploaded image, use the [rwmb_the_value()](/rwmb-the-value/):

```php
rwmb_the_value( $field_id, array( 'size' => 'thumbnail' ) );
```

which outputs:

```html
<a href="link/to/full-size"><img src="link/to/image"></a>
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

## Filters

This field inherits from image advanced and thus, uses the [same filters](/fields/image-advanced/) to change the texts that display on the screen.

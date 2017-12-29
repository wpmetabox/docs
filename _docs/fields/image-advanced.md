---
title: Image Advanced
---

## Overview

The image advanced field uses WordPress media popup for selecting / uploading images. You can also reorder images.

## Screenshot

![image advanced](https://i.imgur.com/tzksNdI.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded images. Optional.
`force_delete` | Whether or not delete the images from Media Library when deleting them from post meta. `true` or `false` (default). Optional. Note: it might affect other posts if you use same image for multiple posts.
`max_status` | Display how many images uploaded/remaining. Applied only when `max_file_uploads` is defined. `true` (default) or `false`. Optional.
`image_size` | Image size that displays in the edit page. Optional. Default `thumbnail`.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
array(
    'id'               => 'image',
    'name'             => 'Image Advanced',
    'type'             => 'image_advanced',

    // Delete image from Media Library when remove it from post meta?
    // Note: it might affect other posts if you use same image for multiple posts
    'force_delete'     => false,

    // Maximum image uploads.
    'max_file_uploads' => 2,

    // Do not show how many images uploaded/remaining.
    'max_status'       => 'false',

    // Image size that displays in the edit page.
    'image_size'       => 'thumbnail',
),
```

## Data

Similar to file field, this field saves multiple values (attachment IDs) in the database. Each value (attachment ID) and is store in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

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

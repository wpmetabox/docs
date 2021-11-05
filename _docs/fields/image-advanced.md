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
`image_size` | Image size displays in the edit page. Optional. Default `thumbnail`. Image size is used to make sure images are not blurry. It’s not meant to display images with the exact width and height. Images are always displayed as square.
`add_to` | Whether to add new images to the beginning or the end of the list. `beginning` or `end`. Default `end`. Optional.

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
    'max_status'       => false,

    // Image size that displays in the edit page. Possible sizes small,medium,large,original
    'image_size'       => 'thumbnail',
),
```

## Data

Similar to file field, this field saves multiple values (attachment IDs) in the database. Each value (attachment ID) is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

## Template usage

{% include fields/image-template-usage.html %}

## Filters

This field inherits from file advanced and thus, uses the [same filters](/fields/file-advanced/) to change the texts displaying on the screen.

Filter|Default|Description
---|---|---
`rwmb_media_add_string`|+ Add Media|Add new image string
`rwmb_media_single_images_string`|image|Singular "image" string
`rwmb_media_multiple_images_string`|images|Plural "images" string
`rwmb_media_remove_string`|Remove|Image remove string
`rwmb_media_edit_string`|Edit|Image edit string
`rwmb_media_view_string`|View|Image view string

The code below changes the "+ Add Media" string:

```php
add_filter( 'rwmb_media_add_string', 'prefix_change_add_string' );
function prefix_change_add_string() {
    return '+ New Image';
}
```

## See more

- [How to display uploaded images as a WordPress image gallery?](https://metabox.io/display-uploaded-images-as-wordpress-image-gallery/)

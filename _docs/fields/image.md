---
title: Image
---

## Overview

The image field creates a simple image upload with default UI like `<input type="file">`. Unlike other media fields, this field doesn't use Media Library UI to upload images.

This field is very similar to [file](/fields/file/). The only difference is that the file field allows to upload all file types while this field allows only images.

## Screenshot

![image](https://i.imgur.com/8GFxWKP.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded images. Optional.
`force_delete` | Whether or not delete the images from Media Library when deleting them from post meta. `true` or `false` (default). Optional. Note: it might affect other posts if you use same image for multiple posts.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
array(
    'name'             => 'Image Upload',
    'id'               => 'field_id',
    'type'             => 'image',

    // Delete image from Media Library when remove it from post meta?
    // Note: it might affect other posts if you use same image for multiple posts
    'force_delete'     => false,

    // Maximum image uploads
    // 'max_file_uploads' => 2,
),
```

## Data

This field saves multiple values (attachment IDs) in the database. Each value (attachment ID) is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

## Template usage

{% include fields/image-template-usage.html %}

## Filters

This field inherits from file and thus, uses the [same filters](/fields/file/) to change the texts that displayed on the screen.

Filter|Default|Description
---|---|---
`rwmb_file_upload_string`|Upload files|file upload string
`rwmb_file_add_string`|+ Add new file|Add new file string
`rwmb_file_delete_string`|Delete|file delete string
`rwmb_file_edit_string`|Edit|file edit string

All filters above accept 2 parameters:

- `$string`: the string need to be changed
- `$field`: array of field attribute

The code below changes the "+ Add new file" string:

```php
add_filter( 'rwmb_file_add_string', 'prefix_change_add_string' );
function prefix_change_add_string() {
    return '+ New file';
}
```

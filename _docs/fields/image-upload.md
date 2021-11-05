---
title: Image Upload
---

## Overview

The image upload field displays an inline upload area that you can drag and drop images into.

This field is very similar to [image advanced](/fields/image-advanced/). The only difference is the image advanced shows a **+ Add Media** button instead of the inline upload area and this field does not allow to access the Media Library.

## Screenshot

![image upload](https://i.imgur.com/Ev4iwoQ.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta. `true` or `false` (default). Optional. Note: it might affect other posts if you use same file for multiple posts.
`max_status` | Display how many files uploaded/remaining. Applied only when `max_file_uploads` is defined. `true` (default) or `false`. Optional.
`max_file_size` | Maximum file size that the user can upload, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. e.g. "10mb" or "1gb".
`image_size` | Image size displays in the edit page. Optional. Default `thumbnail`.
`add_to` | Whether to add new images to the beginning or the end of the list. `beginning` or `end`. Default `end`. Optional.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
array(
    'id'               => 'image',
    'name'             => 'Image upload',
    'type'             => 'image_upload',

    // Delete file from Media Library when remove it from post meta?
    // Note: it might affect other posts if you use same file for multiple posts
    'force_delete'     => false,

    // Maximum file uploads.
    'max_file_uploads' => 2,

    // Do not show how many files uploaded/remaining.
    'max_status'       => 'false',

    // Image size that displays in the edit page.
    'image_size'       => 'thumbnail',
),
```

## Data

Similar to file field, this field saves multiple values (attachment IDs) in the database. Each value (attachment ID) is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

## Template usage

{% include fields/image-template-usage.html %}

## Filters

This field inherits from file upload and thus, uses the [same filters](/fields/file-upload/) to change the texts displaying on the screen.

Filter|Default|Description
---|---|---
`rwmb_media_add_string`|+ Add Media|Add new file string
`rwmb_media_single_files_string`|file|Singular "file" string
`rwmb_media_multiple_files_string`|files|Plural "files" string
`rwmb_media_remove_string`|Remove|File remove string
`rwmb_media_edit_string`|Edit|File edit string
`rwmb_media_view_string`|View|File view string
`rwmb_media_select_string`|Select Files|Select files string
`rwmb_media_or_string`|or|The string "or" in "Drop files here to upload or Select Files"
`rwmb_media_upload_instructions_string`|Drop files here to upload|The upload instruction string

The code below changes the "+ Add Media" string:

```php
add_filter( 'rwmb_media_add_string', 'prefix_change_add_string' );
function prefix_change_add_string() {
    return '+ New File';
}
```

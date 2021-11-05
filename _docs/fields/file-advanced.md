---
title: File Advanced
---

## Overview

The file advanced field uses WordPress media popup for selecting / uploading files. You can also reorder files.

## Screenshot

![file advanced](https://i.imgur.com/mqR9Tue.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta. `true` or `false` (default). Optional. Note: it might affect other posts if you use same file for multiple posts.
`mime_type` | MIME type of files which we want to show in Media Library. Note: this is a filter for items in Media popup, it doesn't restrict file types when upload.
`max_status` | Display how many files uploaded/remaining. Applied only when `max_file_uploads` is defined. `true` (default) or `false`. Optional.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
array(
    'id'               => 'file',
    'name'             => 'File Advanced',
    'type'             => 'file_advanced',

    // Delete file from Media Library when remove it from post meta?
    // Note: it might affect other posts if you use same file for multiple posts
    'force_delete'     => false,

    // Maximum file uploads.
    'max_file_uploads' => 2,

    // File types.
    // 'mime_type'        => 'application,audio,video',

    // Do not show how many files uploaded/remaining.
    'max_status'       => 'false',
),
```

## Data

Similar to file field, this field saves multiple values (attachment IDs) in the database. Each value (attachment ID) is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

## Template usage

{% include fields/file-template-usage.html %}

## Filters

This field has some filters to change the texts displayed on the screen..

Filter|Default|Description
---|---|---
`rwmb_media_add_string`|+ Add Media|Add new file string
`rwmb_media_single_files_string`|file|Singular "file" string
`rwmb_media_multiple_files_string`|files|Plural "files" string
`rwmb_media_remove_string`|Remove|File remove string
`rwmb_media_edit_string`|Edit|File edit string
`rwmb_media_view_string`|View|File view string

The code below changes the "+ Add Media" string:

```php
add_filter( 'rwmb_media_add_string', 'prefix_change_add_string' );
function prefix_change_add_string() {
    return '+ New File';
}
```

---
title: File
---

## Overview

The file field creates a simple file upload with default UI like `<input type="file">`. Unlike other media fields, this field doesn't use Media Library UI to upload files.

## Screenshot

![file upload](https://i.imgur.com/LIWgUZW.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta. `true` or `false` (default). Optional. Note: it might affect other posts if you use same file for multiple posts.
`upload_dir` | Full path to custom upload folder. Added in version 4.16.
`unique_filename_callback` | Your custom callback to set the uploaded file name. Works only when uploading to a custom folder. Added in version 5.4.0.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
[
    'id'               => 'file',
    'name'             => 'File',
    'type'             => 'file',

    // Delete file from Media Library when remove it from post meta?
    // Note: it might affect other posts if you use same file for multiple posts
    'force_delete'     => false,

    // Maximum file uploads.
    'max_file_uploads' => 2,
],
```

## Data

This field saves multiple values (attachment IDs) in the database. Each value (attachment ID) is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

## Upload to custom folder

Since Meta Box 4.16, you're able to upload files to custom folders rather than default WordPress `uploads` folder.

To do that, simply set `'upload_dir' => '/full/path/to/folder/'` in your field settings.

You can also use WordPress constants to specify the path easier, such as:

```
'upload_dir' => ABSPATH . '/invoices/',

// or

'upload_dir' => WP_CONTENT_DIR . '/invoices/',
'unique_filename_callback' => 'my_function',
```

The custom folder should be inside your your WordPress website's root folder. So you can store it in `/uploads/`, `/downloads/` folders if you want. The configuration is *per* field, so you can have one field storing files in `/downloads/` and another field in `/invoices/`.

The uploaded file name is normally the original file name and maybe with suffix `-1`, `-2` to prevent duplicated names. In case you want to set custom names for files, pass your custom callback to the setting `unique_filename_callback`.

Unlike the normal case, where files are added to the WordPress Media Library, files uploaded to custom folders are not available in the Media Library. Thus, the data saved in the custom fields is **file URL**, not attachment ID.

To get the field data, you can use `get_post_meta()` to get file URL, or use `rwmb_meta()` to get an array of file details which includes: `path`, `url` and `name`.

## Template usage

{% include fields/file-template-usage.html %}

## Filters

This field has some filters to change the texts displayed on the screen..

Filter|Default|Description
---|---|---
`rwmb_file_upload_string`|Upload Files|File upload string
`rwmb_file_add_string`|+ Add new file|Add new file string
`rwmb_file_delete_string`|Delete|File delete string
`rwmb_file_edit_string`|Edit|File edit string

All filters above accept 2 parameters:

- `$string`: the string need to be changed
- `$field`: array of field attribute

The code below changes the "+ Add new file" string:

```php
add_filter( 'rwmb_file_add_string', function () {
    return '+ New File';
} );
```

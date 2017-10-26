---
title: File
---

## Overview

The file field creates a simple file upload with default UI like `<input type="file" />`. Unlike other media fields, this field doesn't use Media Library UI to upload files.

## Screenshot

![file upload](https://i.imgur.com/LIWgUZW.png)

## Settings

Besides the [common settings](/fields/), this field has the following specific settings:

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta. `true` or `false` (default). Optional. Note: it might affect other posts if you use same file for multiple posts.
`mime_type` | Restrict upload to files with a specific MIME type.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
array(
    'id'               => 'file',
    'name'             => 'File',
    'type'             => 'file',

    // Delete file from Media Library when remove it from post meta?
    // Note: it might affect other posts if you use same file for multiple posts
    'force_delete'     => false,

    // Maximum file uploads.
    'max_file_uploads' => 2,
),
```

## Data

This field saves multiple values (attachment IDs) in the database. Each value and is store in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

## Template usage

To get the uploaded files information, use the helper function [rwmb_meta()](/rwmb-meta/). This function returns an array of files, each file has the following information:

```php
array(
    'ID'    => 123,
    'name'  => 'intro.txt',
    'path'  => '/var/www/wp-content/uploads/intro.txt',
    'url'   => 'https://example.com/wp-content/uploads/intro.txt',
    'title' => 'Introduction',
);
```

This is an example how to display links to download uploaded files:

```php
$files = rwmb_meta( 'info' );

if ( ! empty( $files ) ) {
    foreach ( $files as $file ) {
        ?>
        <a href="<?php echo $file['url']; ?>"><?php echo $file['name']; ?></a>
        <?php
    }
}
```

In case you want to get only 1 file, use the `limit` parameter for the helper function:

```php
$files = rwmb_meta( 'info', 'limit=1' );

if ( ! empty( $files ) ) {
    $file = reset( $files );
    ?>
    <a href="<?php echo $file['url']; ?>">Download File</a>
    <?php
}
```

## Filters

This field has some filters to change the texts displayed to users.

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
add_filter( 'rwmb_file_add_string', 'prefix_change_add_string' );
function prefix_change_add_string() {
    return esc_html__( '+ New File', 'textdomain' );
}
```

---
title: How post meta is saved in the database?
---

Wondering how the Meta Box plugin stores meta values in the database? This documentation will explain how the plugin store custom fields' values in the `wp_postmeta` table.

## For non-cloneable fields

For non-cloneable fields, e.g. with no `clone` attribute or has it set to `false`, the plugin stores all meta data in the data base in a WordPress-compatible way as following:

- If field has single value, it will be saved in **single row** of `wp_postmeta` table;
- If field has multiple values (set by `'multiple' => true` like `select`, `checkbox_list`, `file`, `image`, etc.), **each value will be saved in single row** of `wp_postmeta` table

This way you can use `add_post_meta` or `update_post_meta` to update meta values and `get_post_meta` to retrieve them. There's nothing different from using these functions for Meta Box and for other custom fields at all.

## For cloneable fields

For cloneable fields, cloned values are stored as a **serialized array in a single row** in the `wp_postmeta` table. The plugin does not to store cloned values in separated rows in the database because it’s confusing that we don’t know these are values of clones, or values of the field with `'multiple' => true`. To make it work for all field types and for consistency, storing cloned values in a single row of the database is a better choice.

Due to this reason, you still can use `get_post_meta` function to retrieve meta value from the database (WordPress automatically unserializes string and returns an array). You will get an array of all cloned values.

## Specific fields

For normal fields, the values saved in the database is the value entered or selected by users. But for some specific fields, the values store is not as obvious as that. The detail is listed below.

Field Type|Value stored in the database
---|---
`file`, `file_advanced`, `image`, `image_select`, `plupload_image`, `thickbox_image` | Attachment IDs. Note that these fields are always `multiple`.
`map`| A comma separated string of "latitude,longitude".
`password`| A hash of password since 4.8.0 using `wp_hash_password()` function. Previously it stores simple plan text password.
`post`| Post ID
`taxonomy`| Nothing is stored in the database. This field only sets terms for the post.
`taxonomy_advanced`| A comma separated string of term IDs.
`user`| User ID

## Notes

Although you can use `get_post_meta` to retrieve meta value, it's recommended to [use plugin's helper function](/get-meta-value/) to get the value and display it in the frontend. The helper function takes care of all the logic above and returns to you the needed data in a correct format.

To understand how the value is stored in the database, please use `print_r` function, like this:

```php
$value = get_post_meta( get_the_ID(), 'field_id', true ); // Last param should be 'false' if field is multiple
print_r( $value );
```
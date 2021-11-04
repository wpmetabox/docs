---
title: Database
---

## Overview

Wondering how the Meta Box plugin stores custom field value in the database? Understanding this can help you get the custom field value easily and understand the returned value from `get_post_meta` or [helper functions](/displaying-fields/).

For all custom fields, the `id` is always the `meta_key` and the value is the `meta_value` in the `wp_postmeta` table. The sections below describe how the value is formatted.

## Non-cloneable fields

For non-cloneable fields, the plugin stores field value in the data base in a WordPress-compatible way as following:

- If field has single value, it will be saved in single row in the post meta table.
- If field has multiple values (set by `'multiple' => true` like `select`, `checkbox_list`, `file`, `image`, etc.), each value will be saved in single row in the post meta table.

This way you can use `add_post_meta` or `update_post_meta` to update meta values and `get_post_meta` to retrieve them.

## Cloneable fields

For cloneable fields, cloned values are stored as a serialized array in a single row in the post meta table.

The plugin does not store cloned values in separated rows in the database because it's confusing that we don't know these are values of clones, or values of the field with `'multiple' => true`. To make it work for all field types and for consistency, storing cloned values in a single row of the database is a better choice.

Due to this reason, you still can use `get_post_meta` function to retrieve field value from the database (WordPress automatically unserializes string and returns an array). You will get an array of all cloned values.

**Summary:**

Cloneable|Multiple|Custom Field Value
---|---|---
N|N|Single row
N|Y|Multiple rows
Y|N|Serialized array `[value1, value2]` in a single row
Y|Y|Serialized of 2-dimensional array `[[value11,value12], [value21, value22]]` in a single row

{% include alert.html content="Since version 4.14.7, you are able to store cloned values in multiple rows in the database. See [this post](https://metabox.io/introducing-clone-as-multiple-feature/) for more details." %}

## Field value

For normal fields, the saved value in the database is the value entered or selected by users. But for some specific fields, the stored values is not as obvious as that (for example, `checkbox` saves the checked/unchecked status as `1` and `0`). Please see more details in each field in the left menu, section Fields.

## Notes

Although you can use `get_post_meta` to retrieve meta value, it's recommended to [use helper functions](/displaying-fields/) to get the value and display it in the frontend. The helper function takes care of all the logic above and returns to you the needed data in a correct format.

To understand how the value is stored in the database, please use `print_r` function, like this:

```php
$value = get_post_meta( get_the_ID(), 'field_id', true ); // Last param should be 'false' if field is multiple
echo '<pre>';
print_r( $value );
echo '</pre>';
```

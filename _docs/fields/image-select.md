---
title: Image Select
---

## Overview

The image select field allows you to select a choice via images. It works similar to radio / checkbox field, but uses images for more user-friendly interface.

## Screenshot

![image select](https://i.imgur.com/avEo6jC.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'value' => 'Image URL'` pairs. `value` is stored in the custom field and image URL is used to display the image. Required.
`multiple` | Whether enable multiple selection? `true` or `false` (default).

## Sample code

```php
array(
    'id'       => 'image_select',
    'name'     => 'Layout',
    'type'     => 'image_select',

    // Array of 'value' => 'Image URL' pairs
    'options'  => array(
        'left'  => 'http://placehold.it/90x90&text=Left',
        'right' => 'http://placehold.it/90x90&text=Right',
        'none'  => 'http://placehold.it/90x90&text=None',
    ),

    // Allow to select multiple values? Default is false
    // 'multiple' => true,
),
```

## Data

If field has multiple value, each value is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`). Otherwise, the field saves its single value in the post meta.

The value saved in the database is the value defined in the `options` table, not the image URL.

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

Read more about [rwmb_meta()](/rwmb-meta/).

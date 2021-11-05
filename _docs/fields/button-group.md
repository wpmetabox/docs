---
title: Button Group
---

## Overview

The button groups allows you to select one or more options by enabling buttons from a button group. This field is helpful when you want to display choices in the style of a toolbar.

## Screenshot

![button group](https://i.imgur.com/gVAILxbl.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'value' => 'Label'` pairs. `value` is stored in the custom field. Labels can be any text or HTML string. You can set label to `Text 1` or dashicon like `<i class="dashicons dashicons-editor-bold"></i>`. Required.
`inline` | Whether to display buttons horizontally (`true` - default) or vertically (`false`).
`multiple` | Enable multiple choices.

## Sample code

```php
array(
    'id'       => 'styles',
    'name'     => 'Styles',
    'type'     => 'button_group',

    'options'  => array(
        'bold'      => '<i class="dashicons dashicons-editor-bold"></i>',
        'italic'    => '<i class="dashicons dashicons-editor-italic"></i>',
        'underline' => '<i class="dashicons dashicons-editor-underline"></i>',
    ),
    'inline'   => true,
    'multiple' => true,
),
```

## Data

This field saves value(s) in the database. If field is `multiple`, then each value is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

If field is not multiple, to get the field value, use this code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```
The [rwmb_meta()](/rwmb-meta/) function returns the saved value in the database (the value in the options array). If you want to display the label, use this code:

```php
rwmb_the_value( $field_id );
```

If field is multiple, the returned value of `rwmb_meta` is an array and you can loop through it as below:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $value ) {
    echo $value;
}
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

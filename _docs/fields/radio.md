---
title: Radio
---

## Overview

The radio field creates a simple list of radio inputs where you are able to select a single choice from the predefined list.

## Screenshots

Inline:

![inline radio](https://i.imgur.com/9jhT53g.png)

Multiline:

![multiline radio](https://i.imgur.com/9rMyxGQ.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'value' => 'Label'` pairs. They're used to display choices to users. `value` is stored in the custom field. Required.
`inline` | Whether to show all choices in the same line (`true` - default) or multiline (`false`).

Note that the `multiple` setting is always set to `false` for this field.

## Sample code

```php
array(
    'name'    => 'Radio',
    'id'      => 'radio',
    'type'    => 'radio',
    // Array of 'value' => 'Label' pairs for radio options.
    // Note: the 'value' is stored in meta field, not the 'Label'
    'options' => array(
        'value1' => 'Label1',
        'value2' => 'Label2',
    ),
    // Show choices in the same line?
    'inline' => false,
),
```

## Data

This field simply saves a single selected value in the database.

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

To get the field value, use this code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

The [rwmb_meta()](/rwmb-meta/) function returns the value saved in the database (the `value` in the `options` array). If you want to display the **label**, use this code:

```php
rwmb_the_value( $field_id );
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).
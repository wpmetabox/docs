---
title: Text
---

## Overview

The text field creates a simple text input. You are able to enter any content or select a value from a predefined list via `datalist` option.

## Screenshots

Default:

![text](https://i.imgur.com/Khmq6nj.png)

With datalist:

![text with datalist](https://i.imgur.com/WnedDrd.png)

Cloneable:

![text clone](https://i.imgur.com/5BTWfmN.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`placeholder` | Placeholder for the input. Optional.
`size` | Size of input box. Optional. Default 30.
`prepend`|Prepend text for the input. The prepend text should be considered as an informative label. It's not saved in the database with the input value.
`append`|Append text for the input. The append text should be considered as an informative label. It's not saved in the database with the input value.
`datalist` | Predefined values that users can select from (users still can enter text if they want). Optional. This parameter has the following sub-parameters:
|`id`: ID of the div that stores the options. Usually not used and auto-generated as `{$field['id']_list`. Useful if you have several text input with same datalist.
|`options`: Array of predefined values to select from.

## Sample code

```php
array(
    'name'        => 'Text',
    'label_description' => 'Label description',
    'id'          => 'text',
    'desc'        => 'Please enter some text above',
    'type'        => 'text',

    // Default value (optional)
    // 'std'         => 'Default text value',

    // Cloneable (i.e. have multiple value)?
    'clone'       => true,

    // Placeholder
    'placeholder' => 'Enter something here',

    // Input size
    'size'        => 30,

    // Datalist
    'datalist'    => array(
        // Unique ID for datalist. Optional.
        'id'      => 'text_datalist',
        // List of predefined options
        'options' => array(
            'What',
            'When',
            'Where',
            'Why',
            'Who',
        ),
    ),
),
```

## Data

This field simply saves a single entered value in the database.

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

If field is not cloneable:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

If field is cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $value ) {
    echo $value;
}
```

Read more about [rwmb_meta()](/rwmb-meta/).

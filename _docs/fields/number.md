---
title: Number
---

## Overview

The number field creates a simple HTML5 number input. You are able to enter number or use the up/down arrow to change the number. It works with both integers and float numbers.

## Screenshot

![number](https://i.imgur.com/ioHgKyI.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`step` | Set the increments at which a numeric value can be set. It can be the string `any` (for floating numbers) or a positive float number or integer. If this attribute is not set to `any`, the control accepts only values at multiples of the step value greater than the minimum. Default is `1`. Optional.
`min` | Minimum value. Optional.
`max` | Maximum value. Optional.
`placeholder` | Placeholder for the input field. Optional.

## Sample code

```php
array(
    'name' => 'Number',
    'id'   => 'number',
    'type' => 'number',

    'min'  => 0,
    'step' => 5,
),
```

## Data

This field simply saves a single entered number in the database.

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

Read more about [rwmb_meta()](/rwmb-meta/).
---
title: Range
---

## Overview

The range field creates a HTML5 range field where you can select a number by dragging a control.

This field is very similar to the [number](/fields/number/) field. It just uses a different control to select a number instead of entering it.

## Screenshot

![range](https://i.imgur.com/eAHeRJS.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`step` | Set the increments at which a numeric value can be set. Default is `1`. Optional.
`min` | Minimum value. Optional.
`max` | Maximum value. Optional.

## Sample code

```php
array(
    'name' => 'Range',
    'id'   => 'range',
    'type' => 'range',

    'min'  => 0,
    'max'  => 60,
    'step' => 5,
),
```

## Data

This field simply saves a single selected value in the database.

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

Read more about [rwmb_meta()](/rwmb-meta/).
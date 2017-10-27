---
title: Hidden
---

## Overview

The hidden field creates a simple hidden input. It's usually used to store custom data that cannot be changed.

## Settings

This field doesn't have any specific settings. It only uses [common field settings](/field-settings/).

To store the hidden value, put it in the `std` setting.

## Sample code

```php
array(
    'id'   => 'field_id',
    'type' => 'hidden',
    // Hidden field must have predefined value
    'std'  => 'Hidden value',
),
```

## Data

Although the value is fixed in the code, this field still saves it in the post meta.

## Template usage

To get the field value, use this code

```php
$value = rwmb_meta( $field_id );
echo $value;
```

Read more about [rwmb_meta()](/rwmb-meta/).
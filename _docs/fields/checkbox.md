---
title: Checkbox
---

## Overview

The checkbox field creates a single checkbox.

## Screenshot

![checkbox](https://i.imgur.com/gMkTEfB.png)

## Settings

This field doesn't have any specific settings. It only uses [common field settings](/field-settings/).

## Sample code

```php
array(
    'name' => 'Checkbox',
    'id'   => 'field_id',
    'type' => 'checkbox',
    'std'  => 1, // 0 or 1
),
```

## Data

This field saves the "checked" and "unchecked" values in the database as "1" or "0".

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
// If field is checked.
if ( $value ) {
    echo 'Checked';
    // Do something.
}
// If field is unchecked.
else {
    echo 'Unchecked';
    // Do something else.
}
```

Or if you only want to display "Yes/No":

```php
rwmb_the_value( $field_id ); // echo 'Yes' or 'No'.
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).
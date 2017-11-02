---
title: Time
---

## Overview

The time field allows you to select a time via a friendly UI. This field uses jQuery UI time picker libraries.

## Screenshots

Default:

![time picker](https://i.imgur.com/xwV5FN5.png)

Time as select dropdowns:

![time picker 2](https://i.imgur.com/S83Wpau.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`size` | size of the input box. Optional. Default 10.
`inline` | Whether to display the date picker inline with the edit, e.g. do not require to click the input field to trigger the date picker? `true` or `false` (default).
`js_options`| Time picker options. [See here](http://trentrichardson.com/examples/timepicker/).

## Sample code

```php
array(
    'name'       => 'Time picker',
    'id'         => 'field_id',
    'type'       => 'time',

    // Time options, see here http://trentrichardson.com/examples/timepicker/
    'js_options' => array(
        'stepMinute'      => 15,
        'controlType'     => 'select',
        'showButtonPanel' => false,
        'oneLine'         => true,
    ),

    // Display inline?
    'inline'     => false,
),
```

## Data

This field simply saves a single entered time in the database.

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

To get the field value, use the following code:

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

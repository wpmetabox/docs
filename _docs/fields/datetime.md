---
title: Datetime
---

## Overview

The datetime field allows you to select a date and time via a friendly UI. This field uses jQuery UI date & time picker libraries.

## Screenshots

Default:

![datetime picker](https://i.imgur.com/VEUfkHo.png)

Time as select dropdowns:

![datetime picker 2](https://i.imgur.com/hoIeOTP.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`size` | size of the input box. Optional. Default 10.
`inline` | Whether to display the date picker inline with the edit, e.g. do not require to click the input field to trigger the date picker? `true` or `false` (default).
`timestamp` | Whether to save the date in the Unix timestamp format (but still display in human-readable format)? `true` or `false` (default).
`js_options`| A combination of date picker and time picker options. See [date picker options](http://api.jqueryui.com/datepicker) and [time picker options](http://trentrichardson.com/examples/timepicker/).

## Sample code

```php
array(
    'name'       => 'Date picker',
    'id'         => 'field_id',
    'type'       => 'datetime',

    // Datetime picker options.
    // For date options, see here http://api.jqueryui.com/datepicker
    // For time options, see here http://trentrichardson.com/examples/timepicker/
    'js_options' => array(
        'stepMinute'      => 15,
        'showTimepicker'  => true,
        'controlType'     => 'select',
        'showButtonPanel' => false,
        'oneLine'         => true,
    ),

    // Display inline?
    'inline'     => false,

    // Save value as timestamp?
    'timestamp'  => false,
),
```

## Data

If the `timestamp` is set to `true`, the field value is converted to Unix timestamp and saved to the database. Otherwise, the user input value is saved.

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

Or you can simply do like this:

```php
rwmb_the_value( $field_id );
```

If `timestamp` is `true`, then you can convert the value to different format, like this:

```php
$value = rwmb_meta( $field_id );
echo date( 'F j, Y @H:i', $value );
```

Or simpler:

```php
rwmb_the_value( $field_id, array( 'format' => 'F j, Y @H:i' ) );
```

The 2nd parameter of [rwmb_the_value()](/rwmb-the-value/) accepts and extra parameter `format` which specify the datetime format to output in the frontend.

Note that saving in timestamp also allows you to query posts with a specific order by this field:

```php
$query = new WP_Query( array(
    'post_type' => 'post',
    'orderby'   => 'meta_value_num',
    'meta_key'  => 'field_id',
    'order'     => 'ASC',
) );
```

However, you still can sort posts by meta value if you set date format to something similar to `yy-mm-dd`. Anyway, querying posts by custom fields is [not recommended](https://metabox.io/custom-fields-vs-custom-taxonomies/).

Read more about [rwmb_meta()](/rwmb-meta/).

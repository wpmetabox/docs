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
`save_format`| Custom PHP format for the datetime saved in the custom fields. See PHP's function [date()](http://php.net/manual/en/function.date.php) for the list of formats.

### Note

This field uses our JS library to get the current time of your computer and generates it to the timestamp value then the PHP code helps to save this value to the database. That means the Unix timestamp saved is the "timezone (UTC) + offset".

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

## Saving datetime in another format

Meta Box already supports customizing the date format **displaying to users** via `js_options`. In some cases, you might want to display in one format and save in another format. It's now possible in Meta Box 4.16.

To specify a date format for **saving in the custom fields**, you need to set another attribute `save_format`. This attribute accepts a format string for **PHP** (not for JavaScript like the format displaying to users). So your field can be something like this:

```php
array(
    'js_options' => array(
        'dateFormat'      => 'dd-mm-yy',
        'showTimepicker'  => true,
    ),
    'save_format' => 'Y-m-d H:i:s',
),
```

So when displaying to users, the date will have the format of `30-01-2019 05:00` and when saving to the database, it will have the format of `2019-01-30 05:00:00`.

This is extremely useful when you want to [sort or query the posts](https://metabox.io/get-posts-by-custom-fields-in-wordpress/) based on date value.

Also please note that this feature requires PHP 5.3+.

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

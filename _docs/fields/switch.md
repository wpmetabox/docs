---
title: Switch
---

## Overview

The switch field shows a on/off switch for you to enable/disable something. It allows editor to select styles (rounded or square) and custom text/icon labels.

## Screenshot

![switch](https://i.imgur.com/AVHMUdZl.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`style` | The switch style. `rounded` (default) or `square`. Optional.
`on_label`|The label for "On" status. Can be any HTML. You can set the text "Enable" or a check icon like `<i class="dashicons dashicons-yes"></i>`. When this setting is set to empty string, it displays a style like iOS switch. Optional.
`off_label`|Similar to the `on_label` but for "Off" status.

## Sample code

```php
array(
    'id'        => 'enable_slider',
    'name'      => 'Enable Slider?',
    'type'      => 'switch',
    
    // Style: rounded (default) or square
    'style'     => 'rounded',

    // On label: can be any HTML
    'on_label'  => 'Yes',

    // Off label
    'off_label' => 'No',
),
```

## Data

This field saves the "on" and "off" status in the database as "1" or "0".

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
// If field is on.
if ( $value ) {
    echo 'Slider goes here';
    // Do something.
}
// If field is off.
else {
    echo 'No slider';
    // Do something else.
}
```

Or if you only want to display "On/Off":

```php
rwmb_the_value( $field_id ); // echo 'On' or 'Off'
```

When using `rwmb_the_value`, displaying the `on_label` or `off_label` depends on the field value. In case those labels are omited, it uses "On/Off" as the default text.

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

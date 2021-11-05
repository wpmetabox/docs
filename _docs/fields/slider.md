---
title: Slider
---

## Overview

The slider field creates a slider where you can select a number by dragging a control.

This field uses jQuery UI library to create the UI.

## Screenshot

![slider](https://i.imgur.com/voHxzpJ.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`prefix` | Text displayed before the field value. Optional.
`suffix` | Text displayed after the field value. Optional.
`js_options` | jQuery UI slider options. [See here](https://api.jqueryui.com/slider/).

By default, Meta Box applies these default options for `js_options`:

Name | Value | Description
--- | ---
`range` | `min` | Create a range from the minimum value to one handle.
`value` | `$field['std']` | Set the default field value.

If you set `range` to `true`, the plugin will save 2 values in the database, separated by pipe (`|`) character, e.g. `15|90`.

## Sample code

```php
array(
    'name' => 'Slider',
    'id'   => 'slider',
    'type' => 'slider',

    // Text labels display before and after value
    'prefix' => '$',
    'suffix' => ' USD',

    // jQuery UI slider options. See here http://api.jqueryui.com/slider/
    'js_options' => array(
        'min'   => 10,
        'max'   => 255,
        'step'  => 5,
    ),

    'std' => 150,
    // 'clone' => true,
),
```

## Data

This field simply saves a single selected value (without the prefix and suffix) in the database.

If the field is cloneable, the value is stored as a serialized array in a single row in the database.

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

Read more about [rwmb_meta()](/rwmb-meta/).

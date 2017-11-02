---
title: Color
---

## Overview

The color field allows a color to be selected via a popup. This field uses built-in WordPress color picker (named [Iris](https://automattic.github.io/Iris/)) with an addition to select alpha channel for colors.

## Screenshot

![color picker](https://i.imgur.com/a8IFYvx.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`alpha_channel` | Whether to add opacity to the color picker. `true` or `false` (default). Optional.
`js_options` | Color picker options. [See here](https://automattic.github.io/Iris/).

## Sample code

```php
array(
    'name'          => 'Color picker',
    'id'            => 'field_id',
    'type'          => 'color',
    // Add alpha channel?
    'alpha_channel' => true,
    // Color picker options. See here: https://automattic.github.io/Iris/.
    'js_options'    => array(
        'palettes' => array( '#125', '#459', '#78b', '#ab0', '#de3', '#f0f' )
    ),
),
```

## Data

This field simply saves a the hex value of the picked color in the database.

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

To get the field value, use the following code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

The [rwmb_meta()](/rwmb-meta/) function returns the color code. If you want to display the actual color, use this code:

```php
rwmb_the_value( $field_id );
```

which displays the color as a single dot like this:

![display color](https://i.imgur.com/gLAVBYS.png)

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).
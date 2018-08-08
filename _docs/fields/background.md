---
title: Background
---

## Overview

The background field allows you to set background properties for a post. You can set background color, select an image and set other background settings.

## Screenshot

![background](https://i.imgur.com/BKfxPaSl.png)

## Settings

This field doesn't have any specific settings. It only uses  [common settings](/field-settings/).

## Sample code

```php
array(
    'id'   => 'background',
    'name' => 'Background',
    'type' => 'background',
),
```

## Data

This field stores background properties in a serialized array in the post meta.

## Template usage

To get the background properties, use the helper function [rwmb_meta()](/rwmb-meta/):

```php
$background = rwmb_meta( 'background' );
echo $background['color'];
echo $background['image'];
```

This helper function returns an array of background properties:

```php
array(
    'color'      => '#111222',
    'image'      => 'https://domain.com/wp-uploads/2017/12/bg.png',
    'position'   => 'top left',
    'attachment' => 'fixed',
    'size'       => 'cover',
    'repeat'     => 'no-repeat',
);
```

If you want to **get the CSS for the background**, use the [rwmb_the_value()](/rwmb-the-value/):

```php
$css = rwmb_the_value( $field_id, '', '', false );
echo '<div style="', $css, '"></div>';
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

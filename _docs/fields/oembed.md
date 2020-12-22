---
title: oEmbed
---

## Overview

The oEmbed field creates a simple text input for entering media URL. This field offers live preview the media content. It supports [many media websites](https://codex.wordpress.org/Embeds).

## Screenshot

![oembed](https://i.imgur.com/F64cxNe.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`size` | Input size. Default `30`. Optional.
`not_available_string` | The text message displayed to users when the embed media is not available. Accepts HTML.

## Sample code

```php
array(
    'id'    => 'oembed',
    'name'  => 'oEmbed(s)',
    'type'  => 'oembed',

    // Input size
    'size'  => 30,
),
```

## Data

This field saves the media URL in the post meta.

## Template usage

To output the media in the frontend, use the [rwmb_meta()](/rwmb-meta/) helper function:

```php
$media = rwmb_meta( $field_id );
echo $value;
```

This helper function will display the oembed content, e.g. if the value is a Youtube URL, it will display the full Youtube video player.

In case you want to get the URL of the field, use this code:

```php
$url = rwmb_get_value( $field_id );
echo $url
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_get_value()](/rwmb-get-value/).

## Hooks

The `oembed` field has one filter `rwmb_oembed_not_available_string`, which allows users to change the message for all oembed field when no embed is available.

Use the filter as follows:

```php
add_filter( 'rwmb_oembed_not_available_string', function( $message ) {
    $message = 'Sorry, what you are looking here is not available.';
    return $message;
} );
```

Developers also can hide the message with CSS, since it's wrapped into a `div.rwmb-oembed-not-available`. Simply put this code into your theme or in *Customize > Additional CSS*:

```css
.rwmb-oembed-not-available {
    display: none;
}
```

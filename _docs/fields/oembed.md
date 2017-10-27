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
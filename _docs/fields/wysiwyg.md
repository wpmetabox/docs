---
title: WYSIWYG
---

## Overview

The wysiwyg field creates an editor similar to the post content. You are able to enter any kind of content, insert media or custom HTML.

Note: wysiwyg stands for What You See Is What You Get, a general term of visual editor, where you see the formated content as you type.

## Screenshot

![wysiwyg editor](https://i.imgur.com/Y72Bcvw.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`raw` | If you want to save data in raw format, e.g. exactly the same as you enter in the editor without applying `wpautop()` function. Can be `true` or `false` (default). Optional.
`options` | Array of editor settings, [see the list of settings here](https://developer.wordpress.org/reference/classes/_WP_Editors/parse_settings/).

By default, the plugin uses 2 options:

Name | Default Value | Description
--- | ---
`editor_class` | `rwmb-wysiwyg` | Just to make CSS consistent with other fields
`dfw` | `true` | Allow to use "Distraction Free Writing" mode (full-screen mode)

## Sample code

```php
array(
    'name'    => 'WYSIWYG / Rich Text Editor',
    'id'      => 'field_id',
    'type'    => 'wysiwyg',

    // Set the 'raw' parameter to TRUE to prevent data being passed through wpautop() on save
    'raw'     => false,

    // Editor settings, see https://codex.wordpress.org/Function_Reference/wp_editor
    'options' => array(
        'textarea_rows' => 4,
        'teeny'         => true,
    ),
),
```

## Data

If `raw` is `true`, this field saves exactly what you enter to the database. Otherwise, it saves the value after applying `wpautop` function.

## Template usage

To output the field value, use this code:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

Note that the helper function doesn't format the value of this field nor run shortcodes in the content. In case you want to make it behaves similar to the post content (e.g. format and shortcodes), use this code:

```php
$value = rwmb_meta( $field_id );
echo do_shortcode( wpautop( $value ) );
```

Read more about [rwmb_meta()](/rwmb-meta/).

## Filters

`rwmb_wysiwyg_settings`

This filter is used to changed the options for the editor (which is passed by `$field['option']`) and is applied to all `wysiwyg` fields.

This filter accepts 1 param:

- `$settings`: editor settings, which will be sent to [`wp_editor`](https://codex.wordpress.org/Function_Reference/wp_editor) function.

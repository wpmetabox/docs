---
title: Filters
---

This page lists all filters for Meta Box plugin:

## General filters

### `rwmb_meta_boxes`

This is the most important filter of the plugin. It is used to add/remove/edit meta boxes. See [this documentation](/creating-meta-boxes/) for more details on how to use it.

This filter has 1 parameter - array of meta boxes.

```php
apply_filters( 'rwmb_meta_boxes', array() );
```

### `rwmb_shortcode`

This filter is used to change the output of `[rwmb_shortcode]` shortcode. It has 1 parameter - output of the shortcode.

```php
apply_filters( 'rwmb_shortcode', $content );
```

### `rwmb_meta`

This filter is used to change the returned value of helper function [rwmb_meta()](/rwmb-meta/). It accepts 4 parameters:

- `$meta`: the meta value returned by `rwmb_meta` function
- `$key`: meta key (custom field ID)
- `$args`: arguments passed to `rwmb_meta` function
- `post_id`: post ID

```php
apply_filters( 'rwmb_meta', $meta, $key, $args, $post_id );
```

## Meta Box filters

### `rwmb_show`

This filter is used to change the visibility of a meta box (by default meta box is shown). It accepts 2 parameters:

- `$show`: current visibility of the meta box
- `$meta_box`: array of a meta box definition

```php
$show = apply_filters( 'rwmb_show', $show, $meta_box );
```

### `rwmb_show_{$meta_box_id}`

This filter is the same as `rwmb_show` but is applied to a specific meta box (identified by ID). It accepts same parameters.

### `rwmb_normalize_meta_box`

This filter is used to normalize a meta box's parameters. It's useful when you want to set default values for a meta box. It accepts 1 parameter - meta box array of definition.

```php
$meta_box = apply_filters( 'rwmb_normalize_meta_box', $meta_box );
```

### `rwmb_normalize_{$meta_box_id}_meta_box`

This filter is the same as `rwmb_normalize_meta_box` but is applied to a specific meta box (identified by ID). It accepts same parameters.

## Field general filters

### `rwmb_normalize_field`

This filter is used to normalize a field's parameters. It's useful when you want to set default values for a field. It accepts 1 parameter - array of field attributes.

```php
$meta_box = apply_filters( 'rwmb_normalize_field', $field );
```

### `rwmb_normalize_{$field_type}_field`

This filter is the same as `rwmb_normalize_field` but is applied to fields with a specific type. It accepts same parameters.

### `rwmb_normalize_{$field_id}_field`

This filter is the same as `rwmb_normalize_field` but is applied to a specific field (identified by ID). It accepts same parameters.

### `rwmb_field_meta`

This filter is used to change a field meta value before displaying it in the meta box. It accepts 3 parameters:

- `$meta`: field meta value
- `$field`: array of field attributes
- `$saved`: a param used to detect whether this meta box is saved into database or not. It's useful when you want to set default value for a field

```php
$meta = apply_filters( 'rwmb_field_meta', $meta, $field, $saved );
```

### `rwmb_{$field_type}_field_meta`

This filter is the same as `rwmb_field_meta` but is applied to fields with a specific type. It accepts same parameters.

### `rwmb_{$field_id}_field_meta`

This filter is the same as `rwmb_field_meta` but is applied to a specific field (identified by ID). It accepts same parameters.


### `rwmb_{$field_type}_value`

This filter is used to change a field meta value before saving it in the database. It accepts 3 parameters:

- `$new`: field meta value which will be saved in the database
- `$field`: array of field attributes
- `$old`: old meta value of field

```php
$new = apply_filters( "rwmb_{$field['type']}_value", $new, $field, $old );
```

### `rwmb_{$field_id}_value`

This filter is the same as `rwmb_{$field_type}_value` but is applied to a specific field (identified by ID). It accepts same parameters.

## Field appearance filters

### `rwmb_begin_html`

This filter is used to change the beginning HTML output of a field. The beginning HTML is defined in field's `begin_html` function (see documentation for `RWMB_Field` class). Each field can overwrite this function and output different HTML.

By default it has the following markup:

```php
<div class="rwmb-label">
    <label for="{$field_id}">{$field_name}</label>
</div>
<div class="rwmb-input">
```

This filter accepts 3 parameters:

- `$begin`: the beginning HTML output of the field
- `$field`: array of field attributes
- `$meta`: field meta value

```php
$begin = apply_filters( 'rwmb_begin_html', $begin, $field, $meta );
```

### `rwmb_{$field_type}_begin_html`

This filter is the same as `rwmb_begin_html` but is applied to fields with a specific type. It accepts same parameters.

### `rwmb_{$field_id}_begin_html`

This filter is the same as `rwmb_begin_html` but is applied to a specific field (identified by ID). It accepts same parameters.

### `rwmb_end_html`

This filter is similar to `rwmb_begin_html` and is used to change the ending HTML output of a field. The ending HTML is defined in field's `end_html` function (see documentation for `RWMB_Field` class). Each field can overwrite this function and output different HTML.

By default it has the following markup:

```php
{$clone_button}
{$field_description}
</div><!-- .rwmb-input -->
```

This filter accepts 3 parameters:

- `$end`: the ending HTML output of the field
- `$field`: array of field attributes
- `$meta`: field meta value

```php
$end = apply_filters( 'rwmb_end_html', $end, $field, $meta );
```

### `rwmb_{$field_type}_end_html`

This filter is the same as `rwmb_end_html` but is applied to fields with a specific type. It accepts same parameters.

### `rwmb_{$field_id}_begin_html`

This filter is the same as `rwmb_end_html` but is applied to a specific field (identified by ID). It accepts same parameters.

### `rwmb_{$field_type}_html`

This filter is used to changed the HTML output of a field, which is inside `rwmb-input` class, e.g. after beginning HTML and before ending HTML.

The HTML output of a field is various and depends on field type. For example: a text field simply outputs a `input` tag, while wysiwyg field outputs a complicated `div`.

This filter accepts 3 parameters:

- `$field_html`: HTML output of a field
- `$field`: array of field attributes
- `$meta`: field meta value

```php
$field_html = apply_filters( "rwmb_{$field_type}_html", $field_html, $field, $meta );
```

### `rwmb_{$field_id}_html`

This filter is the same as `rwmb_{$field_type}_html` but is applied to a specific field (identified by ID). It accepts same parameters.

### `rwmb_wrapper_html`

This filter is used to change the wrapper HTML output of a field. Wrapper HTML is the string concatenation of beginning HTML, field HTML and ending HTML.

This filter accepts 3 parameters:

- `$html`: wrapper HTML output of the field
- `$field`: array of field attributes
- `$meta`: field meta value

```php
$html = apply_filters( 'rwmb_wrapper_html', "{$begin}{$field_html}{$end}", $field, $meta );
```

### `rwmb_{$field_type}_wrapper_html`

This filter is the same as `rwmb_wrapper_html` but is applied to fields with a specific type. It accepts same parameters.

### `rwmb_{$field_id}_wrapper_html`

This filter is the same as `rwmb_wrapper_html` but is applied to a specific field (identified by ID). It accepts same parameters.

### `rwmb_outer_html`

This filter is used to change the outer HTML output of a field. Outer HTML is surrounding div (the most outside) of the field. By default it has the following markup:

```php
$outer_html = $field['before'] . "<div class='{$field_classes}'>{$wrapper_html}</div>" . $field['after'];
```

This filter accepts 3 parameters:

- `$outer_html `: outer HTML output of the field
- `$field`: array of field attributes
- `$meta`: field meta value

```php
$outer_html = apply_filters( 'rwmb_outer_html', $outer_html, $field, $meta );
```

### `rwmb_{$field_type}_outer_html`

This filter is the same as `rwmb_outer_html` but is applied to fields with a specific type. It accepts same parameters.

### `rwmb_{$field_id}_outer_html`

This filter is the same as `rwmb_outer_html` but is applied to a specific field (identified by ID). It accepts same parameters.

## Specific fields' filters

### choice fields (`user`, `post`, `taxonomy`) filters:

- `rwmb_choice_label`: which will effect labels for all choice fields
- `rwmb_{$field_type}_choice_label`: which will effect all of a particular type
- `rwmb_{$field_id}_choice_label`: which will effect all of a the field with a particular id

Example: If you are using a field called `some_user` and you want to change the label in the select box to user `first_name` instead of the default `display_name`:

```php
function some_user_filter( $label, $field, $user ) {
    return $user->first_name ;
}
add_filter( 'rwmb_some_user_choice_label', 'some_user_filter', 10, 3);
```

### `wysiwyg` filters

`rwmb_wysiwyg_settings`: This filter is used to changed the options for the editor (which is passed by `$field['option']`) and is applied to all wysiwyg fields.

This filter accepts 1 param:

- `$settings`: editor settings, which will be sent to [`wp_editor`](https://codex.wordpress.org/Function_Reference/wp_editor) function.

### `image` filters

Filter|Default|Description
---|---|---
`rwmb_image_upload_string`|Upload Images|Image upload string
`rwmb_image_add_string`|+ Add new image|Add new image string
`rwmb_image_delete_string`|Delete|Image delete string
`rwmb_image_edit_string`|Edit|Image edit string

All filters above accept 2 parameters:

- `$string`: the string need to be changed
- `$field`: array of field attribute

### `image_advanced` filters

Filter|Default|Description
---|---|---
`rwmb_image_advanced_select_string`|Select or Upload Images|The button text to select or upload images
`rwmb_image_delete_string`|Delete|Image delete string (same as `image`)
`rwmb_image_edit_string`|Edit|Image edit string (same as `image`)

All filters above accept 2 parameters:

- `$string`: the string need to be changed
- `$field`: array of field attribute

### `image_upload` filters

Filter|Default
---|---
`rwmb_plupload_image_drop_string`|Drop images here
`rwmb_plupload_image_or_string`|or
`rwmb_plupload_image_select_string`|Select Files

(these strings appear in the drop area of field where users can drop or select images to upload)

All filters above accept 2 parameters:

- `$string`: the string need to be changed
- `$field`: array of field attribute

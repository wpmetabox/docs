---
title: Filters
---

This page lists all filters for Meta Box plugin:

## General filters

### `rwmb_meta_boxes`

This is the most important filter of the plugin. It is used to add/remove/edit meta boxes. See [this documentation](/creating-meta-boxes/) for more details on how to use it.

This filter has 1 parameter - array of meta boxes.

```php
apply_filters( 'rwmb_meta_boxes', [] );
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
- `$object_id`: object ID

```php
apply_filters( 'rwmb_meta', $meta, $key, $args, $post_id );
```

### `rwmb_get_value`

This filter is used to change the returned value of helper function [rwmb_get_value()](/rwmb-get-value//). It accepts 4 parameters:

- `$value`: the value returned by `rwmb_get_value` function
- `$field`: field settings
- `$args`: arguments passed to `rwmb_get_value` function
- `$object_id`: object ID

```php
apply_filters( 'rwmb_get_value', $value, $field, $args, $object_id );
```

### `rwmb_the_value`

This filter is used to change the returned value of helper function [rwmb_the_value()](/rwmb-the-value//). It accepts 4 parameters:

- `$output`: the HTML output returned by `rwmb_the_value` function
- `$field`: field settings
- `$args`: arguments passed to `rwmb_the_value` function
- `$object_id`: object ID

```php
apply_filters( 'rwmb_the_value', $output, $field, $args, $object_id );
```

## Meta Box filters

### `rwmb_show`

This filter is used to change the visibility of a meta box (by default meta box is shown). It accepts 2 parameters:

- `$show`: current visibility of the meta box
- `$meta_box`: array of a meta box definition

```php
$show = apply_filters( 'rwmb_show', $show, $meta_box );
```

This filter has variations:

- `rwmb_show`: apply for all meta boxes
- `rwmb_show_{$meta_box_id}`: apply for a meta box with a particular id

### `rwmb_normalize_meta_box`

This filter is used to normalize a meta box's parameters. It's useful when you want to set default values for a meta box. It accepts 1 parameter - meta box array of definition.

```php
$meta_box = apply_filters( 'rwmb_normalize_meta_box', $meta_box );
```

This filter has variations:

- `rwmb_show`: apply for all meta boxes
- `rwmb_normalize_{$meta_box_id}_meta_box`: apply for a meta box with a particular id

## Field general filters

### `rwmb_normalize_field`

This filter is used to normalize a field's parameters. It's useful when you want to set default values for a field. It accepts 1 parameter - array of field attributes.

```php
$meta_box = apply_filters( 'rwmb_normalize_field', $field );
```

This filter has variations:

- `rwmb_normalize_field`: apply for all fields
- `rwmb_normalize_{$field_type}_field`: apply for fields with a particular type
- `rwmb_normalize_{$field_id}_field`: apply for a the field with a particular id

### `rwmb_field_meta`

This filter is used to change a field meta value before displaying it in the meta box. It accepts 3 parameters:

- `$meta`: field meta value
- `$field`: array of field attributes
- `$saved`: a param used to detect whether this meta box is saved into database or not. It's useful when you want to set default value for a field

```php
$meta = apply_filters( 'rwmb_field_meta', $meta, $field, $saved );
```

This filter has variations:

- `rwmb_field_meta`: apply for all fields
- `rwmb_{$field_type}_field_meta`: apply for fields with a particular type
- `rwmb_{$field_id}_field_meta`: apply for a the field with a particular id

### `rwmb_{$field_type}_value`

This filter is used to change a field meta value before saving it in the database. It accepts 4 parameters:

- `$new`: field meta value which will be saved in the database
- `$field`: array of field attributes
- `$old`: old meta value of field
- `$object_id`: the object ID, which can be post ID, term ID (if editing a term) or user ID (if editing a user)

```php
$new = apply_filters( "rwmb_{$field['type']}_value", $new, $field, $old, $object_id );
```

This filter has variations:

- `rwmb_{$field_type}_value`: apply for fields with a particular type
- `rwmb_{$field_id}_value`: apply for a the field with a particular id

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

This filter has variations:

- `rwmb_begin_html`: apply for all fields
- `rwmb_{$field_type}_begin_html`: apply for fields with a particular type
- `rwmb_{$field_id}_begin_html`: apply for a the field with a particular id

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

This filter has variations:

- `rwmb_end_html`: apply for all fields
- `rwmb_{$field_type}_end_html`: apply for fields with a particular type
- `rwmb_{$field_id}_end_html`: apply for a the field with a particular id

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

This filter has variations:

- `rwmb_{$field_type}_html`: apply for fields with a particular type
- `rwmb_{$field_id}_html`: apply for a the field with a particular id

### `rwmb_wrapper_html`

This filter is used to change the wrapper HTML output of a field. Wrapper HTML is the string concatenation of beginning HTML, field HTML and ending HTML.

This filter accepts 3 parameters:

- `$html`: wrapper HTML output of the field
- `$field`: array of field attributes
- `$meta`: field meta value

```php
$html = apply_filters( 'rwmb_wrapper_html', "{$begin}{$field_html}{$end}", $field, $meta );
```

This filter has variations:

- `rwmb_wrapper_html`: apply for all fields
- `rwmb_{$field_type}_wrapper_html`: apply for fields with a particular type
- `rwmb_{$field_id}_wrapper_html`: apply for a the field with a particular id

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

This filter has variations:

- `rwmb_outer_html`: apply for all fields
- `rwmb_{$field_type}_outer_html`: apply for fields with a particular type
- `rwmb_{$field_id}_outer_html`: apply for a the field with a particular id

### `rwmb_choice_label`

This filter allows developers to change the label of choice fields (`user`, `post`, `taxonomy` and `taxonomy_advanced`). It has 3 parameters:

- `$label`: The output label
- `$field`: Field settings
- `$object`: The post, user or term object

Example: If you are using a field called `some_user` and you want to change the label in the select box to user `first_name` instead of the default `display_name`:

```php
function some_user_filter( $label, $field, $object ) {
    return $object->first_name ;
}
add_filter( 'rwmb_some_user_choice_label', 'some_user_filter', 10, 3);
```

This filter has variations:

- `rwmb_choice_label`: apply for all choice fields
- `rwmb_{$field_type}_choice_label`: apply for choice fields with a particular type
- `rwmb_{$field_id}_choice_label`: apply for a the field with a particular id

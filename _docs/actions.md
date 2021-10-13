---
title: Actions
---

This page lists all actions in Meta Box plugin.

## `rwmb_before`

This action runs before any meta box is shown. It takes 1 parameter: the instance of `RW_Meta_Box` class for current meta box.

```php
do_action( 'rwmb_before', $this );
```

This action has variations:

- `rwmb_before`: apply for all meta boxes
- `rwmb_before_{$meta_box_id}`: apply for a meta box with a particular id

## `rwmb_after`

This action runs after any meta box is shown. It takes 1 parameter: the instance of `RW_Meta_Box` class for current meta box.

```php
do_action( 'rwmb_after', $this );
```

This action has variations:

- `rwmb_after`: apply for all meta boxes
- `rwmb_after_{$meta_box_id}`: apply for a meta box with a particular id

## `rwmb_before_save_post`

This action runs before any meta box is saved into post meta. It takes 1 parameter: current object ID.

```php
do_action( 'rwmb_before_save_post', $object_id );
```

This action has variations:

- `rwmb_before_save_post`: apply for all meta boxes
- `rwmb_{$meta_box_id}_before_save_post`: apply for a meta box with a particular id

## `rwmb_after_save_post`

This action runs after any meta box is saved into post meta. It takes 1 parameter: current object ID.

```php
do_action( 'rwmb_after_save_post', $object_id );
```

You can use this hook to perform extra action after saving any metabox, like combining values of 2 fields into another one. See [an example](https://metabox.io/support/topic/edit-_post-custom-field-combine-2-field-and-add-to-a-field/)

This action has variations:

- `rwmb_after_save_post`: apply for all meta boxes
- `rwmb_{$meta_box_id}_after_save_post`: apply for a meta box with a particular id

## `rwmb_after_save_field`

This action fires after saving each field.

```php
do_action( 'rwmb_after_save_field', null, $field, $new, $old, $object_id );
```

It accepts the following parameters:

Name|Description
---|---
`$null`|Not used
`$field`|Field settings
`$new`|The new (submitted) field value
`$old`|The old field value
`$object_id`|The object ID

You can use this hook to perform extra action for a specific field. See [an example](https://metabox.io/support/topic/using-custom-attributes-from-rwmb_before_save_post-action/)

This action has variations:

- `rwmb_after_save_field`: apply for all fields
- `rwmb_{$field_type}_after_save_field`: apply for fields with a particular type
- `rwmb_{$field_id}_after_save_field`: apply for a field with a particular id

## `rwmb_enqueue_scripts`

This action runs after all Meta Box scripts and styles are enqueued to allows developers to enqueue more scripts and styles. It takes 1 parameter: the instance of `RW_Meta_Box` class for current meta box.

```php
do_action( 'rwmb_enqueue_scripts', $this );
```

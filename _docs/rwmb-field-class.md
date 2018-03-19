---
title: RWMB_Field Class
---

## Overview

In Meta Box plugin, each field is built by a PHP class `RWMB_{$field_type}_Field`. This class extends the prime class - `RWMB_Field`. In other words, `RWMB_Field` is the prime class from which all fields are built on. `RWMB_Field` has all necessary methods for fields to use. Fields can overwrite these methods, change them for specific needs or add more methods if necessary. 

{% include alert.html type="info" content="All methods of this class (and its descendants) are **static**. It will make all fields use the same code instead of creating multiple class instances, thus increase plugin's performance." %}

## Class methods

### `add_actions`

This method allows a field to add custom hooks for its needs. For example: callbacks for ajax call ([like `file`](https://github.com/wpmetabox/meta-box/blob/master/inc/fields/file.php#L29)), add hook to output custom content in admin footer ([like `image_advanced`](https://github.com/wpmetabox/meta-box/blob/master/inc/fields/file-advanced.php#L32)), etc. This method is called when the meta box is loaded. You can also add custom code to this method or calls to other functions which need to run when code is loaded. This method doesn't have any arguments.

### `admin_enqueue_scripts`

This method allows you to enqueue scripts and styles for a field. This method doesn't have any arguments.

### `show`

This method outputs field's HTML markup. Fields should **not** overwrite this method to output custom HTML. Instead of that, overwrite methods `html`, `begin_html`, `end_html` described below. This method has 2 arguments:

- `$field`: array of field arguments
- `$saved`: a param used to detect whether this meta box is saved into database or not
- `$post_id`: the current post ID

### `html`

This method returns (not echoes, only returns) field's HTML markup. This is the input controls of the field and is put inside `.rwmb-input` CSS class. It can be filtered by [`rwmb_{$field_type}_html`](/filters/) and [`rwmb_{$field_id}_html`](/filters/) filters. Each field **must** overwrite this method to returns its HTML for inputs. This method has 2 arguments:

- `$meta`: field meta value
- `$field`: array of field arguments

### `begin_html`

This method returns the beginning HTML output of a field. The beginning HTML output contains field name and opening tag for inputs. By default it is:

    <div class="rwmb-label">
        <label for="{$field_id}">{$field_name}</label>
    </div>
    <div class="rwmb-input">

This method should not be overwritten by field's class, unless it's needed to do so ([like `heading` field](https://github.com/wpmetabox/meta-box/blob/master/inc/fields/heading.php#L27)). The return value of this function is filtered by [`rwmb_begin_html`](/filters/) filter (and its family). This method has 2 arguments:

- `$meta`: field meta value
- `$field`: array of field arguments

### `end_html`

This method returns the ending HTML output of a field. The ending HTML output contains clone button, field description and closing tag for inputs. By default it is:

    {$clone_button}
    {$field_description}
    </div> <!-- .rwmb-input -->

This method should not be overwritten by field's class, unless it's needed to do so ([like `heading` field](https://github.com/wpmetabox/meta-box/blob/master/inc/fields/heading.php#L40)). The return value of this function is filtered by [`rwmb_end_html`](/filters/) filter (and its family). This method has 2 arguments:

- `$meta`: field meta value
- `$field`: array of field arguments

### `meta`

This method retrieves meta value for a field. In most cases, this method does all the job of retrieving meta value of a field. But in some cases, a descendant class may overwrite this method to retrieve meta value for more complicated logic ([like `user` field](https://github.com/wpmetabox/meta-box/blob/master/inc/fields/user.php#L95)). This method has 3 parameters:

- `$post_id`: current post ID, from which we retrieve meta value
- `$saved`: a param used to detect whether this meta box is saved into database or not
- `$field`: array of field arguments

The returned value of this method is filtered by [`rwmb_field_meta`](/filters/) filter (and its family).

### `value`

This method set field meta value before saving in database. By default it just returns the value from `$_POST`. Field class can overwrite this method to set meta value for more complicated logic ([like `taxonomy_advanced`](https://github.com/wpmetabox/meta-box/blob/master/inc/fields/taxonomy-advanced.php#L54)). This method has 4 parameters:

- `$new`: field meta value which will be saved in the database
- `$old`: old meta value of field
- `$post_id`: current post ID, from which we retrieve meta value
- `$field`: array of field arguments

The returned value of this method is filtered by [`rwmb_{$field_type}_value`](/filters/) filter (and its family).

### `save`

This method saves field meta value in database. In most cases, this method does all the job of saving meta value of a field to database. But in some cases, a descendant class may overwrite this method to handle saving itself ([like `taxonomy` field](https://github.com/wpmetabox/meta-box/blob/master/inc/fields/taxonomy.php#L237)). This method has 4 parameters:

- `$new`: field meta value which will be saved in the database
- `$old`: old meta value of field
- `$post_id`: current post ID, from which we retrieve meta value
- `$field`: array of field arguments

### `normalize_field`

This method normalizes field arguments, add missing arguments, add default value for fields, etc. Depends on field type, each field class can overwrite this method to define its own defaults value. This method has 1 parameter:

- `$field`: array of field arguments

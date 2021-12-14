---
title: Field settings
---

Each field contains settings to determine where and how data is loaded and saved. All fields share some common settings, but also offer unique settings per field type. These unique settings can be found by reading more about the field type.

To understand field types and settings for each type, please see this video below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/WWeaM5vIAwM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Field settings can be customized when editing a field group in Meta Box Builder or the `fields` array if you use code to create a field group. In Meta Box Builder, settings are put into 2 tabs: General and Advanced.

Below are the screenshots of text field settings:

![general settings](https://i.imgur.com/BZUoeuu.png)

![advanced settings](https://i.imgur.com/shRPaYD.png)

## Common settings

Each field setting in the Meta Box Builder has a proper label and tooltip (if necessary) to explain what it is. Below is the table of common settings for all fields with the corresponding setting ID in case you use code.

### General

These are common field settings in the General tab in Meta Box Builder.

Name | ID | Description
--- | ---
Label | `name` | Field label. Optional. If empty, the field input is 100% width.
ID | `id` | Field ID. Required and must be unique. **It will be used as `meta_key` when saving to the database**. Use only numbers, letters, and underscores (and rarely dashes).
Type | `type` | Field type. Required. In Meta Box Builder, you can switch field type if needed. The list of field types is already available in the Meta Box Builder and is showed below for reference.
Label description | `label_description` | Label description, displayed below the field label. Optional.
Input description | `desc` | Field description, displayed below the field input. Optional.
Default value | `std` | Default value. Optional.
Placeholder | `placeholder` | Placeholder text for the input or select box. Optional.
Required | `required` | Whether the field is required (`true` or `false`). Optional. Default `false`.
Disabled | `disabled` | Whether the field is disabled (`true` or `false`). Optional. Default `false`.
Read only | `readonly` | Whether the field is read only (`true` or `false`). Optional. Default `false`.
Multiple | `multiple`|Does the field have multiple values (like the `select` field)? Optional. Default `false`.
Cloneable | `clone` | Is the field clonable (repeatable)? `true` or `false`. Optional. Default `false`.
Sortable | `sort_clone`|Ability to drag-and-drop reorder clones (`true` or `false`). Optional. Default `false`.
Clone default value | `clone_default`|Clone the default value of fields? `true` or `false` (default).
Clone as multiple | `clone_as_multiple`|Whether to store clone values in multiple rows in the database? Optional. Default `false`. See [this post](https://metabox.io/introducing-clone-as-multiple-feature/) for details.
Max number of clones | `max_clone`|Maximum number of clones. Optional. Default `0` (unlimited).
Min number of clones | `min_clone`|Minimum number of clones. Optional. Default `0`.
Add more text | `add_button`|The text for **Add more** clone button. Optional. Default "+ Add more".

### Advanced

These are common field settings in the Advanced tab in Meta Box Builder.

Name | ID | Description
--- | ---
Before | `before` | Custom HTML outputted before field's HTML.
After | `after` | Custom HTML outputted after field's HTML.
Custom CSS class | `class` | Custom CSS class, in case you want to customize the field. Optional.
Custom sanitize callback | `sanitize_callback` | Custom PHP callback for sanitizing field value before saving into the database. Set it to `none` to bypass the sanitization. See [more details](/sanitization/).
Save field value | `save_field` | Whether to save field value. Optional. Default `true`. This option doesn't work in the block editor (Gutenberg).
Custom HTML5 attributes | `attributes` | Custom attributes for inputs. See [more details](/custom-attributes/).
Validation | `validation` | Validation rules for fields. Optional. See [more details](/validation/).
Custom settings | N/A | Custom field settings, useful when you want to add your settings to fields.

### Field types

Below is the list of all supported field types with a brief description:

Field Type | Description
--- | ---
`autocomplete` | Text input that uses jQuery autocomplete library to perform the autocomplete action.
`background` | Set background properties. Added in version 4.13.0.
`button` | Display simple button. Usually used for JavaScript triggers.
`button_group` | Select one or multiple choices by enabling button(s) from a group. Added in version 4.13.0.
`checkbox` | Checkbox.
`checkbox_list` | List of checkboxes.
`color` | Color picker.
`custom_html` | Output custom HTML content.
`date` | Date picker.
`datetime` | Date and time picker.
`divider` | Simple horizontal line.
`fieldset_text` | Group of text inputs.
`file` | Simple file upload with default UI like `<input type="file" />`.
`file_advanced` | File upload with WordPress media popup.
`file_input` | Enter file URL or select a file from media library.
`file_upload` | File upload with drag and drop area.
`heading` | Heading text.
`hidden` | Input field with `hidden` type.
`image` | Similar to `file` but for images only.
`image_advanced` | Similar to `file_advanced`, but for images only.
`image_select` | Similar to radio select, but use images instead of "radio".
`image_upload` or `plupload_image` | Similar to `file_upload` but for images only.
`key_value` | Add an unlimited group of key-value pairs.
`map` | Google maps.
`number` | Input for numbers which uses HTML5 input `type="number"`.
`oembed` | Input for media from Youtube, Vimeo and all [supported sites](https://codex.wordpress.org/Embeds) by WordPress.
`password` | Password input.
`post` | Select dropdown for posts.
`radio` | Radio input.
`range` | HTML 5 range input.
`select` | Select dropdown.
`select_advanced` | Beautiful select dropdown using [select2](https://select2.github.io) library.
`single_image` | Select or upload a single image via WordPress media popup. Added in version 4.13.0.
`slider` | jQuery UI slider.
`switch` | On/off switch with iOS style. Added in version 4.13.0.
`taxonomy` | Select dropdown for taxonomy terms. Doesn't save term IDs in post meta, but set post terms.
`taxonomy_advanced`|Same as `taxonomy` but saves term IDs in post meta as a comma separated string. It doesn't set post terms.
`text` | Text field.
`text_list` | Group of text inputs. Similar to `fieldset_text`.
`textarea` | Textarea field.
`time` | Time picker.
`user` | Select dropdown for users.
`video` | Upload or select a video from the Media Library using the WordPress media popup.
`wysiwyg` | WordPress editor.

{% include alert.html content="In addition to the above field types, you can also use HTML5 input types. See [this guide](/html5-input-types/) for details." %}

## Default value

The mechanism of `std` in Meta Box works only if the **field group has not been saved before**. It means all fields in that field group, not just the specific field that you set the `std` for. So if there's any field that already has value, then `std` won't work for other fields, even new fields you've just added.

Examples:

When you create a new post, then no fields have values (of course), then `std` works for all fields.

When you edit an existing post that has a field group, then some fields might have values. Therefore, `std` doesn't work for all fields. In this case, if you edit the field group and add a new field, `std` still doesn't work for that new field (even it has no value before), because the field group has been saved before.

## Field-specific settings

Besides all common settings, each field type can have its own settings. Please see more details for each field type on the left menu (section "Fields").

{% include alert.html content="To save time read and write settings for fields, we've already prepared some code examples that you can get from [Meta Box Code Snippet Library](https://github.com/wpmetabox/library/)." %}

## Customize field settings

Outside of the "Edit field group" UI, it is possible to modify a field's settings via the [rwmb_normalize_field](https://docs.metabox.io/filters/#rwmb_normalize_field) filter. This filter exposes the `$field` settings array for each field and allows customization to all settings.

This example shows how to modify a specific field (called `customer_name`) via this filter to customize settings unavailable to the UI.

```php
add_filter( 'rwmb_normalize_customer_name_field', function( $field ) {
	$field['required'] = true;
	$field['size'] = 20;
	$field['placeholder'] = 'Mark Cuban';

	return $field;
} );

```

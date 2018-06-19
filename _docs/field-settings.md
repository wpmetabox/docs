---
title: Field settings
---

## Overview

Fields are added to a meta box via the key `fields`. Each field is an array which contains settings to determine where and how data is loaded and saved. All fields share some common settings, but also offer unique settings per field type.

## Common settings

Name | Description
--- | ---
`name` | Field label. Optional. If empty, the field input is 100% width.
`id` | Field ID. Required and must be unique. **It will be used as `meta_key` when saving to the database**. It's a good practice to use only numbers, letters, and underscores.
`type` | Field type. Required. See below.
`desc` | Field description, displayed below the field input. Optional.
`label_description` | Label description, displayed below the field label. Optional.
`std` | Default value. Optional.
`multiple`|Does the field have multiple values (like the `select` field)? Optional. Default `false`.
`class` | Custom CSS class, in case you want to customize the field. Optional.
`before` | Custom HTML outputted before field's HTML.
`after` | Custom HTML outputted after field's HTML.
`clone` | Is the field clonable (repeatable)? `true` or `false`. Optional. Default `false`.
`max_clone`|Maximum number of clones. Optional. Default `0` (unlimited).
`sort_clone`|Ability to drag-and-drop reorder clones (`true` or `false`). Optional. Default `false`.
`clone_default`|Clone the default value of fields? `true` or `false` (default).
`add_button`|The text for **Add more** clone button. Optional. Default "+ Add more".
`clone_as_multiple`|Whether to store clone values in multiple rows in the database? Optional. Default `false`. See [this post](https://metabox.io/introducing-clone-as-multiple-feature/) for details.
`attributes` | Custom attributes for inputs. See [more details](/custom-attributes/).

### Field types

Below is the list of all supported field types with brief description:

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

## Field-specific settings

Besides all common settings, each field type can have its own settings. Please see more details for each field type on the left menu (section "Fields").

{% include alert.html content="To save time read and write settings for fields, we've already prepared some code examples that you can get from [Meta Box Code Snippet Library](https://github.com/wpmetabox/library/)." %}

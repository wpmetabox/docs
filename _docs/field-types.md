---
title: Field Types
---

## Supported field types

This is the list of all supported field types in the Meta Box plugin with brief description:

Field Type | Description
--- | ---
`autocomplete` | Text input that uses jQuery autocomplete library to perform the autocomplete action. Added in [version 4.4.0](https://metabox.io/version-4-4-0/).
`button` | Display simple button. Usually used for JavaScript trigger
`checkbox` | Checkbox
`checkbox_list` | List of checkboxes
`color` | Color picker
`custom_html` | Output custom HTML content
`date` | Date picker
`datetime` | Date and time picker
`divider` | Simple horizontal line
`email` | Email input using HTML 5 input with `type="email"`
`fieldset_text` | Group of text inputs
`file` | Simple file upload with default UI like `<input type="file" />`.
`file_advanced` | Advanced file upload with UI like WordPress media upload popup. Inherits `file`.
`file_input` | Allow to enter URL for a file or select a file from media library (UI like WordPress media upload popup). This field saves file URL as meta value.
`file_upload` | File upload field, support drag and drop files. Inherits from `media`.
`heading` | Heading text
`hidden` | Input field with `hidden` type
`image` | Similar to `file` but used for images only. Allow drag and drop to reorder images. Inherits `file`.
`image_advanced` | Similar to `file_advanced`, but used for images only. Inherits `file_advanced`.
`image_select` | Similar to radio select, but use images instead of "radio"
`image_upload` or `plupload_image` | Image upload field, support drag and drop files. Inherits `image_advanced`.
`key_value` | Add an unlimited group of key-value pairs inputs
`map` | Google maps field
`number` | Input for numbers which uses new HTML5 input `type="number"`
`oembed` | Input for videos, audios from Youtube, Vimeo and all supported sites by WordPress. It has a preview feature.
`password` | Password input field
`post` | Select post from select dropdown. Support custom post types. Inherits options from `select` or `select_advanced` based on `field_type` parameter
`radio` | Radio input
`range` | HTML 5 range input
`select` | Select dropdown
`select_advanced` | Beautiful select dropdown using [`select2`](https://select2.github.io) library. Inherits `select`
`slider` | jQuery UI slider field
`taxonomy` | Select taxonomies. Has various options to display as check box list, select dropdown (supports simple select and `select_advanced` UI), tree (select parent taxonomy will show children taxonomies). **Note:** this field doesn't save term IDs in post meta, instead of that, it only set post terms.
`taxonomy_advanced`|Same as `taxonomy` but saves term IDs in post meta as a comma separated string. It doesn't set post terms.
`text` | Text field
`text_list` | Group of text inputs. Similar to `fieldset_text`.
`textarea` | Textarea field
`thickbox_image` | *Old* image upload using Thickbox. Deprecated.
`time` | Time picker
`url` | HTML 5 URL input
`user` | Select dropdown for user, supports simple select and `select_advanced` UI
`video` | Upload or select a video from the Media Library using the WordPress media popup. Supports video preview and multiple uploads.
`wysiwyg` | WordPress editor field

## Field type hierachy

It's important to know that some field types inherit from others, which means **all settings of the parents are available**. This image describe the field type hierarchy:

[![field type hierarchy](https://i.imgur.com/i6AUq3G.jpg)](https://i.imgur.com/i6AUq3G.jpg)

To understand field settings, please check [this documentation](/field-settings/).

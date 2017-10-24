---
title: Field types
---

This is the list of all supported field types in the Meta Box plugin with brief description:

Field Type | Description
--- | ---
`autocomplete` | Text input that uses jQuery autocomplete library to perform the autocomplete action.
`button` | Display simple button. Usually used for JavaScript triggers.
`checkbox` | Checkbox.
`checkbox_list` | List of checkboxes.
`color` | Color picker.
`custom_html` | Output custom HTML content.
`date` | Date picker.
`datetime` | Date and time picker.
`divider` | Simple horizontal line.
`email` | Email input using HTML 5 input with `type="email"`.
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
`select_advanced` | Beautiful select dropdown using [`select2`](https://select2.github.io) library.
`slider` | jQuery UI slider.
`taxonomy` | Select dropdown for taxonomy terms. Doesn't save term IDs in post meta, but set post terms.
`taxonomy_advanced`|Same as `taxonomy` but saves term IDs in post meta as a comma separated string. It doesn't set post terms.
`text` | Text field.
`text_list` | Group of text inputs. Similar to `fieldset_text`.
`textarea` | Textarea field.
`time` | Time picker.
`url` | HTML 5 URL input.
`user` | Select dropdown for users.
`video` | Upload or select a video from the Media Library using the WordPress media popup.
`wysiwyg` | WordPress editor.

## Field type hierachy

It's important to know that some field types inherit from others, which means **all settings of the parents are available** for them. This image describe the field type hierarchy:

[![field type hierarchy](https://i.imgur.com/i6AUq3G.jpg)](https://i.imgur.com/i6AUq3G.jpg)

To understand field settings, please check [this documentation](/field-settings/).

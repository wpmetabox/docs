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
`add_button`|The text for **Add more** clone button. Optional. Default "+ Add more".
`attributes` | Custom attributes for inputs. See [more details](/custom-attributes/).

### Field types

Below is the list of all supported field types with brief description:

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
`slider` | jQuery UI slider.
`taxonomy` | Select dropdown for taxonomy terms. Doesn't save term IDs in post meta, but set post terms.
`taxonomy_advanced`|Same as `taxonomy` but saves term IDs in post meta as a comma separated string. It doesn't set post terms.
`text` | Text field.
`text_list` | Group of text inputs. Similar to `fieldset_text`.
`textarea` | Textarea field.
`time` | Time picker.
`user` | Select dropdown for users.
`video` | Upload or select a video from the Media Library using the WordPress media popup.
`wysiwyg` | WordPress editor.

## Field-specific settings

Besides all common settings, each field type can have its own settings. Below is the list of settings for each field type.

Please see more details for each field type on the left menu (section "Fields").

{% include alert.html content="To save time read and write settings for fields, we've already prepared some code examples that you can get from [Meta Box Code Snippet Library](https://github.com/wpmetabox/library/)." %}


#### File Advanced - File Upload

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`mime_type` | Mime type of files which we want to show in Media Library. Note: this is a filter to list items in Media popup, it doesn't restrict file types when upload.
`max_status`|Whether to show the status of number of uploaded files when `max_file_uploads` is defined (xx/xx files uploaded). Optional. Default `true`.
`max_file_size` | Maximum file size that the user can upload, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. e.g. "10mb" or "1gb".
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.


#### Image Advanced - Image Upload

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`image_size` | The image size to show in the admin.
`mime_type` | Mime type of files which we want to show in Media Library. Note: this is a filter to list items in Media popup, it doesn't restrict file types when upload.
`max_status`|Whether to show the status of number of uploaded files when `max_file_uploads` is defined (xx/xx files uploaded). Optional. Default `true`.
`max_file_size` | Maximum file size that the user can upload, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. e.g. "10mb" or "1gb".
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.


#### Map

To register a map field, you need to actually register 2 fields:

- 1 field with type `text` which stores the address of the map.
- 1 field with type `map`. This field has the following attributes:

Name | Description
--- | ---
`address_field`|The ID of the text field above. Required.
`std`|The initial position of the map and the marker in format `latitude,longitude[,zoom]` (`zoom` is optional). Optional.
`api_key`|The Google Maps API key. This attribute is required since June 2016 and works in Meta Box 4.8.8+. [Get the API key here](https://developers.google.com/maps/documentation/javascript/get-api-key).
`region`|The region code, specified as a [ccTLD](https://en.wikipedia.org/wiki/Country_code_top-level_domain) (country code top-level domain). This parameter returns autocompleted address results influenced by the region (typically the country) from the address field. [See here for more details](https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes).

See [demo file](https://github.com/wpmetabox/meta-box/blob/master/demo/map.php).

#### Number

Name | Description
--- | ---
`step` | Set the increments at which a numeric value can be set. It can be the string `any` (for floating numbers) or a positive float number or integer. If this attribute is not set to `any`, the control accepts only values at multiples of the step value greater than the minimum. Default is `1`. Optional.
`min` | Minimum value. Optional.
`max` | Maximum value. Optional.
`placeholder` | Placeholder for the input field. Optional.

#### Post

Name | Description
--- | ---
`post_type` | post type where posts are get from
`field_type` | how to show posts, can be:
| `select`: simple select box of items (default). Optional. If choosing this field type, then the field can have options from `select` field (such as `placeholder`).
| `select_tree`: hierachical list of select boxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `select_advanced`: beautiful select box using [select2](https://select2.github.io/) library. If choosing this field type, then the field can have options from `select_advanced` field (such as `placeholder`), please check `select_advanced` field for full list of params.
| `checkbox_list`: flatten list of checkboxes which allows to select multiple items
| `checkbox_tree`: hierachical list of checkboxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `radio_list`: list of flatten radio boxes which allows to select only 1 item
`query_args` | additional query arguments, like in [`get_posts()`](https://codex.wordpress.org/Template_Tags/get_posts) function. Optional.

#### Radio

Name | Description
--- | ---
`options` | array of `'value' => 'Label'` pairs. `value` is stored in the custom field and `Label` is used to display in the meta box.
`inline`|Whether to show all options in a line? Optional. Default is `true`.

#### Select

Name | Description
--- | ---
`options` | array of `'value' => 'Label'` pairs. `value` is stored in the custom field and `Label` is used to display in the dropdown.
`placeholder` | instruction text for users to select value, like "Please select..."
`multiple` | allow to select multiple values or not. Can be `true` or `false`. Optional. Default `false`.
`select_all_none` | whether to show "Select: All | None" links that can help users select all options or clear selection. Used only when `multiple` is true. Optional. Default `false`.

#### Select Advanced

This field inherits all attributes from `select` field above and has more attributes as below:

Name | Description
--- | ---
`js_options` | array of options for `select2` library. See [this documentation](https://select2.github.io/options.html) for all options.

By default, Meta Box applies these default options for `js_options`:

Name | Description
--- | ---
`allowClear` | Allow users to clear selection. Default `true`.
`width` | Set width by element's width. Default `resolve`.
`placeholder` | Make `placeholder` works just like `select` field. Default `$field['placeholder']`.

#### Taxonomy

Name | Description
--- | ---
`taxonomy` | array or string of taxonomy slug(s)
`field_type` | how to show taxonomy, can be:
| `select`: simple select box of items (default). Optional. If choosing this field type, then the field can have options from `select` field (such as `placeholder`).
| `select_tree`: hierachical list of select boxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `select_advanced`: beautiful select box using [select2](https://select2.github.io/) library. If choosing this field type, then the field can have options from `select_advanced` field (such as `placeholder`), please check `select_advanced` field for full list of params.
| `checkbox_list`: flatten list of checkboxes which allows to select multiple items
| `checkbox_tree`: hierachical list of checkboxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `radio_list`: list of flatten radio boxes which allows to select only 1 item
`query_args` | additional query arguments, like in [`get_terms()`](https://codex.wordpress.org/Function_Reference/get_terms) function. Optional.

**Note:** this field does NOT save term IDs in post meta, instead of that, it only set post terms.

#### Taxonomy Advanced
This field is exactly the same as `taxonomy` field, but it saves term IDs in post meta as a comma separated string. It does NOT set post terms.

#### Text

Name | Description
--- | ---
`placeholder` | Placeholder for the input box. Optional.
`size` | Size of input box. Optional. Default 30.
`datalist` | Predefined values that users can select from (users still can enter text if they want). Optional. This parameter has the following sub-parameters:
|`id`: ID of the div that stores the options. Usually not used and auto-generated as `{$field['id']_list`. Useful if you have several text input with same datalist.
|`options`: Array of predefined values to select from.

#### Textarea

Name | Description
--- | ---
`cols` | number of columns. Optional. Default 60.
`rows` | number of rows. Optional. Default 4.

#### Text List

Attribute|Description
---|---
`options`|Array of `'placeholder' => 'label'` for the inputs.


#### Time

Name | Description
--- | ---
`size` | size of input box. Optional. Default 10.
`js_options` | jQuery date picker options. [See here](https://api.jqueryui.com/datepicker/), some main options are:
| `timeFormat`: Time format. Optional. Default `hh:mm`. For full list of time format, please [see here](https://trentrichardson.com/examples/timepicker/). **Note** | The `format` option is deprecated and replaced by this option.
| `showButtonPanel`: Show button panel or not? Optional. Default true.

(See `demo/date-time-js-options.php` for example).

#### User

Name | Description
--- | ---
`field_type` | how to show users, can be:
| `select`: simple select box of items (default). Optional. If choosing this field type, then the field can have options from `select` field (such as `placeholder`).
| `select_advanced`: beautiful select box using [select2](https://select2.github.io/) library. If choosing this field type, then the field can have options from `select_advanced` field (such as `placeholder`), please check `select_advanced` field for full list of params.
| `checkbox_list`: flatten list of checkboxes which allows to select multiple items
| `radio_list`: list of flatten radio boxes which allows to select only 1 item
`query_args` | additional query arguments, like in [`get_users()`](https://codex.wordpress.org/Function_Reference/get_users) function. Optional.

#### Video

Name | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.

#### WYSIWYG (Editor)

Name | Description
--- | ---
`raw` | If you want to save data in raw format, e.g. exactly the same as you enter in the editor <strong>without</strong> applying `wpautop()` function. Value can be `true` or `false` (default). Optional.
`options` | Array of editor options, which is the same as 3rd parameter for `wp_editor()` function. Please [read the Codex](https://codex.wordpress.org/Function_Reference/wp_editor) for full descriptions of all options.

By default, the plugin uses 2 options:

Name | Default Value | Description
--- | ---
`editor_class` | `rwmb-wysiwyg` | Just to make CSS consistent with other fields
`dfw` | `true` | Allow to use "Distraction Free Writing" mode (full-screen mode)
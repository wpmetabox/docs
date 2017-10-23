---
title: Define Fields
---

Each field in a meta box is an array of its own attributes.

## Common field attributes

Each field of a meta box can have the following attributes:

Attribute | Description
--- | ---
`name` | Name of the custom field. It'll be displayed in the meta box. Optional. Without name, the field input is 100% width.
`id` | ID of the field. Required. Must be unique. **It will be used as `meta_key`**. It's a good practice to use only numbers, letters, and underscores.
`type` | Field type. See the list below for all supported field types. Required.
`desc` | a short description explaining what it is. Optional.
`std` | Default value of the custom field. Optional.
`multiple`|Does the field have multiple values (like the `select` field)? Optional. Default `false`.
`class` | Custom CSS class, in case you want to style the field the way you want. Optional.
`before` | Custom HTML outputted before field's HTML
`after` | Custom HTML outputted after field's HTML
`clone` | Is the field clonable? `true` or `false`. Optional. Since 4.8.3 it works for all field types, including file, image and [wysiwyg](/cloning-wysiwyg-supported/).
`max_clone`|Maximum number of clones. Default 0 (unlimited).
`sort_clone`|Ability to drag-and-drop reorder clones (`true` or `false`). Optional. Default `false`.
`add_button`|The text for add more clone button. Optional. Default "+ Add more".
`attributes` | Custom attributes for inputs. See [more details](/custom-attributes-for-inputs/).


## List of supported field type

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
`select_advanced` | Beautiful select dropdown using [`select2`](http://select2.github.io) library. Inherits `select`
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


## Attributes for specific field types

Besides all common attributes, each field type can have other attributes. This section will describe all attributes for specific field types.

**Important:** The inherited fields can have attributes from their parents.

To understand the field hierarchy, please see [this image](http://i.imgur.com/i6AUq3G.jpg).

We already prepared snippets for all field types. You can save time by just copy-and-paste from [**this link**](https://github.com/wpmetabox/meta-box/tree/master/demo).

### Autocomplete

Attribute | Description
--- | ---
`options` | array of predefined `'value' => 'Label'` pairs. They're used to autocomplete from user input. `value` is stored in the custom field. Required.
`size` | input size. Default `30`. Optional.
`clone` | allow this field to be cloned? `true` or `false` (default). Optional.

Note: this field can store multiple values from user inputs

### Checkbox list

Attribute | Description
--- | ---
`options` | array of `'value' => 'Label'` pairs. `value` is stored in the custom field and `Label` is used to display in the meta box.

### Color

Attribute|Description
---|---
`alpha_channel`|Whether to add opacity to the color picker. `true` or `false` (default). Optional.
`js_options`|Array of color picker options. See full list of option on the Iris [project page](http://automattic.github.io/Iris/).

### Custom HTML

Attribute | Description
--- | ---
`std` | The custom HTML content which is displayed. Optional.
`callback`|The PHP callback function that shows the content (if `std` is not used). Optional. Using PHP callback allows you to access to WordPress's data such as current post, post content, current user, etc.

### Date

Attribute | Description
--- | ---
`size` | size of the input box. Optional. Default 10.
`inline`|display the date picker inline with the input, `true` or `false`? Optional. Default `false`.
`js_options` | jQuery date picker options. [See here](http://api.jqueryui.com/datepicker/), some main options are:
| `dateFormat`: Date format. Optional. Default `yy-mm-dd`. For the full list of date format, please [see here](http://docs.jquery.com/UI/Datepicker/formatDate). <strong>Note:</strong> The `format` option is deprecated and replaced by this option.
| `showButtonPanel` | Show button panel or not? Optional. Default `true`.
`timestamp` | save datetime in Unix timestamp format (but still display in human-readable format), `true` or `false`. Optional. Default `false`.

(See `demo/date-time-js-options.php` for example).

### Datetime

Attribute | Description
--- | ---
`size` | size of the input box. Optional. Default 20.
`inline`|display the date picker inline with the input? Optional. Default `false`.
`js_options` | a combination of date options and time options for jQuery. See `date` and `time` fields above.
`timestamp` | save datetime in Unix timestamp format (but still display in human-readable format), `true` or `false`. Optional. Default `false`.

### File

Attribute | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.

### File Advanced - File Upload

Attribute | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`mime_type` | Mime type of files which we want to show in Media Library. Note: this is a filter to list items in Media popup, it doesn't restrict file types when upload.
`max_status`|Whether to show the status of number of uploaded files when `max_file_uploads` is defined (xx/xx files uploaded). Optional. Default `true`.
`max_file_size` | Maximum file size that the user can upload, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. e.g. "10mb" or "1gb".
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.


### Image Advanced - Image Upload

Attribute | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`image_size` | The image size to show in the admin.
`mime_type` | Mime type of files which we want to show in Media Library. Note: this is a filter to list items in Media popup, it doesn't restrict file types when upload.
`max_status`|Whether to show the status of number of uploaded files when `max_file_uploads` is defined (xx/xx files uploaded). Optional. Default `true`.
`max_file_size` | Maximum file size that the user can upload, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. e.g. "10mb" or "1gb".
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.


### Map

To register a map field, you need to actually register 2 fields:

- 1 field with type `text` which stores the address of the map.
- 1 field with type `map`. This field has the following attributes:

Attribute | Description
--- | ---
`address_field`|The ID of the text field above. Required.
`std`|The initial position of the map and the marker in format `latitude,longitude[,zoom]` (`zoom` is optional). Optional.
`api_key`|The Google Maps API key. This attribute is required since June 2016 and works in Meta Box 4.8.8+. [Get the API key here](https://developers.google.com/maps/documentation/javascript/get-api-key).
`region`|The region code, specified as a [ccTLD](https://en.wikipedia.org/wiki/Country_code_top-level_domain) (country code top-level domain). This parameter returns autocompleted address results influenced by the region (typically the country) from the address field. [See here for more details](https://developers.google.com/maps/documentation/geocoding/intro#RegionCodes).

See [demo file](https://github.com/wpmetabox/meta-box/blob/master/demo/map.php).

### Number

Attribute | Description
--- | ---
`step` | Set the increments at which a numeric value can be set. It can be the string `any` (for floating numbers) or a positive float number or integer. If this attribute is not set to `any`, the control accepts only values at multiples of the step value greater than the minimum. Default is `1`. Optional.
`min` | Minimum value. Optional.
`max` | Maximum value. Optional.
`placeholder` | Placeholder for the input field. Optional.

### Post

Attribute | Description
--- | ---
`post_type` | post type where posts are get from
`field_type` | how to show posts, can be:
| `select`: simple select box of items (default). Optional. If choosing this field type, then the field can have options from `select` field (such as `placeholder`).
| `select_tree`: hierachical list of select boxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `select_advanced`: beautiful select box using [select2](https://select2.github.io/) library. If choosing this field type, then the field can have options from `select_advanced` field (such as `placeholder`), please check `select_advanced` field for full list of params.
| `checkbox_list`: flatten list of checkboxes which allows to select multiple items
| `checkbox_tree`: hierachical list of checkboxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `radio_list`: list of flatten radio boxes which allows to select only 1 item
`query_args` | additional query arguments, like in [`get_posts()`](http://codex.wordpress.org/Template_Tags/get_posts) function. Optional.

### Radio

Attribute | Description
--- | ---
`options` | array of `'value' => 'Label'` pairs. `value` is stored in the custom field and `Label` is used to display in the meta box.
`inline`|Whether to show all options in a line? Optional. Default is `true`.

### Select

Attribute | Description
--- | ---
`options` | array of `'value' => 'Label'` pairs. `value` is stored in the custom field and `Label` is used to display in the dropdown.
`placeholder` | instruction text for users to select value, like "Please select..."
`multiple` | allow to select multiple values or not. Can be `true` or `false`. Optional. Default `false`.
`select_all_none` | whether to show "Select: All | None" links that can help users select all options or clear selection. Used only when `multiple` is true. Optional. Default `false`.

### Select Advanced

This field inherits all attributes from `select` field above and has more attributes as below:

Attribute | Description
--- | ---
`js_options` | array of options for `select2` library. See [this documentation](https://select2.github.io/options.html) for all options.

By default, Meta Box applies these default options for `js_options`:

Attribute | Description
--- | ---
`allowClear` | Allow users to clear selection. Default `true`.
`width` | Set width by element's width. Default `resolve`.
`placeholder` | Make `placeholder` works just like `select` field. Default `$field['placeholder']`.

### Taxonomy

Attribute | Description
--- | ---
`taxonomy` | array or string of taxonomy slug(s)
`field_type` | how to show taxonomy, can be:
| `select`: simple select box of items (default). Optional. If choosing this field type, then the field can have options from `select` field (such as `placeholder`).
| `select_tree`: hierachical list of select boxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `select_advanced`: beautiful select box using [select2](https://select2.github.io/) library. If choosing this field type, then the field can have options from `select_advanced` field (such as `placeholder`), please check `select_advanced` field for full list of params.
| `checkbox_list`: flatten list of checkboxes which allows to select multiple items
| `checkbox_tree`: hierachical list of checkboxes which allows to select multiple items (select/deselect parent item will show/hide child items)
| `radio_list`: list of flatten radio boxes which allows to select only 1 item
`query_args` | additional query arguments, like in [`get_terms()`](http://codex.wordpress.org/Function_Reference/get_terms) function. Optional.

**Note:** this field does NOT save term IDs in post meta, instead of that, it only set post terms.

### Taxonomy Advanced
This field is exactly the same as `taxonomy` field, but it saves term IDs in post meta as a comma separated string. It does NOT set post terms.

### Text

Attribute | Description
--- | ---
`placeholder` | Placeholder for the input box. Optional.
`size` | Size of input box. Optional. Default 30.
`datalist` | Predefined values that users can select from (users still can enter text if they want). Optional. This parameter has the following sub-parameters:
|`id`: ID of the div that stores the options. Usually not used and auto-generated as `{$field['id']_list`. Useful if you have several text input with same datalist.
|`options`: Array of predefined values to select from.

### Textarea

Attribute | Description
--- | ---
`cols` | number of columns. Optional. Default 60.
`rows` | number of rows. Optional. Default 4.

### Text List

Attribute|Description
---|---
`options`|Array of `'placeholder' => 'label'` for the inputs.


### Time

Attribute | Description
--- | ---
`size` | size of input box. Optional. Default 10.
`js_options` | jQuery date picker options. [See here](http://api.jqueryui.com/datepicker/), some main options are:
| `timeFormat`: Time format. Optional. Default `hh:mm`. For full list of time format, please [see here](http://trentrichardson.com/examples/timepicker/). **Note** | The `format` option is deprecated and replaced by this option.
| `showButtonPanel`: Show button panel or not? Optional. Default true.

(See `demo/date-time-js-options.php` for example).

### User

Attribute | Description
--- | ---
`field_type` | how to show users, can be:
| `select`: simple select box of items (default). Optional. If choosing this field type, then the field can have options from `select` field (such as `placeholder`).
| `select_advanced`: beautiful select box using [select2](https://select2.github.io/) library. If choosing this field type, then the field can have options from `select_advanced` field (such as `placeholder`), please check `select_advanced` field for full list of params.
| `checkbox_list`: flatten list of checkboxes which allows to select multiple items
| `radio_list`: list of flatten radio boxes which allows to select only 1 item
`query_args` | additional query arguments, like in [`get_users()`](http://codex.wordpress.org/Function_Reference/get_users) function. Optional.

### Video

Attribute | Description
--- | ---
`max_file_uploads` | Max number of uploaded files. Optional.
`force_delete` | Whether or not delete the files from Media Library when deleting them from post meta (`true` or `false`)? Optional. Default `false`.

### WYSIWYG (Editor)

Attribute | Description
--- | ---
`raw` | If you want to save data in raw format, e.g. exactly the same as you enter in the editor <strong>without</strong> applying `wpautop()` function. Value can be `true` or `false` (default). Optional.
`options` | Array of editor options, which is the same as 3rd parameter for `wp_editor()` function. Please [read the Codex](http://codex.wordpress.org/Function_Reference/wp_editor) for full descriptions of all options.

By default, the plugin uses 2 options:

Attribute | Default Value | Description
--- | ---
`editor_class` | `rwmb-wysiwyg` | Just to make CSS consistent with other fields
`dfw` | `true` | Allow to use "Distraction Free Writing" mode (full-screen mode)
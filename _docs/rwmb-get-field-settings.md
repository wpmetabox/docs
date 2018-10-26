---
title: rwmb_get_field_settings
---

## Overview

`rwmb_get_field_settings` is a helper function which gets the field settings by field ID.

It's very helpful in case you want to refer to field's name, field's options array (in a select field) or other settings later in your code.

## Usage

To get field settings by field ID, just call:

```php
$field = rwmb_get_field_settings( $field_id );
// Result: array( 'id' => 'field_id', 'name' => 'Field Name', 'type' => 'text, ... );
```

However, if you create a custom field for [terms](https://metabox.io/plugins/mb-term-meta/), [users](https://metabox.io/plugins/mb-user-meta/) or [settings pages](https://metabox.io/plugins/mb-settings-page/), you will need to specify object type in the second parameter:

```php
$field = rwmb_get_field_settings( $field_id, array( 'object_type' => 'term' ) ); // or 'user', 'setting
```

## Arguments

This function accepts 3 arguments as below:

```php
$field = rwmb_get_field_settings( $field_id, $args, $object_id );
```

Name|Description
---|---
`$field_id`|The field ID. Required.
`$args`|Extra arguments for some object types or storages. It works similarly in [rwmb_meta](https://docs.metabox.io/rwmb-meta/) function. Can be array or a string in format `param1=value1&param2=value2`. See more details in field types (on the left menu, section Fields). Optional.
`$object_id`|Object ID that custom fields are get from. Optional. If not present, current post ID is used.

## Returned value

This function returns full array of field settings.

## See also

- [How to get field settings by field ID?](https://metabox.io/get-field-settings/)

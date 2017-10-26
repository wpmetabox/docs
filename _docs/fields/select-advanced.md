---
title: Select Advanced
---

## Overview

The autocomplete field creates a simple text input with autocomplete feature. Users are able to select multiple values from the predefined list.

This field uses jQuery UI library to perform the autocomplete action.

## Screenshot

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'value' => 'Label'` pairs. They're used to autocomplete from user input. `value` is stored in the custom field. Required.
`size` | Input size. Default `30`. Optional.

Note that the `multiple` setting is always set to `true` for this field.

## Data

This field saves multiple values in the database. Each value is store in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

If field is not cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $value ) {
	echo $value;
}
```

If field is cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $clone ) {
	foreach ( $clone as $value ) {
		echo $value;
	}
}
```
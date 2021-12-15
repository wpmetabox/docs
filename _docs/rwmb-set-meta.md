---
title: rwmb_set_meta
---

`rwmb_set_meta` is a helper function that helps you to set meta value for an object.

To set meta value, use the following code:

```php
rwmb_set_meta( $object_id, $field_id, $value, $args = [] );
```

Parameter|Description
---|---
`$object_id`|Object (post, term, user) ID. If you need to set value for an option (using MB Settings Page), object ID is the option name.
`$field_id`|Field ID.
`$value`|Value. Should be compatible with field value format. See [database](https://docs.metabox.io/database/).
`$args`|Extra arguments for some object types or storages. It works similarly in [rwmb_meta](https://docs.metabox.io/rwmb-meta/) function. Can be array or a string in format param1=value1&param2=value2.Optional.

**Important Note**

This function works only when the field is already registered. In Meta Box, fields are registered at hook `init` with priority 20. So, you need to run this function after that:

```php
add_action( 'init', function() {
	rwmb_set_meta( 12, 'my_field', 'my_value' );
}, 99 );
```

## Examples

Setting a field value for a post:

```php
add_action( 'init', function() {
	$post_id = 123;
	$field_id = 'my_field';
	$value = 'My custom value';
	rwmb_set_meta( $post_id, $field_id, $value );
}, 99 );
```

Setting a field value for a term:

```php
add_action( 'init', function() {
	$term_id = 123;
	$field_id = 'my_field';
	$value = 'My custom value';
	rwmb_set_meta( $term_id, $field_id, $value );
}, 99 );
```

Setting a field value for a user:

```php
add_action( 'init', function() {
	$user_id = 123;
	$field_id = 'my_field';
	$value = 'My custom value';
	rwmb_set_meta( $user_id, $field_id, $value );
}, 99 );
```

Setting a field value for a settings page:

```php
add_action( 'init', function() {
	$option_name = 'my_option';
	$field_id = 'my_field';
	$value = 'My custom value';
	rwmb_set_meta( $option_name, $field_id, $value, [ 'object_type' => 'setting' ] );
}, 99 );
```

Setting a field value with custom table:

```php
add_action( 'init', function() {
	$table_name = 'my_table';
	$post_id = 123;
	$field_id = 'my_field';
	$value = 'My custom value';
	rwmb_set_meta( $post_id, $field_id, $value, [
		'storage_type' => 'custom_table',
		'table'        => $table_name,
	] );
}, 99 );
```

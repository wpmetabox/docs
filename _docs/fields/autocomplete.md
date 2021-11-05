---
title: Autocomplete
---

## Overview

The autocomplete field creates a simple text input with autocomplete feature. You are able to select multiple values from the predefined list.

This field uses jQuery UI library to perform the autocomplete action.

## Screenshot

![autocomplete](https://i.imgur.com/zvZI8qs.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'value' => 'Label'` pairs. `'value'` is stored in the custom field and `'Label'` is used for autocomplete. You can also set this param an URL to remote resource that returns the array of data in JSON format. Required.
`size` | Input size. Default `30`. Optional.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
array(
    'name'    => 'Autocomplete',
    'id'      => 'field_id',
    'type'    => 'autocomplete',
    // Options of autocomplete, in format 'value' => 'Label'
    'options' => array(
        'java'       => 'Java',
        'javascript' => 'JavaScript',
        'php'        => 'PHP',
        'c'          => 'C',
        'cplusplus'  => 'C++',
        'csharp'     => 'C#',
        'objectivec' => 'Objective-C',
        'kotlin'     => 'Kotlin',
        'swift'      => 'Swift',
    ),
)
```

## Getting options remotely via Ajax

In case you want to use remote data instead of user-defined data for the `options`, you can set this parameter an URL of your remote data source.

This is an example:

```php
array(
    'name' => 'Some Field',
    'id' => 'some_field',
    'type' => 'autocomplete',
    'options' => admin_url( 'admin-ajax.php?action=some_field' ),
)
```

This field will fetch the data via Ajax. The ajax callback is handled in the following code:

```php
add_action( 'wp_ajax_some_field', function() {
   $s = $_REQUEST[ 'term' ];
   // Do some stuff here to find matches.

  $response = array(
      array( 'value' => '123', 'label' => 'Some Post' ),
      array( 'value' => '77', 'label' => 'Another Post' )
  );

  // Do some stuff to prepare JSON response ( headers, etc ).
  echo wp_json_encode( $response );
  die;
} );
```

Note that the data returned must be in JSON format as above. The ajax request also sends the search term via `$_REQUEST['term']` parameter as you see above.

## Data

This field saves multiple values in the database. Each value is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, then the value is stored as a serialized array in a single row in the database. Each value of that array is an array of cloned values.

Note that this field stores the options' values, not labels.

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

The values got and displayed here are the options' values, not labels.

Read more about [rwmb_meta()](/rwmb-meta/).

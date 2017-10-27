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
`options` | Array of `'value' => 'Label'` pairs. `'value'` is stored in the custom field and `'Label'` is used for autocomplete. Required.
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

## Data

This field saves multiple values in the database. Each value is store in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, then the value is stored as a serialized array in a single row in the database. Each value of that array is an array of clone's values.

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

The values get and displayed here are the options' values, not labels.

Read more about [rwmb_meta()](/rwmb-meta/).
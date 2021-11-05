---
title: Select Advanced
---

## Overview

The select advanced field creates a beautiful select dropdown using the [select2](https://select2.org/) library.

## Screenshot

![select advanced](https://i.imgur.com/65OkGbt.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'value' => 'Label'` pairs. They're used to display choices. `value` is stored in the custom field. Required.
`multiple` | Whether to allow select multiple values? `true` or `false` (default).
`placeholder` | The placeholder text.
`select_all_none` | Display "Select All / None" button to fast toggle choices. Applied only when `multiple` is `true`.
`js_options` | Array of options for `select2` library. [See here](https://select2.org/configuration).

By default, Meta Box applies these default options for `js_options`:

Name | Value | Description
--- | ---
`allowClear` | `true` | Allow users to clear selection.
`width` | `resolve` | Set width by element's width.
`placeholder` | `$field['placeholder']` | Make `placeholder` works just like `select` field.

## Sample code

```php
array(
    'name'            => 'Select Advanced',
    'id'              => 'select_advanced',
    'type'            => 'select_advanced',
    // Array of 'value' => 'Label' pairs
    'options'         => array(
        'java'       => 'Java',
        'javascript' => 'JavaScript',
        'php'        => 'PHP',
        'csharp'     => 'C#',
        'objectivec' => 'Objective-C',
        'kotlin'     => 'Kotlin',
        'swift'      => 'Swift',
    ),
    // Allow to select multiple value?
    'multiple'        => false,
    // Placeholder text
    'placeholder'     => 'Select an Item',
    // Display "Select All / None" button?
    'select_all_none' => false,
    // select2 configuration. See https://select2.org/configuration
    'js_options'      => array(
        'containerCssClass' => 'my-custom-class',
    ),
),
```

## Data

If `multiple` is `false`, this field simply saves the selected value in the database. The saved value is the `value` in the `options` array (not label).

If `multiple` is `true`, this field saves multiple values in the database, where aech value is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, the value is stored as a serialized array in a single row in the database.

## Template usage

If field is not multiple:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

If field is either multiple or cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $value ) {
    echo $value;
}
```

If field is both multiple and cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $clone ) {
    foreach ( $clone as $value ) {
        echo $value;
    }
}
```

The function [rwmb_meta()](/rwmb-meta/) only returns the value of the field, e.g. the key in the `options` array. To display the field label, use this code:

```php
rwmb_the_value( $field_id );
```

Depending on the value is a single value or an array (multiple or cloneable or both), this function outputs a simple string or an unordered list.

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

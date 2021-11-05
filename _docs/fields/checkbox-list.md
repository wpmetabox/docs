---
title: Checkbox list
---

## Overview

The checkbox list field creates a list of tick-able checkboxes. You are able to select multiple choices from the predefined list.

## Screenshots

Default:

![checkbox list](https://i.imgur.com/HTqO71G.png)

With "Select All / None" button:

![checkbox list toggle](https://i.imgur.com/XQDaCFO.png)

Inline:

![checkbox list inline](https://i.imgur.com/0WuJEv6.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'value' => 'Label'` pairs. `value` is stored in the custom field. Required.
`inline` | Display choices in a single line? `true` or `false`. Default `false`.
`select_all_none` | Display "Select All / None" button to fast toggle choices.

Note that the `multiple` setting is always set to `true` for this field.

## Sample code

```php
array(
    'name'    => 'Checkbox list',
    'id'      => 'field_id',
    'type'    => 'checkbox_list',
    // Options of checkboxes, in format 'value' => 'Label'
    'options' => array(
        'java'       => 'Java',
        'javascript' => 'JavaScript',
        'php'        => 'PHP',
        'csharp'     => 'C#',
        'objectivec' => 'Objective-C',
        'kotlin'     => 'Kotlin',
        'swift'      => 'Swift',
    ),
    // Display options in a single row?
    // 'inline' => true,
    // Display "Select All / None" button?
    'select_all_none' => true,
),
```

## Data

This field saves multiple values in the database. Each value is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

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

The function [rwmb_meta()](/rwmb-meta/) only returns the value of the field, e.g. the key in the `options` array. To display the field label, use this code:

```php
rwmb_the_value( $field_id );
```

which outputs:

```html
<ul>
    <li>Java</li>
    <li>JavaScript</li>
</ul>
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

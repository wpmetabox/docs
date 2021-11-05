---
title: Fieldset Text
---

## Overview

The fieldset text create a set of text inputs. It's useful if you want to save related information.

## Screenshot

![fielset text](https://i.imgur.com/qh3pfUd.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`options` | Array of `'key' => 'Input Label'` pairs. `key` is used as key of array of values stored in the database.

Note that the `multiple` setting is always set to `false` for this field.

## Sample code

```php
array(
    'id'      => 'field_id',
    'name'    => 'Fieldset Text',
    'type'    => 'fieldset_text',

    // Options: array of key => Label for text boxes
    // Note: key is used as key of array of values stored in the database
    'options' => array(
        'name'    => 'Name',
        'address' => 'Address',
        'email'   => 'Email',
    ),

    // Is field cloneable?
    'clone' => true,
),
```

## Data

This field always stores the value as a serialized array in a single row in the database. Each element of that array will have the key as specified in the field's `options`.

## Template usage

If field is not cloneable:

```php
$value = rwmb_meta( $field_id );
echo $value['name'];
echo $value['address'];
echo $value['email'];
```

If field is cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $value ) {
    echo $value['name'];
    echo $value['address'];
    echo $value['email'];
}
```

Read more about [rwmb_meta()](/rwmb-meta/).

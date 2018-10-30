---
title: Text List
---

## Overview

The text list field creates a a list of simple text inputs. You are able to select multiple values from the predefined list.

This field uses jQuery UI library to perform the text list action.

## Screenshot

![text list](https://i.imgur.com/Y7qo1No.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name|Description
---|---
`options`|Array of `'placeholder' => 'label'` for the inputs.

## Sample code

```php
array(
    'id'      => 'text_list',
    'name'    => 'Text List',
    'type'    => 'text_list',

    'clone' => true,

    // Options: array of Placeholder => Label for text boxes
    // Number of options are not limited
    'options' => array(
        'John Smith'      => 'Name',
        'name@domain.com' => 'Email',
    ),
),
```

## Data

If the field is not cloneable, the data is stored in multiple rows in the database. Each row has the same meta key as the field ID, and the value is the value in the corresponding text input.

If the field is cloneable, then the value is stored as a serialized array of values in a single row in the database.

## Template usage

If field is not cloneable:

```php
$values = rwmb_meta( $field_id );
echo $values[0]; // Name
echo $values[1]; // Email
```

If field is cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $value ) {
    echo $value[0]; // Name
    echo $value[1]; // Email
}
```

If you want to just display the value of this field in a table, use this code:

```php
rwmb_the_value( $field_id );
```

which outputs:

![text list output](https://i.imgur.com/jpypypW.png)

HTML:

```html
<table>
    <tr>
        <th>Name</th>
        <th>Email</th>
    <tr>
    <tr>
        <td>Name 1</td>
        <td>email1@domain.com</td>
    </tr>
    <tr>
        <td>Name2</td>
        <td>email2@domain.com</td>
    </tr>
</table>
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

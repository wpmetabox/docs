---
title: Textarea
---

## Overview

The textarea field creates a simple textarea (multiline) input. You can use this field for entering a paragraph of text or custom HTML.

## Screenshot

![textarea](https://i.imgur.com/Wrg9ISA.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`placeholder` | The placeholder text. Optional.
`cols` | Number of columns. Optional. Default 60.
`rows` | Number of rows. Optional. Default 4.

## Data

This field simply saves a single entered value in the database. The value is saved as it is. So if you enter HTML, it will save exactly that HTML part.

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

If field is not cloneable:

```php
$value = rwmb_meta( $field_id );
echo $value;
```

If field is cloneable:

```php
$values = rwmb_meta( $field_id );
foreach ( $values as $value ) {
    echo $value;
}
```

This field outputs exactly what you have entered. So be careful if you enter HTML.

Read more about [rwmb_meta()](/rwmb-meta/).
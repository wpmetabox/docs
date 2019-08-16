---
title: Key Value
---

## Overview

The key value field allows you to enter unlimited group of "key-value" pairs. It's usually used for a list of items.

## Screenshot

![key value](https://i.imgur.com/yA7rRDR.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`placeholder` | Array of placeholder texts for key and value inputs. Format `array( 'key' => 'Key placeholder', 'value' => 'Value placeholder' )`. Optional.
`size` | Input size. Default `30`. Optional.

Note that for this field, `multiple` and `clone` settings are always set to `true`.

## Sample code

```php
array(
    'id'   => 'key_value',
    'name' => 'Key Value',
    'type' => 'key_value',
    'desc' => 'Add more additional info below:',
),
```

## Data

This field saves a serialized array of data of pairs in a single row in the database.

## Template usage

To get the field value, use the following code:

```php
$pairs = rwmb_meta( $field_id );
foreach ( $pairs as $pair ) {
    ?>
    <p><strong><?php echo $pair[0]; ?>:</strong> <?php echo $pair[1]; ?></p>
    <?php
}
```

If you only want to display pairs in an unordered list, you can just use the [rwmb_the_value()](/rwmb-the-value/):

```php
rwmb_the_value( $field_id );
```

which outputs:

```html
<ul>
    <li><label>key1:</label> value1</li>
    <li><label>key2:</label> value2</li>
</ul>
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

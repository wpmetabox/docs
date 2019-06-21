---
title: Custom field type
---

## Overview

Meta Box plugin is so flexible that you can create your own field type easily. This documentation will show you how to create a new field type `phone` which accepts the only phone in format `xxx-xxxx`.

## Field class

We need create a class name `RWMB_Phone_Field` for `phone` field. Generally, if we want to create a new field type, we need create a class name `RWMB_{$field_type}_Field` (make sure it has a correct case) extending `RWMB_Field` class.

```php
if ( class_exists( 'RWMB_Field' ) ) {
    class RWMB_Phone_Field extends RWMB_Field {
    }
}
```

Save this class in a PHP file with any name, assuming `field-phone.php`. Then include that file in `functions.php` file of your theme or in plugin's file:

```php
add_action( 'init', 'prefix_load_phone_type' );
function prefix_load_phone_type() {
    require 'path/to/field-phone.php';
}
```

{% include alert.html content="We use `init` action to make sure all Meta Box files are loaded and class `RWMB_Field` is defined." %}

## Methods

The phone class inherits all methods from `RWMB_Field` class. The full list of `RWMB_Field` methods and their description are described in [this documentation](/rwmb-field-class/).

For phone field, we have to define content of `html` method to define field HTML:

```php
public static function html( $meta, $field ) {
    return sprintf(
        '<input type="tel" name="%s" id="%s" value="%s" pattern="d{3}-d{4}">',
        $field['field_name'],
        $field['id'],
        $meta
    );
}
```

Here we use new HTML5 input type `tel` with new attribute `pattern` to force users to enter correct phone number format `xxx-xxxx`.

For this field, we don't need to handle saving or retrieving meta value or enqueueing scripts and styles. Everything is handled automatically by the Meta Box plugin.

The complete code for this class is the following:

```php
if ( class_exists( 'RWMB_Field' ) ) {
    class RWMB_Phone_Field extends RWMB_Field {
        public static function html( $meta, $field ) {
            return sprintf(
                '<input type="tel" name="%s" id="%s" value="%s" pattern="d{3}-d{4}">',
                $field['field_name'],
                $field['id'],
                $meta
            );
        }
    }
}
```

## Using new field type

Now we can register fields with `phone` type, like this:

```php
$meta_boxes[] = array(
    'title' => 'Test',
    'fields' => array(
        array(
            'name' => 'Phone',
            'id'   => 'field_id',
            'type' => 'phone',
        ),
        // Other fields
    ),
);
```

Now when you go to edit post page, you'll see a new field like this:

![new field type](https://i.imgur.com/lK8DRW7.png)

That's all for this simple field type. If you want to create a more complicated field, just overwrite methods from [`RWMB_Field` class](/rwmb-field-class/). You might want to enqueue scripts and styles, sanitizing field value before saving in the database, etc. The `RWMB_Field` class has all methods for that you just need to overwrite necessary methods.

## Notes

If you need to make the field cloneable using the same clone feature in Meta Box, it's recommended to add a CSS class to your inputs that start with `rwmb`. The clone script will automatically detect all the inputs started with `rwmb` and set the correct `id` and `name` attribute.

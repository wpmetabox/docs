---
title: rwmb_get_registry
---

## Overview

`rwmb_get_registry` is used to get list of registered meta boxes or fields.

Meta boxes and fields are stored in a meta box registry and field registry correspondingly. This function allows you to retrieve them (and filter them) to get the meta box or field you want.

## Usage

To get meta box or field registry use the code below:

```php
$meta_box_registry = rwmb_get_registry( 'meta_box' );
$field_registry = rwmb_get_registry( 'field' );
```

Each registry has some methods as described below:

### Meta box registry

Meta box registry is a storage of all meta box objects (instances of `RW_Meta_Box` class). The registry stores all meta box objects in a private array of the form meta_box_id => meta_box_object.

To get all meta box objects, use this method:

```php
$meta_boxes = $meta_box_registry->all();
```

To get a specific meta box object by id, use this method:

```php
$meta_box = $meta_box_registry->get( 'meta_box_id' );
```

To get meta boxes by some attributes, use this method:

```php
$args = [
    'object_type' => 'post',
    'post_types'  => ['post'],
];
$meta_boxes = $meta_box_registry->get_by( $args );
```

Here `$args` is an array of [meta box settings](https://docs.metabox.io/creating-meta-boxes/) that you use to filter the list of meta boxes.

### Field registry

Similar to meta box registry, field registry is a storage of all fields. Each field is an array of its own settings. Note that fields are not objects.

Since fields can have the same ID for different object types (posts, terms, users, settings pages), we can't store fields in the registry in a one-dimentional array as meta box registry. Instead of that, we store it in a multi-dimentional array like this:

```php
[
    'post' => [
        'post'             => [$field1, $field2],
        'page'             => [$field3, $field4],
        'custom_post_type' => [$field5, $field6],
    ],
    'term' => [
        'category'        => [$field1, $field2],
        'post_tag'        => [$field3, $field4],
        'custom_taxonomy' => [$field5, $field6],
    ],
    'user' => [
        'user' => [$field1, $field2],
    ],
    'setting' => [
        'setting_page_1' => [$field1, $field2],
        'settings_page_2' => [$field1, $field2],
    ],
]
```

To get a specific field, you need to specify object type and the sub-type for it:

- For `post` object type, sub-type is the post type slug.
- For `term`, it's the taxonomy slug.
- For `user`, it's always `user`.
- For `setting`, it's the settings page ID.

```php
$field = $field_registry->get( $id, $type, $object_type = 'post' );

// Example:
$field = $field_registry->get( 'my_field_id', 'my_custom_post_type' );
```

The last parameter `$object_type` can be omitted. Its default value is `post`.

To get all fields by object type, use this code:

```php
$fields = $field_registry->get_by_object_type( $object_type = 'post' );

// Example: Get all fields for posts
$fields = $field_registry->get_by_object_type( 'post' );


// Example: Get all fields for terms
$fields = $field_registry->get_by_object_type( 'term' );


// Example: Get all fields for users
$fields = $field_registry->get_by_object_type( 'user' );


// Example: Get all fields for settings pages
$fields = $field_registry->get_by_object_type( 'setting' );
```

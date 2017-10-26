---
title: Looping fields
---

Before 4.8, if you register the meta boxes using [the old way](/registering-meta-boxes/) (with `admin_init` hook), you could loop through the `['fields']` keys of the global variable `$meta_boxes` to get all fields registered for a meta box. Here is an example of the old way:

```php
global $meta_boxes;
if ( isset( $meta_boxes['meta_box_id']['fields'] ) ) {
    foreach ( $meta_boxes['meta_box_id']['fields'] ) as $key ) {
        $value = rwmb_meta( $key['id'] );
        if ( ! empty($value) ) {
            echo '<label>' . $key['name'] . '</label> ' . $value;
        }
    }
}
```

This loop was very handy if your meta box has, say, 20 fields.

Since 4.8, the `$meta_boxes` is not used as a global variable anymore. You're recommended to use `rwmb_meta_boxes` to register meta boxes and fields. But it's still pretty easy to loop through the Meta-Box-only field keys using `RWMB_Core::get_meta_boxes()` function. The code is almost identical:

```php
$meta_boxes = RWMB_Core::get_meta_boxes();
if ( isset( $meta_boxes['meta_box_id']['fields'] ) ) {
    foreach ( $meta_boxes['meta_box_id']['fields'] ) as $key ) {
        $value = rwmb_meta( $key['id'] );
        if ( ! empty($value) ) {
            echo '<label>' . $key['name'] . '</label> ' . $value;
        }
    }
}
```

**Note:** Without this function you would be trying to loop through ALL post meta, and there may be WordPress meta fields that are not part of your Meta Box, and you don't want those. Without the core function, to retrieve only the values for your meta box with `get_post_meta`, you would have to know and re-list all the field keys separately in your code.
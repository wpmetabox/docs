---
title: MB Term Meta
---

MB Term Meta helps you to add custom fields to taxonomies.

![category custom fields](https://i0.wp.com/metabox.io/wp-content/uploads/2016/01/term-meta.png?resize=768%2C576&ssl=1)

## Settings

Creating custom meta boxes for taxonomies is similar to posts. The only difference is you need to specify `taxonomies` settings which the meta box will be added to:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_taxonomy_meta_boxes' );
function prefix_register_taxonomy_meta_boxes( $meta_boxes ){
    $meta_boxes[] = array(
        'title'      => 'Standard Fields',
        'taxonomies' => 'category', // THIS: List of taxonomies. Array or string

        'fields' => array(
            array(
                'name' => 'Featured?',
                'id'   => 'featured',
                'type' => 'checkbox',
            ),
            array(
                'name' => 'Featured Content',
                'id'   => 'featured_content',
                'type' => 'wysiwyg',
            ),
            array(
                'name' => 'Featured Image',
                'id'   => 'image_advanced',
                'type' => 'image_advanced',
            ),
            array(
                'name' => 'Color',
                'id'   => 'color',
                'type' => 'color',
            ),
        ),
    );
    return $meta_boxes;
}
```

Result:

![mb term meta](https://i.imgur.com/zMaoafC.png)

## Data

WordPress provides an identical way to store values in the meta tables for post / term / user. This extension utilizes that API and stores field value in the term meta exactly like post meta.

## Getting field value

You're able to use helper function [rwmb_meta()](/rwmb-meta/) to get field value for terms.

```php
$value = rwmb_meta( $field_id, ['object_type' => 'term'], $term_id );
echo $value;
```

Notes:

- In the 2nd parameter, you need to pass `'object_type' => 'term'`, and
- In the last parameter, you need to pass the term ID

To get the `$term_id` for the current category/term page, please use the function `get_queried_object_id()`. So the statement look like this:

```php
$term_id = get_queried_object_id();
$value = rwmb_meta( $field_id, ['object_type' => 'term'], $term_id );
echo $value;
```

Other parameters are the same as for post. Please see [this documentation](/displaying-fields/) for details.

{% include alert.html type="warning" content="It requires the extension version 1.1+ to use the helper function. If you're using an older version, please [update now](/extensions/update/)." %}

In case you use an older version than 1.1, you can get fiel value manually:

```php
$meta = get_term_meta( $term_id, $field_id, true );
echo $meta;

// Or use this code if field has multiple value
$meta = get_term_meta( $term_id, $field_id, false );
foreach ( $meta as $value ) {
    echo $value;
}
```

Note that the `get_term_meta` function returns only raw data of field value. It doesn't return meaningful information for images, file, etc. To do that, please add a small piece of code as follow:

```php
// Getting images
$image_ids = get_term_meta( $term_id, $field_id, false ); // Media fields are always multiple.
foreach ( $image_ids as $image_id ) {
    $image = RWMB_Image_Field::file_info( $image_id, array( 'size' => 'thumbnail' ) );
    echo '<img src="' . $image['url'] . '">';
}
```

{% include helpers.html %}

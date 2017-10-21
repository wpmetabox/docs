---
title: MB Term Meta
permalink: /mb-term-meta/
---

{% include installation.html %}


## Add custom fields to terms

Registering custom meta boxes and custom fields for taxonomy is similar to posts. See [this documentation](/registering-meta-boxes/) to know how to register a meta box, and [this documentation](/define-fields/) to know how to define fields.

The **only difference** here is when you **register a meta box for a taxonomy**, you need to specify a parameter `taxonomies` which the meta box will be added to. This parameter can be an array of taxonomy slugs or a string of single taxonomy slug. And you **have to** remove the parameter `post_types`.

## Example

The code below register a meta box for category which has 4 custom fields:

```php
add_filter( 'rwmb_meta_boxes', 'YOUR_PREFIX_register_taxonomy_meta_boxes' );
function YOUR_PREFIX_register_taxonomy_meta_boxes( $meta_boxes )
{
    $meta_boxes[] = array(
        'title'      => 'Standard Fields',
        'taxonomies' => 'category', // List of taxonomies. Array or string

        'fields' => array(
            array(
                'name' => __( 'Featured?', 'textdomain' ),
                'id'   => 'featured',
                'type' => 'checkbox',
            ),
            array(
                'name' => __( 'Featured Content', 'textdomain' ),
                'id'   => 'featured_content',
                'type' => 'wysiwyg',
            ),
            array(
                'name' => __( 'Featured Image', 'textdomain' ),
                'id'   => 'image_advanced',
                'type' => 'image_advanced',
            ),
            array(
                'name' => __( 'Color', 'textdomain' ),
                'id'   => 'color',
                'type' => 'color',
            ),
        ),
    );
    return $meta_boxes;
}
```

Result:

![mb term meta](https://metabox.io/wp-content/uploads/2016/01/term-meta.png)

## Getting term meta value

### Using helper function

Since version 1.1, you're able to use [helper function `rwmb_meta`](/get-meta-value/) to get term meta value.

```php
$value = rwmb_meta( $field_id, array( 'object_type' => 'term' ), $term_id );
echo $value;
```

The code is very similar to [get post meta](/get-meta-value/). The differences are:

- In the 2nd parameter, you need to pass `'object_type' => 'term'`, and
- In the last parameter, you need to pass the term ID

Other parameters are the same as for post. Please see [this documentation](/get-meta-value/) for details.

### Manually retrieve value

Term meta value is saved in a similar way as post meta. To get term meta value, use the function:

```php
$meta = get_term_meta( $term_id, $field_id, true );
echo $meta;

// Or use this code if field has multiple value
$meta = get_term_meta( $term_id, $field_id, false );
if ( $meta ) {
    foreach ( $meta as $value ) {
        echo $value;
    }
}
```

**Important Note**:

The helper function returns only raw data of term meta value. It doesn't return meaningful information for images, file, etc. To do that, please add a small piece of code as follow:

```php
// Getting images
$image_ids = get_term_meta( $term_id, $field_id, false ); // Media fields are always multiple.
foreach ( $image_ids as $image_id ) {
    $image = RWMB_Image_Field::file_info( $image_id, array( 'size' => 'thumbnail' ) );
    echo '<img src="' . $image['url'] . '" width="' . $image['width'] . '" height="' . $image['height'] . '">';
}
```

{% include helpers.html %}
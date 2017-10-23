---
title: MB User Meta
---

{% include installation.html %}

## Add custom fields to user profile

Registering custom fields for user is similar to posts. See [this documentation](/registering-meta-boxes/) to know how to register a meta box, and [this documentation](/define-fields/) to know how to define fields. The **only difference** here is when you **register a meta box for user profile** , you need to specify a parameter `'type' => 'user'`. That's all!

## Example

The code below register 2 meta boxes (sections) for user profile:

```php
add_action( 'rwmb_meta_boxes', function prefix_register_user_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'title' => 'Contact Info',
        'type'  => 'user', // Specifically for user

        'fields' => array(
            array(
                'name' => __( 'Mobile phone', 'textdomain' ),
                'id'   => 'mobile',
                'type' => 'tel',
            ),
            array(
                'name' => __( 'Work phone', 'textdomain' ),
                'id'   => 'work',
                'type' => 'tel',
            ),
            array(
                'name' => __( 'Address', 'textdomain' ),
                'id'   => 'address',
                'type' => 'textarea',
            ),
            array(
                'name'    => __( 'City', 'textdomain' ),
                'id'      => 'city',
                'type'    => 'select_advanced',
                'options' => array(
                    'hanoi' => 'Hanoi',
                    'hcm'   => 'Ho Chi Minh City'
                ),
            ),
        ),
    );
    $meta_boxes[] = array(
        'title' => 'Custom avatar',
        'type'  => 'user', // Specifically for user

        'fields' => array(
            array(
                'name'            => __( 'Upload avatar', 'textdomain' ),
                'id'              => 'avatar',
                'type'            => 'image_advanced',
                'max_file_uploads' => 1,
            ),
        ),
    );

    return $meta_boxes;
}
```

Result:

![User meta screenshot](https://i.imgur.com/mRZJKhZ.png)

## Getting user meta value

Since version 1.1, you're able to use helper function `rwmb_meta` to get user meta value.

```php
$value = rwmb_meta( $field_id, array( 'object_type' => 'user' ), $user_id );
echo $value;
```

The code is very similar to get post meta. The differences are:
- In the 2nd parameter, you need to pass `'object_type' => 'user'`, and
- In the last parameter, you need to pass the user ID

Other parameters are the same as for post. Please see [this documentation](/get-meta-value/) for details.

### Manually retrieve value

User meta value is saved in a similar way as post meta. To get user meta value, use the function:

```php
$meta = get_user_meta( $term_id, $field_id, true );
echo $meta;
// Or use this code if field has multiple value
$meta = get_user_meta( $term_id, $field_id, false );
if ( $meta ) {
    foreach ( $meta as $value ) {
        echo $value;
    }
}
```

The helper function returns only raw data of term meta value. It doesn't return meaningful information for images, file, etc. To do that, please add a small piece of code as follow:

```php
// Getting images
$image_ids = get_user_meta( $term_id, $field_id, false ); // Media fields are always multiple.
foreach ( $image_ids as $image_id ) {
    $image = RWMB_Image_Field::file_info( $image_id, array( 'size' => 'thumbnail' ) );
    echo '<img src="' . $image['url'] . '" width="' . $image['width'] . '" height="' . $image['height'] . '" />';
}
```

{% include helpers.html %}
---
title: MB User Meta
---

MB User Meta helps you to add custom fields to user profile.

![user meta](https://i1.wp.com/metabox.io/wp-content/uploads/2016/07/user-meta-1.png)

The extension works only on the back end. If you want to edit user profile on the front end, please see [MB User Profile](/extensions/mb-user-profile/).

## Adding fields to user profile

Registering custom fields for users is similar to posts. The only difference here is you need to specify a parameter `'type' => 'user'`:

```php
add_action( 'rwmb_meta_boxes', function( $meta_boxes ) {
    $meta_boxes[] = array(
        'title' => 'Contact Info',
        'type'  => 'user', // THIS: Specifically for user

        'fields' => array(
            array(
                'name' => 'Mobile phone',
                'id'   => 'mobile',
                'type' => 'tel',
            ),
            array(
                'name' => 'Work phone',
                'id'   => 'work',
                'type' => 'tel',
            ),
            array(
                'name' => 'Address',
                'id'   => 'address',
                'type' => 'textarea',
            ),
            array(
                'name'    => 'City',
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
        'type'  => 'user', // THIS: Specifically for user

        'fields' => array(
            array(
                'name'            => 'Upload avatar',
                'id'              => 'avatar',
                'type'            => 'image_advanced',
                'max_file_uploads' => 1,
            ),
        ),
    );

    return $meta_boxes;
} );
```

Result:

![User meta screenshot](https://i.imgur.com/mRZJKhZ.png)

## Data

WordPress provides an identical way to store values in the meta tables for post / term / user. This extension utilizes that API and stores field value in the user meta exactly like post meta.

## Getting field value

You're able to use helper function [rwmb_meta()](/rwmb-meta/) to get field value:

```php
$value = rwmb_meta( $field_id, ['object_type' => 'user'], $user_id );
echo $value;
```

The code is very similar to getting post meta. The differences are:
- In the 2nd parameter, you need to pass `'object_type' => 'user'`, and
- In the last parameter, you need to pass the user ID

Other parameters are the same as for posts. Please see [this documentation](/displaying-fields/) for details.

{% include alert.html type="warning" content="It requires the extension version 1.1+ to use the helper function. If you're using an older version, please [update now](/extensions/update/)." %}

In case you use an older version than 1.1, you can get the field value manually:

```php
$meta = get_user_meta( $user_id, $field_id, true );
echo $meta;

// Or use this code if field has multiple value
$meta = get_user_meta( $user_id, $field_id, false );
foreach ( $meta as $value ) {
    echo $value;
}
```

Note that the code above returns only raw data of user meta value. It doesn't return meaningful information for images, file, etc. To do that, please add a small piece of code as follow:

```php
// Getting images
$image_ids = get_user_meta( $user_id, $field_id, false ); // Media fields are always multiple.
foreach ( $image_ids as $image_id ) {
    $image = RWMB_Image_Field::file_info( $image_id, array( 'size' => 'thumbnail' ) );
    echo '<img src="' . $image['url'] . '">';
}
```

{% include helpers.html %}

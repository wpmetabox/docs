---
title: Edit meta boxes
---

When you use a WordPress theme or plugin which [integrates Meta Box](/integration/), all the information of fields and meta boxes are fixed, such as: meta box title, number of fields, fields' names and descriptions, ... How to change these texts or add/remove fields of an existing meta box or even remove a meta box?

Assuming we have 2 meta boxes registered in a parent theme:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_meta_boxes' );
function prefix_register_meta_boxes( $meta_boxes ) {
    // 1st meta box
    $meta_boxes[] = array(
        'id'     => 'personal',
        'title'  => 'Personal Information',
        'fields' => array(
            array(
                'name'  => 'Name',
                'id'    => 'name',
                'desc'  => 'Enter your full name: First Last',
                'type'  => 'text',
            ),
            array(
                'name'  => 'Occupation',
                'id'    => 'occupation',
                'desc'  => 'What do you do?',
                'type'  => 'text',
            ),
        ),
    );

    // 2nd meta box
    $meta_boxes[] = array(
        'id'     => 'address',
        'title'  => 'Address Info',
        'fields' => array(
            array(
                'name'  => 'Street',
                'id'    => 'street',
                'type'  => 'text',
            ),
            array(
                'name'  => 'City',
                'id'    => 'city',
                'type'  => 'text',
            ),
            array(
                'name'  => 'State',
                'id'    => 'state',
                'type'  => 'text',
            ),
        ),
    );

    return $meta_boxes;
}
```

which are rendered as following:

![meta boxes](https://i.imgur.com/VwDhVeD.png)

We want to:

- Remove "Personal Information" meta box
- Change title of "Address Info" meta box to "Address"
- Add description for field "Street" in "Address" meta box
- Add field "zip_code" (text field) to "Address" meta box

Our custom code will be put in `functions.php` file of the child theme.

The principle is simple as following:

- Hook to `rwmb_meta_boxes` filter with a high priority to get all registered meta boxes
- Then we check meta boxes by ID or title to get the meta boxes we want to edit / remove
- Remove or change meta boxes information if needed (such as meta box title)
- For that meta box, we loop through all custom fields and change fields' info
- And finally add more fields to that meta box if needed

The code is quite straight as following (with all necessary comments):

```php
// Priority 20 makes sure all meta boxes are already registered
add_filter( 'rwmb_meta_boxes', 'prefix_edit_meta_boxes', 20 );
function prefix_edit_meta_boxes( $meta_boxes ) {
    // Loop throught all meta boxes to find the ones we need
    foreach ( $meta_boxes as $k => $meta_box ) {
        // Remove "Personal Information" meta box
        if ( isset( $meta_box['id'] ) && 'personal' == $meta_box['id'] ) {
            unset( $meta_boxes[$k] );
        }

        // Edit "Address Info" meta box
        if ( isset( $meta_box['id'] ) && 'address' == $meta_box['id'] ) {
            // Change title to "Address"
            $meta_boxes[$k]['title'] = 'Address';

            // Loop through all fields
            foreach ( $meta_box['fields'] as $j => $field ) {
                // Add description for "Street" field
                if ( 'street' == $field['id'] ) {
                    $meta_boxes[$k][$j]['desc'] = 'Enter street address';
                }
            }

            // Add field "zip_code" to this meta box
            $meta_boxes[$k]['fields'][] = array(
                'name' => 'Zip code',
                'id'   => 'zip_code',
                'type' => 'text',
            );
        }
    }

    // Return edited meta boxes
    return $meta_boxes;
}
```

Here is the result:

![edit remove meta boxes](https://i.imgur.com/CxkIV6L.png)

{% include alert.html content="It's recommended to set meta box ID to easier looping through all meta boxes." %}
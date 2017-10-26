---
title: Edit meta boxes
---

When you use a WordPress theme or plugin which [incorporates with Meta Box](/include-meta-box-plugin-themes/), all the information of fields and meta boxes are fixed, such as: meta box title, number of fields, fields' names and descriptions, ... It might be better in some situations when you want to **change these texts or add/remove fields to a meta box or even remove a meta box**.

Assuming we have 2 meta boxes registered in a WordPress parent theme or a plugin with this code below:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_meta_boxes' );
function prefix_register_meta_boxes( $meta_boxes ) {
    $prefix = 'your_prefix_';

    // 1st meta box
    $meta_boxes[] = array(
        'id'         => 'personal',
        'title'      => __( 'Personal Information', 'meta-box' ),
        'post_types' => array( 'post', 'page' ),
        'fields'     => array(
            array(
                'name'  => __( 'Name', 'meta-box' ),
                'id'    => "{$prefix}name",
                'desc'  => __( 'Enter your full name: First Last', 'meta-box' ),
                'type'  => 'text',
            ),
            array(
                'name'  => __( 'Occupation', 'meta-box' ),
                'id'    => "{$prefix}occupation",
                'desc'  => __( 'What do you do?', 'meta-box' ),
                'type'  => 'text',
            ),
        ),
    );

    // 2nd meta box
    $meta_boxes[] = array(
        'id'         => 'address',
        'title'      => __( 'Address Info', 'meta-box' ),
        'post_types' => array( 'post', 'page' ),
        'fields'     => array(
            array(
                'name'  => __( 'Street', 'meta-box' ),
                'id'    => "{$prefix}street",
                'type'  => 'text',
            ),
            array(
                'name'  => __( 'City', 'meta-box' ),
                'id'    => "{$prefix}city",
                'type'  => 'text',
            ),
            array(
                'name'  => __( 'State', 'meta-box' ),
                'id'    => "{$prefix}state",
                'type'  => 'text',
            ),
        ),
    );

    return $meta_boxes;
}
```

which are rendered as following:

![meta boxes](https://i.imgur.com/VwDhVeD.png)

Now we will:

- Remove "Personal Information" meta box
- Change title of "Address Info" meta box to "Address"
- Add description for field "Street" in "Address" meta box
- Add field "zip_code" (text field) to "Address" meta box

Our custom code will be put in `functions.php` file of the child theme (or in a custom plugin if we want).

The principle is simple as following:

- We hook to `rwmb_meta_boxes` filter with higher priority than 10 to get all registered meta boxes
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
                if ( 'your_prefix_street' == $field['id'] ) {
                    $meta_boxes[$k][$j]['desc'] = 'Enter street adress';
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

[box]**Note:** It's always a good practice to set **meta box ID** (even when it's optional). In the code above we check meta boxes by ID to get the ones we want to edit or remove. It's fine to check by meta box title, but it will be harder if the website uses another language and the meta box title is translated.[/box]
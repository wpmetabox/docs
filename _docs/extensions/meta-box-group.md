---
title: Meta Box Group
---

{% include installation.html %}

## Usage

Make sure you know how to [register meta boxes](/registering-meta-boxes/) and [define fields](/field-settings/) before continuing!

The **Meta Box Group** adds a new field type `group`. This field type has following attributes:

Attribute|Description
---|---
`name`|Field name (label), same like other normal fields. Optional.
`id`|Field ID, will be used to store custom field values of all sub-field.
`type`|Must be `group`
`fields`|Array of sub-fields. Each sub-field is declared as a normal field.
`clone`|Is the group clonable?
`sort_clone`|Can clones be sorted? `true` or `false`. If `true`, you can drag and drop group clones to reorder them.
`collapsible`|Make group collapsible? `true` or `false`. Default `false`. Optional.
`group_title`|The title of collapsible group. Can be string or array. If string and has `{#}`, it will be replaced by the group index (if group is cloned). If array, use the format `array( 'field' => 'sub_field_id' )` to display the value of the sub-field in the group title. If you want to display value from multiple sub-fields in the group title (including sub-fields from sub-groups), you can use the format `array( 'field' => 'sub_field_1, sub_field_2', 'separator' => ' ' )`, e.g. separate sub-fields by commas and set the separator string (default is a space).
`save_state`|Whether or not save the collapse/expand state? `true` or `false`. Default `false`. Optional.

So, to add a group, you need to add a field with type `group` and list of sub-fields in its `fields` attribute, like this:

```php
$meta_boxes[] = array(
    'title' => 'Meta Box Title',
    'fields' => array(
        array(
            'name' => 'Group', // Optional
            'id' => 'group_id',
            'type' => 'group',
            // List of sub-fields
            'fields' => array(
                array(
                    'name' => 'Text',
                    'id' => 'text',
                    'type' => 'text',
                ),
                // Other sub-fields here
            ),
        ),
    ),
);
```

### Sample code

The code below creates a group for tracks in an album, each track is a group and is clonable (see screenshot below):

```php
add_filter( 'rwmb_meta_boxes', 'meta_box_group_demo_register' );
function meta_box_group_demo_register( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => __( 'Album Tracks' ),
        'fields' => array(
            array(
                'id'     => 'standard',
                // Group field
                'type'   => 'group',
                // Clone whole group?
                'clone'  => true,
                // Drag and drop clones to reorder them?
                'sort_clone' => true,
                // Sub-fields
                'fields' => array(
                    array(
                        'name' => __( 'Track name', 'rwmb' ),
                        'id'   => 'text',
                        'type' => 'text',
                    ),
                    array(
                        'name' => __( 'Release Date', 'rwmb' ),
                        'id'   => 'date',
                        'type' => 'date',
                    ),
                    array(
                        'name'    => __( 'Genre', 'rwmb' ),
                        'id'      => 'genre',
                        'type'    => 'select_advanced',
                        'options' => array(
                            'pop'  => __( 'Pop', 'rwmb' ),
                            'rock' => __( 'Rock', 'rwmb' ),
                        ),
                    ),
                ),
            ),
        ),
    );
    return $meta_boxes;
}
```

Here is how it appears:

![clone group (repeater)](https://metabox.io/wp-content/uploads/2015/02/group-clone-repeater.png)

### Multi-level nested groups

Since version 1.1, the Meta Box Group extension supports multi-level nested groups. To add nested groups to a group, simply register a new field with type `group` and add subfields to it. Here is an example:

```php
add_filter( 'rwmb_meta_boxes', 'demo_nested_groups' );
function demo_nested_groups( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => __( 'Multi-level nested groups', 'textdomain' ),
        'fields' => array(
            array(
                'id'     => 'group',
                'type'   => 'group',
                'clone'  => true,
                'fields' => array(
                    // Normal field (cloned)
                    array(
                        'name'  => __( 'Text', 'textdomain' ),
                        'id'    => 'text',
                        'type'  => 'text',
                        'clone' => true,
                    ),
                    // Nested group level 2
                    array(
                        'name'   => __( 'Sub group', 'textdomain' ),
                        'id'     => 'sub_group',
                        'type'   => 'group',
                        'clone'  => true,
                        'fields' => array(
                            // Normal field (cloned)
                            array(
                                'name'  => __( 'Sub text', 'textdomain' ),
                                'id'    => 'sub_text',
                                'type'  => 'text',
                                'clone' => true,
                            ),
                        ),
                    ),
                ),
            ),
        ),
    );
    return $meta_boxes;
}
```

Result:

![multi-level nested groups](https://metabox.io/wp-content/uploads/2015/02/Multi-level-groups.png)

### Collapsible Groups:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'      => 'Company Branches',
        'post_types' => 'page',
        'fields'     => array(
            array(
                'id'          => 'g1',
                'name'        => 'Branches',
                'type'        => 'group',
                'clone'       => true,
                'sort_clone'  => true,
                'collapsible' => true,
                'group_title' => array( 'field' => 'name' ), // ID of the subfield
                'save_state' => true,

                'fields' => array(
                    array(
                        'name' => 'Name',
                        'id'   => 'name',
                        'type' => 'text',
                    ),
                    array(
                        'name' => 'Address',
                        'id'   => 'address',
                        'type' => 'text',
                    ),
                    array(
                        'id'          => 'contacts',
                        'type'        => 'group',
                        'clone'       => true,
                        'collapsible' => true,
                        'save_state'  => true,
                        'group_title' => array( 'field' => 'person' ),
                        'fields'      => array(
                            array(
                                'id'   => 'person',
                                'type' => 'text',
                                'name' => 'Person',
                            ),
                            array(
                                'id'   => 'phone',
                                'type' => 'text',
                                'name' => 'Phone',
                            ),
                        ),
                    ),
                ),
            ),
        ),
    );

    return $meta_boxes;
} );
```

## How to get meta value of a sub-field

To get meta value of a sub-field, you need to get meta value of the group. This is done with following code:

```php
$group_value = rwmb_meta( 'group_id' );
```

The returned value is associated array of sub-fields' values with keys are sub-fields IDs, like this:

```php
array(
    'sub_field_1_key' => 'sub_field_1_value',
    'sub_field_2_key' => 'sub_field_2_value',
    'sub_field_3_key' => 'sub_field_3_value',
    //...
)
```

So, to get value of a sub-field, use the following code:

```php
$value = isset( $group_value[$sub_field_key] ) ? $group_value[$sub_field_key] : '';
echo $value; // Display sub-field value
```

If the group is **cloneable**, then the value returned by `rwmb_meta` is array of group values, each group value is an array of sub-fields' values:

```php
array(
    array(
        'sub_field_1_key' => 'sub_field_1_value',
        'sub_field_2_key' => 'sub_field_2_value',
        'sub_field_3_key' => 'sub_field_3_value',
        //...
    ),
    array(
        'sub_field_1_key' => 'sub_field_1_value',
        'sub_field_2_key' => 'sub_field_2_value',
        'sub_field_3_key' => 'sub_field_3_value',
        //...
    ),
    //...
)
```

To output values of cloneable groups, use the following code:

```php
$group_values = rwmb_meta( 'group_id' );
if ( ! empty( $group_values ) ) {
    foreach ( $group_values as $group_value ) {
        $value = isset( $group_value[$sub_field_key] ) ? $group_value[$sub_field_key] : '';
        echo $value; // Display sub-field value
    }
}
```

**Important Note**:

The helper function returns only raw data of group's value, e.g. it does exactly what `get_post_meta( $post_id, 'group_id', true );` does. It doesn't return meaningful information for images, file, etc. To do that, please add a small piece of code as follow:

```php
// Group is cloneable
$group_values = rwmb_meta( 'group_id' );
if ( ! empty( $group_values ) ) {
    foreach ( $group_values as $group_value ) {
        $image_ids = isset( $group_value['image_key'] ) ? $group_value['image_key'] : array();
        foreach ( $image_ids as $image_id ) {
            $image = RWMB_Image_Field::file_info( $image_id, array( 'size' => 'thumbnail' ) );
            echo '<img src="' . $image['url'] . '" width="' . $image['width'] . '" height="' . $image['height'] . '">';
        }
    }
}
```

{% include helpers.html %}

### Example

This sample code registers a group of fields: contact name, contact email, contact phone number:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_contacts' );
function prefix_register_contacts( $meta_boxes ) {
    $meta_boxes[] = array(
        'title' => __( 'Contacts', 'textdomain' ),
        'post_types' => 'post',
        'fields' => array(
            array(
                'id' => 'contacts',
                'type' => 'group',
                'clone' => true,
                'fields' => array(
                    array(
                        'id' => 'name',
                        'type' => 'text',
                        'name' => __( 'Name', 'textdomain' ),
                    ),
                    array(
                        'id' => 'email',
                        'type' => 'text',
                        'name' => __( 'Email', 'textdomain' ),
                    ),
                    array(
                        'id' => 'phone',
                        'type' => 'text',
                        'name' => __( 'Phone', 'textdomain' ),
                    ),
                ),
            ),
        ),
    );
    return $meta_boxes;
}
```

In the `single.php`, you can add the following code to display contacts:

```php
$contacts = rwmb_meta( 'contacts' );
if ( ! empty( $contacts ) ) {
    foreach ( $contacts as $contact ) {
        echo '<div class="contact">';
        echo '<h4>', __( 'Contact info', 'textdomain' ), '</h4>';
        echo '<p><label>', __( 'Name:', 'textdomain' ), '<label> ', $contact['name'], '</p>';
        echo '<p><label>', __( 'Email:', 'textdomain' ), '<label> ', $contact['email'], '</p>';
        echo '<p><label>', __( 'Phone number:', 'textdomain' ), '<label> ', $contact['phone'], '</p>';
        echo '</div>';
    }
}
```

This is another more advanced example with nested group:

Group field declaration:

```php
array(
    'id'   => "{$prefix}sector",
    'type' => 'group',
    'clone'  => true,
    'sort_clone' => false,
    'fields' => array(
        array(
            'name' => __( 'Name1', 'rw_' ),
            'id'   => "{$prefix}sector-heading",
            'type' => 'heading',
        ),
        array(
            'name' => __( 'Name2', 'rw_' ),
            'id'   => "{$prefix}sector-title",
            'type' => 'textarea',
            'cols' => 10,
            'rows' => 1,
        ),
        // Group nested
        array(
            'id'  => "{$prefix}sector-object",
            'type' => 'group',
            'clone'  => true,
            'sort_clone' => true,
            'fields' => array(
                array(
                    'name'  => __( 'Name3', 'rw_' ),
                    'id'    => "{$prefix}sector-object-img",
                    'type'  => 'image_advanced',
                    'max_file_uploads' => 1,
                ),
                array(
                    'name' => __( 'Name4', 'rw_' ),
                    'id'   => "{$prefix}sector-object-description",
                    'type' => 'textarea',
                    'cols' => 10,
                    'rows' => 4,
                ),

            ),
        ),
    ),
),
```

How to get value and output in the frontend:

```php
$prefix = '';
$sectors = rwmb_meta( "{$prefix}sector" );
if ( ! empty( $sectors ) ) {
    foreach ( $sectors as $sector ) {
        $sector_heading = isset( $sector["{$prefix}sector-heading"] ) ? $sector["{$prefix}sector-heading"] : '';
        echo $sector_heading;

        $sector_title = isset( $sector["{$prefix}sector-title"] ) ? $sector["{$prefix}sector-title"] : '';
        echo $sector_title;

        $objects = isset( $sector["{$prefix}sector-object"] ) ? $sector["{$prefix}sector-object"] : array();
        foreach ( $objects as $object ) {
            $object_imgs = isset( $object["{$prefix}sector-object-img"] ) ? $object["{$prefix}sector-object-img"] : array();
            if ( !empty( $object_imgs ) ) {
                foreach ( $object_imgs as $object_img ) {
                    echo '<img src="' . wp_get_attachment_image_url( $object_img, 'size' ) . '">';
                }
            }
            $object_desc = isset( $object["{$prefix}sector-object-description"] ) ? $object["{$prefix}sector-object-description"] : '';
            echo $object_desc;
        }
    }
}
```

## Change clone button text

Since Meta Box version 4.11, you can change the clone button text by using `add_button` parameter for fields, like below:

```php
array(
    'type' => 'group',
    'name' => __( 'Tracks', 'textdomain' ),
    'id' => 'tracks',
    'add_button' => __( 'Add another track', 'textdomain' ),
    'fields' => array(
        // Sub-fields here.
    ),
),
```

If you're using Meta Box prior to 4.11, you can use a filter to change the add clone button text. There are 3 filters that you can use:

```php
rwmb_add_clone_button_text
rwmb_group_clone_button_text
rwmb_{$field_id}_add_clone_button_text
```

Each filter receives 2 parameters: `$text` - the clone button text and `$field` - the group field parameters.

To use the filter, add the following code to your theme `functions.php` file or inside your plugin:

```php
add_filter( 'rwmb_tracks_add_clone_button_text', 'prefix_tracks_add_clone_button_text', 10, 2 );
function prefix_group_add_clone_button_text( $text, $field ) {
    return __( 'Add another track', 'textdomain' );
}
```

## Known issues:

- When cloning fields or groups, `id` attribute of inputs are adjusted. In multi-level nested groups, they're changed without any rule. So please don't rely on them to perform custom JavaScript actions.
- ~~While WYSIWYG is cloneable as a standalone field, its cloning feature might not work properly in groups because its `id` is changed unexpectedly.~~ WYSIWGY field now can be cloned without problems with groups.
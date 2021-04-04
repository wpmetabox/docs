---
title: Meta Box Group
---

**Meta Box Group** helps you to organize custom fields into repeatable and collapsible groups. You can use this extension to group similar fields into one group to create hierarchy. You can clone the whole group, or sub-group. There's no limitation on the nesting level.

![meta box group example](https://i1.wp.com/metabox.io/wp-content/uploads/2015/02/meta-box-group-example.png)

## Tutorial

If this is the first time you use [Meta Box Group](https://metabox.io/plugins/meta-box-group/), please follow the beginner tutorial here:

[How to Create a Group of Custom Fields with Meta Box Group](https://metabox.io/create-group-of-custom-fields-with-meta-box-group/)

The documentation below is like a detailed reference that you can use anytime you want to look for something in Meta Box Group.

## Settings

The Meta Box Group adds a new field type `group`. This field type has following settings:

Name|Description
---|---
`name`|Field name (label), same like other normal fields. Optional.
`id`|Field ID, will be used to store custom field values of all sub-field.
`type`|Must be `group`
`fields`|Array of sub-fields. Each sub-field is declared as a normal field.
`clone`|Is the group clonable?
`sort_clone`|Can clones be sorted? `true` or `false`. If `true`, you can drag and drop group clones to reorder them.
`collapsible`|Make group collapsible? `true` or `false`. Default `false`. Optional.
`save_state`|Whether or not save the collapse/expand state? `true` or `false`. Default `false`. Optional.
`default_state`|Is the group collapsed or expanded by default (when page loads)? `collapsed` or `expanded` (default).
`group_title`|The title of collapsible group. See section collapsible groups for details.

So, to add a group, you need to add a field with type `group` and list of sub-fields in its `fields` attribute, like this:

```php
$meta_boxes[] = array(
    'title'  => 'Meta Box Title',
    'fields' => array(
        array(
            'name'   => 'Group', // Optional
            'id'     => 'group_id',
            'type'   => 'group',
            // List of sub-fields
            'fields' => array(
                array(
                    'name' => 'Text',
                    'id'   => 'text',
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
        'title'  => 'Album Tracks',
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
                        'name' => 'Track name',
                        'id'   => 'text',
                        'type' => 'text',
                    ),
                    array(
                        'name' => 'Release Date',
                        'id'   => 'date',
                        'type' => 'date',
                    ),
                    array(
                        'name'    => 'Genre',
                        'id'      => 'genre',
                        'type'    => 'select_advanced',
                        'options' => array(
                            'pop'  => 'Pop',
                            'rock' => 'Rock',
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

![clone group (repeater)](https://i.imgur.com/KVIJzSa.png)

### Nested groups

To add nested groups to a group, simply register a new field with type `group` and add subfields to it. Here is an example:

```php
add_filter( 'rwmb_meta_boxes', 'demo_nested_groups' );
function demo_nested_groups( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => 'Multi-level nested groups',
        'fields' => array(
            array(
                'id'     => 'group',
                'type'   => 'group',
                'clone'  => true,
                'fields' => array(
                    // Normal field (cloned)
                    array(
                        'name'  => 'Text',
                        'id'    => 'text',
                        'type'  => 'text',
                        'clone' => true,
                    ),
                    // Nested group level 2
                    array(
                        'name'   => 'Sub group',
                        'id'     => 'sub_group',
                        'type'   => 'group',
                        'clone'  => true,
                        'fields' => array(
                            // Normal field (cloned)
                            array(
                                'name'  => 'Sub text',
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

![multi-level nested groups](https://i.imgur.com/gWazAFA.png)

The plugin supports unlimited nesting levels.

### Collapsible groups

To make a group collapsible, you need to set the settings `'collapsible' => true`. The collapsible group also has the following settings:

Name|Description
---|---
`save_state`|Whether or not save the collapse/expand state? `true` or `false`. Default `false`. Optional.
`default_state`|Is the group collapsed or expanded by default (when page loads)? `collapsed` or `expanded` (default).
`group_title`|The title of collapsible group.

The `group_title` settings can show static text, the group index (if group is cloneable), sub-field value or *any combination of them*. To do that, simply set a `group_title` as a text and use the following format:

```
'group_title' => 'Static text {#} {sub_field_1} {sub_field_2}',
```

To specify the group index, use `{#}`. To specify a sub field value, use `{sub_field_id}`. You can add as many sub fields as you want and mix them in any way.

This is an example of a collapsible group:

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
                        'group_title' => '{person}',
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

## Getting sub-field values

To get sub-field value, you need to get meta value of the group. This is done with following code:

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

### Examples

This sample code registers a group of fields: contact name, contact email, contact phone number:

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_contacts' );
function prefix_register_contacts( $meta_boxes ) {
    $meta_boxes[] = array(
        'title' => 'Contacts',
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
                        'name' => 'Name',
                    ),
                    array(
                        'id' => 'email',
                        'type' => 'text',
                        'name' => 'Email',
                    ),
                    array(
                        'id' => 'phone',
                        'type' => 'text',
                        'name' => 'Phone',
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
        echo '<h4>', 'Contact info', '</h4>';
        echo '<p><label>', 'Name:', '<label> ', $contact['name'], '</p>';
        echo '<p><label>', 'Email:', '<label> ', $contact['email'], '</p>';
        echo '<p><label>', 'Phone number:', '<label> ', $contact['phone'], '</p>';
        echo '</div>';
    }
}
```

This is another more advanced example with nested group:

Group field declaration:

```php
array(
    'id'     => 'sector',
    'type'   => 'group',
    'clone'  => true,
    'fields' => array(
        array(
            'name' => 'Title',
            'id'   => 'sector-title',
            'type' => 'text',
        ),
        // Group nested
        array(
            'id'     => 'sector-object',
            'type'   => 'group',
            'clone'  => true,
            'fields' => array(
                array(
                    'name' => 'Images',
                    'id'   => 'sector-object-img',
                    'type' => 'image_advanced',
                ),
                array(
                    'name' => 'Description',
                    'id'   => 'sector-object-description',
                    'type' => 'textarea',
                ),
            ),
        ),
    ),
),
```

How to get value and output in the frontend:

```php
// Requires PHP 7+.
$sectors = rwmb_meta( 'sector' );
$sectors = $sectors ?? [];
foreach ( $sectors as $sector ) {
    echo $sector['sector-title'] ?? '';

    $objects = $sector['sector-object'] ?? [];
    foreach ( $objects as $object ) {
        $imgs = $object['sector-object-img'] ?? : [];
        foreach ( $imgs as $img ) {
            echo '<img src="' . wp_get_attachment_image_url( $img, 'your_image_size' ) . '">';
        }
        echo $object['sector-object-description'] ?? '';
    }
}
```

### Outputing group with page builders

If you want to output a group in a page builder like [Beaver Builder](https://metabox.io/recommends/beaver-builder/) or [Elementor](https://metabox.io/recommends/elementor/), please understand that there's no way to output each sub-field in a group as a element in these page builders.

In order to display group value, the recommended way is creating [a view](https://metabox.io/plugins/mb-views/) or a shortcode to display the group. Then you can insert the view/shortcode anywhere with the page builder.

Here is an example of a custom shortcode for a group with 3 fields: title (`text`), images (`image_advanced`) and description (`wysiwyg`). You can use it as a start:

```php
// Requires PHP 7+.
add_shortcode( 'my_group', function() {
	$group = rwmb_meta( 'group_field_id' );
	if ( empty( $group ) ) {
		return '';
	}

	$output = '';

	// Sub-field title.
	$title = $group['title'] ?? '';
	$output .= '<h3 class="my-title">' . $title . '</h3>';

	// Sub-field image_advanced.
	$image_ids = $group['images'] ?? [];
	if ( $image_ids ) {
		$output .= '<div class="my-images">';
		foreach ( $image_ids as $image_id ) {
			$image = RWMB_Image_Field::file_info( $image_id, ['size' => 'my-image-size'] );
			$output .= '<img src="' . $image['url'] . '">';
		}
		$output .= '</div>';
	}

	// Sub-field description.
	$desc = $group['desc'] ?? '';
	$output .= '<div class="my-description">' . wpautop( $desc ). '</div>';

	return $output;
} );

// Usage: put [my_group] into your post content or page builder modules.
```

### Sub-field values

It's important to note that the helper function returns only raw array of sub-field values. It doesn't transform value to meaning full details like [rwmb_meta](https://docs.metabox.io/rwmb-meta/) function for specific fields. Specifically:

Sub-field type|Value
---|---
`taxonomy_advanced`, `user`, `post`|Object ID(s)
`file`, `file_advanced`, `file_upload`, `image`, `image_advanced`, `image_upload`, `single_image`|Attachment ID(s)
`map`, `osm`|Text in format "latitude,longitude,zoom"
`oembed`|URL

To get more details for fields, you might need to add some extra code as below.

```php
$group = rwmb_meta( 'group_id' );
$image_ids = $group['image_key'] ?? : [];
foreach ( $image_ids as $image_id ) {
	$image = RWMB_Image_Field::file_info( $image_id, ['size' => 'thumbnail'] );
	echo '<img src="' . $image['url'] . '">';
}
```

{% include helpers.html %}

## Setting default group values

There are 2 ways to set default group values: per sub-field or for the whole group.

Setting default values for each sub-fields is very simple. Just set its value via `std` parameter for each sub-field and done.

Example:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title' => 'Test Group Default Value',
		'fields' => [
			[
				'type' => 'group',
				'id'   => 'group',
				'fields' => [
					[
						'type' => 'text',
						'id' => 'name',
						'name' => 'Name',
						'std' => 'My Name', // THIS
					],
					[
						'type' => 'email',
						'id' => 'email',
						'name' => 'Email',
						'std' => 'myemail@domain.com', // THIS
					],
				],
			]
		],
	];
	return $meta_boxes;
} );
```

Result:

![default sub-field value](https://i.imgur.com/pml8twS.png)

However, doing that way makes you type quite a lot. And you hardly see the data of the whole group. To avoid this problem, Meta Box Group provides a better way to set default value for the whole group.

The idea is very simple, just use the same `std` parameter for *the group* (not for sub-fields). And set its value an array of sub-field default values.

For example: with a group of 2 fields above, we can default the default value like this:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title' => 'Test Meta Box',
		'fields' => [
			[
				'type' => 'group',
				'id'   => 'group',
				'fields' => [
					[
						'type' => 'text',
						'id' => 'name',
						'name' => 'Name',
					],
					[
						'type' => 'email',
						'id' => 'email',
						'name' => 'Email',
					],
				],

				// THIS
				'std' => [
					'name' => 'My name',
					'email' => 'myemail@domain.com',
				],
			]
		],
	];
	return $meta_boxes;
} );
```

If the group is *cloneable*, the `std` value should be an array of clone values. Each clone value is an array of sub-field values. Like this:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title' => 'Test Meta Box',
		'fields' => [
			[
				'type' => 'group',
				'id'   => 'group',
				'name' => 'Group',
				'clone' => true,
				'collapsible' => true,
				'group_title' => '{name}',
				'fields' => [
					[
						'type' => 'text',
						'id' => 'name',
						'name' => 'Name',
					],
					[
						'type' => 'email',
						'id' => 'email',
						'name' => 'Email',
					],
				],
				'std' => [
					// Value for the 1st clone
					[
						'name' => 'Name 1',
						'email' => 'email1@domain.com',
					],

					// Value for the 2nd clone
					[
						'name' => 'Name 2',
						'email' => 'email2@domain.com',
					]
				],
			]
		],
	];
	return $meta_boxes;
} );
```

And here is the result:

![default group value](https://i.imgur.com/rqxfxA8.png)

See this video for demonstration:

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c8f04fb84025428c895f14137b194035" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Changing clone button text

To change the clone button text, set use the `add_button` parameter like below:

```php
[
	'type' => 'group',
	'name' => 'Tracks',
	'id' => 'tracks',
	'add_button' => 'Add another track',
	'fields' => [
		// Sub-fields here.
	],
],
```

## Clone default values

When clone a group, if the group has `clone_default` set to `true`, then all sub-fields will have their default values. The exception is if a sub-field is cloneable, then its `clone_default` will take the higher priority and comes to effect. In this case, the sub-field `clone_default` is used, no matter the settings of the outer group.

Learn more about [`clone_default` parameter](https://docs.metabox.io/cloning-fields/).

## Known issues

- When cloning fields or groups, `id` attribute of inputs are adjusted. In multi-level nested groups, they're changed without any rule. So please don't rely on them to perform custom JavaScript actions.
- If you have a `wysiwyg` field in a cloneable group, please set its `ID` not ended with `_{number}` (e.g. `_12`). This format is reserved by the clone script to update the editor ID/name. Please just change the ID to another format.

---
title: Register Meta Boxes
---

To register meta boxes, copy and paste the code below into `functions.php` file of your theme or your plugin:

```php
add_filter( 'rwmb_meta_boxes', 'YOURPREFIX_register_meta_boxes' );
function YOURPREFIX_register_meta_boxes( $meta_boxes ) {
    $prefix = 'rw_';

    // 1st meta box
    $meta_boxes[] = array(
        'id'         => 'personal',
        'title'      => __( 'Personal Information', 'textdomain' ),
        'post_types' => array( 'post', 'page' ),
        'context'    => 'normal',
        'priority'   => 'high',

        'fields' => array(
            array(
                'name'  => __( 'Full name', 'textdomain' ),
                'desc'  => 'Format: First Last',
                'id'    => $prefix . 'fname',
                'type'  => 'text',
                'std'   => 'Anh Tran',
                'class' => 'custom-class',
                'clone' => true,
            ),
        )
    );

    // 2nd meta box
    $meta_boxes[] = array(
        'title'      => __( 'Media', 'textdomain' ),
        'post_types' => 'movie',
        'fields'     => array(
            array(
                'name' => __( 'URL', 'textdomain' ),
                'id'   => $prefix . 'url',
                'type' => 'text',
            ),
        )
    );

    return $meta_boxes;
}
```

## Filter

The Meta Box plugin uses `rwmb_meta_boxes` filter to register meta boxes. This is a custom filter which **takes an array of defined meta boxes as the argument**. The callback function **must return an array of meta boxes**.

Using filter prevents PHP errors if you *accidentally* forget to install or activate the Meta Box plugin. In that case, the code simply doesn't run and doesn't affect the rest of your website.

## Prefix

In the beginning of the code, we defined a prefix for fields: `$prefix = 'rw_';`

It will be added before all of our custom field IDs. **Using a prefix can prevent us from conflict with other scripts that also use custom fields.**

**Tips:**

- The prefix is **optional**. If you don't want to use it, set it to an empty string or remove it (if you remove it, don't forget to update `id` of fields).
- Use underscore (`_`) at the beginning to make the custom fields hidden, e.g. they won't show in the default WordPress **Custom Fields** meta box.
- It's a good practice to have an underscore (`_`) as last sign.

## Meta Box Attributes

Each meta box has the following attributes:

Name|Description
--|--
`id`|Meta box ID. Optional. If it's absent, it will be generated from `title` using `sanitize_title` function.
`title`|Meta box title. Required.
`post_types`|Custom post types which the meta box is for. There can be an array of multiple custom post types or a string for the single post type. Must be in lowercase (like the slug). Optional. Default: `post`. This parameter is used instead of `pages` since version 4.4.1 (and fallback to `pages` for previous versions). [See change log](/meta-box-4-4-1-released/).
`context`|Part of the page where the meta box is displayed (`normal`, `advanced` or `side`). Optional. Default: `normal`.
`priority`|Priority within the context where the box is displayed (`high` or `low`). Optional. Default: `high`.
`default_hidden`|Hide the meta box by default (`true` or `false`)? The meta box can be toggled using the checkbox option in screen Help (on the top right). Optional. Default `false`.
`autosave`|Auto save the custom fields' values (like post content and title)? Optional. Default: `false`.
`fields`|Array of fields. Each field is declared as an array with its parameters. To understand fields' parameters, please read [this documentation](/define-fields/).

## Historical note

Previously, you could register meta boxes using `admin_init` hook and a global variable as below:

```php
// IMPORTANT: This is depracated and not supported any more

// Global variable which stores all meta boxes.
global $meta_boxes;
$meta_boxes   = array();

$prefix = 'rw_';

// 1st meta box
$meta_boxes[] = array(
    'id'         => 'personal',
    'title'      => __( 'Personal Information', 'textdomain' ),
    'post_types' => array( 'post', 'page' ),
	'fields' => array(
        array(
            'name'  => __( 'Full name', 'textdomain' ),
            'desc'  => 'Format: First Last',
            'id'    => $prefix . 'fname',
            'type'  => 'text',
            'std'   => 'Anh Tran',
            'class' => 'custom-class',
            'clone' => true,
        ),
    )
);

// 2nd meta box
$meta_boxes[] = array(
    'title'      => __( 'Media', 'textdomain' ),
    'post_types' => 'movie',
    'fields'     => array(
        array(
            'name' => __( 'URL', 'textdomain' ),
            'id'   => $prefix . 'url',
            'type' => 'text',
        ),
    )
);

function YOURPREFIX_register_meta_boxes() {
	global $meta_boxes;

	if ( ! class_exists( 'RW_Meta_Box' ) )
		return;

	foreach ( $meta_boxes as $meta_box ) {
		new RW_Meta_Box( $meta_box );
	}
}
add_action( 'admin_init', 'YOURPREFIX_register_meta_boxes' );
```

However, this method has some disadvantages:

* You have to remember the plugin class name (`RW_Meta_Box`) to the check if it's loaded or not which *might* be changed in the future.
* If there is another code that uses the same global variable to register meta boxes, be careful that the global variable can be overwritten.
* It works in the admin area only
* It's not compatible with some premium extensions such as [Include Exclude](https://metabox.io/plugins/meta-box-include-exclude/), [Settings Page](https://metabox.io/plugins/mb-settings-page/), [Term Meta](https://metabox.io/plugins/mb-term-meta/).

Using `rwmb_meta_boxes` filter as described above, you will have more benefits:

- The code is more elegant and easier to read.
- There is no more global variable, so you never overwrite registered meta boxes by accident. If you want to edit or change existing meta boxes, there's [an instruction](/edit-remove-meta-boxes/) for you.
- It's compatible with all premium extensions.
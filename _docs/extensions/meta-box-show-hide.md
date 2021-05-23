---
title: Meta Box Show Hide
---

Meta Box Show Hide helps you to toggle the visibility of a meta box based on some conditions such as categories, page template or post format.

Meta Box Show Hide is a simplified version of [Meta Box Conditional Logic](https://metabox.io/plugins/meta-box-conditional-logic/). Meta Box Conditional Logic can control the visibility of custom fields and other HTML elements and supports more types of conditions.

## Settings

To add show, hide conditions to your meta box, you need to add parameter `show` or `hide` accordingly to the meta box configuration.

Each parameter (`show`, `hide`) is an array and has the same following elements:

- `relation`: The logical operator to combine conditions: `AND` or `OR`. The default value is `OR`. Case insensitive. Optional.

If one of the following conditions matched (`relation` = `OR`) or all of the following conditions matched (`relation` = `AND`), then the meta box is shown or hid.

Parameter|Description
--|--
`template`|List of page templates, match if the current page has a page template in the list. Array. Case insensitive. Optional.
`post_format`|List of post formats, match if the current post has a format in the list. Array. Case insensitive. Optional.
`category`|List of categories IDs or names (NO slugs), match if the current post has a category in the list. Array. Case sensitive. Optional.
`taxonomy_slug`|List of custom taxonomy terms' IDs or names (NO slugs). Here `taxonomy_slug` is the slug of the taxonomy (like `section`, `region`, etc.). Match if the current post has a term in the list. Array. Case sensitive. Optional.
`is_child`|Boolean. Match if the current page is a child page or not. Optional.
`input_value`| Array of pairs of CSS selectors and values. Match if the inputs (with specified CSS selector) has the defined value. Note: the `relation` is also applied to rules here. Added in version 0.2.

Since version 4.7, WordPress has added support for [post type templates](https://make.wordpress.org/core/2016/11/03/post-type-templates-in-4-7/). To make it work with `template` rule in Show Hide, you need to update to version 1.2.0+ and set the syntax to:

```php
'template' => array( 'post:my-template.php', 'my_post_type:template-one.php' ),
```

e.g, the value should be in form of `post_type:template-file.php`. If the `post_type:` is missing, then the plugin automatically understands that the template is used for pages only.

## Sample code

```php
add_filter( 'rwmb_meta_boxes', 'prefix_show_hide_demo_register' );
function prefix_show_hide_demo_register( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => 'Meta Box Show Hide Demo: Show',

        // Show this meta box for posts matched below conditions
        'show'   => array(
            // With all conditions below, use this logical operator to combine them. Default is 'OR'. Case insensitive. Optional.
            'relation'    => 'OR',

            // List of page templates (used for page only). Array. Optional.
            'template'    => array( 'tpl/blog.php', 'tpl/homepage.php' ),

            // List of post formats. Array. Case insensitive. Optional.
            'post_format' => array( 'Standard', 'Gallery' ),

            // List of categories IDs or names (NOT slugs). Array. Case sensitive. Optional.
            'category'    => array( 3, 'Unpublished', 'Template' ),

            // Custom taxonomy. Optional.
            // Format: 'taxonomy' => list of term IDs or names (NOT slugs). Array. Case sensitive. Optional.
            'location'    => array( 12, 'USA', 'europe' ),
            'os'          => array( 'Windows', 'mac-os' ),

            // Check if page is a child page
            'is_child' => true,

            // Check the value of selector. Format: array( selector, value )
            // Added in version 0.2
            'input_value'   => array(
                '#hide-demo-mb'              => 'yes',
                '#hide-demo-mb-2'            => 'yes',
                'input[name=hide-demo-mb-3]' => true, // If it's a checkbox then true == checked
            ),
        ),

        'fields' => array(
            array(
                'name' => 'Name',
                'id'   => 'name',
                'type' => 'text',
            ),
        ),
    );

    // 2nd meta box
    $meta_boxes[] = array(
        'title'  => 'Meta Box Show Hide Demo: Hide',

        // Hide this meta box for posts matched below conditions
        'hide'   => array(
            // With all conditions below, use this logical operator to combine them. Default is 'OR'. Optional.
            'relation'      => 'OR',

            // List of page templates. Can be array or comma separated. Optional.
            'template' => array( 'full-width.php', 'left-sidebar.php' ),

            // List of categories IDs or names or slugs. Can be array or comma separated. Optional.
            'category'      => array( 1, 'News' ),

            // Custom taxonomy. Optional.
            // Format: 'taxonomy' => list of terms (can be array or comma separated of IDs or names or slugs)
            'location'      => array( 12, 'USA', 'europe' ),
            'os'            => array( 'Windows', 'mac-os' ),

            // Check if page is a child page
            'is_child' => true,

            // Check the value of selector. Format: array( selector, value )
            // Added in version 0.2
            'input_value'   => array(
                '#hide-demo-mb'              => 'yes',
                '#hide-demo-mb-2'            => 'yes',
                'input[name=hide-demo-mb-3]' => true, // If it's a checkbox then true == checked
            ),
        ),

        'fields' => array(
            array(
                'name' => 'Job',
                'id'   => 'job',
                'type' => 'text',
            ),
        ),
    );

    return $meta_boxes;
}
```

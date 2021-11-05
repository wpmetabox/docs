---
title: Meta Box Include Exclude
---

Meta Box Include Exclude helps you to define where to show meta boxes.

## Settings

To add include, exclude conditions to your meta box to show/hide it, you need to add parameter `include` or `exclude` accordingly to the meta box configuration.

Each parameter (`include`, `exclude`) is an array and has the same following elements:

- `relation`: The logical operator to combine conditions: `AND` or `OR`. Default is `OR`. Case insensitive. Optional.

If one of the following conditions matched (`relation` = `OR`) or all of the following conditions matched (`relation` = `AND`), then the meta box is shown (`include`) or hidden (`exclude`).

Parameter | Description
--- | ---
`ID` | List of post IDs, match if current post ID is in the list. Can be array or comma separated. Optional.
`parent` | List of post parent IDs, match if parent ID of the current post is in the list. Can be array or comma separated. Optional.
`slug` | List of post slugs, match if current post slug is in the list. Can be array or comma separated. Optional.
`template` | List of page templates, match if the current post has a page template in the list. Can be array or comma separated. Optional.
`category` | List of categories IDs or names or slugs, match if the current post has a category in the list. Can be array or comma separated. Optional.
`tag` | List of tag IDs or names or slugs, match if the current post has a tag in the list. Can be array or comma separated. Optional.
`{$taxonomy_slug}` | List of custom taxonomy terms' IDs or names or slugs. Here `taxonomy_slug` is the slug of the taxonomy (like `section`, `region`, etc.). Match if the current post has a term in the list. Can be array or comma separated. Optional.
`parent_category` | List of parent categories IDs or names or slugs, match if the current post has a parent category in the list. Can be array or comma separated. Optional.
`parent_tag` | List of parent tag IDs or names or slugs, match if the current post has a parent tag in the list. Can be array or comma separated. Optional.
`parent_{$taxonomy_slug}` | List of parent custom taxonomy terms' IDs or names or slugs. Here `taxonomy_slug` is the slug of the taxonomy (like `section`, `region`, etc.). Match if the current post has a parent term in the list. Can be array or comma separated. Optional.
`user_role` | List of user roles (`administrator`, `editor`, etc.), match if the current user has the role in the list. Can be array or comma separated. Optional.
`user_id` | List of user IDs, match if the current user has user ID in the list. Can be array or comma separated. Optional.
`edited_user_role`|Role of the being edited user. Works on the user profile or user edit screens only. Requires [MB User Meta](https://metabox.io/plugins/mb-user-meta/) extension.
`edited_user_id`|User ID of the being edited user. Works on the user profile or user edit screens only. Requires [MB User Meta](https://metabox.io/plugins/mb-user-meta/) extension.
`is_child` | Boolean, match if the current post/page is a child page or not. Optional.
`custom` | Name of the custom function that performs the check (returns `true` or `false`). This function will take 1 parameter the meta box array. Match if the function returns `true`. Optional. Since v1.0.1, function name can be a string or array(object, method name) or array(class, static method name)

## Sample code

```php
add_filter( 'rwmb_meta_boxes', 'prefix_include_exclude_demo' );
function prefix_include_exclude_demo( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'   => 'Include Meta Box',

        // Register this meta box for posts matched below conditions
        'include' => array(
            // With all conditions below, use this logical operator to combine them. Default is 'OR'. Case insensitive. Optional.
            'relation'        => 'OR',

            // List of post IDs. Can be array or comma separated. Optional.
            'ID'              => array( 1, 2 ),

            // List of post parent IDs. Can be array or comma separated. Optional.
            'parent'          => array( 3, 4 ),

            // List of post slugs. Can be array or comma separated. Optional.
            'slug'            => array( 'contact', 'about' ),

            // List of page templates. Can be array or comma separated. Optional.
            'template'        => array( 'full-width.php', 'sidebar-page.php' ),

            // List of categories IDs or names or slugs. Can be array or comma separated. Optional.
            'category'        => array( 1, 'Blog', 'another' ),

            // List of tag IDs or names or slugs. Can be array or comma separated. Optional.
            'tag'             => array( 1, 'fun' ),

            // Custom taxonomy. Optional.
            // Format: 'taxonomy' => list of term IDs or names or slugs (can be array or comma separated)
            'location'        => array( 12, 'USA', 'europe' ),
            'os'              => array( 'Windows', 'mac-os' ),

            // List of parent categories IDs or names or slugs. Can be array or comma separated. Optional.
            'parent_category' => 'Parent',

            // List of parent tag IDs or names or slugs. Can be array or comma separated. Optional.
            'parent_tag'      => 'Parent',

            // Parent custom taxonomy. Optional.
            // Format: 'parent_taxonomy' => list of term IDs or names or slugs (can be array or comma separated)
            'parent_location' => array( 12, 'USA', 'europe' ),

            // Check if current post/page is a child page
            'is_child'        => true,

            // List of user roles. Can be array or comma separated. Optional.
            'user_role'       => 'administrator',

            // List of user IDs. Can be array or comma separated. Optional.
            'user_id'         => array( 1, 2 ),

            // Custom condition. Optional.
            // Format: 'custom' => 'callback_function'
            // The function will take 1 parameter which is the meta box itself
            'custom'          => 'manual_include',
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
        'title'   => 'Exclude Meta Box',

        // Don't register this meta box for posts matched below conditions
        'exclude' => array(
            'relation'  => 'OR',
            'ID'        => array( 1, 2 ),
            'parent'    => array( 3, 4 ),
            'slug'      => array( 'contact', 'about' ),
            'template'  => array( 'full-width.php', 'left-sidebar.php' ),
            'category'  => array( 1, 'News' ),
            'tag'       => array( 1, 'fun' ),
            'user_role' => array( 'administrator', 'editor' ),
            'user_id'   => array( 1, 2 ),
            'location'  => array( 12, 'USA', 'europe' ),
            'os'        => array( 'Windows', 'mac-os' ),
            'is_child'  => true,
            'custom'    => 'manual_exclude',
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

function prefix_include_exclude_manual_include( $meta_box ) {
    if ( $meta_box['title'] == 'Include Meta Box' )
        return true;
    return false;
}
```

## Using with Sage

[Sage](https://roots.io/sage/) is a starter theme made by Roots.io. The latest version 9 uses [Laravel Blade](https://laravel.com/docs/5.3/blade) as a template system. When using the Meta Box Include Exclude extension to detect page template in Sage, it's important to remember that the extension uses the value WordPress stores in the database, e.g. the value in the Page Template dropdown, which is `views/mytemplatename.blade.php`. So the code for `template` rule will be:

```php
'template' => 'views/mytemplatename.blade.php',
```

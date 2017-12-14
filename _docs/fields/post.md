---
title: Post
---

## Overview

The post field allows you to select one or multiple post (or any custom post type) objects. This field has several settings that can be displayed as a: simple select dropdown, checkbox list, or beautiful select dropdown with select2 library.

If the post type is hierarchical, you are able to display the field as a select or checkbox tree, e.g. show childen posts when parent post is selected.

## Screenshots

Beautiful select with select2 library (default):

![post select](https://i.imgur.com/jV4d0TW.png)

Checkbox list:

![post checkbox list](https://i.imgur.com/kWVBpgr.png)

Checkbox tree:

![post checkbox tree](https://i.imgur.com/v6iiK1U.png)

Radio list:

![radio list](https://i.imgur.com/Vq8VNuD.png)

Radio list inline:

![radio list inline](https://i.imgur.com/WYhirO8.png)

Select tree:

![post select tree](https://i.imgur.com/NYUdKkS.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`post_type` | Post type. Can be string (for single post type) or array (for multiple post types). Required.
`query_args` | Query arguments for getting post objects. Uses same arguments as [WP_Query](https://codex.wordpress.org/Class_Reference/WP_Query). Optional.
`parent` | Whether or not to set the selected post as the parent for the current being edited post? `true` or `false` (default).
`placeholder` | The placeholder for the select box. Default is "Select a {post label}". Applied only when the `field_type` is a select field.
`field_type` | How the posts are displayed? See below.

This field inherits the look and field (and settings) from other fields, depending on the `field_type`, which accepts the following value:

Field type | Description | Settings inherited from
--- | ---
`select` | Simple select dropdown. | [select](/fields/select/)
`select_advanced` | Beautiful select dropdown using the select2 library. This is the default value. | [select_advanced](/fields/select-advanced/)
`select_tree` | Hierachical list of select boxes which allows to select multiple items (select/deselect parent item will show/hide child items). Applied only when the post type is hierarchical (like pages). | [select](/fields/select/)
`checkbox_list` | Flatten list of checkboxes which allows to select multiple items. | [checkbox_list](/fields/checkbox-list/)
`checkbox_tree` | Hierachical list of checkboxes which allows to select multiple items (select/deselect parent item will show/hide child items). Applied only when the post type is hierarchical (like pages). | [checkbox_list](/fields/checkbox-list/)
`radio_list` | Flatten list of radio boxes which allows to select only 1 item. | [radio](/fields/radio/)

Note that for `select_tree`, `checkbox_list`, `checkbox_tree`, the `multiple` setting is always set to `true`.

## Sample code

This code shows pages in select2 dropdown:

```php
array(
    'name'        => 'Select a page',
    'id'          => 'page',
    'type'        => 'post',

    // Post type.
    'post_type'   => 'page',

    // Field type.
    'field_type'  => 'select_advanced',

    // Placeholder, inherited from `select_advanced` field.
    'placeholder' => 'Select a page',

    // Query arguments. See https://codex.wordpress.org/Class_Reference/WP_Query
    'query_args'  => array(
        'post_status'    => 'publish',
        'posts_per_page' => - 1,
    ),
),
```

The code below shows pages in a checkbox tree format:

```php
array(
    'name'        => 'Select a page',
    'id'          => 'page',
    'type'        => 'post',

    // Post type.
    'post_type'   => 'page',

    // Field type.
    'field_type'  => 'checkbox_tree',
),
```

## Data

This field saves post ID(s) in the database.

If field is not `multiple`, then a single post ID is saved in the database. Otherwise, the field saves multiple post IDs in the database, where each post ID is store in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

If `parent` settings is set to `true`, this field doesn't save any data. Instead, it sets the selected post as the parent for the current being edited post.

## Template usage

If field is not `multiple`, getting value is simple:

```php
$post_id = rwmb_meta( $field_id );
echo get_the_title( $post_id );
```

If field is `multiple`, you can loop through the returned values like this:

```php
$post_ids = rwmb_meta( $field_id );
foreach ( $post_ids as $post_id ) {
    echo '<p>', get_the_title( $post_id ), '</p>';
}
```

If you just want to output selected posts in an unordered list, use this code:

```php
rwmb_the_value( $field_id );
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

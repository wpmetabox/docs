---
title: Post
---

## Overview

The post field allows you to select one or multiple post (or any custom post type) objects. This field has several settings that can be displayed as a: simple select dropdown, checkbox list, or beautiful select dropdown with select2 library.

If the post type is hierarchical, you are able to display the field as a select or checkbox tree, e.g. showing childen posts when parent post is selected.

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

## Ajax Load

Since version 5.2, Meta Box uses Ajax to increase the performance for the field query. Instead of fetching all posts at once, the plugin now fetches only some posts when the page is loaded, and then it fetches more posts when users scroll down to the list.

See this video for demonstration:

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe width="560" height="315" src="https://www.youtube.com/embed/2acm5gW59Mc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

This feature is _available only for fields that set `field_type` to `select_advanced`_. There are some extra parameters for you to disable or customize it.

### Enable/Disable Ajax Requests

To enable the Ajax requests, simply add `'ajax' => true` (which is added by default) to the field:

```php
array(
    'id' => 'project',
    'title' => 'Project',
    'type' => 'post',
    'post_type' => 'project',
    'ajax' => true, // THIS
),
```

Setting this parameter to `false` will disable Ajax requests, making it work exactly the same as in previous versions.

### Limit The Number of Posts for Pagination

Similar to the previous version, the number of posts for pagination is set via the `posts_per_page` in the `query_args` parameter:

```php
array(
    'id' => 'project',
    'title' => 'Project',
    'type' => 'post',
    'post_type' => 'project',
    'ajax' => true,
    'query_args' => array(
        'posts_per_page' => 10, // THIS
    ),
),
```

Unlike in previous versions, this number is used only for Ajax requests to fetch the next bunch of posts. The new fetched posts will be appended to the list of options in the dropdown, to make the infinite scroll effect.

It also _doesn't affect the initial load_ of the field. When the field is loaded, Meta Box _only queries for saved posts_ (which is usually not many). So the initial query is very minimal and doesn't cause any performance problem.

### Searching Parameters

You probably don't want to perform an Ajax request when opening the dropdown at first. You might want to _make Ajax requests only when users type something_ and search for that. To do that, you need to set the `minimumInputLength` for the input, as below:

```php
array(
    'id' => 'project',
    'title' => 'Project',
    'type' => 'post',
    'post_type' => 'project',
    'ajax' => true,
    'query_args' => array(
        'posts_per_page' => 10,
    ),
    'js_options' => array(
        'minimumInputLength' => 1, // THIS
    ),
),
```

This parameter sets the minimum number of characters required to start a search. It may be good if you don't want users to make too many Ajax requests that could harm your server.

## Data

This field saves post ID(s) in the database.

If field is not `multiple`, a single post ID is saved in the database. Otherwise, the field saves multiple post IDs in the database, where each post ID is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

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

## Filters

`rwmb_post_choice_label` and `rwmb_{$field_id}_choice_label`

These filters allow developers to change the label of `post` fields. The 1st label applies to all `post` fields, and the later for a specific field.

Example: If you are using a field called `my_field` and you want to change the label, use the code below:

```php
function my_field_filter( $label, $field, $post ) {
    return $post->post_title . ' - ' . $post->post_status;
}
add_filter( 'rwmb_my_field_choice_label', 'my_field_filter', 10, 3);
```

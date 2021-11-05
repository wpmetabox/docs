---
title: User
---

## Overview

The user field allows you to select one or multiple users. This field has several settings that can be displayed as a: simple select dropdown, checkbox list, or beautiful select dropdown with select2 library.

## Screenshots

Beautiful select with select2 library (default):

![user select](https://i.imgur.com/2cEuGhf.png)

Checkbox list:

![user checkbox list](https://i.imgur.com/iG6Gwb4.png)

Radio list:

![radio list](https://i.imgur.com/bfLWmxG.png)

Radio list inline:

![radio list inline](https://i.imgur.com/yFC8YF2.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`query_args` | Query arguments for getting users. Uses same arguments as [get_users()](https://codex.wordpress.org/Function_Reference/get_users). Optional.
`placeholder` | The placeholder for the select box. Default is "Select an user". Applied only when the `field_type` is a select field.
`field_type` | How the users are displayed? See below.

This field inherits the look and field (and settings) from other fields, depending on the `field_type`, which accepts the following value:

Field type | Description | Settings inherited from
--- | ---
`select` | Simple select dropdown. | [select](/fields/select/)
`select_advanced` | Beautiful select dropdown using the select2 library. This is the default value. | [select_advanced](/fields/select_advanced/)
`checkbox_list` | Flatten list of checkboxes which allows to select multiple items. | [checkbox_list](/fields/checkbox-list/)
`radio_list` | Flatten list of radio boxes which allows to select only 1 item. | [radio](/fields/radio/)

Note that for `checkbox_list`, the `multiple` setting is always set to `true`.

## Sample code

This code shows users in select2 dropdown:

```php
array(
    'name'        => 'User',
    'id'          => 'user',
    'type'        => 'user',

    // 'clone'    => true,

    // Field type.
    'field_type'  => 'select_advanced',

    // Placeholder.
    'placeholder' => 'Select an author',

    // Query arguments (optional). No settings means get all published users.
    // @see https://codex.wordpress.org/Function_Reference/get_users
    'query_args'  => array(),
),
```

The code below shows users in a radio list format:

```php
array(
    'name'        => 'User',
    'id'          => 'user',
    'type'        => 'user',

    // 'clone'    => true,

    // Field type.
    'field_type'  => 'radio_list',

    // Inline radios? Inheritted from radio field.
    'inline'      => true,

    // Query arguments (optional). No settings means get all published users.
    // @see https://developer.wordpress.org/reference/functions/get_users/
    'query_args'  => array(),
),
```

## Ajax Load

Since version 5.2, Meta Box uses Ajax to increase the performance for the field query. Instead of fetching all users at once, the plugin now fetches only some users when the page is loaded, and then it fetches more users when users scroll down to the list.

See this video for demonstration (made for posts, but works similar for taxonomies):

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe width="560" height="315" src="https://www.youtube.com/embed/2acm5gW59Mc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

This feature is available only for fields that set `field_type` to `select_advanced`. There are some extra parameters for you to disable or customize it.

### Enable/Disable Ajax Requests

To enable the Ajax requests, simply add `'ajax' => true` (which is added by default) to the field:

```php
array(
    'id' => 'project_author',
    'title' => 'Project Author',
    'type' => 'user',
    'ajax' => true, // THIS
),
```

Setting this parameter to `false` will disable Ajax requests, making it work exactly the same as in previous versions.

### Limit The Number of Users for Pagination

Similar to the previous version, the number of users for pagination is set via the `number` in the `query_args` parameter:

```php
array(
    'id' => 'project_author',
    'title' => 'Project Author',
    'type' => 'user',
    'ajax' => true,
    'query_args' => array(
        'number' => 10, // THIS
    ),
),
```

Unlike in previous versions, this number is used only for Ajax requests to fetch the next bunch of users. The new fetched users will be appended to the list of options in the dropdown, to make the infinite scroll effect.

It also _doesn't affect the initial load_ of the field. When the field is loaded, Meta Box _only queries for saved users_ (which is usually not many). So the initial query is very minimal and doesn't cause any performance problem.

### Searching Parameters

You probably don't want to perform an Ajax request when opening the dropdown at first. You might want to _make Ajax requests only when users type something_ and search for that. To do that, you need to set the `minimumInputLengthfor` the input, as below:

```php
array(
    'id' => 'project_author',
    'title' => 'Project Author',
    'type' => 'user',
    'ajax' => true,
    'query_args' => array(
        'number' => 10,
    ),
    'js_options' => array(
        'minimumInputLength' => 1, // THIS
    ),
),
```

This parameter sets the minimum number of characters required to start a search. It may be good if you don't want users to make too many Ajax requests that could harm your server.

## Data

This field saves user ID(s) in the database.

If field is not `multiple`, a single user ID is saved in the database. Otherwise, the field saves multiple user IDs in the database, where each user ID is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

If field is not `multiple`, getting value is simple:

```php
$user_id = rwmb_meta( $field_id );
$user = get_userdata( $user_id );
echo 'Username: ', $user->user_login;
echo 'User display name: ', $user->display_name;
```

If field is `multiple`, you can loop through the returned values like this:

```php
$user_ids = rwmb_meta( $field_id );
foreach ( $user_ids as $user_id ) {
    $user = get_userdata( $user_id );
    echo '<p>', $user->display_name, '</p>';
}
```

If you just want to output selected users in an unordered list, use this code:

```php
rwmb_the_value( $field_id );
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

## Filters

`rwmb_user_choice_label` and `rwmb_{$field_id}_choice_label`

These filters allow developers to change the label of `user` fields. The 1st label applies to all `user` fields, and the later for a specific field.

Example: If you are using a field called `some_user` and you want to change the label in the select box to user `first_name` instead of the default `display_name`:

```php
function some_user_filter( $label, $field, $user ) {
    return $user->first_name ;
}
add_filter( 'rwmb_some_user_choice_label', 'some_user_filter', 10, 3);
```

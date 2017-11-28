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
    // @see https://codex.wordpress.org/Function_Reference/get_users
    'query_args'  => array(),
),
```

## Data

This field saves user ID(s) in the database.

If field is not `multiple`, then a single user ID is saved in the database. Otherwise, the field saves multiple user IDs in the database, where each user ID is store in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

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

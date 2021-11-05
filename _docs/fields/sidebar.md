---
title: Sidebar
---

## Overview

The sidebar field allows you to select one or multiple sidebars. This field has several settings that can be displayed as a: simple select dropdown, checkbox list, or beautiful select dropdown with select2 library.

## Screenshots

Beautiful select with select2 library (default):

![sidebar select](https://i.imgur.com/VTvvKSR.png)

Checkbox list:

![sidebar checkbox list](https://i.imgur.com/WOcCGA5.png)

Radio list:

![radio list](https://i.imgur.com/jp9BFqE.png)

Radio list inline:

![radio list inline](https://i.imgur.com/KkX2kfQ.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`placeholder` | The placeholder for the select box. Default is "Select a sidebar". Applied only when the `field_type` is a select field.
`field_type` | How the sidebars are displayed? See below.

This field inherits the look and field (and settings) from other fields, depending on the `field_type`, which accepts the following value:

Field type | Description | Settings inherited from
--- | ---
`select` | Simple select dropdown. | [select](/fields/select/)
`select_advanced` | Beautiful select dropdown using the select2 library. This is the default value. | [select_advanced](/fields/select_advanced/)
`checkbox_list` | Flatten list of checkboxes which allows to select multiple items. | [checkbox_list](/fields/checkbox-list/)
`radio_list` | Flatten list of radio boxes which allows to select only 1 item. | [radio](/fields/radio/)

Note that for `checkbox_list`, the `multiple` setting is always set to `true`.

## Sample code

This code shows sidebars in select2 dropdown:

```php
array(
    'name'        => 'Sidebar',
    'id'          => 'sidebar',
    'type'        => 'sidebar',

    // 'clone'    => true,

    // Field type.
    'field_type'  => 'select_advanced',

    // Placeholder.
    'placeholder' => 'Select a sidebar',
),
```

The code below shows sidebars in a radio list format:

```php
array(
    'name'        => 'User',
    'id'          => 'sidebar',
    'type'        => 'sidebar',

    // 'clone'    => true,

    // Field type.
    'field_type'  => 'radio_list',

    // Inline radios? Inheritted from radio field.
    'inline'      => true,
),
```

## Data

This field saves sidebar ID(s) in the database.

If field is not `multiple`, a single sidebar ID is saved in the database. Otherwise, the field saves multiple sidebar IDs in the database, where each sidebar ID is stored in a single row in the database with the same meta key (similar to what `add_post_meta` does with last parameter `false`).

If the field is cloneable, then the value is stored as a serialized array in a single row in the database.

## Template usage

If field is not `multiple`, getting value is simple:

```php
$sidebar_id = rwmb_meta( $field_id );
if ( is_active_sidebar( $sidebar_id ) ) {
    dynamic_sidebar( $sidebar_id );
}
```

If field is `multiple`, you can loop through the returned values like this:

```php
$sidebar_ids = rwmb_meta( $field_id );
foreach ( $sidebar_ids as $sidebar_id ) {
    if ( is_active_sidebar( $sidebar_id ) ) {
        echo '<aside class="sidebar">';
        dynamic_sidebar( $sidebar_id );
        echo '</div>';
    }
}
```

If you just want to output selected sidebars in an unordered list, use this code:

```php
rwmb_the_value( $field_id );
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

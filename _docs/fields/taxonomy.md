---
title: Taxonomy
---

## Overview

The taxonomy field allows you to select one or multiple taxonomy terms. This field has several settings that can be displayed as a: simple select dropdown, checkbox list, or beautiful select dropdown with select2 library.

If the taxonomy is hierarchical, you are able to display the field as a select or checkbox tree, e.g. showing childen terms when parent term is selected.

## Screenshots

Beautiful select with select2 library (default):

![taxonomy select](https://i.imgur.com/PzPkqur.png)

Checkbox list:

![taxonomy checkbox list](https://i.imgur.com/Ook0RwT.png)

Checkbox tree:

![taxonomy checkbox tree](https://i.imgur.com/iLMFVBY.png)

Radio list:

![radio list](https://i.imgur.com/D7Q5mUA.png)

Radio list inline:

![radio list inline](https://i.imgur.com/XMhMjoN.png)

Select tree:

![taxonomy select tree](https://i.imgur.com/orDECYA.png)

## Settings

Besides the [common settings](/field-settings/), this field has the following specific settings:

Name | Description
--- | ---
`taxonomy` | Taxonomy slug(s). Can be string for single taxonomy or array for taxonomies. Required.
`query_args` | Query arguments for getting taxonomy terms. Uses same arguments as [get_terms()](https://developer.wordpress.org/reference/functions/get_terms/). Optional.
`placeholder` | The placeholder for the select box. Default is "Select a {taxonomy label}". Applied only when the `field_type` is a select field.
`add_new` | Allow users to create a new term when submitting the post (`true` or `false`). Added in v4.18.0.
`remove_default` | Remove the default WordPress taxonomy meta box. Added in v4.18.3. Only works with [Classic Editor](https://wordpress.org/plugins/classic-editor/).
`field_type` | How the terms are displayed? See below.

This field inherits the look and field (and settings) from other fields, depending on the `field_type`, which accepts the following value:

Field type | Description | Settings inherited from
--- | ---
`select` | Simple select dropdown. | [select](/fields/select/)
`select_advanced` | Beautiful select dropdown using the select2 library. This is the default value. | [select_advanced](/fields/select_advanced/)
`select_tree` | Hierachical list of select boxes which allows to select multiple items (select/deselect parent item will show/hide child items). Applied only when the taxonomy type is hierarchical (like pages). | [select](/fields/select/)
`checkbox_list` | Flatten list of checkboxes which allows to select multiple items. | [checkbox_list](/fields/checkbox-list/)
`checkbox_tree` | Hierachical list of checkboxes which allows to select multiple items (select/deselect parent item will show/hide child items). Applied only when the taxonomy type is hierarchical (like pages). | [checkbox_list](/fields/checkbox-list/)
`radio_list` | Flatten list of radio boxes which allows to select only 1 item. | [radio](/fields/radio/)

Note that for `select_tree`, `checkbox_list`, `checkbox_tree`, the `multiple` setting is always set to `true`.

## Sample code

This code shows pages in select2 dropdown:

```php
array(
    'name'       => 'Taxonomy',
    'id'         => 'taxonomy',
    'type'       => 'taxonomy',

    // Taxonomy slug.
    'taxonomy'   => 'category',

    // How to show taxonomy.
    'field_type' => 'select_advanced',
),
```

The code below shows pages in a checkbox tree format:

```php
array(
    'name'       => 'Taxonomy',
    'id'         => 'taxonomy',
    'type'       => 'taxonomy',

    // Taxonomy slug.
    'taxonomy'   => 'category',

    // How to show taxonomy.
    'field_type' => 'checkbox_tree',
),
```

## Ajax Load

Since version 5.2, Meta Box uses Ajax to increase the performance for the field query. Instead of fetching all terms at once, the plugin now fetches only some terms when the page is loaded, and then it fetches more terms when users scroll down to the list.

See this video for demonstration (made for posts, but works similar for taxonomies):

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe width="560" height="315" src="https://www.youtube.com/embed/2acm5gW59Mc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

This feature is available only for fields that set `field_type` to `select_advanced`. There are some extra parameters for you to disable or customize it.

### Enable/Disable Ajax Requests

To enable the Ajax requests, simply add `'ajax' => true` (which is added by default) to the field:

```php
array(
    'id' => 'project_cat',
    'title' => 'Project Categories',
    'type' => 'taxonomy',
    'taxonomy' => 'project_cat',
    'ajax' => true, // THIS
),
```

Setting this parameter to `false` will disable Ajax requests, making it work exactly the same as in previous versions.

### Limit The Number of Terms for Pagination

Similar to the previous version, the number of terms for pagination is set via the `number` in the `query_args` parameter:

```php
array(
    'id' => 'project_cat',
    'title' => 'Project Categories',
    'type' => 'taxonomy',
    'taxonomy' => 'project_cat',
    'ajax' => true,
    'query_args' => array(
        'number' => 10, // THIS
    ),
),
```

Unlike in previous versions, this number is used only for Ajax requests to fetch the next bunch of terms. The new fetched terms will be appended to the list of options in the dropdown, to make the infinite scroll effect.

It also _doesn't affect the initial load_ of the field. When the field is loaded, Meta Box _only queries for saved terms_ (which is usually not many). So the initial query is very minimal and doesn't cause any performance problem.

### Searching Parameters

You probably don't want to perform an Ajax request when opening the dropdown at first. You might want to _make Ajax requests only when users type something_ and search for that. To do that, you need to set the `minimumInputLengthfor` the input, as below:

```php
array(
    'id' => 'project_cat',
    'title' => 'Project Categories',
    'type' => 'taxonomy',
    'taxonomy' => 'project_cat',
    'ajax' => true,
    'query_args' => array(
        'number' => 10, // THIS
    ),
    'js_options' => array(
        'minimumInputLength' => 1, // THIS
    ),
),
```

This parameter sets the minimum number of characters required to start a search. It may be good if you don't want users to make too many Ajax requests that could harm your server.

## Data

This field **does not save any value** in the database. Instead of that, it **sets the taxonomy terms for the current being edited post**. In short, it behaves exactly like the "Category" and "Tags" meta boxes.

The purpose of this field is to replace the default WordPress meta box for taxonomy and offer more options to control how it displays.

For this reason, if you have 2 `taxonomy` fields, and select different values for them, after saving, they still show the same value.

If you prefer saving data, check out [taxonomy advanced](/fields/taxonomy-advanced/).

## Template usage

Getting value of this field can be done via the helper function:

```php
$terms = rwmb_meta( $field_id );
if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
    foreach ( $terms as $term ) {
        echo '<p>', $term->name, '</p>';
    }
}
```

If the field is neither cloneable or multiple, e.g. it has single value, then the [rwmb_meta()](/rwmb-meta/) function returns the single term object:

```php
$term = rwmb_meta( $field_id );
echo '<p>', $term->name, '</p>';
```

The code above shows the term name only. If you want to show term link, use this code:

```php
$term = rwmb_meta( 'pub_type_field' );
printf( '<a href="%s">%s</a>', get_term_link( $term ), $term->name );
```

If you just want to output selected terms in an unordered list, use this code:

```php
rwmb_the_value( $field_id );
```

Read more about [rwmb_meta()](/rwmb-meta/) and [rwmb_the_value()](/rwmb-the-value/).

## Filters

`rwmb_taxonomy_choice_label` and `rwmb_{$field_id}_choice_label`

These filters allow developers to change the label of `taxonomy` fields. The 1st label applies to all `taxonomy` fields, and the later for a specific field.

Example: If you are using a field called `my_field` and you want to change the label in the select box, use this code:

```php
function my_field_filter( $label, $field, $term ) {
    return $label . ' - Custom text';
}
add_filter( 'rwmb_my_field_choice_label', 'my_field_filter', 10, 3);
```

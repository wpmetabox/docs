---
title: Meta Box Conditional Logic
---

{% include installation.html %}

## Configuration
Like the Meta Box plugin, Conditional Logic was created without any options. You can start using it right after activating.

If you're confused whilst reading this tutorial. Please refer to [creating meta box](/creating-meta-boxes/).

## Example

Let's say we have a Meta Box with two fields, for example.

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
    $meta_boxes[] = array(
        'title' => 'Brands and Products',
        // In this example: Show this Meta Box by default. Hide it when post format is aside
        'hidden' => array( 'post_format', 'aside' ),
        'fields' => array(
            array(
                'id'    => 'brand',
                'name'  => 'Brand',
                'desc'  => 'Pick Your Favourite Brand',
                'type'  => 'select',
                'options' => array(
                    'Apple'         => 'Apple',
                    'Google'        => 'Google',
                    'Microsoft'     => 'Microsoft'
                )
            ),
            array(
                'id'    => 'apple_products',
                'name'  => 'Which Apple product that you love?',
                'type'  => 'radio',
                'options' => array(
                    'iPhone'    => 'iPhone',
                    'iPad'      => 'iPad',
                    'Macbook'   => 'Macbook',
                    'iWatch'    => 'iWatch'
                ),
                // In this example: Show this field by default,
                // hide it when user selected different value than 'Apple' on brand select field
                'hidden' => array( 'brand', '!=', 'Apple' )
            )
        )
    );

    return $meta_boxes;
} );
```

## Syntax

A conditional statement syntax can be defined for a meta box or a field as follows:

```php
'visibility' => array( 'field', 'operator', 'value' )
```

Name|Description
---|---
`visibility`|Either `visible` or `hidden`.
`field`| Meta Box field ID or ID of a DOM element to compare.
`operator` | Comparison operators: `=`, `>=`, `<=`, `>`, `<`, `!=`, `in`, `between`, `starts with`, `ends with`, `match`. All of them can combine with `not` operator to become negate operator. Default: `=`. Optional.
`value` | Value to compare with.

Assume that you have two fields:

- A select field `brand` contains 3 options: "Apple", "Microsoft" and "Google",
- Another field `apple_products` contains 4 options: "iPhone", "iPad", "Macbook", "iWatch"

Let hide `apple_products` when `brand` isn't Apple. You can define conditional logic like this:

```php
'hidden' => array( 'brand', '!=', 'Apple' )
// Or
'hidden' => array( 'brand', 'in', array( 'Microsoft', 'Google' ) )
```

Two above examples can be rewrite by `visible` key, like so:

```php
'visible' => array( 'brand', 'Apple' )
// Or
'visible' => array( 'brand', '=', 'Apple' )
// Or
'visible' => array( 'brand', 'not in', array( 'Microsoft', 'Google' ) )
```

## Advanced Operators

### `contains`

The operator `contains` can check with string if it contains another string

```php
'visible' => array( 'brand', 'contains', 'pp' ) // Apple, App, ...
```

It also can check if an array contains another array or string. For instance, if `brand` is a multiple field (checkbox list, select multiple...), its value is an array, then you can check if user selected 'Apple':

```php
'visible' => array( 'brand', 'contains', array( 'Apple' ) )
```

### `between`

This operator check if the field value is between minimum and maximum values.

Let say that we have a date field `released_date` and we want to show another field only when `released_date` is between "2015-06-01" and "2015-12-01":

```php
'visible' => array( 'released_date', 'between', array( '2015-06-01', '2015-12-01' ) )
```

Please note that the `between` operator does not only compare numeric fields but also date and time fields.

### `starts with`

This operator checks if field value starts with a string:

```php
'visible' => array( 'brand', 'starts with', 'App' ) // Apple, App
```

### `ends with`

This operator checks if field value ends with a string:

```php
'visible' => array( 'brand', 'ends with', 'le' ) // Apple, Google
```

### `match`

This operator checks if field value matches a regular expression:

```php
'visible' => array( 'brand', 'match', '[a-z]$' )
```

### `not`

We can combine `not` operator with other operators to negative the meaning of them. So we'll have `not contains`, `not in`, `not match`, `not starts with`, `not ends with`, `not between`.

## Special fields

### Checkbox field

Sometimes, you want to show/hide a field if checkbox is checked or not. Just remember checkbox has two state and each state returns a value, `0` or `false` if is not checked, `1` or `true` is checked.

So in this case, you need to write the field value as:

```php
'visible' => array( 'checkbox_field', true ) // Visible if checkbox_field is checked
```

### Media fields

For media fields that use WordPress media popup to handle upload like `file_advanced`, `image_advanced`, the extension checks number of uploaded files instead of their values.

This example shows or hides a field depends on there's a file uploaded:

```php
// Visible when file_advanced field is has file
'visible' => array( 'file_advanced', '>', 0 )

// Or hidden if image_advanced doesn't contains anything
'hidden' => array( 'image_advanced', 0 )
```

## DOM elements

Meta Box Conditional Logic can work with DOM elements the same as Meta Box fields. With this feature, you can show or hide any meta box or field based on post types, page parent, post ID, categories...

To make it work with DOM element, instead of passing the field ID as the first parameter, please pass the element's ID.

### Examples:

Display Meta Box (or field) if current page is child page (parent ID is not empty)

```php
'visible' => array( 'parent_id', '!=', '' )
```

Visible if parent page's ID is 99

```php
'visible' => array( 'parent_id', 99 )
```

Visible if current post ID is greater than 101

```php
'visible' => array( 'post_ID', '>', 101 )
```

## Compound statements
Sometimes, you'll need to use more than one conditional logic. To do that, you can use nested array to define compound statements. For example:

```php
// Visible when 'brand' is 'Apple' AND 'released_year' is between 2010 and 2015
'visible' => array(
    array( 'brand', 'Apple' ),
    array( 'released_year', 'between', ( 2010, 2015 ) )
)
```

By default, if you define compound statement, the logic will correct if all of them are correct. In case you want to visible a field if one of them is correct, simply move all statements to `when` key and put new `relation` key like this example:

```php
// Visible when 'brand' is 'Apple' OR 'released_year' is between 2010 and 2015
'visible' => array(
    'when' => array(
         array( 'brand', 'in', array( 'Apple', 'Microsoft' ) ),
         array( 'released_year', 'between', array( 2010, 2015 ) )
     ),
     'relation' => 'or'
)
```

## Using outside meta boxes

The extension can even work with elements outside meta boxes, for example: post title, post content, post excerpt...

Let's say you want to hide the WordPress core `submitdiv` meta box (the meta box that contains **Publish** button) when `brand` is 'Microsoft':

```php
add_filter( 'rwmb_outside_conditions', function( $conditions ) {
    $conditions['submitdiv'] = array(
        'hidden' => array( 'brand', 'Microsoft' ),
    );
    return $conditions;
} );
```

Another example: hide post title for `aside` post format:

```php
add_filter( 'rwmb_outside_conditions', function( $conditions ){
    $conditions['post_title'] = array(
        'hidden' => array( 'post_format', 'aside' )
    );
    return $conditions;
} );
```

The key for the conditions can be ID of the element (default) or any CSS selector:

```php
add_filter( 'rwmb_outside_conditions', function( $conditions ){
    $conditions['.rwmb-tab-bio'] = array(
        'hidden' => array( 'post_format', 'aside' )
    );
    return $conditions;
} );
```

If you want to hide a tab created by [Meta Box Tabs](https://metabox.io/plugins/meta-box-tabs/), [see this](/tutorials/hide-tabs-with-conditional-logic/).

## Using with taxonomies

Conditional Logic works with DOM elements and of course, categories and custom taxonomies.

For built-in post category, use `post_category` as the first parameter:

```php
'visible' => array( 'post_category', 'in', array( 4, 5, 6 ) )
```

By default, the extension uses terms' IDs to check. Since 1.3, you can define the condition's value using `slug`. Just append `slug:` before the selector. Like so:

```php
'visible' => array( 'slug:post_category', 'in', array( 'fashion', 'gaming', 'technology' ) )
```

For custom taxonomies, use `tax_query[taxonomy slug]` as the first parameter:

```php
'hidden' => array( 'tax_query[product]', '>', 5 )
```

Of course, it works with `slug` also:

```php
'hidden' => array( 'slug:tax_query[product]', '!=', 'drones' )
```

## Custom callback

Since 1.3, you can set conditional logic with custom JavaScript callback, just put your function call in the first parameter. Like so:

In your JavaScript file:

```js
// Your custom JavaScript function that checks the condition
function my_custom_callback() { return true; }
```

In your PHP file:

```php
'visible' => array( 'my_custom_callback()', true )
```

Please note that your function can return anything you want and you can use any operator to compare. For example

```js
// Your js
function dummy_function(){ return ['foo', 'bar', 'baz]; }
```

```php
// Your field or meta box
'hidden' => array( 'dummy_function()', 'contains', 'bar' );
```

## Toggle types

By default, we use jQuery `.show()` and `.hide()` method (which equivalent to CSS `display` property) to toggle elements. Imagine you have three fields named A, B, and C. So by default it will display vertical like so:

```
A
-
B
-
C
```

Or if you use Column extension, it will display horizontal like so:

```
A | B | C
```

What happen when field B is hidden? The field C will jump to B place, sometimes, you will want to keep the position of these field, so if field B is hidden, it should keep the blank space like so:

```
A
-

-
C
```
Or

```
A | | C
```

So, basically, we have to use CSS `visibility` property instead of `display` property. To do so, just add `'toggle_type' => 'visibility'` to your Meta Box.

Since 1.5, we do support `slideUp`, `slideDown`, `fadeIn`, `fadeOut` animation. In order to use these animation just set `toggle_type` to `slide` or `fade`.

In short, we supports 4 toggle types to: `visibility`, `display`, `slide`, `fade`.

## Known issues

Conditional Logic doesn't works with [autocomplete](/fields/autocomplete/) field. We'll try to update in the next release.

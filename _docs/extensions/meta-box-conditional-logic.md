---
title: Meta Box Conditional Logic
---

{% include installation.html %}


Like the Meta Box plugin, Conditional Logic was created without any options. You can start using it right after activating.

If you're confused whilst reading this tutorial. Please refer to [creating meta box](/creating-meta-boxes/).

## Getting started

The code below registers a meta box that is hidden when the post format is `aside`. The meta box also have 2 custom fields: Brand and Product. The Product field will be hidden if user select a brand that's not "Apple".

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
    $meta_boxes[] = array(
        'title' => 'Brands and Products',
        
        // Hide this meta box when post format is aside
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
                
                // Hide this field when user selected a brand that's not 'Apple'
                'hidden' => array( 'brand', '!=', 'Apple' )
            )
        )
    );

    return $meta_boxes;
} );
```

## Syntax

To make a meta box or a field visible/hidden, please add a setting for the meta box or the field with the following syntax:

```php
// Condition to show.
'visible' => array( 'field', 'operator', 'value' ),

// Condition to hide
'hidden' => array( 'field', 'operator', 'value' )
```

Name|Description
---|---
`field`| Meta Box field ID or ID of a DOM element to compare.
`operator` | Comparison operators: `=`, `>=`, `<=`, `>`, `<`, `!=`, `in`, `contains`, `between`, `starts with`, `ends with`, `match`. All of them can combine with `not` operator to become negate operator. Default: `=`. Optional.
`value` | Value to compare with.

The normal operators like `=`, `!=`, etc. are pretty clear. Let's see the advanced operators like `contains`, `starts with`, etc.

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

## Multiple conditions

Sometimes, you'll need to use more than one conditional logic. To do that, you can define multiple conditions to show or hide a meta box or a custom field. For example:

```php
// Visible when 'brand' is 'Apple' AND 'released_year' is between 2010 and 2015
'visible' => array(
    array( 'brand', 'Apple' ),
    array( 'released_year', 'between', array( 2010, 2015 ) )
)
```

By default, if you define compound statement, the logic will correct if **ALL** of them are correct. In case you want to visible a field if **ONE** of them is correct, simply move all statements to `when` key and put new `relation` key like this example:

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

## Getting values for special fields

This section shows you how to specify the `value` in the conditions for some specific fields.

### Checkbox field

For checkboxes, use `0` or `false` if it's not checked, `1` or `true` if it's checked.

```php
'visible' => array( 'checkbox_field', true ) // Visible if checkbox_field is checked
```

### Media fields

For media fields that use WordPress media popup to handle upload like `file_advanced`, `image_advanced`, the extension checks **number of uploaded files** instead of their values.

This example shows or hides a field depends on there's a file uploaded:

```php
// Visible when file_advanced field is has file
'visible' => array( 'file_advanced', '>', 0 )

// Or hidden if image_advanced doesn't contains anything
'hidden' => array( 'image_advanced', 0 )
```

## Toggle by other elements

Meta Box Conditional Logic can work with other HTML elements the same as Meta Box fields. With this feature, you can show or hide any meta box or field based on post types, page parent, post ID, categories...

To make it work with HTML element, instead of passing the field ID as the first parameter, please pass the **element's ID**.

Examples:

Display a meta box (or a field) if current page is child page (parent ID is not empty)

```php
'visible' => array( 'parent_id', '!=', '' )
```

Visible if current post ID is 100

```php
'visible' => array( 'post_ID', '=', 100 )
```

### Featured image

Featured image is a special HTML element. It has the field name/ID `_thumbnail_id` and when empty, WordPress sets the value to `-1`. Since version 1.5.3, the plugin can detect changes for featured image and let you define conditions with it.

Examples:

Make a field visible if no featured image:

```php
'visible' => array( '_thumbnail_id', '=', '-1' ),
```

Make a field visible if featured image is set:

```php
'visible' => array( '_thumbnail_id', '!=', '-1' ),
```

Or make a field visible only if featured image is a specific image with ID `123`:

```php
'visible' => array( '_thumbnail_id', '=', '123' ),
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

If you want to hide a tab created by [Meta Box Tabs](https://metabox.io/plugins/meta-box-tabs/), [see this](/hide-tabs-with-conditional-logic/).

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

For custom taxonomies, use `tax_input[taxonomy slug]` as the first parameter:

```php
'hidden' => array( 'tax_input[product]', '>', 5 )
```

Of course, it works with `slug` also:

```php
'hidden' => array( 'slug:tax_input[product]', '!=', 'drones' )
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

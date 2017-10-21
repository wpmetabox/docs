---
title: Meta Box Conditional Logic
permalink: /meta-box-conditional-logic/
---

{% include installation.html %}

## Configuration
Like the Meta Box plugin, Conditional Logic was created without any options. You can start using it right after activating.

## Basics
If you're confused whilst reading this tutorial. Please refer to [registering meta box](/registering-meta-boxes/).

### The example

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

### Basic Syntax

A conditional statement syntax can be defined like so:

```php
'visibility' => ['field', 'operator', 'value']
```

Where:

- `visibility`: either `visible` or `hidden`.
- `field`: Meta Box Field or any HTML DOM element to compare.
- `operator`: (optional) Comparison Operators: `=`, `>=`, `<=`, `>`, `<`, `!=`, `in`, `between`, `starts with`, `ends with`, `match`. All of them can combine with `not` operator to become negate operator. Default: `=`.
- `value`: Value to compare with.

Assume that you have two fields:

- A Select field named 'brand' contains 3 items: "Apple", "Microsoft" and "Google",
- Another field named 'apple_products' contains 4 items: "iPhone", "iPad", "Macbook", "iWatch"

Let hide `apple_products` when `brand` isn't Apple. You can define conditional logic like this:

```php
'hidden' => ['brand', '!=', 'Apple']
```

or, you can rewrite it by *IN* statement, like so:

```php
'hidden' => ['brand', 'in', ['Microsoft', 'Google']]
```

Two above examples can be rewrite by `visible` key, like so:

```php
'visible' => ['brand', '=', 'Apple']
// Can be dead simpler like so:
'visible' => ['brand', 'Apple']
```

```php
'visible' => ['brand', 'not in', ['Microsoft', 'Google']]
```

With above examples, you can see that we use '!=', 'in', '=', 'not in' operators, let's try with other examples:

##### With `contains` operator

```php
// contains can checks with string if it contains another string
'visible' => ['brand', 'contains', 'pp'] // match with A[pp]le
// contains can even checks with, an array if it contains another array or string. For instance, if `brand` is a multiple field (checkbox list, select multiple...), it returns an array, then you can check if user selected 'Apple' or not by using syntax like so
'visible' => ['brand', 'contains', ['Apple']]
```

##### With `between` operator.

Let say that we have another *date* field called *released_date* and we want to show the field only when *released_date* is between *2015-06-01* and *2015-12-01*

```php
'visible' => ['released_date', 'between', ['2015-06-01', '2015-12-01']]
```
*Please note that between operator is not only compare numeric fields but also date and even time fields.*

##### With `starts with` operator

```php
'visible' => ['brand', 'starts with', 'App'] // match with [App]le
```

##### With `ends with` operator

```php
'visible' => ['brand', 'ends with', 'le'] // In this case, match with both "Goog[le]" and "App[le]"
```

##### With Regular Expression - `match` operator

```php
'visible' => ['brand', 'match', '[a-z]$']
```

##### not operator

We can combine *not* statement with others. So we'll have *not contains*, *not in*, *not match*, *not starts with*, *not ends with*, *not between*

##### Checkbox Field

Sometimes, you want to show/hide a field if checkbox is checked or not. Just remember checkbox has two state and each state returns a value, **0** or **false** if is not checked, **1** or **true** is checked. For example:

```php
'visible' => ['checkbox_field', true] // Visible if checkbox_field is checked
```

##### With DOM Elements

Meta Box Conditional Logic can work with DOM Elements same as Meta Box fields. With this feature, you can show or hide meta boxes or fields based on post types, page parent, post ID, categories...

Let's try with some examples:

Display Meta Box (or field) if current page is child page (parent ID is not empty)

```php
'visible' => ['parent_id', '!=', '']
```

Visible if parent page's ID is 99

```php
'visible' => ['parent_id', 99]
```

Visible if current post ID is greater than 101

```php
'visible' => ['post_ID', '>', 101]
```

### Compound Statements
Sometimes, you'll need to use more than one conditional logic in fields, to do it, you can use nested array to define compound statements. For example:

```php
// This field will visible when other field named 'brand' values is equal to 'Apple' AND another field named released_year values is between 2010 and 2015

'visible' => [
    ['brand', 'Apple'],
    ['released_year', 'between', [2010, 2015]]
]
```
**Relation**
By default, if you define compound statement, the logic will correct if ALL of them are correct. In case you want to visible a field if ONE of them is correct, simply move all statements to `when` key and put new `relation` key like this example:

```php
'visible' => [
    'when' => [
         ['brand', 'in', ['Apple', 'Microsoft']],
         ['released_year', 'between', [2010, 2015]]
     ],
     'relation' => 'or'
]
```

### Use Conditional Logic outside Meta Box

Conditional Logic can even work outside Meta Box plugin, or hide element outside Meta Box plugin, for example: post_title, post_content, post_excerpt...
Let's say you want to hide the WP core *submitdiv* Meta Box when `brand` value is 'Microsoft'

```php
// Attach Conditional Logic to other fields
add_filter( 'rwmb_outside_conditions', function( $conditions ) {
    $conditions['submitdiv'] = [
        'hidden' => ['brand', 'Microsoft']
    ];
    return $conditions;
} );
```

In case you want to attach conditional logic with any HTML DOM Element. Just follow above example. Conditional Logic is smart enough to guess the element that you want to hide so you don't have to put full element selector.

```php
// Attach Conditional Logic to other fields. In this case, post_title and post_format aren't Meta Box field
add_filter( 'rwmb_outside_conditions', function( $conditions ){
    $conditions['post_title'] = [
        'hidden' => ['post_format', 'aside']
    ];
    return $conditions;
} );
```
Of course, you can also hide a tab with Conditional Logic. See [this guide](https://metabox.io/hide-meta-box-tabs-conditional-logic/)

#### Conditional Logic with special upload fields

Some `special` fields, in this case, all upload fields which do not use normal Html form tags to handle upload like `file_advanced`, `image_advanced` can returns num of uploaded files instead of their values. This is the example of conditional logic attach to `image_advanced` field, `file_advanced` uses the same syntax:

```php
// Visible when file_advanced field is has file
'visible' => ['file_advanced', '>', 0]

// Or hidden if image_advanced doesn't contains anything
'hidden' => ['image_advanced', 0]
```

#### Conditional Logic with Categories and Custom Taxonomies

Conditional Logic works with DOM elements and of course, categories and custom taxonomies. We have a separated guide about it. You can check: [/docs/conditional-logic-taxonomies/](Conditional Logic and Taxonomies)

### Custom Callback

Since 1.3, you can set conditional logic with custom callback, just add your function with `()`. Like so:

```php
// your js function should be defined
function my_custom_callback() { return true; }
```

```php
// your field or meta box
'visible' => ['my_custom_callback()', true]
```

Please note that your function can return anything you want and you can use any `operator` to compare. For example

```php
// your js
function dummy_function(){ return ['foo', 'bar', 'baz]; }
```

```php
// your field or meta box
'hidden' => ['dummy_function()', 'contains', 'bar'];
```

### Toggle Type

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

#### Toggle Animation

Since 1.5, we do support `slideUp`, `slideDown`, `fadeIn`, `fadeOut` animation, just set toggle type to `slide` or `fade`. In short, we can set toggle type to: `'visibility'`, `'display'`, `'slide'`, `'fade'`.

#### Known Issues

Conditional Logic doesn't works with Auto Complete field. We'll try to update in the next release.

Please note that conditional logic for Fields and Meta Boxes use the same syntax, so feel free to use and start using it now.
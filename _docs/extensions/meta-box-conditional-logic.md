---
title: Meta Box Conditional Logic
---

**Meta Box Conditional Logic** helps you to show or hide meta boxes, custom fields or any elements based on other fields' values.

<iframe width="560" height="315" src="https://www.youtube.com/embed/m_FtbydM_-I?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You can also combine conditions. It works not only for meta boxes or custom fields, but also other HTML elements.

## Getting started

### With Meta Box Builder

If you are using [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/) extension, you can set conditional logic for a specific field by going to the tab **Advanced** and add rules in the **Conditional Logic** section:

![conditional logic in Meta Box Builder](https://i.imgur.com/xOPcH0N.png)

In this section, you can choose to show or hide a field when all or any conditions match. For each rule, you need to select a dependency field ID, the operator and enter the field value. The dependency field ID is auto-suggested from the list of current fields and you can add as many rules as you want:

![conditional logic rules](https://i.imgur.com/WzTf0Ka.png)

### With code

In case you use code to register meta boxes, you need to add an extra parameter `visible` or `hide` to a field (or a meta box if you want to hide the whole meta box) to set the conditional logic for it.

For example, Tthe code below registers a meta box that is hidden when the post format is `aside`. The meta box also have 2 custom fields: Brand and Product. The Product field will be hidden if user select a brand that's not "Apple".

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title' => 'Brands and Products',

		// Hide this meta box when post format is aside
		'hidden' => [ 'post_format', 'aside' ],

		'fields' => [
			[
				'id'      => 'brand',
				'name'    => 'Brand',
				'type'    => 'select',
				'options' => [
					'Apple'  => 'Apple',
					'Google' => 'Google',
				],
			],
			[
				'id'      => 'apple_products',
				'name'    => 'Which Apple product that you love?',
				'type'    => 'radio',
				'options' => [
					'iPhone' => 'iPhone',
					'iPad'   => 'iPad',
				],

				// Hide this field when user selected a brand that's not 'Apple'
				'hidden' => [ 'brand', '!=', 'Apple' ]
			],
		],
	];

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

The operator `contains` can check if **a field value contains another string or value**:

```php
'visible' => ['brand', 'contains', 'pp'] // Apple, App, ...
```

In case a field has multiple value (checkbox list, select multiple...), this operator checks **if the field value (which is an array) contains a value**:

```php
'visible' => ['brand', 'contains', 'Apple'];
```

It also works with `taxonomy_advanced` field. In this case, please **set the value to the term ID**. For example, if you need to check if a taxonomy advanced field has a value:

```php
'visible' => ['product_type', 'contains', 4]; // 4 is a term ID.
```

### `in`

This operator is used to check if **a field value is in an array of specific values**:

```php
'visible' => ['brand', 'in', ['Apple', 'Samsung']];
```

In case a field has multiple value (checkbox list, select multiple...), this operator checks if **any of the field value is in the specified array**. For example, if the `brand` field above is a `checkbox_list` field, then it will be visible if users select any of the value "Apple" or "Samsung":

```php
'visible' => ['brand', 'in', ['Apple', 'Samsung']];
```

If you use with a `taxonomy_advanced` field, please **set the value to the term IDs**:

```php
'visible' => ['product_type', 'in', [2, 4]]; // The field will be visible if the product type has any term with ID 2 or 4.
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

Here are the list of available built-in WordPress elements:

Param|Description
---|---
`post_ID`|Post ID
`page_template`|Page template
`parent_id`|Parent post ID
`post_format`|Post format

Examples:

Display a meta box (or a field) if page template is `template-custom.php`:

```php
'visible' => array( 'page_template', 'template-custom.php' )
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

The extension can even work with elements outside meta boxes. Let's say you want to hide an element `.custom-div` when a field with ID `brand` is `Microsoft`, then you can do that with the following code:

```php
add_filter( 'rwmb_outside_conditions', function( $conditions ) {
    $conditions['.custom-div'] = array(
        'hidden' => ['brand', 'Microsoft'],
        // or you can write this for clarity
        'hidden' => ['#brand', 'Microsoft'],
    );
    return $conditions;
} );
```

Note that the `.custom-div` can be any CSS selector, like `#custom-id` or `.my-class .children`.

If you want to hide an element `.custom-div` based on a value of an input, which is not a Meta Box field, simply specify its ID as follows:

```php
add_filter( 'rwmb_outside_conditions', function( $conditions ) {
    $conditions['.custom-div'] = array(
        'hidden' => ['#input-id', 'value'],
    );
    return $conditions;
} );
```

If you want to hide a tab created by [Meta Box Tabs](https://metabox.io/plugins/meta-box-tabs/), [see this](/hide-tabs-with-conditional-logic/).

## Using with taxonomies

### Post category

For post category, use `post_category` as the first parameter:

```php
'visible' => ['post_category', 'in', [4, 5, 6]]
```

By default, the extension uses category IDs to check. Since 1.3, you can define the condition's value using `slug`:

```php
'visible' => ['slug:post_category', 'in', ['fashion', 'gaming', 'technology']]
```

### Post tag

Support for post tag is added in version 1.6.5 and works only for Gutenberg editor.

To add conditions by post tag, use `tags` as the first parameter:

```php
'visible' => ['tags', 'in', [4, 5, 6]]
```

Unlike post category, you have to use tag IDs.

### Custom taxonomies

For custom taxonomies, use `tax_input[taxonomy_slug]` as the first parameter:

```php
'hidden' => ['tax_input[product]', 'in', [5, 6, 7]],
```

Similarly to post category, it works with `slug`, too.

```php
'hidden' => ['slug:tax_input[product]', '!=', 'drones']
```

## Using with Group

The extension MB Conditional Logic uses jQuery to check the field ID and value to match the condition. For the sub-fields in a **non-cloneable** group, the field ID actually has the format `groupID_fieldID` and called input ID. In this case, you need to add the input ID to the condition like this:

```php
[
	'id'     => 'group',
	'type'   => 'group',
	'fields' => [
		[
			'id'    => 'brand',
			'name'  => 'Brand',
			'type'  => 'select',
			'options' => [
				'apple'     => 'Apple',
				'google'    => 'Google',
				'microsoft' => 'Microsoft'
			],
		),
		[
			'id'    => 'apple_products',
			'name'  => 'Which Apple product that you love?',
			'type'  => 'radio',
			'options' => [
				'iPhone'  => 'iPhone',
				'iPad'    => 'iPad',
				'Macbook' => 'Macbook',
			],

			// Show this field when user selected a brand 'Apple'
			'visible' => [ 'group_brand', '=', 'apple' ]
		],
	],
],
```
If the group is **cloneable**, the conditional logic runs inside the clone only. In this case you **don't** have to change the sub-field IDs like above.

## Custom callback

To set conditional logic with custom JavaScript callback, just put your function call in the first parameter. Like so:

In your JavaScript file:

```js
// Your custom JavaScript function that checks the condition
function my_custom_callback() {
    return true;
}
```

In your PHP file:

```php
'visible' => [ 'my_custom_callback()', true ]
```

Please note that your function can return anything you want and you can use any operator to compare. For example

```js
// Your js
function dummy_function() {
    return ['foo', 'bar', 'baz];
}
```

```php
// Your field or meta box
'hidden' => [ 'dummy_function()', 'contains', 'bar' ];
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

Since v1.5, we support `slideUp`, `slideDown`, `fadeIn`, `fadeOut` animation. In order to use these animation just set `toggle_type` to `slide` or `fade`.

In short, we supports 4 toggle types to: `visibility`, `display`, `slide`, `fade`.

## Running conditional logic manually

Since v1.6.17, you can manually run (trigger) conditional logic for a scope with this code:

```js
let $scope = $( '.scope' );
rwmb.runConditionalLogic( $scope );
```

## Known issues

Conditional Logic doesn't works with [autocomplete](/fields/autocomplete/) field. We'll try to update in the next release.

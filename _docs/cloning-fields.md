---
title: Cloning fields (Repeatable fields)
---

The clone feature of the Meta Box plugin allows us to create multiple inputs from a text, textarea, select, ... fields without declaring many fields in the code.

## Making a field cloneable (repeatable)

To make a field cloneable (repeatable), just add `'clone' => true` to field's parameter. After doing that, you'll see a new **+** (Add Clone) button below field input:

![cloneable (repeatable) text field](https://i.imgur.com/p6a9Rqn.png)

Clicking on that button will duplicate field input:

![cloneable (repeatable) text field](https://i.imgur.com/PV86AgP.png)

You can notice that there are new buttons **-** (Remove Clone) which allow you to remove clones.

## Clone settings

Name|Description
---|---
`clone`|Make field cloneable? `true` or `false` (default). Optional.
`max_clone`|Limit the number of clones. Integer. Must be greater than 2. Optional.
`add_button`|The text for **Add more** clone button. Optional. Default "+ Add more".
`clone_default`|Clone the default value of fields? `true` or `false` (default).
`sort_clone`|Allow to drag-and-drop sort clones. `true` or `false` (default). See the following screenshot.
`clone_as_multiple`| Whether to store cloned values in multiple rows in the database? [See this post](https://metabox.io/introducing-clone-as-multiple-feature/) for examples.

![sortable repeatable field](https://i.imgur.com/nNzWQgO.png)

## Default values

When making a field cloneable, its data is an [array of cloned values](https://docs.metabox.io/database/#cloneable-fields). So, the `std` parameter (default value) should represent this structure, e.g. array of cloned values.

For example:

```php
add_filter( 'rwmb_meta_boxes', function( $meta_boxes ) {
	$meta_boxes[] = [
		'title' => 'Test Meta Box',
		'fields' => [
			[
				'type'  => 'text',
				'id'    => 'name',
				'name'  => 'Name',
				'clone' => true,
				'std'   => [
					'John',
					'Marry',
				],
			],
		],
	];
	return $meta_boxes;
} );
```

Result:

![default clone value](https://i.imgur.com/JwMMGKM.png)

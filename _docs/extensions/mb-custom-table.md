---
title: MB Custom Table
---

**MB Custom Table** helps you to save custom fields' values to custom table instead of the default WordPress meta table. All custom fields for a post are saved in a single row, where and each column contains the value of a corresponding field.

This reduces the number of rows in the database which can cause a performance issue when the data grows. And let you have all of your data in one place, so you can easily view, edit, import, export it.

![custom table overview](https://i.imgur.com/BzE1Fvx.png)

## Video tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/o8ICxe8nbrI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Creating custom tables

To create a custom table, you can do it manually by following [this guide](https://codex.wordpress.org/Creating_Tables_with_Plugins) or using the API that the extension provides. The API simplifies the process and makes it easier for you.

This code creates a simple table for 3 custom fields (*each custom field is a column*):

```php
add_action( 'init', 'prefix_create_table' );
function prefix_create_table() {
    if ( ! class_exists( 'MB_Custom_Table_API' ) ) {
        return;
    }
    MB_Custom_Table_API::create( 'my_custom_table', array(
        'address' => 'TEXT NOT NULL',
        'phone'   => 'TEXT NOT NULL',
        'email'   => 'VARCHAR(20) NOT NULL',
    ) );
}
```

Here we hook to `init` to make sure the API is ready to use. For more details about the hooks or which hook you should use, see section **Notes** below.

The code will generate a SQL query for creating a custom table like this:

```php
$sql = "CREATE TABLE my_custom_table (
  ID int(11) unsigned NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email VARCHAR(20) NOT NULL
  PRIMARY KEY  (ID)
)";
```

{% include alert.html content="**Important:** Column key has to match your custom fields' IDs, one column per custom field. If you create a column to store a group, then the column key must be the top-level group ID. No need to create column for sub-fields." %}

{% include alert.html content="Column data types are MySQL's. You can see the list of data types [here](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)." %}

Note that the **`ID` column is automatically created**. It's used to store the object ID for future reference. Object ID can be post ID, user ID or term ID, depends on what meta type the table is used for.

If you want to set keys for columns, just add the 3rd parameter:

```php
MB_Custom_Table_API::create( 'my_custom_table', array(
    'address' => 'TEXT NOT NULL',
    'phone'   => 'TEXT NOT NULL',
    'email'   => 'VARCHAR(20) NOT NULL',
), array( 'email' ) );
```

Which generates:

```php
$sql = "CREATE TABLE my_custom_table (
  ID int(11) unsigned NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email VARCHAR(20) NOT NULL
  PRIMARY KEY  (ID)
  KEY email
)";
```

{% include alert.html content="BLOB and TEXT columns also can be indexed, but a fixed length must be given. Make sure you set the length when you want to index a text column." %}

### Parameters

The API function takes 3 parameters as follows:

```php
MB_Custom_Table_API::create( $table_name, $columns, $keys = array() );
```

Where:

Parameter|Description
---|---
`table_name`|The custom table name. Required.
`columns`|Array of table columns, where key is the column ID and value is the column definition (similar in SQL). Required.
`keys`|Array of key column IDs. These columns will be indexed. Optional.

### Notes

A. **Do not add ID column**: The ID column is automatically added to the list of columns and set as primary key in the table. It's used to store the object ID (post, user, term) for future reference.

B. The **column key must match custom fields' IDs**.

C. The **table name doesn't contain WordPress table prefix**. The extension do not put any constrains for you to define the table name. If you want to use WordPress table prefix, you can do like this:

```php
global $wpdb;
MB_Custom_Table_API::create( "{$wpdb->prefix}my_custom_table", array(
    'address' => 'TEXT NOT NULL',
    'phone'   => 'TEXT NOT NULL',
    'email'   => 'VARCHAR(20) NOT NULL',
) );
```

D. You should **check for the class existence** before running the function, like this:

```php
if ( ! class_exists( 'MB_Custom_Table_API' ) ) {
    return;
}
MB_Custom_Table_API::create( 'my_custom_table', array(
    'address' => 'TEXT NOT NULL',
    'phone'   => 'TEXT NOT NULL',
    'email'   => 'VARCHAR(20) NOT NULL',
), array( 'email' ) );
```

E. The extension uses WordPress recommended method to create custom table, which means if the table already exists, the code will do nothing. Although, **it's recommended to run the code that create custom tables [only when activate your plugin](https://codex.wordpress.org/Creating_Tables_with_Plugins#Calling_the_functions)**, like this:

```php
register_activation_hook( __FILE__, 'prefix_create_table' );
function prefix_create_table() {
    if ( ! class_exists( 'MB_Custom_Table_API' ) ) {
        return;
    }
    MB_Custom_Table_API::create( 'my_custom_table', array(
        'address' => 'TEXT NOT NULL',
        'phone'   => 'TEXT NOT NULL',
        'email'   => 'VARCHAR(20) NOT NULL',
    ), array( 'email' ) );
}
```

But for some reason, if you can't run the code when activate your plugin, it's totally fine to run the code in `init` or `plugins_loaded` hook:

```php
add_action( 'init', 'prefix_create_table' );
function prefix_create_table() {
    if ( ! class_exists( 'MB_Custom_Table_API' ) ) {
        return;
    }
    MB_Custom_Table_API::create( 'my_custom_table', array(
        'address' => 'TEXT NOT NULL',
        'phone'   => 'TEXT NOT NULL',
        'email'   => 'VARCHAR(20) NOT NULL',
    ), array( 'email' ) );
}
```

### Using existing tables

Sometimes you already have custom tables created by other tools such as phpMyAdmin. In this case, you can still use MB Custom Table with your table.

There are 2 requirements:

- **The custom table must have the ID column**. It's required to connecting entries in the custom table with WordPress posts, terms or users table.
- **The columns in the custom table much match the field IDs in your meta box**. See **Using custom tables** section below for details.

## Using custom tables

To tell a meta box to use a custom table to store custom fields instead of default meta tables, you need to specify 2 parameters `storage_type` and `table` like this:

```php
add_filter( 'rwmb_meta_boxes', 'your_prefix_register_meta_boxes' );
function your_prefix_register_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'        => 'Meta Box Title',
        'storage_type' => 'custom_table',    // Important
        'table'        => 'my_custom_table', // Your custom table name
        'fields'       => array(
            array(
                'id'   => 'address',
                'type' => 'text',
                'name' => 'Address',
            ),
            array(
                'id'   => 'phone',
                'type' => 'text',
                'name' => 'Phone',
            ),
            array(
                'id'   => 'email',
                'type' => 'email',
                'name' => 'Email',
            ),
        ),
    );
    return $meta_boxes;
}
```

{% include alert.html content="**Again:** Column key has to match your custom fields' IDs, one column per custom field. If you create a column to store a group, then the column key must be the top-level group ID. No need to create column for sub-fields." %}

Now you can go to edit post screen (or edit user profile if you use the meta box for user profile page) and save the post. You'll see the data is saved in the new custom table instead of meta tables.

## Getting field value

Use the helper [rwmb_meta()](/rwmb-meta/) function to get a field value. The only difference is you need to specify the table name in the 2nd argument:

```php
$value = rwmb_meta( $field_id, ['storage_type' => 'custom_table', 'table' => $table_name] );
echo $value;
```

Also note that the call to the custom table will be cached, e.g. if you call the helper function several times for the same `$post_id`, it will only query once. This technique will improve the database performance.

You can also use the [`[rwmb_meta]`](https://docs.metabox.io/shortcode/) shortcode to display a field value. You need to set the shortcode attributes similarly to the `rwmb_meta()` helper function:

```
[rwmb_meta id="field_id" storage_type="custom_table" table="table_name"]
```


## Group fields

For group fields, it's worth mentioning that the whole group value, including sub-fields' values, is saved as a serialized array in *one* column. So, they're not flat as other fields.

That means:

- When you create a table, please create only one column for the group (even that group contains many sub-fields or sub-groups). And the column key must be the group ID.
- The group value is serialized, you cannot make SQL query agains the sub-fields' values. Thus, you don't benefit from the custom table structure. So, be careful to make decision what fields should be in groups, what fields should not. It's recommended to use groups only for *data storing, not for querying*.

While the data of the group is serialized, it will be unserialized when getting via helper functions. So you don't have to unserialize yourself.

## Query posts with WP_Query

It's important to understand that the plugin doesn't hook to the `WP_Query` to get posts by custom fields stored in the custom table. In other words, using `meta_*` in `WP_Query` for custom fields won't work.

In order to get posts by custom fields in the custom table, you need to make an extra query to get the post IDs first. Then use these IDs to get full post objects.

Here is an example:

```php
global $wpdb;
$ids = $wpdb->get_col( "SELECT ID FROM your_table WHERE field1 = 'value1' OR field2 = 'value2'" );

if ( empty( $ids ) ) {
    echo 'There is no posts';
} else {
    $query = new WP_Query( [
        'post_type' => 'post',
        'post__in'  => $ids,
    ] );
    // Do something
}
```

This technique also works with terms and users.

## Custom models

Besides custom tables for built-in WordPress posts, terms and users, the plugin allows you to create custom models, which mimic the WordPress posts, but store the data completely in custom tables. So you don't need to connect to posts, terms or users anymore. And the data is stored only in one table, which is more efficient.

Pros:

- Better data structure, because you can define the custom table to match your needs.
- Don't mess with WordPress tables. You manage data on your own.
- Complete CRUD for models so you can create/edit/delete them easily.
- Compatible with all Meta Box field types.
- Use the similar Meta Box and WordPress API/UI to show list of models or edit models.
- Compatible with MB Admin Columns extension to show fields in admin columns.

Cons:

- Models don't have front-end templates like posts. You won't have permalinks for each model and their archive. Models should be used for managing data. If you want to have the power of the templates, then you should use normal custom tables above.
- Limited compatibility with some extensions such as MB Relationships, MB Views.

### Usage

To create and use custom models, you need to follow 3 steps below:

#### Step 1: Register a model

Registering a model is very similar to a custom post type in WordPress, with less parameters. The code below registers a custom model `transaction`.

```php
// Step 1: Register a model.
add_action( 'init', 'prefix_register_transaction_model' );
function prefix_register_transaction_model() {
	mb_register_model( 'transaction', [
		'table'  => 'transactions',
		'labels' => [
			'name'          => 'Transactions',
			'singular_name' => 'Transaction',
		],
		'menu_icon' => 'dashicons-money-alt',
	] );
}
```

Parameter | Description
---|---
`table`|Custom table for the model. Required.
`labels`|An array of labels for this model. Required. See below for list of labels.
`show_in_menu`|Where to show the menu in the admin menu. Optional. Default `true`.
`menu_position`|The position in the menu order the model should appear. Optional. Default `null` (at the bottom).
`menu_icon`|The url to the icon to be used for this menu. Pass a base64-encoded SVG using a data URI, which will be colored to match the color scheme -- this should begin with 'data:image/svg+xml;base64,'. Pass the name of a Dashicons helper class to use a font icon, e.g. 'dashicons-chart-pie'. Pass 'none' to leave div.wp-menu-image empty so an icon can be added via CSS. Defaults to use the posts icon.
`parent`|Menu parent, if you want to show model as a sub-menu. Optional.
`capability`|The capability to access the menu and create/edit/delete models. Default `edit_posts`.

List of labels:

Name|Description
---|---
`name`|General name for the model, usually plural.
`menu_name`|Label for the menu name. Default is the same as name.
`singular_name`|Name for one item of this model.
`add_new`|Label for 'Add New' models.
`add_new_item`|Label for adding a new singular item.
`edit_item`|Label for editing a singular item.
`search_items`|Label for searching plural items.
`not_found`|Label used when no items are found.
`all_items`|Label to signify all items in the page title.
`item_updated`|Label used when an item is updated.
`item_added`|Label used when an item is added.
`item_deleted`|Label used when an item is deleted.

#### Step 2: Create a custom table for the model

Creating a custom table is similar to the section above, except one thing: you must specify the 4th parameter as `true` to indicate this is a table for models.

```php
// Step 2: Create a custom table for the model.
add_action( 'init', 'prefix_register_transaction_table' );
function prefix_register_transaction_table() {
	MetaBox\CustomTable\API::create(
		'transactions',                    // Table name.
		[                                  // Table columns (without ID).
			'created_at' => 'DATETIME',
			'amount'     => 'BIGINT',
			'email'      => 'VARCHAR(20)',
			'gateway'    => 'TEXT',
			'status'     => 'VARCHAR(20)',
			'screenshot' => 'TEXT',
		],
		['email', 'status'],               // List of index keys.
		true                               // THIS: Must be true for models.
	);
}
```

Do **NOT** create a ID column. It's automatically created (primary key, auto increment).

#### Step 3: Register fields for model, corresponding to the custom table structure

Registering fields for models is exactly the same as for posts. You just need to specify which model the meta box for.

If your custom table has many fields, you can split them into multiple meta boxes, to enter the data more conveniently. The order of fields doesn't matter when saving.

```php
// Step 3: Register fields for model, corresponding to the custom table structure.
add_filter( 'rwmb_meta_boxes', 'prefix_register_transaction_fields' );
function prefix_register_transaction_fields( $meta_boxes ) {
	$meta_boxes[] = [
		'title'        => 'Transaction Details',
		'models'       => ['transaction'], // Model name
		'storage_type' => 'custom_table',  // Must be 'custom_table'
		'table'        => 'transactions',  // Custom table name
		'fields'       => [
			[
				'id'          => 'created_at',
				'type'        => 'datetime',
				'name'        => 'Created at',
				'js_options'  => [
					'timeFormat' => 'HH:mm:ss',
				],
				'admin_columns' => true,
			],
			[
				'id'     => 'amount',
				'type'   => 'number',
				'name'   => 'Amount',
				'append' => 'USD',
				'admin_columns' => [
					'position' => 'after id',
					'sort'     => true,
				],
			],
			[
				'id'   => 'gateway',
				'name' => 'Gateway',
				'admin_columns' => true,
			],
			[
				'id'   => 'status',
				'type' => 'select',
				'name' => 'Status',
				'options' => [
					'pending'   => 'Pending',
					'completed' => 'Completed',
					'refunded'  => 'Refunded',
				],
				'admin_columns' => true,
			],
		],
	];

	$meta_boxes[] = [
		'title'        => 'Additional Transaction Details',
		'models'       => ['transaction'], // Model name
		'storage_type' => 'custom_table',  // Must be 'custom_table'
		'table'        => 'transactions',  // Custom table name
		'fields'       => [
			[
				'id'   => 'email',
				'type' => 'email',
				'name' => 'Email',
				'admin_columns' => [
					'position'   => 'after amount',
					'searchable' => true,
				],
			],
			[
				'id'            => 'screenshot',
				'type'          => 'image_advanced',
				'name'          => 'Screenshots',
				'admin_columns' => true,
			],
		],
	];

	return $meta_boxes;
} );
```

After completing 3 steps, you'll see the Transactions menu on the left and you can add/edit/delete models easily as follows:

<iframe width="560" height="315" src="https://www.youtube.com/embed/FenYCOFdCLI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Getting field values for models

To get a field value for models, you can use 2 method:

Using custom table API to get the raw value in the custom table.

```php
$value = \MetaBox\CustomTable\API::get_value( $field_id, $model_id, $table_name );

// Example: returns 'completed'
$status = \MetaBox\CustomTable\API::get_value( 'status', 3, 'transactions' );
```

Using the helper function to get the formated value:

```php
$value = rwmb_meta( $field_id, [
	'object_type' => 'model', // THIS must be set to 'model',
	'type'        => $model,
], $model_id );

// Example: returns 'Completed'
$status = rwmb_meta( 'status', [
	'object_type' => 'model',
	'type'        => 'transaction',
], 3 );
```

### Compatibility

This feature currently works with the following extensions:

- MB Admin Columns
- Meta Box Group
- Meta Box Columns
- Meta Box Tabs
- Meta Box Tooltip
- Meta Box Geolocation
- Meta Box Text Limiter
- Meta Box Conditional Logic
- Meta Box Show Hide

### Hooks

`mbct_{$model}_query_where`

Filters the where statement in query in the custom model table list. Accepts one parameter - the where statement.

`mbct_{$model}_query_order`

Filters the order statement in query in the custom model table list. Accepts one parameter - the order statement.

`mbct_{$model}_columns`

Filters the list of columns in the custom model table list. Accepts one parameter - the array of columns.

`mbct_{$model}_sortable_columns`

Filters the list of sortable columns in the custom model table list. Accepts one parameter - the array of sortable columns.

`mbct_{$model}_column_output`

Filters the output of a column in the custom model table list. Accepts 4 parameters:

- `$output`: the output
- `$column_name`: the column name
- `$item`: the array of the item data
- `$model`: the model name

`mbct_{$model}_row_actions`

Filters the list of actions for each row item in the custom model table list (default is Edit and Delete). Accepts one parameter - an associate array of actions.

`mbct_restrict_manage_posts`

Fires after the bulk action for the custom model table list, usually used to output custom filters for the table. Accepts 2 parameters:

- `$model`: the model name
- `$which`: `top` or `bottom` - the position of the filters

`mbct_manage_posts_extra_tablenav`

Fires after the bulk action and after `mbct_restrict_manage_posts`. Accepts one parameter - `$which` which can be `top` or `bottom` - the position in the table.

`mbct_submit_box`

Filters the output of the submit meta box. Accepts 2 parameter:

- `$output`: the HTML output
- `$model`: the model name

`mbct_before_submit_box`

Fires before the output of the submit meta box. Accepts one parameter - the model name.

`mbct_after_submit_box`

Fires after the output of the submit meta box. Accepts one parameter - the model name.

`mbct_before_add`
`mbct_after_add`
`mbct_before_update`
`mbct_after_update`
`mbct_before_delete`
`mbct_after_delete`

Fire before/after adding/updating/deleting data in a custom table via the API. Accepts 3 parameters:

- `$object_id`: the object ID
- `$table`: the table name
- `$row`: the associate array of data

### Notes

Each model can have only one custom table.

While models work with all Meta Box field types, the data of cloneable/multiple/group fields is always an array, thus it's saved as an serialized array in the model table column.

## API

The plugin has the following APIs for you to work with the data in custom tables. These APIs work well with both custom tables for posts/terms/users and for models.

### `exists`

Check if a custom table has a row for an object. In other words, check if an object has data stored in a custom table.

```php
$exists = \MetaBox\CustomTable\API::exists( $object_id, $table );

if ( $exists ) {
	// Do something.
}
```

### `get`

Get all custom fields data for an object from a custom table. The returned data is an array, where keys are custom field IDs, and values are custom field values.

The data is raw, meaning it's not formatted yet. For example: for images, you'll get the attachment IDs instead of an array of URL, width, height, size, etc. as you get via `rwmb_the_value` function.

```php
$data = \MetaBox\CustomTable\API::get( $object_id, $table );

// Inspect the data.
print_r( $data );

/*
Result:
[
	'field_1' => 'value 1',
	'field_2' => 'value 2',
	'field 3' => ['one', 'two', 'three'],
]
*/
```

### `add`

Add an array of custom field values for an object. Make sure the data for the object doesn't exists yet in the database.

```php
$data = [
	'field_1' => 'value 1',
	'field_2' => 'value 2',
	'field 3' => ['one', 'two', 'three'],
];
\MetaBox\CustomTable\API::add( $object_id, $table, $data );
```

In case you want to add a row for a custom model, set `$object_id` to `null`.

### `update`

Update the data for an object. Works similarly to `add`. Make sure the data for object exists in the database.

```php
$data = [
	'field_1' => 'value 1',
	'field_2' => 'value 2',
	'field 3' => ['one', 'two', 'three'],
];
\MetaBox\CustomTable\API::update( $object_id, $table, $data );
```

### `delete`

Delete all data for an object in the custom table.

```php
\MetaBox\CustomTable\API::delete( $object_id, $table );
```

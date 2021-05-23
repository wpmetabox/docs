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
  addresss TEXT NOT NULL,
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
  addresss TEXT NOT NULL,
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

You can use the helper [rwmb_meta()](/rwmb-meta/) function to get field value. The only difference is you need to specify the table name in the 2nd argument:

```php
$value = rwmb_meta( $field_id, ['storage_type' => 'custom_table', 'table' => $table_name] );
echo $value;
```

Also note that the call to the custom table will be cached, e.g. if you call the helper function several times for the same `$post_id`, it will only query once. This technique will improve the database performance.


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

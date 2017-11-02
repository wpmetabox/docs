---
title: MB Custom Table
---

{% include installation.html %}

**Important:** This extension requires Meta Box version 4.12.3+. If you're using an older version of the plugin, please update.

## Creating custom tables

To create a custom table, you can do it manually by following [this guide](https://codex.wordpress.org/Creating_Tables_with_Plugins) or using the API that the extension provides. The API simplifies the process and makes it easier for you.

This code creates a simple table for 3 custom fields (*each custom field is a column*):

```php
MB_Custom_Table_API::create( 'my_custom_table', array(
    'address' => 'TEXT NOT NULL',
    'phone'   => 'TEXT NOT NULL',
    'email'   => 'TEXT NOT NULL',
) );
```

This will generate a SQL query for creating a custom table like this:

```php
$sql = "CREATE TABLE my_custom_table (
  ID int(11) unsigned NOT NULL,
  addresss TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL
  PRIMARY KEY  (ID)
)";
```

Note that the **`ID` column is automatically created**. It's used to store the object ID for future reference. Object ID can be post ID, user ID or term ID, depends on what meta type the table is used for.

If you want to set keys for columns, just add the 3rd parameter:

```php
MB_Custom_Table_API::create( 'my_custom_table', array(
    'address' => 'TEXT NOT NULL',
    'phone'   => 'TEXT NOT NULL',
    'email'   => 'TEXT NOT NULL',
), array( 'email' ) );
```

Which generates:

```php
$sql = "CREATE TABLE my_custom_table (
  ID int(11) unsigned NOT NULL,
  addresss TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL
  PRIMARY KEY  (ID)
  KEY email
)";
```

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
`keys`|Array of key column IDs. Optional.

### Notes

A. **Do not add ID column**: The ID column is automatically added to the list of columns and set as primary key in the table. It's used to store the object ID (post, user, term) for future reference.

B. The column IDs must match custom fields' IDs.

C. The **table name doesn't contain WordPress table prefix**. The extension do not put any constrains for you to define the table name. If you want to use WordPress table prefix, you can do like this:

```php
global $wpdb;
MB_Custom_Table_API::create( "{$wpdb->prefix}my_custom_table", array(
    'address' => 'TEXT NOT NULL',
    'phone'   => 'TEXT NOT NULL',
    'email'   => 'TEXT NOT NULL',
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
    'email'   => 'TEXT NOT NULL',
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
        'email'   => 'TEXT NOT NULL',
    ), array( 'email' ) );
}
```

But for some reason, if you can't run the code when activate your plugin, it's totally fine to run the code in `init` or `plugins_loaded` hook:

```php
add_action( 'plugins_loaded', 'prefix_create_table' );
function prefix_create_table() {
    if ( ! class_exists( 'MB_Custom_Table_API' ) ) {
        return;
    }
    MB_Custom_Table_API::create( 'my_custom_table', array(
        'address' => 'TEXT NOT NULL',
        'phone'   => 'TEXT NOT NULL',
        'email'   => 'TEXT NOT NULL',
    ), array( 'email' ) );
}
```

## Using custom tables

To tell a meta box to use a custom table to store custom fields instead of default meta tables, you need to specify 2 parameters `storage_type` and `table` like this:

```php
$meta_boxes[] = array(
    'title'        => 'Meta Box Title',
    'storage_type' => 'custom_table',    // Important
    'table'        => 'your_table_name', // Your custom table name
    'fields'       => array(...)
);
```

Now you can go to edit post screen (or edit user profile if you use the meta box for user profile page) and save the post. You'll see the data is saved in the new custom table instead of meta tables.

## Getting field value

You can use the helper [rwmb_meta()](/rwmb-meta/) function to get field value. The only difference is you need to specify the table name in the 2nd argument:

```php
$args = array( 'storage_type' => 'custom_table', 'table' => $table_name )
$value = rwmb_meta( $field_id, $args );
echo $value;
```

Also note that the call to the custom table will be cached, e.g. if you call the helper function several times for the same `$post_id`, it will only query once. This technique will improve the database performance.
---
title: Meta Box Columns
---

## Overview

Meta Box Columns is an UI extension which helps you put custom fields into columns. The extension creates a 12-column grid and allows you to specify where a custom field should be.

The concept of the extension is rather simple. But the power of this extension comes when you combine it with [groups](https://metabox.io/plugins/meta-box-group/). So that you can create nested columns for sub-fields as well. You can also put multiple fields into one column if you want.

Screenshot:

![put custom fields in columns](https://i2.wp.com/metabox.io/wp-content/uploads/2014/07/meta-box-columns-screenshot.png)

For more information about the extension, please see the [extension page](https://metabox.io/plugins/meta-box-columns/).

{% include installation.html %}

## Usage

Make sure you know how to [create meta boxes](/creating-meta-boxes/) and [fields](/field-settings/) before continuing!

### Simple syntax

To specify number of columns for each field, simply add `columns` parameter for that field. The plugin will automatically calculate number of columns and wrap fields into a div "row" and apply styles for them.

The code below registers some fields and make each field obtain 4 columns of the grid (thus, you'll see 3 columns layout):

```php
add_filter( 'rwmb_meta_boxes', 'prefix_columns_demo_register' );
function prefix_columns_demo_register( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => 'Meta Box Columns Demo',
        'fields' => array(
            array(
                'name'    => 'Name',
                'id'      => 'name',
                'type'    => 'text',
                // Number of columns (in grid 12)
                'columns' => 4,
            ),
            array(
                'name'    => 'Email',
                'id'      => 'email',
                'type'    => 'email',
                'columns' => 4,
            ),
            array(
                'name'    => 'Mobile',
                'id'      => 'mobile',
                'type'    => 'text',
                'columns' => 4,
            ),
        ),
    );
    return $meta_boxes;
}
```

### Advanced syntax

The advanced syntax is helpful if you need to put **multiple fields in 1 column**.

```php
add_filter( 'rwmb_meta_boxes', 'prefix_register_meta_boxes' );
function prefix_register_meta_boxes( $meta_boxes ) {
    $meta_boxes[] = array(
        'id'     => 'test-columns',
        'title'  => 'Meta Box Columns Demo',
        'columns' => array(
            'column-1' => 4,                   // Simply define the size of the column (from 1 to 12)
            'column-2' => array(               // More advanced syntax
                'size' => 8,                   // Column size (1-12)
                'class' => 'custom-css-class', // Custom CSS class for the column
            ),
        ),
        'fields' => array(
            array(
                'name'    => 'Name',
                'id'      => 'name',
                'type'    => 'text',
                'column'  => 'column-1',
            ),
            array(
                'name'    => 'Email',
                'id'      => 'email',
                'type'    => 'email',
                'column'  => 'column-1',
            ),
            array(
                'name'    => 'State',
                'id'      => 'state',
                'type'    => 'select_advanced',
                'options' => array(
                    'NY' => 'New York',
                    'CA' => 'California',
                ),
                'column'  => 'column-2',
            ),
            array(
                'name'    => 'Description',
                'id'      => 'description',
                'type'    => 'textarea',
                'column'  => 'column-2',
            ),
        ),
    );

    return $meta_boxes;
}
```

In the advanced syntax, you need to define a parameter `columns` for the meta box. It's the list of columns for all fields in the following format:

```php
'columns' => array(
    'column-1' => 4,                   // Simply define the size of the column (from 1 to 12)
    'column-2' => array(               // More advanced syntax
        'size' => 4,                   // Column size (1-12)
        'class' => 'custom-css-class', // Custom CSS class for the column
    ),
),
```

Then each field in the meta box need to specify which column it belongs to by setting `'column' => 'column-0'`.

## Notes

This extension uses 12-columns grid, so when defining number of columns, you must define them so that the total columns for each row equals to 12.

For example:

- Row 1: field 1 (3 columns), field 2 (3 columns), field 3 (3 columns), field 4 (3 columns)
- Row 2: field 5 (6 columns), field 6 (6 columns)
- Row 3: field 7 (12 columns)

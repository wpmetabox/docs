---
title: Custom Select / Checkbox Tree
---

If you've used [`taxonomy` field type](/field-settings/), you will see it has an option to display options in a checkbox / select tree. When users select a parent item, it will show children item. It's quite a nice feature for users. But how to do that with normal checkbox list or select field types?

The answer is simple: it's already built-in the [Meta Box plugin](https://metabox.io). And here is the sample code:

```php
add_filter( 'rwmb_meta_boxes', function ( $meta_boxes ) {
    $meta_boxes[] = array(
        'title'  => 'Test',
        'fields' => array(
            array(
                'type'    => 'select_tree', // or checkbox_list
                'id'      => 'cb',
                'name'    => 'Hierarchical checkboxes',
                'options' => array(
                    array( 'value' => 'value1', 'label' => 'label 1' ),
                    array( 'value' => 'value2', 'label' => 'label 2' ),
                    array( 'value' => 'sub1', 'label' => 'Sub 1', 'parent' => 'value1' ),
                    array( 'value' => 'sub2', 'label' => 'Sub 2', 'parent' => 'value1' ),
                ),
                'placeholder' => 'Select an item',
                'flatten' => false,
            ),
        ),
    );
    return $meta_boxes;
} );
```

To enable select/checkbox tree, you need to:

- Set the option in format of `array( 'value' => 'Your value', 'label' => 'Your label' )`, e.g. no more short type of `'value' => 'Label'` anymore.
- For child items, please add `'parent' => 'parent_value'`
- Set `'flatten' => false` for the field
- Set the field type `checkbox_list` if you want a checkbox tree or `select_tree` if you want a select tree.

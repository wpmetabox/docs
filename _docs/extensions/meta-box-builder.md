---
title: Meta Box Builder
---

This guide cover basic tasks a user may carry out when using our builder.

{% include installation.html %}

## Creating a Meta Box

[![creating a meta box](https://i.imgur.com/rG5mluU.gif)](https://i.imgur.com/rG5mluU.gif)

You must create a meta box before you can add fields to it.

1. Go to *Dashboard &rarr; Meta Boxes &rarr; Add New*.
1. Enter a name for your new meta box in the **Meta Box Title** box.
1. Click the **Save Meta Box** button once complete.

## Adding fields

Adding fields to a meta box is similar to adding menu items in WordPress. We mimic the UI of the menu section to make it easy to you.

To add fields to a meta box, just find the field type you want to add on the left panels, click the field button to add it to the meta box.

[![Adding fields to meta box](https://i.imgur.com/LlpbRVi.gif)](https://i.imgur.com/LlpbRVi.gif)

## Deleting fields

[![Deleting a Meta Box](https://i.imgur.com/ZywHp0F.gif)](https://i.imgur.com/ZywHp0F.gif)

1. Locate the field that you want to remove in the field editor window
1. Click on the arrow icon in the top right-hand corner of the field/box to expand it.
1. Click on the Remove link. The field/box will be immediately removed.
1. Click the Save Meta Box button to save your changes.

## Customizing fields

[![Customizing meta box field](https://i.imgur.com/KJ05fKD.gif)](https://i.imgur.com/KJ05fKD.gif)

Each field has its [own settings](/field-settings/) that you can edit within the builder.

1. Click on the arrow in the top right-hand corner of the field to expand it.
1. Enter the values for the settings that you want to assign to the field.
1. Click the Save Meta Box button to save your changes.

## Reordering fields

Just drag your fields to the position that you want.

[![reordering fields](https://i.imgur.com/ZOZD5aY.gif)](https://i.imgur.com/ZOZD5aY.gif)

## Duplicating fields

1. Locate the field that you want to clone/duplicate in the field editor window
1. Click on the arrow icon in the top right-hand corner of the field/box to expand it.
1. Click on the Duplicate link. The field/box will be immediately duplicated.
1. Click the Save Meta Box button to save your changes.

## Custom Attributes

You can also add an attribute which does not exist on the field editor window by click on "Show Advanced", then click "Add Attribute". For example, if you want to create a text field like:

```php
'text' => array(
    'foo' => 'bar',
    'baz' => false
)
```

Just enter 'foo' to the key, 'bar' to the value, 'baz' to the key and 'false' to the value (without quote).

Remember, Meta Box Builder will treat `true`, `false`, `0`, `1` values as `bool` type.

If the field requires complex settings, like this:

```php
array(
    'type' => 'post',
    'id' => 'field_id',
    'query_args' => array(
        'tax_query' => array(
            array(
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => 'technology',
            ),
        ),
    ),
)
```

Then you can use the dot notation or JSON for custom attributes:

### Dot notation

Since 1.2, you can use dot notation to define an array. For the `tax_query` above, you can define with dot notation like so:

![dot notation](https://i.imgur.com/YbjBP7A.png)

Please note that `tax_query.0.taxonomy`, `tax_query.0.field`, and `tax_query.0.terms` because the taxonomy named `category`, the field named `slug` and the term named technology are belong to the first (and only one) array of tax_query, not directly belongs to `tax_query`.

### JSON notation

Prior to version 1.2, to create a nested array in Meta Box Builder, you can use JSON, encode the whole array of `tax_query` and paste to it value. Like so:

![json value](https://i.imgur.com/kJRrnd7.png)

## Editing / Deleting a Meta Box

1. Navigate to Meta Boxes \ All Meta Boxes. You'll see the list of all Meta Boxes like so:

[![All Meta Boxes](https://i.imgur.com/gqvRZZ6.png)](https://i.imgur.com/gqvRZZ6.png)

- To Trash / Delete a Meta Box. Simply click on the red 'Trash' button.
- To Edit a Meta Box. Click on the Meta Box name or 'Edit' button.

## Other Meta Box Settings

[![Meta Box Settings](https://i.imgur.com/fZIpbZ2.png)](https://i.imgur.com/fZIpbZ2.png)

Attribute|Description
---|---
Priority|The priority within the context where the boxes should show. Default: `High`
Context|The part of the page where the meta box should be shown. Default: `Normal`
Post types|Type of the post which the meta box should be attached. Default: `Post` and `Page`
Autosave|Auto save meta box whilst the post has auto saved. See [this documentation](/creating-meta-boxes/) if you want to take a deeper look into the attributes for Meta Box.

Note that, Meta Box also accepts custom attributes, just like custom field settings. It uses the same dot or JSON notation to define custom attributes. For more information, please see [Custom Attributes section](#custom-attributes).

## Misc

### Further supports / Bugs report

If this documentation doesn't solve your problem. Or you have trouble when using Meta Box Builder, please don't hesitate to contact us via [Support Forum](https://metabox.io/support).

### See also

- [Create Columns in Meta Box Builder](/create-columns-in-meta-box-builder/)

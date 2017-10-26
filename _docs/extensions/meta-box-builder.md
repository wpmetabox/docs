---
title: Meta Box Builder
---

This guide cover basic tasks a user may carry out when using our builder. [install]

## Creating a Meta Box

[![creating a meta box](https://metabox.io/wp-content/uploads/2015/11/creating-a-meta-box.gif)](https://metabox.io/wp-content/uploads/2015/11/creating-a-meta-box.gif)

You must create a meta box before you can add fields to it.

1. Login to the WordPress Dashboard.
1. From the 'Meta Boxes' menu on the left-hand side of the Dashboard, select the 'Add New' option to bring up the Meta Box Builder.
1. Enter a name for your new meta box in the 'Meta Box Title' box.
1. Click the 'Save Meta Box' button once complete.

Your new meta box has now been saved.

## Adding Fields to a Meta Box

[![Adding field to meta box](https://metabox.io/wp-content/uploads/2015/11/add-field.gif)](https://metabox.io/wp-content/uploads/2015/11/add-field.gif)

You can add different field types into your meta box, these are split between panels left of the meta box you're currently editing.

1. Locate to the one of three left panels.
1. Within that pane, select the Fields which you want to add by clicking on the buttons.
1. Click the Save Meta Box button once you've added all the fields that you want.

Your meta box and fields have now been saved.

## Deleting a Meta Box Field

[![Deleting a Meta Box](https://metabox.io/wp-content/uploads/2015/11/deleting-a-meta-box.gif)](https://metabox.io/wp-content/uploads/2015/11/deleting-a-meta-box.gif)

1. Locate the field that you want to remove in the field editor window
1. Click on the arrow icon in the top right-hand corner of the field/box to expand it.
1. Click on the Remove link. The field/box will be immediately removed.
1. Click the Save Meta Box button to save your changes.

## Customizing a Meta Box Field

[![Customizing meta box field](https://metabox.io/wp-content/uploads/2015/11/gender.gif)](https://metabox.io/wp-content/uploads/2015/11/gender.gif)

Each field has their own properties also called as 'attributes'. For more detail about it, see [Define Fields](/field-settings/).

1. Click on the arrow in the top right-hand corner of the field to expand it.
1. Enter the values for the attributes that you want to assign to the field.
1. Click the Save Meta Box button to save your changes.

#### Custom Attributes

You can also add an attribute which does not exist on the field editor window by click on "Show Advanced", then click "Add Attribute". For example, if you want to create a text field like:

```php
'text' => array(
    'foo' => 'bar',
    'baz' => false
)
```

Just enter 'foo' to the key, 'bar' to the value, 'baz' to the key and 'false' to the value (without quote).

Remember, Meta Box Builder will treat `true`, `false`, `0`, `1` values as `bool` type.

Since 1.2, you can define array values on custom attributes, `js_options`, `query_args` and other "key - value" fields by [using dot notation (recommended) or json](/how-to-create-nested-array-field-with-meta-box-builder/).

## Reordering a Field

Just drag your fields to the position that you want.

[![reordering field](https://metabox.io/wp-content/uploads/2015/11/reordering-field.gif)](https://metabox.io/wp-content/uploads/2015/11/reordering-field.gif)

## Duplicating a Meta Box Field

1. Locate the field that you want to clone/duplicate in the field editor window
1. Click on the arrow icon in the top right-hand corner of the field/box to expand it.
1. Click on the Duplicate link. The field/box will be immediately duplicated.
1. Click the Save Meta Box button to save your changes.

## Editing / Deleting a Meta Box

1. Navigate to Meta Boxes \ All Meta Boxes. You'll see the list of all Meta Boxes like so:

[![All Meta Boxes](https://metabox.io/wp-content/uploads/2015/01/add-meta-boxes.png)](https://metabox.io/wp-content/uploads/2015/01/add-meta-boxes.png)

- To Trash / Delete a Meta Box. Simply click on the red 'Trash' button.
- To Edit a Meta Box. Click on the Meta Box name or 'Edit' button.

## Other Meta Box Settings

[![Meta Box Settings](https://metabox.io/wp-content/uploads/2015/01/meta-box-settings-e1421897795782.png)](https://metabox.io/wp-content/uploads/2015/01/meta-box-settings-e1421897795782.png)

Attribute|Description
---|---
Priority|The priority within the context where the boxes should show. Default: `High`
Context|The part of the page where the meta box should be shown. Default: `Normal`
Post types|Type of the post which the meta box should be attached. Default: `Post` and `Page`
Autosave|Auto save meta box whilst the post has auto saved. See [Registering Meta Boxes](/registering-meta-boxes) if you want to take a deeper look into the attributes for Meta Box.

## Misc

### Further supports / Bugs report

If this documentation doesn't solve your problem. Or you have trouble when using Meta Box Builder, please don't hesitate to contact us via [Support Forum](https://metabox.io/support)

### See also

- [How to Create Meta Box Columns in Meta Box Builder](/how-to-create-meta-box-columns-in-meta-box-builder/)
- [How to Create Nested Array Field with Meta Box Builder](/how-to-create-nested-array-field-with-meta-box-builder/)
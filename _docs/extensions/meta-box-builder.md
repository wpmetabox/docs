---
title: Meta Box Builder
---

This guide cover basic tasks a user may carry out when using our builder.

{% include installation.html %}

After installing, the plugin creates a sub-menu **Custom Fields** under the top-level menu **Meta Box** in the WordPress admin.

![meta box builder menu](https://i.imgur.com/EHd1v23.png)

Clicking on that menu will bring you to the screen where you can create meta boxes and custom fields.

Please note that the screen says **Field Groups** instead of **Meta Boxes**. We think the term "meta box" might be confusing, since it's the name of the [Meta Box plugin](https://metabox.io). Besides, the meta box builder is for creating custom fields, using field group with a simple meaning of "set of custom fields" makes sense. This term also works in case you want to build [front-end forms](https://metabox.io/plugins/mb-frontend-submission/), [settings pages](https://metabox.io/plugins/mb-settings-page/) or [user fields](https://metabox.io/plugins/mb-user-meta/).

## Creating a field group

To create a field group, go to *Meta Box &rarr; Custom Fields*. Then click the **Add New** button.

On the add new field group screen, enter a name for your new field group in the **Title** box. The field group ID is then automatically generated. You can change the ID if you want, it's optional.

Then select the fields you want to add to the field group on the left. When click on a field, it will be automatically added to the list of fields in the field group. We'll see the settings of each fields in a section below.

![creating a meta box (field group)](https://i.imgur.com/K7BzNfZ.png)

{% include alert.html content="To find a field type quickly, type its name in the input box above the field list. The plugin will filter the fields and show only matched fields." %}

When it's done, click button **Publish** to save the field group. You also can click on **Save as Draft** link if you don't want to publish it, e.g. making it not available in the edit post screen.

## Field group settings

The field group settings are put in the tab **Settings**:

![field group settings](https://i.imgur.com/CHosaVq.png)

The list of field group settings are listed and explained [here](https://docs.metabox.io/creating-meta-boxes/). The Meta Box Builder plugin simply converts them into UI to make it easy for you to select/change them.

{% include alert.html content="Note that, field groups also accept custom attributes, just like fields. It uses the same dot notation or JSON notation to define custom attributes. For more information, please see **Custom Attributes** section below." %}

## Customizing field settings

When adding fields to a field group, each field has its own settings. The list of settings with detailed explaination is [here](https://docs.metabox.io/field-settings/). Meta Box Builder simply creates UI for them.

To view and edit field settings, click the arrow on the title panel:

![Edit field settings](https://i.imgur.com/X6BSk7g.png)

Each field settings are self-explained. We also add some tooltips next to the setting title to give you more information if needed.

All field settings are divided into 3 tabs: General, Appearance and Advanced. The General and Appearance tabs are common for all fields. The Advanced tab is for custom attributes (advanced settings - we'll talk about it in a section below) and for [Meta Box extensions](https://metabox.io/plugins/).

{% include alert.html content="Besides common settings, each field has its own settings. Depend on the field type, the UI might be different to show specific settings for it." %}

## Custom attributes

You can also add an custom attributes which does not exist on the field UI window by click on Advanced tab, then click **+ Attribute** button:

![custom attribute](https://i.imgur.com/spmhYCn.png)

For example, if you want to create a text field like:

```php
'text' => array(
    'foo' => 'bar',
    'baz' => false
)
```

Just enter `foo` to the key, `bar` to the value, `baz` to the key and `false` to the value.

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

The dot notation is available since version 1.2. For the `tax_query` above, you can define with dot notation like so:

![dot notation](https://i.imgur.com/YbjBP7A.png)

Please note that `tax_query.0.taxonomy`, `tax_query.0.field`, and `tax_query.0.terms` because the taxonomy named `category`, the field named `slug` and the term named technology are belong to the first (and only one) array of tax_query, not directly belongs to `tax_query`.

### JSON notation

To create a nested array in Meta Box Builder, you can use JSON notation, encode the whole array of `tax_query` and paste to it value. Like so:

![json value](https://i.imgur.com/kJRrnd7.png)

## Manipulating fields

### Deleting a field

Click the red **Remove** link in the bottom left of the field settings panel:

![delete a field](https://i.imgur.com/dkcHg9P.png)

### Reordering fields

Just drag your fields to the position that you want.

[![reordering fields](https://i.imgur.com/ZOZD5aY.gif)](https://i.imgur.com/ZOZD5aY.gif)

### Duplicating fields

In case you want to create similar fields, duplicate feature can help you save a lot of time.

To duplicate a field, simply click the **Duplicate** link in the bottom right of the field settings panel:

![duplicate a field](https://i.imgur.com/sn5IJNw.png)

A new field will be immediately created and put below the current field.

## Getting PHP code

After saving a field group, you'll see a new tab appeared on the top named **Code**. The Meta Box Builder plugin automatically generates PHP code that you can copy and paste into your theme's `functions.php` file.

To get the code, click on the tab **Code**, then click the **Copy** button:

![export code](https://i.imgur.com/g6EnLns.png)

When you copy PHP code and paste it into your theme's `functions.php` file, you can **safely deactivate Meta Box Builder** (do *not* deactivate Meta Box, it's still required). Your field groups and fields are still working.

For detailed instruction, please see [this tutorial](https://metabox.io/copy-custom-fields-with-meta-box-builder/).

## Export / Import

To export one or more field groups, go to the main screen *Meta Box &rarr; Custom Fields*. Then click the checkboxes next to the field groups' titles you want to export. Then choose **Export** from the Bulk Actions dropdown. Then click **Apply**.

![export field groups](https://i.imgur.com/r1moj0S.png)

To import field groups, *Meta Box &rarr; Import*. Choose the downloaded file in the previous step, then press **Upload file and import**. That’s all!

![import field groups](https://i.imgur.com/z4ntga2.png)

For detailed instruction, please see [this tutorial](https://metabox.io/export-import-custom-fields-meta-box-builder/).

Video tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/BGVY-5W6d7g?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Further Reading

- [How to Add and Configure Custom Fields Using Meta Box Builder](https://metabox.io/add-configure-custom-fields-meta-box-builder/)
- [How to Export and Import Custom Fields with Meta Box Builder](https://metabox.io/export-import-custom-fields-meta-box-builder/)
- [How to Easily Copy Custom Fields From One Site to Others with Meta Box Builder](https://metabox.io/copy-custom-fields-with-meta-box-builder/)
- [Create Columns in Meta Box Builder](/create-columns-in-meta-box-builder/)

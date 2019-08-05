---
title: Meta Box Builder
---

## Overview

Meta Box Builder is the most popular extension for Meta Box users and is the mandatory tool for almost everyone.

This extension creates an UI for you to add and manage your custom fields. So you don't need to [touch code again](https://docs.metabox.io/creating-meta-boxes/). It's helpful for both beginners (who have little knowlege about PHP coding) or experience developers (who want to save time).

If you already used our free [Online Generator](https://metabox.io/online-generator/), then this extension works very similarly. But it has a better support (very much) for all field types and other extensions and it works right in the WordPress admin area.

Please note that, while Meta Box Builder supports most settings for custom fields and extensions, there are some advanced settings that need to be done in PHP code (such as [creating settings page](https://docs.metabox.io/extensions/mb-settings-page/) or [relationships](https://docs.metabox.io/extensions/mb-relationships/) if you use these extensions). But in 95% cases, you're fine with the extension.

Take a look at the screenshot:

![meta box builder ui](https://i2.wp.com/metabox.io/wp-content/uploads/2015/01/meta-box-builder-field-edit.png)

For more information, please see the [extension page](https://metabox.io/plugins/meta-box-builder/).

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

### Deleting or duplicating a field

To delete or duplicate a field, simply clicking the icons in the toolbar:

![delete or duplicate a field](https://i.imgur.com/98mSFzx.png)

### Reordering fields

Just drag your fields to the position that you want.

[![reordering fields](https://i.imgur.com/ZOZD5aY.gif)](https://i.imgur.com/ZOZD5aY.gif)

## Getting PHP code

For each field group, Meta Box Buider can create a PHP code that you can copy and paste into your theme's `functions.php` file (or your plugin file) and then *deactivate the Meta Box Builder extension*.

This is helpful if you want to:

- Share field groups to other websites which doesn't have Meta Box Builder installed.
- Improve the performance since field groups are loaded directly from your file.

To get the code, click on the tab **Code**, then click the **Copy** button to copy the code. Then paste it into your theme's `functions.php` file.

![export code](https://i.imgur.com/g6EnLns.png)

When you copy PHP code and paste it into your theme's `functions.php` file, you can **safely deactivate Meta Box Builder** (do *not* deactivate Meta Box, it's still required).

For detailed instruction, please see [this tutorial](https://metabox.io/copy-custom-fields-with-meta-box-builder/).

Please note that once you take the PHP code and remove the settings from the Meta Box Builder, there's no way to edit the field group in the Meta Box Builder directly from the exported code.

In order to do re-edit the field group, we suggest after taking the PHP code, export the field group settings from Meta Box Builder (see the section below). Then whenever you want to edit the field group, just import it back and edit.

## Export / Import

To export one or more field groups, go to the main screen *Meta Box &rarr; Custom Fields*. Then click the checkboxes next to the field groups' titles you want to export. Then choose **Export** from the Bulk Actions dropdown. Then click **Apply**.

![export field groups](https://i.imgur.com/r1moj0S.png)

Or you can export individual field group by clicking on **Export** link when hover the mouse over the field group title:

![export a single field group](https://i.imgur.com/Nx45cpH.png)

To import field groups, select the *Import* button at the top of the page. Then choose the downloaded file in the previous step, then press **Upload file and import**. That’s all!

![import field groups](https://i.imgur.com/bpf4acg.png)

For detailed instruction, please see [this tutorial](https://metabox.io/export-import-custom-fields-meta-box-builder/).

Video tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/BGVY-5W6d7g?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Create Gutenberg blocks

Since v3.1.0, Meta Box Builder allows you to create Gutenberg blocks visually, without writing code. See this video tutorial on how to do that:

<iframe width="560" height="315" src="https://www.youtube.com/embed/v3ke1DBlWuk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Note that the plugin supports Twig template engine to write block template code. See [Twig documentation](https://twig.symfony.com/doc/1.x/templates.html) for how to use variables, conditions and functions.

For more convenient, the plugin supports the following variables:

- `{{ align }}`: block alignment (if the block supports it).
- `{{ anchor }}`: block anchor (if the block supports it).
- `{{ className }}`: custom CSS class name (if the block supports it).

To access the field value, you can use `{{ field_id }}`, where `field_id` is the field ID. If the field returns an array (such as `single_image` field), you can access to field's attribute with `{{ my_image.full_url }}`.

Besides, the plugin also allows you to use any PHP/WordPress function via `mb.function()` where `function` is the function name. For example, the code below get the post object and output the post title:

```php
{% set post = mb.get_post( post_id ) %}
{{ post.post_title }}
```

Or this code will output the site title:

```php
{% set site_title = mb.get_bloginfo( 'name' ) %}
{{ site_title }}
```

## Further Reading

- [How to Add and Configure Custom Fields Using Meta Box Builder](https://metabox.io/add-configure-custom-fields-meta-box-builder/)
- [How to Export and Import Custom Fields with Meta Box Builder](https://metabox.io/export-import-custom-fields-meta-box-builder/)
- [How to Easily Copy Custom Fields From One Site to Others with Meta Box Builder](https://metabox.io/copy-custom-fields-with-meta-box-builder/)
- [Create Columns in Meta Box Builder](/create-columns-in-meta-box-builder/)

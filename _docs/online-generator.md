---
title: Online Generator
---

[Online Generator](https://metabox.io/online-generator/) is a tool to help you create and set up custom fields using a simple, friendly user interface. With it, you can add fields, set options and generate needed code that's ready to copy and paste.

Before using Online Generator, make sure you [installed and activated Meta Box plugin](https://docs.metabox.io/installation/).

## Add fields

To add fields, simply click field types on the left. Related fields are put into groups for a fast reference. You can also search for a field by typing in the search box.

![select a field type](https://i.imgur.com/smn7Cd1.png)

Once you add a new field, field settings panel will appear on the right, where you can enter field details such as ID, label or description.

![edit field settings](https://i.imgur.com/JbpVTeK.png)

You can also toggle the field settings by clicking the field title bar.

The field settings are different depending on the field type. See more details about [field settings](https://docs.metabox.io/field-settings/) or settings for specific field types from the left menu of this page.

## Remove, duplicate, reorder fields

On the title bar, there're 2 icons for removing and duplicated fields. When you hover the mouse over the field settings, you'll see move up and down buttons for reorder fields.

![remove, duplicate, reorder fields](https://i.imgur.com/L3lpw58.png)

## Settings

Once you complete adding fields, click the **Settings** tab to add settings for the meta box.

![settings tab](https://i.imgur.com/Wzqzrrm.png)

Parameter|Description
---|---
Meta box title| Meta box title. Required.
Meta box ID| Meta box ID. If you didn’t type anything here, the meta box ID would be automatically created from the title. Optional.
Post types|Custom post types which the meta box is for.
Position|Where the meta box is displayed.
Priority|Priority within the context where the box is displayed
Autosave|Auto save the custom fields' values (like post content and title)?
Field ID prefix|Auto add a prefix to all field IDs to keep them separated from other field groups or other plugins.
Text domain|Required for multilingual website. Used in the exported code only.

See more about [meta box settings](https://docs.metabox.io/creating-meta-boxes/).

## Generate code

After you finish configuring your custom fields and meta boxes, click the **Generate code** button to get the code for the meta box. Then copy and paste them into the theme's `function.php` file.

You might want to modify the code if needed. After copying to your theme's `functions.php` file, go to **All Posts > Add New** to see the result!

## Conclusion

**Online Generator** is a great tool for WordPress beginners and developers to generate custom meta boxes and custom fields for the [Meta Box](https://metabox.io) plugin. It saves you a lot of time with a friendly UI and let you build a bunch of fields without touching code.

It works as a static tool, meaning that it can't be put inside your WordPress admin. Instead, you have to copy the generated code and paste it into your theme's `functions.php` file.

In case you want to use it inside your WordPress admin and have extra settings for fields or [premium extensions](https://metabox.io/plugins/), don’t forget to try [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/).

---
title: MB ACF Migration
---

MB ACF Migration extension helps you to migrate field groups and custom field data from Advanced Custom Fields (ACF) to Meta Box. It works with both free and pro versions of Advanced Custom Fields.

## Video tutorial

This is the walkthrough video created by David McCan that shows you how to migrate data from ACF to Meta Box:

<iframe width="560" height="315" src="https://www.youtube.com/embed/JD75cXNmIso" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Backup the database

Before migrating data, make sure you have a backup of your database. During the migration process, because of the difference in [data format](https://docs.metabox.io/database/), the plugin will attempt to modify the existing data in custom fields created by ACF. We try to do it at a very minimum level and create a backup of fields for some specific cases, but it's still important to make a backup just in case something goes wrong.

## Migrate

Before migrating, make sure you keep Advanced Custom Fields, Meta Box (required) and extensions (optional) activated. To know which extensions you might need, please see the **How it works** section below. Normally, if you use Meta Box AIO and keep all extensions activated, you don't have to worry about this.

To migrate, simply go to **Meta Box > ACF Migration** and click the **Migrate** button.

The plugin will show the process of migrating. When it's done, you'll see the text "Done".

![migrate acf to meta box](https://i.imgur.com/ixRIrIE.png)

## How it works

MB ACF Migration tries to migrate all the following data from ACF to Meta Box. Please note that not all data types and settings in ACF have an equivalent in Meta Box. The plugin will try to migrate as much as it can. The details are explained below:

### Field groups

ACF field groups are migrated to Meta Box's field groups, which requires [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/). Most of the field group settings are the same as [in Meta Box](https://docs.metabox.io/creating-meta-boxes/).

{% include alert.html type="warning" content="**We do not remove ACF field groups** after migration, for safety. Instead, we changed their status to 'Inactive'. You can remove them later after all the data is processed." %}

For **field group locations**, the basic rules are already supported in Meta Box and extensions. You might need extensions such as:

- [MB Term Meta](https://metabox.io/plugins/mb-term-meta/): If you set locations for taxonomies.
- [MB User Meta](https://metabox.io/plugins/mb-user-meta/): If you set locations for users.
- [MB Comment Meta](https://metabox.io/plugins/mb-comment-meta/): If you set locations for comments.
- [MB Settings Pages](https://metabox.io/plugins/mb-settings-pages/): If you set locations for settings pages.

For "Blocks", although there's an [equivalent in Meta Box](https://metabox.io/plugins/mb-blocks/), the data of blocks are stored in post content and hard to parsed and migrated, so it's ignored at the moment.

For other rules like "Page Type", "Widget", "Menu", "Menu Item", there's no equivalent in Meta Box and they will be ignored.

Besides, if you use complex locations, then you'll need [Meta Box Include Exclude](https://metabox.io/plugins/meta-box-include-exclude/) extension. Due to the difference in how plugins create rules, the plugin works the following way:

- If there's only one location group: the plugin will migrate all rules with operator `AND`.
- If there are multiple location groups: the plugin will take the first rule of each group and combine them with operator `OR`.

### Settings pages

ACF requires you to use code to register settings pages. In Meta Box, thanks to [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/), you can create and manage settings pages with UI.

During the migration, the plugin will try to create settings pages with UI if you have settings pages registered with ACF.

### Custom fields data

Most ACF field types work well with Meta Box, such as text, radio, select, etc. However, there's still a difference in how plugins store values in the database. Because of that, we'll process as the following:

1. **Remove all extra keys** in the database. ACF stores an extra meta in the database for field reference. It has the format `_{$field_id}`. This is redundant and causes the database to bloat. We don't need them and thus, we remove them.
2. For **fields that have multiple values** such as gallery, select (with multiple options), ACF saves their values as serialized arrays. We'll migrate them multiple rows in the database (similar to what `add_post_meta` does with the last parameter `false`).
3. For **layout fields**, ACF saves values of each sub-fields in a row in the database. We'll migrate them into groups (which requires [Meta Box Group](https://metabox.io/plugins/meta-box-group/)).

Details are below:

Field type | Meta Box's equivalent
--- | ---
Gallery | Image advanced
Select | Select advanced if stylised UI is enabled, normal select otherwise
Checkbox | Checkbox list
Post, Page link, Relationship | Post. In the case of page link, it works only with a post is selected, archive links don't work.
Taxonomy | Taxonomy advanced
Google maps | A pair of address field - which is a text field, and a Google maps field
Group | Non-cloneable group. Requires [Meta Box Group](https://metabox.io/plugins/meta-box-group/).
Repeater | Cloneable group. Requires [Meta Box Group](https://metabox.io/plugins/meta-box-group/).
Flexible content | Cloneable group with 2 sub-fields: a select field for selecting a layout, and a non-cloneable group for data. Requires [Meta Box Group](https://metabox.io/plugins/meta-box-group/) and [Meta Box Conditional Logic](https://metabox.io/plugins/meta-box-conditional-logic/).

{% include alert.html type="info" content="For these fields, as the data format is different, for the safety, we create a backup for each field value. The new field value is stored with the key `_acf_bak_{$field_id}`." %}

However, the following field types are not supported, because there're no equivalent field types in Meta Box:
- Link
- Accordion
- Clone

For other field types, the data is untouched.

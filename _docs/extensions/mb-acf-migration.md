---
title: MB ACF Migration
---

MB ACF Migration extension helps you to migrate field groups and custom field data from Advanced Custom Fields (ACF) to Meta Box. It works with both free and pro versions of Advanced Custom Fields.

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

{% include alert.html type="alert" content="**We do not remove ACF field groups** after migration, for safety. Instead, we changed their status to "Inactive". You can remove them later after all the data is processed." %}

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


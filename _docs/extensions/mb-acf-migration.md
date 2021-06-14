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
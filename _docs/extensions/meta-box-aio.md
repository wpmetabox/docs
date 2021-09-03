---
title: Meta Box AIO
---

Meta Box AIO is a special plugin that contains all the extensions. It allows you to install only one plugin and have everything, so you can have the plugin list short and clean.

**Important:** Meta Box AIO still requires Meta Box to work.

## Settings page

The plugin has a settings page under *Meta Box &rarr; Extensions*, where you can enable/disable the extensions you need/don't need.

![meta box aio settings page](https://imgur.com/gBFCrB1.png)

Simply check/uncheck the checkbox to enable/disable the corresponding extensions. Then click **Save Changes**.

Please note that you still need to [install Meta Box](/installation/) plugin to see the admin menu.

## Filters

While the settings page and the notification to install free extensions are great for users, developers might want to hide them from normal users. To do that, Meta Box AIO provides some filters:

### `mb_aio_show_settings`

This filter is used to show/hide the settings page. The callback function should return `true` to show the settings page, or `false` to hide it.

To hide the settings page, use the following code:

```
add_filter( 'mb_aio_show_settings', '__return_false' );
```

### `mb_aio_extensions`

This filter allows you to change the list of enabled premium extensions. Thus, enable/disable modules by just coding.

This filter takes a list of enabled extensions (their slugs), and returns the filtered list.

For example, the code below enables only the [Meta Box Builder](https://metabox.io/plugins/meta-box-builder/) extension:

```php
add_filter( 'mb_aio_extensions', function( $extensions ) {
    $extensions = ['meta-box-builder'];

    // You can also do
    // $extensions[] = 'meta-box-builder';

    return $extensions;
} );
```

## Upgrade

When updating from version 1.12 to version 1.13, the plugin automatically migrates data of field groups to compatible with the new React app. The migration process doesn't touch your existing data, so you're always safe.

If you don't see any field in field groups after upgrading, then the migration process failed to run the job. To fix this problem, you can force the plugin migrate again by adding a query param `mbb_version=3.3` to your site URL. In short, please go to `https://yourdomain.com/wp-admin/?mbb_version=3.3` to run the migration.

## Notes

When an extension is enabled in Meta Box AIO and is activated as an individual plugin, the individual plugin will has higher priority and will be used. The version bundled inside Meta Box AIO will not be used.

This behavior is expected and has a good benefit: whenever we release a new version for individual extensions, you can try them first on your website to ensure compatibility before updating the whole Meta Box AIO package.

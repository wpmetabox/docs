---
title: Meta Box AIO
---

Meta Box AIO is a part of [Developer Bundle](https://metabox.io/pricing/), which contains all the premium extensions and the [updater](https://metabox.io/plugins/meta-box-updater/). This extension allows you to just install 1 plugin and have everything in hand. [See here](https://metabox.io/meta-box-aio-available/) for the introduction.

## Settings page

The extension has a settings page under *Settings &rarr; Meta Box AIO*, where you can enable/disable the modules you need/don't need.

![settings page](https://i.imgur.com/rGbwDoB.png)

Simply check/uncheck the checkbox to enable/disable the corresponding extensions. Then click **Save Changes**.

## Free extensions

Along with the premium extensions, Meta Box AIO allows you to load [free extensions from wordpress.org](https://profiles.wordpress.org/metabox#content-plugins). When activate the Meta Box AIO, you will see a notification at the top of the screen:

![notification](https://i.imgur.com/jOs4Its.png)

Simply click on the **Begin installing plugins** to install them (if you haven't). And then click **Begin activating plugins** to activate them.

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
    
    return $option;
} );
```

### `mb_aio_load_free_extensions`

This filter allows you to show/hide notification to load free extensions from wordpress.org. The callback function should return `true` to show the settings page, or `false` to hide it.

To not load free extensions, use the following code:

```php
add_filter( 'mb_aio_load_free_extensions', '__return_false' );
```

---
title: Meta Box AIO
---

## Overview

Meta Box AIO is a part of [Developer and Lifetime Bundles](https://metabox.io/pricing/), which contains all the extensions. This extension allows you to just install 1 plugin and have everything in hand. So you can shorten down the plugin list and never get lost in a lot of plugins provided by Meta Box.

For more information, please see [this blog post](https://metabox.io/meta-box-aio-available/).

## Settings page

The extension has a settings page under *Meta Box &rarr; All-In-One*, where you can enable/disable the modules you need/don't need.

![meta box aio settings page](https://i.imgur.com/FA0gwWy.png)

Simply check/uncheck the checkbox to enable/disable the corresponding extensions. Then click **Save Changes**.

Please note that you still need to [install Meta Box](/installation/) plugin to see the admin menu.

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

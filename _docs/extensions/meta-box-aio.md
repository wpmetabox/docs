---
title: Meta Box AIO
---

## Overview

Meta Box AIO is a part of [Developer and Lifetime Bundles](https://metabox.io/pricing/), which contains all the extensions. This extension allows you to just install 1 plugin and have everything in hand. So you can shorten down the plugin list and never get lost in a lot of plugins provided by Meta Box.

For more information, please see [this blog post](https://metabox.io/meta-box-aio-available/).

{% include installation.html %}

**Important:** Meta Box AIO still requires Meta Box to work.

## Settings page

The extension has a settings page under *Meta Box &rarr; All-In-One*, where you can enable/disable the modules you need/don't need.

![meta box aio settings page](https://i.imgur.com/FA0gwWy.png)

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
